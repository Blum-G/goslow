"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { LienAnime } from "@/components/ui/LienAnime";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Cadre } from "@/components/ui/Cadre";
import { SeparateurDessine } from "@/components/ui/SeparateurDessine";
import { ChampTexte } from "@/components/ui/ChampTexte";
import { ChampZone } from "@/components/ui/ChampZone";
import { Accordeon } from "@/components/ui/Accordeon";
import { Etiquette } from "@/components/ui/Etiquette";
import { Conteneur } from "@/components/ui/Conteneur";
import { Section } from "@/components/ui/Section";
import { useNotification } from "@/components/ui/Notification";
import { Reveal } from "@/components/motion/Reveal";
import { RevealGroupe, RevealElement } from "@/components/motion/RevealGroupe";
import { RevealMasque } from "@/components/motion/RevealMasque";
import { TitreMots } from "@/components/motion/TitreMots";

const iconesGoSlow: IconName[] = [
  "bol",
  "couverts",
  "livraison",
  "horloge",
  "repere",
];

const iconesPhosphor: IconName[] = [
  "whatsapp",
  "telephone",
  "carte",
  "panier",
  "etoile",
  "calendrier",
  "personnes",
  "recherche",
  "check",
  "avertissement",
  "info",
  "fermer",
  "menu",
  "fleche-droite",
  "fleche-gauche",
  "chevron-bas",
  "plus",
  "moins",
];

const questionsFaq = [
  {
    id: "horaires",
    titre: "Quels sont les jours et heures d'ouverture ?",
    contenu:
      "Le Bar Restaurant Go Slow vous accueille du lundi au samedi à partir de 8h du matin. Les horaires du dimanche et de fermeture sont en cours de confirmation.",
  },
  {
    id: "livraison",
    titre: "Comment fonctionne la livraison à Atakpamé ?",
    contenu:
      "La livraison est assurée dans Atakpamé et ses environs immédiats. La commande et les frais de livraison sont directement confirmés avec l'équipe sur WhatsApp.",
  },
  {
    id: "reservation",
    titre: "Est-il nécessaire de réserver à l'avance ?",
    contenu:
      "Pour les groupes ou les plats signature très demandés (Foufou, Ayimolou), une réservation via notre formulaire ou sur WhatsApp est vivement recommandée.",
  },
];

