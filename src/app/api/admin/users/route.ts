import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@/generated/prisma/client.js';
import { getAdminAccess } from '@/lib/admin-auth';

export const dynamic = 'force-dynamic';

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });
const validPlans = new Set(['FREE', 'PRO', 'AGENCY']);

async function requireAdminApiAccess() {
  const access = await getAdminAccess();

  if (access === 'authorized') {
    return null;
  }

  return Response.json(
    { error: access === 'unauthenticated' ? 'Authentication required' : 'Administrator access required' },
    { status: access === 'unauthenticated' ? 401 : 403 },
  );
}

export async function GET() {
  const authorizationError = await requireAdminApiAccess();
  if (authorizationError) return authorizationError;

  try {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        email: true,
        plan: true,
        usageCount: true,
        isSuspended: true,
        createdAt: true,
      },
    });
    return Response.json(users)
  } catch {
    return Response.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  const authorizationError = await requireAdminApiAccess();
  if (authorizationError) return authorizationError;

  try {
    const body: unknown = await req.json();
    if (!body || typeof body !== 'object') {
      return Response.json({ error: 'Invalid request body' }, { status: 400 });
    }

    const { id, plan, isSuspended } = body as {
      id?: unknown;
      plan?: unknown;
      isSuspended?: unknown;
    };

    if (typeof id !== 'string' || !id) {
      return Response.json({ error: 'A user id is required' }, { status: 400 });
    }

    if (plan !== undefined && (typeof plan !== 'string' || !validPlans.has(plan))) {
      return Response.json({ error: 'Invalid plan' }, { status: 400 });
    }

    if (isSuspended !== undefined && typeof isSuspended !== 'boolean') {
      return Response.json({ error: 'isSuspended must be a boolean' }, { status: 400 });
    }

    if (plan === undefined && isSuspended === undefined) {
      return Response.json({ error: 'No supported fields to update' }, { status: 400 });
    }

    const user = await prisma.user.update({
      where: { id },
      data: {
        ...(plan !== undefined && { plan }),
        ...(isSuspended !== undefined && { isSuspended })
      },
      select: {
        id: true,
        email: true,
        plan: true,
        usageCount: true,
        isSuspended: true,
        createdAt: true,
      },
    });

    return Response.json(user);
  } catch {
    return Response.json({ error: 'Failed to update user' }, { status: 500 });
  }
}
