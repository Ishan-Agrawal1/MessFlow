import transporter from '../lib/mailer.js';
import config from '../config/index.js';
import { paymentSuccessTemplate } from '../templates/paymentSuccess.template.js';
import { receiptTemplate } from '../templates/receipt.template.js';
import { dueCreatedTemplate } from '../templates/dueCreated.template.js';

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

  /**
   * Send due-created notification email to a single student.
   */
  async sendDueCreatedEmail({ to, studentName, monthName, year, amount, dueDate }) {
    const portalUrl = `${config.clientUrl}/login`;

    const html = dueCreatedTemplate({
      studentName,
      monthName,
      year,
      amount,
      dueDate,
      portalUrl,
    });

    await transporter.sendMail({
      from: config.smtp.from,
      to,
      subject: `Mess Fee Due — ${monthName} ${year} | Payment Pending`,
      html,
    });
  }

  /**
   * Send due-created notification emails to multiple students in parallel.
   * Uses Promise.allSettled so one failure does not block the rest.
   *
   * @param {Array<{email: string, name: string}>} students
   * @param {Object} cycleInfo - { monthName, year, amount, dueDate }
   * @returns {Promise<{sent: number, failed: number}>}
   */
  async sendBulkDueCreatedEmails(students, cycleInfo) {
    const results = await Promise.allSettled(
      students.map((student) =>
        this.sendDueCreatedEmail({
          to: student.email,
          studentName: student.name,
          monthName: cycleInfo.monthName,
          year: cycleInfo.year,
          amount: cycleInfo.amount,
          dueDate: cycleInfo.dueDate,
        })
      )
    );

    let sent = 0;
    let failed = 0;
    results.forEach((result, idx) => {
      if (result.status === 'fulfilled') {
        sent++;
      } else {
        failed++;
        console.warn(`⚠️ Failed to send due notification to ${students[idx].email}:`, result.reason?.message);
      }
    });

    console.log(`📧 Due notification emails: ${sent} sent, ${failed} failed out of ${students.length}`);
    return { sent, failed };
  }
}

export default new EmailService();

