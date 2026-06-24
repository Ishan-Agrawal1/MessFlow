import paymentService from '../services/payment.service.js';
import ApiResponse from '../utils/apiResponse.js';
import asyncHandler from '../utils/asyncHandler.js';

/**
 * Payment Controller — thin layer delegating to PaymentService.
 */

/**
 * POST /api/payments/create-order
 */
export const createOrder = asyncHandler(async (req, res) => {
  const { dueId } = req.body;

  const orderData = await paymentService.createOrder(req.user._id, dueId);

  new ApiResponse(201, orderData, 'Razorpay order created successfully').send(res);
});

/**
 * POST /api/payments/verify
 */
export const verifyPayment = asyncHandler(async (req, res) => {
  const result = await paymentService.verifyPayment(req.user._id, req.body);

  new ApiResponse(200, result, 'Payment verified and recorded successfully').send(res);
});

/**
 * GET /api/payments/history
 */
export const getHistory = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;

  const history = await paymentService.getHistory(req.user._id, page, limit);

  new ApiResponse(200, history, 'Payment history retrieved').send(res);
});

/**
 * GET /api/payments/:id
 */
export const getPaymentById = asyncHandler(async (req, res) => {
  const payment = await paymentService.getById(req.user._id, req.params.id);

  new ApiResponse(200, { payment }, 'Payment details retrieved').send(res);
});
