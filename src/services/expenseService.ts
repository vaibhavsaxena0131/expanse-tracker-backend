import { ExpenseStatus } from '@prisma/client';
import prisma from '../config/prisma.js';

export const createExpense = async (data: any) => {
  return prisma.expense.create({ data });
};

export const getExpenses = async (filters: any) => {
  return prisma.expense.findMany({ where: filters });
};

export const updateExpense = async (id: string, data: any) => {
  // Only update if status is PENDING
  const expense = await prisma.expense.findUnique({ where: { id } });
  if (!expense) throw new Error('Expense not found');
  if (expense.status !== 'PENDING') throw new Error('Only pending expenses can be edited');
  return prisma.expense.update({ where: { id }, data });
};

export const deleteExpense = async (id: string) => {
  const expense = await prisma.expense.findUnique({ where: { id } });
  if (!expense) throw new Error('Expense not found');
  if (expense.status !== 'PENDING') throw new Error('Only pending expenses can be deleted');
  return prisma.expense.delete({ where: { id } });
};

export const getAllExpenses = async () => {
  const expenses = await prisma.expense.findMany({
    include: {
      user: { select: { name: true } }
    }
  });

  return expenses.map(exp => ({
    id: exp.id,
    amount: exp.amount,
    category: exp.category,
    description: exp.description,
    date: exp.date,
    status: exp.status,
    submittedBy: exp.user?.name || 'Unknown'
  }));
};

export const changeExpenseStatus = async (id: string, status: ExpenseStatus) => {
  if (!['APPROVED', 'REJECTED'].includes(status)) {
    throw new Error('Invalid status');
  }
  return prisma.expense.update({ where: { id }, data: { status } });
};

export const getAnalytics = async () => {
  return prisma.expense.groupBy({
    by: ['category'],
    _sum: { amount: true },
  });
};