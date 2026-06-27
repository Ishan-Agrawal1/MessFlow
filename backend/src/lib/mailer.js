import nodemailer from 'nodemailer';
import { google } from 'googleapis';
import config from '../config/index.js';

/**
 * Nodemailer transporter — supports two auth modes:
 *   1. Gmail OAuth2  (preferred, works on Render free tier)
 *   2. SMTP password (fallback, needs outbound port 587 unblocked)
 *
 * Falls back to a no-op transporter if neither is configured.
 */

const OAuth2 = google.auth.OAuth2;

const hasOAuth2 = !!(config.google.clientId && config.google.clientSecret && config.google.refreshToken);
const hasSmtpPass = !!(config.smtp.host && config.smtp.user && config.smtp.pass);

/**
 * Create OAuth2-based Gmail transporter.
 */
async function createOAuth2Transporter() {
  const oauth2Client = new OAuth2(
    config.google.clientId,
    config.google.clientSecret,
    'https://developers.google.com/oauthplayground'
  );

  oauth2Client.setCredentials({
    refresh_token: config.google.refreshToken,
  });

  const { token: accessToken } = await oauth2Client.getAccessToken();

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: config.smtp.user,
      clientId: config.google.clientId,
      clientSecret: config.google.clientSecret,
      refreshToken: config.google.refreshToken,
      accessToken,
    },
  });

  return transporter;
}

/**
 * Create SMTP password-based transporter.
 */
function createSmtpTransporter() {
  return nodemailer.createTransport({
    host: config.smtp.host,
    port: config.smtp.port,
    secure: config.smtp.port === 465,
    auth: {
      user: config.smtp.user,
      pass: config.smtp.pass,
    },
    // Force IPv4 — some platforms don't support IPv6 outbound
    family: 4,
  });
}

/**
 * Create a no-op transporter that logs warnings.
 */
function createNoopTransporter() {
  console.warn('⚠️  Email not configured — creating no-op transporter (emails will be skipped)');
  return {
    sendMail: async ({ to, subject }) => {
      console.warn(`⚠️  Email skipped (not configured): to=${to}, subject="${subject}"`);
    },
    verify: () => Promise.resolve(),
  };
}

let transporter;

if (hasOAuth2) {
  try {
    transporter = await createOAuth2Transporter();
    console.log('✅ Gmail OAuth2 mail transporter created');

    // Verify connection (non-blocking)
    transporter.verify()
      .then(() => console.log('✅ Mail server connected (OAuth2)'))
      .catch((err) => console.warn('⚠️  Mail server verify failed:', err.message));
  } catch (err) {
    console.error('❌ Failed to create OAuth2 transporter:', err.message);
    transporter = createNoopTransporter();
  }
} else if (hasSmtpPass) {
  transporter = createSmtpTransporter();

  transporter.verify()
    .then(() => console.log('✅ Mail server connected (SMTP)'))
    .catch((err) => console.warn('⚠️  Mail server not reachable:', err.message));
} else {
  transporter = createNoopTransporter();
}

export default transporter;
