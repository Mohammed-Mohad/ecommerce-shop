"use client";

import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types";
import { formatPrice } from "@/lib/format";
import FavoriteButton from "./FavoriteButton";
import AddToCartButton from "./AddToCartButton";
import { Star } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const categoryLabel = product.category.replace(/-/g, " ");
  return (
    <div className="group flex flex-col overflow-hidden rounded-3xl border border-border/70 bg-card/90 text-card-foreground shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
      <div className="relative">
        <Link href={`/product/${product.id}`} className="block">
          <div className="relative aspect-square w-full overflow-hidden bg-gradient-to-br from-muted to-white">
            <Image
              src={product.thumbnail}
              alt={product.title}
              fill
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
              className="object-contain p-6 transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        </Link>
        <div className="absolute top-3 right-3">
          <FavoriteButton product={product} />
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex-1 space-y-2">
          <p className="inline-flex rounded-full bg-secondary/70 px-3 py-1 text-xs font-medium capitalize text-secondary-foreground">
            {categoryLabel}
          </p>
          <h3 className="text-lg font-semibold leading-tight">
            <Link href={`/product/${product.id}`}>{product.title}</Link>
          </h3>
          <div className="flex items-center justify-between pt-2">
            <p className="text-xl font-bold">{formatPrice(product.price)}</p>
            <div className="flex items-center gap-1 text-sm font-medium text-muted-foreground">
              <Star className="h-4 w-4 text-yellow-400" fill="currentColor" />
              {product.rating.toFixed(1)}
            </div>
          </div>
        </div>
        <div className="mt-5">
          <AddToCartButton product={product} />
        </div>
      </div>
    </div>
  );
}
