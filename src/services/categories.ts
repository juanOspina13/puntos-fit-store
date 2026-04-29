import { api } from "./api";
import type { Category } from "@/types";

export async function getCategories(): Promise<Category[]> {
  try {
    return await api.get<Category[]>("/categories");
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

export async function getCategoryById(id: string): Promise<Category | null> {
  try {
    return await api.get<Category>(`/categories/${id}`);
  } catch (error) {
    console.error("Error fetching category:", error);
    return null;
  }
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  try {
    return await api.get<Category>(`/categories/slug/${slug}`);
  } catch (error) {
    console.error("Error fetching category:", error);
    return null;
  }
}
