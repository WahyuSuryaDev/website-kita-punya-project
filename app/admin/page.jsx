'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useContent, readDraft, normalize, clone, DRAFT_KEY, BASE } from '@/lib/content';
import Icon from '@/lib/icons';
import { TextGroups } from '@/components/admin/views';
import {
  DashboardView,
  LayananView,
  ProjectsView,
  KontakInfoView,
  LogoView,
} from '@/components/admin/views';

/* GANTI: kode akses panel admin */
const PASS = 'kpp2026';
const GATE_KEY = 'kpp-admin-ok';

const SECTIONS = [
  { group: 'Menu' },
  { id: 'dashboard', icon: 'home', label: 'Dashboard', desc: 'Ringkasan konten website' },
  { group: 'Konten Halaman' },
  { id: 'umum', icon: 'settings', label: 'Umum & Navigasi', desc: 'Menu, merek, CTA, dan footer' },
  { id: 'beranda', icon: 'file', label: 'Beranda', desc: 'Teks halaman beranda & kartu fakta' },
  { id: 'tentang', icon: 'file', label: 'Tentang', desc: 'Profil, visi misi, dan nilai' },
  { id: 'kontakhal', icon: 'file', label: 'Kontak & FAQ', desc: 'Teks halaman kontak dan FAQ' },
  { group: 'Data Dinamis' },
  { id: 'layanan', icon: 'briefcase', label: 'Layanan', desc: 'Item layanan, proses & keunggulan — tambah/hapus bebas' },
  { id: 'projects', icon: 'folder', label: 'Proyek Portofolio', desc: 'Kelola semua proyek — tambah/hapus bebas' },
  { id: 'kontakinfo', icon: 'phone', label: 'Info Kontak', desc: 'WhatsApp, email, Instagram, alamat' },
  { group: 'Pengaturan' },
  { id: 'logo', icon: 'image', label: 'Logo & Merek', desc: 'Ganti logo website' },
];

