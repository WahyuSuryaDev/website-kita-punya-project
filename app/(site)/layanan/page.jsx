'use client';

import { useContent } from '@/lib/content';
import Icon from '@/lib/icons';
import Cta from '@/components/site/Cta';
import PageHero from '@/components/site/PageHero';

export default function Layanan() {
  const { content } = useContent();
  const t = content.t;
  const L = content.layanan;
  const chips = [1, 2, 3, 4, 5].map((i) => t[`layanan.chip-${i}`]).filter(Boolean);

  return (
    <>
      <PageHero
        word={t['layanan.kata-latar']}
        label={t['layanan.hero-label']}
        judul={t['layanan.hero-judul']}
        lead={t['layanan.hero-lead']}
        chips={chips}
      />

      {/* ===== EVENT ACTIVATION ===== */}
      <section className="section">
        <div className="container">
          <div className="panel panel-ea reveal">
            <span className="panel-tag">{t['layanan.ea-tag']}</span>
            <h3 className="d">
              <span>{t['layanan.ea-judul']}</span>
              <span style={{ opacity: 0.55 }}>.</span>
            </h3>
            <p className="panel-lead">{t['layanan.ea-lead']}</p>
            <div className="ea-grid">
              {L.ea.items.map((it, i) => (
                <div className="ea-item" key={i}>
                  <Icon name={it.icon} />
                  <h4>{it.judul}</h4>
                  <p>{it.teks}</p>
                </div>
              ))}
            </div>
            <div className="etypes">
              <h5>{t['layanan.jenis-judul']}</h5>
              <div>
                {L.ea.jenis.map((j, i) => (
                  <span key={i}>{j}</span>
                ))}
              </div>
            </div>
          </div>

          {/* ===== SERVICE MANAGEMENT ===== */}
          <div className="panel panel-sm reveal">
            <span className="panel-tag">{t['layanan.sm-tag']}</span>
            <h3 className="d">
              <span>{t['layanan.sm-judul']}</span>
              <b className="dot">.</b>
            </h3>
            <p className="panel-lead">{t['layanan.sm-lead']}</p>
            <div className="sm-grid">
              {L.sm.items.map((it, i) => (
                <div className="sm-item" key={i}>
                  <div className="sm-ico">
                    <Icon name={it.icon} />
                  </div>
                  <h4>{it.judul}</h4>
                  <p>{it.teks}</p>
                </div>
              ))}
            </div>
            <div className="sm-note">
              <Icon name="shield" stroke={2} />
              <span>{t['layanan.sm-note']}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ===== PROSES ===== */}
      <section className="section process">
        <div className="container">
          <div className="sec-head reveal">
            <span className="eyebrow">{t['layanan.proses-label']}</span>
            <h2 className="d">
              <span>{t['layanan.proses-judul']}</span>
              <b className="dot">.</b>
            </h2>
            <p>{t['layanan.proses-lead']}</p>
          </div>
          <div className="steps">
            {L.proses.map((s, i) => (
              <div className="step reveal" data-d={i * 90} key={i}>
                <b>{String(i + 1).padStart(2, '0')}</b>
                <h4>{s.judul}</h4>
                <p>{s.teks}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== KEUNGGULAN ===== */}
      <section className="section">
        <div className="container">
          <div className="sec-head reveal">
            <span className="eyebrow">{t['layanan.mengapa-label']}</span>
            <h2 className="d">
              <span>{t['layanan.mengapa-judul']}</span>
              <b className="dot">.</b>
            </h2>
          </div>
          <div className="why-grid">
            {L.keunggulan.map((k, i) => (
              <div className="why reveal" data-d={i * 90} key={i}>
                <div className="why-ico">
                  <Icon name={k.icon} />
                </div>
                <h4>{k.judul}</h4>
                <p>{k.teks}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Cta />
    </>
  );
}
