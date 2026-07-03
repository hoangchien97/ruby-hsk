import {useTranslations} from 'next-intl';
import {Button} from '@/components/ui/button';

const courses = ['Tiếng Trung Sơ Cấp Toàn Diện', 'Trung Cấp & Luyện Thi HSK 4', 'Tiếng Trung Thương Mại Chuyên Sâu', 'HSK 5-6 Nâng Cao'];

export default function CoursesPage() {
  const t = useTranslations('Courses');
  return <section className="container pt-14"><div className="rounded-[2rem] bg-[#FCE8DE] p-8 md:p-12"><h1 className="section-title text-4xl md:text-6xl">{t('title')}</h1><p className="mt-4 max-w-2xl text-[var(--color-text)]">{t('sub')}</p><div className="mt-6 flex gap-3"><Button>Khám phá ngay</Button><Button variant="secondary">Tư vấn miễn phí</Button></div></div><div className="mt-10 grid gap-6 md:grid-cols-[240px_1fr]"><aside className="glass-card rounded-[1.75rem] p-5"><h2 className="font-black text-[var(--color-title)]">{t('filters')}</h2>{['Tất cả trình độ','HSK 1 - HSK 2','HSK 3 - HSK 4','HSK 5 - HSK 6'].map(x=><label className="mt-3 flex gap-2 text-sm" key={x}><input type="checkbox" />{x}</label>)}</aside><div><h2 className="section-title text-3xl">{t('list')}</h2><div className="mt-5 grid gap-5 md:grid-cols-2">{courses.map(c=><article key={c} className="glass-card overflow-hidden rounded-[1.75rem]"><div className="h-40 bg-gradient-to-br from-[#FCE8DE] to-[#FFF8E8]"/><div className="p-5"><span className="rounded-full bg-[var(--color-peach)] px-3 py-1 text-xs font-bold text-[var(--color-primary)]">HSK</span><h3 className="mt-3 text-xl font-black text-[var(--color-title)]">{c}</h3><p className="mt-2 text-sm text-[var(--color-muted)]">Lộ trình bài bản, dễ hiểu, phù hợp mục tiêu học tiếng Trung.</p><div className="mt-4"><Button>Chi tiết</Button></div></div></article>)}</div></div></div></section>;
}
