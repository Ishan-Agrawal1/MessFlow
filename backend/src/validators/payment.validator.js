import Joi from 'joi';

/**
 * Payment validation schemas.
 */

export const createOrderSchema = Joi.object({
  dueId: Joi.string().required().messages({
    'any.required': 'Due ID is required',
  }),
});

export const verifyPaymentSchema = Joi.object({
  razorpay_order_id: Joi.string().required().messages({
    'any.required': 'Razorpay order ID is required',
  }),
  razorpay_payment_id: Joi.string().required().messages({
    'any.required': 'Razorpay payment ID is required',
  }),
  razorpay_signature: Joi.string().required().messages({
    'any.required': 'Razorpay signature is required',
  }),
});
