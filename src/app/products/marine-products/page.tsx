import CategoryPage from "@/components/pages/products/CategoryPage";

export default function MarinePage() {
  const products = [
    {
      title: "Vannamei Shrimp",
      image: "/images/products/vannamei.jpg",
      description:
        "High-quality farm-grown shrimp processed under HACCP standards.",
    },
    {
      title: "Black Tiger Shrimp",
      image: "/images/products/black-tiger.jpg",
      description: "Premium shrimp variety known for size and rich texture.",
    },
    {
      title: "Mackerel",
      image: "/images/products/mackerel.webp",
      description:
        "Fresh and frozen mackerel suitable for GCC & Asian markets.",
    },
    {
      title: "Seer Fish",
      image: "/images/products/seer.jpg",
      description: "Firm-textured export-grade seer fish portions.",
    },
    {
      title: "Dry Shrimp",
      image: "/images/products/dry-shrimp.jpg",
      description:
        "Naturally dried shrimp with strong flavour and long shelf life.",
    },
  ];

  return (
    <CategoryPage
      title="Marine Products"
      subtitle="Fresh, frozen, and dried seafood processed with global compliance."
      products={products}
    />
  );
}
