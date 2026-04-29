"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
  loginRequest,
  loginSSORequest,
} from "@/services/auth-service";
import { postLogin } from "@/lib/auth-helpers";

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
   */
  const handlePostLogin = useCallback(
    async (tokenData: { token: string }) => {
      await postLogin(tokenData, login, router);
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
      const tokenData = await loginRequest({ username: email, password });
      await handlePostLogin(tokenData);
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
      const tokenData = await loginSSORequest(email);
      await handlePostLogin(tokenData);
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
    postLogin: handlePostLogin,
  };
};
