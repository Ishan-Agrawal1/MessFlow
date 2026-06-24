import adminService from '../services/admin.service.js';
import ApiResponse from '../utils/apiResponse.js';
import asyncHandler from '../utils/asyncHandler.js';

/**
 * Admin Controller — thin layer delegating to AdminService.
 */

// ─── Dashboard ──────────────────────────────────────────────

/**
 * GET /api/admin/dashboard
 */
export const getDashboard = asyncHandler(async (req, res) => {
  const dashboard = await adminService.getDashboard();

  new ApiResponse(200, dashboard, 'Admin dashboard data retrieved').send(res);
});

// ─── Students CRUD ──────────────────────────────────────────

/**
 * POST /api/admin/students
 */
export const registerStudent = asyncHandler(async (req, res) => {
  const student = await adminService.registerStudent(req.body);

  new ApiResponse(201, { student }, 'Student registered successfully').send(res);
});

/**
 * GET /api/admin/students
 */
export const getAllStudents = asyncHandler(async (req, res) => {
  const students = await adminService.getAllStudents();

  new ApiResponse(200, { students }, 'Students retrieved').send(res);
});

/**
 * GET /api/admin/students/:id
 */
export const getStudent = asyncHandler(async (req, res) => {
  const data = await adminService.getStudent(req.params.id);

  new ApiResponse(200, data, 'Student details retrieved').send(res);
});

/**
 * PATCH /api/admin/students/:id
 */
export const updateStudent = asyncHandler(async (req, res) => {
  const student = await adminService.updateStudent(req.params.id, req.body);

  new ApiResponse(200, { student }, 'Student updated successfully').send(res);
});

/**
 * DELETE /api/admin/students/:id
 */
export const deleteStudent = asyncHandler(async (req, res) => {
  await adminService.deleteStudent(req.params.id);

  new ApiResponse(200, null, 'Student deleted successfully').send(res);
});

// ─── Fee Cycles ─────────────────────────────────────────────

/**
 * POST /api/admin/fee-cycles
 */
export const createFeeCycle = asyncHandler(async (req, res) => {
  const feeCycle = await adminService.createFeeCycle(req.body, req.user._id);

  new ApiResponse(201, { feeCycle }, 'Fee cycle created successfully').send(res);
});

/**
 * GET /api/admin/fee-cycles
 */
export const getAllFeeCycles = asyncHandler(async (req, res) => {
  const feeCycles = await adminService.getAllFeeCycles();

  new ApiResponse(200, { feeCycles }, 'Fee cycles retrieved').send(res);
});

/**
 * GET /api/admin/fee-cycles/:id
 */
export const getFeeCycle = asyncHandler(async (req, res) => {
  const data = await adminService.getFeeCycle(req.params.id);

  new ApiResponse(200, data, 'Fee cycle details retrieved').send(res);
});

// ─── Generate Dues ──────────────────────────────────────────

/**
 * POST /api/admin/fee-cycles/:id/generate-dues
 */
export const generateDues = asyncHandler(async (req, res) => {
  const result = await adminService.generateDues(req.params.id);

  new ApiResponse(201, result, 'Dues generated successfully').send(res);
});

// ─── Defaulters & Paid Students ─────────────────────────────

/**
 * GET /api/admin/defaulters
 */
export const getDefaulters = asyncHandler(async (req, res) => {
  const feeCycleId = req.query.feeCycleId || null;
  const defaulters = await adminService.getDefaulters(feeCycleId);

  new ApiResponse(200, { defaulters }, 'Defaulters list retrieved').send(res);
});

/**
 * GET /api/admin/paid-students
 */
export const getPaidStudents = asyncHandler(async (req, res) => {
  const feeCycleId = req.query.feeCycleId || null;
  const paidStudents = await adminService.getPaidStudents(feeCycleId);

  new ApiResponse(200, { paidStudents }, 'Paid students list retrieved').send(res);
});

// ─── All Payments ───────────────────────────────────────────

/**
 * GET /api/admin/payments
 */
export const getAllPayments = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 20;

  const result = await adminService.getAllPayments(page, limit);

  new ApiResponse(200, result, 'All payments retrieved').send(res);
});
