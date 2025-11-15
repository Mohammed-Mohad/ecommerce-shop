import { getCategories } from "@/lib/api";
import ProductForm from "@/components/ProductForm";

export default async function NewProductPage() {
  const categories = await getCategories();

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-3xl space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Create Product</h1>
          <p className="text-muted-foreground">
            Fill out the form to add a new product to the catalog.
          </p>
        </div>
        <ProductForm categories={categories} mode="create" />
      </div>
    </main>
  );
}
