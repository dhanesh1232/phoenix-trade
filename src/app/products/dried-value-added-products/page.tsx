import CategoryPage from "@/components/pages/products/CategoryPage";

export default function DriedPage() {
  const products = [
    {
      title: "Moringa Powder",
      image: "/images/products/moringa.jpg",
      description:
        "Lab-tested, nutrient-rich moringa powder for global markets.",
    },
    {
      title: "Onion Powder",
      image: "/images/products/onion-powder.jpg",
      description: "Low-moisture fine powder with strong aroma.",
    },
    {
      title: "Garlic Powder",
      image: "/images/products/garlic-powder.jpg",
      description: "Pure, sulphite-free garlic powder for food processing.",
    },
    {
      title: "Banana Powder",
      image: "/images/products/banana-powder.jpeg",
      description: "Made from naturally ripened bananas, fine quality.",
    },
    {
      title: "Coconut Flakes",
      image: "/images/products/coconut-flakes.jpeg",
      description: "Premium coconut flakes ideal for baking & confectionery.",
    },
  ];

  return (
    <CategoryPage
      title="Dried & Value-Added Products"
      subtitle="Processed, powdered, and enhanced agricultural products."
      products={products}
    />
  );
}
