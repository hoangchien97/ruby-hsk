'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { createBrowserSupabaseClient } from '@/lib/supabase/client';
import { CheckCircle2 } from 'lucide-react';

interface ContactFormProps {
    locale: string;
}

type FormState = 'idle' | 'submitting' | 'success' | 'error';

export default function ContactForm({ locale }: ContactFormProps) {
    const [state, setState] = useState<FormState>('idle');
    const [errorMsg, setErrorMsg] = useState('');

    const isVi = locale === 'vi';

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
            setErrorMsg(isVi ? 'Vui lòng điền họ tên và số điện thoại.' : 'Please enter your name and phone number.');
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
            setErrorMsg(
                isVi
                    ? 'Có lỗi xảy ra. Vui lòng thử lại hoặc liên hệ trực tiếp qua Zalo/điện thoại.'
                    : 'An error occurred. Please try again or contact us directly via Zalo/phone.',
            );
        }
    }

    if (state === 'success') {
        return (
            <div className="glass-card grid place-items-center gap-4 rounded-[2rem] p-8 text-center">
                <CheckCircle2 className="w-12 h-12 text-[var(--color-primary)]" />
                <h3 className="text-xl font-black text-[var(--color-title)]">
                    {isVi ? 'Gửi thành công!' : 'Sent successfully!'}
                </h3>
                <p className="text-[var(--color-text)]">
                    {isVi
                        ? 'Cô Ngọc sẽ liên hệ với bạn trong vòng 24 giờ làm việc. Cảm ơn bạn đã tin tưởng Ruby HSK!'
                        : 'Ms. Ngoc will contact you within 24 business hours. Thank you for trusting Ruby HSK!'}
                </p>
                <Button variant="secondary" type="button" onClick={() => setState('idle')}>
                    {isVi ? 'Gửi yêu cầu khác' : 'Send another request'}
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
                    {isVi ? 'Họ và tên *' : 'Full name *'}
                </label>
                <input
                    id="contact-name"
                    name="fullName"
                    required
                    className="rounded-2xl border border-[var(--color-border)] bg-white/60 px-4 py-3 transition focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20"
                    placeholder={isVi ? 'Nguyễn Văn A' : 'Your full name'}
                    autoComplete="name"
                />
            </div>
            <div className="grid gap-1">
                <label htmlFor="contact-phone" className="text-sm font-semibold text-[var(--color-title)]">
                    {isVi ? 'Số điện thoại *' : 'Phone number *'}
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
                    {isVi ? 'Email (không bắt buộc)' : 'Email (optional)'}
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
                    {isVi ? 'Mục tiêu học (không bắt buộc)' : 'Learning goal (optional)'}
                </label>
                <textarea
                    id="contact-goal"
                    name="goal"
                    className="min-h-32 rounded-2xl border border-[var(--color-border)] bg-white/60 px-4 py-3 transition focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20"
                    placeholder={
                        isVi
                            ? 'Ví dụ: Muốn thi HSK 3 trong 6 tháng, hoặc học giao tiếp cơ bản...'
                            : 'E.g.: Pass HSK 3 in 6 months, or learn basic conversational Chinese...'
                    }
                />
            </div>
            {state === 'error' && (
                <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600" role="alert">
                    {errorMsg}
                </p>
            )}
            <Button type="submit" disabled={state === 'submitting'}>
                {state === 'submitting'
                    ? (isVi ? 'Đang gửi...' : 'Sending...')
                    : (isVi ? 'Gửi yêu cầu tư vấn' : 'Send consultation request')}
            </Button>
        </form>
    );
}
