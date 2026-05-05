import { z } from "zod";

// Esquemas de validación con Zod
export const userRegistrationSchema = z.object({
  nombre: z
    .string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(100, "El nombre no puede exceder 100 caracteres")
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, "El nombre solo puede contener letras y espacios"),
  cedula: z
    .string()
    .optional()
    .refine(
      (val: string | undefined) => !val || /^\d{6,15}$/.test(val),
      "La cédula debe contener entre 6 y 15 dígitos"
    ),
  telefono: z
    .string()
    .min(10, "El teléfono debe tener al menos 10 dígitos")
    .max(15, "El teléfono no puede exceder 15 dígitos")
    .regex(/^\d+$/, "El teléfono solo puede contener números"),
  email: z
    .string()
    .email("El email no es válido")
    .toLowerCase()
    .max(255, "El email no puede exceder 255 caracteres"),
  password: z
    .string()
    .max(100, "La contraseña no puede exceder 100 caracteres")
    .optional()
    .or(z.literal("")),
  referidoPor: z
    .string()
    .max(50, "El código de referido no puede exceder 50 caracteres")
    .optional()
    .or(z.literal("")),
  aceptaPolitica: z
    .boolean()
    .refine((val: boolean) => val === true, "Debes aceptar las políticas de privacidad"),
  aceptaContacto: z.boolean(),
  fuente: z.string().optional().default("web"),
});

export const referralCodeSchema = z
  .string()
  .max(50, "El código de referido no puede exceder 50 caracteres");

// Tipos inferidos de los esquemas
export type UserRegistrationData = z.infer<typeof userRegistrationSchema>;
