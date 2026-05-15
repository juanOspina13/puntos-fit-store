"use server";

import { setServerAuthToken, clearServerAuthToken } from "@/lib/server-auth";

/**
 * Server action para guardar el token de sesión en una cookie httpOnly.
 * Se llama desde el cliente (por ejemplo desde AutoLoginHandler) cuando se
 * obtiene un token via `?tk=` o `?userToken=` en la URL, de modo que las
 * navegaciones siguientes (que se renderizan en el servidor) ya lo tengan
 * disponible.
 */
export async function persistAuthToken(token: string) {
  await setServerAuthToken(token);
}

/**
 * Server action para limpiar la cookie httpOnly de sesión.
 * Útil al hacer logout desde el cliente.
 */
export async function clearAuthToken() {
  await clearServerAuthToken();
}
