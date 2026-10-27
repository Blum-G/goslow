"use client";

import { useEffect } from "react";
import { Conteneur } from "@/components/ui/Conteneur";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Cadre } from "@/components/ui/Cadre";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Erreur capturee par Next.js
  }, [error]);

  const urlAideWhatsApp = buildWhatsAppUrl(
    "Bonjour Go Slow, j'ai rencontré un souci d'affichage sur le site et je souhaite vous contacter directement.",
  );

  return (
    <Section fond="creme" espacement="normal" className="min-h-[70svh] flex items-center">
      <Conteneur>
        <div className="flex flex-col items-center text-center max-w-xl mx-auto gap-6">
          <Cadre variante="coin" className="p-8 bg-[var(--color-creme-fonce)]">
            <div className="size-14 rounded-full bg-[var(--color-creme)] flex items-center justify-center text-[var(--color-orange)]">
              <Icon name="avertissement" size="lg" />
            </div>
          </Cadre>

          <div className="flex flex-col gap-2">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Une interruption temporaire est survenue
            </h1>
            <p className="text-neutral-600 text-base leading-relaxed">
              Nous prenons un court instant pour rétablir la situation. Vous
              pouvez relancer l&apos;affichage ou nous joindre directement sur
              WhatsApp pour passer commande ou réserver une table.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Button onClick={() => reset()} variante="primaire">
              Réessayer l&apos;affichage
            </Button>
            <Button href={urlAideWhatsApp} externe variante="secondaire">
              <Icon name="whatsapp" size="sm" />
              Nous écrire sur WhatsApp
            </Button>
          </div>
        </div>
      </Conteneur>
    </Section>
  );
}
