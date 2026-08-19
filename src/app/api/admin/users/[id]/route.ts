import { errorResponse, requireAdminUser } from "@/lib/app-auth";
import { prisma } from "@/lib/prisma";
import { ApiError } from "@/lib/app-auth";
import { assertSameOrigin, readJson } from "@/lib/request-security";
import { writeAuditEvent } from "@/lib/audit";

export const dynamic = "force-dynamic";

type Context = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, { params }: Context) {
  try {
    const actor = await requireAdminUser();
    assertSameOrigin(request);
    const { id } = await params;

    const existingUser = await prisma.user.findUnique({ where: { id } });
    if (!existingUser) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }

    const body: unknown = await readJson<unknown>(request);
    if (!body || typeof body !== "object") {
      return Response.json({ error: "Invalid request body" }, { status: 400 });
    }

    const { role, isSuspended, plan } = body as {
      role?: unknown;
      isSuspended?: unknown;
      plan?: unknown;
    };

    const data: { role?: string; isSuspended?: boolean; plan?: string } = {};

    if (typeof role === "string") {
      const roleUpper = role.trim().toUpperCase();
      if (id === actor.id && roleUpper !== "ADMIN") {
        throw new ApiError(403, "You cannot demote your own admin account");
      }
      if (roleUpper !== "USER" && roleUpper !== "ADMIN") {
        return Response.json({ error: "Invalid role. Expected 'USER' or 'ADMIN'" }, { status: 400 });
      }
      data.role = roleUpper;
    }

    if (typeof isSuspended === "boolean") {
      if (id === actor.id && isSuspended) {
        throw new ApiError(403, "You cannot suspend your own admin account");
      }
      data.isSuspended = isSuspended;
    }

    if (typeof plan === "string") {
      const planUpper = plan.trim().toUpperCase();
      if (planUpper === "FREE" || planUpper === "PRO" || planUpper === "AGENCY") {
        data.plan = planUpper;
      }
    }

    if (Object.keys(data).length === 0) {
      return Response.json({ error: "No valid fields to update. Expected 'role' or 'isSuspended'" }, { status: 400 });
    }

    if (data.role === "USER" || data.isSuspended === true) {
      const remainingAdmins = await prisma.user.count({ where: { role: "ADMIN", isSuspended: false, id: { not: id } } });
      if (remainingAdmins < 1) throw new ApiError(409, "At least one active administrator must remain");
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data,
      select: {
        id: true,
        clerkId: true,
        email: true,
        role: true,
        plan: true,
        usageCount: true,
        isSuspended: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    await writeAuditEvent({
      actorUserId: actor.id,
      action: "ADMIN_USER_UPDATED",
      targetType: "USER",
      targetId: id,
      request,
      metadata: { fields: Object.keys(data), role: data.role, plan: data.plan, isSuspended: data.isSuspended },
    });

    const { clerkId: _clerkId, ...safeUser } = updatedUser;
    return Response.json(safeUser);
  } catch (error) {
    return errorResponse(error, "Failed to update user");
  }
}
