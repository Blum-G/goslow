import type { ElementType, ReactNode } from "react";

interface ConteneurProps {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}

export function Conteneur({
  children,
  className = "",
  as: Balise = "div",
}: ConteneurProps) {
  return (
    <Balise
      className={`mx-auto w-full max-w-[var(--container-site)] px-4 md:px-6 lg:px-8 ${className}`}
    >
      {children}
    </Balise>
  );
}
