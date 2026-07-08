'use client';

import Link from 'next/link';
import { useContent } from '@/lib/content';
import Icon from '@/lib/icons';
import Cta from '@/components/site/Cta';
import { Cover, WorkInfo } from '@/components/site/WorkCard';

function Check() {
  return <Icon name="check" stroke={2.4} />;
}

export default function Beranda() {
  const { content } = useContent();
  const t = content.t;
  const L = content.layanan;
  const marquee = [1, 2, 3, 4, 5, 6].map((i) => t[`beranda.marquee-${i}`]).filter(Boolean);
  const facts = ['a', 'b', 'c', 'd'];

  return (
    <>
      {/* ===== HERO ===== */}
      <section className="hero">
        <div className="container hero-inner">
          <div>
            <span className="eyebrow">{t['beranda.hero-label']}</span>
            <h1 className="d">
              <span>{t['beranda.hero-judul-1']}</span>
              <b className="dot">.</b>
              <br />
              <span>{t['beranda.hero-judul-2']}</span>
              <b className="dot">.</b>
            </h1>
            <p className="hero-lead">{t['beranda.hero-lead']}</p>
            <div className="hero-actions">
              <Link className="btn btn-red" href="/portofolio/">
                <span>{t['beranda.hero-tombol-1']}</span>
                <Icon name="arrow" stroke={2.2} />
              </Link>
              <Link className="btn btn-ghost" href="/kontak/">
                <span>{t['beranda.hero-tombol-2']}</span>
              </Link>
            </div>
            <div className="hero-proof">
              {[1, 2, 3].map((i) => (
                <span key={i}>
                  <Check />
                  <span>{t[`beranda.hero-poin-${i}`]}</span>
                </span>
              ))}
            </div>
          </div>

          <div className="hero-visual" aria-hidden="true">
            <div className="hv-pill">
              <i></i>
              <span>{t['beranda.hero-pill']}</span>
            </div>
            <div className="hv-card hv-ea">
              <div className="hv-head">
                <div className="hv-ico">
                  <Icon name="spark" stroke={2} />
                </div>
                <span className="hv-num">01</span>
              </div>
              <h3>{t['beranda.kartu1-judul']}</h3>
              <ul>
                {L.ea.items.slice(0, 3).map((it, i) => (
                  <li key={i}>
                    <Check />
                    <span>{it.judul}</span>
                  </li>
                ))}
              </ul>
              <Link className="hv-link" href="/layanan/" tabIndex={-1}>
                <span>{t['beranda.selengkapnya']}</span>
                <Icon name="arrow" stroke={2.2} />
              </Link>
            </div>
            <div className="hv-card hv-sm">
              <div className="hv-head">
                <div className="hv-ico">
                  <Icon name="layers" stroke={2} />
                </div>
                <span className="hv-num">02</span>
              </div>
              <h3 style={{ color: 'var(--ink)' }}>{t['beranda.kartu2-judul']}</h3>
              <div className="hv-chips">
                {L.sm.items.map((it, i) => (
                  <span key={i}>
                    <i></i>
                    <span>{it.judul}</span>
                  </span>
                ))}
              </div>
              <Link className="hv-link" href="/layanan/" tabIndex={-1}>
                <span>{t['beranda.selengkapnya']}</span>
                <Icon name="arrow" stroke={2.2} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== MARQUEE ===== */}
      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {[0, 1].map((copy) => (
            <div key={copy}>
              {marquee.map((m, i) => (
                <span key={i} style={{ display: 'contents' }}>
                  <span>{m}</span>
                  <i></i>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ===== TENTANG RINGKAS ===== */}
      <section className="section section-blush">
        <div className="container about-grid">
          <div className="about-copy reveal">
            <span className="eyebrow">{t['beranda.tentang-label']}</span>
            <h2 className="d">
              <span>{t['beranda.tentang-judul']}</span>
              <b className="dot">.</b>
            </h2>
            <p>{t['beranda.tentang-p1']}</p>
            <p>{t['beranda.tentang-p2']}</p>
            <Link className="btn btn-ghost" href="/tentang/">
              <span>{t['beranda.tentang-tombol']}</span>
              <Icon name="arrow" stroke={2.2} />
            </Link>
          </div>
          <div className="facts">
            {facts.map((f, i) => (
              <div className="fact reveal" data-d={i * 90} key={f}>
                <b>{t[`fakta.${f}-angka`]}</b>
                <h4>{t[`fakta.${f}-judul`]}</h4>
                <p>{t[`fakta.${f}-teks`]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== LAYANAN RINGKAS ===== */}
      <section className="section">
        <div className="container">
          <div className="sec-head reveal">
            <span className="eyebrow">{t['beranda.layanan-label']}</span>
            <h2 className="d">
              <span>{t['beranda.layanan-judul']}</span>
              <b className="dot">.</b>
            </h2>
            <p>{t['beranda.layanan-lead']}</p>
          </div>
          <div className="svc-duo">
            <div className="svc-card svc-red reveal" data-d="0">
              <span className="svc-tag">{t['beranda.svc1-tag']}</span>
              <h3 className="d">
                <span>{t['beranda.svc1-judul']}</span>
                <span style={{ opacity: 0.55 }}>.</span>
              </h3>
              <p>{t['beranda.svc1-lead']}</p>
              <ul className="svc-list">
                {L.ea.items.map((it, i) => (
                  <li key={i}>
                    <Check />
                    <span>{it.judul}</span>
                  </li>
                ))}
              </ul>
              <Link className="btn btn-white" href="/layanan/">
                <span>{t['beranda.svc1-tombol']}</span>
              </Link>
            </div>
            <div className="svc-card svc-white reveal" data-d="120">
              <span className="svc-tag">{t['beranda.svc2-tag']}</span>
              <h3 className="d">
                <span>{t['beranda.svc2-judul']}</span>
                <b className="dot">.</b>
              </h3>
              <p>{t['beranda.svc2-lead']}</p>
              <ul className="svc-list">
                {L.sm.items.map((it, i) => (
                  <li key={i}>
                    <Check />
                    <span>
                      {it.judul} — {it.teks.split(',')[0].toLowerCase()}
                    </span>
                  </li>
                ))}
              </ul>
              <Link className="btn btn-ghost" href="/layanan/">
                <span>{t['beranda.svc2-tombol']}</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== PORTOFOLIO UNGGULAN ===== */}
      <section className="section section-blush">
        <div className="container">
          <div className="sec-head-row reveal">
            <div className="sec-head">
              <span className="eyebrow">{t['beranda.karya-label']}</span>
              <h2 className="d">
                <span>{t['beranda.karya-judul']}</span>
                <b className="dot">.</b>
              </h2>
            </div>
            <Link className="sec-link" href="/portofolio/">
              <span>{t['beranda.karya-link']}</span>
              <Icon name="arrow" stroke={2.2} />
            </Link>
          </div>
          <div className="works-grid cols-4">
            {content.projects.slice(0, 3).map((p, i) => (
              <Link className="work reveal in" href="/portofolio/" key={i}>
                <Cover p={p} />
                <WorkInfo p={p} />
              </Link>
            ))}
            <Link className="work-more reveal in" href="/portofolio/">
              <b>{t['beranda.more-judul']}</b>
              <p>{t['beranda.more-teks']}</p>
              <span>
                <span>{t['beranda.more-link']}</span>
                <Icon name="arrow" stroke={2.2} />
              </span>
            </Link>
          </div>
        </div>
      </section>

      <Cta />
    </>
  );
}
