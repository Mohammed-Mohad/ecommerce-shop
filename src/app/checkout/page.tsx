import CheckoutContent from "@/components/CheckoutContent";

export default function CheckoutPage() {
  return (
    <main className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-3xl space-y-6">
        <div className="space-y-2 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Finish up
          </p>
          <h1 className="text-4xl font-semibold text-foreground">
            Checkout overview
          </h1>
          <p className="text-muted-foreground">
            Review your selected items and confirm the mock checkout flow.
          </p>
        </div>
        <CheckoutContent />
      </div>
    </main>
  );
}

