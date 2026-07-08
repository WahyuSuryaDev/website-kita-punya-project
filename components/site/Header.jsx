'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useContent, BASE } from '@/lib/content';

const NAV = [
  ['/', 'umum.nav-beranda'],
  ['/tentang/', 'umum.nav-tentang'],
  ['/layanan/', 'umum.nav-layanan'],
  ['/portofolio/', 'umum.nav-portofolio'],
  ['/kontak/', 'umum.nav-kontak'],
];

export default function Header() {
  const { content } = useContent();
  const t = content.t;
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  const isActive = (href) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href.replace(/\/$/, ''));

  return (
    <header className={`header${scrolled ? ' scrolled' : ''}${open ? ' open' : ''}`}>
      <div className="container nav">
        <Link className="nav-logo" href="/" aria-label="Kita Punya Project — Beranda">
          <img
            src={content.img.logo || `${BASE}/logo.png`}
            alt="Logo Kita Punya Project"
            width={720}
            height={179}
          />
        </Link>
        <nav className="nav-links" aria-label="Navigasi utama">
          {NAV.map(([href, key]) => (
            <Link key={href} href={href} className={isActive(href) ? 'active' : undefined}>
              <span>{t[key]}</span>
            </Link>
          ))}
        </nav>
        <div className="nav-cta">
          <Link className="btn btn-red" href="/kontak/">
            <span>{t['umum.nav-tombol']}</span>
          </Link>
          <button
            className="menu-btn"
            aria-label={open ? 'Tutup menu' : 'Buka menu'}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
      <nav className="mobile-nav" aria-label="Navigasi seluler">
        {NAV.map(([href, key]) => (
          <Link key={href} href={href} className={isActive(href) ? 'active' : undefined}>
            <span>{t[key]}</span>
          </Link>
        ))}
        <Link href="/kontak/">
          <span>{t['umum.nav-tombol']}</span>
        </Link>
      </nav>
    </header>
  );
}
