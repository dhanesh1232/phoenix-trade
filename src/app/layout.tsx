import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Main from "@/components/layout/main";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
const SITE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || "https://phoenixexporthub.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Phoenix Export Company | Global Quality Exports & Trade Solutions",
  description:
    "Phoenix Export Company – trusted global exporter of premium products. Reliable trade solutions, worldwide logistics, and unmatched quality assurance. Partner with us for excellence.",
  keywords: [
    "export company, global trade, international exports, Phoenix Export, quality exports, worldwide logistics, trade solutions, export services",
    "agricultural exports",
    "basmati rice export",
    "indian spices wholesale",
    "nuts export india",
    "food exports",
  ],

  authors: [{ name: "Phoenix Exports" }],

  creator: "Phoenix Exports",
  publisher: "Phoenix Exports",

  openGraph: {
    title: "Phoenix Export Company | Global Quality Exports",
    description:
      "Leading global exporter delivering premium products with reliable trade solutions and worldwide logistics.",
    url: SITE_URL,
    siteName: "Phoenix Export Company",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Phoenix Export Company Global Trade",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: {
      default: "Phoenix Exports - Premium Agricultural Products",
      template: "%s | Phoenix Exports",
    },
    description:
      "Leading global exporter delivering premium products with reliable trade solutions and worldwide logistics.",
    images: ["/twitter-image.jpg"],
    creator: "@phoenixexport",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  alternates: {
    canonical: SITE_URL,
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Main>{children}</Main>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-ZWF8VBBPPX"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-ZWF8VBBPPX');
        `}</Script>
      </body>
    </html>
  );
}
