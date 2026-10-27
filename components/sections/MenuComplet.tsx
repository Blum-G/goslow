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

interface MenuCompletProps {
  categories: Category[];
  dishes: Dish[];
  imagesDisponibles: Record<string, boolean>;
}

export function MenuComplet({ categories, dishes, imagesDisponibles }: MenuCompletProps) {
  const [filtreSelectionne, setFiltreSelectionne] = useState<string>("tous");

  const platsFiltres =
    filtreSelectionne === "tous"
      ? dishes
      : dishes.filter((d) => d.category === filtreSelectionne);

  return (
    <div className="flex flex-col gap-10">
      {/* Barre de filtres */}
      <div
        className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none"
        role="tablist"
        aria-label="Filtres de la carte"
      >
        <button
          type="button"
          role="tab"
          aria-selected={filtreSelectionne === "tous"}
          onClick={() => setFiltreSelectionne("tous")}
          className={`min-h-[44px] shrink-0 rounded-[var(--radius-petit)] px-4 py-2 text-sm font-semibold transition-all focus-visible:ring-2 focus-visible:ring-[var(--color-orange)] ${
            filtreSelectionne === "tous"
              ? "bg-[var(--color-orange)] text-[var(--color-creme)] shadow-xs"
              : "bg-[var(--color-creme-fonce)] text-[var(--color-anthracite)] hover:bg-[color-mix(in_srgb,var(--color-creme-fonce)_80%,var(--color-orange))]"
          }`}
        >
          Tous les plats ({dishes.length})
        </button>

        {categories.map((cat) => {
          const estActif = filtreSelectionne === cat.name;
          const compte = dishes.filter((d) => d.category === cat.name).length;

          return (
            <button
              key={cat.slug}
              type="button"
              role="tab"
              aria-selected={estActif}
              onClick={() => setFiltreSelectionne(cat.name)}
              className={`min-h-[44px] shrink-0 rounded-[var(--radius-petit)] px-4 py-2 text-sm font-semibold transition-all focus-visible:ring-2 focus-visible:ring-[var(--color-orange)] ${
                estActif
                  ? "bg-[var(--color-orange)] text-[var(--color-creme)] shadow-xs"
                  : "bg-[var(--color-creme-fonce)] text-[var(--color-anthracite)] hover:bg-[color-mix(in_srgb,var(--color-creme-fonce)_80%,var(--color-orange))]"
              }`}
            >
              {cat.name} ({compte})
            </button>
          );
        })}
      </div>

      {/* Grille des plats du menu */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {platsFiltres.map((plat) => {
          const urlCommande = urlCommandePlat(plat);

          return (
            <article
              key={plat.slug}
              className="flex flex-col justify-between overflow-hidden rounded-[var(--radius-petit)] border border-[var(--color-creme-fonce)] bg-[var(--color-creme)] p-4 shadow-2xs hover:border-[color-mix(in_srgb,var(--color-orange)_40%,var(--color-creme-fonce))] transition-all"
            >
              <div className="flex flex-col gap-3">
                <Link
                  href={`/menu/${plat.slug}`}
                  className="overflow-hidden rounded-[var(--radius-petit)]"
                >
                  <ImagePlat
                    slug={plat.slug}
                    nom={plat.name}
                    imageDisponible={imagesDisponibles[plat.slug]}
                    className="h-48 w-full"
                  />
                </Link>

                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between gap-2">
                    <Link
                      href={`/menu/${plat.slug}`}
                      className="font-bold text-lg hover:text-[var(--color-orange)] transition-colors"
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
                  <span className="text-xs font-semibold text-neutral-500">
                    {plat.category}
                  </span>
                )}

                <a
                  href={urlCommande}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[44px] items-center gap-1.5 rounded-[var(--radius-petit)] bg-[var(--color-orange)] px-3 py-1.5 text-xs font-semibold text-[var(--color-creme)] hover:bg-[var(--color-anthracite)] transition-colors"
                >
                  <Icon name="whatsapp" size="sm" />
                  <span>Commander ce plat</span>
                </a>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
