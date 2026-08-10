import { ApiError, errorResponse, requireAdminUser } from "@/lib/app-auth";
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
    const limit = Math.max(1, Math.min(100, parseInt(limitParam || "20", 10) || 20));

    const where = {
      isTrash: true,
      ...(search
        ? {
            OR: [
              { title: { contains: search, mode: "insensitive" as const } },
              { plainText: { contains: search, mode: "insensitive" as const } },
              { user: { email: { contains: search, mode: "insensitive" as const } } },
            ],
          }
        : {}),
    };

    const [total, documents] = await Promise.all([
      prisma.document.count({ where }),
      prisma.document.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { trashedAt: "desc" },
        select: {
          id: true,
          title: true,
          wordCount: true,
          isTrash: true,
          trashedAt: true,
          createdAt: true,
          updatedAt: true,
          user: {
            select: {
              id: true,
              email: true,
            },
          },
        },
      }),
    ]);

    const totalPages = Math.ceil(total / limit) || 1;

    return Response.json({
      documents,
      total,
      page,
      totalPages,
    });
  } catch (error) {
    return errorResponse(error, "Failed to fetch trashed documents");
  }
}

export async function DELETE(request: Request) {
  try {
    await requireAdminUser();

    const body = await request.json().catch(() => ({}));
    const { id } = body || {};

    if (!id || typeof id !== "string") {
      throw new ApiError(400, "Document ID is required");
    }

    const doc = await prisma.document.findUnique({
      where: { id },
    });

    if (!doc) {
      throw new ApiError(404, "Document not found");
    }

    await prisma.document.delete({
      where: { id },
    });

    return Response.json({
      success: true,
      message: "Document permanently deleted",
      id,
    });
  } catch (error) {
    return errorResponse(error, "Failed to delete document");
  }
}

export async function PATCH(request: Request) {
  try {
    await requireAdminUser();

    const body = await request.json().catch(() => ({}));
    const { id } = body || {};

    if (!id || typeof id !== "string") {
      throw new ApiError(400, "Document ID is required");
    }

    const doc = await prisma.document.findUnique({
      where: { id },
    });

    if (!doc) {
      throw new ApiError(404, "Document not found");
    }

    const restoredDocument = await prisma.document.update({
      where: { id },
      data: {
        isTrash: false,
        trashedAt: null,
      },
      select: {
        id: true,
        title: true,
        wordCount: true,
        isTrash: true,
        trashedAt: true,
        user: {
          select: {
            id: true,
            email: true,
          },
        },
      },
    });

    return Response.json({
      success: true,
      message: "Document restored successfully",
      document: restoredDocument,
    });
  } catch (error) {
    return errorResponse(error, "Failed to restore document");
  }
}
