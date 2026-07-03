import type { Metadata } from 'next';
import { Noto_Sans } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { AppProviders } from '@/components/providers/app-providers';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { MobileBottomNav } from '@/components/layout/mobile-bottom-nav';
import { FloatingContact } from '@/components/layout/floating-contact';
import { buildOrganizationLD } from '@/lib/seo/jsonld';
import '../globals.scss';

const notoSans = Noto_Sans({ subsets: ['latin', 'vietnamese'], display: 'swap' });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://rubyhsk.vn';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Ruby HSK - Học Tiếng Trung & Luyện Thi HSK',
    template: '%s | Ruby HSK',
  },
  description:
    'Trung tâm dạy tiếng Trung và luyện thi HSK cùng cô Trần Hồng Ngọc. Lộ trình HSK 1-6, lớp nhỏ, phương pháp học nhẹ nhàng và hiệu quả.',
  keywords: [
    'học tiếng Trung',
    'luyện thi HSK',
    'trung tâm tiếng Trung',
    'khóa học HSK',
    'Ruby HSK',
    'Trần Hồng Ngọc',
    'tiếng Trung giao tiếp',
  ],
  authors: [{ name: 'Ruby HSK', url: siteUrl }],
  creator: 'Ruby HSK',
  openGraph: {
    type: 'website',
    siteName: 'Ruby HSK',
    title: 'Ruby HSK - Học Tiếng Trung & Luyện Thi HSK',
    description:
      'Trung tâm dạy tiếng Trung và luyện thi HSK cùng cô Trần Hồng Ngọc. Lộ trình HSK 1-6, lớp nhỏ, phương pháp học nhẹ nhàng và hiệu quả.',
    images: [
      {
        url: '/og-default.png',
        width: 1200,
        height: 630,
        alt: 'Ruby HSK - Học tiếng Trung & luyện thi HSK cùng cô Trần Hồng Ngọc',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ruby HSK - Học Tiếng Trung & Luyện Thi HSK',
    description:
      'Trung tâm dạy tiếng Trung và luyện thi HSK cùng cô Trần Hồng Ngọc.',
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
        <NextIntlClientProvider messages={messages} locale={locale}>
          <AppProviders>
            <div className="page-shell">
              <Header />
              <main>{children}</main>
              <Footer />
              <FloatingContact />
              <MobileBottomNav />
            </div>
          </AppProviders>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
