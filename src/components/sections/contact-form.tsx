'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input, Textarea } from '@/components/ui/input';
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
        } catch {
            setState('error');
            setErrorMsg(t('errGeneral'));
        }
    }

    // ── Success state ──────────────────────────────────────────────
    if (state === 'success') {
        return (
            <div className="rounded-[2rem] border border-[var(--color-surface-variant)] bg-[var(--color-surface-container-low)] p-8 text-center flex flex-col items-center justify-center gap-4 h-full min-h-[500px]">
                <CheckCircle2 className="w-12 h-12 text-[var(--color-primary)] animate-bounce" />
                <h3 className="text-xl font-bold text-[var(--color-on-surface)]">
                    {t('successTitle')}
                </h3>
                <p className="text-[var(--color-on-surface-variant)] max-w-sm">
                    {t('successSub')}
                </p>
                <Button
                    variant="secondary"
                    type="button"
                    onClick={() => setState('idle')}
                    className="w-full md:w-auto h-12 px-6 mt-4"
                >
                    {t('sendAnother')}
                </Button>
            </div>
        );
    }

    // ── Form ──────────────────────────────────────────────────────
    return (
        <form
            className="rounded-[2rem] border border-[var(--color-surface-variant)] bg-[var(--color-surface-container-low)] p-8 flex flex-col justify-between h-full min-h-[500px] space-y-6"
            onSubmit={handleSubmit}
            noValidate
        >
            <div className="space-y-6 flex-1">
                <h2 className="text-title-md font-bold text-[var(--color-on-surface)]">
                    {t('formTitle')}
                </h2>

                <div className="grid gap-4">
                    <Input
                        id="contact-name"
                        name="fullName"
                        required
                        label={t('nameLabel')}
                        placeholder={t('namePlaceholder')}
                        autoComplete="name"
                        className="bg-[var(--color-surface-container-lowest)] dark:bg-black/20"
                    />
                    <Input
                        id="contact-phone"
                        name="phone"
                        type="tel"
                        required
                        label={t('phoneLabel')}
                        placeholder={t('phonePlaceholder')}
                        autoComplete="tel"
                        className="bg-[var(--color-surface-container-lowest)] dark:bg-black/20"
                    />
                    <Input
                        id="contact-email"
                        name="email"
                        type="email"
                        label={t('emailLabel')}
                        placeholder={t('emailPlaceholder')}
                        autoComplete="email"
                        className="bg-[var(--color-surface-container-lowest)] dark:bg-black/20"
                    />
                    <Textarea
                        id="contact-goal"
                        name="goal"
                        label={t('goalLabel')}
                        placeholder={t('goalPlaceholder')}
                        className="bg-[var(--color-surface-container-lowest)] dark:bg-black/20"
                    />
                </div>

                {state === 'error' && (
                    <p
                        className="rounded-xl bg-red-50 dark:bg-red-950/30 px-4 py-3 text-sm text-red-600 dark:text-red-400"
                        role="alert"
                    >
                        {errorMsg}
                    </p>
                )}
            </div>

            <div className="pt-4 flex justify-end">
                <Button
                    type="submit"
                    disabled={state === 'submitting'}
                    className="h-12 w-full md:w-auto"
                >
                    {state === 'submitting' ? t('submitting') : t('submit')}
                </Button>
            </div>
        </form>
    );
}
