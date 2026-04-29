import { api } from "./api";
import type { Subscription } from "@/types";

export async function getSubscriptions(params?: Record<string, string>): Promise<Subscription[]> {
  try {
    return await api.get<Subscription[]>("/subscriptions", params);
  } catch (error) {
    console.error("Error fetching subscriptions:", error);
    return [];
  }
}

export async function getSubscriptionById(id: string): Promise<Subscription | null> {
  try {
    return await api.get<Subscription>(`/subscriptions/${id}`);
  } catch (error) {
    console.error("Error fetching subscription:", error);
    return null;
  }
}

export async function getSubscriptionsByObjetivo(objetivo: string): Promise<Subscription[]> {
  return getSubscriptions({ objetivo });
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
        count: 1,
      });
    }
  });

  return Array.from(objetivosMap.entries()).map(([id, data]) => ({
    id,
    ...data,
  }));
}
