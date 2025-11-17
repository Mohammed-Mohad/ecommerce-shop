import axios from "axios";
import {
  Product,
  ProductsResponse,
  Category,
  ProductPayload,
} from "@/types";

const API_TIMEOUT = 8000;

const apiClient = axios.create({
  baseURL: "https://dummyjson.com",
  timeout: API_TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
});

function handleAxiosError(error: unknown, fallbackMessage: string) {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      return new Error(
        (error.response.data as { message?: string })?.message ||
          fallbackMessage
      );
    }
    if (error.request) {
      return new Error(
        "Unable to reach DummyJSON at the moment. Please check your connection and try again."
      );
    }
  }
  return new Error(fallbackMessage);
}

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
  try {
    const response = await apiClient.get<ProductsResponse>("/products", {
      params: { limit, skip },
    });
    return response.data;
  } catch (error) {
    throw handleAxiosError(error, "Failed to load products.");
  }
}

/**
 * Fetches a single product by its ID.
 * @param id The ID of the product to fetch.
 * @returns A promise that resolves to the product object.
 */
export async function getProductById(id: number | string): Promise<Product> {
  try {
    const response = await apiClient.get<Product>(`/products/${id}`);
    return response.data;
  } catch (error) {
    throw handleAxiosError(error, "Failed to load product.");
  }
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
  try {
    const response = await apiClient.get<ProductsResponse>("/products/search", {
      params: {
        q: query,
        limit,
        skip,
      },
    });
    return response.data;
  } catch (error) {
    throw handleAxiosError(error, "Failed to search products.");
  }
}

/**
 * Fetches a list of all product categories.
 * @returns A promise that resolves to an array of category objects.
 */
export async function getCategories(): Promise<Category[]> {
  try {
    const response = await apiClient.get<Category[]>("/products/categories");
    return response.data;
  } catch (error) {
    throw handleAxiosError(error, "Failed to load categories.");
  }
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
  try {
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
  } catch (error) {
    throw handleAxiosError(
      error,
      `Failed to load products for category "${category}".`
    );
  }
}

/**
 * Creates a new product.
 * @param payload Product form data.
 */
export async function createProduct(
  payload: ProductPayload
): Promise<Product> {
  try {
    const response = await apiClient.post<Product>("/products/add", payload);
    return response.data;
  } catch (error) {
    throw handleAxiosError(error, "Failed to create product.");
  }
}

/**
 * Updates an existing product by ID.
 * @param id Product identifier.
 * @param payload Product form data.
 */
export async function updateProduct(
  id: number | string,
  payload: Partial<ProductPayload>
): Promise<Product> {
  try {
    const response = await apiClient.patch<Product>(
      `/products/${id}`,
      payload
    );
    return response.data;
  } catch (error) {
    throw handleAxiosError(error, "Failed to update product.");
  }
}

/**
 * Deletes a product.
 * @param id Product identifier.
 */
export async function deleteProduct(id: number | string): Promise<void> {
  try {
    await apiClient.delete(`/products/${id}`);
  } catch (error) {
    throw handleAxiosError(error, "Failed to delete product.");
  }
}
