"use client";

import * as React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { ShoppingCart } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

type CartIconProps = React.ComponentPropsWithoutRef<typeof Button>;

export const CartIcon = React.forwardRef<HTMLButtonElement, CartIconProps>(
  ({ className, ...props }, ref) => {
    const items = useSelector((state: RootState) => state.cart.items);
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

    return (
      <Button
        ref={ref}
        variant="ghost"
        size="icon"
        className={cn("relative", className)}
        {...props}
      >
        <ShoppingCart className="h-5 w-5" />
        {totalItems > 0 && (
          <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
            {totalItems}
          </span>
        )}
        <span className="sr-only">Shopping Cart</span>
      </Button>
    );
  }
);

CartIcon.displayName = "CartIcon";
