/**
 * Wraps an async Express route handler to catch rejected promises
 * and forward them to the global error handler.
 *
 * @param {Function} fn - Async route handler
 * @returns {Function} Express middleware
 */
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

export default asyncHandler;
