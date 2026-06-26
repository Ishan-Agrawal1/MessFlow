import Joi from 'joi';
import { NOTICE_PRIORITY } from '../constants/index.js';

/**
 * Admin validation schemas.
 */

export const registerStudentSchema = Joi.object({
  name: Joi.string().trim().min(2).max(100).required().messages({
    'string.min': 'Name must be at least 2 characters',
    'string.max': 'Name cannot exceed 100 characters',
    'any.required': 'Name is required',
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'Please provide a valid email address',
    'any.required': 'Email is required',
  }),
  studentId: Joi.string().trim().required().messages({
    'any.required': 'Student ID is required',
  }),
  batch: Joi.number()
    .integer()
    .min(1000)
    .max(9999)
    .required()
    .messages({
      'number.min': 'Batch must be a 4-digit number',
      'number.max': 'Batch must be a 4-digit number',
      'any.required': 'Batch is required',
    }),
});

export const updateStudentSchema = Joi.object({
  name: Joi.string().trim().min(2).max(100),
  email: Joi.string().email(),
  batch: Joi.number().integer().min(1000).max(9999),
  isActive: Joi.boolean(),
}).min(1).messages({
  'object.min': 'At least one field must be provided for update',
});

export const feeCycleSchema = Joi.object({
  month: Joi.number().integer().min(1).max(12).required().messages({
    'number.min': 'Month must be between 1 and 12',
    'number.max': 'Month must be between 1 and 12',
    'any.required': 'Month is required',
  }),
  year: Joi.number().integer().min(2020).required().messages({
    'number.min': 'Year must be 2020 or later',
    'any.required': 'Year is required',
  }),
  batch: Joi.number().integer().min(1000).max(9999).allow(null, '').default(null).messages({
    'number.min': 'Batch must be a 4-digit number',
    'number.max': 'Batch must be a 4-digit number',
  }),
  amount: Joi.number().positive().required().messages({
    'number.positive': 'Amount must be a positive number',
    'any.required': 'Amount is required',
  }),
  dueDate: Joi.date().iso().required().messages({
    'date.format': 'Due date must be a valid ISO date',
    'any.required': 'Due date is required',
  }),
});

export const noticeSchema = Joi.object({
  title: Joi.string().trim().min(3).max(200).required().messages({
    'string.min': 'Title must be at least 3 characters',
    'string.max': 'Title cannot exceed 200 characters',
    'any.required': 'Title is required',
  }),
  description: Joi.string().trim().min(10).max(2000).required().messages({
    'string.min': 'Description must be at least 10 characters',
    'string.max': 'Description cannot exceed 2000 characters',
    'any.required': 'Description is required',
  }),
  priority: Joi.string()
    .valid(...Object.values(NOTICE_PRIORITY))
    .default(NOTICE_PRIORITY.MEDIUM),
  isActive: Joi.boolean().default(true),
  startDate: Joi.date().iso(),
  endDate: Joi.date().iso().greater(Joi.ref('startDate')).allow(null),
});

export const updateNoticeSchema = Joi.object({
  title: Joi.string().trim().min(3).max(200),
  description: Joi.string().trim().min(10).max(2000),
  priority: Joi.string().valid(...Object.values(NOTICE_PRIORITY)),
  isActive: Joi.boolean(),
  startDate: Joi.date().iso(),
  endDate: Joi.date().iso().allow(null),
}).min(1);
