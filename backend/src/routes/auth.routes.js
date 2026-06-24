import { Router } from 'express';
import { login, logout, refresh, getMe } from '../controllers/auth.controller.js';
import { loginSchema } from '../validators/auth.validator.js';
import validateRequest from '../middlewares/validateRequest.middleware.js';
import authenticate from '../middlewares/authenticate.middleware.js';
import { authLimiter } from '../middlewares/rateLimiter.middleware.js';

const router = Router();

// Apply stricter rate limiting to auth routes
router.use(authLimiter);

// POST /api/auth/login
router.post('/login', validateRequest(loginSchema), login);

// POST /api/auth/logout
router.post('/logout', authenticate, logout);

// POST /api/auth/refresh
router.post('/refresh', refresh);

// GET /api/auth/me
router.get('/me', authenticate, getMe);

export default router;
