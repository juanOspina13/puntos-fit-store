"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
  loginRequest,
  loginSSORequest,
  getUserProfile,
} from "@/services/auth-service";

export const useLogin = () => {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isFormValid = email.length > 0 && password.length > 0 && email.includes("@");

  /**
   * Flujo post-login compartido: guarda token, obtiene perfil,
   * dispara contexto y redirige al home.
   */
  const postLogin = useCallback(
    async (tokenData: { token: string }) => {
      localStorage.setItem("user-token", JSON.stringify(tokenData.token));
      const userData = await getUserProfile();
      login(tokenData.token, userData);
      router.push("/");
    },
    [login, router]
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
      await postLogin(tokenData);
    } catch (err) {
      console.error("Login error:", err);
      setError(
        "Credenciales inválidas. Por favor, verifica tu email y contraseña."
      );
    } finally {
      setLoading(false);
    }
  }, [email, password, isFormValid, postLogin]);

  /**
   * Login SSO solo con email
   */
  const handleSSOLogin = useCallback(async () => {
    if (!email || !email.includes("@")) return;

    setLoading(true);
    setError("");

    try {
      const tokenData = await loginSSORequest(email);
      await postLogin(tokenData);
    } catch (err) {
      console.error("SSO Login error:", err);
      setError("Error al iniciar sesión con SSO. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  }, [email, postLogin]);

  /**
   * Permite enviar el form presionando Enter
   */
  const handleKeyPress = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === "Enter" && isFormValid) {
        handleSubmit();
      }
    },
    [isFormValid, handleSubmit]
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
