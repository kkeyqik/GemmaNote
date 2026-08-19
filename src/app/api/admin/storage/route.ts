import { errorResponse, requireAdminUser } from "@/lib/app-auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await requireAdminUser();

    const [storageAggregates, topUsersRaw] = await Promise.all([
      prisma.$queryRaw<Array<{
        total_documents: bigint | number;
        total_storage_bytes: bigint | number | null;
        trashed_count: bigint | number;
        trashed_storage_bytes: bigint | number | null;
      }>>`
        SELECT
          COUNT(*) AS total_documents,
          COALESCE(SUM(
            octet_length(COALESCE(content, '')) +
            octet_length(COALESCE("plainText", ''))
          ), 0) AS total_storage_bytes,
          COUNT(*) FILTER (WHERE "isTrash" = true) AS trashed_count,
          COALESCE(SUM(
            CASE WHEN "isTrash" = true THEN
              octet_length(COALESCE(content, '')) +
              octet_length(COALESCE("plainText", ''))
            ELSE 0 END
          ), 0) AS trashed_storage_bytes
        FROM "Document"
      `,
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

    const aggregate = storageAggregates[0];
    const totalDocuments = Number(aggregate?.total_documents ?? 0);
    const totalStorageBytes = Number(aggregate?.total_storage_bytes ?? 0);
    const trashedCount = Number(aggregate?.trashed_count ?? 0);
    const trashedStorageBytes = Number(aggregate?.trashed_storage_bytes ?? 0);

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
