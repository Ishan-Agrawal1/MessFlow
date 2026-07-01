import { Router } from 'express';
import { submitContactForm } from '../controllers/contact.controller.js';
import { contactFormSchema } from '../validators/contact.validator.js';
import validateRequest from '../middlewares/validateRequest.middleware.js';
import { contactLimiter } from '../middlewares/rateLimiter.middleware.js';

const router = Router();

// Apply strict rate limiting to prevent contact form spam
router.use(contactLimiter);

// POST /api/contact
router.post('/', validateRequest(contactFormSchema), submitContactForm);

export default router;
