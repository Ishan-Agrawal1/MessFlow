import StudentDue from '../models/StudentDue.model.js';
import { DUE_STATUS } from '../constants/index.js';

/**
 * StudentDue Repository — encapsulates all DB operations for student dues.
 */
class StudentDueRepository {
  /**
   * Bulk create dues for multiple students (skip duplicates).
   * @param {Array<Object>} duesData
   * @returns {Promise<Array>}
   */
  async bulkCreate(duesData) {
    return StudentDue.insertMany(duesData, { ordered: false }).catch((err) => {
      // Filter out duplicate key errors (code 11000) — expected when re-generating
      if (err.code === 11000 || (err.writeErrors && err.writeErrors.length)) {
        // Return successfully inserted documents
        return err.insertedDocs || [];
      }
      throw err;
    });
  }

  /**
   * Find a specific due for a student and fee cycle.
   * @param {string} studentId
   * @param {string} feeCycleId
   * @returns {Promise<Object|null>}
   */
  async findByStudentAndCycle(studentId, feeCycleId) {
    return StudentDue.findOne({
      student: studentId,
      feeCycle: feeCycleId,
    })
      .populate('feeCycle')
      .populate('payment')
      .exec();
  }

  /**
   * Find a due by its ID.
   * @param {string} id
   * @returns {Promise<Object|null>}
   */
  async findById(id) {
    return StudentDue.findById(id)
      .populate('student', 'name email studentId batch')
      .populate('feeCycle')
      .populate('payment')
      .exec();
  }

  /**
   * Get all dues for a student, sorted by most recent first.
   * @param {string} studentId
   * @returns {Promise<Array>}
   */
  async findByStudent(studentId) {
    return StudentDue.find({ student: studentId })
      .populate('feeCycle')
      .populate('payment')
      .sort({ createdAt: -1 })
      .exec();
  }

  /**
   * Get the current month's due for a student.
   * @param {string} studentId
   * @param {string} feeCycleId
   * @returns {Promise<Object|null>}
   */
  async findCurrentDue(studentId, feeCycleId) {
    return StudentDue.findOne({
      student: studentId,
      feeCycle: feeCycleId,
    })
      .populate('feeCycle')
      .exec();
  }

  /**
   * Get the latest pending or overdue due for a student (any fee cycle).
   * This ensures students see outstanding dues even if the month has changed.
   * @param {string} studentId
   * @returns {Promise<Object|null>}
   */
  async findLatestPendingDue(studentId) {
    return StudentDue.findOne({
      student: studentId,
      status: { $in: [DUE_STATUS.PENDING, DUE_STATUS.OVERDUE] },
    })
      .populate('feeCycle')
      .sort({ createdAt: -1 })
      .exec();
  }

  /**
   * Update a due record.
   * @param {string} id
   * @param {Object} updateData
   * @returns {Promise<Object|null>}
   */
  async updateById(id, updateData) {
    return StudentDue.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    }).exec();
  }

  /**
   * Get all dues for a specific fee cycle.
   * @param {string} feeCycleId
   * @param {string} [status] - Optional status filter
   * @returns {Promise<Array>}
   */
  async findByFeeCycle(feeCycleId, status) {
    const query = { feeCycle: feeCycleId };
    if (status) query.status = status;

    return StudentDue.find(query)
      .populate('student', 'name email studentId batch')
      .populate('payment')
      .exec();
  }

  /**
   * Get all defaulters (PENDING or OVERDUE) for a fee cycle.
   * @param {string} feeCycleId
   * @returns {Promise<Array>}
   */
  async findDefaulters(feeCycleId) {
    return StudentDue.find({
      feeCycle: feeCycleId,
      status: { $in: [DUE_STATUS.PENDING, DUE_STATUS.OVERDUE] },
    })
      .populate('student', 'name email studentId batch')
      .populate('feeCycle')
      .exec();
  }

  /**
   * Get all paid students for a fee cycle.
   * @param {string} feeCycleId
   * @returns {Promise<Array>}
   */
  async findPaidStudents(feeCycleId) {
    return StudentDue.find({
      feeCycle: feeCycleId,
      status: DUE_STATUS.PAID,
    })
      .populate('student', 'name email studentId batch')
      .populate('payment')
      .exec();
  }

  /**
   * Count dues by status for a fee cycle.
   * @param {string} feeCycleId
   * @param {string} status
   * @returns {Promise<number>}
   */
  async countByStatus(feeCycleId, status) {
    return StudentDue.countDocuments({
      feeCycle: feeCycleId,
      status,
    }).exec();
  }

  /**
   * Mark overdue: update PENDING dues past their fee cycle due date.
   * @returns {Promise<Object>}
   */
  async markOverdue() {
    const now = new Date();
    return StudentDue.updateMany(
      {
        status: DUE_STATUS.PENDING,
      },
      { status: DUE_STATUS.OVERDUE }
    )
      .exec()
      .then(async () => {
        // Only mark those whose feeCycle dueDate has passed
        const pendingDues = await StudentDue.find({
          status: DUE_STATUS.PENDING,
        }).populate('feeCycle');

        const overdueIds = pendingDues
          .filter((due) => due.feeCycle && new Date(due.feeCycle.dueDate) < now)
          .map((due) => due._id);

        if (overdueIds.length > 0) {
          return StudentDue.updateMany(
            { _id: { $in: overdueIds } },
            { status: DUE_STATUS.OVERDUE }
          ).exec();
        }
        return { modifiedCount: 0 };
      });
  }

  /**
   * Get aggregate revenue data.
   * @param {string} feeCycleId
   * @returns {Promise<Object>}
   */
  async getRevenueByFeeCycle(feeCycleId) {
    const result = await StudentDue.aggregate([
      { $match: { feeCycle: feeCycleId } },
      {
        $group: {
          _id: '$status',
          total: { $sum: '$amount' },
          count: { $sum: 1 },
        },
      },
    ]);

    return result;
  }

  /**
   * Count total dues for a fee cycle.
   * @param {string} feeCycleId
   * @returns {Promise<number>}
   */
  async countByFeeCycle(feeCycleId) {
    return StudentDue.countDocuments({ feeCycle: feeCycleId }).exec();
  }
}

export default new StudentDueRepository();
