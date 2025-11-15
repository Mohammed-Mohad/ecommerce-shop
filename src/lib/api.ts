import axios from "axios";
import { Product, ProductsResponse, Category } from "@/types";

const apiClient = axios.create({
  baseURL: "https://dummyjson.com",
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Fetches a list of products with pagination.
 * @param limit The number of products to return.
 * @param skip The number of products to skip.
 * @returns A promise that resolves to the products response object.
 */
export async function getProducts(
  limit: number = 20,
  skip: number = 0
): Promise<ProductsResponse> {
  const response = await apiClient.get<ProductsResponse>("/products", {
    params: { limit, skip },
  });
  return response.data;
}

/**
 * Fetches a single product by its ID.
 * @param id The ID of the product to fetch.
 * @returns A promise that resolves to the product object.
 */
export async function getProductById(id: number | string): Promise<Product> {
  const response = await apiClient.get<Product>(`/products/${id}`);
  return response.data;
}

/**
 * Searches for products based on a query string.
 * @param query The search term.
 * @returns A promise that resolves to the products response object.
 */
export async function searchProducts(
  query: string,
  limit: number = 20,
  skip: number = 0
): Promise<ProductsResponse> {
  const response = await apiClient.get<ProductsResponse>("/products/search", {
    params: {
      q: query,
      limit,
      skip,
    },
  });
  return response.data;
}

/**
 * Fetches a list of all product categories.
 * @returns A promise that resolves to an array of category objects.
 */
export async function getCategories(): Promise<Category[]> {
  const response = await apiClient.get<Category[]>("/products/categories");
  return response.data;
}

/**
 * Fetches products belonging to a specific category.
 * @param category The category name.
 * @returns A promise that resolves to the products response object.
 */
export async function getProductsByCategory(
  category: string,
  limit: number = 20,
  skip: number = 0
): Promise<ProductsResponse> {
  const response = await apiClient.get<ProductsResponse>(
    `/products/category/${encodeURIComponent(category)}`,
    {
      params: {
        limit,
        skip,
      },
    }
  );
  return response.data;
}
