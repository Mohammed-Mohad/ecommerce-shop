import { getCategories, getProductById } from "@/lib/api";
import ProductForm from "@/components/ProductForm";
import { notFound } from "next/navigation";
import AuthGate from "@/components/AuthGate";

interface EditProductPageProps {
  params: {
    id: string;
  };
}

export default async function EditProductPage({ params }: EditProductPageProps) {
  const resolvedParams = await params;
  const product = await getProductById(resolvedParams.id).catch(() => null);

  if (!product) {
    notFound();
  }

  const categories = await getCategories();

  return (
    <main className="container mx-auto px-4 py-12">
      <div className="mx-auto flex max-w-3xl flex-col gap-8">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Update Drop
          </p>
          <h1 className="mt-2 text-4xl font-semibold text-foreground">
            Refine product details
          </h1>
          <p className="mt-3 text-muted-foreground">
            Keep listings fresh with accurate pricing, stock, and imagery.
          </p>
        </div>
        <AuthGate message="Sign in to edit existing products.">
          <ProductForm mode="edit" product={product} categories={categories} />
        </AuthGate>
      </div>
    </main>
  );
}
