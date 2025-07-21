import express from 'express';
import {
  createExpense,
  getExpenses,
  editExpense,
  deleteExpense,
  getAllExpenses,
  changeExpenseStatus,
  getAnalytics
} from '../controllers/expenseController.js';
import { authenticate } from '../midddleware/authMiddleware.js';
import { authorize } from '../midddleware/roleMiddleware.js';
import { validateBody } from '../utils/validate.js';
import { createExpenseSchema } from '../validators/expenseValidators.js';

const router = express.Router();

router.post(
  '/',
  authenticate,
  validateBody(createExpenseSchema),
  createExpense
);

router.get(
  '/',
  authenticate,
  getExpenses
);

// Edit expense only if status is PENDING
router.put(
  '/:id',
  authenticate,
  editExpense
);

router.delete(
  '/:id',
  authenticate,
  deleteExpense
);

router.get(
  '/all',
  authenticate,
  authorize(['ADMIN']),
  getAllExpenses
);

router.post(
  '/:id/status',
  authenticate,
  authorize(['ADMIN']),
  changeExpenseStatus
);

router.get(
  '/analytics',
  authenticate,
  authorize(['ADMIN']),
  getAnalytics
);

export default router;