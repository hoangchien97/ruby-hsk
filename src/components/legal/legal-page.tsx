export function LegalPage({
  title,
  sections,
  tocLabel,
  placeholderText,
}: {
  title: string;
  sections: string[];
  tocLabel: string;
  placeholderText: string;
}) {
  return (
    <section className="app-section">
      <div className="app-container">
        <h1 className="section-title text-4xl md:text-6xl">{title}</h1>
        <div className="mt-10 grid gap-8 md:grid-cols-[260px_1fr]">
          <aside className="glass-card h-fit rounded-[1.5rem] p-5 md:sticky md:top-28">
            <h2 className="font-black text-[var(--color-title)]">{tocLabel}</h2>
            {sections.map((s, i) => (
              <a key={s} href={`#s-${i}`} className="mt-3 block text-sm text-[var(--color-muted)]">
                {s}
              </a>
            ))}
          </aside>
          <div className="grid gap-5">
            {sections.map((s, i) => (
              <article id={`s-${i}`} key={s} className="glass-card rounded-[1.5rem] p-6">
                <h2 className="text-2xl font-black text-[var(--color-title)]">{s}</h2>
                <p className="mt-3 leading-8 text-[var(--color-text)]">{placeholderText}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
