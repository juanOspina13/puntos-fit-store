"use client";

import Link from "next/link";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  LogIn,
  Loader2,
  AlertCircle,
  Shield,
  Dumbbell,
} from "lucide-react";
import { useLogin } from "@/hooks/useLogin";

export default function LoginPage() {
  const {
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
    handleKeyPress,
  } = useLogin();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#cee741]/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#cee741]/5 rounded-full blur-3xl" />
        <div className="absolute top-1/3 left-1/4 w-2 h-2 bg-[#cee741]/30 rounded-full" />
        <div className="absolute top-2/3 right-1/4 w-3 h-3 bg-[#cee741]/20 rounded-full" />
        <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-[#cee741]/25 rounded-full" />
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Header with logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block group">
            <div className="relative inline-block">
              <div className="w-20 h-20 bg-[#cee741] rounded-2xl flex items-center justify-center shadow-xl shadow-[#cee741]/20 mb-6 transform group-hover:scale-105 transition-transform duration-300">
                <Dumbbell className="text-gray-900 w-10 h-10" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-4 border-gray-900 shadow-sm" />
            </div>
          </Link>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-white tracking-tight">
              Puntos<span className="text-[#cee741]">Fit</span> Store
            </h1>
            <p className="text-gray-400 text-base">
              Inicia sesión para canjear tus puntos
            </p>
            <div className="w-20 h-1.5 bg-[#cee741] mx-auto rounded-full mt-4" />
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-700/50 p-8">
          {/* Error message */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 mb-6 flex items-center gap-3 animate-fade-in">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center">
                <AlertCircle className="w-4 h-4 text-red-400" />
              </div>
              <span className="text-red-300 text-sm font-medium">{error}</span>
            </div>
          )}

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
            className="space-y-6"
          >
            {/* Email field */}
            <div className="space-y-2">
              <label
                htmlFor="login-email"
                className="flex items-center gap-2 text-sm font-medium text-gray-300"
              >
                <Mail className="w-4 h-4 text-gray-400" />
                Correo Electrónico
              </label>
              <input
                id="login-email"
                type="email"
                autoComplete="email"
                placeholder="tu@correo.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError("");
                }}
                onKeyDown={handleKeyPress}
                className="w-full px-4 py-3 bg-gray-900/60 border border-gray-600 text-gray-100 rounded-xl
                  focus:outline-none focus:ring-2 focus:ring-[#cee741]/50 focus:border-[#cee741]
                  placeholder-gray-500 transition-all duration-200 text-sm"
              />
            </div>

            {/* Password field */}
            <div className="space-y-2">
              <label
                htmlFor="login-password"
                className="flex items-center gap-2 text-sm font-medium text-gray-300"
              >
                <Lock className="w-4 h-4 text-gray-400" />
                Contraseña
              </label>
              <div className="relative">
                <input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (error) setError("");
                  }}
                  onKeyDown={handleKeyPress}
                  className="w-full px-4 py-3 pr-12 bg-gray-900/60 border border-gray-600 text-gray-100 rounded-xl
                    focus:outline-none focus:ring-2 focus:ring-[#cee741]/50 focus:border-[#cee741]
                    placeholder-gray-500 transition-all duration-200 text-sm"
                />
                <button
                  type="button"
                  tabIndex={-1}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200 transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer text-gray-400">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-gray-600 bg-gray-900 text-[#cee741] focus:ring-[#cee741]/50 focus:ring-offset-0 accent-[#cee741]"
                />
                Recordarme
              </label>
              <button
                type="button"
                className="text-[#cee741] hover:text-[#b5cc1a] font-medium transition-colors hover:underline"
              >
                ¿Olvidaste tu contraseña?
              </button>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={!isFormValid || loading}
              className="w-full bg-[#cee741] hover:bg-[#b5cc1a] text-gray-900 font-semibold py-3.5 px-6 rounded-xl
                transition-all duration-300 transform hover:scale-[1.02]
                disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
                shadow-lg shadow-[#cee741]/20 hover:shadow-[#cee741]/40
                flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Ingresando...</span>
                </>
              ) : (
                <>
                  <span>Iniciar Sesión</span>
                  <LogIn className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-700" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-gray-800 px-3 text-gray-500">
                ¿Problemas para acceder?
              </span>
            </div>
          </div>

          <div className="text-center">
            <button className="text-[#cee741] hover:text-[#b5cc1a] text-sm font-semibold transition-colors hover:underline">
              Contacta soporte
            </button>
          </div>
        </div>

        {/* Security footer */}
        <div className="mt-6 space-y-4">
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-800/60 backdrop-blur-sm border border-gray-700/50">
              <Shield className="w-4 h-4 text-green-500" />
              <span className="text-xs font-medium text-gray-400">
                Conexión segura
              </span>
            </div>
          </div>
          <div className="text-center text-xs text-gray-600">
            © 2026 PuntosFit Store · Todos los derechos reservados
          </div>
        </div>
      </div>
    </div>
  );
}
