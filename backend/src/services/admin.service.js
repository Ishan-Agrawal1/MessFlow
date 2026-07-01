import mongoose from 'mongoose';
import userRepository from '../repositories/user.repository.js';
import feeCycleRepository from '../repositories/feeCycle.repository.js';
import studentDueRepository from '../repositories/studentDue.repository.js';
import paymentRepository from '../repositories/payment.repository.js';
import emailService from './email.service.js';
import AppError from '../utils/AppError.js';
import { USER_ROLES, DUE_STATUS, MONTH_NAMES } from '../constants/index.js';

/**
 * Admin Service — handles all admin business logic.
 */
class AdminService {
  // ─── Dashboard ────────────────────────────────────────────

  /**
   * Get admin dashboard analytics.
   */
  async getDashboard() {
    const totalStudents = await userRepository.countStudents();
    const activeStudents = await userRepository.countStudents({ isActive: true });

    // Get current fee cycle
    const currentCycle = await feeCycleRepository.findCurrentCycle();

    let paidStudents = 0;
    let defaulters = 0;
    let pendingRevenue = 0;
    let collectedRevenue = 0;

    if (currentCycle) {
      paidStudents = await studentDueRepository.countByStatus(
        currentCycle._id,
        DUE_STATUS.PAID
      );

      const pendingCount = await studentDueRepository.countByStatus(
        currentCycle._id,
        DUE_STATUS.PENDING
      );
      const overdueCount = await studentDueRepository.countByStatus(
        currentCycle._id,
        DUE_STATUS.OVERDUE
      );
      defaulters = pendingCount + overdueCount;

      // Revenue calculations
      const revenueData = await studentDueRepository.getRevenueByFeeCycle(currentCycle._id);

      for (const item of revenueData) {
        if (item._id === DUE_STATUS.PAID) {
          collectedRevenue = item.total;
        } else {
          pendingRevenue += item.total;
        }
      }
    }

    // Monthly revenue trend
    const monthlyRevenue = await paymentRepository.getMonthlyRevenue();

    return {
      totalStudents,
      activeStudents,
      paidStudents,
      defaulters,
      pendingRevenue,
      collectedRevenue,
      monthlyRevenue,
    };
  }

  // ─── Students CRUD ────────────────────────────────────────

  /**
   * Register a new student with default password.
   */
  async registerStudent(studentData) {
    // Check if email already exists
    const existingEmail = await userRepository.findByEmail(studentData.email);
    if (existingEmail) {
      throw new AppError('A user with this email already exists', 409);
    }

    // Check if studentId already exists
    const existingStudentId = await userRepository.findByStudentId(studentData.studentId);
    if (existingStudentId) {
      throw new AppError('A student with this ID already exists', 409);
    }

    // Default password: studentId@messpassword
    const defaultPassword = `${studentData.studentId}@messpassword`;

    const student = await userRepository.create({
      name: studentData.name,
      email: studentData.email,
      studentId: studentData.studentId,
      batch: studentData.batch,
      password: defaultPassword,
      role: USER_ROLES.STUDENT,
      isActive: true,
    });

    return student;
  }

  /**
   * Get all students.
   */
  async getAllStudents() {
    return userRepository.findAllStudents();
  }

  /**
   * Get a single student by ID.
   */
  async getStudent(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new AppError('Invalid student ID', 400);
    }

    const student = await userRepository.findById(id);
    if (!student || student.role !== USER_ROLES.STUDENT) {
      throw new AppError('Student not found', 404);
    }

    // Get dues summary
    const dues = await studentDueRepository.findByStudent(id);

