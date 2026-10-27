import type { Metadata } from "next";
import { Conteneur } from "@/components/ui/Conteneur";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Cadre } from "@/components/ui/Cadre";

export const metadata: Metadata = {
  title: "Cette page n'est pas au menu",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <Section fond="creme" espacement="normal" className="min-h-[70svh] flex items-center">
      <Conteneur>
        <div className="flex flex-col items-center text-center max-w-xl mx-auto gap-6">
          <Cadre variante="coin" className="p-8 bg-[var(--color-creme-fonce)]">
            <div className="flex flex-col items-center gap-3">
              <span className="text-4xl font-bold text-[var(--color-orange)]">
                404
              </span>
              <div className="size-12 rounded-full bg-[var(--color-creme)] flex items-center justify-center text-[var(--color-orange)]">
                <Icon name="bol" size="md" />
              </div>
            </div>
          </Cadre>

          <div className="flex flex-col gap-2">
            <h1 className="text-2xl sm:text-4xl font-bold tracking-tight">
              Cette page n&apos;est pas au menu
            </h1>
            <p className="text-neutral-600 text-base leading-relaxed">
              Le lien que vous avez suivi n&apos;existe plus ou a été déplacé.
              Retrouvez nos spécialités locales et nos informations pratiques
              depuis l&apos;accueil ou le menu.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Button href="/" variante="primaire">
              Retour à l&apos;accueil
            </Button>
            <Button href="/menu" variante="secondaire">
              Consulter le menu
            </Button>
          </div>
        </div>
      </Conteneur>
    </Section>
  );
}
