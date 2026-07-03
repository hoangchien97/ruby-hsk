import type {Metadata} from 'next';
import {Noto_Sans} from 'next/font/google';
import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import {routing} from '@/i18n/routing';
import {AppProviders} from '@/components/providers/app-providers';
import {Header} from '@/components/layout/header';
import {Footer} from '@/components/layout/footer';
import {MobileBottomNav} from '@/components/layout/mobile-bottom-nav';
import {FloatingContact} from '@/components/layout/floating-contact';
import '../globals.scss';

const notoSans = Noto_Sans({subsets: ['latin', 'vietnamese'], display: 'swap'});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export const metadata: Metadata = {
  title: 'Ruby HSK - Học tiếng Trung & luyện thi HSK',
  description: 'Website trung tâm dạy tiếng Trung và luyện thi HSK cùng cô Trần Hồng Ngọc.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000')
};

export default async function LocaleLayout({children, params}: {children: React.ReactNode; params: Promise<{locale: string}>}) {
  const {locale} = await params;
  const messages = await getMessages();
  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={notoSans.className}>
        <NextIntlClientProvider messages={messages}>
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
