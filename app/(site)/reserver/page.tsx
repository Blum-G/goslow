import { buildMetadata } from "@/lib/seo";
import { Conteneur } from "@/components/ui/Conteneur";
import { Section } from "@/components/ui/Section";
import { FormulaireReservation } from "@/components/forms/FormulaireReservation";
import { Cadre } from "@/components/ui/Cadre";
import { Icon } from "@/components/ui/Icon";

export const metadata = buildMetadata({
  title: "Réserver une table à Atakpamé | Go Slow",
  description:
    "Réservez votre table au Bar Restaurant Go Slow à Atakpamé. Choisissez votre date, heure et plats souhaités en quelques clics via WhatsApp.",
  path: "/reserver",
});

export default function PageReserver() {
  return (
    <Section fond="creme" espacement="normal">
      <Conteneur>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Présentation */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-orange)]">
              Accueil en salle
            </span>
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight">
              Réserver votre table chez Go Slow
            </h1>
            <p className="text-base text-neutral-600 leading-relaxed">
              Pour un déjeuner entre collègues, un dîner en famille ou une
              grande tablée de fin de semaine, réservez à l&apos;avance pour que
              votre table et vos plats soient prêts dès votre arrivée.
            </p>

            <Cadre variante="coin" className="p-6 bg-[var(--color-creme-fonce)]">
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2 text-[var(--color-orange)]">
                  <Icon name="horloge" size="sm" />
                  <span className="text-sm font-bold">Horaires d&apos;accueil</span>
                </div>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  Du lundi au samedi à partir de 8h du matin. Pour les groupes
                  ou les commandes de Foufou frais, la confirmation se fait
                  directement sur WhatsApp.
                </p>
              </div>
            </Cadre>
          </div>

          {/* Formulaire */}
          <div className="lg:col-span-7">
            <FormulaireReservation />
          </div>
        </div>
      </Conteneur>
    </Section>
  );
}
