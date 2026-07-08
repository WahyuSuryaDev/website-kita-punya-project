'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useContent, CAT_LABEL } from '@/lib/content';
import Icon from '@/lib/icons';
import Cta from '@/components/site/Cta';
import PageHero from '@/components/site/PageHero';
import { Cover, WorkInfo } from '@/components/site/WorkCard';

const FILTERS = [
  ['all', 'Semua Proyek'],
  ['event', 'Event Activation'],
  ['marketing', 'Marketing & Digital'],
  ['branding', 'Branding & Website'],
  ['service', 'Service Management'],
];

export default function Portofolio() {
  const { content } = useContent();
  const t = content.t;
  const [filter, setFilter] = useState('all');
  const [selected, setSelected] = useState(null);

  const projects = content.projects;
  const shown = filter === 'all' ? projects : projects.filter((p) => p.cat === filter);

  useEffect(() => {
    document.body.classList.toggle('no-scroll', selected != null);
    const onKey = (e) => {
      if (e.key === 'Escape') setSelected(null);
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.classList.remove('no-scroll');
      document.removeEventListener('keydown', onKey);
    };
  }, [selected]);

  const p = selected != null ? projects[selected] : null;
  const chips = [1, 2, 3].map((i) => t[`portofolio.chip-${i}`]).filter(Boolean);

  return (
    <>
      <PageHero
        word={t['portofolio.kata-latar']}
        label={t['portofolio.hero-label']}
        judul={t['portofolio.hero-judul']}
        lead={t['portofolio.hero-lead']}
        chips={chips}
      />

      <section className="section">
        <div className="container">
          <div className="filters" role="group" aria-label="Filter kategori proyek">
            {FILTERS.map(([val, label]) => (
              <button
                key={val}
                className={`fbtn${filter === val ? ' active' : ''}`}
                onClick={() => setFilter(val)}
              >
                {label}
              </button>
            ))}
          </div>
          <p className="fcount">
            Menampilkan <b>{shown.length}</b> proyek
          </p>

          <div className="works-grid">
            {shown.map((proj) => {
              const idx = projects.indexOf(proj);
              return (
                <article
                  key={idx}
                  className="work reveal in"
                  tabIndex={0}
                  role="button"
                  aria-haspopup="dialog"
                  aria-label={proj.title}
                  onClick={() => setSelected(idx)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setSelected(idx);
                    }
                  }}
                >
                  <Cover p={proj} cta />
                  <WorkInfo p={proj} />
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <Cta />

      {/* ===== MODAL DETAIL ===== */}
      {p && (
        <div
          className="modal open"
          role="dialog"
          aria-modal="true"
          aria-label={p.title}
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelected(null);
          }}
        >
          <div className="modal-card">
            <button className="modal-close" aria-label="Tutup detail proyek" onClick={() => setSelected(null)} autoFocus>
              <Icon name="x" stroke={2.4} />
            </button>
            <div
              className={`modal-cover ${p.img ? 'cv-img' : p.cv || 'cv-red'}`}
              style={p.img ? { backgroundImage: `url("${p.img}")` } : undefined}
            >
              <span className="wc-tag">{CAT_LABEL[p.cat] || p.cat}</span>
              <h3 className="wc-title">{p.title}</h3>
              <span className="wc-year">’{String(p.year || '').slice(-2)}</span>
            </div>
            <div className="modal-body">
              <div className="mmeta">
                <div>
                  <h5>Klien</h5>
                  <p>{p.client || '-'}</p>
                </div>
                <div>
                  <h5>Tahun</h5>
                  <p>{p.year || '-'}</p>
                </div>
                <div>
                  <h5>Lokasi</h5>
                  <p>{p.loc || '-'}</p>
                </div>
                <div>
                  <h5>Kategori</h5>
                  <p>{CAT_LABEL[p.cat] || p.cat}</p>
                </div>
              </div>
              <p>{p.desc}</p>
              <h6>Lingkup Kerja</h6>
              <div className="mscope">
                {String(p.scope || '')
                  .split('|')
                  .map((s) => s.trim())
                  .filter(Boolean)
                  .map((s, i) => (
                    <span key={i}>{s}</span>
                  ))}
              </div>
              <h6>Hasil</h6>
              <ul className="mresults">
                {String(p.results || '')
                  .split('|')
                  .map((r) => r.trim())
                  .filter(Boolean)
                  .map((r, i) => (
                    <li key={i}>
                      <Icon name="check" stroke={2.4} />
                      {r}
                    </li>
                  ))}
              </ul>
              <Link className="btn btn-red" href="/kontak/" onClick={() => setSelected(null)}>
                <span>{t['portofolio.modal-tombol']}</span>
                <Icon name="arrow" stroke={2.2} />
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
