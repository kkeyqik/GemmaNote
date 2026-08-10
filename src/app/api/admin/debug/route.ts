import { auth, currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

interface DiagnosticResult {
  status: "PASS" | "FAIL" | "WARN" | "SKIP";
  label: string;
  detail: unknown;
  fix?: string;
}

export async function GET(req: NextRequest) {
  const results: DiagnosticResult[] = [];
  const autoFix = req.nextUrl.searchParams.get("autofix") === "true";

  // ──────────────────────────────────────────────
  // LAYER 1: VERCEL RUNTIME ENVIRONMENT
  // ──────────────────────────────────────────────
  const envVars = {
    DATABASE_URL: !!process.env.DATABASE_URL,
    DATABASE_URL_PREFIX: process.env.DATABASE_URL?.substring(0, 50) + "...",
    DATABASE_URL_HAS_NEON: process.env.DATABASE_URL?.includes("neon.tech") ?? false,
    DATABASE_URL_HAS_POOLER: process.env.DATABASE_URL?.includes("-pooler") ?? false,
    CLERK_SECRET_KEY: !!process.env.CLERK_SECRET_KEY,
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    ADMIN_EMAILS: process.env.ADMIN_EMAILS || "(not set — defaulting to keyqik@gmail.com)",
    NODE_ENV: process.env.NODE_ENV,
    VERCEL: process.env.VERCEL || "(not on Vercel)",
    VERCEL_ENV: process.env.VERCEL_ENV || "(not on Vercel)",
    VERCEL_REGION: process.env.VERCEL_REGION || "(not on Vercel)",
  };

  results.push({
    status: envVars.DATABASE_URL ? "PASS" : "FAIL",
    label: "ENV: DATABASE_URL",
    detail: envVars.DATABASE_URL
      ? { prefix: envVars.DATABASE_URL_PREFIX, hasNeon: envVars.DATABASE_URL_HAS_NEON, hasPooler: envVars.DATABASE_URL_HAS_POOLER }
      : "DATABASE_URL is NOT SET — Prisma cannot connect",
    fix: !envVars.DATABASE_URL ? "Add DATABASE_URL to Vercel Environment Variables" : undefined,
  });

  results.push({
    status: envVars.CLERK_SECRET_KEY ? "PASS" : "FAIL",
    label: "ENV: CLERK_SECRET_KEY",
    detail: envVars.CLERK_SECRET_KEY ? "Set" : "NOT SET",
    fix: !envVars.CLERK_SECRET_KEY ? "Add CLERK_SECRET_KEY to Vercel Environment Variables" : undefined,
  });

  results.push({
    status: "PASS",
    label: "ENV: Runtime Info",
    detail: { NODE_ENV: envVars.NODE_ENV, VERCEL: envVars.VERCEL, VERCEL_ENV: envVars.VERCEL_ENV, VERCEL_REGION: envVars.VERCEL_REGION },
  });

  // ──────────────────────────────────────────────
  // LAYER 2: CLERK AUTHENTICATION
  // ──────────────────────────────────────────────
  let clerkUserId: string | null = null;
  let clerkEmail: string | null = null;

  try {
    const { userId } = await auth();
    clerkUserId = userId;
    results.push({
      status: userId ? "PASS" : "FAIL",
      label: "CLERK: auth()",
      detail: userId ? { userId } : "No userId — user is not authenticated",
      fix: !userId ? "Navigate to /login and sign in first" : undefined,
    });
  } catch (err: any) {
    results.push({
      status: "FAIL",
      label: "CLERK: auth()",
      detail: { error: err?.message, name: err?.name },
      fix: "Check CLERK_SECRET_KEY and NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY",
    });
  }

  if (clerkUserId) {
    try {
      const clerkUser = await currentUser();
      clerkEmail = clerkUser?.emailAddresses?.[0]?.emailAddress || null;
      results.push({
        status: clerkEmail ? "PASS" : "WARN",
        label: "CLERK: currentUser()",
        detail: {
          id: clerkUser?.id,
          email: clerkEmail,
          firstName: clerkUser?.firstName,
          lastName: clerkUser?.lastName,
          imageUrl: clerkUser?.imageUrl ? "✓" : "✗",
          emailCount: clerkUser?.emailAddresses?.length,
        },
      });
    } catch (err: any) {
      results.push({
        status: "FAIL",
        label: "CLERK: currentUser()",
        detail: { error: err?.message, name: err?.name },
      });
    }
  }

  // ──────────────────────────────────────────────
  // LAYER 3: PRISMA / NEON RAW CONNECTIVITY
  // ──────────────────────────────────────────────
  let dbConnected = false;

  try {
    const startMs = Date.now();
    const raw: any[] = await prisma.$queryRawUnsafe("SELECT 1 as health_check, NOW() as server_time, current_database() as db_name, version() as pg_version");
    const latencyMs = Date.now() - startMs;

    dbConnected = true;
    results.push({
      status: latencyMs < 1000 ? "PASS" : "WARN",
      label: "NEON: Raw Connection",
      detail: {
        connected: true,
        latencyMs,
        serverTime: raw[0]?.server_time,
        database: raw[0]?.db_name,
        pgVersion: raw[0]?.pg_version?.substring(0, 60),
      },
    });
  } catch (err: any) {
    results.push({
      status: "FAIL",
      label: "NEON: Raw Connection",
      detail: {
        connected: false,
        errorName: err?.name,
        errorMessage: err?.message || "(empty message)",
        errorCode: err?.code,
        errorConstructor: err?.constructor?.name,
        allKeys: err ? Object.keys(err) : [],
        fullError: JSON.stringify(err, Object.getOwnPropertyNames(err || {}), 2)?.substring(0, 3000),
      },
      fix: "Check DATABASE_URL on Vercel. Ensure Neon project is active and not suspended.",
    });
  }

  // ──────────────────────────────────────────────
  // LAYER 4: PRISMA SCHEMA VALIDATION
  // ──────────────────────────────────────────────
  if (dbConnected) {
    try {
      const cols: any[] = await prisma.$queryRawUnsafe(
        `SELECT column_name, data_type, column_default FROM information_schema.columns WHERE table_name = 'User' ORDER BY ordinal_position`
      );
      const colNames = cols.map((c: any) => c.column_name);
      const requiredCols = ["id", "clerkId", "email", "role", "plan", "isSuspended", "createdAt"];
      const missing = requiredCols.filter(c => !colNames.includes(c));

      results.push({
        status: missing.length === 0 ? "PASS" : "FAIL",
        label: "PRISMA: User Table Schema",
        detail: {
          columns: cols.map((c: any) => `${c.column_name} (${c.data_type}, default: ${c.column_default || "none"})`),
          missingColumns: missing.length > 0 ? missing : "None — all required columns present",
        },
        fix: missing.length > 0 ? "Run: npx prisma db push" : undefined,
      });
    } catch (err: any) {
      results.push({ status: "FAIL", label: "PRISMA: User Table Schema", detail: { error: err?.message } });
    }

    // Total user count
    try {
      const count = await prisma.user.count();
      results.push({ status: "PASS", label: "PRISMA: User Count", detail: { totalUsers: count } });
    } catch (err: any) {
      results.push({ status: "FAIL", label: "PRISMA: User Count", detail: { error: err?.message } });
    }
  }

  // ──────────────────────────────────────────────
  // LAYER 5: CLERK ↔ NEON SYNC VERIFICATION
  // ──────────────────────────────────────────────
  if (clerkUserId && dbConnected) {
    // 5a: Lookup by clerkId
    let dbUser: any = null;
    try {
      dbUser = await prisma.user.findUnique({ where: { clerkId: clerkUserId } });
      results.push({
        status: dbUser ? "PASS" : "WARN",
        label: "SYNC: Lookup by clerkId",
        detail: dbUser
          ? { id: dbUser.id, email: dbUser.email, role: dbUser.role, plan: dbUser.plan, clerkId: dbUser.clerkId }
          : `No user found with clerkId="${clerkUserId}"`,
      });
    } catch (err: any) {
      results.push({
        status: "FAIL",
        label: "SYNC: Lookup by clerkId",
        detail: {
          errorName: err?.name,
          errorMessage: err?.message || "(empty)",
          errorCode: err?.code,
          errorConstructor: err?.constructor?.name,
          allKeys: err ? Object.keys(err) : [],
          fullError: JSON.stringify(err, Object.getOwnPropertyNames(err || {}), 2)?.substring(0, 2000),
        },
      });
    }

    // 5b: Lookup by email (fallback)
    let dbUserByEmail: any = null;
    if (!dbUser && clerkEmail) {
      try {
        dbUserByEmail = await prisma.user.findUnique({ where: { email: clerkEmail } });
        if (dbUserByEmail) {
          results.push({
            status: "WARN",
            label: "SYNC: Lookup by email (fallback)",
            detail: {
              found: true,
              id: dbUserByEmail.id,
              email: dbUserByEmail.email,
              staleClerkId: dbUserByEmail.clerkId,
              currentClerkId: clerkUserId,
              MISMATCH: dbUserByEmail.clerkId !== clerkUserId,
            },
            fix: `clerkId in DB is "${dbUserByEmail.clerkId}" but Clerk says "${clerkUserId}". ${autoFix ? "AUTO-FIXING..." : "Add ?autofix=true to URL to auto-fix."}`,
          });

          // Auto-fix if requested
          if (autoFix) {
            try {
              const updated = await prisma.user.update({
                where: { id: dbUserByEmail.id },
                data: { clerkId: clerkUserId },
              });
              results.push({
                status: "PASS",
                label: "SYNC: AUTO-FIX clerkId",
                detail: { updated: true, newClerkId: updated.clerkId, email: updated.email, role: updated.role },
              });
              dbUser = updated;
            } catch (fixErr: any) {
              results.push({
                status: "FAIL",
                label: "SYNC: AUTO-FIX clerkId",
                detail: { error: fixErr?.message },
              });
            }
          }
        } else {
          results.push({
            status: "FAIL",
            label: "SYNC: Lookup by email (fallback)",
            detail: `No user found with email="${clerkEmail}" either. User doesn't exist in DB at all.`,
            fix: "User needs to be created. Visit /dashboard to trigger automatic user creation.",
          });
        }
      } catch (err: any) {
        results.push({
          status: "FAIL",
          label: "SYNC: Lookup by email (fallback)",
          detail: { error: err?.message },
        });
      }
    }

    // 5c: Admin Role Check
    const activeUser = dbUser || dbUserByEmail;
    if (activeUser) {
      const adminEmails = (process.env.ADMIN_EMAILS || "keyqik@gmail.com").split(",").map((e: string) => e.trim().toLowerCase());
      const isAdminByRole = activeUser.role === "ADMIN";
      const isAdminByEmail = adminEmails.includes((activeUser.email || "").toLowerCase());
      const wouldPass = isAdminByRole || isAdminByEmail;

      results.push({
        status: wouldPass ? "PASS" : "FAIL",
        label: "SYNC: Admin Access Check",
        detail: {
          email: activeUser.email,
          role: activeUser.role,
          isAdminByRole,
          isAdminByEmail,
          adminEmails,
          WOULD_GRANT_ADMIN: wouldPass,
          isSuspended: activeUser.isSuspended,
        },
        fix: !wouldPass ? `Set ADMIN_EMAILS env var to include "${activeUser.email}" or update user role to ADMIN in DB` : undefined,
      });

      // Auto-elevate admin if role doesn't match
      if (autoFix && isAdminByEmail && !isAdminByRole) {
        try {
          const elevated = await prisma.user.update({
            where: { id: activeUser.id },
            data: { role: "ADMIN" },
          });
          results.push({
            status: "PASS",
            label: "SYNC: AUTO-FIX role elevation",
            detail: { elevated: true, newRole: elevated.role },
          });
        } catch (fixErr: any) {
          results.push({
            status: "FAIL",
            label: "SYNC: AUTO-FIX role elevation",
            detail: { error: fixErr?.message },
          });
        }
      }
    }

    // 5d: Check for duplicate users
    if (clerkEmail) {
      try {
        const allWithEmail: any[] = await prisma.$queryRawUnsafe(
          `SELECT id, "clerkId", email, role FROM "User" WHERE LOWER(email) = LOWER($1)`,
          clerkEmail
        );
        if (allWithEmail.length > 1) {
          results.push({
            status: "FAIL",
            label: "SYNC: Duplicate User Check",
            detail: { duplicates: allWithEmail, count: allWithEmail.length },
            fix: "Multiple DB rows for the same email. Delete stale rows.",
          });
        } else {
          results.push({
            status: "PASS",
            label: "SYNC: Duplicate User Check",
            detail: { duplicates: 0 },
          });
        }
      } catch (err: any) {
        results.push({
          status: "WARN",
          label: "SYNC: Duplicate User Check",
          detail: { error: err?.message },
        });
      }
    }
  }

  // ──────────────────────────────────────────────
  // SUMMARY
  // ──────────────────────────────────────────────
  const passed = results.filter(r => r.status === "PASS").length;
  const failed = results.filter(r => r.status === "FAIL").length;
  const warned = results.filter(r => r.status === "WARN").length;

  return Response.json(
    {
      summary: {
        total: results.length,
        passed,
        failed,
        warned,
        overallHealth: failed === 0 ? (warned === 0 ? "HEALTHY" : "DEGRADED") : "UNHEALTHY",
        timestamp: new Date().toISOString(),
        tip: "Add ?autofix=true to auto-repair clerkId mismatches and role elevation",
      },
      diagnostics: results,
    },
    { status: failed > 0 ? 500 : 200 }
  );
}
