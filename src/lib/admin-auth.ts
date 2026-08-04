import "server-only";

import { auth, currentUser } from "@clerk/nextjs/server";

export type AdminAccess = "authorized" | "forbidden" | "unauthenticated";

/**
 * Authorizes administrators from Clerk public metadata. Set
 * `publicMetadata.role` to `admin` for each trusted administrator in Clerk.
 */
export async function getAdminAccess(): Promise<AdminAccess> {
  const { userId } = await auth();

  if (!userId) {
    return "unauthenticated";
  }

  const user = await currentUser();
  const role = (user?.publicMetadata as { role?: unknown } | undefined)?.role;

  return role === "admin" ? "authorized" : "forbidden";
}
