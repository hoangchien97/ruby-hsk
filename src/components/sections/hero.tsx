import {Sparkles} from 'lucide-react';
import {useTranslations} from 'next-intl';
import {Button} from '@/components/ui/button';
import {LogoIcon} from '@/components/logo/logo-icon';
import {Link} from '@/i18n/navigation';

export function HomeHero() {
  const t = useTranslations('Home');
  const common = useTranslations('Common');
  return (
    <section className="container pt-14 md:pt-20">
      <div className="grid items-center gap-10 rounded-[2rem] bg-gradient-to-br from-[#FFF8E8] via-[var(--color-bg)] to-[#FCE8DE] p-6 shadow-[var(--shadow-soft)] md:grid-cols-2 md:p-12">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-[#FFE3AC] px-4 py-2 text-xs font-bold text-[var(--color-primary)]"><Sparkles className="h-4 w-4" />{t('badge')}</span>
          <h1 className="mt-6 text-4xl font-black leading-tight text-[var(--color-title)] md:text-6xl">{t('title')}</h1>
          <p className="mt-5 max-w-xl text-base leading-8 text-[var(--color-text)]">{t('sub')}</p>
          <div className="mt-7 flex flex-wrap gap-3"><Link href="/contact"><Button>{common('startNow')}</Button></Link><Link href="/courses"><Button variant="secondary">{common('viewCourses')}</Button></Link></div>
        </div>
        <div className="relative mx-auto grid aspect-square w-full max-w-md place-items-center rounded-[2rem] bg-white/60 p-8">
          <LogoIcon className="h-44 w-44" />
          <span className="absolute left-8 top-8 rounded-full bg-white px-4 py-3 text-2xl font-black text-[var(--color-primary)] shadow-sm">你好</span>
          <span className="absolute bottom-10 right-5 rounded-full bg-white px-4 py-3 text-lg font-black text-[var(--color-primary)] shadow-sm">HSK 6</span>
        </div>
      </div>
    </section>
  );
}
