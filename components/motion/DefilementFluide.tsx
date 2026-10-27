"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export function DefilementFluide() {
  useEffect(() => {
    const estPointeurFin = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    ).matches;
    const mouvementReduit = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (!estPointeurFin || mouvementReduit) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      syncTouch: false,
    });

    let animationFrameId: number;

    function animer(temps: number) {
      lenis.raf(temps);
      animationFrameId = requestAnimationFrame(animer);
    }

    animationFrameId = requestAnimationFrame(animer);

    return () => {
      cancelAnimationFrame(animationFrameId);
      lenis.destroy();
    };
  }, []);

  return null;
}