export default function AdminPage() {
  const { fileBase, setLive } = useContent();
  const [unlocked, setUnlocked] = useState(false);
  const [pass, setPass] = useState('');
  const [gateErr, setGateErr] = useState('');
  const [section, setSection] = useState('dashboard');
  const [work, setWork] = useState(null);
  const [hasDraft, setHasDraft] = useState(false);
  const [toast, setToast] = useState('');
  const saveTimer = useRef(null);
  const toastTimer = useRef(null);
  const dirty = useRef(false);
  const importRef = useRef(null);

  /* Buka gate jika sudah pernah masuk di sesi ini */
  useEffect(() => {
    try {
      if (sessionStorage.getItem(GATE_KEY) === '1') setUnlocked(true);
    } catch (e) {}
  }, []);

  /* Inisialisasi konten kerja: draf > file content.json */
  useEffect(() => {
    const draft = readDraft();
    if (draft) {
      setWork(normalize(draft));
      setHasDraft(true);
    } else if (!dirty.current) {
      setWork(clone(fileBase));
    }
  }, [fileBase]);

  const showToast = (msg) => {
    setToast(msg);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(''), 1800);
  };

  const persist = (next) => {
    clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      try {
        localStorage.setItem(DRAFT_KEY, JSON.stringify(next));
      } catch (e) {}
      setHasDraft(true);
      setLive(next);
      showToast('Draf tersimpan ✓');
    }, 500);
  };

  const update = (mutator) => {
    dirty.current = true;
    setWork((w) => {
      const next = clone(w);
      mutator(next);
      persist(next);
      return next;
    });
  };
  const setText = (key, val) => update((w) => (w.t[key] = val));

  const tryUnlock = (e) => {
    e.preventDefault();
    if (pass === PASS) {
      try {
        sessionStorage.setItem(GATE_KEY, '1');
      } catch (err) {}
      setUnlocked(true);
    } else {
      setGateErr('Kode akses salah.');
    }
  };

  const download = () => {
    const text = JSON.stringify(work, null, 2) + '\n';
    const blob = new Blob([text], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'content.json';
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 2000);
    showToast('content.json diunduh — ganti file public/content.json di GitHub');
  };

  const importFile = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const text = String(reader.result);
        const obj = JSON.parse(text.slice(text.indexOf('{'), text.lastIndexOf('}') + 1));
        if (!obj.t || !obj.projects) throw new Error('format');
        const next = normalize(obj);
        dirty.current = true;
        setWork(next);
        persist(next);
        showToast('Konten berhasil diimpor ✓');
      } catch (err) {
        alert('File tidak dikenali. Pilih file content.json hasil unduhan panel ini.');
      }
      e.target.value = '';
    };
    reader.readAsText(f);
  };

  const reset = () => {
    if (!confirm('Buang semua perubahan dan kembali ke konten yang sedang tayang?')) return;
    try {
      localStorage.removeItem(DRAFT_KEY);
    } catch (e) {}
    dirty.current = false;
    setHasDraft(false);
    const base = clone(fileBase);
    setWork(base);
    setLive(base);
    showToast('Draf dibuang');
  };

  /* ---------- Gate ---------- */
  if (!unlocked) {
    return (
      <div className="adm-gate">
        <form className="adm-gate-card" onSubmit={tryUnlock}>
          <img src={`${BASE}/logo.png`} alt="Kita Punya Project" />
          <h1>
            Panel Admin<b>.</b>
          </h1>
          <p>Masukkan kode akses untuk mengelola konten website.</p>
          <input
            type="password"
            placeholder="Kode akses"
            autoComplete="off"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />
          <button type="submit">Masuk</button>
          <p className="adm-gate-err">{gateErr}</p>
        </form>
      </div>
    );
  }

  if (!work) return null;

  const active = SECTIONS.find((s) => s.id === section) || SECTIONS[1];

  return (
    <div className="dash">
      {/* ===== Sidebar ===== */}
      <aside className="dash-side">
        <div className="dash-logo">
          <div className="wm">
            <b>Kita Punya</b>
            <span>
              Project<span style={{ color: 'var(--red)' }}>.</span>
            </span>
          </div>
        </div>
        <nav className="dash-nav">
          {SECTIONS.map((s, i) =>
            s.group ? (
              <div className="dash-label" key={`g${i}`}>
                {s.group}
              </div>
            ) : (
              <button
                key={s.id}
                className={`dash-item${section === s.id ? ' active' : ''}`}
                onClick={() => setSection(s.id)}
              >
                <Icon name={s.icon} />
                {s.label}
                {s.id === 'projects' && <span className="badge">{work.projects.length}</span>}
              </button>
            )
          )}
        </nav>
        <div className="dash-side-foot">
          Panel Admin — PT Kita Punya Project
          <br />
          Draf: {hasDraft ? 'aktif di browser ini' : 'tidak ada'}
        </div>
      </aside>

      {/* ===== Konten ===== */}
      <div className="dash-body">
        <header className="dash-top">
          <div className="dash-title">
            <b>{active.label}</b>
            <span>{active.desc}</span>
          </div>
          <Link className="adm-btn ghost" href="/" target="_blank">
            <Icon name="eye" size={15} /> Pratinjau
          </Link>
          <button className="adm-btn ghost" onClick={() => importRef.current?.click()}>
            <Icon name="upload" size={15} /> Impor
          </button>
          <input ref={importRef} type="file" accept=".json,.js" hidden onChange={importFile} />
          <button className="adm-btn ghost danger" onClick={reset}>
            <Icon name="refresh" size={15} /> Reset
          </button>
          <button className="adm-btn solid" onClick={download}>
            <Icon name="download" size={15} /> Unduh content.json
          </button>
          <div className="dash-avatar">KP</div>
        </header>

        <main className="dash-main">
          {section === 'dashboard' && <DashboardView work={work} hasDraft={hasDraft} go={setSection} />}
          {section === 'umum' && <TextGroups prefixes={['umum', 'cta', 'footer']} work={work} setText={setText} />}
          {section === 'beranda' && <TextGroups prefixes={['beranda', 'fakta']} work={work} setText={setText} />}
          {section === 'tentang' && <TextGroups prefixes={['tentang']} work={work} setText={setText} />}
          {section === 'kontakhal' && <TextGroups prefixes={['kontak']} work={work} setText={setText} />}
          {section === 'layanan' && <LayananView work={work} update={update} setText={setText} />}
          {section === 'projects' && <ProjectsView work={work} update={update} setText={setText} />}
          {section === 'kontakinfo' && <KontakInfoView work={work} update={update} />}
          {section === 'logo' && <LogoView work={work} update={update} />}
        </main>
      </div>

      <div className={`adm-status${toast ? ' show' : ''}`}>{toast}</div>
    </div>
  );
}
