"use client";

import { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { RootState } from "@/store/store";
import { clearFavorites } from "@/store/favoritesSlice";
import ProductCard from "@/components/ProductCard";

export default function FavoritesContent() {
  const dispatch = useDispatch();
  const { ids, entities } = useSelector((state: RootState) => state.favorites);
  const favoriteProducts = useMemo(
    () => ids.map((id) => entities[id]).filter(Boolean),
    [ids, entities]
  );

  if (favoriteProducts.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 py-12 text-center">
        <h2 className="text-2xl font-semibold">No favorites yet</h2>
        <p className="text-muted-foreground max-w-md">
          Tap the heart icon on any product to save it here for quick access.
        </p>
        <Button asChild>
          <Link href="/">Browse products</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Favorite Products</h2>
          <p className="text-muted-foreground">
            {favoriteProducts.length} item
            {favoriteProducts.length > 1 ? "s" : ""} saved for later
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => dispatch(clearFavorites())}
        >
          Clear favorites
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {favoriteProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
