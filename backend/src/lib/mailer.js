import nodemailer from 'nodemailer';
import config from '../config/index.js';

/**
 * Nodemailer transporter configured with SMTP credentials.
 * Falls back to a no-op transporter if SMTP is not configured.
 */

const isSmtpConfigured = !!(config.smtp.host && config.smtp.user && config.smtp.pass);

let transporter;

if (isSmtpConfigured) {
  transporter = nodemailer.createTransport({
    host: config.smtp.host,
    port: config.smtp.port,
    secure: config.smtp.port === 465,
    auth: {
      user: config.smtp.user,
      pass: config.smtp.pass,
    },
    // Force IPv4 — Render does not support IPv6 outbound connections,
    // causing ENETUNREACH errors when Node.js defaults to IPv6.
    family: 4,
  });

  /**
   * Verify transporter connection on startup (non-blocking).
   */
  transporter.verify()
    .then(() => console.log('✅ Mail server connected'))
    .catch((err) => console.warn('⚠️  Mail server not reachable:', err.message));
} else {
  console.warn('⚠️  SMTP not configured — creating no-op mail transporter (emails will be skipped)');
  transporter = {
    sendMail: async ({ to, subject }) => {
      console.warn(`⚠️  Email skipped (SMTP not configured): to=${to}, subject="${subject}"`);
    },
    verify: () => Promise.resolve(),
  };
}

export default transporter;
