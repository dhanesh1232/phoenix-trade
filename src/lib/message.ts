export const product_whatsapp_message = (
  name: string,
  category: string,
  country: string,
  quantity?: string,
  message?: string,
  email?: string,
  phone?: string
): string => {
  const baseMessage = `Hello,

I'm interested in your export product:

*Product*: ${name}
*Category*: ${category}
*Destination*: ${country}`;

  const quantityLine = quantity ? `\n *Quantity*: ${quantity}` : "";
  const messageLine = message ? `\n *Requirements*:\n${message}` : "";
  const contactLines =
    email || phone
      ? `\n\n📞 *Contact*:\n${email ? `Email: ${email}` : ""}${
          phone ? `\nPhone: ${phone}` : ""
        }`
      : "";

  const finalMessage = `${baseMessage}${quantityLine}${messageLine}${contactLines}

Please share specifications, pricing, and delivery details.

Thank you! 🙏`;

  // Replace spaces and newlines for WhatsApp URL
  const encodedMessage = encodeURIComponent(finalMessage);

  return `https://wa.me/917382675969?text=${encodedMessage}`;
};
