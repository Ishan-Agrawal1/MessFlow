import authService from '../services/auth.service.js';
import ApiResponse from '../utils/apiResponse.js';
import asyncHandler from '../utils/asyncHandler.js';
import { setTokenCookies, clearTokenCookies } from '../utils/cookieUtils.js';
import { COOKIE_NAMES } from '../constants/index.js';

/**
 * Auth Controller — thin layer delegating to AuthService.
 */

/**
 * POST /api/auth/login
 */
export const login = asyncHandler(async (req, res) => {
  const { identifier, password } = req.body;

  const { user, accessToken, refreshToken } = await authService.login(identifier, password);

  // Set HTTP-only cookies
  setTokenCookies(res, accessToken, refreshToken);

  new ApiResponse(200, {
    user,
    accessToken,
  }, 'Login successful').send(res);
});

/**
 * POST /api/auth/logout
 */
export const logout = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies?.[COOKIE_NAMES.REFRESH_TOKEN];

  await authService.logout(refreshToken);

  // Clear cookies
  clearTokenCookies(res);

  new ApiResponse(200, null, 'Logged out successfully').send(res);
});

/**
 * POST /api/auth/refresh
 */
export const refresh = asyncHandler(async (req, res) => {
  const oldRefreshToken = req.cookies?.[COOKIE_NAMES.REFRESH_TOKEN] || req.body.refreshToken;

  const { accessToken, refreshToken } = await authService.refreshToken(oldRefreshToken);

  // Set new cookies
  setTokenCookies(res, accessToken, refreshToken);

  new ApiResponse(200, { accessToken }, 'Token refreshed successfully').send(res);
});

/**
 * GET /api/auth/me
 */
export const getMe = asyncHandler(async (req, res) => {
  const user = await authService.getMe(req.user._id);

  new ApiResponse(200, { user }, 'User profile retrieved').send(res);
});
