import {
  getProducts,
  searchProducts,
  getProductsByCategory,
} from "@/lib/api";
import CategoryList from "@/components/CategoryList";
import ProductsFeed from "@/components/ProductsFeed";
import { formatCategoryLabel } from "@/lib/format";

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

  let productsResponse;
  let pageTitle;

  if (q) {
    productsResponse = await searchProducts(q, PAGE_SIZE, 0);
    pageTitle = `Search results for "${q}"`;
  } else if (category) {
    productsResponse = await getProductsByCategory(category, PAGE_SIZE, 0);
    pageTitle = `Products in ${formatCategoryLabel(category)}`;
  } else {
    productsResponse = await getProducts(PAGE_SIZE, 0);
    pageTitle = "All Products";
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <CategoryList currentCategory={category} />
      <h1 className="text-3xl font-bold my-8">{pageTitle}</h1>
      <ProductsFeed
        initialProducts={productsResponse.products}
        initialTotal={productsResponse.total}
        pageSize={PAGE_SIZE}
        query={q}
        category={category}
      />
    </main>
  );
}
