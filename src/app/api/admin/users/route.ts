import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@/generated/prisma/client.js';

export const dynamic = 'force-dynamic';

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: 'desc' }
    })
    return Response.json(users)
  } catch (error) {
    return Response.json({ error: 'Failed to fetch users' }, { status: 500 })
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json()
    const { id, plan, isSuspended } = body

    const user = await prisma.user.update({
      where: { id },
      data: {
        ...(plan && { plan }),
        ...(isSuspended !== undefined && { isSuspended })
      }
    })

    return Response.json(user)
  } catch (error) {
    return Response.json({ error: 'Failed to update user' }, { status: 500 })
  }
}
