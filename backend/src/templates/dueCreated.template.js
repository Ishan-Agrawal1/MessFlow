/**
 * Due Created Notification — email HTML template.
 *
 * Sent to students when the admin generates new dues for their batch.
 *
 * @param {Object} data
 * @param {string} data.studentName
 * @param {string} data.monthName
 * @param {number} data.year
 * @param {number} data.amount
 * @param {string} data.dueDate - Formatted due date string
 * @param {string} data.portalUrl - Link to the mess portal
 * @returns {string} HTML string
 */
export const dueCreatedTemplate = ({
  studentName,
  monthName,
  year,
  amount,
  dueDate,
  portalUrl,
}) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Mess Fee Due Notification - Madhav Namkeen</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f6f9; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f4f6f9; padding: 40px 0;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 24px rgba(0,0,0,0.08); overflow: hidden;">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #f59e0b, #d97706); padding: 32px 40px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 600; letter-spacing: 0.5px;">
                📋 New Mess Fee Due
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
                This is to inform you that the mess fee for the month of
                <strong>${monthName} ${year}</strong> has been generated. Kindly ensure that the
                payment is completed before the due date to avoid any inconvenience.
              </p>

              <!-- Due Details Card -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #fffbeb; border-radius: 8px; border: 1px solid #fde68a; margin-bottom: 24px;">
                <tr>
                  <td style="padding: 24px;">
                    <h3 style="color: #d97706; margin: 0 0 16px; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">
                      Payment Details
                    </h3>
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                      <tr>
                        <td style="padding: 8px 0; color: #666666; font-size: 14px; border-bottom: 1px solid #fde68a;">Month</td>
                        <td style="padding: 8px 0; color: #333333; font-size: 14px; text-align: right; font-weight: 600; border-bottom: 1px solid #fde68a;">${monthName} ${year}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; color: #666666; font-size: 14px; border-bottom: 1px solid #fde68a;">Amount Due</td>
                        <td style="padding: 8px 0; color: #333333; font-size: 14px; text-align: right; font-weight: 600; border-bottom: 1px solid #fde68a;">₹${amount.toLocaleString('en-IN')}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; color: #666666; font-size: 14px;">Due Date</td>
                        <td style="padding: 8px 0; color: #b91c1c; font-size: 14px; text-align: right; font-weight: 700;">${dueDate}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <p style="color: #555555; font-size: 15px; line-height: 1.8; margin: 0 0 24px;">
                You can complete your payment online by visiting the Mess Portal. Click the button
                below to log in and pay securely via Razorpay.
              </p>

              <!-- CTA Button -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom: 24px;">
                <tr>
                  <td align="center">
                    <a href="${portalUrl}" target="_blank" style="display: inline-block; padding: 14px 36px; background: linear-gradient(135deg, #2563eb, #1d4ed8); color: #ffffff; text-decoration: none; border-radius: 8px; font-size: 16px; font-weight: 600; letter-spacing: 0.5px; box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);">
                      Pay Now on Mess Portal →
                    </a>
                  </td>
                </tr>
              </table>

              <p style="color: #999999; font-size: 13px; line-height: 1.6; margin: 0 0 8px;">
                If the button above does not work, copy and paste the following link into your browser:
              </p>
              <p style="color: #2563eb; font-size: 13px; word-break: break-all; margin: 0 0 24px;">
                <a href="${portalUrl}" style="color: #2563eb;">${portalUrl}</a>
              </p>

              <p style="color: #555555; font-size: 14px; line-height: 1.6; margin: 0;">
                Should you have any questions or require assistance, please do not hesitate to
                contact the Madhav Namkeen Mess Services team.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f8f9fa; padding: 24px 40px; text-align: center; border-top: 1px solid #e8eaed;">
              <p style="color: #999999; font-size: 12px; line-height: 1.6; margin: 0;">
                Madhav Namkeen Mess Services<br />
                For support, please contact us at madhavnamkeen.business@gmail.com<br />
                This is an automated notification, please do not reply to this email.
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
