import AppError from '../utils/AppError.js';

/**
 * 404 Not Found handler.
 * Catches requests to undefined routes.
 */
const notFoundHandler = (req, _res, next) => {
  next(new AppError(`Route not found: ${req.method} ${req.originalUrl}`, 404));
};

export default notFoundHandler;
