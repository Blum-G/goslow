"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

interface BarreActionsMobileProps {
  telephone?: string;
}

export function BarreActionsMobile({
  telephone = "90000000",
}: BarreActionsMobileProps) {
  const [clavierVisible, setClavierVisible] = useState(false);

  const urlCommande = buildWhatsAppUrl(
    "Bonjour Go Slow, je souhaite commander un repas en livraison.",
  );

  useEffect(() => {
    // Définir la variable CSS sur :root
    document.documentElement.style.setProperty(
      "--barre-actions-hauteur",
      "64px",
    );

    function onFocusIn(e: FocusEvent) {
      const cible = e.target as HTMLElement;
      if (
        cible &&
        (cible.tagName === "INPUT" ||
          cible.tagName === "TEXTAREA" ||
          cible.getAttribute("contenteditable") === "true")
      ) {
        setClavierVisible(true);
      }
    }

    function onFocusOut() {
      setClavierVisible(false);
    }

    window.addEventListener("focusin", onFocusIn);
    window.addEventListener("focusout", onFocusOut);

    return () => {
      window.removeEventListener("focusin", onFocusIn);
      window.removeEventListener("focusout", onFocusOut);
    };
  }, []);

  return (
    <aside
      aria-label="Actions rapides"
      className={`fixed inset-x-0 bottom-0 z-40 md:hidden border-t border-[var(--color-creme-fonce)] bg-[var(--color-creme)]/95 backdrop-blur-md transition-transform duration-300 ease-[var(--ease-smooth)] ${
        clavierVisible ? "translate-y-full pointer-events-none" : "translate-y-0"
      }`}
      style={{
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
      }}
    >
      <div className="grid grid-cols-3 h-16 items-center divide-x divide-[var(--color-creme-fonce)]">
        {/* Action 1 : Réserver */}
        <Link
          href="/reserver"
          className="flex flex-col items-center justify-center gap-1 h-full text-center text-[var(--color-anthracite)] hover:text-[var(--color-orange)] active:bg-[var(--color-creme-fonce)] transition-colors focus-visible:ring-2 focus-visible:ring-[var(--color-orange)]"
        >
          <Icon name="calendrier" size="sm" className="text-[var(--color-orange)]" />
          <span className="text-[11px] font-semibold tracking-wide">
            Réserver
          </span>
        </Link>

        {/* Action 2 : Commander (WhatsApp) */}
        <a
          href={urlCommande}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center gap-1 h-full text-center bg-[color-mix(in_srgb,var(--color-orange)_10%,transparent)] text-[var(--color-orange)] active:bg-[color-mix(in_srgb,var(--color-orange)_20%,transparent)] transition-colors focus-visible:ring-2 focus-visible:ring-[var(--color-orange)]"
        >
          <Icon name="whatsapp" size="sm" />
          <span className="text-[11px] font-bold tracking-wide">
            Commander
          </span>
        </a>

        {/* Action 3 : Appeler */}
        <a
          href={`tel:${telephone}`}
          className="flex flex-col items-center justify-center gap-1 h-full text-center text-[var(--color-anthracite)] hover:text-[var(--color-orange)] active:bg-[var(--color-creme-fonce)] transition-colors focus-visible:ring-2 focus-visible:ring-[var(--color-orange)]"
        >
          <Icon name="telephone" size="sm" />
          <span className="text-[11px] font-semibold tracking-wide">
            Appeler
          </span>
        </a>
      </div>
    </aside>
  );
}
