import User from '../models/User.model.js';
import { USER_ROLES } from '../constants/index.js';

/**
 * User Repository — encapsulates all database operations for User model.
 */
class UserRepository {
  /**
   * Create a new user.
   * @param {Object} userData
   * @returns {Promise<Object>}
   */
  async create(userData) {
    const user = new User(userData);
    return user.save();
  }

  /**
   * Find user by ID.
   * @param {string} id
   * @param {boolean} includePassword - Whether to include the password field
   * @returns {Promise<Object|null>}
   */
  async findById(id, includePassword = false) {
    const query = User.findById(id);
    if (includePassword) query.select('+password');
    return query.exec();
  }

  /**
   * Find user by email.
   * @param {string} email
   * @param {boolean} includePassword
   * @returns {Promise<Object|null>}
   */
  async findByEmail(email, includePassword = false) {
    const query = User.findOne({ email: email.toLowerCase() });
    if (includePassword) query.select('+password');
    return query.exec();
  }

  /**
   * Find user by studentId.
   * @param {string} studentId
   * @param {boolean} includePassword
   * @returns {Promise<Object|null>}
   */
  async findByStudentId(studentId, includePassword = false) {
    const query = User.findOne({ studentId });
    if (includePassword) query.select('+password');
    return query.exec();
  }

  /**
   * Get all students (excluding admins).
   * @param {Object} filters - Optional filters
   * @returns {Promise<Array>}
   */
  async findAllStudents(filters = {}) {
    const query = { role: USER_ROLES.STUDENT, ...filters };
    return User.find(query).sort({ createdAt: -1 }).exec();
  }

  /**
   * Get all active students, optionally filtered.
   * @param {Object} filter - Optional additional filters (e.g., { batch: 2024 })
   * @returns {Promise<Array>}
   */
  async findActiveStudents(filter = {}) {
    return User.find({
      role: USER_ROLES.STUDENT,
      isActive: true,
      ...filter,
    }).exec();
  }

  /**
   * Update user by ID.
   * @param {string} id
   * @param {Object} updateData
   * @returns {Promise<Object|null>}
   */
  async updateById(id, updateData) {
    return User.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    }).exec();
  }

  /**
   * Delete (soft-delete by deactivating) user by ID.
   * @param {string} id
   * @returns {Promise<Object|null>}
   */
  async deleteById(id) {
    return User.findByIdAndDelete(id).exec();
  }

  /**
   * Count students matching criteria.
   * @param {Object} filter
   * @returns {Promise<number>}
   */
  async countStudents(filter = {}) {
    return User.countDocuments({
      role: USER_ROLES.STUDENT,
      ...filter,
    }).exec();
  }

  /**
   * Find or create admin user (upsert).
   * @param {Object} adminData
   * @returns {Promise<Object>}
   */
  async upsertAdmin(adminData) {
    let admin = await this.findByEmail(adminData.email);
    if (!admin) {
      admin = await this.create({
        ...adminData,
        role: USER_ROLES.ADMIN,
      });
      console.log('✅ Admin user seeded');
    }
    return admin;
  }
}

export default new UserRepository();
