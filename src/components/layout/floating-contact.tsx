import {MessageCircle, Phone} from 'lucide-react';

export function FloatingContact() {
  return (
    <div className="fixed bottom-28 right-4 z-40 grid gap-2 md:bottom-6">
      <a href="#" aria-label="Zalo" className="grid h-11 w-11 place-items-center rounded-full bg-[#0068FF] text-white shadow-[var(--shadow-soft)]">Z</a>
      <a href="#" aria-label="Messenger" className="grid h-11 w-11 place-items-center rounded-full bg-[#00B2FF] text-white shadow-[var(--shadow-soft)]"><MessageCircle className="h-5 w-5" /></a>
      <a href="tel:+84000000000" aria-label="Call" className="grid h-11 w-11 place-items-center rounded-full bg-[var(--color-primary)] text-white shadow-[var(--shadow-soft)]"><Phone className="h-5 w-5" /></a>
    </div>
  );
}
