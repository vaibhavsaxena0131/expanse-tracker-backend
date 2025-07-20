import Joi from 'joi';

export const createExpenseSchema = Joi.object({
  amount: Joi.number().positive().required(),
  category: Joi.string().max(50).required(),
  description: Joi.string().max(255).required(),
  date: Joi.date().required()
});
