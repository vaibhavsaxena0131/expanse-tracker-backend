import prisma from '../config/prisma.js';
import bcrypt from 'bcrypt';

async function main() {
  // Hash different passwords for each user
  const adminPasswordHash = await bcrypt.hash('adminStrongPass123', 10);
  const emp1PasswordHash = await bcrypt.hash('empOnePass456', 10);
  const emp2PasswordHash = await bcrypt.hash('empTwoPass789', 10);

  // Create admin user
  const admin = await prisma.user.upsert({
    where: { email: 'admin@company.com' },
    update: {},
    create: {
      name: 'Priya Sharma',
      email: 'admin@company.com',
      password: adminPasswordHash,
      role: 'ADMIN',
    },
  });

  // Create first employee
  const employee1 = await prisma.user.upsert({
    where: { email: 'john.doe@company.com' },
    update: {},
    create: {
      name: 'John Doe',
      email: 'john.doe@company.com',
      password: emp1PasswordHash,
      role: 'EMPLOYEE',
    },
  });

  // Create second employee
  const employee2 = await prisma.user.upsert({
    where: { email: 'anita.singh@company.com' },
    update: {},
    create: {
      name: 'Anita Singh',
      email: 'anita.singh@company.com',
      password: emp2PasswordHash,
      role: 'EMPLOYEE',
    },
  });

  // Add expenses for both employees
  await prisma.expense.createMany({
    data: [
      // John Doe's expenses
      {
        amount: 1200,
        category: 'Travel',
        description: 'Flight tickets for client meeting',
        date: new Date('2025-07-01'),
        status: 'PENDING',
        userId: employee1.id,
      },
      {
        amount: 350,
        category: 'Food',
        description: 'Team lunch at restaurant',
        date: new Date('2025-07-02'),
        status: 'APPROVED',
        userId: employee1.id,
      },
      {
        amount: 5000,
        category: 'Office',
        description: 'Office chair purchase',
        date: new Date('2025-07-03'),
        status: 'REJECTED',
        userId: employee1.id,
      },
      {
        amount: 800,
        category: 'Utilities',
        description: 'Electricity bill payment',
        date: new Date('2025-07-04'),
        status: 'PENDING',
        userId: employee1.id,
      },
      {
        amount: 1500,
        category: 'Entertainment',
        description: 'Annual team outing',
        date: new Date('2025-07-05'),
        status: 'APPROVED',
        userId: employee1.id,
      },
      // Anita Singh's expenses
      {
        amount: 2500,
        category: 'Medical',
        description: 'Health insurance premium',
        date: new Date('2025-07-06'),
        status: 'PENDING',
        userId: employee2.id,
      },
      {
        amount: 1200,
        category: 'Education',
        description: 'Online course fee',
        date: new Date('2025-07-07'),
        status: 'APPROVED',
        userId: employee2.id,
      },
      {
        amount: 400,
        category: 'Supplies',
        description: 'Printer ink cartridges',
        date: new Date('2025-07-08'),
        status: 'PENDING',
        userId: employee2.id,
      },
      {
        amount: 900,
        category: 'Transport',
        description: 'Monthly metro pass',
        date: new Date('2025-07-09'),
        status: 'APPROVED',
        userId: employee2.id,
      },
      {
        amount: 2000,
        category: 'Internet',
        description: 'Annual broadband renewal',
        date: new Date('2025-07-10'),
        status: 'PENDING',
        userId: employee2.id,
      },
      {
        amount: 15000,
        category: 'Rent',
        description: 'Office rent for July',
        date: new Date('2025-07-11'),
        status: 'APPROVED',
        userId: employee2.id,
      },
      {
        amount: 300,
        category: 'Miscellaneous',
        description: 'Courier charges',
        date: new Date('2025-07-12'),
        status: 'PENDING',
        userId: employee2.id,
      },
    ],
  });

  console.log('Seeding finished.');
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());