import { errorResponse, requireAdminUser } from "@/lib/app-auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    await requireAdminUser();

    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search")?.trim() || "";
    const pageParam = searchParams.get("page");
    const page = Math.max(1, parseInt(pageParam || "1", 10) || 1);
    const limitParam = searchParams.get("limit");
    const limit = Math.max(1, Math.min(100, parseInt(limitParam || "10", 10) || 10));

    const where = search
      ? {
          OR: [
            { email: { contains: search, mode: "insensitive" as const } },
            { clerkId: { contains: search, mode: "insensitive" as const } },
          ],
        }
      : {};

    const [total, users] = await Promise.all([
      prisma.user.count({ where }),
      prisma.user.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: "desc" },
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
          _count: {
            select: {
              documents: true,
              ownedWorkspaces: true,
            },
          },
        },
      }),
    ]);

    const totalPages = Math.ceil(total / limit) || 1;

    return Response.json({
      users,
      total,
      page,
      totalPages,
    });
  } catch (error) {
    return errorResponse(error, "Failed to fetch admin users");
  }
}
