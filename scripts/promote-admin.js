// Support tsx / module import of src/lib/prisma
require("ts-node/register") || {};

const { prisma } = require("../src/lib/prisma");

async function main() {
  const users = await prisma.user.findMany();
  console.log("Current users in Neon PostgreSQL DB:", users.map(u => ({ id: u.id, email: u.email, role: u.role, clerkId: u.clerkId })));

  if (users.length > 0) {
    const updated = await prisma.user.updateMany({
      data: { role: "ADMIN" }
    });
    console.log(`SUCCESS!! Promoted ${updated.count} user account(s) to ADMIN role in database!`);
  } else {
    console.log("No users found in DB yet.");
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
