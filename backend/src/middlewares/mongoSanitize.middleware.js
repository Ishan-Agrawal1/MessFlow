/**
 * MongoDB query injection sanitizer.
 * Strips keys starting with '$' or containing '.' from objects.
 * Compatible with Express 5 (where req.query is read-only).
 */

/**
 * Recursively sanitize an object by removing keys that contain
 * MongoDB operators ($ prefix) or dot notation.
 * @param {*} val - Value to sanitize
 * @returns {*} Sanitized value
 */
const sanitize = (val) => {
  if (val === null || val === undefined) return val;

  if (Array.isArray(val)) {
    return val.map(sanitize);
  }

  if (typeof val === 'object') {
    const clean = {};
    for (const key of Object.keys(val)) {
      if (key.startsWith('$') || key.includes('.')) {
        continue; // strip dangerous keys
      }
      clean[key] = sanitize(val[key]);
    }
    return clean;
  }

  return val;
};

/**
 * Express middleware to sanitize req.body and req.params.
 * Does NOT touch req.query (read-only in Express 5).
 */
const mongoSanitize = (req, _res, next) => {
  if (req.body) {
    req.body = sanitize(req.body);
  }
  if (req.params) {
    req.params = sanitize(req.params);
  }
  next();
};

export default mongoSanitize;
