import {useTranslations} from 'next-intl';
import {HomeHero} from '@/components/sections/hero';
import {FeatureGrid} from '@/components/sections/cards';
import {Button} from '@/components/ui/button';
import {Link} from '@/i18n/navigation';

export default function HomePage() {
  const t = useTranslations('Home');
  return (
    <>
      <HomeHero />
      <section className="container mt-8 grid gap-3 rounded-[2rem] bg-white/70 p-5 text-center shadow-sm md:grid-cols-4">
        {['Lộ trình HSK 1-6', 'Online/Offline', '10.000+ Học viên', 'Thư viện 500+'].map((item) => <div key={item} className="rounded-2xl p-4"><strong className="text-xl text-[var(--color-title)]">{item}</strong></div>)}
      </section>
      <FeatureGrid title={t('why')} />
      <section className="container mt-16 grid gap-6 rounded-[2rem] bg-[var(--color-primary)] p-8 text-white md:grid-cols-[1.2fr_0.8fr] md:p-12">
        <div><h2 className="text-3xl font-black">{t('teacher')}</h2><p className="mt-3 max-w-2xl text-white/80">Ruby HSK hiện có một giáo viên chính: cô Trần Hồng Ngọc. Nội dung cần được cập nhật theo hồ sơ chính thức.</p></div>
        <Link href="/about" className="self-center justify-self-start md:justify-self-end"><Button variant="secondary">Tìm hiểu về Ruby HSK</Button></Link>
      </section>
    </>
  );
}
