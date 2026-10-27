import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { getDishes } from "@/lib/data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();
  const dishes = await getDishes();

  const pagesStatiques: MetadataRoute.Sitemap = [
    {
      url: new URL("/", SITE_URL).toString(),
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: new URL("/menu", SITE_URL).toString(),
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: new URL("/reserver", SITE_URL).toString(),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: new URL("/contact", SITE_URL).toString(),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: new URL("/mentions-legales", SITE_URL).toString(),
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  const fichesPlats: MetadataRoute.Sitemap = dishes.map((dish) => ({
    url: new URL(`/menu/${dish.slug}`, SITE_URL).toString(),
    lastModified,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...pagesStatiques, ...fichesPlats];
}
