import "server-only";

import type { User } from "@/generated/prisma/client.js";
import { prisma } from "@/lib/prisma";
import { auth, currentUser } from "@clerk/nextjs/server";
import { captureException } from "@/lib/sentry";

export const PLAN_LIMITS = {
  FREE: 10,
  PRO: 200,
  AGENCY: null,
} as const;

export type Plan = keyof typeof PLAN_LIMITS;

export class ApiError extends Error {
  constructor(
    public readonly status: number,
    message: string,
  ) {
    super(message);
  }
}

export function getPlan(value: string): Plan {
  return value === "PRO" || value === "AGENCY" ? value : "FREE";
}

export function hasMinimumPlan(plan: string, minimum: Plan): boolean {
  const rank: Record<Plan, number> = { FREE: 0, PRO: 1, AGENCY: 2 };
  return rank[getPlan(plan)] >= rank[minimum];
}

export function getPlanFeatures(plan: string) {
  const normalizedPlan = getPlan(plan);

  return {
    cloudSync: true,
    advancedSeo: hasMinimumPlan(normalizedPlan, "PRO"),
    intentAndStyle: hasMinimumPlan(normalizedPlan, "PRO"),
    teamWorkspaces: hasMinimumPlan(normalizedPlan, "AGENCY"),
    customVoices: hasMinimumPlan(normalizedPlan, "AGENCY"),
    generationLimit: PLAN_LIMITS[normalizedPlan],
  };
}

export function isAdmin(user: User): boolean {
  const adminEmails = (process.env.ADMIN_EMAILS || "keyqik@gmail.com")
    .split(",")
    .map((e) => e.trim().toLowerCase());

  return user.role === "ADMIN" || adminEmails.includes(user.email.toLowerCase());
}

export async function requireAdminUser(): Promise<User> {
  const user = await requireAppUser();
  if (!isAdmin(user)) {
    throw new ApiError(403, "Admin access required. You do not have permission to access the admin panel.");
  }
  return user;
}

export async function requireAppUser(): Promise<User> {
  const { userId } = await auth();

  if (!userId) {
    throw new ApiError(401, "Unauthorized");
  }

  let user = await prisma.user.findUnique({
    where: { clerkId: userId },
  });

  const adminEmails = (process.env.ADMIN_EMAILS || "keyqik@gmail.com")
    .split(",")
    .map((e) => e.trim().toLowerCase());

  if (!user) {
    // ClerkId not found — resolve the email from Clerk
    const clerkUser = await currentUser();
    const email = clerkUser?.emailAddresses[0]?.emailAddress ?? `${userId}@user.clerk.dev`;
    const initialRole = adminEmails.includes(email.toLowerCase()) ? "ADMIN" : "USER";

    // Fallback: check if a user with this email already exists (clerkId mismatch)
    // This happens when the Clerk instance changes (dev → prod, app migration, etc.)
    const existingByEmail = await prisma.user.findUnique({
      where: { email },
    });

    if (existingByEmail) {
      // Auto-heal: update the stale clerkId to the current one
      user = await prisma.user.update({
        where: { id: existingByEmail.id },
        data: { clerkId: userId },
      });
    } else {
      // Genuinely new user — create
      user = await prisma.user.create({
        data: {
          clerkId: userId,
          email,
          role: initialRole,
        },
      });
    }
  }

  // Auto-elevate admin emails if role is still USER in DB
  if (user && user.role !== "ADMIN" && adminEmails.includes(user.email.toLowerCase())) {
    user = await prisma.user.update({
      where: { id: user.id },
      data: { role: "ADMIN" },
    });
  }

  if (user.isSuspended) {
    throw new ApiError(403, "Your account has been suspended. Please contact support.");
  }

  return user;
}

export function requireMinimumPlan(user: User, minimum: Plan) {
  if (!hasMinimumPlan(user.plan, minimum)) {
    throw new ApiError(403, `${minimum} plan required`);
  }
}

export function currentUsagePeriod() {
  const now = new Date();
  return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1));
}

export async function getUsage(user: User) {
  const periodStart = currentUsagePeriod();
  const record = await prisma.usageRecord.findUnique({
    where: { userId_periodStart: { userId: user.id, periodStart } },
  });
  const plan = getPlan(user.plan);

  return {
    used: record?.count ?? 0,
    limit: PLAN_LIMITS[plan],
    periodStart,
  };
}

export async function consumeGeneration(user: User) {
  const periodStart = currentUsagePeriod();
  const plan = getPlan(user.plan);
  const limit = PLAN_LIMITS[plan];

  await prisma.usageRecord.upsert({
    where: { userId_periodStart: { userId: user.id, periodStart } },
    create: { userId: user.id, periodStart },
    update: {},
  });

  if (limit !== null) {
    const result = await prisma.usageRecord.updateMany({
      where: { userId: user.id, periodStart, count: { lt: limit } },
      data: { count: { increment: 1 } },
    });

    if (result.count === 0) {
      throw new ApiError(429, `Your ${plan} generation limit has been reached for this month`);
    }
  } else {
    await prisma.usageRecord.update({
      where: { userId_periodStart: { userId: user.id, periodStart } },
      data: { count: { increment: 1 } },
    });
  }

  await prisma.user.update({
    where: { id: user.id },
    data: { usageCount: { increment: 1 } },
  });

  return getUsage(user);
}

export function errorResponse(error: unknown, fallback = "Unexpected server error") {
  if (error instanceof ApiError) {
    return Response.json({ error: error.message }, { status: error.status });
  }

  captureException(error);
  return Response.json({ error: fallback }, { status: 500 });
}
