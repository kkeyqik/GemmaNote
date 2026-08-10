import { errorResponse, requireAdminUser } from "@/lib/app-auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await requireAdminUser();

    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const sixtyDaysAgo = new Date(Date.now() - 60 * 24 * 60 * 60 * 1000);

    const [
      totalUsers,
      totalNotes,
      totalWorkspaces,
      activeUsers7d,
      usersCreatedLast30d,
      usersCreatedPrev30d,
      totalGenerationsAgg,
      planCounts,
      latestUsers,
      latestNotes,
      documentsContent,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.document.count(),
      prisma.workspace.count(),
      // Active users: users who have documents updated in the last 7 days
      prisma.user.count({
        where: {
          documents: {
            some: {
              updatedAt: { gte: sevenDaysAgo },
            },
          },
        },
      }),
      prisma.user.count({
        where: { createdAt: { gte: thirtyDaysAgo } },
      }),
      prisma.user.count({
        where: {
          createdAt: {
            gte: sixtyDaysAgo,
            lt: thirtyDaysAgo,
          },
        },
      }),
      prisma.user.aggregate({
        _sum: { usageCount: true },
      }),
      prisma.user.groupBy({
        by: ["plan"],
        _count: { id: true },
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

    // Calculate growth percentage
    let userGrowthPercentage = 0;
    if (usersCreatedPrev30d > 0) {
      userGrowthPercentage = Math.round(
        ((usersCreatedLast30d - usersCreatedPrev30d) / usersCreatedPrev30d) * 100
      );
    } else if (usersCreatedLast30d > 0) {
      userGrowthPercentage = 100;
    }

    // Process plan counts
    const planMap: Record<string, number> = { FREE: 0, PRO: 0, AGENCY: 0 };
    planCounts.forEach((group) => {
      const p = (group.plan || "FREE").toUpperCase();
      planMap[p] = (planMap[p] || 0) + group._count.id;
    });

    const totalPlanUsers = totalUsers || 1;
    const planDistribution = [
      {
        plan: "Free",
        key: "FREE",
        count: planMap["FREE"] || 0,
        percentage: Math.round(((planMap["FREE"] || 0) / totalPlanUsers) * 100),
        color: "bg-slate-500",
        barColor: "bg-slate-500",
        badgeBg: "bg-slate-100 text-slate-700 border-slate-200",
      },
      {
        plan: "Pro",
        key: "PRO",
        count: planMap["PRO"] || 0,
        percentage: Math.round(((planMap["PRO"] || 0) / totalPlanUsers) * 100),
        color: "bg-indigo-500",
        barColor: "bg-indigo-600",
        badgeBg: "bg-indigo-50 text-indigo-700 border-indigo-200",
      },
      {
        plan: "Agency",
        key: "AGENCY",
        count: planMap["AGENCY"] || 0,
        percentage: Math.round(((planMap["AGENCY"] || 0) / totalPlanUsers) * 100),
        color: "bg-purple-500",
        barColor: "bg-purple-600",
        badgeBg: "bg-purple-50 text-purple-700 border-purple-200",
      },
    ];

    const estimatedStorageBytes = documentsContent.reduce((acc, doc) => {
      const contentLen = doc.content ? doc.content.length : 0;
      const plainTextLen = doc.plainText ? doc.plainText.length : 0;
      return acc + contentLen + plainTextLen;
    }, 0);

    const totalGenerations = totalGenerationsAgg._sum.usageCount || 0;

    return Response.json({
      totalUsers,
      totalNotes,
      totalDocuments: totalNotes,
      totalWorkspaces,
      activeUsers7d,
      activeUsers: activeUsers7d,
      totalGenerations,
      userGrowthPercentage,
      planDistribution,
      planMap,
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
