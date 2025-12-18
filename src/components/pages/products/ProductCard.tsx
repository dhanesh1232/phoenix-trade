import Image from "next/image";

export const ProductCard = ({
  image,
  title,
  description,
}: {
  image: string;
  title: string;
  description: string;
}) => {
  return (
    <div className="group bg-white shadow-sm hover:shadow-md transition overflow-hidden">
      <div className="relative h-64">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>

      <div className="p-6">
        <h3 className="text-lg font-semibold text-black">{title}</h3>
        <p className="mt-3 text-sm text-gray-600 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};
