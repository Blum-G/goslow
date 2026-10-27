import type { ReactNode } from "react";

export type VarianteCadre = "decale" | "coin" | "arche";

interface CadreProps {
  children: ReactNode;
  variante?: VarianteCadre;
  className?: string;
  conteneurClassName?: string;
}

export function Cadre({
  children,
  variante = "decale",
  className = "",
  conteneurClassName = "",
}: CadreProps) {
  if (variante === "decale") {
    return (
      <div className={`relative isolate inline-block ${conteneurClassName}`}>
        <div
          className="absolute inset-0 translate-x-2.5 translate-y-2.5 rounded-[var(--radius-petit)] border-2 border-[var(--color-orange)] -z-10"
          aria-hidden="true"
        />
        <div
          className={`overflow-hidden rounded-[var(--radius-petit)] bg-[var(--color-creme)] ${className}`}
        >
          {children}
        </div>
      </div>
    );
  }

  if (variante === "coin") {
    return (
      <div
        className={`overflow-hidden rounded-tl-[var(--radius-grand)] rounded-tr-[var(--radius-petit)] rounded-br-[var(--radius-petit)] rounded-bl-[var(--radius-petit)] ${className}`}
      >
        {children}
      </div>
    );
  }

  return (
    <div
      className={`overflow-hidden rounded-t-[9999px] rounded-b-[var(--radius-petit)] ${className}`}
    >
      {children}
    </div>
  );
}
