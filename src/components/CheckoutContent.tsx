"use client";

import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState } from "@/store/store";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/format";
import { removeItem, clearCart } from "@/store/cartSlice";
import { toast } from "sonner";

export default function CheckoutContent() {
  const items = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const router = useRouter();
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handlePlaceOrder = () => {
    toast.success("Order confirmed", {
      description: "Thank you! This demo checkout completes your experience.",
    });
    dispatch(clearCart());
    router.push("/");
  };

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 text-center">
        <p className="text-lg font-semibold">Your cart is empty</p>
        <p className="text-sm text-muted-foreground">
          Add a few products to see the checkout summary here.
        </p>
        <Button asChild>
          <Link href="/">Browse products</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-border/70 bg-card/80 p-6 shadow">
        <h2 className="text-2xl font-semibold">Order summary</h2>
        <div className="mt-4 space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex gap-3 border-b border-border/60 pb-4 last:border-b-0">
              <div className="flex-1">
                <p className="font-medium text-foreground">{item.title}</p>
                <p className="text-sm text-muted-foreground">
                  Qty {item.quantity} · {formatPrice(item.price)}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-semibold">{formatPrice(item.price * item.quantity)}</span>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => dispatch(removeItem(item.id))}
                  className="text-muted-foreground hover:text-destructive"
                >
                  ×
                </Button>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-center justify-between text-lg font-semibold">
          <span>Total</span>
          <span>{formatPrice(total)}</span>
        </div>
      </div>
      <div className="rounded-3xl border border-dashed border-primary/50 bg-primary/5 p-6">
        <p className="text-sm uppercase tracking-[0.2em] text-primary">
          Demo checkout
        </p>
        <p className="mt-2 text-base text-muted-foreground">
          Payments are disabled for this portfolio project. Placing the order will simply
          confirm the flow.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Button onClick={handlePlaceOrder}>Place order</Button>
          <Button asChild variant="outline">
            <Link href="/">Continue shopping</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
