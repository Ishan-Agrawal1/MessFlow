import Razorpay from 'razorpay';
import config from '../config/index.js';

/**
 * Razorpay instance configured with API keys from environment.
 * Used for creating orders and verifying payments.
 */
const razorpayInstance = new Razorpay({
  key_id: config.razorpay.keyId,
  key_secret: config.razorpay.keySecret,
});

export default razorpayInstance;
