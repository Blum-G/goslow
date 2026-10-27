import type { Dish } from "./data/types";
import { SHOW_PRICES } from "./config";
import { formatPrice } from "./format";
import { buildWhatsAppUrl } from "./whatsapp";

export interface DonneesReservation {
  nom: string;
  telephone?: string;
  date: string;
  heure: string;
  personnes: number | string;
  platsSouhaites?: string;
  remarque?: string;
}

export function messageReservation(data: DonneesReservation): string {
  const lignes = [
    "Bonjour Go Slow, je souhaite réserver une table.",
    "",
    `Nom : ${data.nom.trim()}`,
  ];

  if (data.telephone && data.telephone.trim()) {
    lignes.push(`Téléphone : ${data.telephone.trim()}`);
  }

  lignes.push(`Date : ${data.date.trim()}, ${data.heure.trim()}`);
  lignes.push(`Personnes : ${data.personnes}`);

  if (data.platsSouhaites && data.platsSouhaites.trim()) {
    lignes.push(`Plats souhaités : ${data.platsSouhaites.trim()}`);
  }

  if (data.remarque && data.remarque.trim()) {
    lignes.push(`Remarque : ${data.remarque.trim()}`);
  }

  return lignes.join("\n");
}

export function messageCommandePlat(dish: Dish): string {
  const detailsPrix = SHOW_PRICES ? ` (${formatPrice(dish.price)})` : "";
  return [
    "Bonjour Go Slow, je souhaite commander :",
    `- 1 × ${dish.name}${detailsPrix}`,
  ].join("\n");
}

export function urlReservation(data: DonneesReservation): string {
  return buildWhatsAppUrl(messageReservation(data));
}

export function urlCommandePlat(dish: Dish): string {
  return buildWhatsAppUrl(messageCommandePlat(dish));
}
