import noticeRepository from '../repositories/notice.repository.js';
import AppError from '../utils/AppError.js';
import mongoose from 'mongoose';

/**
 * Notice Service — handles notice business logic.
 */
class NoticeService {
  /**
   * Get active notices (for students).
   */
  async getActiveNotices() {
    return noticeRepository.findActiveNotices();
  }

  /**
   * Create a new notice (admin).
   */
  async createNotice(data, adminId) {
    return noticeRepository.create({
      ...data,
      createdBy: adminId,
    });
  }

  /**
   * Update a notice (admin).
   */
  async updateNotice(id, updateData) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new AppError('Invalid notice ID', 400);
    }

    const notice = await noticeRepository.updateById(id, updateData);
    if (!notice) {
      throw new AppError('Notice not found', 404);
    }

    return notice;
  }

  /**
   * Delete a notice (admin).
   */
  async deleteNotice(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new AppError('Invalid notice ID', 400);
    }

    const notice = await noticeRepository.deleteById(id);
    if (!notice) {
      throw new AppError('Notice not found', 404);
    }

    return notice;
  }
}

export default new NoticeService();
