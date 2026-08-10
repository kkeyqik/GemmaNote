import { errorResponse, requireAdminUser } from "@/lib/app-auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await requireAdminUser();

    const [allDocuments, topUsersRaw] = await Promise.all([
      prisma.document.findMany({
        select: {
          id: true,
          content: true,
          plainText: true,
          isTrash: true,
        },
      }),
      prisma.user.findMany({
        take: 10,
        orderBy: {
          documents: {
            _count: "desc",
          },
        },
        select: {
          id: true,
          email: true,
          _count: {
            select: {
              documents: true,
            },
          },
        },
      }),
    ]);

    const totalDocuments = allDocuments.length;
    let totalStorageBytes = 0;
    let trashedCount = 0;
    let trashedStorageBytes = 0;

    for (const doc of allDocuments) {
      const contentLen = doc.content ? doc.content.length : 0;
      const plainTextLen = doc.plainText ? doc.plainText.length : 0;
      const docBytes = contentLen + plainTextLen;

      totalStorageBytes += docBytes;

      if (doc.isTrash) {
        trashedCount += 1;
        trashedStorageBytes += docBytes;
      }
    }

    const totalStorageMB = Number((totalStorageBytes / (1024 * 1024)).toFixed(4));
    const trashedStorageMB = Number((trashedStorageBytes / (1024 * 1024)).toFixed(4));

    const avgDocSizeBytes = totalDocuments > 0 ? Math.round(totalStorageBytes / totalDocuments) : 0;
    const avgDocSizeKB = Number((avgDocSizeBytes / 1024).toFixed(2));

    const topUsers = topUsersRaw.map((u) => ({
      id: u.id,
      email: u.email,
      count: u._count.documents,
    }));

    return Response.json({
      totalDocuments,
      totalStorageBytes,
      totalStorageMB,
      trashedCount,
      trashedStorageBytes,
      trashedStorageMB,
      avgDocSizeBytes,
      avgDocSizeKB,
      topUsers,
    });
  } catch (error) {
    return errorResponse(error, "Failed to fetch storage stats");
  }
}
