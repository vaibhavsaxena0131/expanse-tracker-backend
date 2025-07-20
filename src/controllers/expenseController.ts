import { Request, Response } from 'express';
import * as expenseService from '../services/expenseService.js';

export const createExpense = async (req: Request, res: Response) => {
  const { amount, category, description, date } = req.body;
  const userId = (req as any).user.id;
  const validDate = date ? new Date(date) : new Date();
  const expense = await expenseService.createExpense({ amount, category, description, date: validDate, userId });
  res.json(expense);
};

export const getExpenses = async (req: Request, res: Response) => {
  const user = (req as any).user;
  const filters: any = {};
  if (user.role === 'EMPLOYEE') filters.userId = user.id;
  const { category, startDate, endDate } = req.query;
  if (category) filters.category = category as string;
  if (startDate && endDate) {
    filters.date = {
      gte: new Date(startDate as string),
      lte: new Date(endDate as string),
    };
  }
  const expenses = await expenseService.getExpenses(filters);
  res.json(expenses);
};

export const editExpense = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { amount, category, description, date } = req.body;
  try {
    const updated = await expenseService.updateExpense(id, {
      amount,
      category,
      description,
      date: date ? new Date(date) : undefined,
    });
    res.json(updated);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteExpense = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await expenseService.deleteExpense(id);
    res.json({ message: 'Expense deleted successfully' });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const approveExpense = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;
  const expense = await expenseService.approveExpense(id, status);
  res.json(expense);
};

export const getAnalytics = async (req: Request, res: Response) => {
  const analytics = await expenseService.getAnalytics();
  res.json(analytics);
};