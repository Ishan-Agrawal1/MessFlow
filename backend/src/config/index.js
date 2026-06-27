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

  smtp: {
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT, 10) || 587,
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
    from: process.env.EMAIL_FROM,
  },

  google: {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
  },

  cookieDomain: process.env.COOKIE_DOMAIN || 'localhost',

  clientUrl: process.env.CLIENT_URL || process.env.CORS_ORIGIN || 'http://localhost:5173',
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
const hasOAuth2 = !!(config.google.clientId && config.google.clientSecret && config.google.refreshToken);
const hasSmtpPass = !!(config.smtp.host && config.smtp.user && config.smtp.pass);

if (!hasOAuth2 && !hasSmtpPass) {
  console.warn('⚠️  Neither Google OAuth2 nor SMTP credentials are configured — email delivery will be disabled');
} else if (hasOAuth2) {
  console.log('📧 Email mode: Gmail OAuth2');
} else {
  console.log('📧 Email mode: SMTP (password)');
}

if (!config.smtp.user) {
  console.warn('⚠️  Missing SMTP_USER — needed as the sender email address');
}
if (!config.smtp.from) {
  console.warn('⚠️  Missing EMAIL_FROM — will fall back to SMTP_USER as sender');
}

export default config;
