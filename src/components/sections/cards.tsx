import { BookOpen, GraduationCap, Heart, MessageCircle, PenTool, Trophy } from 'lucide-react';

const features = [
  ['HSK 1-6', 'Lộ trình chuẩn hóa theo cấp độ HSK.', GraduationCap],
  ['Từ vựng HSK', 'Flashcards và ví dụ dễ hiểu.', BookOpen],
  ['Ngữ pháp', 'Cấu trúc rõ ràng, học đến đâu dùng đến đó.', PenTool],
  ['Giao tiếp', 'Luyện phản xạ trong tình huống thật.', MessageCircle],
  ['Cô giáo đồng hành', 'Một giáo viên chính: cô Trần Hồng Ngọc.', Heart],
  ['Luyện thi', 'Mock test và chiến lược làm bài.', Trophy]
];

export function FeatureGrid({ title }: { title: string }) {
  return (
    <section className="app-section">
      <div className="app-container">
        <h2 className="section-title text-center text-3xl md:text-4xl">{title}</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(([name, desc, Icon]) => <article key={name as string} className="glass-card rounded-[1.75rem] p-6"><Icon className="h-8 w-8 text-[var(--color-primary)]" /><h3 className="mt-4 text-xl font-black text-[var(--color-title)]">{name as string}</h3><p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">{desc as string}</p></article>)}
        </div>
      </div>
    </section>
  );
}
