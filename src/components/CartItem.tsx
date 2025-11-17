"use client";

import Image from "next/image";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { updateQuantity, removeItem } from "@/store/cartSlice";
import { Product } from "@/types";
import { formatPrice } from "@/lib/format";
import { Button } from "./ui/button";
import { Minus, Plus, X } from "lucide-react";

interface CartItemProps {
  item: Product & { quantity: number };
}

export default function CartItem({ item }: CartItemProps) {
  const dispatch = useDispatch();

  return (
    <div className="flex items-start gap-4 py-4">
      <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border">
        <Image
          src={item.thumbnail}
          alt={item.title}
          fill
          className="object-contain"
        />
      </div>
      <div className="flex-1">
        <div className="flex justify-between">
          <div>
            <Link
              href={`/product/${item.id}`}
              className="font-semibold hover:underline"
            >
              {item.title}
            </Link>
            <p className="text-sm text-muted-foreground">
              {formatPrice(item.price)}
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => dispatch(removeItem(item.id))}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}
              disabled={item.quantity <= 1}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="w-8 text-center font-medium">{item.quantity}</span>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <p className="font-semibold">
            {formatPrice(item.price * item.quantity)}
          </p>
        </div>
      </div>
    </div>
  );
}