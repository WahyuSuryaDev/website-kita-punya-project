'use client';

import { useContent } from '@/lib/content';
import Icon from '@/lib/icons';
import Cta from '@/components/site/Cta';
import PageHero from '@/components/site/PageHero';

const NILAI_ICONS = ['bulb', 'users', 'shield', 'target'];

export default function Tentang() {
  const { content } = useContent();
  const t = content.t;

  return (
    <>
      <PageHero
        word={t['tentang.kata-latar']}
        label={t['tentang.hero-label']}
        judul={t['tentang.hero-judul']}
        lead={t['tentang.hero-lead']}
      />

      <section className="section">
        <div className="container about-grid">
          <div className="about-copy reveal">
            <span className="eyebrow">{t['tentang.profil-label']}</span>
            <h2 className="d">
              <span>{t['tentang.profil-judul']}</span>
              <b className="dot">.</b>
            </h2>
            <p>{t['tentang.profil-p1']}</p>
            <p>{t['tentang.profil-p2']}</p>
            <p>{t['tentang.profil-p3']}</p>
          </div>
          <div className="facts">
            {['a', 'b', 'c', 'd'].map((f, i) => (
              <div className="fact reveal" data-d={i * 90} key={f}>
                <b>{t[`fakta.${f}-angka`]}</b>
                <h4>{t[`fakta.${f}-judul`]}</h4>
                <p>{t[`fakta.${f}-teks`]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-blush">
        <div className="container">
          <div className="sec-head reveal">
            <span className="eyebrow">{t['tentang.vm-label']}</span>
            <h2 className="d">
              <span>{t['tentang.vm-judul']}</span>
              <b className="dot">.</b>
            </h2>
          </div>
          <div className="vm-grid">
            <div className="vm-card vm-visi reveal" data-d="0">
              <h3>{t['tentang.visi-judul']}</h3>
              <p>
                <span>{t['tentang.visi-teks']}</span>
                <span style={{ opacity: 0.6 }}>.</span>
              </p>
            </div>
            <div className="vm-card vm-misi reveal" data-d="120">
              <h3>{t['tentang.misi-judul']}</h3>
              <ul>
                {[1, 2, 3, 4].map((i) => (
                  <li key={i}>
                    <Icon name="check" stroke={2.2} />
                    <span>{t[`tentang.misi-${i}`]}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-blush section-tight">
        <div className="container">
          <div className="sec-head reveal">
            <span className="eyebrow">{t['tentang.nilai-label']}</span>
            <h2 className="d">
              <span>{t['tentang.nilai-judul']}</span>
              <b className="dot">.</b>
            </h2>
          </div>
          <div className="why-grid">
            {[1, 2, 3, 4].map((i) => (
              <div className="why reveal" data-d={(i - 1) * 90} key={i}>
                <div className="why-ico">
                  <Icon name={NILAI_ICONS[i - 1]} />
                </div>
                <h4>{t[`tentang.nilai${i}-judul`]}</h4>
                <p>{t[`tentang.nilai${i}-teks`]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Cta />
    </>
  );
}
