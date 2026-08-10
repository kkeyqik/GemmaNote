import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client.js";

const pool = new Pool({
  connectionString:
    "postgresql://neondb_owner:npg_lURiDoGeM29C@ep-long-morning-ayap0cae.c-5.us-east-2.aws.neon.tech/neondb?sslmode=require",
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function run() {
  // 1. Inspect actual Postgres columns on User table
  const cols: any[] = await prisma.$queryRawUnsafe(
    `SELECT column_name, data_type, column_default FROM information_schema.columns WHERE table_name = 'User' ORDER BY ordinal_position`
  );
  console.log("=== ACTUAL POSTGRES COLUMNS ON User TABLE ===");
  for (const c of cols) {
    console.log(`  ${c.column_name} | ${c.data_type} | default: ${c.column_default}`);
  }

  // 2. Raw user rows
  const users: any[] = await prisma.$queryRawUnsafe(
    `SELECT id, email, role, plan, "isSuspended", "clerkId" FROM "User"`
  );
  console.log("\n=== RAW USER ROWS ===");
  console.log(JSON.stringify(users, null, 2));

  // 3. Test requireAdminUser logic manually
  for (const u of users) {
    const isAdminByRole = u.role === "ADMIN";
    const isAdminByEmail = ["keyqik@gmail.com"].includes(
      (u.email || "").toLowerCase()
    );
    console.log(
      `\nUser: ${u.email} | role=${u.role} | isSuspended=${u.isSuspended} | isAdminByRole=${isAdminByRole} | isAdminByEmail=${isAdminByEmail} | WOULD_PASS_ADMIN_CHECK=${isAdminByRole || isAdminByEmail}`
    );
  }
}

run()
  .catch((e) => console.error("DB ERROR:", e))
  .finally(() => process.exit());
