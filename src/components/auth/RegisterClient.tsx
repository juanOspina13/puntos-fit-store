"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  User,
  Phone,
  Mail,
  Lock,
  Eye,
  EyeOff,
  CreditCard,
  UserPlus,
  ArrowLeft,
  Loader2,
  AlertCircle,
  CheckCircle2,
  Gift,
  Shield,
  Dumbbell,
} from "lucide-react";
import {
  registerUserRequestAction,
  validateReferralCodeAction,
  type RegistrationResponse,
} from "@/app/actions/user-registration";
import type { UserRegistrationData } from "@/lib/validations/user-registration";

export default function RegisterClient() {
  const router = useRouter();

  // Estados del formulario
  const [formData, setFormData] = useState<UserRegistrationData>({
    nombre: "",
    cedula: "",
    telefono: "",
    email: "",
    password: "",
    referidoPor: "",
    aceptaPolitica: false,
    aceptaContacto: false,
    fuente: "web",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [invitadoPorAlguien, setInvitadoPorAlguien] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
  const [referralValidation, setReferralValidation] = useState<{
    checking: boolean;
    valid: boolean;
    userName?: string;
  }>({ checking: false, valid: false });

  // Validaciones
  const isEmailValid = formData.email.includes("@");
  const isTelefonoValid = formData.telefono.length >= 10;
  const isFormValid =
    formData.nombre.trim().length >= 2 &&
    isEmailValid &&
    isTelefonoValid &&
    formData.aceptaPolitica;

  const handleInputChange = (field: keyof UserRegistrationData, value: any) => {
    setFormData((prev: UserRegistrationData) => ({ ...prev, [field]: value }));
    setError("");
    // Limpiar errores de campo específico
    setFieldErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[field as string];
      return newErrors;
    });
  };

  const validateReferralCode = async () => {
    if (!formData.referidoPor || formData.referidoPor.trim().length === 0) {
      setReferralValidation({ checking: false, valid: false });
      return;
    }

    setReferralValidation({ checking: true, valid: false });

    const result = await validateReferralCodeAction(formData.referidoPor);

    setReferralValidation({
      checking: false,
      valid: result.valid,
      userName: result.userName,
    });

    if (!result.valid) {
      setError(result.error || "Código de referido no válido");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormValid) {
      setError("Por favor completa todos los campos requeridos");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");
    setFieldErrors({});

    try {
      const result = await registerUserRequestAction(formData);

      if (result.success) {
        setSuccess(
          result.message ||
            "¡Registro exitoso! Serás redirigido en un momento..."
        );

        // Si viene con token, guardarlo y redirigir
        if (result.token) {
          localStorage.setItem("user-token", JSON.stringify(result.token));
          setTimeout(() => {
            router.push("/");
          }, 2000);
        } else {
          // Si no hay auto-login, redirigir a login después de un momento
          setTimeout(() => {
            router.push("/login");
          }, 3000);
        }
      } else {
        setError(result.error || "Error al procesar el registro");
        if (result.fieldErrors) {
          setFieldErrors(result.fieldErrors);
        }
      }
    } catch (err) {
      console.error("Registration error:", err);
      setError("Error inesperado. Por favor, intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

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

      <div className="w-full max-w-2xl relative z-10">
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
              Crear <span className="text-[#cee741]">Cuenta</span>
            </h1>
            <p className="text-gray-400 text-base">
              Completa el formulario para unirte a la comunidad
            </p>
            <div className="w-20 h-1.5 bg-[#cee741] mx-auto rounded-full mt-4" />
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-700/50 p-8">
          {/* Success Message */}
          {success && (
            <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4 mb-6 flex items-center gap-3 animate-fade-in">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4 text-green-400" />
              </div>
              <span className="text-green-300 text-sm font-medium">
                {success}
              </span>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 mb-6 flex items-center gap-3 animate-fade-in">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center">
                <AlertCircle className="w-4 h-4 text-red-400" />
              </div>
              <span className="text-red-300 text-sm font-medium">{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Nombre */}
            <div className="space-y-2">
              <label
                htmlFor="nombre"
                className="flex items-center gap-2 text-sm font-medium text-gray-300"
              >
                <User className="w-4 h-4 text-gray-400" />
                Nombre Completo
                <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                id="nombre"
                value={formData.nombre}
                onChange={(e) => handleInputChange("nombre", e.target.value)}
                className={`w-full px-4 py-3 bg-gray-900/60 border text-gray-100 rounded-xl
                  focus:outline-none focus:ring-2 focus:ring-[#cee741]/50 focus:border-[#cee741]
                  placeholder-gray-500 transition-all duration-200 text-sm
                  ${fieldErrors.nombre ? "border-red-500" : "border-gray-600"}`}
                placeholder="Tu nombre completo"
                required
              />
              {fieldErrors.nombre && (
                <p className="text-xs text-red-400 flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3 h-3" />
                  {fieldErrors.nombre[0]}
                </p>
              )}
            </div>

            {/* Cédula y Teléfono */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label
                  htmlFor="cedula"
                  className="flex items-center gap-2 text-sm font-medium text-gray-300"
                >
                  <CreditCard className="w-4 h-4 text-gray-400" />
                  Cédula
                  <span className="text-gray-500 text-xs">(opcional)</span>
                </label>
                <input
                  type="text"
                  id="cedula"
                  value={formData.cedula}
                  onChange={(e) => handleInputChange("cedula", e.target.value)}
                  className={`w-full px-4 py-3 bg-gray-900/60 border text-gray-100 rounded-xl
                    focus:outline-none focus:ring-2 focus:ring-[#cee741]/50 focus:border-[#cee741]
                    placeholder-gray-500 transition-all duration-200 text-sm
                    ${fieldErrors.cedula ? "border-red-500" : "border-gray-600"}`}
                  placeholder="Número de cédula"
                />
                {fieldErrors.cedula && (
                  <p className="text-xs text-red-400 flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3 h-3" />
                    {fieldErrors.cedula[0]}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="telefono"
                  className="flex items-center gap-2 text-sm font-medium text-gray-300"
                >
                  <Phone className="w-4 h-4 text-gray-400" />
                  Celular
                  <span className="text-red-400">*</span>
                </label>
                <input
                  type="tel"
                  id="telefono"
                  value={formData.telefono}
                  onChange={(e) =>
                    handleInputChange("telefono", e.target.value)
                  }
                  className={`w-full px-4 py-3 bg-gray-900/60 border text-gray-100 rounded-xl
                    focus:outline-none focus:ring-2 focus:ring-[#cee741]/50 focus:border-[#cee741]
                    placeholder-gray-500 transition-all duration-200 text-sm
                    ${fieldErrors.telefono ? "border-red-500" : "border-gray-600"}`}
                  placeholder="3001234567"
                  required
                />
                {fieldErrors.telefono ? (
                  <p className="text-xs text-red-400 flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3 h-3" />
                    {fieldErrors.telefono[0]}
                  </p>
                ) : (
                  formData.telefono &&
                  !isTelefonoValid && (
                    <p className="text-xs text-red-400 flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3 h-3" />
                      Ingresa un teléfono válido (mínimo 10 dígitos)
                    </p>
                  )
                )}
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="flex items-center gap-2 text-sm font-medium text-gray-300"
              >
                <Mail className="w-4 h-4 text-gray-400" />
                Correo Electrónico
                <span className="text-red-400">*</span>
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className={`w-full px-4 py-3 bg-gray-900/60 border text-gray-100 rounded-xl
                  focus:outline-none focus:ring-2 focus:ring-[#cee741]/50 focus:border-[#cee741]
                  placeholder-gray-500 transition-all duration-200 text-sm
                  ${fieldErrors.email ? "border-red-500" : "border-gray-600"}`}
                placeholder="tu@correo.com"
                required
              />
              {fieldErrors.email ? (
                <p className="text-xs text-red-400 flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3 h-3" />
                  {fieldErrors.email[0]}
                </p>
              ) : (
                formData.email &&
                !isEmailValid && (
                  <p className="text-xs text-red-400 flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3 h-3" />
                    Ingresa un correo válido
                  </p>
                )
              )}
            </div>

            {/* Contraseña */}
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="flex items-center gap-2 text-sm font-medium text-gray-300"
              >
                <Lock className="w-4 h-4 text-gray-400" />
                Contraseña
                <span className="text-gray-500 text-xs">(opcional)</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={formData.password}
                  onChange={(e) =>
                    handleInputChange("password", e.target.value)
                  }
                  className={`w-full px-4 py-3 pr-12 bg-gray-900/60 border text-gray-100 rounded-xl
                    focus:outline-none focus:ring-2 focus:ring-[#cee741]/50 focus:border-[#cee741]
                    placeholder-gray-500 transition-all duration-200 text-sm
                    ${fieldErrors.password ? "border-red-500" : "border-gray-600"}`}
                  placeholder="Tu contraseña"
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {fieldErrors.password && (
                <p className="text-xs text-red-400 flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3 h-3" />
                  {fieldErrors.password[0]}
                </p>
              )}
            </div>

            {/* Referido Toggle */}
            <div className="bg-gray-900/40 rounded-xl p-4 border border-gray-700/50">
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={invitadoPorAlguien}
                    onChange={(e) => setInvitadoPorAlguien(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#cee741]/50 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#cee741]"></div>
                </div>
                <div className="flex items-center gap-2">
                  <Gift className="w-4 h-4 text-[#cee741]" />
                  <span className="text-sm text-gray-300">
                    ¿Alguien te invitó a usar la aplicación?
                  </span>
                </div>
              </label>
            </div>

            {/* Código de referido */}
            {invitadoPorAlguien && (
              <div className="space-y-2 animate-fade-in">
                <label
                  htmlFor="referidoPor"
                  className="flex items-center gap-2 text-sm font-medium text-gray-300"
                >
                  <Gift className="w-4 h-4 text-gray-400" />
                  Código de Referido
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="referidoPor"
                    value={formData.referidoPor}
                    onChange={(e) =>
                      handleInputChange("referidoPor", e.target.value)
                    }
                    onBlur={validateReferralCode}
                    className="w-full px-4 py-3 bg-gray-900/60 border border-gray-600 text-gray-100 rounded-xl
                      focus:outline-none focus:ring-2 focus:ring-[#cee741]/50 focus:border-[#cee741]
                      placeholder-gray-500 transition-all duration-200 text-sm"
                    placeholder="Ingresa el código de referido"
                  />
                  {referralValidation.checking && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      <Loader2 className="w-5 h-5 text-[#cee741] animate-spin" />
                    </div>
                  )}
                </div>
                {referralValidation.valid && referralValidation.userName && (
                  <p className="text-xs text-green-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    Código válido - Referido por: {referralValidation.userName}
                  </p>
                )}
              </div>
            )}

            {/* Políticas */}
            <div className="space-y-3 pt-2">
              <label className="flex items-start gap-3 cursor-pointer group">
                <div className="relative flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.aceptaPolitica}
                    onChange={(e) =>
                      handleInputChange("aceptaPolitica", e.target.checked)
                    }
                    className="w-5 h-5 text-[#cee741] bg-gray-900/60 border-gray-600 rounded focus:ring-[#cee741]/50 focus:ring-2"
                    required
                  />
                </div>
                <span className="text-sm text-gray-300 leading-tight">
                  Acepto las{" "}
                  <a
                    href="https://utils.gymconnect.com.co/politicaPrivacidad.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#cee741] hover:underline"
                  >
                    Políticas de privacidad
                  </a>
                  <span className="text-red-400 ml-1">*</span>
                </span>
              </label>

              <label className="flex items-start gap-3 cursor-pointer group">
                <div className="relative flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.aceptaContacto}
                    onChange={(e) =>
                      handleInputChange("aceptaContacto", e.target.checked)
                    }
                    className="w-5 h-5 text-[#cee741] bg-gray-900/60 border-gray-600 rounded focus:ring-[#cee741]/50 focus:ring-2"
                  />
                </div>
                <span className="text-sm text-gray-300 leading-tight">
                  Autorizo al equipo para que se pongan en contacto conmigo
                </span>
              </label>
            </div>

            {/* Botones */}
            <div className="space-y-3 pt-4">
              <button
                type="submit"
                disabled={!isFormValid || loading}
                className="w-full py-4 bg-[#cee741] text-gray-900 font-semibold rounded-xl
                  hover:bg-[#b5cc1a] disabled:bg-gray-700 disabled:text-gray-500 disabled:cursor-not-allowed
                  transition-all duration-200 flex items-center justify-center gap-2
                  shadow-lg shadow-[#cee741]/20 hover:shadow-[#cee741]/40"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Registrando...
                  </>
                ) : (
                  <>
                    <UserPlus className="w-5 h-5" />
                    Crear mi cuenta
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => router.back()}
                className="w-full py-3 bg-white/10 backdrop-blur-sm text-white rounded-xl font-medium
                  hover:bg-white/20 transition-all border border-white/20 flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Volver
              </button>
            </div>
          </form>

          {/* Footer con enlace a login */}
          <div className="mt-6 pt-6 border-t border-gray-700/50 text-center">
            <p className="text-sm text-gray-400">
              ¿Ya tienes una cuenta?{" "}
              <Link
                href="/login"
                className="text-[#cee741] hover:underline font-medium"
              >
                Inicia sesión aquí
              </Link>
            </p>
          </div>
        </div>

        {/* Security badge */}
        <div className="mt-6 flex items-center justify-center gap-2 text-gray-500 text-xs">
          <Shield className="w-4 h-4" />
          <span>Tus datos están protegidos y encriptados</span>
        </div>
      </div>
    </div>
  );
}
