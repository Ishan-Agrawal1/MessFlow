import { Router } from 'express';
import {
  getDashboard,
  registerStudent,
  getAllStudents,
  getStudent,
  updateStudent,
  deleteStudent,
  createFeeCycle,
  getAllFeeCycles,
  getFeeCycle,
  generateDues,
  getDefaulters,
  getPaidStudents,
  getAllPayments,
} from '../controllers/admin.controller.js';
import { createNotice, updateNotice, deleteNotice } from '../controllers/notice.controller.js';
import {
  registerStudentSchema,
  updateStudentSchema,
  feeCycleSchema,
  noticeSchema,
  updateNoticeSchema,
} from '../validators/admin.validator.js';
import validateRequest from '../middlewares/validateRequest.middleware.js';
import authenticate from '../middlewares/authenticate.middleware.js';
import authorize from '../middlewares/authorize.middleware.js';
import { USER_ROLES } from '../constants/index.js';

const router = Router();

// All admin routes require authentication + admin role
router.use(authenticate, authorize(USER_ROLES.ADMIN));

// ─── Dashboard ──────────────────────────────────────────────
router.get('/dashboard', getDashboard);

// ─── Students ───────────────────────────────────────────────
router.post('/students', validateRequest(registerStudentSchema), registerStudent);
router.get('/students', getAllStudents);
router.get('/students/:id', getStudent);
router.patch('/students/:id', validateRequest(updateStudentSchema), updateStudent);
router.delete('/students/:id', deleteStudent);

// ─── Fee Cycles ─────────────────────────────────────────────
router.post('/fee-cycles', validateRequest(feeCycleSchema), createFeeCycle);
router.get('/fee-cycles', getAllFeeCycles);
router.get('/fee-cycles/:id', getFeeCycle);

// ─── Generate Dues ──────────────────────────────────────────
router.post('/fee-cycles/:id/generate-dues', generateDues);

// ─── Defaulters & Paid Students ─────────────────────────────
router.get('/defaulters', getDefaulters);
router.get('/paid-students', getPaidStudents);

// ─── Payments ───────────────────────────────────────────────
router.get('/payments', getAllPayments);

// ─── Notices ────────────────────────────────────────────────
router.post('/notices', validateRequest(noticeSchema), createNotice);
router.patch('/notices/:id', validateRequest(updateNoticeSchema), updateNotice);
router.delete('/notices/:id', deleteNotice);

export default router;
