import Joi from 'joi';

/**
 * Validation schema for the contact form submission.
 */
export const contactFormSchema = Joi.object({
  name: Joi.string().trim().min(2).max(100).required()
    .messages({
      'string.min': 'Name must be at least 2 characters',
      'string.max': 'Name must be at most 100 characters',
      'any.required': 'Name is required',
    }),

  email: Joi.string().trim().email().required()
    .messages({
      'string.email': 'Please provide a valid email address',
      'any.required': 'Email is required',
    }),

  subject: Joi.string().trim().min(3).max(200).required()
    .messages({
      'string.min': 'Subject must be at least 3 characters',
      'string.max': 'Subject must be at most 200 characters',
      'any.required': 'Subject is required',
    }),

  message: Joi.string().trim().min(10).max(2000).required()
    .messages({
      'string.min': 'Message must be at least 10 characters',
      'string.max': 'Message must be at most 2000 characters',
      'any.required': 'Message is required',
    }),
});
