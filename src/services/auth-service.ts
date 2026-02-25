import { getEnvironment } from "@/config/environment";
import type { LoginUser, UserProfile } from "@/types/auth";

const getTokenHeaders = (): Record<string, string> => {
  let unparsedToken = localStorage.getItem("user-token");
  if (!unparsedToken) {
    unparsedToken = '" "';
  }
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${JSON.parse(unparsedToken)}`,
  };
};

/**
 * Login con email y contraseña.
 * Envía credenciales en headers tal como la API del portal lo espera.
 */
export const loginRequest = async (
  user: LoginUser
): Promise<{ token: string }> => {
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
    throw new Error("Credenciales inválidas");
  }

  return res.json();
};

/**
 * Login SSO (Single Sign-On) solo con email.
 */
export const loginSSORequest = async (
  email: string
): Promise<{ token: string }> => {
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
    throw new Error("Error en autenticación SSO");
  }

  return res.json();
};

/**
 * Obtiene el perfil del usuario autenticado.
 */
export const getUserProfile = async (): Promise<UserProfile> => {
  const env = getEnvironment();

  const res = await fetch(`${env.baseUrl}usuario/current/user`, {
    method: "GET",
    headers: getTokenHeaders(),
  });

  if (!res.ok) {
    throw new Error("Error al obtener perfil de usuario");
  }

  return res.json();
};

/**
 * Cierra sesión eliminando datos del storage.
 */
export const logoutUser = () => {
  localStorage.removeItem("user-token");
  localStorage.removeItem("user-profile");
  sessionStorage.removeItem("loggedIn");
};
