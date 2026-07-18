import type { Metadata } from 'next';
import { Noto_Sans } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { AppProviders } from '@/components/providers/app-providers';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { MobileBottomNav } from '@/components/layout/mobile-bottom-nav';
import { FloatingContact } from '@/components/layout/floating-contact';
import { ScrollToTop } from '@/components/ui/scroll-to-top';
import { buildOrganizationLD } from '@/lib/seo/jsonld';
import NextTopLoader from 'nextjs-toploader';
import '../globals.scss';

const notoSans = Noto_Sans({ subsets: ['latin', 'vietnamese'], display: 'swap' });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://rubyhsk.vn';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'SiteMeta' });

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: t('title'),
      template: '%s | Ruby HSK',
    },
    description: t('description'),
    keywords: t.raw('keywords'),
    authors: [{ name: 'Ruby HSK', url: siteUrl }],
    creator: 'Ruby HSK',
    openGraph: {
      type: 'website',
      siteName: 'Ruby HSK',
      title: t('title'),
      description: t('description'),
      locale: locale === 'vi' ? 'vi_VN' : 'en_US',
      images: [
        {
          url: '/og-default.png',
          width: 1200,
          height: 630,
          alt: t('ogImageAlt'),
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('descriptionShort'),
      images: ['/og-default.png'],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
    verification: {
      google: 'ADD_YOUR_GSC_CODE_HERE',
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const messages = await getMessages();
  const orgLD = buildOrganizationLD();

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLD) }}
        />
      </head>
      <body className={notoSans.className}>
        <NextTopLoader
          color="var(--color-primary)"
          showSpinner={false}
          height={3}
          shadow="0 0 10px var(--color-primary), 0 0 5px var(--color-primary)"
        />
        <NextIntlClientProvider messages={messages} locale={locale}>
          <AppProviders>
            <div className="page-shell">
              <Header />
              <main>{children}</main>
              <Footer locale={locale} />
              <FloatingContact />
              <ScrollToTop />
              <MobileBottomNav />
            </div>
          </AppProviders>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
