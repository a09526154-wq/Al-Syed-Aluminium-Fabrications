/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_APP_URL || "https://alsyedfabrications.com",
  generateRobotsTxt: true,
  sitemapSize: 7000,
  generateIndexSitemap: false,
  exclude: ["/admin*", "/api*"],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin*", "/api*"],
      },
    ],
  },
  additionalPaths: async (config) => {
    const dynamicSlugs = [
      "aluminium-windows",
      "glass-doors",
      "curtain-walls",
      "glass-railings",
      "shower-enclosures",
      "acp-cladding",
    ];

    return dynamicSlugs.map((slug) => ({
      loc: `/services/${slug}`,
      changefreq: "weekly",
      priority: 0.8,
      lastmod: new Date().toISOString(),
    }));
  },
};
