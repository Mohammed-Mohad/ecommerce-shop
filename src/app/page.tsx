import {
  getProducts,
  searchProducts,
  getProductsByCategory,
  getCategories,
} from "@/lib/api";
import CategoryList from "@/components/CategoryList";
import ProductsFeed from "@/components/ProductsFeed";
import { formatCategoryLabel } from "@/lib/format";
import Hero from "@/components/Hero";
import { Category, ProductsResponse } from "@/types";

interface HomePageProps {
  searchParams: {
    q?: string;
    category?: string;
  };
}

const PAGE_SIZE = 12;

export default async function Home({ searchParams }: HomePageProps) {
  const params = await searchParams;
  const q = params?.q;
  const category = params?.category;

  let productsResponse: ProductsResponse = {
    products: [],
    total: 0,
    skip: 0,
    limit: PAGE_SIZE,
  };
  let pageTitle = "All Products";
  let initialError: string | null = null;
  let categories: Category[] = [];

  try {
    if (q) {
      productsResponse = await searchProducts(q, PAGE_SIZE, 0);
      pageTitle = `Search results for "${q}"`;
    } else if (category) {
      productsResponse = await getProductsByCategory(category, PAGE_SIZE, 0);
      pageTitle = `Products in ${formatCategoryLabel(category)}`;
    } else {
      productsResponse = await getProducts(PAGE_SIZE, 0);
    }
  } catch (error) {
    initialError =
      error instanceof Error
        ? error.message
        : "We couldn't reach the product service. Please try again.";
  }

  try {
    categories = await getCategories();
  } catch {
    categories = [];
  }

  const initialProducts = productsResponse.products;
  const avgRating =
    initialProducts.length > 0
      ? initialProducts.reduce((sum, product) => sum + product.rating, 0) /
        initialProducts.length
      : 0;
  const brandCount = new Set(initialProducts.map((product) => product.brand))
    .size;

  const heroStats = {
    totalProducts: productsResponse.total,
    totalCategories: categories.length,
    avgRating: Number(avgRating.toFixed(1)),
    brandCount,
  };

  return (
    <main className="flex flex-col">
      <Hero stats={heroStats} />
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <section
          aria-labelledby="category-heading"
          className="py-8 md:py-12"
          id="categories"
        >
          <CategoryList currentCategory={category} categories={categories} />
        </section>

        <section
          aria-labelledby="products-heading"
          className="py-12"
          id="products"
        >
          <div className="flex flex-col items-baseline justify-between gap-4 border-b pb-6 md:flex-row">
            <h1
              id="products-heading"
              className="text-4xl font-bold tracking-tight text-foreground"
            >
              {pageTitle}
            </h1>
            {/* You could add sorting controls here in the future */}
          </div>

          <div className="pt-12">
            <ProductsFeed
              initialProducts={productsResponse.products}
              initialTotal={productsResponse.total}
              initialError={initialError}
              pageSize={PAGE_SIZE}
              query={q}
              category={category}
            />
          </div>
        </section>
      </div>
    </main>
  );
}
