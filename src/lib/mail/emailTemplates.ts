// lib/mail/emailTemplates.ts

export function getInternalEnquiryTemplate(data: {
  name: string;
  email: string;
  country: string;
  product: string;
  quantity: string;
  packaging: string;
  timeline: string;
  message: string;
  product_or_category: string;
  toEmail: string[];
  phone: string;
}) {
  const subject = `New Export Enquiry Received – ${data.product_or_category}`;

  const html = `
  <!DOCTYPE html>
  <html>
    <body style="margin:0;padding:0;background-color:#ecfdf5;font-family:Arial,Helvetica,sans-serif;color:#022c22;">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#ecfdf5;padding:24px 0;">
        <tr>
          <td align="center">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px;background-color:#ffffff;border-radius:12px;border:1px solid rgba(0,0,0,0.08);overflow:hidden;">
              <!-- Header -->
              <tr>
                <td style="padding:20px 24px;background:linear-gradient(135deg,#064e3b,#047857);color:#ffffff;">
                  <h1 style="margin:0;font-size:20px;font-weight:600;">Phoenix Trade Exports</h1>
                  <p style="margin:4px 0 0 0;font-size:13px;opacity:0.9;">New Export Enquiry Received</p>
                </td>
              </tr>

              <!-- Intro -->
              <tr>
                <td style="padding:20px 24px 8px 24px;">
                  <p style="margin:0 0 8px 0;font-size:14px;color:#064e3b;font-weight:600;">Hello Team,</p>
                  <p style="margin:0 0 16px 0;font-size:13px;color:#022c22;">
                    A new export enquiry has been submitted through the website.
                  </p>
                </td>
              </tr>

              <!-- Enquiry details card -->
              <tr>
                <td style="padding:0 24px 20px 24px;">
                  <table width="100%" role="presentation" cellspacing="0" cellpadding="0" style="border-radius:10px;border:1px solid rgba(0,0,0,0.06);background-color:#ecfdf5;">
                    <tr>
                      <td style="padding:14px 16px;border-bottom:1px solid rgba(0,0,0,0.06);">
                        <span style="font-size:13px;color:#064e3b;font-weight:600;">📌 Enquiry Details</span>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding:12px 16px 8px 16px;font-size:13px;color:#022c22;">
                        <p style="margin:0 0 6px 0;"><strong>Name:</strong> ${data.name}</p>
                        <p style="margin:0 0 6px 0;"><strong>Email:</strong> ${data.email}</p>
                        <p style="margin:0 0 6px 0;"><strong>Phone:</strong> ${data.phone}</p>
                        <p style="margin:0 0 6px 0;"><strong>Country:</strong> ${data.country}</p>
                        <p style="margin:0 0 6px 0;"><strong>Product / Category:</strong> ${data.product}</p>
                        <p style="margin:0 0 6px 0;"><strong>Quantity:</strong> ${data.quantity}</p>
                        <p style="margin:0 0 6px 0;"><strong>Packaging Requirement:</strong> ${data.packaging}</p>
                        <p style="margin:0 0 0 0;"><strong>Delivery Timeline:</strong> ${data.timeline}</p>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding:10px 16px 14px 16px;border-top:1px solid rgba(0,0,0,0.06);font-size:13px;color:#022c22;">
                        <p style="margin:0 0 4px 0;"><strong>Message:</strong></p>
                        <p style="margin:0;white-space:pre-line;">${data.message}</p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <!-- Next steps -->
              <tr>
                <td style="padding:0 24px 16px 24px;">
                  <table width="100%" role="presentation" cellspacing="0" cellpadding="0" style="border-radius:10px;border:1px solid rgba(0,0,0,0.06);background-color:#ffffff;">
                    <tr>
                      <td style="padding:12px 16px 8px 16px;font-size:13px;color:#064e3b;font-weight:600;">
                        Next Steps
                      </td>
                    </tr>
                    <tr>
                      <td style="padding:0 16px 12px 32px;font-size:13px;color:#022c22;">
                        <ul style="margin:0;padding-left:16px;">
                          <li>Review the requirement</li>
                          <li>Respond via WhatsApp or email within 24 hours</li>
                          <li>Update status in the admin panel if required</li>
                        </ul>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <!-- Footer note -->
              <tr>
                <td style="padding:0 24px 20px 24px;font-size:12px;color:#047857;">
                  <p style="margin:0 0 8px 0;">
                    This enquiry has also been sent to WhatsApp for quick follow-up.
                  </p>
                  <p style="margin:0;color:#6b7280;font-size:11px;">
                    — Website Enquiry System · Phoenix Trade Exports
                  </p>
                </td>
              </tr>

            </table>
          </td>
        </tr>
      </table>
    </body>
  </html>
  `;

  return { subject, html, to: data.toEmail };
}

