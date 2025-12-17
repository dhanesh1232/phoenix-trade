import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/header";
import Main from "@/components/layout/main";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://phoenixexportshub.com"),
  title: "Phoenix Export Company | Global Quality Exports & Trade Solutions",
  description:
    "Phoenix Export Company – trusted global exporter of premium products. Reliable trade solutions, worldwide logistics, and unmatched quality assurance. Partner with us for excellence.",
  keywords:
    "export company, global trade, international exports, Phoenix Export, quality exports, worldwide logistics, trade solutions, export services",
  openGraph: {
    title: "Phoenix Export Company | Global Quality Exports",
    description:
      "Leading global exporter delivering premium products with reliable trade solutions and worldwide logistics.",
    url: "https://phoenixexportshub.com",
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
    title: "Phoenix Export Company | Global Quality Exports",
    description:
      "Leading global exporter delivering premium products with reliable trade solutions and worldwide logistics.",
    images: ["/twitter-image.jpg"],
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
  alternates: {
    canonical: "https://phoenixexportshub.com",
  },
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
      </body>
    </html>
  );
}
