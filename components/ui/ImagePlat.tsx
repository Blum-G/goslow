import Image from "next/image";
import { Icon } from "./Icon";

interface ImagePlatProps {
  slug: string;
  nom: string;
  imageSrc?: string | null;
  imageDisponible?: boolean;
  className?: string;
  priority?: boolean;
  tailleIcone?: "sm" | "md" | "lg";
  ratio?: "4/3" | "1/1" | "auto";
}

export function ImagePlat({
  slug,
  nom,
  imageSrc,
  imageDisponible,
  className = "",
  priority = false,
  tailleIcone = "lg",
  ratio = "auto",
}: ImagePlatProps) {
  // Détermine la source réelle de l'image
  const sourceImage = imageSrc || (imageDisponible ? `/images/plats/${slug}.jpg` : null);

  const classeRatio =
    ratio === "4/3"
      ? "aspect-[4/3]"
      : ratio === "1/1"
        ? "aspect-square"
        : "";

  if (sourceImage) {
    // Pour les photos verticales (ex: risaugras), centrer légèrement vers le haut pour garder le plat bien visible
    const positionObjet =
      slug === "riz-au-gras" || slug === "risaugras"
        ? "object-[center_35%]"
        : "object-center";

    return (
      <div className={`relative overflow-hidden ${classeRatio} ${className}`}>
        <Image
          src={sourceImage}
          alt={`${nom}, plat du restaurant Go Slow à Atakpamé`}
          fill
          priority={priority}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className={`object-cover ${positionObjet} transition-transform duration-500 ease-[var(--ease-smooth)]`}
        />
      </div>
    );
  }

  // Visuel de repli Go Slow
  const iconeNom =
    slug === "poulet" || slug === "spaghetti" || slug === "riz-cantonais"
      ? "couverts"
      : "bol";

  return (
    <div
      className={`relative flex flex-col items-center justify-center overflow-hidden bg-[var(--color-creme-fonce)] p-6 text-center select-none ${classeRatio} ${className}`}
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
            Go Slow • Atakpamé
          </span>
        </div>
      </div>
    </div>
  );
}
