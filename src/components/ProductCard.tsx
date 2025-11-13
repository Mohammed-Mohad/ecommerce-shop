import { Product } from "@/types";
import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/product/${product.id}`}>
      <div className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
        <div className="relative w-full h-48">
          <Image
            src={product.thumbnail}
            alt={product.title}
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold truncate">{product.title}</h3>
          <p className="text-sm text-gray-500">{product.category}</p>
          <p className="text-xl font-bold mt-2">${product.price}</p>
        </div>
      </div>
    </Link>
  );
}