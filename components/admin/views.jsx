'use client';

import { useRef } from 'react';
import { CAT_LABEL, BASE } from '@/lib/content';
import Icon from '@/lib/icons';
import { TextField, TextSection, ListEditor, ChipsEditor, IconSelect, labelFor, processImage } from './ui';

const GROUP_TITLES = {
  umum: 'Navigasi & Merek',
  cta: 'Kotak Ajakan (CTA)',
  footer: 'Footer',
  beranda: 'Teks Halaman Beranda',
  fakta: 'Kartu Fakta (Beranda & Tentang)',
  tentang: 'Teks Halaman Tentang',
  layanan: 'Teks Halaman Layanan',
  portofolio: 'Teks Halaman Portofolio',
  kontak: 'Teks Halaman Kontak & FAQ',
};

export function keysOf(t, prefix) {
  return Object.keys(t).filter((k) => k.startsWith(prefix + '.'));
}

export function TextGroups({ prefixes, work, setText }) {
  return prefixes.map((g) => (
    <TextSection
      key={g}
      title={GROUP_TITLES[g] || g}
      keys={keysOf(work.t, g)}
      t={work.t}
      onChange={setText}
    />
  ));
}

/* ---------- Dashboard ---------- */
export function DashboardView({ work, hasDraft, go }) {
  const L = work.layanan;
  const stats = [
    { icon: 'folder', label: 'Proyek Portofolio', value: work.projects.length, sub: 'tampil di situs' },
    { icon: 'briefcase', label: 'Item Layanan', value: L.ea.items.length + L.sm.items.length, sub: `${L.ea.items.length} EA • ${L.sm.items.length} SM` },
    { icon: 'spark', label: 'Jenis Acara', value: L.ea.jenis.length, sub: 'chip di hal. layanan' },
    { icon: 'file', label: 'Kunci Teks', value: Object.keys(work.t).length, sub: 'semua bisa diedit' },
  ];

  return (
    <>
      <div className="dash-stats">
        {stats.map((s, i) => (
          <div className="dstat" key={i}>
            <div className="ico">
              <Icon name={s.icon} />
            </div>
            <h5>{s.label}</h5>
            <b>{s.value}</b>
            <span>{s.sub}</span>
          </div>
        ))}
      </div>

      <div className="dash-table">
        <h4>Proyek Portofolio Terbaru</h4>
        <div className="dt-scroll">
          <table>
            <thead>
              <tr>
                <th>Nama Proyek</th>
                <th>Kategori</th>
                <th>Tahun</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {work.projects.slice(0, 6).map((p, i) => (
                <tr key={i}>
                  <td>
                    <span
                      className="cover-dot"
                      style={
                        p.img
                          ? { backgroundImage: `url("${p.img}")` }
                          : { background: 'var(--red)' }
                      }
                    ></span>
                    <b>{p.title}</b>
                  </td>
                  <td>
                    <span className="dash-pill">{CAT_LABEL[p.cat] || p.cat}</span>
                  </td>
                  <td>{p.year}</td>
                  <td>
                    <button className="dash-link" onClick={() => go('projects')}>
                      Kelola →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="adm-banner" style={{ margin: 0 }}>
        <b>Cara menayangkan perubahan:</b> semua editan otomatis tersimpan sebagai{' '}
        <b>draf di browser ini</b>{hasDraft ? ' (draf aktif ✓)' : ''} dan langsung terlihat lewat{' '}
        <b>Pratinjau</b>. Agar tayang untuk semua pengunjung: klik <b>Unduh content.json</b>, lalu
        ganti file <code>public/content.json</code> di GitHub (buka file → ikon pensil → tempel →
        Commit). Situs terbarui ±1 menit, tanpa build ulang.
      </div>
    </>
  );
}

/* ---------- Layanan (data dinamis) ---------- */
export function LayananView({ work, update, setText }) {
  const L = work.layanan;
  return (
    <>
      <ListEditor
        title="Layanan — Event Activation"
        hint="Kartu di panel merah halaman Layanan. Juga tampil di beranda (daftar & kartu hero)."
        items={L.ea.items}
        onChange={(items) => update((w) => (w.layanan.ea.items = items))}
        titleOf={(it) => it.judul}
        template={{ icon: 'spark', judul: 'Layanan Baru', teks: 'Deskripsi singkat layanan.' }}
        addLabel="Tambah Item Event Activation"
        fields={[
          { prop: 'judul', label: 'Judul' },
          { prop: 'icon', type: 'icon' },
          { prop: 'teks', label: 'Deskripsi', type: 'textarea' },
        ]}
      />
      <ChipsEditor
        title="Jenis Acara yang Ditangani"
        hint="Chip di dalam panel Event Activation."
        items={L.ea.jenis}
        onChange={(items) => update((w) => (w.layanan.ea.jenis = items))}
        placeholder="mis. Konser & Festival"
      />
      <ListEditor
        title="Layanan — Service Management"
        hint="Empat fungsi (atau lebih) di panel putih. Juga jadi chip di beranda & tautan footer."
        items={L.sm.items}
        onChange={(items) => update((w) => (w.layanan.sm.items = items))}
        titleOf={(it) => it.judul}
        template={{ icon: 'grid', judul: 'Fungsi Baru', teks: 'Deskripsi singkat fungsi.' }}
        addLabel="Tambah Item Service Management"
        fields={[
          { prop: 'judul', label: 'Judul' },
          { prop: 'icon', type: 'icon' },
          { prop: 'teks', label: 'Deskripsi', type: 'textarea' },
        ]}
      />
      <ListEditor
        title="Alur Kerja (Proses)"
        hint="Langkah bernomor otomatis pada bagian gelap halaman Layanan."
        items={L.proses}
        onChange={(items) => update((w) => (w.layanan.proses = items))}
        titleOf={(it) => it.judul}
        template={{ judul: 'Langkah Baru', teks: 'Deskripsi langkah.' }}
        addLabel="Tambah Langkah"
        fields={[
          { prop: 'judul', label: 'Judul' },
          { prop: 'teks', label: 'Deskripsi', type: 'textarea' },
        ]}
      />
      <ListEditor
        title="Keunggulan"
        hint="Kartu 'Mengapa Kita Punya Project' di halaman Layanan."
        items={L.keunggulan}
        onChange={(items) => update((w) => (w.layanan.keunggulan = items))}
        titleOf={(it) => it.judul}
        template={{ icon: 'gem', judul: 'Keunggulan Baru', teks: 'Deskripsi singkat.' }}
        addLabel="Tambah Keunggulan"
        fields={[
          { prop: 'judul', label: 'Judul' },
          { prop: 'icon', type: 'icon' },
          { prop: 'teks', label: 'Deskripsi', type: 'textarea' },
        ]}
      />
      <TextGroups prefixes={['layanan']} work={work} setText={setText} />
    </>
  );
}

/* ---------- Proyek Portofolio ---------- */
const CV_OPTIONS = [
  ['cv-red', 'Merah Solid'],
  ['cv-ink', 'Gelap Berbintik'],
  ['cv-blush', 'Krem Berbingkai'],
  ['cv-grad', 'Gradien Merah'],
  ['cv-stripe', 'Garis-garis'],
  ['cv-glow', 'Gelap Menyala'],
];

function ProjectCover({ p, onImg, onClear }) {
  const fileRef = useRef(null);
  return (
    <div className="adm-field full">
      <label>
        Foto sampul <small>— opsional, menggantikan desain poster</small>
      </label>
      <div className="adm-imgrow">
        {p.img && (
          <span
            className="adm-thumb"
            style={{ backgroundImage: `url("${p.img}")`, width: 54, height: 66 }}
          ></span>
        )}
        <button className="adm-mini" onClick={() => fileRef.current?.click()}>
          {p.img ? 'Ganti Foto' : 'Unggah Foto'}
        </button>
        {p.img && (
          <button className="adm-mini danger" onClick={onClear}>
            Hapus Foto
          </button>
        )}
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          hidden
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) processImage(f, 1200, onImg);
            e.target.value = '';
          }}
        />
      </div>
    </div>
  );
}

