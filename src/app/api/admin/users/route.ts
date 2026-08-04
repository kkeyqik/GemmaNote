import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

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
