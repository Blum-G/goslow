import type { ComponentType } from "react";
import {
  WhatsappLogo,
  Phone,
  MapPin,
  X,
  List,
  ArrowRight,
  ArrowLeft,
  CaretDown,
  CaretUp,
  Star,
  ShoppingBag,
  Plus,
  Minus,
  MagnifyingGlass,
  Check,
  Warning,
  Info,
  Calendar,
  Users,
  ShareNetwork,
  type IconProps as PhosphorProps,
} from "@phosphor-icons/react";
import {
  IconBol,
  IconCouverts,
  IconLivraison,
  IconHorloge,
  IconRepere,
} from "./icons/GoSlowIcons";

export type IconName =
  | "bol"
  | "couverts"
  | "livraison"
  | "horloge"
  | "repere"
  | "whatsapp"
  | "telephone"
  | "carte"
  | "fermer"
  | "menu"
  | "fleche-droite"
  | "fleche-gauche"
  | "chevron-bas"
  | "chevron-haut"
  | "etoile"
  | "panier"
  | "plus"
  | "moins"
  | "recherche"
  | "check"
  | "avertissement"
  | "info"
  | "calendrier"
  | "personnes"
  | "partager";

export type IconTaille = "sm" | "md" | "lg";

interface IconProps {
  name: IconName;
  size?: IconTaille;
  className?: string;
  label?: string;
}

const dimensions: Record<IconTaille, { px: number; classe: string }> = {
  sm: { px: 16, classe: "h-4 w-4" },
  md: { px: 24, classe: "h-6 w-6" },
  lg: { px: 32, classe: "h-8 w-8" },
};

const registreGoSlow: Record<string, ComponentType<{ className?: string }>> = {
  bol: IconBol,
  couverts: IconCouverts,
  livraison: IconLivraison,
  horloge: IconHorloge,
  repere: IconRepere,
};

const registrePhosphor: Record<string, ComponentType<PhosphorProps>> = {
  whatsapp: WhatsappLogo,
  telephone: Phone,
  carte: MapPin,
  fermer: X,
  menu: List,
  "fleche-droite": ArrowRight,
  "fleche-gauche": ArrowLeft,
  "chevron-bas": CaretDown,
  "chevron-haut": CaretUp,
  etoile: Star,
  panier: ShoppingBag,
  plus: Plus,
  moins: Minus,
  recherche: MagnifyingGlass,
  check: Check,
  avertissement: Warning,
  info: Info,
  calendrier: Calendar,
  personnes: Users,
  partager: ShareNetwork,
};

export function Icon({
  name,
  size = "md",
  className = "",
  label,
}: IconProps) {
  const { px, classe } = dimensions[size];
  const accessibilite = label
    ? { role: "img", "aria-label": label }
    : { "aria-hidden": true as const };

  const ComposantGoSlow = registreGoSlow[name];
  if (ComposantGoSlow) {
    return (
      <ComposantGoSlow
        className={`inline-block shrink-0 ${classe} ${className}`}
        {...accessibilite}
      />
    );
  }

  const ComposantPhosphor = registrePhosphor[name];
  if (ComposantPhosphor) {
    return (
      <ComposantPhosphor
        size={px}
        weight="regular"
        className={`inline-block shrink-0 ${classe} ${className}`}
        {...accessibilite}
      />
    );
  }

  return null;
}
