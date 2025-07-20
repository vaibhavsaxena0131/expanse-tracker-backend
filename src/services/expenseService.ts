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

import type { ExpenseStatus } from '@prisma/client';

export const approveExpense = async (id: string, status: ExpenseStatus) => {
  return prisma.expense.update({ where: { id }, data: { status } });
};

export const getAnalytics = async () => {
  return prisma.expense.groupBy({
    by: ['category'],
    _sum: { amount: true },
  });
};