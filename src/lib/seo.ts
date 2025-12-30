import { keywords } from "./keywords";

const SITE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || "https://phoenixexportshub.com";

const SITE_NAME = "Phoenix Trade Exports";

export const defaultMeta = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: "Phoenix Trade Exports – Global Exporters from India",
    template: "%s | Phoenix Trade Exports",
  },

  description:
    "Phoenix Trade Exports is a global export company from India supplying fresh agricultural products, marine products, coconut products, dehydrated powders, and sustainable fabrics to international markets.",

  keywords: [...keywords],

  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/",
    },
  },

  openGraph: {
    title: "Phoenix Trade Exports – Global Exporters from India",
    description:
      "Trusted Indian exporter of agricultural produce, marine products, coconut derivatives, dehydrated powders, and eco-friendly fabrics.",
    url: SITE_URL,
    siteName: SITE_NAME,
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Phoenix Trade Exports – Global Export Company",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Phoenix Trade Exports – Global Export Company",
    description:
      "Exporting premium-quality agricultural, marine, coconut, and sustainable products from India to global markets.",
    images: ["/og-image.jpg"],
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      maxSnippet: -1,
      maxImagePreview: "large",
      maxVideoPreview: -1,
    },
  },

  category: "export",
  applicationName: "Phoenix Trade Exports",
  creator: "Phoenix Trade Exports",
  publisher: "Phoenix Trade Exports",
};

// ----------------------------------------------------
// Safe helpers
// ----------------------------------------------------
function getSafe(obj: any, prop: string, fallback: any = undefined) {
  return obj && prop in obj ? obj[prop] : fallback;
}

// ----------------------------------------------------
// Core metadata generator
// ----------------------------------------------------
export function generateMetadata(config: any = {}) {
  const title = getSafe(config, "title", defaultMeta.title.default);
  const description = getSafe(config, "description", defaultMeta.description);
  const keywordsOverride = getSafe(config, "keywords", []);
  const alternates = getSafe(config, "alternates", {});
  const openGraph = getSafe(config, "openGraph", {});
  const twitter = getSafe(config, "twitter", {});
  const robots = getSafe(config, "robots", {});

  const titleString =
    typeof title === "object" ? getSafe(title, "default", "") : String(title);

  const fullTitle = `${titleString} | ${SITE_NAME}`;

  const fullKeywords = [
    ...(Array.isArray(defaultMeta.keywords) ? defaultMeta.keywords : []),
    ...(Array.isArray(keywordsOverride) ? keywordsOverride : []),
  ].filter(Boolean);

  const canonicalUrl = getSafe(alternates, "canonical", SITE_URL);

  const defaultOgImages = defaultMeta.openGraph.images;
  const ogImages = getSafe(openGraph, "images", defaultOgImages);

  return {
    ...defaultMeta,

    title: {
      default: titleString,
      template: defaultMeta.title.template,
    },

    description,

    keywords: fullKeywords.length ? fullKeywords : undefined,

    alternates: {
      ...defaultMeta.alternates,
      canonical: canonicalUrl,
      ...alternates,
    },

    openGraph: {
      ...defaultMeta.openGraph,
      title: fullTitle,
      description,
      url: canonicalUrl,
      ...openGraph,
      images: Array.isArray(ogImages) ? ogImages : [],
    },

    twitter: {
      ...defaultMeta.twitter,
      title: fullTitle,
      description,
      ...twitter,
    },

    robots: {
      ...defaultMeta.robots,
      ...robots,
    },

    metadataBase: new URL(SITE_URL),
  };
}

// ----------------------------------------------------
// Metadata helper for dynamic routes
// ----------------------------------------------------
export function metadataForPath(path: string, config: any = {}) {
  return generateMetadata({
    alternates: {
      canonical: `${SITE_URL}${path}`,
    },
    openGraph: {
      url: `${SITE_URL}${path}`,
    },
    ...config,
  });
}

export function organizationJsonLd(overrides = {}) {
  const base = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Phoenix Trade Exports",
    description:
      "Indian export company supplying agricultural products, marine products, coconut products, dehydrated powders, and sustainable fabrics worldwide.",
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    foundingDate: "2024",
    address: {
      "@type": "PostalAddress",
      addressCountry: "India",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      areaServed: "Worldwide",
      availableLanguage: ["English"],
    },
  };

  return JSON.stringify({ ...base, ...overrides });
}

export function productJsonLd(product: {
  name: string;
  description: string;
  slug: string;
  image?: ImageFormat["url"];
  category: string;
}) {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.image ? [product.image] : undefined,
    brand: {
      "@type": "Brand",
      name: "Phoenix Trade Exports",
    },
    category: product.category,
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceCurrency: "USD",
      url: `https://phoenix-trade.vercel.app/products/${product.slug}`,
      seller: {
        "@type": "Organization",
        name: "Phoenix Trade Exports",
      },
    },
  });
}

export function breadcrumbJsonLd(
  items: {
    name: string;
    url: string;
  }[]
) {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  });
}
