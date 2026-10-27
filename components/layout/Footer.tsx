import Link from "next/link";
import { Conteneur } from "@/components/ui/Conteneur";
import { Icon } from "@/components/ui/Icon";
import { getSettings } from "@/lib/data";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export async function Footer() {
  const settings = await getSettings();
  const annee = new Date().getFullYear();
  const urlWhatsApp = buildWhatsAppUrl("Bonjour Go Slow, je souhaite vous contacter.");

  return (
    <footer className="border-t border-[var(--color-creme-fonce)] bg-[var(--color-creme-fonce)] text-[var(--color-anthracite)] pt-14 pb-20 md:pb-12">
      <Conteneur>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 pb-12 border-b border-[color-mix(in_srgb,var(--color-anthracite)_12%,transparent)]">
          {/* Colonne 1 : Navigation */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <span className="flex size-8 items-center justify-center rounded-[var(--radius-petit)] bg-[var(--color-anthracite)] text-[var(--color-creme)] font-bold text-sm">
                GS
              </span>
              <span className="font-bold tracking-tight text-lg">GO SLOW</span>
            </div>
            <p className="text-sm text-neutral-600 leading-relaxed">
              Bar Restaurant chaleureux à Atakpamé. Spécialités togolaises,
              plats classiques et livraison à domicile ou au bureau.
            </p>
            <nav className="flex flex-col gap-2 pt-2" aria-label="Navigation pied de page">
              <Link href="/" className="text-sm hover:text-[var(--color-orange)] transition-colors">
                Accueil
              </Link>
              <Link href="/menu" className="text-sm hover:text-[var(--color-orange)] transition-colors">
                Menu & plats du jour
              </Link>
              <Link href="/reserver" className="text-sm hover:text-[var(--color-orange)] transition-colors">
                Réserver une table
              </Link>
              <Link href="/contact" className="text-sm hover:text-[var(--color-orange)] transition-colors">
                Coordonnées & itinéraire
              </Link>
              <Link href="/mentions-legales" className="text-sm text-neutral-500 hover:text-[var(--color-orange)] transition-colors">
                Mentions légales
              </Link>
            </nav>
          </div>

          {/* Colonne 2 : Informations pratiques */}
          <div className="flex flex-col gap-4">
            <h2 className="text-base font-bold tracking-tight text-[var(--color-anthracite)]">
              Informations pratiques
            </h2>
            <div className="flex flex-col gap-3 text-sm text-neutral-700">
              <div className="flex items-start gap-2.5">
                <Icon name="repere" size="sm" className="text-[var(--color-orange)] mt-0.5" />
                <span>{settings.address}</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Icon name="horloge" size="sm" className="text-[var(--color-orange)] mt-0.5" />
                <span>Du lundi au samedi, à partir de 8h</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Icon name="telephone" size="sm" className="text-[var(--color-orange)] mt-0.5" />
                <a href={`tel:${settings.phone}`} className="hover:text-[var(--color-orange)] transition-colors">
                  {settings.phone}
                </a>
              </div>
              <div className="flex items-start gap-2.5">
                <Icon name="whatsapp" size="sm" className="text-[var(--color-orange)] mt-0.5" />
                <a
                  href={urlWhatsApp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--color-orange)] transition-colors font-medium text-[var(--color-orange)]"
                >
                  WhatsApp Go Slow
                </a>
              </div>
              <div className="flex items-start gap-2.5 pt-1 text-xs text-neutral-600">
                <Icon name="livraison" size="sm" className="text-[var(--color-orange)] mt-0.5" />
                <span>{settings.deliveryText}</span>
              </div>
            </div>
          </div>

          {/* Colonne 3 : Esprit Go Slow et Réseaux */}
          <div className="flex flex-col gap-4">
            <h2 className="text-base font-bold tracking-tight text-[var(--color-anthracite)]">
              L&apos;esprit Go Slow
            </h2>
            <p className="text-sm text-neutral-600 leading-relaxed">
              Prendre le temps de bien manger, partager un repas convivial et
              savourer la cuisine locale dans une ambiance posée.
            </p>
            <div className="rounded-[var(--radius-petit)] bg-[var(--color-creme)] p-4 border border-[color-mix(in_srgb,var(--color-anthracite)_8%,transparent)]">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-orange)] block mb-1">
                Slogan
              </span>
              <span className="text-sm font-semibold text-[var(--color-anthracite)]">
                Bonne cuisine • Bon moment
              </span>
            </div>
            <div className="flex items-center gap-3 pt-1">
              {settings.facebookUrl && (
                <a
                  href={settings.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-neutral-600 hover:text-[var(--color-orange)] transition-colors"
                >
                  Page Facebook
                </a>
              )}
              <a
                href={settings.mapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-neutral-600 hover:text-[var(--color-orange)] transition-colors"
              >
                Localisation Google Maps
              </a>
            </div>
          </div>
        </div>

        {/* Ligne inférieure */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-neutral-500">
          <p>© {annee} Bar Restaurant Go Slow à Atakpamé. Tous droits réservés.</p>
          <p>Site vitrine officiel • Cuisine locale et livraison</p>
        </div>
      </Conteneur>
    </footer>
  );
}
