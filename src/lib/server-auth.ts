import { cache } from "react";
import { cookies, headers } from "next/headers";
import { getUserProfileWithToken } from "@/services/auth-service";
import type { UserProfile } from "@/types/auth";

/**
 * Cached function to get user profile by token.
 * This ensures the same token doesn't get validated multiple times in a single request.
 */
const getCachedUserProfile = cache(async (token: string): Promise<UserProfile | null> => {
  try {
    const userData = await getUserProfileWithToken(token);
    return userData;
  } catch (error) {
    console.error("Error getting user profile for token:", error);
    return null;
  }
});

/**
 * Server-side authentication context using React cache.
 * This allows sharing user data across server components in a single request.
 * 
 * Usage in any server component:
 * ```
 * const user = await getServerUser();
 * if (user) {
 *   console.log("Authenticated as:", user.nombre);
 * }
 * ```
 */
export const getServerUser = cache(async (tokenOverride?: string): Promise<UserProfile | null> => {
  try {
    // If a token is provided directly, use it (for query param tokens)
    if (tokenOverride) {
      return await getCachedUserProfile(tokenOverride);
    }

    // Try to get token from cookies first
    const cookieStore = await cookies();
    const tokenFromCookie = cookieStore.get("user-token")?.value;
    
    if (tokenFromCookie) {
      return await getCachedUserProfile(tokenFromCookie);
    }

    // Fallback: check if there's a token in headers (for API requests)
    const headersList = await headers();
    const authHeader = headersList.get("authorization");
    
    if (authHeader?.startsWith("Bearer ")) {
      const token = authHeader.substring(7);
      return await getCachedUserProfile(token);
    }

    return null;
  } catch (error) {
    console.error("Error getting server user:", error);
    return null;
  }
});

/**
 * Server-side function to set the authentication token in cookies.
 * Call this from a Server Action or Route Handler.
 */
export async function setServerAuthToken(token: string) {
  const cookieStore = await cookies();
  cookieStore.set("user-token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
  });
}

/**
 * Server-side function to clear the authentication token.
 */
export async function clearServerAuthToken() {
  const cookieStore = await cookies();
  cookieStore.delete("user-token");
}
