/**
 * Formatea un valor numérico como moneda colombiana (COP) sin decimales,
 * usando "." como separador de miles.
 *
 * Ejemplo: 1234567 -> "$ 1.234.567"
 */
export function formatCurrency(value: number | string | null | undefined): string {
  const num = typeof value === "number" ? value : Number(value);
  const safe = Number.isFinite(num) ? num : 0;
  return safe.toLocaleString("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}
