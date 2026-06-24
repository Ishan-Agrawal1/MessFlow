import config from '../config/index.js';
import AppError from '../utils/AppError.js';

/**
 * Handle Mongoose CastError (invalid ObjectId, etc.)
 */
const handleCastError = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

/**
 * Handle Mongoose duplicate key error.
 */
const handleDuplicateKeyError = (err) => {
  const field = Object.keys(err.keyValue).join(', ');
  const message = `Duplicate value for field(s): ${field}. Please use a different value.`;
  return new AppError(message, 409);
};

/**
 * Handle Mongoose validation error.
 */
const handleValidationError = (err) => {
  const messages = Object.values(err.errors).map((e) => e.message).join(', ');
  return new AppError(messages, 400);
};

/**
 * Handle JWT errors.
 */
const handleJWTError = () =>
  new AppError('Invalid token. Please log in again.', 401);

const handleJWTExpiredError = () =>
  new AppError('Your token has expired. Please log in again.', 401);

/**
 * Global error handler middleware.
 */
// eslint-disable-next-line no-unused-vars
const errorHandler = (err, _req, res, _next) => {
  let error = { ...err };
  error.message = err.message;
  error.stack = err.stack;

  // Log error in development
  if (config.env === 'development') {
    console.error('❌ Error:', {
      message: err.message,
      stack: err.stack,
      statusCode: err.statusCode,
    });
  }

  // Mongoose CastError
  if (err.name === 'CastError') error = handleCastError(err);

  // Mongoose duplicate key
  if (err.code === 11000) error = handleDuplicateKeyError(err);

  // Mongoose validation error
  if (err.name === 'ValidationError') error = handleValidationError(err);

  // JWT errors
  if (err.name === 'JsonWebTokenError') error = handleJWTError();
  if (err.name === 'TokenExpiredError') error = handleJWTExpiredError();

  // Send response
  const statusCode = error.statusCode || 500;
  const message = error.isOperational
    ? error.message
    : 'Something went wrong. Please try again later.';

  res.status(statusCode).json({
    success: false,
    message,
    ...(config.env === 'development' && {
      error: err.message,
      stack: err.stack,
    }),
  });
};

export default errorHandler;
