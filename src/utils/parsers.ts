export function parseCurrency(value: string): number {
  const normalized = value.trim().replace(/\./g, "").replace(",", ".");

  return Number(normalized);
}