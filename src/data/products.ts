import type { Product, Category, Subscription } from "@/types";

// For build-time (server) - import JSON directly
import productsDataStatic from "../../public/data/products.json";

// Check if we're in browser
const isBrowser = typeof window !== "undefined";

// Fetch products.json at runtime (client) or use static import (server/build)
async function fetchProductsData(): Promise<{ products: Product[]; categories: Category[]; subscriptions: Subscription[] }> {
  if (isBrowser) {
    // Client-side: fetch from public folder (allows runtime updates)
    const res = await fetch("/data/products.json", { cache: "no-store" });
    if (!res.ok) throw new Error("No se pudo cargar products.json");
    return res.json();
  }
  // Server-side/build-time: use static import
  return productsDataStatic as { products: Product[]; categories: Category[]; subscriptions: Subscription[] };
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
  const featured = products.filter((p) => p.featured);
  if (featured.length > 0) return featured;
  return products.slice(0, 8);
}

export async function getNewProducts(): Promise<Product[]> {
  const products = await getProducts();
  return products.filter((p) => p.isNew);
}

export async function getSubscriptions(): Promise<Subscription[]> {
  const data = await fetchProductsData();
  return data.subscriptions as Subscription[];
}

export async function getSubscriptionsByObjective(objetivo: string): Promise<Subscription[]> {
  const subscriptions = await getSubscriptions();
  return subscriptions.filter((s) => s.objetivo === objetivo);
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

// Subscription functions
export async function getSubscriptionById(id: string): Promise<Subscription | undefined> {
  const subscriptions = await getSubscriptions();
  return subscriptions.find((s) => s.id === id);
}

export async function getSubscriptionsByObjetivo(objetivo: string): Promise<Subscription[]> {
  const subscriptions = await getSubscriptions();
  return subscriptions.filter((s) => s.objetivo === objetivo);
}

export async function getObjetivos(): Promise<{ id: string; label: string; icon: string; count: number }[]> {
  const subscriptions = await getSubscriptions();
  const objetivosMap = new Map<string, { label: string; icon: string; count: number }>();
  
  subscriptions.forEach((sub) => {
    if (objetivosMap.has(sub.objetivo)) {
      const existing = objetivosMap.get(sub.objetivo)!;
      existing.count++;
    } else {
      objetivosMap.set(sub.objetivo, {
        label: sub.objetivoLabel,
        icon: sub.icon,
        count: 1
      });
    }
  });

  return Array.from(objetivosMap.entries()).map(([id, data]) => ({
    id,
    label: data.label,
    icon: data.icon,
    count: data.count
  }));
}
