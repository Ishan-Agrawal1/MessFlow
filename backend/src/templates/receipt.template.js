/**
 * Receipt email HTML template.
 *
 * @param {Object} data
 * @param {string} data.studentName
 * @param {string} data.studentId
 * @param {string} data.monthName
 * @param {number} data.year
 * @param {number} data.amount
 * @param {string} data.receiptNumber
 * @param {string} data.paidAt
 * @param {string} data.razorpayPaymentId
 * @returns {string} HTML string
 */
export const receiptTemplate = ({
  studentName,
  studentId,
  monthName,
  year,
  amount,
  receiptNumber,
  paidAt,
  razorpayPaymentId,
}) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Payment Receipt</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f6f9; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f4f6f9; padding: 40px 0;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 24px rgba(0,0,0,0.08); overflow: hidden;">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #2e7d32, #1b5e20); padding: 32px 40px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0 0 4px; font-size: 22px; font-weight: 600;">
                📄 Payment Receipt
              </h1>
              <p style="color: rgba(255,255,255,0.85); margin: 0; font-size: 13px; letter-spacing: 0.5px;">
                ${monthName} ${year} — Mess Fee
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding: 40px;">
              <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 0 0 20px;">
                Dear <strong>${studentName}</strong>,
              </p>
              <p style="color: #555555; font-size: 15px; line-height: 1.8; margin: 0 0 28px;">
                This email serves as your official receipt for the mess fee payment completed for
                <strong>${monthName} ${year}</strong>. The details of the transaction are outlined below for your records.
              </p>

              <!-- Receipt Card -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f1f8e9; border-radius: 8px; border: 1px solid #c8e6c9; margin-bottom: 28px;">
                <tr>
                  <td style="padding: 28px;">
                    <h3 style="color: #2e7d32; margin: 0 0 20px; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">
                      Transaction Details
                    </h3>
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                      <tr>
                        <td style="padding: 10px 0; color: #666666; font-size: 14px; border-bottom: 1px solid #c8e6c9; width: 45%;">Receipt Number</td>
                        <td style="padding: 10px 0; color: #333333; font-size: 14px; text-align: right; font-weight: 700; border-bottom: 1px solid #c8e6c9;">${receiptNumber}</td>
                      </tr>
                      <tr>
                        <td style="padding: 10px 0; color: #666666; font-size: 14px; border-bottom: 1px solid #c8e6c9;">Student Name</td>
                        <td style="padding: 10px 0; color: #333333; font-size: 14px; text-align: right; font-weight: 600; border-bottom: 1px solid #c8e6c9;">${studentName}</td>
                      </tr>
                      <tr>
                        <td style="padding: 10px 0; color: #666666; font-size: 14px; border-bottom: 1px solid #c8e6c9;">Student ID</td>
                        <td style="padding: 10px 0; color: #333333; font-size: 14px; text-align: right; font-weight: 600; border-bottom: 1px solid #c8e6c9;">${studentId}</td>
                      </tr>
                      <tr>
                        <td style="padding: 10px 0; color: #666666; font-size: 14px; border-bottom: 1px solid #c8e6c9;">Fee Period</td>
                        <td style="padding: 10px 0; color: #333333; font-size: 14px; text-align: right; font-weight: 600; border-bottom: 1px solid #c8e6c9;">${monthName} ${year}</td>
                      </tr>
                      <tr>
                        <td style="padding: 10px 0; color: #666666; font-size: 14px; border-bottom: 1px solid #c8e6c9;">Amount Paid</td>
                        <td style="padding: 10px 0; color: #2e7d32; font-size: 18px; text-align: right; font-weight: 700; border-bottom: 1px solid #c8e6c9;">₹${amount.toLocaleString('en-IN')}</td>
                      </tr>
                      <tr>
                        <td style="padding: 10px 0; color: #666666; font-size: 14px; border-bottom: 1px solid #c8e6c9;">Payment Date</td>
                        <td style="padding: 10px 0; color: #333333; font-size: 14px; text-align: right; font-weight: 600; border-bottom: 1px solid #c8e6c9;">${paidAt}</td>
                      </tr>
                      <tr>
                        <td style="padding: 10px 0; color: #666666; font-size: 14px;">Transaction ID</td>
                        <td style="padding: 10px 0; color: #333333; font-size: 13px; text-align: right; font-weight: 600; word-break: break-all;">${razorpayPaymentId}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Status Badge -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom: 24px;">
                <tr>
                  <td align="center">
                    <span style="display: inline-block; background-color: #e8f5e9; color: #2e7d32; padding: 8px 24px; border-radius: 20px; font-size: 13px; font-weight: 600; letter-spacing: 0.5px;">
                      ✅ PAYMENT VERIFIED &amp; CONFIRMED
                    </span>
                  </td>
                </tr>
              </table>

              <p style="color: #555555; font-size: 14px; line-height: 1.6; margin: 0;">
                Kindly retain this email for your records. If you have any queries regarding this transaction,
                please contact the mess administration with your receipt number.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f8f9fa; padding: 24px 40px; text-align: center; border-top: 1px solid #e8eaed;">
              <p style="color: #999999; font-size: 12px; line-height: 1.6; margin: 0;">
                This is a system-generated receipt from the Mess Management System.<br />
                No signature is required. Please do not reply to this email.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
};
