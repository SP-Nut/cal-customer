import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://spkansard.com",
      lastModified: new Date()
    }
  ];
}

