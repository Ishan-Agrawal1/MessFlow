import studentService from '../services/student.service.js';
import ApiResponse from '../utils/apiResponse.js';
import asyncHandler from '../utils/asyncHandler.js';

/**
 * Student Controller — thin layer delegating to StudentService.
 */

/**
 * GET /api/student/dashboard
 */
export const getDashboard = asyncHandler(async (req, res) => {
  const dashboard = await studentService.getDashboard(req.user._id);

  new ApiResponse(200, dashboard, 'Dashboard data retrieved').send(res);
});

/**
 * GET /api/student/profile
 */
export const getProfile = asyncHandler(async (req, res) => {
  const student = await studentService.getProfile(req.user._id);

  new ApiResponse(200, { student }, 'Profile retrieved').send(res);
});

/**
 * PATCH /api/student/profile
 * Used for changing password.
 */
export const updateProfile = asyncHandler(async (req, res) => {
  const student = await studentService.updateProfile(req.user._id, req.body);

  new ApiResponse(200, { student }, 'Profile updated successfully').send(res);
});
