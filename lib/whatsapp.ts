const DEFAULT_WHATSAPP_NUMBER = "22890000000";

export function buildWhatsAppUrl(message: string): string {
  const configuredNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.trim();
  const number = (configuredNumber || DEFAULT_WHATSAPP_NUMBER).replace(
    /\D/g,
    "",
  );

  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
