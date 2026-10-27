"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface SourceVideo {
  src: string;
  type: string;
  media?: string;
}

interface HeroFondMediaProps {
  posterSrc: string | null;
  sources: SourceVideo[];
}

export function HeroFondMedia({ posterSrc, sources }: HeroFondMediaProps) {
  const [peutJouerVideo, setPeutJouerVideo] = useState(false);

  useEffect(() => {
    // Si aucune source vidéo disponible
    if (!sources || sources.length === 0) {
      return;
    }

    // 1. Respect de prefers-reduced-motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    // 2. Économiseur de données et connexions lentes (Save-Data, 2g, 3g)
    const conn = (navigator as unknown as { connection?: { saveData?: boolean; effectiveType?: string } })
      .connection;

    if (conn) {
      if (conn.saveData) {
        return;
      }
      if (conn.effectiveType === "slow-2g" || conn.effectiveType === "2g" || conn.effectiveType === "3g") {
        return;
      }
    }

    // Autorise le chargement différé de la vidéo après le premier affichage pour ne jamais bloquer le LCP
    const timer = setTimeout(() => {
      setPeutJouerVideo(true);
    }, 60);

    return () => clearTimeout(timer);
  }, [sources]);

  const aDesMedias = posterSrc !== null || sources.length > 0;

  if (!aDesMedias) {
    // Fond anthracite de repli avec typographie Go Slow géante
    return (
      <div
        className="absolute inset-0 flex items-center justify-center opacity-10 select-none pointer-events-none"
        aria-hidden="true"
      >
        <span className="text-[18vw] font-bold tracking-tighter text-[var(--color-creme)]">
          GO SLOW
        </span>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 z-0 overflow-hidden select-none pointer-events-none">
      {/* 1. Image poster : élément priority LCP */}
      {posterSrc && (
        <Image
          src={posterSrc}
          alt="Ambiance Bar Restaurant Go Slow à Atakpamé"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      )}

      {/* 2. Vidéo en surimpression fluide */}
      {peutJouerVideo && (
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={posterSrc ?? undefined}
          className="absolute inset-0 h-full w-full object-cover"
        >
          {sources.map((source) => (
            <source
              key={source.src}
              src={source.src}
              type={source.type}
              media={source.media}
            />
          ))}
        </video>
      )}

      {/* 3. Voile sombre pour garantir la lisibilité optimale des textes */}
      <div
        className="absolute inset-0 bg-black/55 transition-opacity"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-[var(--color-anthracite)] via-transparent to-black/30"
        aria-hidden="true"
      />
    </div>
  );
}
