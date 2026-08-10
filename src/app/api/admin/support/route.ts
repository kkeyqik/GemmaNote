import { errorResponse, requireAdminUser, ApiError } from "@/lib/app-auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    await requireAdminUser();

    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search")?.trim() || "";
    const status = searchParams.get("status")?.trim().toUpperCase() || "";
    const pageParam = searchParams.get("page");
    const page = Math.max(1, parseInt(pageParam || "1", 10) || 1);
    const limitParam = searchParams.get("limit");
    const limit = Math.max(1, Math.min(100, parseInt(limitParam || "10", 10) || 10));

    const where: any = {};

    if (status && ["OPEN", "IN_PROGRESS", "CLOSED"].includes(status)) {
      where.status = status;
    }

    if (search) {
      where.OR = [
        { subject: { contains: search, mode: "insensitive" } },
        { message: { contains: search, mode: "insensitive" } },
        { user: { email: { contains: search, mode: "insensitive" } } },
      ];
    }

    const [total, requests] = await Promise.all([
      prisma.supportRequest.count({ where }),
      prisma.supportRequest.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: {
          user: {
            select: {
              id: true,
              email: true,
              clerkId: true,
            },
          },
        },
      }),
    ]);

    const totalPages = Math.ceil(total / limit) || 1;

    return Response.json({
      requests,
      supportRequests: requests,
      total,
      page,
      totalPages,
    });
  } catch (error) {
    return errorResponse(error, "Failed to fetch support requests");
  }
}

export async function PATCH(request: Request) {
  try {
    await requireAdminUser();

    const body = await request.json();
    const { id, status } = body || {};

    if (!id || typeof id !== "string") {
      throw new ApiError(400, "Support request ID is required.");
    }

    const validStatuses = ["OPEN", "IN_PROGRESS", "CLOSED"];
    const normalizedStatus = typeof status === "string" ? status.toUpperCase() : "";

    if (!validStatuses.includes(normalizedStatus)) {
      throw new ApiError(
        400,
        "Invalid status. Must be one of OPEN, IN_PROGRESS, or CLOSED."
      );
    }

    const existing = await prisma.supportRequest.findUnique({
      where: { id },
    });

    if (!existing) {
      throw new ApiError(404, "Support request not found.");
    }

    const updated = await prisma.supportRequest.update({
      where: { id },
      data: { status: normalizedStatus },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            clerkId: true,
          },
        },
      },
    });

    return Response.json(updated);
  } catch (error) {
    return errorResponse(error, "Failed to update support request status");
  }
}
