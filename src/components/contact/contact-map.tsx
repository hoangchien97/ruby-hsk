export function ContactMap() {
  return (
    <section className="app-section pt-0">
      <div className="app-container">
        <div className="rounded-[var(--radius-3xl)] overflow-hidden shadow-[var(--shadow-card)] h-[350px] md:h-[550px] relative border border-[var(--color-outline-variant)]/30">
          <iframe
            src="https://maps.google.com/maps?cid=10357135247248641986&output=embed&hl=vi"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full grayscale-[15%] contrast-[110%] brightness-[95%]"
          />
        </div>
      </div>
    </section>
  );
}
