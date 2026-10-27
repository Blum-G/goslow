import type { Metadata } from "next";
import {
  SHOW_PRICES,
  WHATSAPP_NUMBER,
  NUMERO_WHATSAPP_PROVISOIRE,
  IS_INDEXING_ENABLED,
} from "./config";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

const DEFAULT_OG_IMAGE = "/images/og-default.jpg";

type BuildMetadataOptions = {
  title: string;
  description: string;
  path?: string;
  image?: string;
};

export function buildMetadata({
  title,
  description,
  path = "/",
  image = DEFAULT_OG_IMAGE,
}: BuildMetadataOptions): Metadata {
  const canonical = new URL(path, SITE_URL).toString();

  return {
    title,
    description,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical,
    },
    robots: IS_INDEXING_ENABLED
      ? { index: true, follow: true }
      : { index: false, follow: false },
    openGraph: {
      type: "website",
      locale: "fr_TG",
      siteName: "Bar Restaurant Go Slow à Atakpamé",
      title,
      description,
      url: canonical,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export function genererJsonLdRestaurant() {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: "Bar Restaurant Go Slow",
    description:
      "Bar Restaurant à Atakpamé proposant des plats locaux authentiques (Foufou, Ayimolou, Akumé), grillades et service de livraison.",
    url: SITE_URL,
    menu: `${SITE_URL}/menu`,
    servesCuisine: ["Cuisine togolaise", "Plats locaux", "Classiques"],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Atakpamé",
      addressRegion: "Plateaux",
      addressCountry: "TG",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 7.5199662,
      longitude: 1.1402761,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "08:00",
      },
    ],
  };

  if (SHOW_PRICES) {
    schema.priceRange = "1000 - 2500 FCFA";
  }

  if (WHATSAPP_NUMBER !== NUMERO_WHATSAPP_PROVISOIRE) {
    schema.telephone = `+${WHATSAPP_NUMBER}`;
  }

  return schema;
}

export function genererJsonLdBreadcrumbs(
  elements: Array<{ nom: string; url: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: elements.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.nom,
      item: item.url.startsWith("http")
        ? item.url
        : `${SITE_URL}${item.url}`,
    })),
  };
}
