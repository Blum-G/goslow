export const SHOW_PRICES =
  process.env.NEXT_PUBLIC_SHOW_PRICES === "true";

export const IS_INDEXING_ENABLED =
  process.env.NEXT_PUBLIC_INDEXING === "true";

export const NUMERO_WHATSAPP_PROVISOIRE = "22890000000";

export const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || NUMERO_WHATSAPP_PROVISOIRE;

export function verifierGardeFouIndexation() {
  if (IS_INDEXING_ENABLED && WHATSAPP_NUMBER === NUMERO_WHATSAPP_PROVISOIRE) {
    throw new Error(
      "Remplace le numéro provisoire avant d'ouvrir l'indexation",
    );
  }
}