export function ProjectsView({ work, update, setText }) {
  const items = work.projects;
  const setItem = (i, prop, val) =>
    update((w) => (w.projects = w.projects.map((p, idx) => (idx === i ? { ...p, [prop]: val } : p))));
  const setAll = (next) => update((w) => (w.projects = next));
  const move = (i, dir) => {
    const next = [...items];
    const j = i + dir;
    if (j < 0 || j >= next.length) return;
    [next[i], next[j]] = [next[j], next[i]];
    setAll(next);
  };

  return (
    <>
      <div className="adm-sec">
        <h3>Proyek Portofolio ({items.length})</h3>
        <p className="adm-hint">
          Tiga proyek teratas tampil di beranda. Semua proyek saat ini masih contoh (dummy) — ganti
          dengan proyek nyata perusahaan.
        </p>
        {items.map((p, i) => (
          <details className="adm-list-item" key={i}>
            <summary>
              <span
                className="adm-thumb"
                style={p.img ? { backgroundImage: `url("${p.img}")` } : { background: 'var(--red)' }}
              ></span>
              <span>
                <b style={{ display: 'block', lineHeight: 1.3 }}>{p.title || '(tanpa judul)'}</b>
                <small style={{ color: 'var(--smoke)' }}>
                  {(CAT_LABEL[p.cat] || p.cat) + ' • ' + (p.year || '-')}
                </small>
              </span>
            </summary>
            <div className="adm-list-body">
              <div className="adm-grid">
                <TextField label="Judul proyek" value={p.title} onChange={(v) => setItem(i, 'title', v)} long={false} />
                <div className="adm-field">
                  <label>Kategori</label>
                  <select value={p.cat} onChange={(e) => setItem(i, 'cat', e.target.value)}>
                    {Object.entries(CAT_LABEL).map(([v, l]) => (
                      <option key={v} value={v}>
                        {l}
                      </option>
                    ))}
                  </select>
                </div>
                <TextField label="Tahun" value={p.year} onChange={(v) => setItem(i, 'year', v)} long={false} />
                <TextField label="Klien" value={p.client} onChange={(v) => setItem(i, 'client', v)} long={false} />
                <TextField label="Lokasi" value={p.loc} onChange={(v) => setItem(i, 'loc', v)} long={false} />
                <div className="adm-field">
                  <label>
                    Desain sampul <small>— jika tanpa foto</small>
                  </label>
                  <select value={p.cv || 'cv-red'} onChange={(e) => setItem(i, 'cv', e.target.value)}>
                    {CV_OPTIONS.map(([v, l]) => (
                      <option key={v} value={v}>
                        {l}
                      </option>
                    ))}
                  </select>
                </div>
                <TextField label="Deskripsi" value={p.desc} onChange={(v) => setItem(i, 'desc', v)} long />
                <TextField label="Lingkup kerja" hint="pisahkan tiap poin dengan |" value={p.scope} onChange={(v) => setItem(i, 'scope', v)} long />
                <TextField label="Hasil" hint="pisahkan tiap poin dengan |" value={p.results} onChange={(v) => setItem(i, 'results', v)} long />
                <ProjectCover p={p} onImg={(url) => setItem(i, 'img', url)} onClear={() => setItem(i, 'img', '')} />
              </div>
              <div className="adm-proj-tools">
                <button className="adm-mini" onClick={() => move(i, -1)}>↑ Naik</button>
                <button className="adm-mini" onClick={() => move(i, 1)}>↓ Turun</button>
                <button className="adm-mini" onClick={() => setAll([...items.slice(0, i + 1), JSON.parse(JSON.stringify(p)), ...items.slice(i + 1)])}>
                  Duplikat
                </button>
                <button
                  className="adm-mini danger"
                  onClick={() => {
                    if (confirm(`Hapus proyek "${p.title}"?`)) setAll(items.filter((_, idx) => idx !== i));
                  }}
                >
                  Hapus Proyek
                </button>
              </div>
            </div>
          </details>
        ))}
        <button
          className="adm-add"
          onClick={() =>
            setAll([
              ...items,
              {
                title: 'Proyek Baru',
                cat: 'event',
                year: String(new Date().getFullYear()),
                client: 'Nama Klien',
                loc: 'Kota',
                cv: 'cv-red',
                img: '',
                desc: 'Deskripsi singkat proyek.',
                scope: 'Lingkup 1|Lingkup 2',
                results: 'Hasil 1|Hasil 2',
              },
            ])
          }
        >
          + Tambah Proyek Baru
        </button>
      </div>
      <TextGroups prefixes={['portofolio']} work={work} setText={setText} />
    </>
  );
}

