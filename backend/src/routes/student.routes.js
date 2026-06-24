import { Router } from 'express';
import { getDashboard, getProfile, updateProfile } from '../controllers/student.controller.js';
import { changePasswordSchema } from '../validators/auth.validator.js';
import validateRequest from '../middlewares/validateRequest.middleware.js';
import authenticate from '../middlewares/authenticate.middleware.js';
import authorize from '../middlewares/authorize.middleware.js';
import { USER_ROLES } from '../constants/index.js';

const router = Router();

// All student routes require authentication + student role
router.use(authenticate, authorize(USER_ROLES.STUDENT));

// GET /api/student/dashboard
router.get('/dashboard', getDashboard);

// GET /api/student/profile
router.get('/profile', getProfile);

// PATCH /api/student/profile (change password)
router.patch('/profile', validateRequest(changePasswordSchema), updateProfile);

export default router;
