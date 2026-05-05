"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
  loginAction,
  loginSSOAction,
  getUserProfileAction,
} from "@/app/actions/auth";

export const useLogin = () => {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isFormValid =
    email.length > 0 && password.length > 0 && email.includes("@");

  /**
   * Wrapper del flujo post-login compartido.
   * Guarda el token, obtiene el perfil y redirige.
   */
  const handlePostLogin = useCallback(
    async (token: string) => {
      // Obtener perfil del usuario
      const profileResult = await getUserProfileAction(token);
      
      if (profileResult.success) {
        login(token, profileResult.profile);
        router.push("/");
      } else {
        throw new Error(profileResult.error);
      }
    },
    [login, router],
  );

  /**
   * Login con email + contraseña
   */
  const handleSubmit = useCallback(async () => {
    if (!isFormValid) return;

    setLoading(true);
    setError("");

    try {
      const result = await loginAction({ username: email, password });
      
      if (result.success) {
        await handlePostLogin(result.token);
      } else {
        setError(result.error);
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(
        "Credenciales inválidas. Por favor, verifica tu email y contraseña.",
      );
    } finally {
      setLoading(false);
    }
  }, [email, password, isFormValid, handlePostLogin]);

  /**
   * Login SSO solo con email
   */
  const handleSSOLogin = useCallback(async () => {
    if (!email || !email.includes("@")) return;

    setLoading(true);
    setError("");

    try {
      const result = await loginSSOAction(email);
      
      if (result.success) {
        await handlePostLogin(result.token);
      } else {
        setError(result.error);
      }
    } catch (err) {
      console.error("SSO Login error:", err);
      setError("Error al iniciar sesión con SSO. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  }, [email, handlePostLogin]);

  /**
   * Permite enviar el form presionando Enter
   */
  const handleKeyPress = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === "Enter" && isFormValid) {
        handleSubmit();
      }
    },
    [isFormValid, handleSubmit],
  );

  return {
    email,
    setEmail,
    password,
    setPassword,
    showPassword,
    setShowPassword,
    loading,
    error,
    setError,
    isFormValid,
    handleSubmit,
    handleSSOLogin,
    handleKeyPress,
  };
};
