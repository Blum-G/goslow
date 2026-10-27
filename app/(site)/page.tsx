import Link from "next/link";
import { getDishes, getCategories, getSettings } from "@/lib/data";
import { SHOW_PRICES } from "@/lib/config";
import { formatPrice } from "@/lib/format";
import { buildMetadata } from "@/lib/seo";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { urlCommandePlat } from "@/lib/whatsapp-messages";
import { Conteneur } from "@/components/ui/Conteneur";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Cadre } from "@/components/ui/Cadre";
import { Etiquette } from "@/components/ui/Etiquette";
import { ImagePlat } from "@/components/ui/ImagePlat";
import { SeparateurDessine } from "@/components/ui/SeparateurDessine";
import { ApercuMenu } from "@/components/sections/ApercuMenu";
import { HeroFondMedia } from "@/components/sections/HeroFondMedia";
import { TitreMots } from "@/components/motion/TitreMots";
import { Reveal } from "@/components/motion/Reveal";
import { getImagesPlatsDisponibles, getHeroVideoMedia } from "@/lib/images";

export const metadata = buildMetadata({
  title:
    "Bar Restaurant Go Slow à Atakpamé | Plats locaux, boissons & livraison",
  description:
    "Cuisine locale authentique à Atakpamé. Foufou, Ayimolou, grillades et plats savoureux servis sur place ou livrés chez vous. Réservez ou commandez sur WhatsApp.",
  path: "/",
});

