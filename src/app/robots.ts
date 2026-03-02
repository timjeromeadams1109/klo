import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/auth/", "/profile"],
      },
    ],
    sitemap: "https://keithlodom.io/sitemap.xml",
  };
}
