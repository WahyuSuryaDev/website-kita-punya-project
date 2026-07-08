'use client';

import { CAT_LABEL, CAT_SHORT } from '@/lib/content';
import Icon from '@/lib/icons';

export function Cover({ p, cta }) {
  const cls = p.img ? 'cover cv-img' : `cover ${p.cv || 'cv-red'}`;
  const style = p.img ? { backgroundImage: `url("${p.img}")` } : undefined;
  return (
    <div className={cls} style={style}>
      <span className="wc-tag">{CAT_LABEL[p.cat] || p.cat}</span>
      <h3 className="wc-title">{p.title}</h3>
      <span className="wc-year">’{String(p.year || '').slice(-2)}</span>
      {cta && <span className="wc-cta">Lihat Detail +</span>}
    </div>
  );
}

export function WorkInfo({ p }) {
  return (
    <div className="work-info">
      <span className="wi-meta">
        {CAT_SHORT[p.cat] || p.cat} • {p.year}
      </span>
      <Icon name="arrow" stroke={2.2} />
    </div>
  );
}
