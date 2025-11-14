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
export async function getProducts(limit: number = 20, skip: number = 0): Promise<ProductsResponse> {
  const response = await apiClient.get<ProductsResponse>(`/products?limit=${limit}&skip=${skip}`);
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
export async function searchProducts(query: string): Promise<ProductsResponse> {
  const response = await apiClient.get<ProductsResponse>(`/products/search?q=${encodeURIComponent(query)}`);
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
export async function getProductsByCategory(category: string): Promise<ProductsResponse> {
  const response = await apiClient.get<ProductsResponse>(`/products/category/${encodeURIComponent(category)}`);
  return response.data;
}