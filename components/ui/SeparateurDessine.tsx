"use client";

import { motion, useReducedMotion } from "framer-motion";
import { DUREE_APPARITION } from "@/lib/motion";
import { EASE_SMOOTH_BEZIER } from "@/lib/easing";

export type StyleSeparateur = "courbe" | "vague";

interface SeparateurDessineProps {
  variante?: StyleSeparateur;
  anime?: boolean;
  className?: string;
}

const traces: Record<StyleSeparateur, { d: string; viewBox: string }> = {
  courbe: {
    d: "M4 14C80 6 180 20 296 10C420 -1 520 22 600 12C700 0 800 16 900 10C1000 4 1100 18 1200 12",
    viewBox: "0 0 1204 24",
  },
  vague: {
    d: "M4 12C60 4 120 20 180 12C240 4 300 20 360 12C420 4 480 20 540 12C600 4 660 20 720 12C780 4 840 20 900 12C960 4 1020 20 1080 12C1140 4 1180 18 1200 12",
    viewBox: "0 0 1204 24",
  },
};

export function SeparateurDessine({
  variante = "courbe",
  anime = false,
  className = "",
}: SeparateurDessineProps) {
  const shouldReduceMotion = useReducedMotion();
  const { d, viewBox } = traces[variante];

  if (!anime || shouldReduceMotion) {
    return (
      <div className={`w-full overflow-hidden leading-none ${className}`}>
        <svg
          viewBox={viewBox}
          fill="none"
          className="h-4 w-full"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d={d}
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
      </div>
    );
  }

  return (
    <div className={`w-full overflow-hidden leading-none ${className}`}>
      <svg
        viewBox={viewBox}
        fill="none"
        className="h-4 w-full"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <motion.path
          d={d}
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{
            duration: DUREE_APPARITION,
            ease: EASE_SMOOTH_BEZIER,
          }}
        />
      </svg>
    </div>
  );
}
