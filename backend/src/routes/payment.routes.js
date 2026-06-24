import { Router } from 'express';
import {
  createOrder,
  verifyPayment,
  getHistory,
  getPaymentById,
} from '../controllers/payment.controller.js';
import { createOrderSchema, verifyPaymentSchema } from '../validators/payment.validator.js';
import validateRequest from '../middlewares/validateRequest.middleware.js';
import authenticate from '../middlewares/authenticate.middleware.js';
import authorize from '../middlewares/authorize.middleware.js';
import { paymentLimiter } from '../middlewares/rateLimiter.middleware.js';
import { USER_ROLES } from '../constants/index.js';

const router = Router();

// All payment routes require authentication + student role
router.use(authenticate, authorize(USER_ROLES.STUDENT));

// POST /api/payments/create-order
router.post('/create-order', paymentLimiter, validateRequest(createOrderSchema), createOrder);

// POST /api/payments/verify
router.post('/verify', paymentLimiter, validateRequest(verifyPaymentSchema), verifyPayment);

// GET /api/payments/history
router.get('/history', getHistory);

// GET /api/payments/:id
router.get('/:id', getPaymentById);

export default router;
