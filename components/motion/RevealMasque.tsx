"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { DUREE_MASQUE } from "@/lib/motion";
import { EASE_SMOOTH_BEZIER } from "@/lib/easing";

type DirectionMasque = "bas-haut" | "gauche-droite" | "centre";

interface RevealMasqueProps {
  children: ReactNode;
  className?: string;
  direction?: DirectionMasque;
  delay?: number;
}

const masquesInitiaux: Record<DirectionMasque, string> = {
  "bas-haut": "inset(100% 0% 0% 0%)",
  "gauche-droite": "inset(0% 100% 0% 0%)",
  centre: "inset(50% 50% 50% 50%)",
};

export function RevealMasque({
  children,
  className = "",
  direction = "bas-haut",
  delay = 0,
}: RevealMasqueProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ clipPath: masquesInitiaux[direction] }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{
        duration: DUREE_MASQUE,
        ease: EASE_SMOOTH_BEZIER,
        delay,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
