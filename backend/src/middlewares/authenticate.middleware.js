import config from '../config/index.js';
import { verifyToken } from '../utils/tokenUtils.js';
import userRepository from '../repositories/user.repository.js';
import AppError from '../utils/AppError.js';
import { COOKIE_NAMES } from '../constants/index.js';

/**
 * Authentication middleware.
 * Extracts JWT from Authorization header or HTTP-only cookie,
 * verifies it, and attaches the user to req.user.
 */
const authenticate = async (req, _res, next) => {
  let token = null;

  // 1. Check Authorization header
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.split(' ')[1];
  }

  // 2. Fallback to cookie
  if (!token && req.cookies) {
    token = req.cookies[COOKIE_NAMES.ACCESS_TOKEN];
  }

  if (!token) {
    return next(new AppError('Authentication required. Please log in.', 401));
  }

  try {
    // Verify token
    const decoded = verifyToken(token, config.accessTokenSecret);

    // Fetch user from database
    const user = await userRepository.findById(decoded.userId);
    if (!user) {
      return next(new AppError('User belonging to this token no longer exists', 401));
    }

    if (!user.isActive) {
      return next(new AppError('Your account has been deactivated', 403));
    }

    // Attach user to request
    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return next(new AppError('Access token has expired. Please refresh your token.', 401));
    }
    if (error.name === 'JsonWebTokenError') {
      return next(new AppError('Invalid access token', 401));
    }
    return next(new AppError('Authentication failed', 401));
  }
};

export default authenticate;
