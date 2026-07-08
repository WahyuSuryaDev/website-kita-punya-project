'use client';

export default function PageHero({ word, label, judul, lead, chips }) {
  return (
    <section className="page-hero" data-word={word}>
      <div className="container">
        <span className="eyebrow">{label}</span>
        <h1 className="d">
          <span>{judul}</span>
          <b className="dot">.</b>
        </h1>
        {lead && <p>{lead}</p>}
        {chips && chips.length > 0 && (
          <div className="ph-chips">
            {chips.map((c, i) => (
              <span key={i}>
                <i></i>
                <span>{c}</span>
              </span>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
