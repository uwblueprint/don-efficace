import { RoleType } from "@prisma/client";

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  // Delete all records in the User table (optional)
  await prisma.user.deleteMany({});

  // Create dummy users
  const user1 = await prisma.user.create({
    data: {
        id: '0',
        email: "alice@example.com",
        first_name: "Alice",
        auth_id: '-0',
        role: RoleType.Admin
    },
  });

  const user2 = await prisma.user.create({
    data: {
        id: '1',
        email: "bob@example.com",
        first_name: "Bob",
        last_name: "Smith",
        auth_id: '-1',
        role: RoleType.User
    },
  });

  const user3 = await prisma.user.create({
    data: {
        id: '2',
        email: "charlie@example.com",
        last_name: "Charlie",
        auth_id: '-2',
        role: RoleType.User
    },
  });

  const user4 = await prisma.user.create({
    data: {
        id: '3',
        email: "david@example.com",
        auth_id: '-3',
        role: RoleType.User
    },
  });

  console.log({ user1, user2, user3, user4 });
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
