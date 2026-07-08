'use client';

import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import DEFAULT_CONTENT from './default-content';

export const BASE = process.env.NEXT_PUBLIC_BASE_PATH || '';
export const DRAFT_KEY = 'kpp-draft-v2';

export const CAT_LABEL = {
  event: 'Event Activation',
  marketing: 'Marketing & Digital',
  branding: 'Branding & Website',
  service: 'Service Management',
};
export const CAT_SHORT = { event: 'Event', marketing: 'Marketing', branding: 'Branding', service: 'Service' };

export function clone(o) {
  return JSON.parse(JSON.stringify(o));
}

/* Lengkapi struktur konten agar cabang yang hilang jatuh ke bawaan */
export function normalize(c) {
  const d = DEFAULT_CONTENT;
  if (!c || typeof c !== 'object') return clone(d);
  return {
    t: { ...d.t, ...(c.t || {}) },
    img: { ...(c.img || {}) },
    kontak: { ...d.kontak, ...(c.kontak || {}) },
    projects: Array.isArray(c.projects) ? c.projects : clone(d.projects),
    layanan: {
      ea: {
        items: c.layanan?.ea?.items || clone(d.layanan.ea.items),
        jenis: c.layanan?.ea?.jenis || clone(d.layanan.ea.jenis),
      },
      sm: { items: c.layanan?.sm?.items || clone(d.layanan.sm.items) },
      proses: c.layanan?.proses || clone(d.layanan.proses),
      keunggulan: c.layanan?.keunggulan || clone(d.layanan.keunggulan),
    },
  };
}

export function readDraft() {
  try {
    const raw = localStorage.getItem(DRAFT_KEY);
    if (!raw) return null;
    const obj = JSON.parse(raw);
    return obj && obj.t ? obj : null;
  } catch (e) {
    return null;
  }
}

const Ctx = createContext({
  content: DEFAULT_CONTENT,
  fileBase: DEFAULT_CONTENT,
  setLive: () => {},
});

export function ContentProvider({ children }) {
  const [content, setContent] = useState(() => normalize(DEFAULT_CONTENT));
  const [fileBase, setFileBase] = useState(() => normalize(DEFAULT_CONTENT));

  useEffect(() => {
    let cancelled = false;
    fetch(`${BASE}/content.json`, { cache: 'no-store' })
      .then((r) => (r.ok ? r.json() : null))
      .catch(() => null)
      .then((json) => {
        if (cancelled) return;
        const base = normalize(json || DEFAULT_CONTENT);
        setFileBase(base);
        const draft = readDraft();
        setContent(draft ? normalize(draft) : base);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const setLive = useCallback((next) => {
    setContent(normalize(next));
  }, []);

  return <Ctx.Provider value={{ content, fileBase, setLive }}>{children}</Ctx.Provider>;
}

export function useContent() {
  return useContext(Ctx);
}
