import { useEffect } from 'react';

// Magnetic pull: any [data-magnetic] element eases toward the cursor when near.
export function useMagnetic() {
  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let raf = 0;
    let mx = -9999, my = -9999;

    const tick = () => {
      const els = document.querySelectorAll<HTMLElement>('[data-magnetic]');
      els.forEach(el => {
        const r = el.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const dx = mx - cx, dy = my - cy;
        const dist = Math.hypot(dx, dy);
        const radius = Math.max(r.width, r.height) * 0.9 + 60;
        if (dist < radius) {
          const f = 1 - dist / radius;
          el.style.transform = `translate(${dx * 0.35 * f}px, ${dy * 0.35 * f}px)`;
        } else if (el.style.transform) {
          el.style.transform = '';
        }
      });
      raf = requestAnimationFrame(tick);
    };
    const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; };
    window.addEventListener('mousemove', onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('mousemove', onMove); };
  }, []);
}

// Subtle scroll parallax on section titles.
export function useTitleParallax() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let ticking = false;
    const update = () => {
      const vh = window.innerHeight;
      document.querySelectorAll<HTMLElement>('.sec-title').forEach(el => {
        const r = el.getBoundingClientRect();
        const off = (r.top + r.height / 2) - vh / 2;
        el.style.transform = `translateY(${off * -0.05}px)`;
      });
      ticking = false;
    };
    const onScroll = () => { if (!ticking) { requestAnimationFrame(update); ticking = true; } };
    window.addEventListener('scroll', onScroll, { passive: true });
    update();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
}