export function DemoUiClient() {
  const { succes, erreur, info } = useNotification();
  const [chargementBouton, setChargementBouton] = useState(false);
  const [valeurNom, setValeurNom] = useState("Koffi Mensah");
  const [valeurTel, setValeurTel] = useState("");
  const [valeurMessage, setValeurMessage] = useState("");

  const testerChargement = () => {
    setChargementBouton(true);
    setTimeout(() => {
      setChargementBouton(false);
      succes("Action terminée avec succès");
    }, 1500);
  };

  return (
    <div className="min-h-svh bg-[var(--color-creme)] text-[var(--color-anthracite)] pb-24">
      {/* En-tête */}
      <header className="border-b border-[var(--color-creme-fonce)] bg-[var(--color-creme)] py-8">
        <Conteneur>
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <Etiquette variante="orange">Interne / Développement</Etiquette>
              <Etiquette variante="neutre">Étape 2</Etiquette>
            </div>
            <TitreMots
              as="h1"
              texte="Bibliothèque de composants UI"
              className="text-3xl md:text-5xl font-bold tracking-tight"
            />
            <p className="max-w-2xl text-neutral-600">
              Page de validation visuelle et technique de tous les composants
              réutilisables du site Go Slow. Respecte la signature visuelle,
              l&apos;accessibilité et les contraintes mobiles.
            </p>
          </div>
        </Conteneur>
      </header>

      <main className="flex flex-col gap-16 py-12">
        {/* 1. Boutons */}
        <section aria-labelledby="titre-boutons">
          <Conteneur>
            <div className="flex flex-col gap-6">
              <h2
                id="titre-boutons"
                className="text-2xl font-bold border-b border-[var(--color-creme-fonce)] pb-2"
              >
                1. Boutons (`Button.tsx`)
              </h2>
              <p className="text-sm text-neutral-600">
                Remplissage montant au survol/toucher, support tactile complet,
                tailles `md` et `lg`, variantes primaire, secondaire et discret,
                magnétisme fluide sur PC.
              </p>

              {/* Variantes et tailles */}
              <div className="flex flex-wrap items-center gap-4">
                <Button variante="primaire" taille="md" magnetique>
                  <Icon name="whatsapp" size="sm" />
                  Commander sur WhatsApp
                </Button>
                <Button variante="secondaire" taille="md" magnetique>
                  <Icon name="couverts" size="sm" />
                  Consulter le menu
                </Button>
                <Button variante="discret" taille="md">
                  En savoir plus
                  <Icon name="fleche-droite" size="sm" />
                </Button>
              </div>

              {/* Grande taille */}
              <div className="flex flex-wrap items-center gap-4">
                <Button variante="primaire" taille="lg" magnetique>
                  <Icon name="bol" size="md" />
                  Réserver une table (LG)
                </Button>
                <Button variante="secondaire" taille="lg" magnetique>
                  <Icon name="telephone" size="md" />
                  Appeler le restaurant (LG)
                </Button>
              </div>

              {/* États */}
              <div className="flex flex-wrap items-center gap-4">
                <Button
                  variante="primaire"
                  chargement={chargementBouton}
                  onClick={testerChargement}
                >
                  {chargementBouton ? "Envoi en cours..." : "Tester l'état chargement"}
                </Button>
                <Button variante="secondaire" disabled>
                  Bouton désactivé
                </Button>
                <Button
                  variante="secondaire"
                  href="https://maps.app.goo.gl/BsTbSbsZThnK3iMM6"
                  externe
                >
                  <Icon name="repere" size="sm" />
                  Lien externe Google Maps
                </Button>
              </div>
            </div>
          </Conteneur>
        </section>

        {/* 2. Liens animés */}
        <section aria-labelledby="titre-liens">
          <Conteneur>
            <div className="flex flex-col gap-6">
              <h2
                id="titre-liens"
                className="text-2xl font-bold border-b border-[var(--color-creme-fonce)] pb-2"
              >
                2. Liens animés (`LienAnime.tsx`)
              </h2>
              <div className="flex flex-wrap items-center gap-8">
                <LienAnime href="/menu">
                  Consulter tous nos plats
                </LienAnime>
                <LienAnime href="/reserver">
                  Formulaire de réservation
                </LienAnime>
                <LienAnime
                  href="https://maps.app.goo.gl/BsTbSbsZThnK3iMM6"
                  externe
                >
                  Ouvrir l&apos;itinéraire Maps
                </LienAnime>
              </div>
            </div>
          </Conteneur>
        </section>

        {/* 3. Système d'icônes */}
        <section aria-labelledby="titre-icones">
          <Conteneur>
            <div className="flex flex-col gap-6">
              <h2
                id="titre-icones"
                className="text-2xl font-bold border-b border-[var(--color-creme-fonce)] pb-2"
              >
                3. Système d&apos;icônes (`Icon.tsx` + `icons/`)
              </h2>

              {/* Icônes Go Slow dessinées sur mesure */}
              <div>
                <h3 className="text-base font-semibold text-[var(--color-orange)] mb-3">
                  Icônes Go Slow dessinées sur mesure (même trait que Phosphor)
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                  {iconesGoSlow.map((nom) => (
                    <div
                      key={nom}
                      className="flex flex-col items-center justify-center gap-2 rounded-[var(--radius-petit)] border border-[var(--color-creme-fonce)] bg-[var(--color-creme-fonce)] p-4"
                    >
                      <Icon name={nom} size="lg" className="text-[var(--color-orange)]" />
                      <span className="text-xs font-medium">{nom}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Icônes Phosphor intégrées */}
              <div>
                <h3 className="text-base font-semibold text-[var(--color-anthracite)] mb-3">
                  Registre Phosphor unifié (épaisseur regular)
                </h3>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                  {iconesPhosphor.map((nom) => (
                    <div
                      key={nom}
                      className="flex flex-col items-center justify-center gap-2 rounded-[var(--radius-petit)] border border-[var(--color-creme-fonce)] p-3 text-center"
                    >
                      <Icon name={nom} size="md" />
                      <span className="text-[11px] text-neutral-600">{nom}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tailles */}
              <div>
                <h3 className="text-sm font-semibold text-neutral-600 mb-2">
                  Tailles disponibles : `sm` (16px), `md` (24px), `lg` (32px)
                </h3>
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <Icon name="bol" size="sm" />
                    <span className="text-xs">sm</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="bol" size="md" />
                    <span className="text-xs">md</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="bol" size="lg" />
                    <span className="text-xs">lg</span>
                  </div>
                </div>
              </div>
            </div>
          </Conteneur>
        </section>

        {/* 4. Étiquettes */}
        <section aria-labelledby="titre-etiquettes">
          <Conteneur>
            <div className="flex flex-col gap-6">
              <h2
                id="titre-etiquettes"
                className="text-2xl font-bold border-b border-[var(--color-creme-fonce)] pb-2"
              >
                4. Étiquettes (`Etiquette.tsx`)
              </h2>
              <div className="flex flex-wrap items-center gap-3">
                <Etiquette variante="orange">Signature Go Slow</Etiquette>
                <Etiquette variante="neutre">Plats locaux</Etiquette>
                <Etiquette variante="neutre">Classiques</Etiquette>
                <Etiquette variante="anthracite">Livraison rapide</Etiquette>
                <Etiquette variante="orange">Foufou du jour</Etiquette>
              </div>
            </div>
          </Conteneur>
        </section>

        {/* 5. Cadres et masques */}
        <section aria-labelledby="titre-cadres">
          <Conteneur>
            <div className="flex flex-col gap-6">
              <h2
                id="titre-cadres"
                className="text-2xl font-bold border-b border-[var(--color-creme-fonce)] pb-2"
              >
                5. Cadres de signature visuelle (`Cadre.tsx`)
              </h2>
              <p className="text-sm text-neutral-600">
                Variantes `decale`, `coin` et `arche` pour éviter les bordures
                grises et ombres génériques.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                {/* Décalé */}
                <div className="flex flex-col gap-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                    Variante `decale`
                  </span>
                  <Cadre variante="decale" className="p-6">
                    <div className="flex flex-col gap-2">
                      <Icon name="bol" size="lg" className="text-[var(--color-orange)]" />
                      <h3 className="font-bold text-lg">Foufou traditionnel</h3>
                      <p className="text-sm text-neutral-600">
                        Pâte d&apos;igname pilée servie avec sa sauce locale.
                      </p>
                      <span className="font-bold text-[var(--color-orange)]">
                        1 500 FCFA
                      </span>
                    </div>
                  </Cadre>
                </div>

                {/* Coin */}
                <div className="flex flex-col gap-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                    Variante `coin` (inspirée de la feuille)
                  </span>
                  <Cadre
                    variante="coin"
                    className="p-6 bg-[var(--color-creme-fonce)] border border-[color-mix(in_srgb,var(--color-orange)_25%,transparent)]"
                  >
                    <div className="flex flex-col gap-2">
                      <Icon name="livraison" size="lg" className="text-[var(--color-orange)]" />
                      <h3 className="font-bold text-lg">Livraison locale</h3>
                      <p className="text-sm text-neutral-600">
                        Livré chaud chez vous à Atakpamé et environs.
                      </p>
                    </div>
                  </Cadre>
                </div>

                {/* Arche */}
                <div className="flex flex-col gap-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                    Variante `arche`
                  </span>
                  <Cadre
                    variante="arche"
                    className="p-6 bg-[var(--color-anthracite)] text-[var(--color-creme)] text-center h-[240px] flex flex-col justify-end items-center"
                  >
                    <Icon name="horloge" size="lg" className="text-[var(--color-orange)] mb-2" />
                    <h3 className="font-bold text-base">Depuis 8h du matin</h3>
                    <p className="text-xs text-neutral-300 mt-1">
                      Du lundi au samedi
                    </p>
                  </Cadre>
                </div>
              </div>
            </div>
          </Conteneur>
        </section>

        {/* 6. Séparateurs dessinés */}
        <section aria-labelledby="titre-separateurs">
          <Conteneur>
            <div className="flex flex-col gap-6">
              <h2
                id="titre-separateurs"
                className="text-2xl font-bold border-b border-[var(--color-creme-fonce)] pb-2"
              >
                6. Séparateurs dessinés (`SeparateurDessine.tsx`)
              </h2>
              <div className="flex flex-col gap-6 text-[var(--color-orange)]">
                <div>
                  <span className="text-xs text-neutral-500 mb-1 block">
                    Variante courbe (statique)
                  </span>
                  <SeparateurDessine variante="courbe" />
                </div>
                <div>
                  <span className="text-xs text-neutral-500 mb-1 block">
                    Variante vague (animée au scroll)
                  </span>
                  <SeparateurDessine variante="vague" anime />
                </div>
              </div>
            </div>
          </Conteneur>
        </section>

        {/* 7. Champs de formulaire */}
        <section aria-labelledby="titre-formulaires">
          <Conteneur>
            <div className="flex flex-col gap-6 max-w-xl">
              <h2
                id="titre-formulaires"
                className="text-2xl font-bold border-b border-[var(--color-creme-fonce)] pb-2"
              >
                7. Formulaires (`ChampTexte.tsx`, `ChampZone.tsx`)
              </h2>
              <p className="text-sm text-neutral-600">
                Libellé flottant, trait orange de focus dessiné de gauche à
                droite, typographie &ge; 16 px évitant le zoom iOS, messages
                d&apos;erreur et d&apos;aide accessibles.
              </p>

              <div className="flex flex-col gap-4">
                <ChampTexte
                  id="champ-nom"
                  libelle="Nom complet"
                  value={valeurNom}
                  onChange={(e) => setValeurNom(e.target.value)}
                  aide="Indiquez votre prénom et nom pour la réservation"
                  required
                />

                <ChampTexte
                  id="champ-tel"
                  type="tel"
                  libelle="Numéro de téléphone / WhatsApp"
                  value={valeurTel}
                  onChange={(e) => setValeurTel(e.target.value)}
                  erreur={
                    valeurTel.length > 0 && valeurTel.length < 8
                      ? "Le numéro doit comporter au moins 8 chiffres"
                      : undefined
                  }
                  aide="Exemple : 90 00 00 00"
                  required
                />

                <ChampZone
                  id="champ-remarque"
                  libelle="Remarque ou demande particulière"
                  value={valeurMessage}
                  onChange={(e) => setValeurMessage(e.target.value)}
                  aide="Optionnel : préciser des allergies ou un horaire spécifique"
                  rows={3}
                />
              </div>
            </div>
          </Conteneur>
        </section>

        {/* 8. Accordéon */}
        <section aria-labelledby="titre-accordeon">
          <Conteneur>
            <div className="flex flex-col gap-6 max-w-2xl">
              <h2
                id="titre-accordeon"
                className="text-2xl font-bold border-b border-[var(--color-creme-fonce)] pb-2"
              >
                8. Accordéon accessible (`Accordeon.tsx`)
              </h2>
              <p className="text-sm text-neutral-600">
                Mode simple (une seule section ouverte) ou multiple, rotation
                fluide de l&apos;icône, attributs `aria-expanded` et `aria-controls`.
              </p>
              <Accordeon
                elements={questionsFaq}
                mode="simple"
                elementsOuvertsDefaut={["horaires"]}
              />
            </div>
          </Conteneur>
        </section>

        {/* 9. Notifications */}
        <section aria-labelledby="titre-notifications">
          <Conteneur>
            <div className="flex flex-col gap-6">
              <h2
                id="titre-notifications"
                className="text-2xl font-bold border-b border-[var(--color-creme-fonce)] pb-2"
              >
                9. Notifications (`useNotification()`)
              </h2>
              <p className="text-sm text-neutral-600">
                Affichées en bas de l&apos;écran au-dessus de la zone mobile,
                disparition automatique et rôle d&apos;annonce lecteur d&apos;écran.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <Button
                  variante="primaire"
                  onClick={() =>
                    succes(
                      "Table réservée avec succès",
                      "Votre demande a été transmise au restaurant sur WhatsApp.",
                    )
                  }
                >
                  Déclencher Succès
                </Button>
                <Button
                  variante="secondaire"
                  onClick={() =>
                    erreur(
                      "Horaires non disponibles",
                      "Veuillez choisir un horaire d'ouverture du restaurant.",
                    )
                  }
                >
                  Déclencher Erreur
                </Button>
                <Button
                  variante="discret"
                  onClick={() =>
                    info(
                      "Plat du jour ajouté",
                      "Le Foufou a été ajouté à votre sélection.",
                    )
                  }
                >
                  Déclencher Information
                </Button>
              </div>
            </div>
          </Conteneur>
        </section>

        {/* 10. Composants de mouvement */}
        <section aria-labelledby="titre-motion">
          <Conteneur>
            <div className="flex flex-col gap-8">
              <h2
                id="titre-motion"
                className="text-2xl font-bold border-b border-[var(--color-creme-fonce)] pb-2"
              >
                10. Animations accessibles (`components/motion/`)
              </h2>

              {/* Titre mot par mot */}
              <div className="flex flex-col gap-2">
                <span className="text-xs text-neutral-500 uppercase tracking-wider font-semibold">
                  Titre mot par mot (`TitreMots.tsx`)
                </span>
                <TitreMots
                  as="h3"
                  texte="Bonne cuisine • Bon moment au Bar Restaurant Go Slow"
                  className="text-2xl md:text-3xl font-bold text-[var(--color-orange)]"
                />
              </div>

              {/* Reveal simple */}
              <Reveal className="p-6 rounded-[var(--radius-petit)] bg-[var(--color-creme-fonce)] border border-[color-mix(in_srgb,var(--color-orange)_20%,transparent)]">
                <h4 className="font-bold text-lg">
                  Apparition douce au scroll (`Reveal.tsx`)
                </h4>
                <p className="text-sm text-neutral-600 mt-1">
                  Ce bloc apparaît avec un léger glissement vertical et un fondu,
                  sans à-coup et dans le respect de prefers-reduced-motion.
                </p>
              </Reveal>

              {/* Cascade RevealGroupe */}
              <div className="flex flex-col gap-2">
                <span className="text-xs text-neutral-500 uppercase tracking-wider font-semibold">
                  Cascade d&apos;enfants avec décalage (`RevealGroupe.tsx`)
                </span>
                <RevealGroupe className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <RevealElement className="p-4 rounded-[var(--radius-petit)] bg-[var(--color-creme)] border border-[var(--color-creme-fonce)]">
                    <span className="font-bold text-sm block">Élément 1</span>
                    <span className="text-xs text-neutral-600">Décalage initial</span>
                  </RevealElement>
                  <RevealElement className="p-4 rounded-[var(--radius-petit)] bg-[var(--color-creme)] border border-[var(--color-creme-fonce)]">
                    <span className="font-bold text-sm block">Élément 2</span>
                    <span className="text-xs text-neutral-600">+80 ms</span>
                  </RevealElement>
                  <RevealElement className="p-4 rounded-[var(--radius-petit)] bg-[var(--color-creme)] border border-[var(--color-creme-fonce)]">
                    <span className="font-bold text-sm block">Élément 3</span>
                    <span className="text-xs text-neutral-600">+160 ms</span>
                  </RevealElement>
                </RevealGroupe>
              </div>

              {/* Masque clip-path */}
              <div className="flex flex-col gap-2">
                <span className="text-xs text-neutral-500 uppercase tracking-wider font-semibold">
                  Révélation par masque performant (`RevealMasque.tsx`)
                </span>
                <RevealMasque
                  direction="bas-haut"
                  className="p-8 rounded-[var(--radius-petit)] bg-[var(--color-anthracite)] text-[var(--color-creme)] flex items-center justify-between"
                >
                  <div>
                    <h4 className="font-bold text-lg">Clip-path bas-haut</h4>
                    <p className="text-xs text-neutral-300 mt-1">
                      Idéal pour les bannières, photos de plats et héro.
                    </p>
                  </div>
                  <Icon name="bol" size="lg" className="text-[var(--color-orange)]" />
                </RevealMasque>
              </div>
            </div>
          </Conteneur>
        </section>

        {/* 11. Variantes de Section */}
        <section aria-labelledby="titre-sections">
          <Conteneur>
            <div className="flex flex-col gap-6">
              <h2
                id="titre-sections"
                className="text-2xl font-bold border-b border-[var(--color-creme-fonce)] pb-2"
              >
                11. Sections et fonds réguliers (`Section.tsx`)
              </h2>
            </div>
          </Conteneur>

          <div className="mt-6 flex flex-col gap-4">
            <Section fond="creme-fonce" espacement="compact">
              <Conteneur>
                <div className="flex items-center justify-between">
                  <span className="font-bold">Fond crème foncé</span>
                  <Etiquette variante="orange">Section compacte</Etiquette>
                </div>
              </Conteneur>
            </Section>

            <Section fond="anthracite" espacement="compact">
              <Conteneur>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[var(--color-creme)]">
                    Fond anthracite (contraste inversé)
                  </span>
                  <Etiquette variante="anthracite">Texte crème</Etiquette>
                </div>
              </Conteneur>
            </Section>
          </div>
        </section>
      </main>
    </div>
  );
}
