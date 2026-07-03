import { createServerSupabaseClient } from '@/lib/supabase/server';
import type { Metadata } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://rubyhsk.vn';

function getLocalizedValue(value: string | null, locale: string): string | null {
    if (!value) return null;
    try {
        const parsed = JSON.parse(value);
        if (parsed && typeof parsed === 'object') {
            return parsed[locale] || parsed['vi'] || value;
        }
    } catch {
        // Not JSON, return as-is
    }
    return value;
}

export async function getDbMetadata(
    locale: string,
    path: string,
    fallbackTitle: string,
    fallbackDesc: string
): Promise<Metadata> {
    try {
        const supabase = createServerSupabaseClient();
        const { data, error } = await supabase
            .from('page_metadata')
            .select('*')
            .eq('page_path', path)
            .eq('is_active', true)
            .maybeSingle();

        if (error) {
            console.error(`Postgrest error fetching metadata for path ${path}:`, error);
        }

        if (data) {
            const title = getLocalizedValue(data.title, locale) || fallbackTitle;
            const description = getLocalizedValue(data.description, locale) || fallbackDesc;
            const keywords = getLocalizedValue(data.keywords, locale) || undefined;
            const ogTitle = getLocalizedValue(data.og_title, locale) || title;
            const ogDescription = getLocalizedValue(data.og_description, locale) || description;
            const twitterTitle = getLocalizedValue(data.twitter_title, locale) || ogTitle;
            const twitterDescription = getLocalizedValue(data.twitter_description, locale) || ogDescription;
            const ogImage = data.og_image || undefined;
            const twitterImage = data.twitter_image || ogImage;

            const canonicalPath = data.canonical_url || path;

            return {
                title,
                description,
                ...(keywords && { keywords }),
                alternates: {
                    canonical: `/${locale}${canonicalPath}`,
                    languages: { vi: `/vi${canonicalPath}`, en: `/en${canonicalPath}` },
                },
                openGraph: {
                    title: ogTitle + ' | Ruby HSK',
                    description: ogDescription,
                    url: `${siteUrl}/${locale}${canonicalPath}`,
                    locale: locale === 'vi' ? 'vi_VN' : 'en_US',
                    type: (data.og_type as any) || 'website',
                    ...(ogImage && { images: [{ url: ogImage }] }),
                },
                twitter: {
                    card: (data.twitter_card as any) || 'summary_large_image',
                    title: twitterTitle + ' | Ruby HSK',
                    description: twitterDescription,
                    ...(twitterImage ? { images: [twitterImage] } : {}),
                },
                ...(data.robots && { robots: data.robots }),
            };
        }
    } catch (error) {
        console.error(`Failed to fetch SEO metadata for path ${path}:`, error);
    }

    // Fallback to static if no DB record or error
    return {
        title: fallbackTitle,
        description: fallbackDesc,
        alternates: {
            canonical: `/${locale}${path}`,
            languages: { vi: `/vi${path}`, en: `/en${path}` },
        },
        openGraph: {
            title: `${fallbackTitle} | Ruby HSK`,
            description: fallbackDesc,
            url: `${siteUrl}/${locale}${path}`,
            locale: locale === 'vi' ? 'vi_VN' : 'en_US',
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: `${fallbackTitle} | Ruby HSK`,
            description: fallbackDesc,
        },
    };
}
