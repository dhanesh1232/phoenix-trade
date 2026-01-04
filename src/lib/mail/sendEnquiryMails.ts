// lib/sendEnquiryMails.ts
import { transporter } from "./mailer";
import {
  getInternalEnquiryTemplate,
  getCustomerEnquiryTemplate,
} from "./emailTemplates";

type EnquiryPayload = {
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
};

export async function sendEnquiryMails(data: EnquiryPayload) {
  const internal = getInternalEnquiryTemplate(data);
  const customer = getCustomerEnquiryTemplate({
    name: data.name,
    product_or_category: data.product_or_category,
    toEmail: data.email,
  });

  // 1) Send to internal team
  await transporter.sendMail({
    from: `"Phoenix Trade Exports" <${process.env.FROM_EMAIL}>`,
    to: internal.to, // e.g., sales@phoenixexports.com
    subject: internal.subject,
    html: internal.html,
  });

  // 2) Send confirmation to customer
  await transporter.sendMail({
    from: `"Phoenix Trade Exports" <${process.env.FROM_EMAIL}>`,
    to: customer.to,
    subject: customer.subject,
    html: customer.html,
  });
}
