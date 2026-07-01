import emailService from '../services/email.service.js';
import asyncHandler from '../utils/asyncHandler.js';
import ApiResponse from '../utils/apiResponse.js';

/**
 * Contact Controller — handles public contact form submissions.
 */

/**
 * POST /api/contact
 * Send a contact form message to the admin via email.
 */
export const submitContactForm = asyncHandler(async (req, res) => {
  const { name, email, subject, message } = req.body;

  await emailService.sendContactEmail({ name, email, subject, message });

  new ApiResponse(200, null, 'Your message has been sent successfully. We will get back to you soon.').send(res);
});
