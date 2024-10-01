import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.upsert({
    where: { id: 'cm1phm2o3000011xw24rh5ulh' },
    update: {},
    create: {
      id: 'cm1phm2o3000011xw24rh5ulh',
      first_name: 'John',
      last_name: 'Doe',
      email: 'john.doe@example.com',
      auth_id: 'authIdExample',
      role: 'User',
    },
  });

  console.log(`Upserted user: ${user.id}`);

  await prisma.donation.createMany({
    data: [
      {
        user_id: user.id,
        amount: 100.00,
        donation_date: new Date(),
        cause_id: 1,
        is_recurring: 'None',
        confirmation_email_sent: true,
      }
    ],
  });

  console.log('Dummy donations inserted');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
});