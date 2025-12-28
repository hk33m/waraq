import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://altakamull.com";

  return [
    {
      url: baseUrl,
      priority: 1,
    },
    {
      url: `${baseUrl}/products`,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/production`,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/quality`,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/sustainability`,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/clients`,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      priority: 0.7,
    },
  ];
}
