"use client";

import { useSelector, useDispatch } from "react-redux";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { animate } from "motion";
import type { AnimationOptions, DOMKeyframesDefinition } from "motion";
import { RootState } from "@/store/store";
import { removeItem, updateQuantity } from "@/store/cartSlice";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CartIcon } from "./CartIcon";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { formatPrice } from "@/lib/format";

type MotionKeyframes = DOMKeyframesDefinition;
type MotionOptions = AnimationOptions;

interface CartSheetProps {
  trigger?: React.ReactNode;
  children?: React.ReactNode;
}

export default function CartSheet({ children, trigger }: CartSheetProps) {
  const items = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = listRef.current;
    if (!container) return;

    const rows = Array.from(
      container.querySelectorAll<HTMLDivElement>("[data-cart-row]")
    );
    if (!rows.length) return;

    const animations = rows.map((row, index) => {
      row.style.opacity = "0";
      row.style.transform = "translateX(-8px)";
      const keyframes: MotionKeyframes = {
        opacity: [0, 1],
        transform: ["translateX(-8px)", "translateX(0px)"],
      };
      const options: MotionOptions = {
        duration: 0.3,
        delay: index * 0.05,
        ease: "easeOut",
      };
      return animate(row, keyframes, options);
    });

    return () => animations.forEach((control) => control.cancel());
  }, [items.length]);

  const handleQuantityChange = (id: number, quantity: number) => {
    dispatch(updateQuantity({ id, quantity: Number(quantity) }));
  };

  const handleRemoveItem = (id: number) => {
    dispatch(removeItem(id));
    toast("Removed from cart", {
      description: "The item has been removed.",
    });
  };

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const triggerNode = trigger ?? children ?? <CartIcon />;

  return (
    <Sheet>
      <SheetTrigger asChild>{triggerNode}</SheetTrigger>
      <SheetContent className="flex h-full w-full flex-col bg-background sm:max-w-lg">
        <SheetHeader className="px-6 pt-6">
          <SheetTitle className="text-xl font-semibold">
            Shopping Cart
          </SheetTitle>
          <SheetDescription className="text-sm text-muted-foreground">
            Review your items and proceed to checkout.
          </SheetDescription>
        </SheetHeader>
        {items.length > 0 ? (
          <>
            <ScrollArea className="flex-1 min-h-0 px-6">
              <div
                ref={listRef}
                className="flex flex-col divide-y divide-border/60 py-4"
              >
                {items.map((item) => (
                  <div
                    key={item.id}
                    data-cart-row
                    className="flex gap-4 py-4"
                  >
                    <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg border bg-muted">
                      <Image
                        src={item.thumbnail}
                        alt={item.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-1 flex-col justify-between gap-1">
                      <div className="flex justify-between gap-4">
                        <p className="font-semibold leading-tight text-foreground">
                          {item.title}
                        </p>
                        <p className="shrink-0 font-medium text-foreground">
                          {formatPrice(item.price)}
                        </p>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) =>
                              handleQuantityChange(
                                item.id,
                                parseInt(e.target.value, 10)
                              )
                            }
                            className="h-9 w-16 rounded-md text-center"
                            aria-label={`Quantity for ${item.title}`}
                          />
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemoveItem(item.id)}
                          className="h-9 w-9 text-muted-foreground hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Remove item</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <div className="border-t bg-background px-6 py-4">
              <div className="flex w-full flex-col gap-4">
                <div className="flex items-baseline justify-between text-lg font-semibold">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <SheetClose asChild>
                  <Button asChild size="lg" className="w-full">
                    <Link href="/checkout">Proceed to Checkout</Link>
                  </Button>
                </SheetClose>
              </div>
            </div>
          </>
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
            <p className="text-lg text-muted-foreground">
              Your cart is empty.
            </p>
            <SheetTrigger asChild>
              <Button asChild variant="outline" className="rounded-full px-6">
                <Link href="/">Continue Shopping</Link>
              </Button>
            </SheetTrigger>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
