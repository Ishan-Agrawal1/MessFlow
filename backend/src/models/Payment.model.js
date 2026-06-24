import mongoose from 'mongoose';
import { PAYMENT_STATUS } from '../constants/index.js';

const paymentSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    due: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'StudentDue',
      required: true,
    },
    amount: {
      type: Number,
      required: [true, 'Amount is required'],
      min: [0, 'Amount cannot be negative'],
    },
    razorpayOrderId: {
      type: String,
      required: true,
      index: true,
    },
    razorpayPaymentId: {
      type: String,
      default: null,
    },
    razorpaySignature: {
      type: String,
      default: null,
    },
    status: {
      type: String,
      enum: Object.values(PAYMENT_STATUS),
      default: PAYMENT_STATUS.CREATED,
    },
    receiptNumber: {
      type: String,
      unique: true,
      sparse: true,
    },
    paidAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

paymentSchema.index({ student: 1, createdAt: -1 });

const Payment = mongoose.model('Payment', paymentSchema);

export default Payment;
