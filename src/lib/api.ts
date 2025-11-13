import { Product, ProductsResponse, Category } from "@/types";

const API_BASE_URL = "https://dummyjson.com";

/**
 * Fetches a list of all products.
 * @returns A promise that resolves to the products response object.
 * @throws An error if the network response is not ok.
 */
export async function getProducts(): Promise<ProductsResponse> {
  const res = await fetch(`${API_BASE_URL}/products`);

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const data: ProductsResponse = await res.json();
  return data;
}

/**
 * Fetches a single product by its ID.
 * @param id The ID of the product to fetch.
 * @returns A promise that resolves to the product object.
 * @throws An error if the network response is not ok.
 */
export async function getProductById(id: number | string): Promise<Product> {
  const res = await fetch(`${API_BASE_URL}/products/${id}`);

  if (!res.ok) {
    throw new Error(`Failed to fetch product with id: ${id}`);
  }

  const data: Product = await res.json();
  return data;
}

/**
 * Searches for products based on a query string.
 * @param query The search term.
 * @returns A promise that resolves to the products response object.
 */
export async function searchProducts(query: string): Promise<ProductsResponse> {
  const res = await fetch(`${API_BASE_URL}/products/search?q=${encodeURIComponent(query)}`);

  if (!res.ok) {
    throw new Error("Failed to search products");
  }

  const data: ProductsResponse = await res.json();
  return data;
}

/**
 * Fetches a list of all product categories.
 * @returns A promise that resolves to an array of category objects.
 */
export async function getCategories(): Promise<Category[]> {
  const res = await fetch(`${API_BASE_URL}/products/categories`);

  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }

  const data: Category[] = await res.json();
  return data;
}

/**
 * Fetches products belonging to a specific category.
 * @param category The category name.
 * @returns A promise that resolves to the products response object.
 */
export async function getProductsByCategory(category: string): Promise<ProductsResponse> {
  const res = await fetch(`${API_BASE_URL}/products/category/${encodeURIComponent(category)}`);

  if (!res.ok) {
    throw new Error(`Failed to fetch products for category: ${category}`);
  }

  const data: ProductsResponse = await res.json();
  return data;
}