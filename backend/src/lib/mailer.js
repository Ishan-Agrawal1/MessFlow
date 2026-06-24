import nodemailer from 'nodemailer';
import config from '../config/index.js';

/**
 * Nodemailer transporter configured with SMTP credentials.
 */
const transporter = nodemailer.createTransport({
  host: config.smtp.host,
  port: config.smtp.port,
  secure: config.smtp.port === 465,
  auth: {
    user: config.smtp.user,
    pass: config.smtp.pass,
  },
});

/**
 * Verify transporter connection on startup (non-blocking).
 */
transporter.verify()
  .then(() => console.log('✅ Mail server connected'))
  .catch((err) => console.warn('⚠️  Mail server not reachable:', err.message));

export default transporter;
