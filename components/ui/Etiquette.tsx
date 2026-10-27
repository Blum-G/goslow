import type { ReactNode } from "react";

export type VarianteEtiquette = "neutre" | "orange" | "anthracite";

interface EtiquetteProps {
  children: ReactNode;
  className?: string;
  variante?: VarianteEtiquette;
}

const stylesVariante: Record<VarianteEtiquette, string> = {
  neutre:
    "bg-[var(--color-creme-fonce)] text-[var(--color-anthracite)] border border-transparent",
  orange:
    "bg-[color-mix(in_srgb,var(--color-orange)_12%,transparent)] text-[var(--color-orange)] border border-[color-mix(in_srgb,var(--color-orange)_25%,transparent)]",
  anthracite:
    "bg-[var(--color-anthracite)] text-[var(--color-creme)] border border-transparent",
};

export function Etiquette({
  children,
  className = "",
  variante = "neutre",
}: EtiquetteProps) {
  return (
    <span
      className={`inline-flex items-center rounded-[var(--radius-petit)] px-2.5 py-1 text-xs font-semibold tracking-wider uppercase ${stylesVariante[variante]} ${className}`}
    >
      {children}
    </span>
  );
}
