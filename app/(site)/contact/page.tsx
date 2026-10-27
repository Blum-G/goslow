import { getSettings } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { Conteneur } from "@/components/ui/Conteneur";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Cadre } from "@/components/ui/Cadre";

export const metadata = buildMetadata({
  title: "Adresse, horaires et contact | Go Slow Atakpamé",
  description:
    "Retrouvez les coordonnées du Bar Restaurant Go Slow à Atakpamé au Togo : adresse, horaires d'ouverture dès 8h, numéro WhatsApp et itinéraire Maps.",
  path: "/contact",
});

export default async function PageContact() {
  const settings = await getSettings();
  const urlWhatsApp = buildWhatsAppUrl("Bonjour Go Slow, je souhaite vous contacter.");

  return (
    <Section fond="creme" espacement="normal">
      <Conteneur>
        <div className="flex flex-col gap-12 max-w-4xl mx-auto">
          <header className="flex flex-col gap-3 text-center items-center">
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-orange)]">
              Nous trouver & échanger
            </span>
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight">
              Contact et coordonnées à Atakpamé
            </h1>
            <p className="text-base text-neutral-600 max-w-xl leading-relaxed">
              Venez déguster nos plats en salle ou contactez-nous pour organiser
              une commande en livraison dans Atakpamé et ses environs.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Carte Infos */}
            <div className="flex flex-col gap-6 rounded-[var(--radius-grand)] border border-[var(--color-creme-fonce)] bg-[var(--color-creme-fonce)] p-8">
              <h2 className="text-xl font-bold tracking-tight text-[var(--color-anthracite)]">
                Coordonnées directes
              </h2>

              <div className="flex flex-col gap-5 text-sm">
                <div className="flex items-start gap-3">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[var(--color-creme)] text-[var(--color-orange)]">
                    <Icon name="repere" size="sm" />
                  </div>
                  <div>
                    <span className="font-bold text-[var(--color-anthracite)] block">
                      Adresse
                    </span>
                    <span className="text-neutral-700">{settings.address}</span>
                    <span className="block text-xs text-neutral-500 mt-0.5">
                      Code Plus : {settings.plusCode}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[var(--color-creme)] text-[var(--color-orange)]">
                    <Icon name="horloge" size="sm" />
                  </div>
                  <div>
                    <span className="font-bold text-[var(--color-anthracite)] block">
                      Horaires d&apos;ouverture
                    </span>
                    <span className="text-neutral-700">
                      Du lundi au samedi, à partir de 8h du matin
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[var(--color-creme)] text-[var(--color-orange)]">
                    <Icon name="telephone" size="sm" />
                  </div>
                  <div>
                    <span className="font-bold text-[var(--color-anthracite)] block">
                      Téléphone
                    </span>
                    <a
                      href={`tel:${settings.phone}`}
                      className="text-neutral-700 hover:text-[var(--color-orange)] transition-colors font-medium"
                    >
                      {settings.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[var(--color-creme)] text-[var(--color-orange)]">
                    <Icon name="whatsapp" size="sm" />
                  </div>
                  <div>
                    <span className="font-bold text-[var(--color-anthracite)] block">
                      WhatsApp direct
                    </span>
                    <a
                      href={urlWhatsApp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[var(--color-orange)] hover:underline font-semibold"
                    >
                      Démarrer une conversation
                    </a>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[color-mix(in_srgb,var(--color-anthracite)_10%,transparent)] flex flex-wrap gap-3">
                <Button href={settings.mapsLink} externe variante="primaire">
                  <Icon name="repere" size="sm" />
                  Ouvrir l&apos;itinéraire Maps
                </Button>
                <Button href={urlWhatsApp} externe variante="secondaire">
                  <Icon name="whatsapp" size="sm" />
                  WhatsApp
                </Button>
              </div>
            </div>

            {/* Carte Livraison */}
            <div className="flex flex-col gap-6 justify-between">
              <Cadre variante="coin" className="p-8 bg-[var(--color-creme)] border border-[var(--color-creme-fonce)]">
                <div className="flex flex-col gap-3">
                  <div className="flex size-10 items-center justify-center rounded-full bg-[var(--color-creme-fonce)] text-[var(--color-orange)]">
                    <Icon name="livraison" size="md" />
                  </div>
                  <h3 className="font-bold text-lg">Livraison de repas</h3>
                  <p className="text-sm text-neutral-600 leading-relaxed">
                    {settings.deliveryText}
                  </p>
                </div>
              </Cadre>

              <Cadre variante="arche" className="p-8 bg-[var(--color-anthracite)] text-[var(--color-creme)] text-center flex flex-col items-center justify-center gap-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-orange)]">
                  Réservation
                </span>
                <p className="text-base font-semibold">
                  Une table pour aujourd&apos;hui ou un groupe ?
                </p>
                <Button href="/reserver" variante="primaire" taille="md">
                  Réserver une table
                </Button>
              </Cadre>
            </div>
          </div>
        </div>
      </Conteneur>
    </Section>
  );
}
