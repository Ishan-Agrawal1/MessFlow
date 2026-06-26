/**
 * Payment success email HTML template.
 *
 * @param {Object} data
 * @param {string} data.studentName
 * @param {string} data.monthName
 * @param {number} data.year
 * @param {number} data.amount
 * @param {string} data.receiptNumber
 * @param {string} data.paidAt
 * @returns {string} HTML string
 */
export const paymentSuccessTemplate = ({
  studentName,
  monthName,
  year,
  amount,
  receiptNumber,
  paidAt,
}) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Payment Confirmation - Madhav Namkeen</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f6f9; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f4f6f9; padding: 40px 0;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 24px rgba(0,0,0,0.08); overflow: hidden;">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #1a73e8, #0d47a1); padding: 32px 40px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 600; letter-spacing: 0.5px;">
                ✅ Payment Successful
              </h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding: 40px;">
              <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 0 0 20px;">
                Dear <strong>${studentName}</strong>,
              </p>
              <p style="color: #555555; font-size: 15px; line-height: 1.8; margin: 0 0 24px;">
                We are pleased to confirm that your mess fee payment for the month of
                <strong>${monthName} ${year}</strong> has been successfully processed. Thank you for your timely payment.
              </p>

              <!-- Payment Details Card -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f8f9fa; border-radius: 8px; border: 1px solid #e8eaed; margin-bottom: 24px;">
                <tr>
                  <td style="padding: 24px;">
                    <h3 style="color: #1a73e8; margin: 0 0 16px; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">
                      Payment Details
                    </h3>
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                      <tr>
                        <td style="padding: 8px 0; color: #666666; font-size: 14px; border-bottom: 1px solid #e8eaed;">Month</td>
                        <td style="padding: 8px 0; color: #333333; font-size: 14px; text-align: right; font-weight: 600; border-bottom: 1px solid #e8eaed;">${monthName} ${year}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; color: #666666; font-size: 14px; border-bottom: 1px solid #e8eaed;">Amount Paid</td>
                        <td style="padding: 8px 0; color: #333333; font-size: 14px; text-align: right; font-weight: 600; border-bottom: 1px solid #e8eaed;">₹${amount.toLocaleString('en-IN')}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; color: #666666; font-size: 14px; border-bottom: 1px solid #e8eaed;">Receipt No.</td>
                        <td style="padding: 8px 0; color: #333333; font-size: 14px; text-align: right; font-weight: 600; border-bottom: 1px solid #e8eaed;">${receiptNumber}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; color: #666666; font-size: 14px;">Date &amp; Time</td>
                        <td style="padding: 8px 0; color: #333333; font-size: 14px; text-align: right; font-weight: 600;">${paidAt}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <p style="color: #555555; font-size: 14px; line-height: 1.6; margin: 0 0 8px;">
                Please retain this email as a record of your payment. Should you have any questions or require further assistance, please feel free to contact the Madhav Namkeen Mess Services team.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f8f9fa; padding: 24px 40px; text-align: center; border-top: 1px solid #e8eaed;">
              <p style="color: #999999; font-size: 12px; line-height: 1.6; margin: 0;">
                Madhav Namkeen Mess Services<br />
                For support, please contact us at madhavnamkeen.business@gmail.com<br />
                This is an automated message, please do not reply to this email.
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
