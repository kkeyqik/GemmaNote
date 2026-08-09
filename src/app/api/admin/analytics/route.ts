import { errorResponse, requireAdminUser } from "@/lib/app-auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await requireAdminUser();

    const users = await prisma.user.findMany({
      select: {
        id: true,
        createdAt: true,
        plan: true,
        role: true,
      },
      orderBy: { createdAt: "asc" },
    });

    const monthlyCohorts: Record<
      string,
      {
        month: string;
        yearMonth: string;
        count: number;
        cumulative: number;
        free: number;
        pro: number;
        agency: number;
      }
    > = {};

    let cumulativeCount = 0;

    users.forEach((user) => {
      const date = new Date(user.createdAt);
      const yearMonth = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
      const monthLabel = date.toLocaleString("default", { month: "short", year: "numeric" });

      if (!monthlyCohorts[yearMonth]) {
        monthlyCohorts[yearMonth] = {
          month: monthLabel,
          yearMonth,
          count: 0,
          cumulative: 0,
          free: 0,
          pro: 0,
          agency: 0,
        };
      }

      monthlyCohorts[yearMonth].count += 1;
      const planNormalized = (user.plan || "FREE").toUpperCase();
      if (planNormalized === "PRO") {
        monthlyCohorts[yearMonth].pro += 1;
      } else if (planNormalized === "AGENCY") {
        monthlyCohorts[yearMonth].agency += 1;
      } else {
        monthlyCohorts[yearMonth].free += 1;
      }
    });

    const sortedMonths = Object.keys(monthlyCohorts).sort();
    const cohorts = sortedMonths.map((ym) => {
      const cohort = monthlyCohorts[ym];
      cumulativeCount += cohort.count;
      cohort.cumulative = cumulativeCount;
      return cohort;
    });

    const totalUsers = users.length;
    const latestCohort = cohorts[cohorts.length - 1] || null;
    const previousCohort = cohorts.length > 1 ? cohorts[cohorts.length - 2] : null;

    let monthlyGrowthPercentage = 0;
    if (previousCohort && previousCohort.count > 0) {
      monthlyGrowthPercentage = parseFloat(
        (((latestCohort?.count || 0) - previousCohort.count) / previousCohort.count * 100).toFixed(2)
      );
    } else if (latestCohort && latestCohort.count > 0) {
      monthlyGrowthPercentage = 100;
    }

    return Response.json({
      totalUsers,
      totalCohorts: cohorts.length,
      cohorts,
      summary: {
        latestMonth: latestCohort?.yearMonth || null,
        latestMonthRegistrations: latestCohort?.count || 0,
        previousMonthRegistrations: previousCohort?.count || 0,
        monthlyGrowthPercentage,
      },
    });
  } catch (error) {
    return errorResponse(error, "Failed to load admin analytics");
  }
}
