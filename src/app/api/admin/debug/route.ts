import { auth, currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  const diagnostics: Record<string, unknown> = {};

  try {
    // Step 1: Clerk auth()
    const { userId } = await auth();
    diagnostics.step1_clerkAuth = { userId: userId || "NULL" };

    if (!userId) {
      return Response.json({ ...diagnostics, error: "No userId from Clerk auth()" }, { status: 401 });
    }

    // Step 2: Clerk currentUser()
    const clerkUser = await currentUser();
    diagnostics.step2_clerkUser = {
      id: clerkUser?.id,
      email: clerkUser?.emailAddresses?.[0]?.emailAddress,
    };

    // Step 2.5: Check env vars FIRST
    const rawDbUrl = process.env.DATABASE_URL;
    diagnostics.step2_5_envVars = {
      DATABASE_URL_SET: !!rawDbUrl,
      DATABASE_URL_LENGTH: rawDbUrl?.length,
      DATABASE_URL_PREFIX: rawDbUrl?.substring(0, 40) + "...",
      DATABASE_URL_CONTAINS_NEON: rawDbUrl?.includes("neon.tech"),
      DATABASE_URL_CONTAINS_POOLER: rawDbUrl?.includes("-pooler"),
      CLERK_SECRET_KEY_SET: !!process.env.CLERK_SECRET_KEY,
      ADMIN_EMAILS: process.env.ADMIN_EMAILS || "(not set, defaulting to keyqik@gmail.com)",
      NODE_ENV: process.env.NODE_ENV,
    };

    // Step 3: Test raw Prisma connectivity with a simple query
    let rawConnResult;
    try {
      const rawResult: any[] = await prisma.$queryRawUnsafe("SELECT 1 as test");
      rawConnResult = { success: true, result: rawResult };
    } catch (rawErr: any) {
      rawConnResult = {
        success: false,
        errorName: rawErr?.name,
        errorMessage: rawErr?.message,
        errorCode: rawErr?.code,
        errorConstructor: rawErr?.constructor?.name,
        errorKeys: rawErr ? Object.keys(rawErr) : [],
        fullError: JSON.stringify(rawErr, Object.getOwnPropertyNames(rawErr || {}), 2)?.substring(0, 2000),
      };
    }
    diagnostics.step3_rawConnection = rawConnResult;

    // Step 4: Prisma findUnique by clerkId
    let dbUser;
    try {
      dbUser = await prisma.user.findUnique({ where: { clerkId: userId } });
      diagnostics.step4_prismaFindByClerkId = dbUser
        ? { id: dbUser.id, email: dbUser.email, role: dbUser.role, plan: dbUser.plan, isSuspended: dbUser.isSuspended, clerkId: dbUser.clerkId }
        : "NOT_FOUND";
    } catch (prismaError: any) {
      diagnostics.step4_prismaFindByClerkId = {
        errorName: prismaError?.name,
        errorMessage: prismaError?.message,
        errorCode: prismaError?.code,
        errorConstructor: prismaError?.constructor?.name,
        errorKeys: prismaError ? Object.keys(prismaError) : [],
        fullError: JSON.stringify(prismaError, Object.getOwnPropertyNames(prismaError || {}), 2)?.substring(0, 2000),
      };
    }

    // Step 5: Prisma findUnique by email (fallback check)
    if (!dbUser) {
      const email = clerkUser?.emailAddresses?.[0]?.emailAddress || "";
      try {
        const byEmail = await prisma.user.findUnique({ where: { email } });
        diagnostics.step5_prismaFindByEmail = byEmail
          ? { id: byEmail.id, email: byEmail.email, role: byEmail.role, clerkId: byEmail.clerkId, clerkIdMatches: byEmail.clerkId === userId }
          : "NOT_FOUND";
      } catch (emailErr: any) {
        diagnostics.step5_prismaFindByEmail = {
          errorName: emailErr?.name,
          errorMessage: emailErr?.message,
          fullError: JSON.stringify(emailErr, Object.getOwnPropertyNames(emailErr || {}), 2)?.substring(0, 1000),
        };
      }
    }

    // Step 6: Admin check (only if dbUser was found)
    if (dbUser) {
      const adminEmails = (process.env.ADMIN_EMAILS || "keyqik@gmail.com").split(",").map(e => e.trim().toLowerCase());
      diagnostics.step6_adminCheck = {
        adminEmails,
        userEmail: dbUser.email?.toLowerCase(),
        userRole: dbUser.role,
        isAdminByRole: dbUser.role === "ADMIN",
        isAdminByEmail: adminEmails.includes((dbUser.email || "").toLowerCase()),
        WOULD_PASS: dbUser.role === "ADMIN" || adminEmails.includes((dbUser.email || "").toLowerCase()),
      };
    }

    return Response.json(diagnostics, { status: 200 });
  } catch (error: any) {
    diagnostics.uncaughtError = {
      message: error?.message,
      name: error?.name,
      code: error?.code,
      constructor: error?.constructor?.name,
      stack: error?.stack?.split("\n").slice(0, 8),
    };
    return Response.json(diagnostics, { status: 500 });
  }
}
