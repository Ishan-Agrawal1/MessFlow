import crypto from 'crypto';

/**
 * Generate a unique receipt number.
 * Format: RCPT-YYYYMMDD-XXXXX (5 random hex chars)
 *
 * @returns {string} Unique receipt number
 */
export const generateReceiptNumber = () => {
  const now = new Date();
  const dateStr = [
    now.getFullYear(),
    String(now.getMonth() + 1).padStart(2, '0'),
    String(now.getDate()).padStart(2, '0'),
  ].join('');

  const randomPart = crypto.randomBytes(4).toString('hex').toUpperCase().slice(0, 5);

  return `RCPT-${dateStr}-${randomPart}`;
};
