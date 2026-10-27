import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Bar Restaurant Go Slow",
    short_name: "Go Slow",
    description:
      "Bar restaurant à Atakpamé au Togo. Cuisine locale authentique, Foufou, Ayimolou, grillades et livraison.",
    start_url: "/",
    display: "standalone",
    background_color: "#FAF6EE",
    theme_color: "#F26A1B",
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
