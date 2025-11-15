"use client";

import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import FavoriteButton from "@/components/FavoriteButton";
import { Product } from "@/types";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="flex flex-col h-full overflow-hidden">
      <CardHeader className="p-0 relative h-48 w-full">
        <Link href={`/product/${product.id}`}>
          <Image
            src={product.thumbnail}
            alt={product.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
        </Link>
      </CardHeader>
      <CardContent className="p-4 grow">
        <CardTitle className="text-lg font-semibold leading-tight mb-2">
          <Link href={`/product/${product.id}`} className="hover:underline">
            {product.title}
          </Link>
        </CardTitle>
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span className="capitalize">{product.category}</span>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            <span>{product.rating.toFixed(1)}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        <p className="text-xl font-bold">${product.price}</p>
        <FavoriteButton product={product} aria-label="Toggle favorite" />
      </CardFooter>
    </Card>
  );
}
