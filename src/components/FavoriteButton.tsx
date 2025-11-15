"use client";

import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Heart } from "lucide-react";
import { Product } from "@/types";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { RootState } from "@/store/store";
import { toggleFavorite } from "@/store/favoritesSlice";
import { toast } from "sonner";

interface FavoriteButtonProps
  extends React.ComponentPropsWithoutRef<typeof Button> {
  product: Product;
  showLabel?: boolean;
}

export default function FavoriteButton({
  product,
  className,
  showLabel = false,
  ...props
}: FavoriteButtonProps) {
  const dispatch = useDispatch();
  const isFavorite = useSelector(
    (state: RootState) => Boolean(state.favorites.entities[product.id])
  );

  const handleToggle = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    dispatch(toggleFavorite(product));
    if (isFavorite) {
      toast("Removed from favorites", {
        description: `"${product.title}" won’t appear in favorites anymore.`,
      });
    } else {
      toast.success("Saved to favorites", {
        description: `"${product.title}" is now in your favorites list.`,
      });
    }
  };

  return (
    <Button
      type="button"
      variant={isFavorite ? "default" : "ghost"}
      size={showLabel ? "default" : "icon"}
      aria-pressed={isFavorite}
      onClick={handleToggle}
      className={cn("transition-colors", className)}
      {...props}
    >
      <Heart
        className={cn(
          "w-5 h-5",
          isFavorite ? "fill-current" : "text-muted-foreground"
        )}
      />
      {showLabel && <span>{isFavorite ? "Favorited" : "Add to Favorites"}</span>}
    </Button>
  );
}
