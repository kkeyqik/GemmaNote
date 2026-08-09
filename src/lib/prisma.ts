import "server-only";

import type { PoolConfig } from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "@/generated/prisma/client.js";

const rawConnectionString = process.env.DATABASE_URL;

if (!rawConnectionString) {
  throw new Error("DATABASE_URL is not configured");
}

/**
 * Ensures Neon serverless connection pooling URL format.
 * If pointing to a .neon.tech host without -pooler, converts it to the pooled connection endpoint.
 */
const getPooledConnectionString = (urlStr: string): string => {
  try {
    const url = new URL(urlStr);
    if (url.hostname.endsWith(".neon.tech") && !url.hostname.includes("-pooler")) {
      url.hostname = url.hostname.replace(".neon.tech", "-pooler.neon.tech");
      return url.toString();
    }
  } catch {
    // Fallback to raw string if parsing fails
  }
  return urlStr;
};

const connectionString = getPooledConnectionString(rawConnectionString);

const poolConfig: PoolConfig = {
  connectionString,
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
};

const adapter = new PrismaNeon(poolConfig);

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
