import Image from "next/image";
import { Icon } from "./Icon";

interface ImagePlatProps {
  slug: string;
  nom: string;
  imageDisponible?: boolean;
  className?: string;
  priority?: boolean;
  tailleIcone?: "sm" | "md" | "lg";
}

export function ImagePlat({
  slug,
  nom,
  imageDisponible = false,
  className = "",
  priority = false,
  tailleIcone = "lg",
}: ImagePlatProps) {
  if (imageDisponible) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <Image
          src={`/images/plats/${slug}.jpg`}
          alt={`Assiette de ${nom} au Bar Restaurant Go Slow`}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
        />
      </div>
    );
  }

  const iconeNom =
    slug === "poulet" || slug === "spaghetti" || slug === "riz-cantonais"
      ? "couverts"
      : "bol";

  return (
    <div
      className={`relative flex flex-col items-center justify-center overflow-hidden bg-[var(--color-creme-fonce)] p-6 text-center select-none ${className}`}
      aria-label={`Illustration de repli pour ${nom}`}
    >
      <div
        className="absolute inset-0 border border-[color-mix(in_srgb,var(--color-orange)_20%,transparent)] pointer-events-none rounded-[inherit]"
        aria-hidden="true"
      />
      <div className="flex flex-col items-center gap-3">
        <div className="flex size-14 items-center justify-center rounded-full bg-[var(--color-creme)] text-[var(--color-orange)] shadow-xs">
          <Icon name={iconeNom} size={tailleIcone} />
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="text-sm font-bold text-[var(--color-anthracite)]">
            {nom}
          </span>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-500">
            Go Slow
          </span>
        </div>
      </div>
    </div>
  );
}
