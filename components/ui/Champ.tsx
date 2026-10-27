"use client";

import { type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface ChampConteneurProps {
  id: string;
  libelle: string;
  actif: boolean;
  erreur?: string;
  aide?: string;
  requis?: boolean;
  children: ReactNode;
  className?: string;
}

export function Champ({
  id,
  libelle,
  actif,
  erreur,
  aide,
  requis = false,
  children,
  className = "",
}: ChampConteneurProps) {
  const idErreur = `${id}-erreur`;
  const idAide = `${id}-aide`;

  return (
    <div className={`relative flex flex-col w-full ${className}`}>
      <div className="group relative flex flex-col justify-end min-h-[58px] rounded-[var(--radius-petit)] bg-[var(--color-creme-fonce)] px-3.5 pt-4 pb-1.5 transition-colors focus-within:bg-[color-mix(in_srgb,var(--color-creme-fonce)_85%,var(--color-orange))]">
        <label
          htmlFor={id}
          className={`pointer-events-none absolute left-3.5 transition-all duration-200 ease-[var(--ease-smooth)] select-none ${
            actif
              ? "top-1.5 text-xs font-semibold text-[var(--color-orange)]"
              : "top-4 text-base text-neutral-600 group-focus-within:top-1.5 group-focus-within:text-xs group-focus-within:font-semibold group-focus-within:text-[var(--color-orange)]"
          }`}
        >
          {libelle}
          {requis && <span className="ml-1 text-[var(--color-orange)]">*</span>}
        </label>

        {children}

        {/* Trait de focus dessiné */}
        <span
          className={`absolute bottom-0 left-0 h-[2px] w-full origin-left bg-[var(--color-orange)] transition-transform duration-300 ease-[var(--ease-smooth)] ${
            erreur
              ? "scale-x-100 !bg-red-600"
              : "scale-x-0 group-focus-within:scale-x-100"
          }`}
          aria-hidden="true"
        />
      </div>

      <AnimatePresence>
        {erreur && (
          <motion.p
            id={idErreur}
            role="alert"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            className="mt-1 text-xs font-medium text-red-600"
          >
            {erreur}
          </motion.p>
        )}
      </AnimatePresence>

      {!erreur && aide && (
        <p id={idAide} className="mt-1 text-xs text-neutral-500">
          {aide}
        </p>
      )}
    </div>
  );
}
