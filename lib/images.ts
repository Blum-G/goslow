import fs from "node:fs";
import path from "node:path";
import type { Dish } from "@/lib/data/types";
import { defaultDishes } from "@/lib/data/default-dishes";

/**
 * Table d'alias explicite pour associer un slug de plat
 * à un nom de fichier réel (sans extension) lorsque la normalisation automatique
 * ne suffit pas (par exemple une variation d'orthographe comme riz-au-gras / risaugras).
 */
export const ALIAS_IMAGES: Record<string, string> = {
  "riz-au-gras": "risaugras",
};

/**
 * Extensions d'images autorisées (insensible à la casse).
 */
const EXTENSIONS_VALIDE = new Set(["jpg", "jpeg", "png", "webp", "avif"]);

/**
 * Normalise un nom de fichier ou un slug :
 * - Passage en minuscules
 * - Suppression des accents (décomposition NFD)
 * - Suppression des tirets, underscores, espaces et caractères non alphanumériques
 */
export function normaliserNom(texte: string): string {
  return texte
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");
}

interface FichierPlat {
  nomOriginal: string;
  nomSansExt: string;
  nomNormalise: string;
  extension: string;
}

// Cache mémoïsé au niveau du build
let fichiersPlatsEnCache: FichierPlat[] | null = null;
let avertissementEmis = false;

/**
 * Lit une seule fois au build le dossier public/images/plats/
 */
function getFichiersPlats(): FichierPlat[] {
  if (fichiersPlatsEnCache !== null) {
    return fichiersPlatsEnCache;
  }

  const dossierPlats = path.join(process.cwd(), "public", "images", "plats");
  if (!fs.existsSync(dossierPlats)) {
    fichiersPlatsEnCache = [];
    return fichiersPlatsEnCache;
  }

  const entrees = fs.readdirSync(dossierPlats);
  const fichiers: FichierPlat[] = [];

  for (const entree of entrees) {
    if (entree === ".gitkeep" || entree.startsWith(".")) {
      continue;
    }

    const extMatch = entree.match(/\.([a-zA-Z0-9]+)$/);
    if (!extMatch) continue;

    const extension = extMatch[1].toLowerCase();
    if (!EXTENSIONS_VALIDE.has(extension)) continue;

    const nomSansExt = entree.slice(0, -extMatch[0].length);
    fichiers.push({
      nomOriginal: entree,
      nomSansExt,
      nomNormalise: normaliserNom(nomSansExt),
      extension,
    });
  }

  fichiersPlatsEnCache = fichiers;

  // Émission d'un avertissement au build pour repérer les fichiers non associés
  if (!avertissementEmis && process.env.NODE_ENV !== "test") {
    avertissementEmis = true;
    const slugsConnus = defaultDishes.map((d) => d.slug);
    const nonAssocies: string[] = [];

    for (const f of fichiers) {
      let associe = false;
      for (const slug of slugsConnus) {
        // Test alias
        const alias = ALIAS_IMAGES[slug];
        if (alias && (normaliserNom(alias) === f.nomNormalise || alias.toLowerCase() === f.nomSansExt.toLowerCase())) {
          associe = true;
          break;
        }
        // Test nom normalisé
        if (normaliserNom(slug) === f.nomNormalise) {
          associe = true;
          break;
        }
      }
      if (!associe) {
        nonAssocies.push(f.nomOriginal);
      }
    }

    if (nonAssocies.length > 0) {
      console.warn(
        `[Go Slow - Résolveur images] Avertissement : fichier(s) dans public/images/plats/ non associé(s) à un plat : ${nonAssocies.join(", ")}`,
      );
    }
  }

  return fichiersPlatsEnCache;
}

/**
 * Résout le chemin public de l'image pour un slug de plat donné :
 * 1. Alias explicite dans ALIAS_IMAGES
 * 2. Correspondance du nom normalisé
 * 3. Retourne null si aucun fichier ne correspond (repli ImagePlat)
 */
