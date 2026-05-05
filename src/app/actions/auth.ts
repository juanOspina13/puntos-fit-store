"use server";

import { getEnvironment } from "@/config/environment";
import type { LoginUser, UserProfile } from "@/types/auth";

/**
 * Server action para login con email y contraseña.
 * Envía credenciales en headers tal como la API del portal lo espera.
 */
export async function loginAction(
  user: LoginUser
): Promise<{ success: true; token: string } | { success: false; error: string }> {
  try {
    const env = getEnvironment();

    const res = await fetch(`${env.baseUrl}login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        username: user.username,
        "X-Password": user.password,
      },
      body: JSON.stringify(user),
    });

    if (!res.ok) {
      return {
        success: false,
        error: "Credenciales inválidas. Por favor, verifica tu email y contraseña.",
      };
    }

    const data = await res.json();
    return { success: true, token: data.token };
  } catch (error) {
    console.error("Login error:", error);
    return {
      success: false,
      error: "Error al conectar con el servidor. Intenta de nuevo.",
    };
  }
}

/**
 * Server action para login SSO (Single Sign-On) solo con email.
 */
export async function loginSSOAction(
  email: string
): Promise<{ success: true; token: string } | { success: false; error: string }> {
  try {
    if (!email || !email.includes("@")) {
      return {
        success: false,
        error: "Por favor, ingresa un email válido.",
      };
    }

    const env = getEnvironment();

    const res = await fetch(`${env.baseUrl}usuarios/login_ssos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        username: email,
      },
      body: JSON.stringify({ username: email }),
    });

    if (!res.ok) {
      return {
        success: false,
        error: "Error al iniciar sesión con SSO. Intenta de nuevo.",
      };
    }

    const data = await res.json();
    return { success: true, token: data.token };
  } catch (error) {
    console.error("SSO Login error:", error);
    return {
      success: false,
      error: "Error al conectar con el servidor. Intenta de nuevo.",
    };
  }
}

/**
 * Server action para obtener el perfil del usuario usando un token.
 */
export async function getUserProfileAction(
  token: string
): Promise<{ success: true; profile: UserProfile } | { success: false; error: string }> {
  try {
    const env = getEnvironment();

    const res = await fetch(`${env.baseUrl}usuario/current/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      return {
        success: false,
        error: "Error al obtener perfil de usuario.",
      };
    }

    const profile = await res.json();
    return { success: true, profile };
  } catch (error) {
    console.error("Get profile error:", error);
    return {
      success: false,
      error: "Error al conectar con el servidor.",
    };
  }
}
