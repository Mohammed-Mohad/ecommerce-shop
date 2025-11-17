"use client";

import { useDispatch } from "react-redux";
import { addItem } from "@/store/cartSlice";
import { Product } from "@/types";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { toast } from "sonner";

interface AddToCartButtonProps {
  product: Product;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const dispatch = useDispatch();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addItem(product));
    toast.success("Added to cart", {
      description: `"${product.title}" was added to your cart.`,
    });
  };

  return (
    <Button onClick={handleAddToCart} className="w-full" aria-label="Add to cart">
      <ShoppingCart className="mr-2 h-4 w-4" />
      Add to Cart
    </Button>
  );
}
