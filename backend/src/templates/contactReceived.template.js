/**
 * Contact form received email HTML template.
 * Sent to the admin when someone submits the contact form.
 *
 * @param {Object} data
 * @param {string} data.name - Sender's name
 * @param {string} data.email - Sender's email
 * @param {string} data.subject - Message subject
 * @param {string} data.message - Message body
 * @returns {string} HTML string
 */
export const contactReceivedTemplate = ({
  name,
  email,
  subject,
  message,
}) => {
  const submittedAt = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>New Contact Form Submission</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f6f9; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f4f6f9; padding: 40px 0;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 24px rgba(0,0,0,0.08); overflow: hidden;">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #6366f1, #4338ca); padding: 32px 40px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 600; letter-spacing: 0.5px;">
                📩 New Contact Form Message
              </h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding: 40px;">
              <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 0 0 20px;">
                You have received a new message from the MessFlow contact form.
              </p>

              <!-- Sender Details Card -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f8f9fa; border-radius: 8px; border: 1px solid #e8eaed; margin-bottom: 24px;">
                <tr>
                  <td style="padding: 24px;">
                    <h3 style="color: #6366f1; margin: 0 0 16px; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">
                      Sender Details
                    </h3>
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                      <tr>
                        <td style="padding: 8px 0; color: #666666; font-size: 14px; border-bottom: 1px solid #e8eaed; width: 100px;">Name</td>
                        <td style="padding: 8px 0; color: #333333; font-size: 14px; font-weight: 600; border-bottom: 1px solid #e8eaed;">${name}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; color: #666666; font-size: 14px; border-bottom: 1px solid #e8eaed;">Email</td>
                        <td style="padding: 8px 0; color: #333333; font-size: 14px; font-weight: 600; border-bottom: 1px solid #e8eaed;">
                          <a href="mailto:${email}" style="color: #6366f1; text-decoration: none;">${email}</a>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; color: #666666; font-size: 14px; border-bottom: 1px solid #e8eaed;">Subject</td>
                        <td style="padding: 8px 0; color: #333333; font-size: 14px; font-weight: 600; border-bottom: 1px solid #e8eaed;">${subject}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; color: #666666; font-size: 14px;">Received</td>
                        <td style="padding: 8px 0; color: #333333; font-size: 14px; font-weight: 600;">${submittedAt}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Message Card -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #fefefe; border-radius: 8px; border: 1px solid #e8eaed; margin-bottom: 24px;">
                <tr>
                  <td style="padding: 24px;">
                    <h3 style="color: #6366f1; margin: 0 0 12px; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">
                      Message
                    </h3>
                    <p style="color: #333333; font-size: 15px; line-height: 1.8; margin: 0; white-space: pre-wrap;">${message}</p>
                  </td>
                </tr>
              </table>

              <p style="color: #999999; font-size: 13px; line-height: 1.6; margin: 0;">
                You can reply directly to this email to respond to <strong>${name}</strong>.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f8f9fa; padding: 24px 40px; text-align: center; border-top: 1px solid #e8eaed;">
              <p style="color: #999999; font-size: 12px; line-height: 1.6; margin: 0;">
                Madhav Namkeen Mess Services — MessFlow<br />
                This is an automated notification from your website contact form.
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