    return { student, dues };
  }

  /**
   * Update a student.
   */
  async updateStudent(id, updateData) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new AppError('Invalid student ID', 400);
    }

    // Prevent role change via this endpoint
    delete updateData.role;
    delete updateData.password;

    const student = await userRepository.updateById(id, updateData);
    if (!student) {
      throw new AppError('Student not found', 404);
    }

    return student;
  }

  /**
   * Delete a student.
   */
  async deleteStudent(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new AppError('Invalid student ID', 400);
    }

    const student = await userRepository.deleteById(id);
    if (!student) {
      throw new AppError('Student not found', 404);
    }

    return student;
  }

  // ─── Fee Cycles ───────────────────────────────────────────

  /**
   * Create a new fee cycle.
   */
  async createFeeCycle(data, adminId) {
    // Check for duplicate (month + year + batch)
    const existing = await feeCycleRepository.findByMonthYear(data.month, data.year, data.batch || null);
    if (existing) {
      const monthName = MONTH_NAMES[data.month - 1];
      const batchLabel = data.batch ? ` (Batch ${data.batch})` : ' (All Batches)';
      throw new AppError(
        `A fee cycle for ${monthName} ${data.year}${batchLabel} already exists`,
        409
      );
    }

    const feeCycle = await feeCycleRepository.create({
      ...data,
      batch: data.batch || null,
      createdBy: adminId,
    });

    return feeCycle;
  }

  /**
   * Get all fee cycles.
   */
  async getAllFeeCycles() {
    return feeCycleRepository.findAll();
  }

  /**
   * Get a single fee cycle by ID with dues summary.
   */
  async getFeeCycle(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new AppError('Invalid fee cycle ID', 400);
    }

    const feeCycle = await feeCycleRepository.findById(id);
    if (!feeCycle) {
      throw new AppError('Fee cycle not found', 404);
    }

    // Get dues count summary
    const totalDues = await studentDueRepository.countByFeeCycle(feeCycle._id);
    const paidCount = await studentDueRepository.countByStatus(feeCycle._id, DUE_STATUS.PAID);
    const pendingCount = await studentDueRepository.countByStatus(feeCycle._id, DUE_STATUS.PENDING);
    const overdueCount = await studentDueRepository.countByStatus(feeCycle._id, DUE_STATUS.OVERDUE);

    return {
      feeCycle,
      summary: {
        totalDues,
        paid: paidCount,
        pending: pendingCount,
        overdue: overdueCount,
      },
    };
  }

  // ─── Generate Dues ────────────────────────────────────────

  /**
   * Generate dues for active students for a fee cycle.
   * If the cycle has a batch, only students from that batch get dues.
   * Skips duplicates via the compound unique index.
   */
  async generateDues(feeCycleId) {
    if (!mongoose.Types.ObjectId.isValid(feeCycleId)) {
      throw new AppError('Invalid fee cycle ID', 400);
    }

    const feeCycle = await feeCycleRepository.findById(feeCycleId);
    if (!feeCycle) {
      throw new AppError('Fee cycle not found', 404);
    }

    // Get active students — filter by batch if cycle is batch-specific
    let activeStudents;
    if (feeCycle.batch) {
      activeStudents = await userRepository.findActiveStudents({ batch: feeCycle.batch });
    } else {
      activeStudents = await userRepository.findActiveStudents();
    }

    if (activeStudents.length === 0) {
      const batchLabel = feeCycle.batch ? ` for batch ${feeCycle.batch}` : '';
      throw new AppError(`No active students found${batchLabel}`, 400);
    }

    // Prepare due records
    const duesData = activeStudents.map((student) => ({
      student: student._id,
      feeCycle: feeCycle._id,
      amount: feeCycle.amount,
      status: DUE_STATUS.PENDING,
    }));

    // Bulk insert (skips duplicates)
    const created = await studentDueRepository.bulkCreate(duesData);
    const duesGenerated = Array.isArray(created) ? created.length : 0;

    // ─── Send email notifications (fire-and-forget) ───────────
    if (duesGenerated > 0) {
      const monthName = MONTH_NAMES[feeCycle.month - 1];
      const formattedDueDate = new Date(feeCycle.dueDate).toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      });

      // Fire and forget — don't block the API response
      emailService
        .sendBulkDueCreatedEmails(
          activeStudents.map((s) => ({ email: s.email, name: s.name, studentId: s.studentId })),
          {
            monthName,
            year: feeCycle.year,
            amount: feeCycle.amount,
            dueDate: formattedDueDate,
          }
        )
        .catch((err) => {
          console.error('❌ Error sending bulk due notification emails:', err.message);
        });
    }

    return {
      totalStudents: activeStudents.length,
      duesGenerated,
      feeCycle,
    };
  }

  // ─── Defaulters & Paid Students ───────────────────────────

  /**
   * Get defaulters for a specific fee cycle (or current).
   */
  async getDefaulters(feeCycleId) {
    let cycleId = feeCycleId;

    if (!cycleId) {
      const currentCycle = await feeCycleRepository.findCurrentCycle();
      if (!currentCycle) {
        throw new AppError('No current fee cycle found', 404);
      }
      cycleId = currentCycle._id;
    }

    const defaulters = await studentDueRepository.findDefaulters(cycleId);

    return defaulters.map((due) => ({
      studentName: due.student.name,
      studentId: due.student.studentId,
      batch: due.student.batch,
      amountDue: due.amount,
      status: due.status,
      month: due.feeCycle.month,
      year: due.feeCycle.year,
      monthName: MONTH_NAMES[due.feeCycle.month - 1],
    }));
  }

  /**
   * Get paid students for a specific fee cycle (or current).
   */
  async getPaidStudents(feeCycleId) {
    let cycleId = feeCycleId;

    if (!cycleId) {
      const currentCycle = await feeCycleRepository.findCurrentCycle();
      if (!currentCycle) {
        throw new AppError('No current fee cycle found', 404);
      }
      cycleId = currentCycle._id;
    }

    const paidStudents = await studentDueRepository.findPaidStudents(cycleId);

    return paidStudents.map((due) => ({
      studentName: due.student.name,
      studentId: due.student.studentId,
      batch: due.student.batch,
      amountPaid: due.amount,
      paymentDate: due.paidAt,
      receiptNumber: due.payment?.receiptNumber || 'N/A',
    }));
  }
  // ─── All Payments (Admin View) ──────────────────────────

  /**
   * Get all payments with pagination.
   */
  async getAllPayments(page = 1, limit = 20) {
    return paymentRepository.findAllPayments(page, limit);
  }
}

export default new AdminService();
