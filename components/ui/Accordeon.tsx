"use client";

import { useState, type ReactNode } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Icon } from "./Icon";
import { transitionDouce } from "@/lib/motion";

export interface ElementAccordeon {
  id: string;
  titre: string;
  contenu: ReactNode;
}

interface AccordeonProps {
  elements: ElementAccordeon[];
  mode?: "simple" | "multiple";
  elementsOuvertsDefaut?: string[];
  className?: string;
}

export function Accordeon({
  elements,
  mode = "simple",
  elementsOuvertsDefaut = [],
  className = "",
}: AccordeonProps) {
  const [ouverts, setOuverts] = useState<string[]>(elementsOuvertsDefaut);
  const shouldReduceMotion = useReducedMotion();

  const toggle = (id: string) => {
    if (mode === "simple") {
      setOuverts((prev) => (prev.includes(id) ? [] : [id]));
    } else {
      setOuverts((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
      );
    }
  };

  return (
    <div className={`flex flex-col gap-3 w-full ${className}`}>
      {elements.map((element) => {
        const estOuvert = ouverts.includes(element.id);
        const boutonId = `accordeon-btn-${element.id}`;
        const regionId = `accordeon-region-${element.id}`;

        return (
          <div
            key={element.id}
            className="overflow-hidden rounded-[var(--radius-petit)] border border-[var(--color-creme-fonce)] bg-[var(--color-creme)] transition-colors hover:border-[color-mix(in_srgb,var(--color-orange)_40%,var(--color-creme-fonce))]"
          >
            <button
              id={boutonId}
              type="button"
              aria-expanded={estOuvert}
              aria-controls={regionId}
              onClick={() => toggle(element.id)}
              className="group flex min-h-[52px] w-full items-center justify-between gap-4 px-4 py-3.5 text-left outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[var(--color-orange)] focus-visible:ring-offset-2"
            >
              <span className="text-base font-semibold text-[var(--color-anthracite)] transition-colors group-hover:text-[var(--color-orange)]">
                {element.titre}
              </span>
              <span
                className={`flex size-8 shrink-0 items-center justify-center rounded-full bg-[var(--color-creme-fonce)] text-[var(--color-anthracite)] transition-transform duration-300 ease-[var(--ease-smooth)] ${
                  estOuvert ? "rotate-180 bg-[var(--color-orange)] text-[var(--color-creme)]" : ""
                }`}
              >
                <Icon name="chevron-bas" size="sm" />
              </span>
            </button>

            <AnimatePresence initial={false}>
              {estOuvert && (
                <motion.div
                  id={regionId}
                  role="region"
                  aria-labelledby={boutonId}
                  initial={
                    shouldReduceMotion
                      ? { opacity: 0 }
                      : { height: 0, opacity: 0 }
                  }
                  animate={
                    shouldReduceMotion
                      ? { opacity: 1 }
                      : { height: "auto", opacity: 1 }
                  }
                  exit={
                    shouldReduceMotion
                      ? { opacity: 0 }
                      : { height: 0, opacity: 0 }
                  }
                  transition={transitionDouce}
                  className="overflow-hidden"
                >
                  <div className="border-t border-[var(--color-creme-fonce)] px-4 pt-3 pb-4 text-[0.9375rem] leading-relaxed text-neutral-700">
                    {element.contenu}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
