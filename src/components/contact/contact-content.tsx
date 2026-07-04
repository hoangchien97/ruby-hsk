'use client';

import { useTranslations } from 'next-intl';
import ContactForm from '@/components/sections/contact-form';
import { Contact } from '@/lib/constants/site';
import { Phone, Mail, MessageCircle, MapPin, MessageSquareMore } from 'lucide-react';

export function ContactContent({
    locale,
    breadcrumbLD,
}: {
    locale: string;
    breadcrumbLD: object;
}) {
    const t = useTranslations('Contact');
    const isVi = locale === 'vi';

    return (
        <div className="page-shell">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLD) }}
            />

            {/* Page header */}
            <section className="container pt-12 pb-8">
                <span className="inline-flex items-center gap-2 rounded-full bg-[var(--color-secondary-container)] px-4 py-1 text-label-lg text-[var(--color-on-secondary-container)] font-bold mb-4">
                    <MessageSquareMore className="w-4 h-4" /> {isVi ? 'Tư vấn miễn phí' : 'Free consultation'}
                </span>
                <h1 className="text-headline-lg md:text-[40px] font-bold text-[var(--color-on-background)] max-w-xl">
                    {t('title')}
                </h1>
                <p className="mt-3 max-w-xl text-body-lg text-[var(--color-on-surface-variant)]">
                    {t('sub')}
                </p>
            </section>

            {/* Main grid: Form + Info */}
            <section className="container pb-16 grid gap-8 lg:grid-cols-[1fr_0.7fr] items-start">
                {/* Contact Form */}
                <ContactForm locale={locale} />

                {/* Info sidebar */}
                <aside className="rounded-[2rem] border border-[var(--color-surface-variant)] bg-[var(--color-surface-container-low)] p-8 space-y-6">
                    <h2 className="text-title-md font-bold text-[var(--color-on-surface)]">
                        {isVi ? 'Thông tin liên hệ' : 'Contact information'}
                    </h2>

                    <div className="space-y-4">
                        <ContactItem
                            icon={<Phone className="w-5 h-5 text-[var(--color-primary)]" />}
                            label={isVi ? 'Hotline' : 'Phone'}
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
                            label={isVi ? 'Địa chỉ' : 'Address'}
                            value={isVi ? Contact.address : Contact.addressEn}
                        />
                    </div>

                    <div className="rounded-[2rem] bg-[var(--color-primary-fixed)] px-4 py-3">
                        <p className="text-label-lg font-bold text-[var(--color-on-primary-fixed)]">
                            {isVi ? Contact.replyTime.vi : Contact.replyTime.en}
                        </p>
                        <p className="mt-1 text-label-sm text-[var(--color-on-surface-variant)]">
                            {isVi ? 'Tư vấn hoàn toàn miễn phí.' : 'Consultation is completely free.'}
                        </p>
                    </div>

                    {/* Map Embed */}
                    <div className="aspect-video w-full overflow-hidden rounded-2xl border border-[var(--color-surface-variant)] shadow-sm">
                        <iframe
                            src="https://maps.google.com/maps?cid=10357135247248641986&output=embed&hl=vi"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    </div>
                </aside>
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
                        className="text-body-md font-semibold text-[var(--color-primary)] hover:underline"
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
