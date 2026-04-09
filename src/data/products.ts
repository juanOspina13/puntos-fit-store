import type { Product, Category, Subscription } from "@/types";
import {
  getProducts as fetchProducts,
  getProductById as fetchProductById,
  getProductsByCategory as fetchProductsByCategory,
  searchProducts as fetchSearchProducts,
} from "@/services/products";
import {
  getCategories as fetchCategories,
} from "@/services/categories";
import {
  getSubscriptions as fetchSubscriptions,
  getSubscriptionById as fetchSubscriptionById,
  getSubscriptionsByObjetivo as fetchSubscriptionsByObjetivo,
  getObjetivos as fetchObjetivos,
} from "@/services/subscriptions";

export async function getProducts(): Promise<Product[]> {
  return fetchProducts();
}

export async function getCategories(): Promise<Category[]> {
  return fetchCategories();
}

export async function getProductById(id: string): Promise<Product | undefined> {
  const product = await fetchProductById(id);
  return product ?? undefined;
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  return fetchProductsByCategory(category);
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const products = await fetchProducts();
  const featured = products.filter((p) => p.featured);
  if (featured.length > 0) return featured;
  return products.slice(0, 8);
}

export async function getNewProducts(): Promise<Product[]> {
  const products = await fetchProducts();
  return products.filter((p) => p.isNew);
}

export async function getSubscriptions(): Promise<Subscription[]> {
  return fetchSubscriptions();
}

export async function getSubscriptionsByObjective(objetivo: string): Promise<Subscription[]> {
  return fetchSubscriptionsByObjetivo(objetivo);
}

export async function searchProducts(query: string): Promise<Product[]> {
  return fetchSearchProducts(query);
}

export async function getSubscriptionById(id: string): Promise<Subscription | undefined> {
  const sub = await fetchSubscriptionById(id);
  return sub ?? undefined;
}

export async function getSubscriptionsByObjetivo(objetivo: string): Promise<Subscription[]> {
  return fetchSubscriptionsByObjetivo(objetivo);
}

export async function getObjetivos(): Promise<{ id: string; label: string; icon: string; count: number }[]> {
  return fetchObjetivos();
}
