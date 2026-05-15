"use client";

import { useEffect, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { getUserProfileWithToken } from "@/services/auth-service";
import { persistAuthToken } from "@/app/actions/session";

/**
 * Componente invisible que detecta los query params `tk` o `userToken` en la
 * URL. Si alguno está presente y el usuario no tiene sesión activa, lo loguea
 * automáticamente:
 *  1. Obtiene el perfil con ese token.
 *  2. Lo guarda en el AuthContext + localStorage (cliente).
 *  3. Persiste el token en una cookie httpOnly via server action, para que
 *     las navegaciones a otras páginas (renderizadas en el servidor) también
 *     vean al usuario autenticado.
 *  4. Limpia el query param de la URL.
 *
 * Uso: incluirlo en un layout (idealmente uno alto en el árbol) para que
 * funcione sin importar a qué página llegue el usuario.
 * Ejemplos de URL: /?tk=abc123 · /products?userToken=abc123
 */
export default function AutoLoginHandler() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { login, isAuthenticated, isLoading } = useAuth();
  const hasRun = useRef(false);

  useEffect(() => {
    if (isLoading || hasRun.current) return;

    const token = searchParams.get("tk") ?? searchParams.get("userToken");
    if (!token) return;

    // Si ya estamos autenticados, solo limpiamos el query param para evitar
    // re-loguear o que el token quede expuesto en la URL.
    if (isAuthenticated) {
      hasRun.current = true;
      const url = new URL(window.location.href);
      url.searchParams.delete("tk");
      url.searchParams.delete("userToken");
      router.replace(url.pathname + url.search, { scroll: false });
      // Aun así, persistimos en cookie por si el server aún no la tiene.
      persistAuthToken(token).catch(() => {});
      return;
    }

    hasRun.current = true;

    (async () => {
      try {
        // Guardamos el token primero para que las llamadas internas funcionen
        localStorage.setItem("user-token", JSON.stringify(token));

        const profile = await getUserProfileWithToken(token);
        login(token, profile);

        // Persistir el token en cookie httpOnly para que el server lo vea en
        // las siguientes navegaciones (Header, getServerUser, etc.).
        try {
          await persistAuthToken(token);
        } catch (cookieError) {
          console.error(
            "No se pudo persistir la cookie de sesión:",
            cookieError,
          );
        }

        // Limpiar los query params de la URL sin recargar la página
        const url = new URL(window.location.href);
        url.searchParams.delete("tk");
        url.searchParams.delete("userToken");
        router.replace(url.pathname + url.search, { scroll: false });
      } catch (error) {
        console.error("Auto-login con token falló:", error);
        // Limpiar token inválido
        localStorage.removeItem("user-token");
      }
    })();
  }, [searchParams, isAuthenticated, isLoading, login, router]);

  return null;
}
