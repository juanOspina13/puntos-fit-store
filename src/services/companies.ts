import { api } from "./api";
import type { Company } from "@/types";

export async function getCompanies(): Promise<Company[]> {
  try {
    return await api.get<Company[]>("/companies");
  } catch (error) {
    console.error("Error fetching companies:", error);
    return [];
  }
}

export async function getCompanyBySlug(slug: string): Promise<Company | null> {
  try {
    const companies = await api.get<Company[]>("/companies", { slug });
    return companies[0] ?? null;
  } catch (error) {
    console.error("Error fetching company:", error);
    return null;
  }
}
