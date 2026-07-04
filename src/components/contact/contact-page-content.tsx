'use client';

import { useTranslations } from 'next-intl';
import ContactForm from '@/components/sections/contact-form';
import { Contact } from '@/lib/constants/site';
import { Phone, Mail, MessageCircle, MapPin, MessageSquareMore } from 'lucide-react';

export function ContactPageContent({
    locale,
    breadcrumbLD,
}: {
    locale: string;
    breadcrumbLD: object;
}) {
    const t = useTranslations('Contact');

    return (
        <div className="page-shell">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLD) }}
            />

            {/* Page header */}
            <section className="container pt-12 pb-8">
                <span className="inline-flex items-center gap-2 rounded-full bg-[var(--color-secondary-container)] px-4 py-1 text-label-lg text-[var(--color-on-secondary-container)] font-bold mb-4">
                    <MessageSquareMore className="w-4 h-4 text-[var(--color-primary)]" /> {t('consultationBadge')}
                </span>
                <h1 className="text-headline-lg md:text-[40px] font-bold text-[var(--color-on-background)] max-w-xl">
                    {t('title')}
                </h1>
                <p className="mt-3 max-w-xl text-body-lg text-[var(--color-on-surface-variant)]">
                    {t('sub')}
                </p>
            </section>

            {/* Main grid: Form + Info */}
            <section className="container pb-16 grid gap-8 lg:grid-cols-[1.3fr_1fr] items-stretch">
                {/* Contact Form Wrapper */}
                <div className="flex flex-col h-full">
                    <ContactForm locale={locale} />
                </div>

                {/* Info sidebar */}
                <aside className="rounded-[2rem] border border-[var(--color-surface-variant)] bg-[var(--color-surface-container-low)] p-8 space-y-6 flex flex-col justify-between h-full min-h-[500px]">
                    <div className="space-y-6">
                        <h2 className="text-title-md font-bold text-[var(--color-on-surface)]">
                            {t('infoTitle')}
                        </h2>

                        <div className="space-y-4">
                            <ContactItem
                                icon={<Phone className="w-5 h-5 text-[var(--color-primary)]" />}
                                label={t('labelPhone')}
                                value={Contact.phone}
                                href={`tel:${Contact.phoneTel}`}
                            />
                            <ContactItem
                                icon={<Mail className="w-5 h-5 text-[var(--color-primary)]" />}
                                label="Email"
                                value={Contact.email}
                                href={`mailto:${Contact.email}`}
                            />
                            <ContactItem
                                icon={<MessageCircle className="w-5 h-5 text-[var(--color-primary)]" />}
                                label="Zalo"
                                value="zalo.me/rubyhsk"
                                href={Contact.zalo}
                                external
                            />
                            <ContactItem
                                icon={<MapPin className="w-5 h-5 text-[var(--color-primary)]" />}
                                label={t('labelAddress')}
                                value={locale === 'vi' ? Contact.address : Contact.addressEn}
                            />
                        </div>
                    </div>

                    <div className="rounded-[2rem] bg-[var(--color-primary-fixed)] px-6 py-4 mt-auto shadow-sm">
                        <p className="text-label-lg font-bold text-[var(--color-on-primary-fixed)]">
                            {locale === 'vi' ? Contact.replyTime.vi : Contact.replyTime.en}
                        </p>
                        <p className="mt-1 text-label-sm text-[var(--color-on-surface-variant)]">
                            {t('infoBadgeText')}
                        </p>
                    </div>
                </aside>
            </section>

            {/* Map Embed Section */}
            <section className="container pb-16">
                <div className="aspect-video md:aspect-[21/9] w-full overflow-hidden rounded-[2rem] border border-[var(--color-surface-variant)] bg-[var(--color-surface-container-low)] p-2 shadow-sm">
                    <iframe
                        src="https://maps.google.com/maps?cid=10357135247248641986&output=embed&hl=vi"
                        width="100%"
                        height="100%"
                        style={{ border: 0, borderRadius: '1.5rem' }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    />
                </div>
            </section>
        </div>
    );
}

function ContactItem({
    icon,
    label,
    value,
    href,
    external,
}: {
    icon: React.ReactNode;
    label: string;
    value: string;
    href?: string;
    external?: boolean;
}) {
    return (
        <div className="flex items-start gap-3">
            <div className="mt-0.5">{icon}</div>
            <div>
                <p className="text-label-sm text-[var(--color-on-surface-variant)]">{label}</p>
                {href ? (
                    <a
                        href={href}
                        className="text-body-md font-semibold text-[var(--color-primary)] hover:underline break-all"
                        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    >
                        {value}
                    </a>
                ) : (
                    <p className="text-body-md font-semibold text-[var(--color-on-surface)]">{value}</p>
                )}
            </div>
        </div>
    );
}
