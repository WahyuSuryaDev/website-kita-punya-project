'use client';

import Link from 'next/link';
import { useContent } from '@/lib/content';

export default function Footer() {
  const { content } = useContent();
  const t = content.t;
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="wordmark" aria-label="Kita Punya Project">
              <span className="wm-top">{t['umum.wordmark-atas']}</span>
              <span className="wm-bot">
                <span>{t['umum.wordmark-bawah']}</span>
                <b className="dot">.</b>
              </span>
            </div>
            <p className="footer-tagline">{t['footer.tagline']}</p>
          </div>
          <div className="footer-col">
            <h5>Navigasi</h5>
            <Link href="/">{t['umum.nav-beranda']}</Link>
            <Link href="/tentang/">{t['umum.nav-tentang']}</Link>
            <Link href="/layanan/">{t['umum.nav-layanan']}</Link>
            <Link href="/portofolio/">{t['umum.nav-portofolio']}</Link>
            <Link href="/kontak/">{t['umum.nav-kontak']}</Link>
          </div>
          <div className="footer-col">
            <h5>Layanan</h5>
            {content.layanan.sm.items.slice(0, 4).map((it, i) => (
              <Link key={i} href="/layanan/">
                {it.judul}
              </Link>
            ))}
            <Link href="/layanan/">Event Activation</Link>
          </div>
        </div>
        <div className="footer-bottom">
          <p>
            <i></i>&copy; {year} <span>{t['footer.copyright']}</span>
          </p>
          <p>{t['footer.moto']}</p>
        </div>
      </div>
    </footer>
  );
}
