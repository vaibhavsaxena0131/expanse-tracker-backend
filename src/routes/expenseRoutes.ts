import express from 'express';
import {
  createExpense,
  getExpenses,
  editExpense,
  deleteExpense,
  getAllExpenses,
  changeExpenseStatus
} from '../controllers/expenseController.js';
import { authorize } from '../midddleware/roleMiddleware.js';
import { validateBody } from '../utils/validate.js';
import {
  createExpenseSchema,
  editExpenseSchema,
  changeStatusSchema
} from '../validators/expenseValidators.js';

const router = express.Router();

router.post(
  '/',
  validateBody(createExpenseSchema),
  createExpense
);

router.get(
  '/',
  getExpenses
);

router.put(
  '/:id',
  validateBody(editExpenseSchema),
  editExpense
);

router.delete(
  '/:id',
  deleteExpense
);

// Admin: get all expenses
router.get(
  '/all',
  authorize(['ADMIN']),
  getAllExpenses
);

// Admin: change expense status (approve/reject)
router.post(
  '/:id/status',
  authorize(['ADMIN']),
  validateBody(changeStatusSchema),
  changeExpenseStatus
);

export default router;