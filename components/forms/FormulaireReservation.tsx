"use client";

import { useState, type FormEvent } from "react";
import { ChampTexte } from "@/components/ui/ChampTexte";
import { ChampZone } from "@/components/ui/ChampZone";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { useNotification } from "@/components/ui/Notification";
import { urlReservation, type DonneesReservation } from "@/lib/whatsapp-messages";

export function FormulaireReservation() {
  const { succes, erreur } = useNotification();

  const aujourdhui = new Date().toISOString().split("T")[0];

  const [nom, setNom] = useState("");
  const [telephone, setTelephone] = useState("");
  const [date, setDate] = useState("");
  const [heure, setHeure] = useState("12:30");
  const [personnes, setPersonnes] = useState("2");
  const [platsSouhaites, setPlatsSouhaites] = useState("");
  const [remarque, setRemarque] = useState("");

  const [erreurs, setErreurs] = useState<Record<string, string>>({});

  const valider = (): boolean => {
    const errs: Record<string, string> = {};

    if (!nom.trim()) {
      errs.nom = "Veuillez renseigner votre nom.";
    }

    if (!telephone.trim()) {
      errs.telephone = "Veuillez indiquer un numéro de téléphone.";
    } else if (telephone.replace(/\D/g, "").length < 8) {
      errs.telephone = "Le numéro doit comporter au moins 8 chiffres.";
    }

    if (!date) {
      errs.date = "Veuillez choisir une date.";
    } else if (date < aujourdhui) {
      errs.date = "La date ne peut pas être passée.";
    }

    if (!heure) {
      errs.heure = "Veuillez indiquer une heure d'arrivée.";
    }

    const nbPersonnes = parseInt(personnes, 10);
    if (isNaN(nbPersonnes) || nbPersonnes < 1) {
      errs.personnes = "Indiquez au moins 1 personne.";
    } else if (nbPersonnes > 50) {
      errs.personnes = "Pour plus de 50 personnes, contactez-nous directement.";
    }

    setErreurs(errs);
    return Object.keys(errs).length === 0;
  };

  const soumettre = (e: FormEvent) => {
    e.preventDefault();

    if (!valider()) {
      erreur(
        "Formulaire incomplet",
        "Veuillez vérifier les informations renseignées.",
      );
      return;
    }

    const donnees: DonneesReservation = {
      nom,
      telephone,
      date,
      heure,
      personnes: parseInt(personnes, 10),
      platsSouhaites: platsSouhaites.trim() || undefined,
      remarque: remarque.trim() || undefined,
    };

    const url = urlReservation(donnees);

    succes(
      "Demande prête",
      "Ouverture de WhatsApp pour envoyer votre réservation.",
    );

    // Ouvre le lien WhatsApp
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <form
      onSubmit={soumettre}
      noValidate
      className="flex flex-col gap-5 rounded-[var(--radius-grand)] border border-[var(--color-creme-fonce)] bg-[var(--color-creme)] p-6 sm:p-8 shadow-xs"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <ChampTexte
          id="res-nom"
          libelle="Votre nom"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          erreur={erreurs.nom}
          aide="Prénom et nom pour la table"
          required
        />

        <ChampTexte
          id="res-tel"
          type="tel"
          libelle="Téléphone / WhatsApp"
          value={telephone}
          onChange={(e) => setTelephone(e.target.value)}
          erreur={erreurs.telephone}
          aide="Ex. : 90000000"
          required
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <ChampTexte
          id="res-date"
          type="date"
          libelle="Date de réservation"
          min={aujourdhui}
          value={date}
          onChange={(e) => setDate(e.target.value)}
          erreur={erreurs.date}
          required
        />

        <ChampTexte
          id="res-heure"
          type="time"
          libelle="Heure d'arrivée"
          value={heure}
          onChange={(e) => setHeure(e.target.value)}
          erreur={erreurs.heure}
          required
        />

        <ChampTexte
          id="res-personnes"
          type="number"
          min={1}
          max={50}
          libelle="Nombre de personnes"
          value={personnes}
          onChange={(e) => setPersonnes(e.target.value)}
          erreur={erreurs.personnes}
          required
        />
      </div>

      <ChampTexte
        id="res-plats"
        libelle="Plats souhaités (optionnel)"
        value={platsSouhaites}
        onChange={(e) => setPlatsSouhaites(e.target.value)}
        aide="Ex. : Foufou, Poulet, Ayimolou..."
      />

      <ChampZone
        id="res-remarque"
        libelle="Remarque ou demande particulière (optionnel)"
        rows={3}
        value={remarque}
        onChange={(e) => setRemarque(e.target.value)}
        aide="Précisez un placement souhaité ou un besoin spécifique."
      />

      <div className="pt-2 flex flex-col gap-3">
        <Button type="submit" variante="primaire" taille="lg" className="w-full">
          <Icon name="whatsapp" size="md" />
          Réserver sur WhatsApp
        </Button>
        <p className="text-xs text-neutral-500 text-center">
          Aucune donnée n&apos;est enregistrée sur nos serveurs. Vos informations
          servent uniquement à préremplir votre message WhatsApp.
        </p>
      </div>
    </form>
  );
}
