'use client';

import { useEffect, useRef, useState } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface SelectOption {
    value: string;
    label: string;
}

interface SelectProps {
    label?: string;
    error?: string;
    value: string;
    onChange: (value: string) => void;
    options: SelectOption[];
    placeholder?: string;
    className?: string;
    id?: string;
}

/**
 * Select — custom listbox (not a native <select>) so the open dropdown panel
 * can share the same coral/ivory tone + hover states as `Input`, which a
 * native <select>'s OS-rendered option list can never be styled to match.
 */
export function Select({ label, error, value, onChange, options, placeholder, className, id }: SelectProps) {
    const [open, setOpen] = useState(false);
    const rootRef = useRef<HTMLDivElement>(null);
    const selected = options.find((o) => o.value === value);

    useEffect(() => {
        if (!open) return;
        const handleClick = (e: MouseEvent) => {
            if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setOpen(false);
        };
        document.addEventListener('mousedown', handleClick);
        document.addEventListener('keydown', handleKey);
        return () => {
            document.removeEventListener('mousedown', handleClick);
            document.removeEventListener('keydown', handleKey);
        };
    }, [open]);

    return (
        <div className="grid gap-1.5" ref={rootRef}>
            {label && (
                <label htmlFor={id} className="text-label-lg text-[var(--color-on-surface)] font-semibold">
                    {label}
                </label>
            )}
            <div className="relative">
                <button
                    id={id}
                    type="button"
                    onClick={() => setOpen((o) => !o)}
                    aria-haspopup="listbox"
                    aria-expanded={open}
                    className={cn(
                        'w-full flex items-center justify-between gap-2 rounded-[var(--radius-2xl)] border border-[var(--color-outline-variant)]',
                        'bg-white px-4 py-3 text-body-md text-[var(--color-on-surface)] font-semibold',
                        'transition-all focus:outline-none cursor-pointer',
                        open
                            ? 'border-[var(--color-primary)] ring-2 ring-[color-mix(in_srgb,var(--color-primary)_20%,transparent)]'
                            : 'hover:border-[var(--color-primary)]/50',
                        error && 'border-[var(--color-error)]',
                        className,
                    )}
                >
                    <span className={selected ? '' : 'text-[var(--color-on-surface-variant)] font-normal'}>
                        {selected?.label ?? placeholder ?? ''}
                    </span>
                    <ChevronDown
                        className={cn(
                            'w-4 h-4 text-[var(--color-on-surface-variant)] shrink-0 transition-transform',
                            open && 'rotate-180 text-[var(--color-primary)]',
                        )}
                    />
                </button>

                {open && (
                    <ul
                        role="listbox"
                        className="absolute z-30 mt-2 w-full max-h-64 overflow-auto rounded-[var(--radius-2xl)] border border-[var(--color-outline-variant)] bg-white p-1.5 shadow-lg shadow-[var(--color-primary)]/10"
                    >
                        {options.map((opt) => {
                            const isSelected = opt.value === value;
                            return (
                                <li key={opt.value} role="option" aria-selected={isSelected}>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            onChange(opt.value);
                                            setOpen(false);
                                        }}
                                        className={cn(
                                            'w-full flex items-center justify-between gap-2 rounded-xl px-3 py-2.5 text-left text-body-md transition-colors',
                                            isSelected
                                                ? 'bg-[var(--color-primary-container)]/15 text-[var(--color-primary)] font-bold'
                                                : 'text-[var(--color-on-surface)] font-medium hover:bg-[var(--color-primary)]/5',
                                        )}
                                    >
                                        {opt.label}
                                        {isSelected && <Check className="w-4 h-4 shrink-0" />}
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                )}
            </div>
            {error && <p className="text-label-sm text-[var(--color-error)]">{error}</p>}
        </div>
    );
}