export default async function PageAccueil() {
  const [dishes, categories, settings] = await Promise.all([
    getDishes(),
    getCategories(),
    getSettings(),
  ]);

  const imagesDisponibles = getImagesPlatsDisponibles(dishes);
  const platsSignatures = dishes.filter((d) => d.signature);
  const urlCommandeDirecte = buildWhatsAppUrl(
    "Bonjour Go Slow, je souhaite commander un repas en livraison.",
  );

  const heroMedia = getHeroVideoMedia();

  return (
    <div className="flex flex-col w-full">
      {/* 1. Hero */}
      <section className="relative min-h-[85svh] flex items-center bg-[var(--color-anthracite)] text-[var(--color-creme)] overflow-hidden">
        {/* Fond hero (vidéo optimisée ou poster ou repli) */}
        <HeroFondMedia
          posterSrc={heroMedia.poster}
          sources={heroMedia.sources}
        />

        <Conteneur className="relative z-10 py-16 md:py-24">
          <div className="max-w-3xl flex flex-col gap-6">
            <div className="flex items-center gap-2">
              <Etiquette variante="orange">Bar Restaurant • Atakpamé</Etiquette>
              <Etiquette variante="anthracite">Ouvert dès 8h</Etiquette>
            </div>

            <TitreMots
              as="h1"
              texte="Bar Restaurant Go Slow à Atakpamé"
              className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[var(--color-creme)] leading-[1.08]"
            />

            <p className="text-lg sm:text-xl text-neutral-300 max-w-2xl leading-relaxed">
              Prendre le temps de bien manger. Savourez nos spécialités togolaises
              et nos plats classiques dans une ambiance posée et conviviale.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Button href="/reserver" variante="primaire" taille="lg">
                <Icon name="calendrier" size="md" />
                Réserver une table
              </Button>
              <Button
                href={urlCommandeDirecte}
                externe
                variante="secondaire"
                taille="lg"
                className="!text-[var(--color-creme)] !border-[var(--color-creme)]"
              >
                <Icon name="whatsapp" size="md" />
                Commander sur WhatsApp
              </Button>
            </div>
          </div>
        </Conteneur>
      </section>

      {/* 2. Bandeau défilant (Marquee) */}
      <div
        className="w-full bg-[var(--color-orange)] text-[var(--color-creme)] py-3 overflow-hidden select-none"
        aria-hidden="true"
      >
        <div className="flex whitespace-nowrap gap-8 text-sm font-bold uppercase tracking-wider animate-pulse">
          <span>Foufou d&apos;igname</span>
          <span>•</span>
          <span>Ayimolou traditionnel</span>
          <span>•</span>
          <span>Akumé & sauces locales</span>
          <span>•</span>
          <span>Poulet croustillant</span>
          <span>•</span>
          <span>Riz au gras parfumé</span>
          <span>•</span>
          <span>Livraison rapide à Atakpamé</span>
          <span>•</span>
          <span>Bonne cuisine • Bon moment</span>
        </div>
      </div>

      {/* 3. Plats signatures */}
      <Section fond="creme" espacement="normal">
        <Conteneur>
          <div className="flex flex-col gap-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="flex flex-col gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-orange)]">
                  Nos spécialités
                </span>
                <h2 className="text-2xl sm:text-4xl font-bold tracking-tight">
                  Les plats signatures de Go Slow
                </h2>
              </div>
              <Button href="/menu" variante="discret">
                Voir tout le menu
                <Icon name="fleche-droite" size="sm" />
              </Button>
            </div>

            {/* Carrousel mobile avec snap / Grille sur bureau */}
            <div className="flex md:grid md:grid-cols-4 gap-6 overflow-x-auto pb-4 md:pb-0 snap-x snap-mandatory scrollbar-none -mx-4 px-4 md:mx-0 md:px-0">
              {platsSignatures.map((plat) => {
                const urlCommande = urlCommandePlat(plat);

                return (
                  <article
                    key={plat.slug}
                    className="flex flex-col justify-between shrink-0 w-[280px] sm:w-[320px] md:w-auto snap-start overflow-hidden rounded-[var(--radius-petit)] border border-[var(--color-creme-fonce)] bg-[var(--color-creme)] p-4 shadow-2xs"
                  >
                    <div className="flex flex-col gap-3">
                      <Link
                        href={`/menu/${plat.slug}`}
                        className="overflow-hidden rounded-[var(--radius-petit)]"
                      >
                        <ImagePlat
                          slug={plat.slug}
                          nom={plat.name}
                          imageSrc={imagesDisponibles[plat.slug]}
                          ratio="4/3"
                          className="h-48 w-full"
                        />
                      </Link>

                      <div className="flex flex-col gap-1">
                        <div className="flex items-center justify-between gap-2">
                          <Link
                            href={`/menu/${plat.slug}`}
                            className="font-bold text-lg hover:text-[var(--color-orange)] transition-colors"
                          >
                            {plat.name}
                          </Link>
                          <Etiquette variante="orange">Signature</Etiquette>
                        </div>
                        <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed">
                          {plat.description}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-[var(--color-creme-fonce)] flex items-center justify-between gap-2">
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
                        className="inline-flex min-h-[44px] items-center gap-1.5 rounded-[var(--radius-petit)] bg-[var(--color-creme-fonce)] px-3 py-1.5 text-xs font-semibold text-[var(--color-anthracite)] hover:bg-[var(--color-orange)] hover:text-[var(--color-creme)] transition-colors"
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
        </Conteneur>
      </Section>

      <SeparateurDessine variante="courbe" className="text-[var(--color-creme-fonce)]" />

      {/* 4. Le principe Go Slow */}
      <Section fond="creme-fonce" espacement="normal">
        <Conteneur>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <Reveal className="flex flex-col gap-5">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-orange)]">
                L&apos;esprit du lieu
              </span>
              <h2 className="text-2xl sm:text-4xl font-bold tracking-tight leading-tight">
                Ralentir le pas, apprécier chaque saveur
              </h2>
              <p className="text-base text-neutral-700 leading-relaxed">
                À Atakpamé, Go Slow est un appel à la détente. Ici, on prend le
                temps de cuisiner des ingrédients frais, de piler l&apos;igname,
                de mijoter les sauces et d&apos;accueillir chaque client avec
                chaleur.
              </p>
              <p className="text-base text-neutral-700 leading-relaxed">
                Que vous soyez de passage ou habitant de la ville, installez-vous
                en salle ou faites-vous livrer votre plat favori encore chaud.
              </p>
              <div className="pt-2">
                <Button href="/contact" variante="secondaire">
                  Nous rendre visite à Atakpamé
                </Button>
              </div>
            </Reveal>

            <div className="flex justify-center">
              <Cadre variante="decale" className="p-8 max-w-md w-full">
                <div className="flex flex-col gap-4 text-center items-center">
                  <div className="size-16 rounded-full bg-[var(--color-creme-fonce)] flex items-center justify-center text-[var(--color-orange)]">
                    <Icon name="bol" size="lg" />
                  </div>
                  <h3 className="font-bold text-xl">
                    Cuisine locale & grillades
                  </h3>
                  <p className="text-sm text-neutral-600">
                    Préparée chaque matin avec des produits du marché d&apos;Atakpamé.
                  </p>
                  <div className="w-full pt-3 border-t border-[var(--color-creme-fonce)] flex items-center justify-around text-xs font-semibold text-neutral-500">
                    <span>Du lundi au samedi</span>
                    <span>•</span>
                    <span>Dès 8h</span>
                  </div>
                </div>
              </Cadre>
            </div>
          </div>
        </Conteneur>
      </Section>

      {/* 5. Aperçu du menu */}
      <Section fond="creme" espacement="normal">
        <Conteneur>
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-2 max-w-xl">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-orange)]">
                La carte
              </span>
              <h2 className="text-2xl sm:text-4xl font-bold tracking-tight">
                Aperçu du menu
              </h2>
              <p className="text-sm text-neutral-600">
                Découvrez nos plats par catégorie et commandez directement sur WhatsApp.
              </p>
            </div>

            <ApercuMenu
              categories={categories}
              dishes={dishes}
              imagesDisponibles={imagesDisponibles}
            />

            <div className="flex justify-center pt-4">
              <Button href="/menu" variante="primaire" taille="lg">
                Consulter la carte complète
              </Button>
            </div>
          </div>
        </Conteneur>
      </Section>

      {/* 6. Infos pratiques */}
      <Section fond="creme-fonce" espacement="normal">
        <Conteneur>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="flex flex-col gap-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-orange)]">
                Accès & horaires
              </span>
              <h2 className="text-2xl sm:text-4xl font-bold tracking-tight">
                Retrouvez Go Slow à Atakpamé
              </h2>
              <div className="flex flex-col gap-3 text-neutral-700 text-sm pt-2">
                <div className="flex items-start gap-3">
                  <Icon name="repere" size="sm" className="text-[var(--color-orange)] mt-1" />
                  <div>
                    <span className="font-semibold block text-[var(--color-anthracite)]">
                      Adresse
                    </span>
                    <span>{settings.address}</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="horloge" size="sm" className="text-[var(--color-orange)] mt-1" />
                  <div>
                    <span className="font-semibold block text-[var(--color-anthracite)]">
                      Horaires de service
                    </span>
                    <span>Du lundi au samedi, à partir de 8h du matin</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="livraison" size="sm" className="text-[var(--color-orange)] mt-1" />
                  <div>
                    <span className="font-semibold block text-[var(--color-anthracite)]">
                      Zone de livraison
                    </span>
                    <span>{settings.deliveryText}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <Button href={settings.mapsLink} externe variante="secondaire">
                  <Icon name="repere" size="sm" />
                  Ouvrir l&apos;itinéraire Google Maps
                </Button>
              </div>
            </div>

            <Cadre variante="coin" className="p-8 bg-[var(--color-creme)] border border-[var(--color-creme-fonce)]">
              <div className="flex flex-col gap-4 text-center items-center">
                <Icon name="carte" size="lg" className="text-[var(--color-orange)]" />
                <h3 className="font-bold text-xl">Localisation à Atakpamé</h3>
                <p className="text-sm text-neutral-600">
                  Situé au cœur de la ville pour vos déjeuners, dîners ou commandes à emporter.
                </p>
                <div className="text-xs font-semibold text-neutral-500 pt-2">
                  Code Plus : {settings.plusCode}
                </div>
              </div>
            </Cadre>
          </div>
        </Conteneur>
      </Section>

      {/* 7. Appel final */}
      <Section fond="anthracite" espacement="normal" className="text-center">
        <Conteneur>
          <div className="max-w-2xl mx-auto flex flex-col items-center gap-6">
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[var(--color-creme)]">
              Envie d&apos;un bon repas togolais ?
            </h2>
            <p className="text-neutral-300 text-base sm:text-lg">
              Réservez votre table à l&apos;avance ou commandez vos plats préférés
              en livraison à Atakpamé.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <Button href="/reserver" variante="primaire" taille="lg">
                <Icon name="calendrier" size="md" />
                Réserver une table
              </Button>
              <Button
                href={urlCommandeDirecte}
                externe
                variante="secondaire"
                taille="lg"
                className="!text-[var(--color-creme)] !border-[var(--color-creme)]"
              >
                <Icon name="whatsapp" size="md" />
                Commander sur WhatsApp
              </Button>
            </div>
          </div>
        </Conteneur>
      </Section>
    </div>
  );
}
