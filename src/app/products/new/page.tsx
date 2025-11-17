import { getCategories } from "@/lib/api";
import ProductForm from "@/components/ProductForm";

export default async function NewProductPage() {
  const categories = await getCategories();

  return (
    <main className="container mx-auto px-4 py-12">
      <div className="mx-auto flex max-w-3xl flex-col gap-8">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            New drop
          </p>
          <h1 className="mt-2 text-4xl font-semibold text-foreground">
            Add a product to MexShop
          </h1>
          <p className="mt-3 text-muted-foreground">
            Share the story, set the price, and hit publish in minutes.
          </p>
        </div>
        <ProductForm categories={categories} mode="create" />
      </div>
    </main>
  );
}
