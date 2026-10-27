"use client";

import { motion, useReducedMotion } from "framer-motion";
import { DECALAGE_CASCADE } from "@/lib/motion";
import { EASE_SMOOTH_BEZIER } from "@/lib/easing";

type BaliseTitre = "h1" | "h2" | "h3" | "h4" | "p" | "span";

interface TitreMotsProps {
  texte: string;
  as?: BaliseTitre;
  className?: string;
  delay?: number;
}

export function TitreMots({
  texte,
  as: Balise = "h2",
  className = "",
  delay = 0,
}: TitreMotsProps) {
  const shouldReduceMotion = useReducedMotion();
  const mots = texte.split(" ");

  if (shouldReduceMotion) {
    return <Balise className={className}>{texte}</Balise>;
  }

  return (
    <Balise className={className} aria-label={texte}>
      <motion.span
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10%" }}
        transition={{
          staggerChildren: DECALAGE_CASCADE,
          delayChildren: delay,
        }}
        className="inline"
        aria-hidden="true"
      >
        {mots.map((mot, index) => (
          <span
            key={`${mot}-${index}`}
            className="inline-block overflow-hidden align-top"
          >
            <motion.span
              variants={{
                hidden: { opacity: 0, y: "100%" },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.6,
                    ease: EASE_SMOOTH_BEZIER,
                  },
                },
              }}
              className="inline-block"
            >
              {mot}
            </motion.span>
            {index < mots.length - 1 && "\u00A0"}
          </span>
        ))}
      </motion.span>
    </Balise>
  );
}
