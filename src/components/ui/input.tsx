import { cn } from '@/lib/utils';
import type { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

/**
 * Input — Stitch spec:
 * white bg, cream border, coral focus ring
 */
export function Input({ label, error, id, className, ...props }: InputProps) {
    return (
        <div className="grid gap-1.5">
            {label && (
                <label htmlFor={id} className="text-label-lg text-[var(--color-on-surface)] font-semibold">
                    {label}
                </label>
            )}
            <input
                id={id}
                className={cn(
                    'w-full rounded-[var(--radius-2xl)] border border-[var(--color-outline-variant)]',
                    'bg-white px-4 py-3 text-body-md text-[var(--color-on-surface)]',
                    'placeholder:text-[var(--color-on-surface-variant)]',
                    'transition-all focus:border-[var(--color-primary)] focus:outline-none',
                    'focus:ring-2 focus:ring-[color-mix(in_srgb,var(--color-primary)_20%,transparent)]',
                    error && 'border-[var(--color-error)] focus:ring-[var(--color-error-container)]',
                    className,
                )}
                {...props}
            />
            {error && <p className="text-label-sm text-[var(--color-error)]">{error}</p>}
        </div>
    );
}

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string;
}

export function Textarea({ label, error, id, className, ...props }: TextareaProps) {
    return (
        <div className="grid gap-1.5">
            {label && (
                <label htmlFor={id} className="text-label-lg text-[var(--color-on-surface)] font-semibold">
                    {label}
                </label>
            )}
            <textarea
                id={id}
                className={cn(
                    'w-full rounded-[var(--radius-2xl)] border border-[var(--color-outline-variant)]',
                    'bg-white px-4 py-3 text-body-md text-[var(--color-on-surface)]',
                    'placeholder:text-[var(--color-on-surface-variant)] min-h-32 resize-y',
                    'transition-all focus:border-[var(--color-primary)] focus:outline-none',
                    'focus:ring-2 focus:ring-[color-mix(in_srgb,var(--color-primary)_20%,transparent)]',
                    error && 'border-[var(--color-error)] focus:ring-[var(--color-error-container)]',
                    className,
                )}
                {...props}
            />
            {error && <p className="text-label-sm text-[var(--color-error)]">{error}</p>}
        </div>
    );
}
