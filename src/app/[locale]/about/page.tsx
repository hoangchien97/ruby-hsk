import {useTranslations} from 'next-intl';
import {Button} from '@/components/ui/button';

export default function AboutPage() {
  const t = useTranslations('About');
  return <section className="container pt-14"><h1 className="section-title text-4xl md:text-6xl">{t('title')}</h1><div className="mt-10 grid gap-8 md:grid-cols-2"><div className="glass-card rounded-[2rem] p-8"><h2 className="text-3xl font-black text-[var(--color-title)]">{t('teacher')}</h2><p className="mt-4 leading-8 text-[var(--color-text)]">Ruby HSK tập trung vào trải nghiệm học tiếng Trung có lộ trình, gần gũi và dễ áp dụng.</p><p className="mt-4 text-sm text-[var(--color-muted)]">{t('safe')}</p><div className="mt-6"><Button>Nhận tư vấn lộ trình</Button></div></div><div className="rounded-[2rem] bg-gradient-to-br from-[#FFF8E8] to-[#FCE8DE] p-8"><h3 className="text-2xl font-black text-[var(--color-title)]">Phương pháp giảng dạy</h3><ul className="mt-4 grid gap-3 text-[var(--color-text)]"><li>Học theo lộ trình</li><li>Tập trung nền tảng</li><li>Luyện tập đều đặn</li><li>Ứng dụng vào giao tiếp và HSK</li></ul></div></div></section>;
}
