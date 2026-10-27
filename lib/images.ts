import fs from "node:fs";
import path from "node:path";
import type { Dish } from "@/lib/data/types";

/**
 * Vérifie côté serveur (au build) si le fichier image d'un plat existe.
 * Ne doit jamais être importé dans un composant client.
 */
export function imagePlatExiste(slug: string): boolean {
  const chemin = path.join(process.cwd(), "public", "images", "plats", `${slug}.jpg`);
  return fs.existsSync(chemin);
}

/**
 * Retourne un dictionnaire slug → boolean pour tous les plats fournis.
 * À appeler dans les pages serveur, puis à passer aux composants client.
 */
export function getImagesPlatsDisponibles(
  dishes: Dish[],
): Record<string, boolean> {
  const resultat: Record<string, boolean> = {};
  for (const dish of dishes) {
    resultat[dish.slug] = imagePlatExiste(dish.slug);
  }
  return resultat;
}

/**
 * Vérifie si le poster du hero existe.
 */
export function heroPosterExiste(): boolean {
  const chemin = path.join(process.cwd(), "public", "video", "hero-poster.jpg");
  return fs.existsSync(chemin);
}
