'use client';

import { useState } from 'react';
import { createBrowserSupabaseClient } from '@/lib/supabase/client';
import { CheckCircle2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Input, Textarea } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Button } from '@/components/ui/button';

interface ContactFormProps {
  locale: string;
}

type FormState = 'idle' | 'submitting' | 'success' | 'error';

export default function ContactForm({ locale }: ContactFormProps) {
  const t = useTranslations('ContactForm');
  const [state, setState] = useState<FormState>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [goalChoice, setGoalChoice] = useState('goalHsk12');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState('submitting');
    setErrorMsg('');
    setErrors({});

    const form = e.currentTarget;
    const data = new FormData(form);
    const fullName = (data.get('fullName') as string) || '';
    const phone = (data.get('phone') as string) || '';
    const email = (data.get('email') as string) || '';
    const message = (data.get('message') as string) || '';

    const newErrors: Record<string, string> = {};
    if (!fullName.trim()) {
      newErrors.fullName = t('errRequired');
    }
    if (!phone.trim()) {
      newErrors.phone = t('errRequired');
    }
    if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      newErrors.email = t('errEmailInvalid');
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setState('error');
      setErrorMsg(t('errRequired'));
      return;
    }

    // Format goal combining select choices and optional message
    const goalParts = [];
    if (goalChoice) {
      goalParts.push(`${t('goalSelectLabel')}: ${t(goalChoice)}`);
    }

    if (message.trim()) {
      goalParts.push(`${t('msgLabel')}: ${message.trim()}`);
    }
    const goalString = goalParts.join('\n');

    try {
      const supabase = createBrowserSupabaseClient();
      const { error } = await supabase.from('contact_submissions').insert({
        full_name: fullName.trim(),
        phone: phone.trim(),
        email: email.trim() || null,
        goal: goalString || null,
        source_locale: locale,
        status: 'new',
      });

      if (error) throw error;
      setState('success');
      form.reset();
      setErrors({});
      setGoalChoice('goalHsk12');

    } catch {
      setState('error');
      setErrorMsg(t('errGeneral'));
    }
  }

  // ── Success state ──────────────────────────────────────────────
  if (state === 'success') {
    return (
      <div className="rounded-[var(--radius-3xl)] border border-[var(--color-outline-variant)]/30 bg-[var(--color-surface-container-lowest)] p-6 md:p-8 text-center flex flex-col items-center justify-center gap-4 h-full min-h-[500px] shadow-[var(--shadow-card)]">
        <CheckCircle2 className="w-16 h-16 text-[var(--color-primary)] animate-bounce" />
        <h3 className="text-title-md text-[var(--color-on-surface)]">
          {t('successTitle')}
        </h3>
        <p className="text-body-md text-[var(--color-on-surface-variant)] max-w-sm leading-relaxed">
          {t('successSub')}
        </p>
        <Button type="button" onClick={() => setState('idle')} variant="secondary" className="w-full md:w-auto mt-4">
          {t('sendAnother')}
        </Button>
      </div>
    );
  }

  // ── Form ──────────────────────────────────────────────────────
  return (
    <div className="bg-[var(--color-surface-container-lowest)] rounded-[var(--radius-3xl)] p-4 md:p-6 lg:p-8 shadow-[var(--shadow-card)] border border-[var(--color-outline-variant)]/20">
      <h2 className="text-headline-lg-mobile md:text-headline-lg text-[var(--color-on-surface)] mb-6">
        {t('formTitle')}
      </h2>
      <form className="space-y-6" onSubmit={handleSubmit} noValidate>
        {/* Name & Phone */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            id="contact-name"
            name="fullName"
            required
            type="text"
            label={t('nameLabel')}
            placeholder={t('namePlaceholder')}
            autoComplete="name"
            error={errors.fullName}
          />
          <Input
            id="contact-phone"
            name="phone"
            type="tel"
            required
            label={t('phoneLabel')}
            placeholder={t('phonePlaceholder')}
            autoComplete="tel"
            error={errors.phone}
          />
        </div>

        {/* Email */}
        <Input
          id="contact-email"
          name="email"
          type="email"
          label={t('emailLabel')}
          placeholder={t('emailPlaceholder')}
          autoComplete="email"
          error={errors.email}
        />

        {/* Select Goal */}
        <Select
          id="contact-goal-choice"
          label={t('goalSelectLabel')}
          value={goalChoice}
          onChange={setGoalChoice}
          options={[
            { value: 'goalHsk12', label: t('goalHsk12') },
            { value: 'goalHsk34', label: t('goalHsk34') },
            { value: 'goalHsk56', label: t('goalHsk56') },
            { value: 'goalComms', label: t('goalComms') },
          ]}
        />

        {/* Message */}
        <Textarea
          id="contact-message"
          name="message"
          label={t('msgLabel')}
          placeholder={t('msgPlaceholder')}
          rows={4}
        />

        {state === 'error' && (
          <p
            className="rounded-[var(--radius-xl)] bg-[var(--color-error-container)] px-6 py-3 text-label-sm font-semibold text-[var(--color-error)] text-center"
            role="alert"
          >
            {errorMsg}
          </p>
        )}

        {/* Submit button */}
        <Button type="submit" disabled={state === 'submitting'} size="lg" className="w-full">
          {state === 'submitting' ? t('submitting') : t('submit')}
        </Button>
      </form>
    </div>
  );
}
