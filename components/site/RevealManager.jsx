'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/* Mengamati elemen .reveal dan menambahkan .in saat masuk viewport */
export default function RevealManager() {
  const pathname = usePathname();

  useEffect(() => {
    const els = Array.from(document.querySelectorAll('.reveal:not(.in)'));
    els.forEach((el) => {
      const d = el.getAttribute('data-d');
      if (d) el.style.transitionDelay = `${d}ms`;
    });
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('in'));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
