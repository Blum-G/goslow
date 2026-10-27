import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const FOND_CREME = { r: 250, g: 246, b: 238, alpha: 1 }; // #FAF6EE

async function genererIcone(taille, destination) {
  const dossier = path.dirname(destination);
  if (!fs.existsSync(dossier)) {
    fs.mkdirSync(dossier, { recursive: true });
  }

  // Marge de sécurité : le logo occupe 72% de la largeur ou de la hauteur
  const largeurMax = Math.round(taille * 0.72);
  const hauteurMax = Math.round(taille * 0.72);

  // Redimensionne le logo en conservant le ratio
  const logoRedim = await sharp("public/logo/logo.png")
    .resize(largeurMax, hauteurMax, {
      fit: "inside",
      withoutEnlargement: false,
    })
    .toBuffer({ resolveWithObject: true });

  const gauche = Math.round((taille - logoRedim.info.width) / 2);
  const haut = Math.round((taille - logoRedim.info.height) / 2);

  await sharp({
    create: {
      width: taille,
      height: taille,
      channels: 4,
      background: FOND_CREME,
    },
  })
    .composite([
      {
        input: logoRedim.data,
        left: gauche,
        top: haut,
      },
    ])
    .png()
    .toFile(destination);

  console.log(`Généré : ${destination} (${taille}x${taille})`);
}

async function main() {
  console.log("Génération des icônes à partir de public/logo/logo.png...");

  await genererIcone(512, "app/icon.png");
  await genererIcone(180, "app/apple-icon.png");
  await genererIcone(192, "public/icons/icon-192.png");
  await genererIcone(512, "public/icons/icon-512.png");

  // Supprime l'ancien icon.svg provisoire s'il existe
  if (fs.existsSync("app/icon.svg")) {
    fs.unlinkSync("app/icon.svg");
    console.log("Supprimé : app/icon.svg (provisoire)");
  }

  console.log("Toutes les icônes ont été générées avec succès.");
}

main().catch((err) => {
  console.error("Erreur lors de la génération des icônes :", err);
  process.exit(1);
});