export function getImagePlat(slug: string): string | null {
  const fichiers = getFichiersPlats();

  // 1. Alias explicite
  const alias = ALIAS_IMAGES[slug];
  if (alias) {
    const aliasNormalise = normaliserNom(alias);
    const matchAlias = fichiers.find(
      (f) =>
        f.nomSansExt.toLowerCase() === alias.toLowerCase() ||
        f.nomNormalise === aliasNormalise,
    );
    if (matchAlias) {
      return `/images/plats/${encodeURIComponent(matchAlias.nomOriginal)}`;
    }
  }

  // 2. Nom normalisé identique
  const slugNormalise = normaliserNom(slug);
  const matchNom = fichiers.find((f) => f.nomNormalise === slugNormalise);
  if (matchNom) {
    return `/images/plats/${encodeURIComponent(matchNom.nomOriginal)}`;
  }

  // 3. Aucun fichier trouvé
  return null;
}

/**
 * Vérifie si une image existe pour un plat (pour rétrocompatibilité).
 */
export function imagePlatExiste(slug: string): boolean {
  return getImagePlat(slug) !== null;
}

/**
 * Retourne un dictionnaire slug → chemin public d'image (ou null) pour tous les plats fournis.
 * À appeler dans les Server Components/pages et transmettre aux composants client.
 */
export function getImagesPlatsDisponibles(
  dishes: Dish[],
): Record<string, string | null> {
  const resultat: Record<string, string | null> = {};
  for (const dish of dishes) {
    resultat[dish.slug] = getImagePlat(dish.slug);
  }
  return resultat;
}

/**
 * Vérifie si le logo officiel existe dans public/logo/logo.png
 */
export function logoExiste(): boolean {
  const chemin = path.join(process.cwd(), "public", "logo", "logo.png");
  return fs.existsSync(chemin);
}

/**
 * Vérifie si le poster du hero existe.
 */
export function heroPosterExiste(): boolean {
  const chemin = path.join(process.cwd(), "public", "video", "hero-poster.jpg");
  return fs.existsSync(chemin);
}

/**
 * Résout les médias vidéo disponibles pour le hero.
 */
export function getHeroVideoMedia(): {
  poster: string | null;
  sources: Array<{ src: string; type: string; media?: string }>;
} {
  const dossierVideo = path.join(process.cwd(), "public", "video");
  const posterExiste = fs.existsSync(path.join(dossierVideo, "hero-poster.jpg"));
  const heroWebmExiste = fs.existsSync(path.join(dossierVideo, "hero.webm"));
  const heroMp4Existe = fs.existsSync(path.join(dossierVideo, "hero.mp4"));
  const heroMobileExiste = fs.existsSync(path.join(dossierVideo, "hero-mobile.mp4"));
  const heroVideoOriginalExiste = fs.existsSync(path.join(dossierVideo, "herovideo.mp4"));

  const sources: Array<{ src: string; type: string; media?: string }> = [];

  // Version mobile optimisée
  if (heroMobileExiste) {
    sources.push({
      src: "/video/hero-mobile.mp4",
      type: "video/mp4",
      media: "(max-width: 767px)",
    });
  }

  // WebM optimisé
  if (heroWebmExiste) {
    sources.push({
      src: "/video/hero.webm",
      type: "video/webm",
    });
  }

  // MP4 optimisé
  if (heroMp4Existe) {
    sources.push({
      src: "/video/hero.mp4",
      type: "video/mp4",
    });
  } else if (heroVideoOriginalExiste) {
    // Repli sur herovideo.mp4 direct si hero.mp4 n'a pas été généré
    sources.push({
      src: "/video/herovideo.mp4",
      type: "video/mp4",
    });
  }

  return {
    poster: posterExiste ? "/video/hero-poster.jpg" : null,
    sources,
  };
}
