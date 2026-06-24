import mongoose from 'mongoose';
import { DUE_STATUS } from '../constants/index.js';

const studentDueSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    feeCycle: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'FeeCycle',
      required: true,
    },
    amount: {
      type: Number,
      required: [true, 'Amount is required'],
      min: [0, 'Amount cannot be negative'],
    },
    status: {
      type: String,
      enum: Object.values(DUE_STATUS),
      default: DUE_STATUS.PENDING,
    },
    paidAt: {
      type: Date,
      default: null,
    },
    payment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Payment',
      default: null,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

// Compound unique index: one due per student per fee cycle
studentDueSchema.index({ student: 1, feeCycle: 1 }, { unique: true });
studentDueSchema.index({ feeCycle: 1, status: 1 });
studentDueSchema.index({ student: 1, status: 1 });

const StudentDue = mongoose.model('StudentDue', studentDueSchema);

export default StudentDue;
