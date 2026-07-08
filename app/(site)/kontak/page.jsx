'use client';

import { useState } from 'react';
import { useContent } from '@/lib/content';
import Icon from '@/lib/icons';
import PageHero from '@/components/site/PageHero';

export default function Kontak() {
  const { content } = useContent();
  const t = content.t;
  const K = content.kontak;
  const [form, setForm] = useState({ nama: '', instansi: '', kontak: '', jenis: 'Event Activation', pesan: '' });

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    const lines = [
      'Halo Kita Punya Project!',
      '',
      `Nama: ${form.nama}`,
      `Perusahaan/Instansi: ${form.instansi || '-'}`,
      `Kontak: ${form.kontak}`,
      `Kebutuhan: ${form.jenis}`,
      '',
      'Pesan:',
      form.pesan,
    ];
    window.open(`https://wa.me/${K.wa}?text=${encodeURIComponent(lines.join('\n'))}`, '_blank', 'noopener');
  };

  const cards = [
    { icon: 'mail', label: 'Email', value: K.email, href: `mailto:${K.email}`, aksi: t['kontak.aksi-email'] },
    { icon: 'chat', label: 'WhatsApp', value: K.waTampil, href: `https://wa.me/${K.wa}`, aksi: t['kontak.aksi-wa'] },
    { icon: 'instagram', label: 'Instagram', value: `@${K.ig}`, href: `https://instagram.com/${K.ig}`, aksi: t['kontak.aksi-ig'] },
    { icon: 'pin', label: 'Lokasi', value: K.alamat, href: null, aksi: t['kontak.aksi-lokasi'] },
  ];

  return (
    <>
      <PageHero
        word={t['kontak.kata-latar']}
        label={t['kontak.hero-label']}
        judul={t['kontak.hero-judul']}
        lead={t['kontak.hero-lead']}
      />

      <section className="section">
        <div className="container contact-wrap">
          <div className="form-card reveal">
            <h3 className="d">
              <span>{t['kontak.form-judul']}</span>
              <b className="dot">.</b>
            </h3>
            <p>{t['kontak.form-lead']}</p>
            <form onSubmit={submit}>
              <div className="form-row">
                <div className="field">
                  <label htmlFor="fNama">Nama</label>
                  <input id="fNama" type="text" placeholder="Nama Anda" required value={form.nama} onChange={set('nama')} />
                </div>
                <div className="field">
                  <label htmlFor="fInstansi">Perusahaan / Instansi</label>
                  <input id="fInstansi" type="text" placeholder="Opsional" value={form.instansi} onChange={set('instansi')} />
                </div>
              </div>
              <div className="form-row">
                <div className="field">
                  <label htmlFor="fKontak">Email / No. HP</label>
                  <input id="fKontak" type="text" placeholder="Agar kami bisa membalas" required value={form.kontak} onChange={set('kontak')} />
                </div>
                <div className="field">
                  <label htmlFor="fJenis">Kebutuhan</label>
                  <select id="fJenis" value={form.jenis} onChange={set('jenis')}>
                    <option>Event Activation</option>
                    <option>Marketing & Digital</option>
                    <option>Branding & Website</option>
                    <option>Service Management (HR/Finance/Legal)</option>
                    <option>Lainnya</option>
                  </select>
                </div>
              </div>
              <div className="field">
                <label htmlFor="fPesan">Pesan</label>
                <textarea id="fPesan" placeholder="Ceritakan singkat rencana acara atau kebutuhan bisnis Anda…" required value={form.pesan} onChange={set('pesan')} />
              </div>
              <button type="submit" className="btn btn-red">
                <Icon name="chat" stroke={2} />
                <span>{t['kontak.form-tombol']}</span>
              </button>
              <p className="form-note">
                <Icon name="info" stroke={2} />
                <span>
                  <span>{t['kontak.form-note']}</span>{' '}
                  <a href={`mailto:${K.email}`}>
                    <strong>{K.email}</strong>
                  </a>
                </span>
              </p>
            </form>
          </div>

          <div className="contact-stack">
            {cards.map((c, i) => {
              const inner = (
                <>
                  <div className="contact-ico">
                    <Icon name={c.icon} />
                  </div>
                  <h4>{c.label}</h4>
                  <p>{c.value}</p>
                  <span>
                    <span>{c.aksi}</span>
                    {c.href && <Icon name="arrow" stroke={2.4} />}
                  </span>
                </>
              );
              return c.href ? (
                <a key={i} className="contact-card reveal" data-d={i * 90} href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">
                  {inner}
                </a>
              ) : (
                <div key={i} className="contact-card reveal" data-d={i * 90}>
                  {inner}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section section-blush">
        <div className="container">
          <div className="sec-head reveal">
            <span className="eyebrow">{t['kontak.faq-label']}</span>
            <h2 className="d">
              <span>{t['kontak.faq-judul']}</span>
              <b className="dot">.</b>
            </h2>
          </div>
          <div className="faq-list reveal">
            {[1, 2, 3, 4].map((i) => (
              <details className="faq" key={i}>
                <summary>
                  <span>{t[`kontak.faq${i}-q`]}</span>
                </summary>
                <p>{t[`kontak.faq${i}-a`]}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
