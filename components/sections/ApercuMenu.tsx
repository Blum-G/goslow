"use client";

import { useState } from "react";
import Link from "next/link";
import type { Category, Dish } from "@/lib/data/types";
import { SHOW_PRICES } from "@/lib/config";
import { formatPrice } from "@/lib/format";
import { ImagePlat } from "@/components/ui/ImagePlat";
import { Etiquette } from "@/components/ui/Etiquette";
import { Icon } from "@/components/ui/Icon";
import { urlCommandePlat } from "@/lib/whatsapp-messages";

interface ApercuMenuProps {
  categories: Category[];
  dishes: Dish[];
  imagesDisponibles: Record<string, string | null>;
}

export function ApercuMenu({ categories, dishes, imagesDisponibles }: ApercuMenuProps) {
  const [categorieActive, setCategorieActive] = useState<string>(
    categories[0]?.name || "Plats locaux",
  );

  const platsFiltres = dishes.filter(
    (plat) => plat.category === categorieActive,
  );

  return (
    <div className="flex flex-col gap-8">
      {/* Onglets de catégories */}
      <div
        className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none"
        role="tablist"
        aria-label="Catégories du menu"
      >
        {categories.map((cat) => {
          const estActif = categorieActive === cat.name;
          return (
            <button
              key={cat.slug}
              role="tab"
              aria-selected={estActif}
              onClick={() => setCategorieActive(cat.name)}
              className={`min-h-[44px] shrink-0 rounded-[var(--radius-petit)] px-4 py-2 text-sm font-semibold transition-all focus-visible:ring-2 focus-visible:ring-[var(--color-orange)] ${
                estActif
                  ? "bg-[var(--color-orange)] text-[var(--color-creme)] shadow-xs"
                  : "bg-[var(--color-creme-fonce)] text-[var(--color-anthracite)] hover:bg-[color-mix(in_srgb,var(--color-creme-fonce)_80%,var(--color-orange))]"
              }`}
            >
              {cat.name}
            </button>
          );
        })}
      </div>

      {/* Grille des plats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {platsFiltres.map((plat) => {
          const urlCommande = urlCommandePlat(plat);

          return (
            <article
              key={plat.slug}
              className="group flex flex-col justify-between overflow-hidden rounded-[var(--radius-petit)] border border-[var(--color-creme-fonce)] bg-[var(--color-creme)] p-4 transition-all hover:border-[color-mix(in_srgb,var(--color-orange)_40%,var(--color-creme-fonce))]"
            >
              <div className="flex flex-col gap-3">
                <Link
                  href={`/menu/${plat.slug}`}
                  className="overflow-hidden rounded-[var(--radius-petit)] outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-orange)]"
                >
                  <ImagePlat
                    slug={plat.slug}
                    nom={plat.name}
                    imageSrc={imagesDisponibles[plat.slug]}
                    ratio="4/3"
                    className="h-44 w-full transition-transform duration-500 ease-[var(--ease-smooth)] group-hover:scale-105"
                  />
                </Link>

                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between gap-2">
                    <Link
                      href={`/menu/${plat.slug}`}
                      className="font-bold text-lg text-[var(--color-anthracite)] hover:text-[var(--color-orange)] transition-colors"
                    >
                      {plat.name}
                    </Link>
                    {plat.signature && (
                      <Etiquette variante="orange">Signature</Etiquette>
                    )}
                  </div>
                  <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed">
                    {plat.description}
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[var(--color-creme-fonce)] flex items-center justify-between gap-3">
                {SHOW_PRICES ? (
                  <span className="font-bold text-base text-[var(--color-orange)]">
                    {formatPrice(plat.price)}
                  </span>
                ) : (
                  <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                    {plat.category}
                  </span>
                )}

                <a
                  href={urlCommande}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[44px] items-center gap-1.5 rounded-[var(--radius-petit)] bg-[var(--color-creme-fonce)] px-3 py-1.5 text-xs font-semibold text-[var(--color-anthracite)] transition-colors hover:bg-[var(--color-orange)] hover:text-[var(--color-creme)] focus-visible:ring-2 focus-visible:ring-[var(--color-orange)]"
                >
                  <Icon name="whatsapp" size="sm" />
                  <span>Commander</span>
                </a>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
