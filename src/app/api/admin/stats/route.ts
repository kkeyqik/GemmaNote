import { errorResponse, requireAdminUser } from "@/lib/app-auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await requireAdminUser();

    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

    const [
      totalUsers,
      totalNotes,
      totalWorkspaces,
      activeUsers7d,
      latestUsers,
      latestNotes,
      documentsContent,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.document.count(),
      prisma.workspace.count(),
      prisma.user.count({
        where: { updatedAt: { gte: sevenDaysAgo } },
      }),
      prisma.user.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          email: true,
          clerkId: true,
          role: true,
          plan: true,
          createdAt: true,
        },
      }),
      prisma.document.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          title: true,
          userId: true,
          createdAt: true,
        },
      }),
      prisma.document.findMany({
        select: {
          content: true,
          plainText: true,
        },
      }),
    ]);

    const estimatedStorageBytes = documentsContent.reduce((acc, doc) => {
      const contentLen = doc.content ? doc.content.length : 0;
      const plainTextLen = doc.plainText ? doc.plainText.length : 0;
      return acc + contentLen + plainTextLen;
    }, 0);

    return Response.json({
      totalUsers,
      totalNotes,
      totalWorkspaces,
      activeUsers7d,
      estimatedStorageBytes,
      estimatedStorageSize: `${(estimatedStorageBytes / 1024).toFixed(2)} KB`,
      recentActivities: {
        latestUsers,
        latestNotes,
      },
    });
  } catch (error) {
    return errorResponse(error, "Failed to fetch admin stats");
  }
}
