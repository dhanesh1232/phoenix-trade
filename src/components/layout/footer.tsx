import Link from "next/link";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Why Choose Us", href: "/why-choose-us" },
  { label: "Contact", href: "/contact" },
];

const productLinks = [
  {
    href: "/products/fresh-agriculture-produce",
    label: "Fresh Agriculture Produce",
  },
  {
    href: "/products/marine-products",
    label: "Marine Products",
  },
  {
    href: "/products/dried-value-added-products",
    label: "Dried & Value-Added Products",
  },
];

export const Footer = () => {
  return (
    <footer className="bg-black text-gray-300 border-t border-gray-800">
      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-4 py-20 grid gap-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {/* Brand */}
        <div>
          <h3 className="text-lg font-semibold text-white font-['Playfair_Display']">
            Phoenix International Trading
          </h3>

          <div className="pl-4 border-l-[3px] border-emerald-500 mt-4">
            <p className="text-sm leading-relaxed opacity-80">
              Trusted Produce for Every Market. Supplying agricultural, marine,
              and value-added food exports with reliability and global
              standards.
            </p>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="mb-4 text-sm font-medium uppercase tracking-widest text-white">
            Quick Links
          </h4>

          <ul className="space-y-3 text-sm pl-4 border-l-[3px] border-emerald-500">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="hover:text-emerald-400 transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Products */}
        <div>
          <h4 className="mb-4 text-sm font-medium uppercase tracking-widest text-white">
            Products
          </h4>
          <ul className="space-y-3 text-sm pl-4 border-l-[3px] border-emerald-500">
            {productLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="hover:text-emerald-400 transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="mb-4 text-sm font-medium uppercase tracking-widest text-white">
            Contact
          </h4>

          <ul className="space-y-3 text-sm opacity-90 pl-4 border-l-[3px] border-emerald-500">
            <li>Kakinada, Andhra Pradesh, India</li>

            <li>
              <a
                href="mailto:info@phoenixinternationaltrading.com"
                className="hover:text-emerald-400 transition-colors"
              >
                info@phoenixinternationaltrading.com
              </a>
            </li>

            <li>
              <a
                href="https://wa.me/91XXXXXXXXXX"
                target="_blank"
                className="hover:text-emerald-400 transition-colors"
              >
                WhatsApp: +91 XXXXX XXXXX
              </a>
            </li>

            <li className="text-gray-500">
              Mon – Sat: 9:00 AM – 7:00 PM (IST)
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 py-6 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} Phoenix International Trading. All rights
        reserved.
      </div>
    </footer>
  );
};
