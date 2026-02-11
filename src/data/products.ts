import type { Product, Category } from "@/types";

// For build-time (server) - import JSON directly
import productsDataStatic from "../../public/data/products.json";

// Check if we're in browser
const isBrowser = typeof window !== "undefined";

// Fetch products.json at runtime (client) or use static import (server/build)
async function fetchProductsData(): Promise<{ products: Product[]; categories: Category[] }> {
  if (isBrowser) {
    // Client-side: fetch from public folder (allows runtime updates)
    const res = await fetch("/data/products.json", { cache: "no-store" });
    if (!res.ok) throw new Error("No se pudo cargar products.json");
    return res.json();
  }
  // Server-side/build-time: use static import
  return productsDataStatic as { products: Product[]; categories: Category[] };
}

export async function getProducts(): Promise<Product[]> {
  const data = await fetchProductsData();
  return data.products as Product[];
}

export async function getCategories(): Promise<Category[]> {
  const data = await fetchProductsData();
  return data.categories as Category[];
}

export async function getProductById(id: string): Promise<Product | undefined> {
  const products = await getProducts();
  return products.find((p) => p.id === id);
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  const products = await getProducts();
  return products.filter((p) => p.category === category);
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const products = await getProducts();
  return products.filter((p) => p.featured);
}

export async function getNewProducts(): Promise<Product[]> {
  const products = await getProducts();
  return products.filter((p) => p.isNew);
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
