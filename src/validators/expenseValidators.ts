import Joi from 'joi';

export const createExpenseSchema = Joi.object({
  amount: Joi.number().positive().required(),
  category: Joi.string().max(50).required(),
  description: Joi.string().max(255).required(),
  date: Joi.date().required()
});

export const editExpenseSchema = Joi.object({
  amount: Joi.number().positive(),
  category: Joi.string().max(50),
  description: Joi.string().max(255),
  date: Joi.date()
});

export const changeStatusSchema = Joi.object({
  status: Joi.string().valid('APPROVED', 'REJECTED').required()
});