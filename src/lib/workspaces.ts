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

export type WorkspacePermission = "READ" | "WRITE" | "ADMIN";

export async function requireWorkspaceAccess(
  userId: string,
  workspaceId: string,
  permission: WorkspacePermission = "READ",
) {
  const workspace = await prisma.workspace.findFirst({
    where: {
      id: workspaceId,
      OR: [
        { ownerId: userId },
        { members: { some: { userId } } },
      ],
    },
    include: {
      members: {
        where: { userId },
        select: { role: true },
      },
    },
  });

  if (!workspace) {
    throw new ApiError(404, "Workspace not found");
  }

  const role = workspace.ownerId === userId ? "OWNER" : workspace.members[0]?.role;
  const allowed =
    permission === "READ"
      ? Boolean(role)
      : permission === "WRITE"
        ? role === "OWNER" || role === "ADMIN" || role === "MEMBER"
        : role === "OWNER" || role === "ADMIN";

  if (!allowed) {
    throw new ApiError(403, "You do not have permission to modify this workspace");
  }

  return workspace;
}
