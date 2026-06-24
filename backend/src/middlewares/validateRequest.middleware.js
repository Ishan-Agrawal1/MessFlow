import AppError from '../utils/AppError.js';

/**
 * Generic Joi validation middleware.
 *
 * @param {Object} schema - Joi schema
 * @param {string} source - 'body', 'params', or 'query'
 * @returns {Function} Express middleware
 */
const validateRequest = (schema, source = 'body') => {
  return (req, _res, next) => {
    const { error, value } = schema.validate(req[source], {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      const messages = error.details.map((detail) => detail.message).join(', ');
      return next(new AppError(messages, 400));
    }

    // Replace the source with the validated (and stripped) value
    req[source] = value;
    next();
  };
};

export default validateRequest;
