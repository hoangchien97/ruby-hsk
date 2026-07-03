import {useTranslations} from 'next-intl';
import {Button} from '@/components/ui/button';

export default function ContactPage() {
  const t = useTranslations('Contact');
  return <section className="container pt-14"><h1 className="section-title text-4xl md:text-6xl">{t('title')}</h1><p className="mt-4 max-w-2xl text-[var(--color-text)]">{t('sub')}</p><div className="mt-10 grid gap-8 md:grid-cols-[1fr_0.8fr]"><form className="glass-card grid gap-4 rounded-[2rem] p-6"><input className="rounded-2xl border border-[var(--color-border)] bg-white/60 px-4 py-3" placeholder="Họ và tên"/><input className="rounded-2xl border border-[var(--color-border)] bg-white/60 px-4 py-3" placeholder="Số điện thoại"/><input className="rounded-2xl border border-[var(--color-border)] bg-white/60 px-4 py-3" placeholder="Email"/><textarea className="min-h-32 rounded-2xl border border-[var(--color-border)] bg-white/60 px-4 py-3" placeholder="Mục tiêu học"/><Button type="button">{t('submit')}</Button></form><aside className="glass-card rounded-[2rem] p-6"><h2 className="text-2xl font-black text-[var(--color-title)]">Thông tin liên hệ</h2><div className="mt-4 grid gap-3 text-[var(--color-text)]"><p>Hotline: 0000 000 000</p><p>Email: hello@rubyhsk.vn</p><p>Zalo / Messenger: cập nhật</p></div></aside></div></section>;
}