export function getCustomerEnquiryTemplate(data: {
  name: string;
  product_or_category: string;
  toEmail: string;
}) {
  const subject = `We’ve received your enquiry – Phoenix Trade Exports`;

  const html = `
  <!DOCTYPE html>
  <html>
    <body style="margin:0;padding:0;background-color:#ecfdf5;font-family:Arial,Helvetica,sans-serif;color:#022c22;">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#ecfdf5;padding:24px 0;">
        <tr>
          <td align="center">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px;background-color:#ffffff;border-radius:12px;border:1px solid rgba(0,0,0,0.08);overflow:hidden;">
              <!-- Header -->
              <tr>
                <td style="padding:20px 24px;background:linear-gradient(135deg,#064e3b,#047857);color:#ffffff;">
                  <h1 style="margin:0;font-size:20px;font-weight:600;">Phoenix Trade Exports</h1>
                  <p style="margin:4px 0 0 0;font-size:13px;opacity:0.9;">Enquiry Confirmation</p>
                </td>
              </tr>

              <!-- Greeting -->
              <tr>
                <td style="padding:20px 24px 8px 24px;">
                  <p style="margin:0 0 8px 0;font-size:14px;color:#064e3b;font-weight:600;">
                    Hello ${data.name},
                  </p>
                  <p style="margin:0 0 12px 0;font-size:13px;color:#022c22;">
                    Thank you for contacting Phoenix Trade Exports.
                  </p>
                  <p style="margin:0 0 16px 0;font-size:13px;color:#022c22;">
                    We have successfully received your enquiry regarding:
                  </p>
                  <p style="margin:0 0 16px 0;font-size:14px;color:#022c22;">
                    👉 <strong>${data.product_or_category}</strong>
                  </p>
                </td>
              </tr>

              <!-- Info block -->
              <tr>
                <td style="padding:0 24px 16px 24px;">
                  <table width="100%" role="presentation" cellspacing="0" cellpadding="0" style="border-radius:10px;border:1px solid rgba(0,0,0,0.06);background-color:#ecfdf5;">
                    <tr>
                      <td style="padding:12px 16px;font-size:13px;color:#022c22;">
                        <p style="margin:0 0 10px 0;">
                          Our export team is reviewing your requirements and will get back to you shortly
                          with pricing, specifications, and next steps.
                        </p>
                        <p style="margin:0;">
                          If you have any additional details to share, feel free to reply to this email.
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="padding:0 24px 16px 24px;font-size:12px;color:#022c22;">
                  <p style="margin:0 0 8px 0;">
                    We appreciate your interest and look forward to doing business with you.
                  </p>
                  <p style="margin:0 0 8px 0;font-size:12px;color:#047857;">
                    <em>This is an automated confirmation email. Our team will contact you personally.</em>
                  </p>
                  <p style="margin:0 0 4px 0;">
                    Warm regards,<br/>
                    Phoenix Trade Exports<br/>
                    India
                  </p>
                  <p style="margin:8px 0 0 0;font-size:11px;color:#6b7280;">
                    🌐 Global Exporter of Agricultural, Marine &amp; Value-Added Products
                  </p>
                </td>
              </tr>

            </table>
          </td>
        </tr>
      </table>
    </body>
  </html>
  `;

  return { subject, html, to: data.toEmail };
}
