import prisma from '../src/config/prisma';
import bcrypt from 'bcrypt';


async function main() {
  const passwordHash = await bcrypt.hash('password', 10);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@test.com' },
    update: {},
    create: {
      name: 'Admin User',
      email: 'admin@test.com',
      password: passwordHash,
      role: 'ADMIN',
    },
  });

  const employee = await prisma.user.upsert({
    where: { email: 'user@test.com' },
    update: {},
    create: {
      name: 'Employee User',
      email: 'user@test.com',
      password: passwordHash,
      role: 'EMPLOYEE',
    },
  });

  await prisma.expense.createMany({
    data: [
      {
        amount: 100,
        category: 'Travel',
        description: 'Taxi fare',
        date: new Date(),
        status: 'PENDING',
        userId: employee.id,
      },
      {
        amount: 50,
        category: 'Food',
        description: 'Lunch',
        date: new Date(),
        status: 'APPROVED',
        userId: employee.id,
      },
    ],
  });

  console.log('Seeding finished.');
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
