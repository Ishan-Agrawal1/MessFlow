import Joi from 'joi';

/**
 * Auth validation schemas.
 */

export const loginSchema = Joi.object({
  identifier: Joi.string().trim().required().messages({
    'string.empty': 'Student ID or Email is required',
    'any.required': 'Student ID or Email is required',
  }),
  password: Joi.string().min(6).required().messages({
    'string.min': 'Password must be at least 6 characters',
    'any.required': 'Password is required',
  }),
});

export const changePasswordSchema = Joi.object({
  oldPassword: Joi.string().min(6).required().messages({
    'string.min': 'Old password must be at least 6 characters',
    'any.required': 'Old password is required',
  }),
  newPassword: Joi.string().min(6).required().messages({
    'string.min': 'New password must be at least 6 characters',
    'any.required': 'New password is required',
  }),
});
