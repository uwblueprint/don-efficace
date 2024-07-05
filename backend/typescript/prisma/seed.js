const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  // Delete all records in the User table (optional)
  await prisma.user.deleteMany({});

  // Create dummy users
  const user1 = await prisma.user.create({
    data: {
        id: 'asdasd',
        email: "johnsadasd.doe@example.com",
        first_name: "John",
        auth_id: 'ry',
    },
  });

  const user2 = await prisma.user.create({
    data: {
        id: 'malha',
        email: "jailton@example.com",
        first_name: "Jailton",
        last_name: "Almeida",
        auth_id: 'gyb',
    },
  });

  const user3 = await prisma.user.create({
    data: {
        id: 'wad',
        email: "janeawdawd.doe@example.com",
        last_name: "Doe",
        auth_id: 'green',
    },
  });

  const user4 = await prisma.user.create({
    data: {
        id: 'gladi',
        email: "rinatfakhretdinov@example.com",
        auth_id: 'rwb',
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
