import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="bg-black text-gray-200">
      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-4 py-20 grid gap-14 md:grid-cols-4">
        {/* Brand */}
        <div>
          <h3 className="text-lg font-semibold text-white font-['Playfair_Display']">
            Phoenix International Trading
          </h3>
          <p className="mt-4 text-sm leading-relaxed">
            Trusted Produce for Every Market. Supplying agricultural, marine,
            and value-added food products to global markets with consistency and
            care.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="mb-4 text-sm font-medium uppercase tracking-widest text-white">
            Quick Links
          </h4>
          <ul className="space-y-3 text-sm">
            <li>
              <Link href="/" className="hover:text-emerald-400 transition">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-emerald-400 transition">
                About Us
              </Link>
            </li>
            <li>
              <Link
                href="/why-choose-us"
                className="hover:text-emerald-400 transition"
              >
                Why Choose Us
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="hover:text-emerald-400 transition"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Products */}
        <div>
          <h4 className="mb-4 text-sm font-medium uppercase tracking-widest text-white">
            Products
          </h4>
          <ul className="space-y-3 text-sm">
            <li>
              <Link
                href="/products/fresh"
                className="hover:text-emerald-400 transition"
              >
                Fresh Agricultural Produce
              </Link>
            </li>
            <li>
              <Link
                href="/products/marine"
                className="hover:text-emerald-400 transition"
              >
                Marine Products
              </Link>
            </li>
            <li>
              <Link
                href="/products/dried"
                className="hover:text-emerald-400 transition"
              >
                Dried & Value-Added Products
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="mb-4 text-sm font-medium uppercase tracking-widest text-white">
            Contact
          </h4>
          <ul className="space-y-3 text-sm">
            <li>Kakinada, Andhra Pradesh, India</li>
            <li>
              <a
                href="mailto:info@phoenixinternationaltrading.com"
                className="hover:text-emerald-400 transition"
              >
                info@phoenixinternationaltrading.com
              </a>
            </li>
            <li>
              <a
                href="https://wa.me/91XXXXXXXXXX"
                target="_blank"
                className="hover:text-emerald-400 transition"
              >
                WhatsApp: +91 XXXXX XXXXX
              </a>
            </li>
            <li className="text-gray-400">
              Mon – Sat: 9:00 AM – 7:00 PM (IST)
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 py-6 text-center text-xs text-gray-400">
        © {new Date().getFullYear()} Phoenix International Trading. All rights
        reserved.
      </div>
    </footer>
  );
};
