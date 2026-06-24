/**
 * Application-wide constants.
 */

export const USER_ROLES = Object.freeze({
  ADMIN: 'admin',
  STUDENT: 'student',
});

export const DUE_STATUS = Object.freeze({
  PENDING: 'PENDING',
  PAID: 'PAID',
  OVERDUE: 'OVERDUE',
});

export const PAYMENT_STATUS = Object.freeze({
  CREATED: 'CREATED',
  SUCCESS: 'SUCCESS',
  FAILED: 'FAILED',
});

export const NOTICE_PRIORITY = Object.freeze({
  LOW: 'LOW',
  MEDIUM: 'MEDIUM',
  HIGH: 'HIGH',
});

export const COOKIE_NAMES = Object.freeze({
  ACCESS_TOKEN: 'accessToken',
  REFRESH_TOKEN: 'refreshToken',
});

export const MONTH_NAMES = Object.freeze([
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]);
