"use client";

import { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Heart } from "lucide-react";
import { Product } from "@/types";
import { RootState } from "@/store/store";
import { toggleFavorite } from "@/store/favoritesSlice";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface FavoriteButtonProps {
  product: Product;
  showLabel?: boolean;
  className?: string;
}

export default function FavoriteButton({
  product,
  showLabel = false,
  className,
}: FavoriteButtonProps) {
  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.favorites);
  const isFavorite = useMemo(
    () => favorites.ids.includes(product.id),
    [favorites.ids, product.id]
  );
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    const id = window.requestAnimationFrame(() => setHasMounted(true));
    return () => window.cancelAnimationFrame(id);
  }, []);

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(toggleFavorite(product));
    if (isFavorite) {
      toast("Removed from favorites", {
        description: `"${product.title}" has been removed.`,
      });
    } else {
      toast.success("Saved to favorites", {
        description: `"${product.title}" is now in favorites.`,
      });
    }
  };

  return (
    <Button
      onClick={handleToggleFavorite}
      size={showLabel ? "default" : "icon"}
      className={cn(
        "rounded-full border border-white/40 bg-white/70 text-foreground shadow-lg backdrop-blur transition",
        hasMounted && isFavorite && "bg-red-500/90 text-white shadow-red-400/40",
        showLabel &&
          "h-12 w-full justify-center rounded-2xl border-primary/40 bg-primary/10 text-primary shadow-none hover:bg-primary/20",
        className
      )}
      aria-label={
        hasMounted && isFavorite ? "Remove from favorites" : "Add to favorites"
      }
    >
      <Heart
        className={cn(
          "h-5 w-5 transition-all",
          hasMounted && isFavorite ? "fill-current" : "fill-transparent"
        )}
      />
      {showLabel && (
        <span className="ml-2 text-sm font-semibold">
          {hasMounted && isFavorite ? "Favorited" : "Favorite"}
        </span>
      )}
    </Button>
  );
}
