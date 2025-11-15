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

  const handleAddToCart = () => {
    dispatch(addItem(product));
    toast.success("Added to cart", {
      description: `"${product.title}" was added to your cart.`,
    });
  };

  return (
    <Button
      onClick={handleAddToCart}
      size="lg"
      className="w-full mt-4"
    >
      <ShoppingCart className="mr-2 h-5 w-5" />
      Add to Cart
    </Button>
  );
}
