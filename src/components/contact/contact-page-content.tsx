'use client';

import ContactForm from '@/components/sections/contact-form';
import { ContactHeader } from './contact-header';
import { ContactInfoSidebar } from './contact-info-sidebar';
import { ContactMap } from './contact-map';
import { ContactFaq } from './contact-faq';

export function ContactPageContent({
  locale,
  breadcrumbLD,
}: {
  locale: string;
  breadcrumbLD: object;
}) {
  return (
    <div className="page-shell">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLD) }}
      />

      {/* Page header */}
      <ContactHeader />

      {/* Main grid: Form + Info */}
      <section className="app-section">
        <div className="app-container grid gap-8 lg:grid-cols-[1.3fr_1fr] items-stretch">
          {/* Contact Form Wrapper */}
          <div className="flex flex-col h-full">
            <ContactForm locale={locale} />
          </div>

          {/* Info sidebar */}
          <ContactInfoSidebar locale={locale} />
        </div>
      </section>

      {/* Map Embed Section */}
      <ContactMap />

      {/* FAQ Section */}
      <ContactFaq />
    </div>
  );
}
