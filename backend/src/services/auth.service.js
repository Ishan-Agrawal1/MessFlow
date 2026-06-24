import config from '../config/index.js';
import userRepository from '../repositories/user.repository.js';
import refreshTokenRepository from '../repositories/refreshToken.repository.js';
import {
  generateAccessToken,
  generateRefreshToken,
  verifyToken,
} from '../utils/tokenUtils.js';
import AppError from '../utils/AppError.js';
import { USER_ROLES } from '../constants/index.js';

/**
 * Auth Service — handles authentication business logic.
 */
class AuthService {
  /**
   * Login with identifier (email or studentId) and password.
   * Returns access + refresh tokens.
   */
  async login(identifier, password) {
    // Try to find user by email first, then by studentId
    let user = await userRepository.findByEmail(identifier, true);
    if (!user) {
      user = await userRepository.findByStudentId(identifier, true);
    }
    if (!user) {
      throw new AppError('Invalid credentials', 401);
    }

    if (!user.isActive) {
      throw new AppError('Your account has been deactivated. Please contact the administrator.', 403);
    }

    // Compare password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      throw new AppError('Invalid credentials', 401);
    }

    // Generate tokens
    const accessToken = generateAccessToken({
      userId: user._id,
      role: user.role,
    });

    const refreshToken = generateRefreshToken({
      userId: user._id,
    });

    // Store refresh token in database
    const refreshTokenExpiry = new Date();
    refreshTokenExpiry.setDate(refreshTokenExpiry.getDate() + 30);

    await refreshTokenRepository.create({
      user: user._id,
      token: refreshToken,
      expiresAt: refreshTokenExpiry,
    });

    return {
      user: user.toJSON(),
      accessToken,
      refreshToken,
    };
  }

  /**
   * Logout — revoke the refresh token.
   */
  async logout(refreshToken) {
    if (refreshToken) {
      await refreshTokenRepository.revokeToken(refreshToken);
    }
  }

  /**
   * Refresh Token Rotation:
   * 1. Verify old refresh token
   * 2. Revoke it (one-time use)
   * 3. Issue new access + refresh token pair
   */
  async refreshToken(oldRefreshToken) {
    if (!oldRefreshToken) {
      throw new AppError('Refresh token is required', 401);
    }

    // Verify the JWT
    let decoded;
    try {
      decoded = verifyToken(oldRefreshToken, config.refreshTokenSecret);
    } catch {
      throw new AppError('Invalid or expired refresh token', 401);
    }

    // Check if token exists in DB and is valid
    const storedToken = await refreshTokenRepository.findValidToken(oldRefreshToken);
    if (!storedToken) {
      // Possible token reuse attack — revoke all tokens for this user
      await refreshTokenRepository.revokeAllUserTokens(decoded.userId);
      throw new AppError('Refresh token has been revoked. All sessions have been terminated for security.', 401);
    }

    // Revoke the old token (rotation)
    await refreshTokenRepository.revokeToken(oldRefreshToken);

    // Verify user still exists and is active
    const user = await userRepository.findById(decoded.userId);
    if (!user || !user.isActive) {
      throw new AppError('User not found or deactivated', 401);
    }

    // Generate new token pair
    const newAccessToken = generateAccessToken({
      userId: user._id,
      role: user.role,
    });

    const newRefreshToken = generateRefreshToken({
      userId: user._id,
    });

    // Store new refresh token
    const refreshTokenExpiry = new Date();
    refreshTokenExpiry.setDate(refreshTokenExpiry.getDate() + 30);

    await refreshTokenRepository.create({
      user: user._id,
      token: newRefreshToken,
      expiresAt: refreshTokenExpiry,
    });

    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    };
  }

  /**
   * Get current authenticated user profile.
   */
  async getMe(userId) {
    const user = await userRepository.findById(userId);
    if (!user) {
      throw new AppError('User not found', 404);
    }
    return user;
  }
}

export default new AuthService();
