export function formatPrice(value: number): string {
  const formatted = new Intl.NumberFormat("fr-FR", {
    maximumFractionDigits: 0,
  })
    .format(value)
    .replace(/\s/g, "\u00a0");

  return `${formatted}\u00a0FCFA`;
}
