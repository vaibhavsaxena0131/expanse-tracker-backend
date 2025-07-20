import express from 'express';
import {
  createExpense,
  getExpenses,
  editExpense,
  deleteExpense,
  approveExpense,
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

router.post(
  '/:id/approve',
  authenticate,
  authorize(['ADMIN']),
  approveExpense
);

router.get(
  '/analytics',
  authenticate,
  authorize(['ADMIN']),
  getAnalytics
);

export default router;