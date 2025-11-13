import { getProducts, searchProducts, getProductsByCategory, getCategories } from "@/lib/api";
import ProductCard from "@/components/ProductCard";
import CategoryList from "@/components/CategoryList";

interface HomePageProps {
  searchParams: {
    q?: string;
    category?: string;
  };
}

export default async function Home({ searchParams }: HomePageProps) {
  const { q, category } = await searchParams;

  // Determine which API function to call based on search params
  let productsResponse;
  let pageTitle;
  let currentCategory;

  if (q) {
    productsResponse = await searchProducts(q);
    pageTitle = `Search results for "${q}"`;
  } else if (category) {
    productsResponse = await getProductsByCategory(category);
    const allCategories = await getCategories();
    const categoryName = allCategories.find(c => c.slug === category)?.name || category;
    pageTitle = `Products in ${categoryName}`;
    currentCategory = category;
  } else {
    productsResponse = await getProducts();
    pageTitle = "All Products";
  }

  const { products } = productsResponse;

  return (
    <main className="container mx-auto px-4 py-8">
      <CategoryList currentCategory={currentCategory} />
      <h1 className="text-3xl font-bold my-8">{pageTitle}</h1>

      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground">
          No products found.
        </p>
      )}
    </main>
  );
}
