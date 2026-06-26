import config from '../config/index.js';
import { COOKIE_NAMES } from '../constants/index.js';

/**
 * Cookie options for secure HTTP-only cookies.
 */
const getCookieOptions = (maxAge) => ({
  httpOnly: true,
  secure: config.env === 'production',
  sameSite: config.env === 'production' ? 'none' : 'lax',
  maxAge,
  path: '/',
});

/**
 * Set access and refresh token cookies on the response.
 * @param {import('express').Response} res
 * @param {string} accessToken
 * @param {string} refreshToken
 */
export const setTokenCookies = (res, accessToken, refreshToken) => {
  // Access token: 15 minutes
  res.cookie(
    COOKIE_NAMES.ACCESS_TOKEN,
    accessToken,
    getCookieOptions(15 * 60 * 1000)
  );

  // Refresh token: 30 days
  res.cookie(
    COOKIE_NAMES.REFRESH_TOKEN,
    refreshToken,
    getCookieOptions(30 * 24 * 60 * 60 * 1000)
  );
};

/**
 * Clear authentication cookies.
 * @param {import('express').Response} res
 */
export const clearTokenCookies = (res) => {
  const clearOptions = {
    httpOnly: true,
    secure: config.env === 'production',
    sameSite: config.env === 'production' ? 'none' : 'lax',
    path: '/',
  };

  res.clearCookie(COOKIE_NAMES.ACCESS_TOKEN, clearOptions);
  res.clearCookie(COOKIE_NAMES.REFRESH_TOKEN, clearOptions);
};
