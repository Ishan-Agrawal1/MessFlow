import userRepository from '../repositories/user.repository.js';
import studentDueRepository from '../repositories/studentDue.repository.js';
import feeCycleRepository from '../repositories/feeCycle.repository.js';
import noticeRepository from '../repositories/notice.repository.js';
import paymentRepository from '../repositories/payment.repository.js';
import AppError from '../utils/AppError.js';

/**
 * Student Service — handles student-facing business logic.
 */
class StudentService {
  /**
   * Get dashboard data for a student.
   * Returns: student info, current due, payment status, recent payments, active notices.
   */
  async getDashboard(userId) {
    const student = await userRepository.findById(userId);
    if (!student) {
      throw new AppError('Student not found', 404);
    }

    // Strategy: always check for any pending/overdue due first so newly
    // generated dues are immediately visible regardless of fee-cycle month.
    let currentDue = null;
    let paymentStatus = null;

    // 1. Check for any pending/overdue due (most important — this is what the
    //    student needs to act on).
    currentDue = await studentDueRepository.findLatestPendingDue(userId);

    // 2. If no pending due, check the current month's cycle for a PAID due
    //    so we can still show the "Paid" status badge.
    if (!currentDue) {
      const currentCycle = await feeCycleRepository.findCurrentCycleForBatch(student.batch);
      if (currentCycle) {
        currentDue = await studentDueRepository.findCurrentDue(userId, currentCycle._id);
      }
    }

    paymentStatus = currentDue ? currentDue.status : 'NO_DUE';

    // Get recent payments (last 5)
    const { payments: recentPayments } = await paymentRepository.findByStudent(userId, 1, 5);

    // Get active notices
    const activeNotices = await noticeRepository.findActiveNotices();

    return {
      student,
      currentDue,
      paymentStatus,
      recentPayments,
      activeNotices,
    };
  }

  /**
   * Get student profile.
   */
  async getProfile(userId) {
    const student = await userRepository.findById(userId);
    if (!student) {
      throw new AppError('Student not found', 404);
    }
    return student;
  }

  /**
   * Update student profile — primarily for changing password.
   */
  async updateProfile(userId, updateData) {
    const student = await userRepository.findById(userId, true);
    if (!student) {
      throw new AppError('Student not found', 404);
    }

    // If changing password
    if (updateData.oldPassword && updateData.newPassword) {
      // Need to get user with password
      const userWithPassword = await userRepository.findByEmail(student.email, true);
      const isMatch = await userWithPassword.comparePassword(updateData.oldPassword);

      if (!isMatch) {
        throw new AppError('Current password is incorrect', 400);
      }

      userWithPassword.password = updateData.newPassword;
      await userWithPassword.save();

      return userWithPassword.toJSON();
    }

    throw new AppError('No valid update fields provided', 400);
  }
}

export default new StudentService();
