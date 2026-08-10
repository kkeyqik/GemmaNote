import "server-only";

import { PrismaNeonHttp } from "@prisma/adapter-neon";
import { PrismaClient } from "@/generated/prisma/client.js";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not configured");
}

/**
 * Uses Neon's HTTP-based serverless driver (PrismaNeonHttp).
 *
 * Why HTTP instead of WebSocket (PrismaNeon)?
 * - PrismaNeon uses WebSocket connections via @neondatabase/serverless Pool.
 * - WebSocket connections fail on Vercel serverless with an "ErrorEvent" because
 *   the short-lived Lambda environment can't maintain persistent WS connections.
 * - PrismaNeonHttp sends SQL over HTTPS — zero connection overhead, works perfectly
 *   on Vercel/Cloudflare/edge serverless.
 *
 * @see https://www.prisma.io/docs/orm/overview/databases/neon#how-to-connect-using-the-neon-serverless-driver
 */
const adapter = new PrismaNeonHttp(connectionString, {
  arrayMode: false,
  fullResults: true,
});

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
