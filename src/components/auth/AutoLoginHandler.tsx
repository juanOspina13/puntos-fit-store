"use client";

import { useEffect, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { getUserProfileWithToken } from "@/services/auth-service";

/**
 * Componente invisible que detecta el query param `userToken` en la URL.
 * Si está presente y el usuario no tiene sesión activa, lo loguea
 * automáticamente obteniendo su perfil con ese token.
 *
 * Uso: incluirlo en cualquier página donde se quiera permitir auto-login.
 * Ejemplo de URL: /?userToken=abc123
 */
export default function AutoLoginHandler() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { login, isAuthenticated, isLoading } = useAuth();
  const hasRun = useRef(false);

  useEffect(() => {
    if (isLoading || hasRun.current) return;

    const token = searchParams.get("userToken");
    if (!token || isAuthenticated) return;

    hasRun.current = true;

    (async () => {
      try {
        // Guardamos el token primero para que las llamadas internas funcionen
        localStorage.setItem("user-token", JSON.stringify(token));

        const profile = await getUserProfileWithToken(token);
        login(token, profile);

        // Limpiar el query param de la URL sin recargar la página
        const url = new URL(window.location.href);
        url.searchParams.delete("userToken");
        router.replace(url.pathname + url.search, { scroll: false });
      } catch (error) {
        console.error("Auto-login con userToken falló:", error);
        // Limpiar token inválido
        localStorage.removeItem("user-token");
      }
    })();
  }, [searchParams, isAuthenticated, isLoading, login, router]);

  return null;
}
