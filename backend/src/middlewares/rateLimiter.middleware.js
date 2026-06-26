import { rateLimit } from 'express-rate-limit';

/**
 * Global rate limiter — 1000 requests per 15 minutes per IP.
 * Tuned for 1000 concurrent users behind a shared IP (e.g., campus/proxy).
 */
export const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many requests from this IP. Please try again after 15 minutes.',
  },
});

/**
 * Auth rate limiter — 1000 requests per 15 minutes per IP.
 * Must accommodate burst logins (e.g., 1000 students logging in at once).
 */
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many authentication attempts. Please try again after 15 minutes.',
  },
});

/**
 * Payment rate limiter — 100 requests per 15 minutes per IP.
 */
export const paymentLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many payment requests. Please try again later.',
  },
});
