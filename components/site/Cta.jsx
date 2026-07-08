'use client';

import { useContent } from '@/lib/content';
import Icon from '@/lib/icons';

export default function Cta() {
  const { content } = useContent();
  const t = content.t;
  const K = content.kontak;

  return (
    <section className="section section-tight">
      <div className="container">
        <div className="cta-box reveal">
          <div>
            <h2 className="d">
              <span>{t['cta.judul']}</span>
              <span style={{ opacity: 0.55 }}>?</span>
            </h2>
            <p>{t['cta.teks']}</p>
          </div>
          <div className="cta-actions">
            <a
              className="btn btn-white"
              href={`https://wa.me/${K.wa}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon name="chat" stroke={2} />
              <span>{t['cta.tombol-wa']}</span>
            </a>
            <a className="btn btn-outline-white" href={`mailto:${K.email}`}>
              <Icon name="mail" stroke={2} />
              <span>{t['cta.tombol-email']}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
