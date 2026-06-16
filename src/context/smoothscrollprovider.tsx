'use client';

import { useEffect, type ReactNode } from 'react';
import Lenis from 'lenis';

/**
 * Wraps the page in Lenis-powered momentum scrolling and makes every
 * in-page `<a href="#...">` link glide to its target instead of
 * snapping. Respects `prefers-reduced-motion` by doing nothing at all.
 */
export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    let rafId = requestAnimationFrame(raf);

    function onClick(event: MouseEvent) {
      const anchor = (event.target as HTMLElement).closest('a[href^="#"]');
      if (!anchor) return;

      const hash = anchor.getAttribute('href');
      if (!hash || hash === '#') return;

      const target = document.querySelector(hash);
      if (!target) return;

      event.preventDefault();
      // Negative offset accounts for the floating, fixed-position nav.
      lenis.scrollTo(target as HTMLElement, { offset: -88 });
    }
    document.addEventListener('click', onClick);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener('click', onClick);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}