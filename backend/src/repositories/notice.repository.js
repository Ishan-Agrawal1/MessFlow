import Notice from '../models/Notice.model.js';

/**
 * Notice Repository — encapsulates all DB operations for notices.
 */
class NoticeRepository {
  /**
   * Create a new notice.
   * @param {Object} data
   * @returns {Promise<Object>}
   */
  async create(data) {
    const notice = new Notice(data);
    return notice.save();
  }

  /**
   * Find notice by ID.
   * @param {string} id
   * @returns {Promise<Object|null>}
   */
  async findById(id) {
    return Notice.findById(id)
      .populate('createdBy', 'name email')
      .exec();
  }

  /**
   * Get all active notices visible right now.
   * @returns {Promise<Array>}
   */
  async findActiveNotices() {
    const now = new Date();
    return Notice.find({
      isActive: true,
      startDate: { $lte: now },
      $or: [
        { endDate: null },
        { endDate: { $gte: now } },
      ],
    })
      .populate('createdBy', 'name')
      .sort({ priority: -1, createdAt: -1 })
      .exec();
  }

  /**
   * Get all notices (for admin).
   * @returns {Promise<Array>}
   */
  async findAll() {
    return Notice.find()
      .populate('createdBy', 'name email')
      .sort({ createdAt: -1 })
      .exec();
  }

  /**
   * Update notice by ID.
   * @param {string} id
   * @param {Object} updateData
   * @returns {Promise<Object|null>}
   */
  async updateById(id, updateData) {
    return Notice.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    }).exec();
  }

  /**
   * Delete notice by ID.
   * @param {string} id
   * @returns {Promise<Object|null>}
   */
  async deleteById(id) {
    return Notice.findByIdAndDelete(id).exec();
  }
}

export default new NoticeRepository();
