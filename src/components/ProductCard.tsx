"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { animate, inView } from "motion";
import type { AnimationOptions, DOMKeyframesDefinition } from "motion";
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
  const discountLabel =
    product.discountPercentage > 0
      ? `${product.discountPercentage.toFixed(0)}% OFF`
      : null;
  const shortDescription = product.description
    ? product.description.slice(0, 80) +
      (product.description.length > 80 ? "…" : "")
    : null;
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const stop = inView(card, () => {
      const keyframes: DOMKeyframesDefinition = {
        opacity: [0, 1],
        transform: ["translateY(16px)", "translateY(0px)"],
      };
      const options: AnimationOptions = { duration: 0.6, ease: "easeOut" };
      animate(card, keyframes, options);
    }, { amount: 0.2 });

    return () => stop();
  }, []);

  return (
    <div
      ref={cardRef}
      data-product-id={product.id}
      
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-border/70 bg-card/90 text-card-foreground opacity-0 shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg"
    >
      <Link href={`/product/${product.id}`} className="block">
        <div className="relative aspect-square w-full overflow-hidden bg-linear-to-br from-muted/50 to-background">
          <Image
            src={product.thumbnail}
            alt={product.title}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      </Link>
      {discountLabel && (
        <div className="absolute left-3 top-3 z-10">
          <span className="rounded-full bg-emerald-500/90 px-2.5 py-1 text-xs font-semibold text-white shadow">
            {discountLabel}
          </span>
        </div>
      )}
      <div className="absolute top-2 right-2 z-10">
        <FavoriteButton product={product} />
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="flex-1 space-y-1.5">
          <p className="inline-flex rounded-full bg-secondary/70 px-2.5 py-0.5 text-xs font-medium capitalize text-secondary-foreground">
            {categoryLabel}
          </p>
          <h3 className="font-semibold leading-tight text-foreground">
            <Link href={`/product/${product.id}`}>{product.title}</Link>
          </h3>
          {shortDescription && (
            <p className="text-sm text-muted-foreground line-clamp-2">
              {shortDescription}
            </p>
          )}
          <div className="flex items-center justify-between pt-3">
            <p className="text-lg font-bold text-foreground">
              {formatPrice(product.price)}
            </p>
            <div className="flex items-center gap-1 text-sm font-medium text-muted-foreground">
              <Star className="h-4 w-4 text-yellow-400" fill="currentColor" />
              {product.rating.toFixed(1)}
            </div>
          </div>
        </div>
        <div className="mt-4">
          <AddToCartButton product={product} />
        </div>
      </div>
    </div>
  );
}
