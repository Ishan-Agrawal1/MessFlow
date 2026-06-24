import crypto from 'crypto';
import razorpayInstance from '../lib/razorpay.js';
import config from '../config/index.js';
import studentDueRepository from '../repositories/studentDue.repository.js';
import paymentRepository from '../repositories/payment.repository.js';
import AppError from '../utils/AppError.js';
import { DUE_STATUS, PAYMENT_STATUS, MONTH_NAMES } from '../constants/index.js';
import { generateReceiptNumber } from '../utils/receiptGenerator.js';
import emailService from './email.service.js';

/**
 * Payment Service — handles Razorpay payment flow.
 */
class PaymentService {
  /**
   * Step 1: Create a Razorpay order for a student due.
   */
  async createOrder(studentId, dueId) {
    // Validate the due exists and belongs to this student
    const due = await studentDueRepository.findById(dueId);
    if (!due) {
      throw new AppError('Due not found', 404);
    }

    if (due.student._id.toString() !== studentId.toString()) {
      throw new AppError('You are not authorized to pay this due', 403);
    }

    if (due.status === DUE_STATUS.PAID) {
      throw new AppError('This due has already been paid', 400);
    }

    // Create Razorpay order
    const razorpayOrder = await razorpayInstance.orders.create({
      amount: due.amount * 100, // Razorpay expects amount in paise
      currency: 'INR',
      receipt: `due_${dueId}`,
      notes: {
        dueId: dueId.toString(),
        studentId: studentId.toString(),
      },
    });

    // Create payment record with CREATED status
    const payment = await paymentRepository.create({
      student: studentId,
      due: dueId,
      amount: due.amount,
      razorpayOrderId: razorpayOrder.id,
      status: PAYMENT_STATUS.CREATED,
    });

    return {
      orderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      paymentId: payment._id,
      keyId: config.razorpay.keyId,
    };
  }

  /**
   * Step 2: Verify Razorpay payment signature and complete the payment.
   */
  async verifyPayment(studentId, { razorpay_order_id, razorpay_payment_id, razorpay_signature }) {
    // Find the payment record
    const payment = await paymentRepository.findByRazorpayOrderId(razorpay_order_id);
    if (!payment) {
      throw new AppError('Payment record not found', 404);
    }

    if (payment.student.toString() !== studentId.toString()) {
      throw new AppError('Unauthorized payment verification', 403);
    }

    // Verify Razorpay signature
    const expectedSignature = crypto
      .createHmac('sha256', config.razorpay.keySecret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    if (expectedSignature !== razorpay_signature) {
      // Mark payment as failed
      await paymentRepository.updateById(payment._id, {
        status: PAYMENT_STATUS.FAILED,
        razorpayPaymentId: razorpay_payment_id,
        razorpaySignature: razorpay_signature,
      });

      throw new AppError('Payment verification failed. Invalid signature.', 400);
    }

    // Generate receipt number
    const receiptNumber = generateReceiptNumber();
    const paidAt = new Date();

    // Update payment record
    const updatedPayment = await paymentRepository.updateById(payment._id, {
      status: PAYMENT_STATUS.SUCCESS,
      razorpayPaymentId: razorpay_payment_id,
      razorpaySignature: razorpay_signature,
      receiptNumber,
      paidAt,
    });

    // Mark student due as PAID
    await studentDueRepository.updateById(payment.due, {
      status: DUE_STATUS.PAID,
      paidAt,
      payment: payment._id,
    });

    // Fetch full details for email
    const fullPayment = await paymentRepository.findById(payment._id);
    const due = await studentDueRepository.findById(payment.due);

    // Send payment confirmation + receipt emails (non-blocking)
    if (fullPayment && due && due.feeCycle) {
      const monthName = MONTH_NAMES[due.feeCycle.month - 1];
      const studentData = due.student;

      emailService
        .sendPaymentSuccessEmail({
          to: studentData.email,
          studentName: studentData.name,
          monthName,
          year: due.feeCycle.year,
          amount: fullPayment.amount,
          receiptNumber,
          paidAt: paidAt.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
        })
        .catch((err) => console.error('Failed to send payment email:', err.message));

      emailService
        .sendReceiptEmail({
          to: studentData.email,
          studentName: studentData.name,
          studentId: studentData.studentId,
          monthName,
          year: due.feeCycle.year,
          amount: fullPayment.amount,
          receiptNumber,
          paidAt: paidAt.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
          razorpayPaymentId: razorpay_payment_id,
        })
        .catch((err) => console.error('Failed to send receipt email:', err.message));
    }

    return {
      payment: updatedPayment,
      receiptNumber,
    };
  }

  /**
   * Get payment history for a student.
   */
  async getHistory(studentId, page, limit) {
    return paymentRepository.findByStudent(studentId, page, limit);
  }

  /**
   * Get a single payment by ID.
   */
  async getById(studentId, paymentId) {
    const payment = await paymentRepository.findById(paymentId);
    if (!payment) {
      throw new AppError('Payment not found', 404);
    }

    if (payment.student._id.toString() !== studentId.toString()) {
      throw new AppError('You are not authorized to view this payment', 403);
    }

    return payment;
  }
}

export default new PaymentService();
