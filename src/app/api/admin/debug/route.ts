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

    // Step 3: Prisma findUnique
    let dbUser;
    try {
      dbUser = await prisma.user.findUnique({ where: { clerkId: userId } });
      diagnostics.step3_prismaFind = dbUser
        ? { id: dbUser.id, email: dbUser.email, role: dbUser.role, plan: dbUser.plan, isSuspended: dbUser.isSuspended }
        : "NOT_FOUND";
    } catch (prismaError: any) {
      diagnostics.step3_prismaFind = { error: prismaError.message, code: prismaError.code };
      return Response.json(diagnostics, { status: 500 });
    }

    // Step 4: If no user, would upsert create one?
    if (!dbUser) {
      const email = clerkUser?.emailAddresses?.[0]?.emailAddress ?? `${userId}@user.clerk.dev`;
      diagnostics.step4_wouldCreate = { email, role: "USER" };
    }

    // Step 5: Admin check
    const adminEmails = (process.env.ADMIN_EMAILS || "keyqik@gmail.com").split(",").map(e => e.trim().toLowerCase());
    diagnostics.step5_adminCheck = {
      adminEmails,
      userEmail: dbUser?.email?.toLowerCase(),
      userRole: dbUser?.role,
      isAdminByRole: dbUser?.role === "ADMIN",
      isAdminByEmail: adminEmails.includes((dbUser?.email || "").toLowerCase()),
      WOULD_PASS: dbUser?.role === "ADMIN" || adminEmails.includes((dbUser?.email || "").toLowerCase()),
    };

    // Step 6: Check env vars
    diagnostics.step6_envVars = {
      DATABASE_URL_SET: !!process.env.DATABASE_URL,
      DATABASE_URL_PREFIX: process.env.DATABASE_URL?.substring(0, 30) + "...",
      CLERK_SECRET_KEY_SET: !!process.env.CLERK_SECRET_KEY,
      ADMIN_EMAILS: process.env.ADMIN_EMAILS || "(not set, using default keyqik@gmail.com)",
    };

    return Response.json(diagnostics, { status: 200 });
  } catch (error: any) {
    diagnostics.uncaughtError = {
      message: error.message,
      name: error.name,
      code: error.code,
      stack: error.stack?.split("\n").slice(0, 5),
    };
    return Response.json(diagnostics, { status: 500 });
  }
}
