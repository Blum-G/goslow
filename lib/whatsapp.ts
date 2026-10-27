import { WHATSAPP_NUMBER } from "./config";

export function buildWhatsAppUrl(message: string): string {
  const number = WHATSAPP_NUMBER.replace(/\D/g, "");
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