/* ---------- Info Kontak ---------- */
export function KontakInfoView({ work, update }) {
  const K = work.kontak;
  const defs = [
    ['wa', 'Nomor WhatsApp', 'format internasional tanpa +, contoh 6281234567890'],
    ['waTampil', 'Nomor WhatsApp (tampilan)', 'contoh +62 812-3456-7890'],
    ['email', 'Alamat email', ''],
    ['ig', 'Username Instagram', 'tanpa @'],
    ['alamat', 'Alamat / kota kantor', ''],
  ];
  return (
    <div className="adm-sec">
      <h3>Info Kontak & Sosial Media</h3>
      <p className="adm-hint">
        Dipakai otomatis di semua tombol WhatsApp, email, Instagram, dan formulir kontak.
      </p>
      <div className="adm-grid">
        {defs.map(([prop, label, hint]) => (
          <TextField
            key={prop}
            label={label}
            hint={hint}
            long={false}
            value={K[prop]}
            onChange={(v) => update((w) => (w.kontak[prop] = v))}
          />
        ))}
      </div>
    </div>
  );
}

/* ---------- Logo ---------- */
export function LogoView({ work, update }) {
  const fileRef = useRef(null);
  return (
    <div className="adm-sec">
      <h3>Logo Website</h3>
      <p className="adm-hint">
        Tampil di navigasi semua halaman. Unggah PNG berlatar transparan agar rapi.
      </p>
      <div className="adm-imgrow">
        <div className="adm-imgprev">
          <img src={work.img.logo || `${BASE}/logo.png`} alt="Logo" />
        </div>
        <button className="adm-mini" onClick={() => fileRef.current?.click()}>
          Ganti Logo
        </button>
        <button className="adm-mini danger" onClick={() => update((w) => delete w.img.logo)}>
          Kembalikan Bawaan
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          hidden
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) processImage(f, 900, (url) => update((w) => (w.img.logo = url)));
            e.target.value = '';
          }}
        />
      </div>
    </div>
  );
}
