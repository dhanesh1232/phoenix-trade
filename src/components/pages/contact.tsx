export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white text-black">
      {/* Page Header */}
      <section className="py-28 bg-gray-50">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-semibold font-['Playfair_Display']">
            Contact Phoenix International Trading
          </h1>
          <p className="mt-4 text-base md:text-lg text-gray-700">
            Trusted Produce for Every Market
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-28">
        <div className="mx-auto max-w-7xl px-4 grid gap-20 md:grid-cols-2">
          {/* Contact Details */}
          <div>
            <h2 className="mb-6 text-2xl font-semibold font-['Playfair_Display']">
              Get in Touch
            </h2>

            <p className="mb-8 text-base leading-relaxed text-gray-700">
              For product enquiries, export requirements, or partnership
              discussions, please reach out using the details below or submit
              the enquiry form. Our team will respond promptly.
            </p>

            <div className="space-y-4 text-base text-gray-700">
              <p>
                <strong>Location:</strong> Kakinada, Andhra Pradesh, India
              </p>
              <p>
                <strong>Email:</strong> info@phoenixinternationaltrading.com
              </p>
              <p>
                <strong>WhatsApp:</strong> +91 XXXXX XXXXX
              </p>
            </div>

            <div className="mt-10 border-l-2 border-emerald-500 pl-6">
              <p className="text-sm text-gray-700">
                Business Hours: <br />
                Monday – Saturday, 9:00 AM – 7:00 PM (IST)
              </p>
            </div>
          </div>

          {/* Enquiry Form */}
          <div>
            <h2 className="mb-6 text-2xl font-semibold font-['Playfair_Display']">
              Send Us an Enquiry
            </h2>

            <form className="space-y-6">
              <input
                type="text"
                placeholder="Full Name"
                className="w-full border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-emerald-500"
              />

              <input
                type="email"
                placeholder="Email Address"
                className="w-full border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-emerald-500"
              />

              <input
                type="text"
                placeholder="Product Interested In"
                className="w-full border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-emerald-500"
              />

              <input
                type="text"
                placeholder="Quantity Required"
                className="w-full border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-emerald-500"
              />

              <input
                type="text"
                placeholder="Target Country"
                className="w-full border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-emerald-500"
              />

              <input
                type="text"
                placeholder="Packaging Requirements"
                className="w-full border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-emerald-500"
              />

              <input
                type="text"
                placeholder="Expected Delivery Timeline"
                className="w-full border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-emerald-500"
              />

              <textarea
                placeholder="Additional Details (Optional)"
                rows={4}
                className="w-full border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-emerald-500"
              />

              <button
                type="submit"
                className="bg-emerald-500 px-10 py-4 text-sm font-medium text-black transition hover:bg-emerald-400"
              >
                Submit Enquiry
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
