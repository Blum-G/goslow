import { execFile, execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);

const SOURCE = "public/video/herovideo.mp4";
const DOSSIER_VIDEO = "public/video";

import { createRequire } from "node:module";

const require = createRequire(import.meta.url);

function trouverFfmpeg() {
  try {
    execSync("ffmpeg -version", { stdio: "ignore" });
    return "ffmpeg";
  } catch {
    try {
      const ffmpegStatic = require("ffmpeg-static");
      if (ffmpegStatic && fs.existsSync(ffmpegStatic)) {
        return ffmpegStatic;
      }
    } catch {
      // Non disponible
    }
    return null;
  }
}

async function main() {
  if (!fs.existsSync(SOURCE)) {
    console.error(`Fichier source introuvable : ${SOURCE}`);
    process.exit(1);
  }

  const tailleSource = fs.statSync(SOURCE).size;
  console.log(`Fichier source : ${SOURCE} (${(tailleSource / 1024 / 1024).toFixed(2)} Mo)`);

  const commandeFfmpeg = trouverFfmpeg();

  if (!commandeFfmpeg) {
    console.warn("\n[AVERTISSEMENT] ffmpeg n'est pas installé dans le PATH de l'environnement.");
    console.warn("La vidéo originale public/video/herovideo.mp4 (4.19 Mo) sera utilisée directement par le hero.");
    console.warn("\nPour générer les versions optimisées manuellement, installez ffmpeg et exécutez :");
    console.warn(`  ffmpeg -y -ss 00:00:00.500 -i ${SOURCE} -vframes 1 -q:v 3 public/video/hero-poster.jpg`);
    console.warn(`  ffmpeg -y -i ${SOURCE} -an -c:v libx264 -crf 28 -preset slow -movflags +faststart -pix_fmt yuv420p public/video/hero.mp4`);
    console.warn(`  ffmpeg -y -i ${SOURCE} -an -c:v libvpx-vp9 -crf 32 -b:v 0 public/video/hero.webm`);
    console.warn(`  ffmpeg -y -i ${SOURCE} -an -vf "crop=w='ih*9/16':h=ih:x='(iw-ow)/2':y=0,scale=720:1280" -c:v libx264 -crf 28 -preset slow -movflags +faststart -pix_fmt yuv420p public/video/hero-mobile.mp4`);
    return;
  }

  console.log(`Utilisation de ffmpeg : ${commandeFfmpeg}`);

  // 1. Poster JPG
  const posterPath = path.join(DOSSIER_VIDEO, "hero-poster.jpg");
  await execFileAsync(commandeFfmpeg, [
    "-y",
    "-ss",
    "00:00:00.500",
    "-i",
    SOURCE,
    "-vframes",
    "1",
    "-q:v",
    "3",
    posterPath,
  ]);
  console.log("Poster généré : public/video/hero-poster.jpg");

  // 2. hero.mp4
  const mp4Path = path.join(DOSSIER_VIDEO, "hero.mp4");
  await execFileAsync(commandeFfmpeg, [
    "-y",
    "-i",
    SOURCE,
    "-an",
    "-c:v",
    "libx264",
    "-crf",
    "28",
    "-preset",
    "slow",
    "-movflags",
    "+faststart",
    "-pix_fmt",
    "yuv420p",
    mp4Path,
  ]);
  console.log("hero.mp4 généré");

  // 3. hero.webm
  const webmPath = path.join(DOSSIER_VIDEO, "hero.webm");
  await execFileAsync(commandeFfmpeg, [
    "-y",
    "-i",
    SOURCE,
    "-an",
    "-c:v",
    "libvpx-vp9",
    "-crf",
    "32",
    "-b:v",
    "0",
    webmPath,
  ]);
  console.log("hero.webm généré");

  // 4. hero-mobile.mp4
  const mobileMp4Path = path.join(DOSSIER_VIDEO, "hero-mobile.mp4");
  await execFileAsync(commandeFfmpeg, [
    "-y",
    "-i",
    SOURCE,
    "-an",
    "-vf",
    "crop=w='ih*9/16':h=ih:x='(iw-ow)/2':y=0,scale=720:1280",
    "-c:v",
    "libx264",
    "-crf",
    "28",
    "-preset",
    "slow",
    "-movflags",
    "+faststart",
    "-pix_fmt",
    "yuv420p",
    mobileMp4Path,
  ]);
  console.log("hero-mobile.mp4 généré");
}

main().catch((err) => {
  console.error("Erreur lors de l'optimisation vidéo :", err);
});
