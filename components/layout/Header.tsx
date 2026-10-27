"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Conteneur } from "@/components/ui/Conteneur";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

const liensNavigation = [
  { href: "/menu", libelle: "Menu" },
  { href: "/reserver", libelle: "Réserver" },
  { href: "/contact", libelle: "Contact" },
];

export function Header() {
  const [menuOuvert, setMenuOuvert] = useState(false);
  const pathname = usePathname();
  const conteneurMenuRef = useRef<HTMLDivElement | null>(null);
  const boutonOuvrirRef = useRef<HTMLButtonElement | null>(null);

  const urlCommande = buildWhatsAppUrl(
    "Bonjour Go Slow, je souhaite passer commande en livraison.",
  );


  useEffect(() => {
    function gererTouche(e: KeyboardEvent) {
      if (e.key === "Escape" && menuOuvert) {
        setMenuOuvert(false);
        boutonOuvrirRef.current?.focus();
      }

      if (e.key === "Tab" && menuOuvert && conteneurMenuRef.current) {
        const elementsFocusables = conteneurMenuRef.current.querySelectorAll<
          HTMLAnchorElement | HTMLButtonElement
        >("a[href], button:not([disabled])");
        if (elementsFocusables.length === 0) return;

        const premier = elementsFocusables[0];
        const dernier = elementsFocusables[elementsFocusables.length - 1];

        if (e.shiftKey && document.activeElement === premier) {
          e.preventDefault();
          dernier.focus();
        } else if (!e.shiftKey && document.activeElement === dernier) {
          e.preventDefault();
          premier.focus();
        }
      }
    }

    if (menuOuvert) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", gererTouche);
      // Focus initial sur le premier lien
      setTimeout(() => {
        const premierLien = conteneurMenuRef.current?.querySelector<HTMLAnchorElement>("a[href]");
        premierLien?.focus();
      }, 50);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", gererTouche);
    };
  }, [menuOuvert]);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[var(--color-creme-fonce)] bg-[color-mix(in_srgb,var(--color-creme)_95%,transparent)] backdrop-blur-md transition-colors">
      <Conteneur>
        <div className="flex h-16 md:h-20 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="group flex items-center gap-2 outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-orange)] rounded-[var(--radius-petit)]"
            aria-label="Accueil Bar Restaurant Go Slow"
          >
            <span className="flex size-9 items-center justify-center rounded-[var(--radius-petit)] bg-[var(--color-anthracite)] text-[var(--color-creme)] font-bold text-lg tracking-wider transition-colors group-hover:bg-[var(--color-orange)]">
              GS
            </span>
            <div className="flex flex-col">
              <span className="font-bold tracking-tight text-lg leading-tight text-[var(--color-anthracite)]">
                GO SLOW
              </span>
              <span className="text-[10px] uppercase font-semibold tracking-wider text-neutral-500 hidden sm:inline">
                Atakpamé • Togo
              </span>
            </div>
          </Link>

          {/* Navigation bureau */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Navigation principale">
            {liensNavigation.map((lien) => {
              const estActif = pathname === lien.href;
              return (
                <Link
                  key={lien.href}
                  href={lien.href}
                  className={`group relative text-base font-semibold py-2 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-orange)] rounded-[var(--radius-petit)] ${
                    estActif
                      ? "text-[var(--color-orange)]"
                      : "text-[var(--color-anthracite)] hover:text-[var(--color-orange)]"
                  }`}
                >
                  {lien.libelle}
                  <span
                    className={`absolute bottom-0 left-0 h-[2px] w-full origin-left bg-[var(--color-orange)] transition-transform duration-300 ease-[var(--ease-smooth)] ${
                      estActif ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`}
                    aria-hidden="true"
                  />
                </Link>
              );
            })}
          </nav>

          {/* Action bureau */}
          <div className="hidden md:flex items-center gap-3">
            <Button href={urlCommande} externe variante="primaire" taille="md">
              <Icon name="whatsapp" size="sm" />
              Commander
            </Button>
          </div>

          {/* Déclencheur menu mobile */}
          <div className="flex md:hidden items-center gap-2">
            <Button href={urlCommande} externe variante="primaire" taille="md" className="!px-3 text-xs">
              <Icon name="whatsapp" size="sm" />
              Commander
            </Button>
            <button
              ref={boutonOuvrirRef}
              type="button"
              onClick={() => setMenuOuvert(true)}
              aria-expanded={menuOuvert}
              aria-controls="menu-mobile-plein-ecran"
              aria-label="Ouvrir le menu de navigation"
              className="flex size-11 items-center justify-center rounded-[var(--radius-petit)] border border-[var(--color-creme-fonce)] bg-[var(--color-creme)] text-[var(--color-anthracite)] transition-colors hover:bg-[var(--color-creme-fonce)] focus-visible:ring-2 focus-visible:ring-[var(--color-orange)]"
            >
              <Icon name="menu" size="md" />
            </button>
          </div>
        </div>
      </Conteneur>

      {/* Menu mobile plein écran */}
      {menuOuvert && (
        <div
          id="menu-mobile-plein-ecran"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation mobile"
          ref={conteneurMenuRef}
          className="fixed inset-0 z-50 flex flex-col bg-[var(--color-creme)] px-6 py-6 overflow-y-auto"
        >
          {/* Haut du panneau */}
          <div className="flex items-center justify-between pb-6 border-b border-[var(--color-creme-fonce)]">
            <Link
              href="/"
              onClick={() => setMenuOuvert(false)}
              className="flex items-center gap-2"
            >
              <span className="flex size-9 items-center justify-center rounded-[var(--radius-petit)] bg-[var(--color-anthracite)] text-[var(--color-creme)] font-bold text-lg">
                GS
              </span>
              <span className="font-bold tracking-tight text-lg text-[var(--color-anthracite)]">
                GO SLOW
              </span>
            </Link>

            <button
              type="button"
              onClick={() => setMenuOuvert(false)}
              aria-label="Fermer le menu"
              className="flex size-11 items-center justify-center rounded-[var(--radius-petit)] border border-[var(--color-creme-fonce)] bg-[var(--color-creme)] text-[var(--color-anthracite)] hover:bg-[var(--color-creme-fonce)] focus-visible:ring-2 focus-visible:ring-[var(--color-orange)]"
            >
              <Icon name="fermer" size="md" />
            </button>
          </div>

          {/* Liens en cascade */}
          <div className="flex flex-col gap-6 py-10 flex-1 justify-center">
            <Link
              href="/"
              onClick={() => setMenuOuvert(false)}
              className="text-2xl font-bold tracking-tight text-[var(--color-anthracite)] hover:text-[var(--color-orange)] transition-colors"
            >
              Accueil
            </Link>
            {liensNavigation.map((lien) => (
              <Link
                key={lien.href}
                href={lien.href}
                onClick={() => setMenuOuvert(false)}
                className={`text-2xl font-bold tracking-tight transition-colors ${
                  pathname === lien.href
                    ? "text-[var(--color-orange)]"
                    : "text-[var(--color-anthracite)] hover:text-[var(--color-orange)]"
                }`}
              >
                {lien.libelle}
              </Link>
            ))}
          </div>

          {/* Bas du panneau mobile */}
          <div className="pt-6 border-t border-[var(--color-creme-fonce)] flex flex-col gap-4">
            <Button href={urlCommande} externe variante="primaire" taille="lg" className="w-full">
              <Icon name="whatsapp" size="md" />
              Commander sur WhatsApp
            </Button>
            <p className="text-xs text-neutral-500 text-center">
              Atakpamé, Togo • Du lundi au samedi dès 8h
            </p>
          </div>
        </div>
      )}
    </header>
  );
}
