import {LogoIcon} from '@/components/logo/logo-icon';

export function LoadingLogo({label}: {label: string}) {
  return (
    <div className="grid min-h-[60vh] place-items-center">
      <div className="text-center">
        <div className="mx-auto animate-bounce"><LogoIcon className="h-20 w-20" /></div>
        <div className="mt-4 flex justify-center gap-1" aria-hidden>
          <span className="h-2 w-2 animate-pulse rounded-full bg-[var(--color-primary)]" />
          <span className="h-2 w-2 animate-pulse rounded-full bg-[var(--color-secondary)] [animation-delay:150ms]" />
          <span className="h-2 w-2 animate-pulse rounded-full bg-[var(--color-gold)] [animation-delay:300ms]" />
        </div>
        <p className="mt-4 font-bold text-[var(--color-title)]">{label}</p>
      </div>
    </div>
  );
}
