import type { Variants } from "framer-motion";
import { EASE_SMOOTH_BEZIER } from "./easing";

export const DUREE_MICRO = 0.25;
export const DUREE_APPARITION = 0.7;
export const DUREE_MASQUE = 0.85;
export const DECALAGE_CASCADE = 0.08;

export const transitionDouce = {
  duration: DUREE_APPARITION,
  ease: EASE_SMOOTH_BEZIER,
};

export const transitionMicro = {
  duration: DUREE_MICRO,
  ease: EASE_SMOOTH_BEZIER,
};

export const variantesReveal: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitionDouce,
  },
};

export const variantesRevealGroupe: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: DECALAGE_CASCADE,
      delayChildren: 0.05,
    },
  },
};

export const variantesElementGroupe: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitionDouce,
  },
};

export const variantesMasqueVertical: Variants = {
  hidden: {
    clipPath: "inset(100% 0% 0% 0%)",
  },
  visible: {
    clipPath: "inset(0% 0% 0% 0%)",
    transition: {
      duration: DUREE_MASQUE,
      ease: EASE_SMOOTH_BEZIER,
    },
  },
};

export const variantesMot: Variants = {
  hidden: {
    opacity: 0,
    y: 16,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: EASE_SMOOTH_BEZIER,
    },
  },
};
