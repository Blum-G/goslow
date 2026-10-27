import { notFound } from "next/navigation";
import Link from "next/link";
import { getDishBySlug, getDishes } from "@/lib/data";
import { SHOW_PRICES } from "@/lib/config";
import { formatPrice } from "@/lib/format";
import { buildMetadata, genererJsonLdBreadcrumbs } from "@/lib/seo";
import { urlCommandePlat } from "@/lib/whatsapp-messages";
import { Conteneur } from "@/components/ui/Conteneur";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Cadre } from "@/components/ui/Cadre";
import { Etiquette } from "@/components/ui/Etiquette";
import { ImagePlat } from "@/components/ui/ImagePlat";
import { getImagePlat } from "@/lib/images";

interface PageFichePlatProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const dishes = await getDishes();
  return dishes.map((dish) => ({
    slug: dish.slug,
  }));
}

export async function generateMetadata({ params }: PageFichePlatProps) {
  const { slug } = await params;
  const dish = await getDishBySlug(slug);

  if (!dish) {
    return buildMetadata({
      title: "Plat non trouvé | Go Slow Atakpamé",
      description: "Ce plat n'est pas disponible actuellement.",
      path: "/menu",
    });
  }

  const imagePlat = getImagePlat(dish.slug);

  return buildMetadata({
    title: `${dish.name} à Atakpamé | Go Slow`,
    description: `Savourez notre ${dish.name} au Bar Restaurant Go Slow à Atakpamé : ${dish.description}. À déguster sur place ou en livraison rapide sur WhatsApp.`,
    path: `/menu/${dish.slug}`,
    image: imagePlat ?? undefined,
  });
}

export default async function PageFichePlat({ params }: PageFichePlatProps) {
  const { slug } = await params;
  const dish = await getDishBySlug(slug);

  if (!dish) {
    notFound();
  }

  const allDishes = await getDishes();
  const suggestions = allDishes
    .filter((d) => d.slug !== dish.slug)
    .slice(0, 3);

  const urlCommande = urlCommandePlat(dish);
  const jsonLdBreadcrumbs = genererJsonLdBreadcrumbs([
    { nom: "Accueil", url: "/" },
    { nom: "Menu", url: "/menu" },
    { nom: dish.name, url: `/menu/${dish.slug}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdBreadcrumbs),
        }}
      />

      <Section fond="creme" espacement="normal">
        <Conteneur>
          {/* Fil d'Ariane */}
          <nav aria-label="Fil d'Ariane" className="mb-8">
            <ol className="flex items-center gap-2 text-xs font-semibold text-neutral-500">
              <li>
                <Link href="/" className="hover:text-[var(--color-orange)] transition-colors">
                  Accueil
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link href="/menu" className="hover:text-[var(--color-orange)] transition-colors">
                  Menu
                </Link>
              </li>
              <li>/</li>
              <li className="text-[var(--color-anthracite)]" aria-current="page">
                {dish.name}
              </li>
            </ol>
          </nav>

          {/* Fiche détaillée */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14 items-start">
            <Cadre variante="coin" className="w-full bg-[var(--color-creme-fonce)] overflow-hidden">
              <ImagePlat
                slug={dish.slug}
                nom={dish.name}
                imageSrc={getImagePlat(dish.slug)}
                ratio="4/3"
                priority
                className="h-[320px] sm:h-[420px] w-full"
              />
            </Cadre>

            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <Etiquette variante="neutre">{dish.category}</Etiquette>
                  {dish.signature && (
                    <Etiquette variante="orange">Plat signature</Etiquette>
                  )}
                </div>

                <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[var(--color-anthracite)]">
                  {dish.name}
                </h1>

                {SHOW_PRICES && (
                  <span className="text-2xl font-bold text-[var(--color-orange)] pt-1">
                    {formatPrice(dish.price)}
                  </span>
                )}
              </div>

              <div className="border-t border-b border-[var(--color-creme-fonce)] py-4">
                <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-500 mb-2">
                  Description
                </h2>
                <p className="text-base text-neutral-700 leading-relaxed">
                  {dish.description}
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <Button href={urlCommande} externe variante="primaire" taille="lg" className="w-full sm:w-auto">
                  <Icon name="whatsapp" size="md" />
                  Commander {dish.name} sur WhatsApp
                </Button>
                <p className="text-xs text-neutral-500">
                  Livraison dans Atakpamé et environs. Frais confirmés par le restaurant.
                </p>
              </div>

              <div className="pt-4">
                <Link
                  href="/menu"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-600 hover:text-[var(--color-orange)] transition-colors"
                >
                  <Icon name="fleche-gauche" size="sm" />
                  Retourner au menu complet
                </Link>
              </div>
            </div>
          </div>

          {/* Plats suggérés */}
          <div className="mt-20 pt-12 border-t border-[var(--color-creme-fonce)] flex flex-col gap-8">
            <div className="flex flex-col gap-1">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-orange)]">
                À découvrir également
              </span>
              <h2 className="text-2xl font-bold tracking-tight">
                D&apos;autres spécialités Go Slow
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {suggestions.map((suggestion) => (
                <article
                  key={suggestion.slug}
                  className="group flex flex-col justify-between rounded-[var(--radius-petit)] border border-[var(--color-creme-fonce)] bg-[var(--color-creme)] p-4 shadow-2xs hover:border-[var(--color-orange)] transition-colors"
                >
                  <Link
                    href={`/menu/${suggestion.slug}`}
                    className="overflow-hidden rounded-[var(--radius-petit)]"
                  >
                    <ImagePlat
                      slug={suggestion.slug}
                      nom={suggestion.name}
                      imageSrc={getImagePlat(suggestion.slug)}
                      ratio="4/3"
                      className="h-36 w-full"
                    />
                  </Link>

                  <div className="flex flex-col gap-1 pt-3">
                    <div className="flex items-center justify-between">
                      <Link
                        href={`/menu/${suggestion.slug}`}
                        className="font-bold text-base hover:text-[var(--color-orange)] transition-colors"
                      >
                        {suggestion.name}
                      </Link>
                      {SHOW_PRICES && (
                        <span className="text-sm font-bold text-[var(--color-orange)]">
                          {formatPrice(suggestion.price)}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-neutral-600 line-clamp-1">
                      {suggestion.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </Conteneur>
      </Section>
    </>
  );
}
