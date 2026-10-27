import { buildMetadata } from "@/lib/seo";
import { Conteneur } from "@/components/ui/Conteneur";
import { Section } from "@/components/ui/Section";

export const metadata = buildMetadata({
  title: "Mentions légales | Go Slow Atakpamé",
  description:
    "Mentions légales et informations éditoriales du site vitrine du Bar Restaurant Go Slow à Atakpamé au Togo.",
  path: "/mentions-legales",
});

export default function PageMentionsLegales() {
  return (
    <Section fond="creme" espacement="normal">
      <Conteneur>
        <article className="max-w-3xl mx-auto flex flex-col gap-8">
          <header className="flex flex-col gap-2 border-b border-[var(--color-creme-fonce)] pb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-orange)]">
              Informations réglementaires
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Mentions légales
            </h1>
          </header>

          <div className="flex flex-col gap-8 text-[0.9375rem] leading-relaxed text-neutral-800">
            {/* 1. Identité */}
            <section className="flex flex-col gap-2">
              <h2 className="text-xl font-bold text-[var(--color-anthracite)]">
                1. Identité de l&apos;établissement
              </h2>
              <p>
                Le site internet accessible à l&apos;adresse officielle est édité
                par l&apos;établissement <strong>Bar Restaurant Go Slow</strong>,
                situé dans la ville d&apos;<strong>Atakpamé</strong>, Région des
                Plateaux, République Togolaise.
              </p>
              <p>
                Activité : Restauration sur place, bar, vente de plats à emporter
                et livraison de repas dans Atakpamé et ses environs.
              </p>
            </section>

            {/* 2. Édition et hébergement */}
            <section className="flex flex-col gap-2">
              <h2 className="text-xl font-bold text-[var(--color-anthracite)]">
                2. Édition et hébergement
              </h2>
              <p>
                Le site vitrine est conçu avec Next.js et TypeScript.
              </p>
              <p>
                L&apos;hébergement de l&apos;application est assuré par la
                plateforme <strong>Vercel Inc.</strong> (440 N Barranca Ave
                #4133, Covina, CA 91723, États-Unis).
              </p>
            </section>

            {/* 3. Traitement des commandes et réservations */}
            <section className="flex flex-col gap-2">
              <h2 className="text-xl font-bold text-[var(--color-anthracite)]">
                3. Réservations et commandes via WhatsApp
              </h2>
              <p>
                Les formulaires et boutons présents sur le site ne procèdent à
                aucun paiement en ligne ni à aucun enregistrement de données
                personnelles sur un serveur distant. Ils génèrent un message
                prérempli transmis directement sur l&apos;application WhatsApp
                du restaurant.
              </p>
              <p>
                Toute réservation ou commande n&apos;est réputée définitive
                qu&apos;après confirmation expresse envoyée en retour par
                l&apos;équipe du restaurant. Les prix indiqués sur le site ont un
                caractère informatif et indicatif.
              </p>
            </section>

            {/* 4. Propriété intellectuelle */}
            <section className="flex flex-col gap-2">
              <h2 className="text-xl font-bold text-[var(--color-anthracite)]">
                4. Propriété intellectuelle
              </h2>
              <p>
                L&apos;ensemble des contenus textuels, photographies des plats,
                logos, pictogrammes et identité visuelle sont la propriété
                exclusive du Bar Restaurant Go Slow ou font l&apos;objet
                d&apos;une autorisation d&apos;exploitation. Toute reproduction
                ou diffusion sans accord préalable est interdite.
              </p>
            </section>

            {/* 5. Avertissement */}
            <div className="rounded-[var(--radius-petit)] bg-[var(--color-creme-fonce)] p-5 border border-[color-mix(in_srgb,var(--color-orange)_25%,transparent)]">
              <p className="text-xs text-neutral-600 italic">
                Note de conformité : Le présent texte a été rédigé à titre
                éditorial pour la version initiale du site vitrine et est destiné
                à être validé formellement par la direction du Bar Restaurant Go
                Slow.
              </p>
            </div>
          </div>
        </article>
      </Conteneur>
    </Section>
  );
}
