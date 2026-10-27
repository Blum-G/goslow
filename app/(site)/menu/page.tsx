import { getDishes, getCategories } from "@/lib/data";
import { getImagesPlatsDisponibles } from "@/lib/images";
import { buildMetadata } from "@/lib/seo";
import { Conteneur } from "@/components/ui/Conteneur";
import { Section } from "@/components/ui/Section";
import { MenuComplet } from "@/components/sections/MenuComplet";

export const metadata = buildMetadata({
  title: "Menu du restaurant Go Slow à Atakpamé | Foufou, Ayimolou, Akumé…",
  description:
    "Découvrez les spécialités culinaires du Bar Restaurant Go Slow à Atakpamé : Foufou, Ayimolou, grillades et plats savoureux cuisinés chaque jour. Commandez sur WhatsApp.",
  path: "/menu",
});

export default async function PageMenu() {
  const [dishes, categories] = await Promise.all([
    getDishes(),
    getCategories(),
  ]);

  const imagesDisponibles = getImagesPlatsDisponibles(dishes);

  return (
    <Section fond="creme" espacement="normal">
      <Conteneur>
        <div className="flex flex-col gap-10">
          <header className="flex flex-col gap-3 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-orange)]">
              La carte Go Slow
            </span>
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight">
              Menu du restaurant à Atakpamé
            </h1>
            <p className="text-base text-neutral-600 leading-relaxed">
              Des spécialités togolaises préparées avec soin et des recettes
              classiques gourmandes. Choisissez vos plats et passez commande
              directement sur WhatsApp pour une livraison ou à emporter.
            </p>
          </header>

          <MenuComplet
            categories={categories}
            dishes={dishes}
            imagesDisponibles={imagesDisponibles}
          />
        </div>
      </Conteneur>
    </Section>
  );
}
