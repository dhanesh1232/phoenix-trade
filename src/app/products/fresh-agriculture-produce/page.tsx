import CategoryPage from "@/components/pages/products/CategoryPage";

export default function FreshPage() {
  const products = [
    {
      title: "Bananas",
      image: "/images/products/banana.jpeg",
      description: "Naturally ripened, sorted, export-grade Cavendish bananas.",
    },
    {
      title: "Green Chillies",
      image: "/images/products/green-chilli.jpeg",
      description:
        "Fresh, firm, and locally sourced chillies with strong aroma.",
    },
    {
      title: "Capsicum",
      image: "/images/products/capsicum.jpeg",
      description: "Premium-grade capsicums sourced from controlled farms.",
    },
    {
      title: "Tomatoes",
      image: "/images/products/tomatoes.webp",
      description: "Firm, juicy tomatoes suitable for long-distance transport.",
    },
    {
      title: "Coconuts",
      image: "/images/products/coconuts.jpg",
      description:
        "Semi-husked and fully husked coconuts with controlled moisture.",
    },
  ];

  return (
    <CategoryPage
      title="Fresh Agricultural Produce"
      subtitle="Farm-fresh products sourced from India’s fertile regions."
      products={products}
    />
  );
}
