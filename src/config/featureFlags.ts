/**
 * Feature Flags Configuration
 * 
 * Controla la visibilidad de features en la aplicación.
 */

export const featureFlags = {
  /**
   * Habilita o deshabilita la funcionalidad de paquetes
   * 
   * Cuando está deshabilitado:
   * - No se muestran links de paquetes en el header/footer
   * - No se muestran secciones de paquetes en la página principal
   * - La página /paquetes retorna 404
   * - Las API routes de paquetes retornan 404
   */
  packages: false,

  /**
   * Habilita o deshabilita la funcionalidad de suscripciones
   * 
   * Cuando está deshabilitado:
   * - No se muestran links de suscripciones en el header/footer
   * - No se muestran secciones de suscripciones en la página principal
   * - La página /suscripciones retorna 404
   * - Las API routes de suscripciones retornan 404
   */
  subscriptions: false,
} as const;

export type FeatureFlags = typeof featureFlags;
