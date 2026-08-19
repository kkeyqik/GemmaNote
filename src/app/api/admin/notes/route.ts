import { errorResponse, requireAdminUser } from "@/lib/app-auth";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@/generated/prisma/client.js";

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
    const limit = Math.max(1, Math.min(100, parseInt(limitParam || "20", 10) || 20));

    const conditions: Prisma.DocumentWhereInput[] = [];

    if (search) {
      conditions.push({
        OR: [
          { title: { contains: search, mode: "insensitive" as const } },
          { plainText: { contains: search, mode: "insensitive" as const } },
        ],
      });
    }

    if (status === "TRASH") {
      conditions.push({ isTrash: true });
    } else if (status === "ARCHIVED") {
      conditions.push({ isTrash: false, isArchived: true });
    } else if (status === "DRAFT") {
      conditions.push({
        isTrash: false,
        isArchived: false,
        OR: [{ content: null }, { content: "" }],
      });
    } else if (status === "PUBLISHED") {
      conditions.push({
        isTrash: false,
        isArchived: false,
        content: { not: null },
        NOT: { content: "" },
      });
    }

    const where = conditions.length > 0 ? { AND: conditions } : {};

    const [total, documents] = await Promise.all([
      prisma.document.count({ where }),
      prisma.document.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { updatedAt: "desc" },
        select: {
          id: true,
          title: true,
          content: true,
          plainText: true,
          wordCount: true,
          isFavorite: true,
          isTrash: true,
          isArchived: true,
          trashedAt: true,
          createdAt: true,
          updatedAt: true,
          userId: true,
          user: {
            select: {
              email: true,
            },
          },
        },
      }),
    ]);

    const notes = documents.map((doc) => {
      let docStatus = "PUBLISHED";
      if (doc.isTrash) {
        docStatus = "TRASH";
      } else if (doc.isArchived) {
        docStatus = "ARCHIVED";
      } else if (!doc.content || doc.content.trim() === "") {
        docStatus = "DRAFT";
      }

      return {
        id: doc.id,
        title: doc.title,
        content: doc.content,
        plainText: doc.plainText,
        wordCount: doc.wordCount,
        isFavorite: doc.isFavorite,
        isTrash: doc.isTrash,
        isArchived: doc.isArchived,
        trashedAt: doc.trashedAt,
        userId: doc.userId,
        authorEmail: doc.user?.email || "Anonymous",
        status: docStatus,
        createdAt: doc.createdAt,
        updatedAt: doc.updatedAt,
      };
    });

    const totalPages = Math.ceil(total / limit) || 1;

    return Response.json({
      notes,
      total,
      page,
      limit,
      totalPages,
    });
  } catch (error) {
    return errorResponse(error, "Failed to fetch admin notes");
  }
}

export async function DELETE(request: Request) {
  try {
    await requireAdminUser();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return Response.json({ error: "Note ID is required" }, { status: 400 });
    }

    const existing = await prisma.document.findUnique({ where: { id } });
    if (!existing) {
      return Response.json({ error: "Note not found" }, { status: 404 });
    }

    await prisma.document.delete({ where: { id } });
    return Response.json({ success: true, message: "Note deleted successfully" });
  } catch (error) {
    return errorResponse(error, "Failed to delete note");
  }
}
