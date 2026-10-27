import type { ReactNode } from "react";

export type FondSection = "creme" | "creme-fonce" | "anthracite";
export type EspacementSection = "normal" | "compact" | "aucun";

interface SectionProps {
  id?: string;
  children: ReactNode;
  className?: string;
  fond?: FondSection;
  espacement?: EspacementSection;
}

const stylesFond: Record<FondSection, string> = {
  creme: "bg-[var(--color-creme)] text-[var(--color-anthracite)]",
  "creme-fonce":
    "bg-[var(--color-creme-fonce)] text-[var(--color-anthracite)]",
  anthracite: "bg-[var(--color-anthracite)] text-[var(--color-creme)]",
};

const stylesEspacement: Record<EspacementSection, string> = {
  normal: "py-14 md:py-20 lg:py-28",
  compact: "py-8 md:py-12 lg:py-16",
  aucun: "py-0",
};

export function Section({
  id,
  children,
  className = "",
  fond = "creme",
  espacement = "normal",
}: SectionProps) {
  return (
    <section
      id={id}
      className={`relative w-full ${stylesFond[fond]} ${stylesEspacement[espacement]} ${className}`}
    >
      {children}
    </section>
  );
}
