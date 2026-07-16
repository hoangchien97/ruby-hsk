import { MessageCircle, Phone } from 'lucide-react';
import { Contact } from '@/lib/constants/site';

export function FloatingContact() {
  return (
    <div className="fixed bottom-20 left-4 z-40 grid gap-2 md:bottom-6 md:left-6">
      <a
        href={Contact.zalo}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Zalo"
        className="grid h-11 w-11 place-items-center rounded-full bg-white border border-slate-200 text-white shadow-[var(--shadow-soft)] hover:scale-110 active:scale-95 transition-transform"
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/9/91/Icon_of_Zalo.svg"
          alt="Zalo"
          className="w-5 h-5 object-contain"
        />
      </a>
      <a
        href="https://m.me/rubyhsk"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Messenger"
        className="grid h-11 w-11 place-items-center rounded-full bg-[#00B2FF] text-white shadow-[var(--shadow-soft)] hover:scale-110 active:scale-95 transition-transform"
      >
        <MessageCircle className="h-5 w-5 fill-white text-[#00B2FF]" />
      </a>
      <a
        href={`tel:${Contact.phoneTel}`}
        aria-label="Call"
        className="grid h-11 w-11 place-items-center rounded-full bg-[var(--color-primary)] text-white shadow-[var(--shadow-soft)] hover:scale-110 active:scale-95 transition-transform"
      >
        <Phone className="h-5 w-5 fill-current" />
      </a>
    </div>
  );
}
