import Payment from '../models/Payment.model.js';
import { PAYMENT_STATUS } from '../constants/index.js';

/**
 * Payment Repository — encapsulates all DB operations for payments.
 */
class PaymentRepository {
  /**
   * Create a new payment record.
   * @param {Object} data
   * @returns {Promise<Object>}
   */
  async create(data) {
    const payment = new Payment(data);
    return payment.save();
  }

  /**
   * Find payment by ID.
   * @param {string} id
   * @returns {Promise<Object|null>}
   */
  async findById(id) {
    return Payment.findById(id)
      .populate('student', 'name email studentId batch')
      .populate({
        path: 'due',
        populate: { path: 'feeCycle' },
      })
      .exec();
  }

  /**
   * Find payment by Razorpay order ID.
   * @param {string} razorpayOrderId
   * @returns {Promise<Object|null>}
   */
  async findByRazorpayOrderId(razorpayOrderId) {
    return Payment.findOne({ razorpayOrderId }).exec();
  }

  /**
   * Update payment by ID.
   * @param {string} id
   * @param {Object} updateData
   * @returns {Promise<Object|null>}
   */
  async updateById(id, updateData) {
    return Payment.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    }).exec();
  }

  /**
   * Get payment history for a student with pagination.
   * @param {string} studentId
   * @param {number} page
   * @param {number} limit
   * @returns {Promise<Object>} - { payments, total, page, pages }
   */
  async findByStudent(studentId, page = 1, limit = 10) {
    const skip = (page - 1) * limit;

    const [payments, total] = await Promise.all([
      Payment.find({
        student: studentId,
        status: PAYMENT_STATUS.SUCCESS,
      })
        .populate({
          path: 'due',
          populate: { path: 'feeCycle' },
        })
        .sort({ paidAt: -1 })
        .skip(skip)
        .limit(limit)
        .exec(),

      Payment.countDocuments({
        student: studentId,
        status: PAYMENT_STATUS.SUCCESS,
      }).exec(),
    ]);

    return {
      payments,
      total,
      page,
      pages: Math.ceil(total / limit),
    };
  }

  /**
   * Get total collected revenue.
   * @returns {Promise<number>}
   */
  async getTotalCollected() {
    const result = await Payment.aggregate([
      { $match: { status: PAYMENT_STATUS.SUCCESS } },
      { $group: { _id: null, total: { $sum: '$amount' } } },
    ]);
    return result[0]?.total || 0;
  }

  /**
   * Get monthly revenue breakdown.
   * @returns {Promise<Array>}
   */
  async getMonthlyRevenue() {
    return Payment.aggregate([
      { $match: { status: PAYMENT_STATUS.SUCCESS } },
      {
        $group: {
          _id: {
            year: { $year: '$paidAt' },
            month: { $month: '$paidAt' },
          },
          total: { $sum: '$amount' },
          count: { $sum: 1 },
        },
      },
      { $sort: { '_id.year': -1, '_id.month': -1 } },
      { $limit: 12 },
    ]);
  }
  /**
   * Get all payments (admin) with pagination.
   * @param {number} page
   * @param {number} limit
   * @returns {Promise<Object>}
   */
  async findAllPayments(page = 1, limit = 20) {
    const skip = (page - 1) * limit;

    const [payments, total] = await Promise.all([
      Payment.find({ status: PAYMENT_STATUS.SUCCESS })
        .populate('student', 'name email studentId batch')
        .populate({
          path: 'due',
          populate: { path: 'feeCycle' },
        })
        .sort({ paidAt: -1 })
        .skip(skip)
        .limit(limit)
        .exec(),

      Payment.countDocuments({ status: PAYMENT_STATUS.SUCCESS }).exec(),
    ]);

    return {
      payments,
      total,
      page,
      pages: Math.ceil(total / limit),
    };
  }
}

export default new PaymentRepository();
