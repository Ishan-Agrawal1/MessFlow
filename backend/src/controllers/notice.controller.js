import noticeService from '../services/notice.service.js';
import ApiResponse from '../utils/apiResponse.js';
import asyncHandler from '../utils/asyncHandler.js';

/**
 * Notice Controller — thin layer delegating to NoticeService.
 */

/**
 * GET /api/notices (student-facing)
 */
export const getActiveNotices = asyncHandler(async (req, res) => {
  const notices = await noticeService.getActiveNotices();

  new ApiResponse(200, { notices }, 'Active notices retrieved').send(res);
});

/**
 * POST /api/admin/notices
 */
export const createNotice = asyncHandler(async (req, res) => {
  const notice = await noticeService.createNotice(req.body, req.user._id);

  new ApiResponse(201, { notice }, 'Notice created successfully').send(res);
});

/**
 * PATCH /api/admin/notices/:id
 */
export const updateNotice = asyncHandler(async (req, res) => {
  const notice = await noticeService.updateNotice(req.params.id, req.body);

  new ApiResponse(200, { notice }, 'Notice updated successfully').send(res);
});

/**
 * DELETE /api/admin/notices/:id
 */
export const deleteNotice = asyncHandler(async (req, res) => {
  await noticeService.deleteNotice(req.params.id);

  new ApiResponse(200, null, 'Notice deleted successfully').send(res);
});
