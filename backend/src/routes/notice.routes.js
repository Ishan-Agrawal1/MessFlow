import { Router } from 'express';
import { getActiveNotices } from '../controllers/notice.controller.js';
import authenticate from '../middlewares/authenticate.middleware.js';

const router = Router();

// GET /api/notices — any authenticated user can view
router.get('/', authenticate, getActiveNotices);

export default router;
