import { api } from "./api";
import type { Product } from "@/types";

export async function getProducts(params?: Record<string, string>): Promise<Product[]> {
  console.log("before");
  try {
    return await api.get<Product[]>("/products", params);
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export async function getProductById(id: string): Promise<Product | null> {
  try {
    return await api.get<Product>(`/products/${id}`);
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  return getProducts({ category });
}

export async function searchProducts(query: string): Promise<Product[]> {
  const products = await getProducts();
  const lowercaseQuery = query.toLowerCase();
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(lowercaseQuery) ||
      p.description.toLowerCase().includes(lowercaseQuery) ||
      p.tags?.some((tag) => tag.toLowerCase().includes(lowercaseQuery))
  );
}
