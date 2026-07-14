'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Send, Check } from 'lucide-react';
import { createBrowserSupabaseClient } from '@/lib/supabase/client';

interface NewsletterFormProps {
  locale: string;
}

type FormState = 'idle' | 'submitting' | 'success' | 'error';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function NewsletterForm({ locale }: NewsletterFormProps) {
  const t = useTranslations('Footer');
  const [state, setState] = useState<FormState>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const email = (new FormData(form).get('email') as string).trim();

    if (!EMAIL_PATTERN.test(email)) {
      setState('error');
      setErrorMsg(t('newsletterErrorInvalid'));
      return;
    }

    setState('submitting');
    setErrorMsg('');

    try {
      const supabase = createBrowserSupabaseClient();
      const { error } = await supabase.from('newsletter_subscribers').insert({
        email,
        source_locale: locale,
      });

      if (error) {
        if (error.code === '23505') {
          setState('error');
          setErrorMsg(t('newsletterErrorDuplicate'));
          return;
        }
        throw error;
      }

      setState('success');
      form.reset();
    } catch {
      setState('error');
      setErrorMsg(t('newsletterErrorGeneral'));
    }
  }

  if (state === 'success') {
    return (
      <p className="flex items-center gap-2 text-label-lg font-semibold text-[var(--color-tertiary)]">
        <Check className="h-4 w-4 shrink-0" /> {t('newsletterSuccess')}
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-2">
      <div className="flex items-center gap-2 rounded-full bg-[var(--color-surface-container-lowest)] border border-[var(--color-outline-variant)]/30 p-1.5 pl-4">
        <input
          type="email"
          name="email"
          required
          placeholder={t('newsletterPlaceholder')}
          className="w-full bg-transparent text-label-lg text-[var(--color-on-surface)] placeholder:text-[var(--color-on-surface-variant)]/60 outline-none"
        />
        <button
          type="submit"
          disabled={state === 'submitting'}
          aria-label={t('newsletterTitle')}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--color-primary)] text-[var(--color-on-primary)] transition-transform hover:scale-105 disabled:opacity-50 disabled:pointer-events-none"
        >
          <Send className="h-4 w-4" />
        </button>
      </div>
      {state === 'error' && (
        <p className="text-label-sm font-semibold text-[var(--color-error)]" role="alert">
          {errorMsg}
        </p>
      )}
    </form>
  );
}
