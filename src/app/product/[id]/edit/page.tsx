import { getCategories, getProductById } from "@/lib/api";
import ProductForm from "@/components/ProductForm";
import { notFound } from "next/navigation";

interface EditProductPageProps {
  params: {
    id: string;
  };
}

export default async function EditProductPage({ params }: EditProductPageProps) {
  const { id } = await params;
  const product = await getProductById(id).catch(() => null);

  if (!product) {
    notFound();
  }

  const categories = await getCategories();

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-3xl space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Edit Product</h1>
          <p className="text-muted-foreground">
            Update the product information and save your changes.
          </p>
        </div>
        <ProductForm
          mode="edit"
          product={product}
          categories={categories}
        />
      </div>
    </main>
  );
}
