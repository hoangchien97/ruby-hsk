'use client';

import { useState } from 'react';
import { createBrowserSupabaseClient } from '@/lib/supabase/client';
import { CheckCircle2, ChevronDown } from 'lucide-react';
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
    const goalChoice = data.get('goalChoice') as string;
    const modeChoice = data.get('modeChoice') as string;
    const message = data.get('message') as string;

    if (!fullName.trim() || !phone.trim()) {
      setState('error');
      setErrorMsg(t('errRequired'));
      return;
    }

    // Format goal combining select choices and optional message
    const goalParts = [];
    if (goalChoice) {
      goalParts.push(`${t('goalSelectLabel')}: ${t(goalChoice)}`);
    }
    if (modeChoice) {
      goalParts.push(`${t('modeSelectLabel')}: ${t(modeChoice)}`);
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
    } catch {
      setState('error');
      setErrorMsg(t('errGeneral'));
    }
  }

  // ── Success state ──────────────────────────────────────────────
  if (state === 'success') {
    return (
      <div className="rounded-[2rem] border border-[var(--color-outline-variant)]/30 bg-[var(--color-surface-container-lowest)] p-6 md:p-8 text-center flex flex-col items-center justify-center gap-4 h-full min-h-[500px] shadow-[var(--shadow-card)]">
        <CheckCircle2 className="w-16 h-16 text-[var(--color-primary)] animate-bounce" />
        <h3 className="text-xl md:text-2xl font-bold text-[var(--color-on-surface)]">
          {t('successTitle')}
        </h3>
        <p className="text-[var(--color-on-surface-variant)] max-w-sm leading-relaxed">
          {t('successSub')}
        </p>
        <button
          type="button"
          onClick={() => setState('idle')}
          className="w-full md:w-auto h-12 px-6 mt-4 bg-[var(--color-primary-fixed)] text-[var(--color-on-primary-container)] hover:bg-[var(--color-primary-fixed-dim)] transition-colors rounded-full font-semibold"
        >
          {t('sendAnother')}
        </button>
      </div>
    );
  }

  // ── Form ──────────────────────────────────────────────────────
  return (
    <div className="bg-[var(--color-surface-container-lowest)] rounded-[2rem] p-6 md:p-8 shadow-[var(--shadow-card)] border border-[var(--color-outline-variant)]/20">
      <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-on-surface)] mb-6">
        {t('formTitle')}
      </h2>
      <form className="space-y-6" onSubmit={handleSubmit} noValidate>
        {/* Name & Phone */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label htmlFor="contact-name" className="text-label-lg font-semibold text-[var(--color-on-surface-variant)] ml-2">
              {t('nameLabel')}
            </label>
            <input
              id="contact-name"
              name="fullName"
              required
              type="text"
              placeholder={t('namePlaceholder')}
              autoComplete="name"
              className="w-full bg-[var(--color-surface-container-low)] border border-[var(--color-outline-variant)]/30 rounded-full px-5 py-3 focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] outline-none transition-all placeholder:text-[var(--color-outline)]/50 text-[var(--color-on-surface)]"
            />
          </div>
          <div className="space-y-1.5">
            <label htmlFor="contact-phone" className="text-label-lg font-semibold text-[var(--color-on-surface-variant)] ml-2">
              {t('phoneLabel')}
            </label>
            <input
              id="contact-phone"
              name="phone"
              type="tel"
              required
              placeholder={t('phonePlaceholder')}
              autoComplete="tel"
              className="w-full bg-[var(--color-surface-container-low)] border border-[var(--color-outline-variant)]/30 rounded-full px-5 py-3 focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] outline-none transition-all placeholder:text-[var(--color-outline)]/50 text-[var(--color-on-surface)]"
            />
          </div>
        </div>

        {/* Email */}
        <div className="space-y-1.5">
          <label htmlFor="contact-email" className="text-label-lg font-semibold text-[var(--color-on-surface-variant)] ml-2">
            {t('emailLabel')}
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            placeholder={t('emailPlaceholder')}
            autoComplete="email"
            className="w-full bg-[var(--color-surface-container-low)] border border-[var(--color-outline-variant)]/30 rounded-full px-5 py-3 focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] outline-none transition-all placeholder:text-[var(--color-outline)]/50 text-[var(--color-on-surface)]"
          />
        </div>

        {/* Select Goal & Study Mode */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5 relative">
            <label htmlFor="contact-goal-choice" className="text-label-lg font-semibold text-[var(--color-on-surface-variant)] ml-2">
              {t('goalSelectLabel')}
            </label>
            <div className="relative">
              <select
                id="contact-goal-choice"
                name="goalChoice"
                defaultValue="goalHsk12"
                className="w-full bg-[var(--color-surface-container-low)] border border-[var(--color-outline-variant)]/30 rounded-full px-5 py-3 focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] outline-none transition-all appearance-none text-[var(--color-on-surface)] pr-10"
              >
                <option value="goalHsk12">{t('goalHsk12')}</option>
                <option value="goalHsk34">{t('goalHsk34')}</option>
                <option value="goalHsk56">{t('goalHsk56')}</option>
                <option value="goalComms">{t('goalComms')}</option>
              </select>
              <ChevronDown className="w-5 h-5 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[var(--color-on-surface-variant)]" />
            </div>
          </div>

          <div className="space-y-1.5 relative">
            <label htmlFor="contact-mode-choice" className="text-label-lg font-semibold text-[var(--color-on-surface-variant)] ml-2">
              {t('modeSelectLabel')}
            </label>
            <div className="relative">
              <select
                id="contact-mode-choice"
                name="modeChoice"
                defaultValue="modeOnline"
                className="w-full bg-[var(--color-surface-container-low)] border border-[var(--color-outline-variant)]/30 rounded-full px-5 py-3 focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] outline-none transition-all appearance-none text-[var(--color-on-surface)] pr-10"
              >
                <option value="modeOnline">{t('modeOnline')}</option>
                <option value="modeOffline">{t('modeOffline')}</option>
                <option value="modeOneToOne">{t('modeOneToOne')}</option>
              </select>
              <ChevronDown className="w-5 h-5 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[var(--color-on-surface-variant)]" />
            </div>
          </div>
        </div>

        {/* Message */}
        <div className="space-y-1.5">
          <label htmlFor="contact-message" className="text-label-lg font-semibold text-[var(--color-on-surface-variant)] ml-2">
            {t('msgLabel')}
          </label>
          <textarea
            id="contact-message"
            name="message"
            placeholder={t('msgPlaceholder')}
            rows={4}
            className="w-full bg-[var(--color-surface-container-low)] border border-[var(--color-outline-variant)]/30 rounded-[1.5rem] px-5 py-4 focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] outline-none transition-all placeholder:text-[var(--color-outline)]/50 text-[var(--color-on-surface)] resize-y min-h-24"
          />
        </div>

        {state === 'error' && (
          <p
            className="rounded-xl bg-red-50 dark:bg-red-950/30 px-6 py-3 text-sm font-semibold text-red-600 dark:text-red-400 text-center"
            role="alert"
          >
            {errorMsg}
          </p>
        )}

        {/* Submit button */}
        <button
          type="submit"
          disabled={state === 'submitting'}
          className="w-full bg-[var(--color-primary)] text-[var(--color-on-primary)] font-bold text-lg py-4 rounded-full hover:scale-[1.01] active:scale-[0.99] transition-all shadow-[var(--shadow-button)] disabled:opacity-50 disabled:scale-100 disabled:pointer-events-none cursor-pointer"
        >
          {state === 'submitting' ? t('submitting') : t('submit')}
        </button>
      </form>
    </div>
  );
}
