import type { MetadataRoute } from "next";
import { db } from "@/lib/db";
import { services } from "@/lib/schema";

const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "https://alsyedfabrications.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let serviceRoutes: MetadataRoute.Sitemap = [];
  try {
    const dynamicServices = await db.select().from(services);
    serviceRoutes = dynamicServices.map((srv) => ({
      url: `${siteUrl}/services/${srv.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    }));
  } catch {
    const fallbackSlugs = [
      "aluminium-windows",
      "glass-doors",
      "curtain-walls",
      "glass-railings",
      "shower-enclosures",
      "acp-cladding",
    ];
    serviceRoutes = fallbackSlugs.map((slug) => ({
      url: `${siteUrl}/services/${slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    }));
  }

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${siteUrl}`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${siteUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/services`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/gallery`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/testimonials`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/quote`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  return [...staticRoutes, ...serviceRoutes];
}
