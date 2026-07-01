import { Router } from 'express';
import authRoutes from './auth.routes.js';
import studentRoutes from './student.routes.js';
import paymentRoutes from './payment.routes.js';
import noticeRoutes from './notice.routes.js';
import adminRoutes from './admin.routes.js';
import contactRoutes from './contact.routes.js';

const router = Router();

// Health check
router.get('/health', (_req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
  });
});

// Mount sub-routers
router.use('/auth', authRoutes);
router.use('/student', studentRoutes);
router.use('/payments', paymentRoutes);
router.use('/notices', noticeRoutes);
router.use('/admin', adminRoutes);
router.use('/contact', contactRoutes);

export default router;
