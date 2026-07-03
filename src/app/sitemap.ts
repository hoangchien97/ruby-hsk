import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://rubyhsk.vn';

/** Public routes (không bao gồm coming-soon, 404) */
const publicRoutes = [
    { path: '', priority: 1.0, changeFrequency: 'weekly' as const },
    { path: '/courses', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/about', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/contact', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/privacy', priority: 0.3, changeFrequency: 'yearly' as const },
    { path: '/terms', priority: 0.3, changeFrequency: 'yearly' as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
    const now = new Date();
    const entries: MetadataRoute.Sitemap = [];

    for (const locale of routing.locales) {
        for (const route of publicRoutes) {
            entries.push({
                url: `${siteUrl}/${locale}${route.path}`,
                lastModified: now,
                changeFrequency: route.changeFrequency,
                priority: route.priority,
                alternates: {
                    languages: Object.fromEntries(
                        routing.locales.map((l) => [l, `${siteUrl}/${l}${route.path}`]),
                    ),
                },
            });
        }
    }

    return entries;
}
