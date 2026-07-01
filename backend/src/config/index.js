import dotenv from 'dotenv';
dotenv.config();

const config = {
  env: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT, 10) || 3000,
  corsOrigin: process.env.CORS_ORIGIN || '*',

  mongodbUri: process.env.MONGODB_URI,

  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
  accessTokenExpiry: process.env.ACCESS_TOKEN_EXPIRY || '15m',
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
  refreshTokenExpiry: process.env.REFRESH_TOKEN_EXPIRY || '30d',

  admin: {
    email: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD,
    name: process.env.ADMIN_NAME || 'Admin',
  },

  razorpay: {
    keyId: process.env.RAZORPAY_KEY_ID,
    keySecret: process.env.RAZORPAY_KEY_SECRET,
  },

  resend: {
    apiKey: process.env.RESEND_API_KEY,
    fromEmail: process.env.EMAIL_FROM || 'Madhav Namkeen Mess Services <onboarding@resend.dev>',
  },

  cookieDomain: process.env.COOKIE_DOMAIN || 'localhost',

  clientUrl: process.env.CLIENT_URL || process.env.CORS_ORIGIN || 'https://www.madhavnamkeen.in',
};

/**
 * Validate that all required environment variables are set.
 * Throws on missing vars so the server fails fast at boot.
 */
const requiredVars = [
  'mongodbUri',
  'accessTokenSecret',
  'refreshTokenSecret',
];

for (const key of requiredVars) {
  if (!config[key]) {
    throw new Error(`Missing required environment variable for config.${key}`);
  }
}

// Warn (don't crash) if email is not fully configured
if (!config.resend.apiKey) {
  console.warn('⚠️  RESEND_API_KEY is not configured — email delivery will be disabled');
} else {
  console.log('📧 Email mode: Resend API');
}

if (!config.resend.fromEmail) {
  console.warn('⚠️  Missing EMAIL_FROM — will fall back to Resend default sender');
}

export default config;
