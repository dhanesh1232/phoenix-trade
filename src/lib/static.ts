export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about-us", label: "About Us" },
  {
    href: "/products",
    label: "Products",
    subPages: true,
  },
  { href: "/why-choose-us", label: "Why Choose Us" },
  { href: "/contact", label: "Contact" },
];

export const adminLinks = [
  {
    title: "Dashboard",
    url: "/",
    icon: "dashboard",
  },
  {
    title: "Category",
    url: "/categories",
    icon: "collection",
  },
  {
    title: "Products",
    url: "/products",
    icon: "package",
  },
  {
    title: "Enquiries",
    url: "/enquiries",
    icon: "message",
  },
  // {
  //   title: "Content",
  //   url: "/content",
  //   icon: "template", // For manage about-us, why-choose, global-supply pages
  // },
  {
    title: "Profile",
    url: "/profile",
    icon: "user",
  },
];

export const brand = {
  emeraldDark: "#064E3B", // primary (emerald-900)
  emerald: "#047857", // hover / accent (emerald-700)
  emeraldSoft: "#D1FAE5", // subtle backgrounds
  goldAccent: "#C9A24D", // premium highlight
};
