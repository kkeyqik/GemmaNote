import { errorResponse, requireAdminUser } from "@/lib/app-auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

type Context = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, { params }: Context) {
  try {
    await requireAdminUser();
    const { id } = await params;

    const existingUser = await prisma.user.findUnique({ where: { id } });
    if (!existingUser) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }

    const body: unknown = await request.json();
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
      if (roleUpper !== "USER" && roleUpper !== "ADMIN") {
        return Response.json({ error: "Invalid role. Expected 'USER' or 'ADMIN'" }, { status: 400 });
      }
      data.role = roleUpper;
    }

    if (typeof isSuspended === "boolean") {
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

    return Response.json(updatedUser);
  } catch (error) {
    return errorResponse(error, "Failed to update user");
  }
}
