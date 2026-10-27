import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

const isIndexingEnabled = process.env.NEXT_PUBLIC_INDEXING === "true";

export default function robots(): MetadataRoute.Robots {
  if (!isIndexingEnabled) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/studio", "/api/", "/ui"],
    },
    sitemap: new URL("/sitemap.xml", SITE_URL).toString(),
  };
}
