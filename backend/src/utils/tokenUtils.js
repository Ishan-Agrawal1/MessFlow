import jwt from 'jsonwebtoken';
import config from '../config/index.js';

/**
 * Generate a JWT access token.
 * @param {Object} payload - Token payload (userId, role)
 * @returns {string} Signed JWT
 */
export const generateAccessToken = (payload) => {
  return jwt.sign(payload, config.accessTokenSecret, {
    expiresIn: config.accessTokenExpiry,
  });
};

/**
 * Generate a JWT refresh token.
 * @param {Object} payload - Token payload (userId)
 * @returns {string} Signed JWT
 */
export const generateRefreshToken = (payload) => {
  return jwt.sign(payload, config.refreshTokenSecret, {
    expiresIn: config.refreshTokenExpiry,
  });
};

/**
 * Verify a JWT token.
 * @param {string} token - The JWT string
 * @param {string} secret - The secret key
 * @returns {Object} Decoded payload
 */
export const verifyToken = (token, secret) => {
  return jwt.verify(token, secret);
};
