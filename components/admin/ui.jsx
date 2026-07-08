'use client';

import Icon, { ICON_CHOICES } from '@/lib/icons';

/* Label otomatis dari kunci: "beranda.hero-judul-1" -> "Hero judul 1" */
export function labelFor(key) {
  const s = key.split('.').slice(1).join('.').replace(/-/g, ' ');
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export function TextField({ label, value, onChange, hint, long }) {
  const isLong = long != null ? long : String(value || '').length > 72;
  return (
    <div className={`adm-field${isLong ? ' full' : ''}`}>
      <label>
        {label} {hint && <small>— {hint}</small>}
      </label>
      {isLong ? (
        <textarea value={value || ''} onChange={(e) => onChange(e.target.value)} />
      ) : (
        <input type="text" value={value || ''} onChange={(e) => onChange(e.target.value)} />
      )}
    </div>
  );
}

/* Kartu berisi field otomatis untuk sekelompok kunci teks */
export function TextSection({ title, hint, keys, t, onChange }) {
  if (!keys.length) return null;
  return (
    <div className="adm-sec">
      <h3>{title}</h3>
      {hint && <p className="adm-hint">{hint}</p>}
      <div className="adm-grid">
        {keys.map((k) => (
          <TextField key={k} label={labelFor(k)} value={t[k]} onChange={(v) => onChange(k, v)} />
        ))}
      </div>
    </div>
  );
}

export function IconSelect({ value, onChange }) {
  return (
    <div className="adm-field">
      <label>Ikon</label>
      <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
        <span
          style={{
            width: 38,
            height: 38,
            borderRadius: 10,
            background: 'var(--red-soft)',
            color: 'var(--red)',
            display: 'grid',
            placeItems: 'center',
            flex: 'none',
          }}
        >
          <Icon name={value} size={19} />
        </span>
        <select value={value || 'spark'} onChange={(e) => onChange(e.target.value)} style={{ flex: 1 }}>
          {ICON_CHOICES.map(([v, l]) => (
            <option key={v} value={v}>
              {l}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

/* Editor daftar generik: naik/turun/duplikat/hapus/tambah */
export function ListEditor({ title, hint, items, onChange, fields, titleOf, template, addLabel }) {
  const move = (i, dir) => {
    const next = [...items];
    const j = i + dir;
    if (j < 0 || j >= next.length) return;
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  };
  const setItem = (i, prop, val) => {
    const next = items.map((it, idx) => (idx === i ? { ...it, [prop]: val } : it));
    onChange(next);
  };

  return (
    <div className="adm-sec">
      <h3>
        {title} ({items.length})
      </h3>
      {hint && <p className="adm-hint">{hint}</p>}
      {items.map((it, i) => (
        <details className="adm-list-item" key={i}>
          <summary>
            <span className="num">{String(i + 1).padStart(2, '0')}</span>
            {titleOf(it) || '(tanpa judul)'}
          </summary>
          <div className="adm-list-body">
            <div className="adm-grid">
              {fields.map((f) =>
                f.type === 'icon' ? (
                  <IconSelect key={f.prop} value={it[f.prop]} onChange={(v) => setItem(i, f.prop, v)} />
                ) : (
                  <TextField
                    key={f.prop}
                    label={f.label}
                    hint={f.hint}
                    long={f.type === 'textarea'}
                    value={it[f.prop]}
                    onChange={(v) => setItem(i, f.prop, v)}
                  />
                )
              )}
            </div>
            <div className="adm-proj-tools">
              <button className="adm-mini" onClick={() => move(i, -1)}>↑ Naik</button>
              <button className="adm-mini" onClick={() => move(i, 1)}>↓ Turun</button>
              <button className="adm-mini" onClick={() => onChange([...items.slice(0, i + 1), JSON.parse(JSON.stringify(it)), ...items.slice(i + 1)])}>
                Duplikat
              </button>
              <button
                className="adm-mini danger"
                onClick={() => {
                  if (confirm('Hapus item ini?')) onChange(items.filter((_, idx) => idx !== i));
                }}
              >
                Hapus
              </button>
            </div>
          </div>
        </details>
      ))}
      <button className="adm-add" onClick={() => onChange([...items, JSON.parse(JSON.stringify(template))])}>
        + {addLabel || 'Tambah Item'}
      </button>
    </div>
  );
}

/* Editor daftar teks pendek berbentuk chip */
export function ChipsEditor({ title, hint, items, onChange, placeholder }) {
  return (
    <div className="adm-sec">
      <h3>
        {title} ({items.length})
      </h3>
      {hint && <p className="adm-hint">{hint}</p>}
      <div className="adm-chip-editor">
        {items.map((c, i) => (
          <span className="adm-chip" key={i}>
            {c}
            <button aria-label={`Hapus ${c}`} onClick={() => onChange(items.filter((_, idx) => idx !== i))}>
              ×
            </button>
          </span>
        ))}
      </div>
      <form
        className="adm-chip-add"
        onSubmit={(e) => {
          e.preventDefault();
          const input = e.currentTarget.querySelector('input');
          const val = input.value.trim();
          if (val) onChange([...items, val]);
          input.value = '';
        }}
      >
        <input type="text" placeholder={placeholder || 'Tulis lalu tekan Enter…'} />
        <button className="adm-mini" type="submit">Tambah</button>
      </form>
    </div>
  );
}

/* Perkecil gambar via canvas, kembalikan data URL */
export function processImage(file, maxW, cb) {
  const reader = new FileReader();
  reader.onload = () => {
    const raw = reader.result;
    if (file.type === 'image/png' && file.size < 250000) return cb(raw);
    const im = new Image();
    im.onload = () => {
      const scale = Math.min(1, maxW / im.width);
      const cv = document.createElement('canvas');
      cv.width = Math.round(im.width * scale);
      cv.height = Math.round(im.height * scale);
      cv.getContext('2d').drawImage(im, 0, 0, cv.width, cv.height);
      cb(file.type === 'image/png' ? cv.toDataURL('image/png') : cv.toDataURL('image/jpeg', 0.85));
    };
    im.src = raw;
  };
  reader.readAsDataURL(file);
}
