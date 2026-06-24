import mongoose from 'mongoose';

const feeCycleSchema = new mongoose.Schema(
  {
    month: {
      type: Number,
      required: [true, 'Month is required'],
      min: [1, 'Month must be between 1 and 12'],
      max: [12, 'Month must be between 1 and 12'],
    },
    year: {
      type: Number,
      required: [true, 'Year is required'],
      min: [2020, 'Year must be 2020 or later'],
    },
    batch: {
      type: Number,
      default: null,
      validate: {
        validator: function (v) {
          return v === null || v === undefined || /^\d{4}$/.test(String(v));
        },
        message: 'Batch must be a 4-digit year',
      },
    },
    amount: {
      type: Number,
      required: [true, 'Amount is required'],
      min: [0, 'Amount cannot be negative'],
    },
    dueDate: {
      type: Date,
      required: [true, 'Due date is required'],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

// Compound unique index: only one fee cycle per month+year+batch
feeCycleSchema.index({ month: 1, year: 1, batch: 1 }, { unique: true });

const FeeCycle = mongoose.model('FeeCycle', feeCycleSchema);

export default FeeCycle;
