import {
  FaMapMarkerAlt,
  FaEnvelope,
  FaWhatsapp,
  FaClock,
} from "react-icons/fa";

export const contact = {
  location: "Kakinada, Andhra Pradesh, India",
  email: "phoenixinttrading@gmail.com",
  phone: "+91 8333987585",
  hours: "Monday – Saturday, 9:00 AM – 7:00 PM (IST)",
} as const;

export const contactDetails = [
  {
    label: "Location",
    value: contact.location,
    icon: FaMapMarkerAlt,
  },
  {
    label: "Email",
    value: contact.email,
    icon: FaEnvelope,
  },
  {
    label: "WhatsApp",
    value: contact.phone,
    icon: FaWhatsapp,
  },
  {
    label: "Business Hours",
    value: contact.hours,
    icon: FaClock,
  },
] as const;

export const message = (
  num: string,
  msg = "Hi, I'm interested in your export services and would like to discuss my requirements."
) =>
  `https://wa.me/${num.trim().replace(" ", "")}?text=${encodeURIComponent(
    msg
  )}`;
