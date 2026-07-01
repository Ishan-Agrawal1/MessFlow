import { Resend } from 'resend';
import config from '../config/index.js';

/**
 * Resend email client.
 *
 * Replaces the previous Nodemailer + Gmail OAuth2 / SMTP setup.
 * Resend only requires an API key — no OAuth tokens, no SMTP ports.
 *
 * Falls back to a no-op stub if RESEND_API_KEY is not configured.
 */

let resend = null;

if (config.resend.apiKey) {
  try {
    resend = new Resend(config.resend.apiKey);
    console.log('✅ Resend email client initialized');
  } catch (err) {
    console.error('❌ Failed to initialize Resend client:', err.message);
  }
} else {
  console.warn('⚠️  RESEND_API_KEY not set — email delivery will be disabled');
}

export default resend;
