import transporter from '../lib/mailer.js';
import config from '../config/index.js';
import { paymentSuccessTemplate } from '../templates/paymentSuccess.template.js';
import { receiptTemplate } from '../templates/receipt.template.js';

/**
 * Email Service — handles sending emails via Nodemailer.
 */
class EmailService {
  /**
   * Send payment success email.
   */
  async sendPaymentSuccessEmail({ to, studentName, monthName, year, amount, receiptNumber, paidAt }) {
    const html = paymentSuccessTemplate({
      studentName,
      monthName,
      year,
      amount,
      receiptNumber,
      paidAt,
    });

    await transporter.sendMail({
      from: config.smtp.from,
      to,
      subject: `Payment Confirmed — Mess Fee for ${monthName} ${year}`,
      html,
    });
  }

  /**
   * Send receipt email.
   */
  async sendReceiptEmail({
    to,
    studentName,
    studentId,
    monthName,
    year,
    amount,
    receiptNumber,
    paidAt,
    razorpayPaymentId,
  }) {
    const html = receiptTemplate({
      studentName,
      studentId,
      monthName,
      year,
      amount,
      receiptNumber,
      paidAt,
      razorpayPaymentId,
    });

    await transporter.sendMail({
      from: config.smtp.from,
      to,
      subject: `Payment Receipt — ${monthName} ${year} Mess Fee | ${receiptNumber}`,
      html,
    });
  }
}

export default new EmailService();
