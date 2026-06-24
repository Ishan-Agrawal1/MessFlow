import RefreshToken from '../models/RefreshToken.model.js';

/**
 * RefreshToken Repository — encapsulates all DB operations for refresh tokens.
 */
class RefreshTokenRepository {
  /**
   * Create a new refresh token record.
   * @param {Object} tokenData - { user, token, expiresAt }
   * @returns {Promise<Object>}
   */
  async create(tokenData) {
    const refreshToken = new RefreshToken(tokenData);
    return refreshToken.save();
  }

  /**
   * Find a valid (non-revoked, non-expired) refresh token.
   * @param {string} token
   * @returns {Promise<Object|null>}
   */
  async findValidToken(token) {
    return RefreshToken.findOne({
      token,
      revoked: false,
      expiresAt: { $gt: new Date() },
    }).exec();
  }

  /**
   * Revoke a specific refresh token.
   * @param {string} token
   * @returns {Promise<Object|null>}
   */
  async revokeToken(token) {
    return RefreshToken.findOneAndUpdate(
      { token },
      { revoked: true },
      { new: true }
    ).exec();
  }

  /**
   * Revoke all refresh tokens for a user.
   * Used during logout or suspected token compromise.
   * @param {string} userId
   * @returns {Promise<Object>}
   */
  async revokeAllUserTokens(userId) {
    return RefreshToken.updateMany(
      { user: userId, revoked: false },
      { revoked: true }
    ).exec();
  }

  /**
   * Delete expired tokens (cleanup).
   * @returns {Promise<Object>}
   */
  async deleteExpired() {
    return RefreshToken.deleteMany({
      expiresAt: { $lt: new Date() },
    }).exec();
  }
}

export default new RefreshTokenRepository();
