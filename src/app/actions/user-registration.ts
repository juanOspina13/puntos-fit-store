"use server";

import { revalidatePath } from "next/cache";
import {
  userRegistrationSchema,
  referralCodeSchema,
  type UserRegistrationData,
} from "@/lib/validations/user-registration";

export interface RegistrationResponse {
  success: boolean;
  message?: string;
  userId?: number;
  token?: string;
  error?: string;
  fieldErrors?: Record<string, string[]>;
}

/**
 * Server action para registrar una nueva solicitud de acceso de usuario
 */
export async function registerUserRequestAction(
  data: unknown
): Promise<RegistrationResponse> {
  try {
    // Validar datos con Zod
    const validationResult = userRegistrationSchema.safeParse(data);

    if (!validationResult.success) {
      const fieldErrors = validationResult.error.flatten().fieldErrors;
      const errorEntries = Object.entries(fieldErrors);
      const firstError = errorEntries.length > 0 
        ? (errorEntries[0][1] as string[])[0] 
        : undefined;

      return {
        success: false,
        error: firstError || "Datos de registro inválidos",
        fieldErrors: fieldErrors as Record<string, string[]>,
      };
    }

    const validatedData = validationResult.data;

    // Generar cédula aleatoria si no se proporciona
    const cedula =
      validatedData.cedula || String(Math.floor(Math.random() * 899999 + 100000));

    // Preparar datos para enviar al backend
    const requestData = {
      nombre: validatedData.nombre.trim(),
      cedula: cedula,
      telefono: validatedData.telefono,
      email: validatedData.email,
      username: validatedData.email,
      password: validatedData.password || validatedData.email,
      password_assigned: !!validatedData.password,
      acepta_contacto: validatedData.aceptaContacto,
      acepta_politica: validatedData.aceptaPolitica,
      fuente: validatedData.fuente || "web",
      referido_por: validatedData.referidoPor,
    };

    // Aquí iría la llamada a tu API backend
    // Por ahora, simulamos el registro
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/usuarios/solicituds`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));

      if (response.status === 409) {
        return {
          success: false,
          error: "El correo electrónico o nombre de usuario ya está registrado",
        };
      }

      return {
        success: false,
        error: errorData.message || "Error al procesar la solicitud de registro",
      };
    }

    const result = await response.json();

    // Crear notificación para administradores
    await createNotificationForAdmins({
      nombre: validatedData.nombre,
      telefono: validatedData.telefono,
    });

    // Revalidar rutas relevantes
    revalidatePath("/");
    revalidatePath("/login");

    return {
      success: true,
      message: "Solicitud de registro enviada exitosamente",
      userId: result.id,
      token: result.token,
    };
  } catch (error) {
    console.error("Error in registerUserRequestAction:", error);
    return {
      success: false,
      error: "Error al conectar con el servidor. Por favor, intenta de nuevo.",
    };
  }
}

/**
 * Server action para crear notificación a administradores
 */
async function createNotificationForAdmins(data: {
  nombre: string;
  telefono: string;
}): Promise<void> {
  try {
    const message = `${data.nombre} acaba de registrarse. Su número de celular es ${data.telefono}`;
    
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/notificaciones`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        es: message,
        en: `${data.nombre} requested access`,
        tipo: "nuevo_registro",
      }),
    });
  } catch (error) {
    console.error("Error creating notification:", error);
    // No lanzamos el error para no interrumpir el registro
  }
}

/**
 * Server action para validar código de referido
 */
export async function validateReferralCodeAction(
  code: unknown
): Promise<{ valid: boolean; userName?: string; error?: string }> {
  try {
    // Validar con Zod
    const validationResult = referralCodeSchema.safeParse(code);

    if (!validationResult.success) {
      return {
        valid: false,
        error: validationResult.error.issues[0]?.message || "Código inválido",
      };
    }

    const validatedCode = validationResult.data;

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/usuarios/validar-referido/${validatedCode}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      return { valid: false, error: "Código de referido no válido" };
    }

    const result = await response.json();

    return {
      valid: true,
      userName: result.nombre,
    };
  } catch (error) {
    console.error("Error validating referral code:", error);
    return { valid: false, error: "Error al validar el código" };
  }
}
