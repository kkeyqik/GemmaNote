import "server-only";

import type { User } from "@/generated/prisma/client.js";
import { ApiError } from "@/lib/app-auth";
import { prisma } from "@/lib/prisma";

export async function getPersonalWorkspace(user: User) {
  const existing = await prisma.workspace.findFirst({
    where: { ownerId: user.id, name: "Personal" },
  });

  if (existing) return existing;

  return prisma.workspace.create({
    data: {
      name: "Personal",
      ownerId: user.id,
      members: { create: { userId: user.id, role: "OWNER" } },
    },
  });
}

export async function requireWorkspaceAccess(userId: string, workspaceId: string) {
  const workspace = await prisma.workspace.findFirst({
    where: {
      id: workspaceId,
      OR: [
        { ownerId: userId },
        { members: { some: { userId } } },
      ],
    },
  });

  if (!workspace) {
    throw new ApiError(404, "Workspace not found");
  }

  return workspace;
}
