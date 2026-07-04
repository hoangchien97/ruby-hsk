'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { createBrowserSupabaseClient } from '@/lib/supabase/client';
import { CheckCircle2 } from 'lucide-react';

import { useTranslations } from 'next-intl';

interface ContactFormProps {
    locale: string;
}

type FormState = 'idle' | 'submitting' | 'success' | 'error';

export default function ContactForm({ locale }: ContactFormProps) {
    const t = useTranslations('ContactForm');
    const [state, setState] = useState<FormState>('idle');
    const [errorMsg, setErrorMsg] = useState('');

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setState('submitting');
        setErrorMsg('');

        const form = e.currentTarget;
        const data = new FormData(form);
        const fullName = data.get('fullName') as string;
        const phone = data.get('phone') as string;
        const email = data.get('email') as string;
        const goal = data.get('goal') as string;

        if (!fullName.trim() || !phone.trim()) {
            setState('error');
            setErrorMsg(t('errRequired'));
            return;
        }

        try {
            const supabase = createBrowserSupabaseClient();
            const { error } = await supabase.from('contact_submissions').insert({
                full_name: fullName.trim(),
                phone: phone.trim(),
                email: email.trim() || null,
                goal: goal.trim() || null,
                source_locale: locale,
                status: 'new',
            });

            if (error) throw error;
            setState('success');
            form.reset();
        } catch (err) {
            setState('error');
            setErrorMsg(t('errGeneral'));
        }
    }

    if (state === 'success') {
        return (
            <div className="glass-card grid place-items-center gap-4 rounded-[2rem] p-8 text-center">
                <CheckCircle2 className="w-12 h-12 text-[var(--color-primary)]" />
                <h3 className="text-xl font-black text-[var(--color-title)]">
                    {t('successTitle')}
                </h3>
                <p className="text-[var(--color-text)]">
                    {t('successSub')}
                </p>
                <Button variant="secondary" type="button" onClick={() => setState('idle')} className="w-full md:w-auto h-12 px-6">
                    {t('sendAnother')}
                </Button>
            </div>
        );
    }

    return (
        <form
            className="glass-card grid gap-4 rounded-[2rem] p-6"
            onSubmit={handleSubmit}
            noValidate
        >
            <div className="grid gap-1">
                <label htmlFor="contact-name" className="text-sm font-semibold text-[var(--color-title)]">
                    {t('nameLabel')}
                </label>
                <input
                    id="contact-name"
                    name="fullName"
                    required
                    className="rounded-2xl border border-[var(--color-border)] bg-white/60 px-4 py-3 transition focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20"
                    placeholder={t('namePlaceholder')}
                    autoComplete="name"
                />
            </div>
            <div className="grid gap-1">
                <label htmlFor="contact-phone" className="text-sm font-semibold text-[var(--color-title)]">
                    {t('phoneLabel')}
                </label>
                <input
                    id="contact-phone"
                    name="phone"
                    type="tel"
                    required
                    className="rounded-2xl border border-[var(--color-border)] bg-white/60 px-4 py-3 transition focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20"
                    placeholder="0901 234 567"
                    autoComplete="tel"
                />
            </div>
            <div className="grid gap-1">
                <label htmlFor="contact-email" className="text-sm font-semibold text-[var(--color-title)]">
                    {t('emailLabel')}
                </label>
                <input
                    id="contact-email"
                    name="email"
                    type="email"
                    className="rounded-2xl border border-[var(--color-border)] bg-white/60 px-4 py-3 transition focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20"
                    placeholder="email@example.com"
                    autoComplete="email"
                />
            </div>
            <div className="grid gap-1">
                <label htmlFor="contact-goal" className="text-sm font-semibold text-[var(--color-title)]">
                    {t('goalLabel')}
                </label>
                <textarea
                    id="contact-goal"
                    name="goal"
                    className="min-h-32 rounded-2xl border border-[var(--color-border)] bg-white/60 px-4 py-3 transition focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20"
                    placeholder={t('goalPlaceholder')}
                />
            </div>
            {state === 'error' && (
                <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600" role="alert">
                    {errorMsg}
                </p>
            )}
            <Button type="submit" disabled={state === 'submitting'} className="h-12 w-full md:w-auto mt-2">
                {state === 'submitting' ? t('submitting') : t('submit')}
            </Button>
        </form>
    );
}
