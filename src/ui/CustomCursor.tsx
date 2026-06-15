import { useEffect, useRef } from 'react';
import './CustomCursor.css';

const INTERACTIVE = 'a, button, [role="button"], [data-cursor], input, textarea, label';

export function CustomCursor() {
  const dotRef   = useRef<HTMLDivElement>(null);
  const ringRef  = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;

    let mx = -100, my = -100, rx = -100, ry = -100, raf = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY;
      const target = e.target as Element;
      const hit = target?.closest?.(INTERACTIVE) as HTMLElement | null;
      const labelEl = target?.closest?.('[data-cursor]') as HTMLElement | null;
      const label = labelEl?.dataset.cursor;

      ringRef.current?.classList.toggle('expanded', !!hit);
      dotRef.current?.classList.toggle('hidden', !!hit);

      if (labelRef.current) {
        if (label) {
          labelRef.current.textContent = label;
          labelRef.current.classList.add('show');
          ringRef.current?.classList.add('labeled');
        } else {
          labelRef.current.classList.remove('show');
          ringRef.current?.classList.remove('labeled');
        }
      }
    };

    const loop = () => {
      if (dotRef.current) dotRef.current.style.transform = `translate(${mx}px, ${my}px)`;
      rx += (mx - rx) * 0.18; ry += (my - ry) * 0.18;
      if (ringRef.current) ringRef.current.style.transform = `translate(${rx}px, ${ry}px)`;
      if (labelRef.current) { labelRef.current.style.left = `${rx}px`; labelRef.current.style.top = `${ry}px`; }
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('mousemove', onMove); };
  }, []);

  if (typeof window !== 'undefined' && !window.matchMedia?.('(pointer: fine)').matches) return null;

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
      <div ref={labelRef} className="cursor-label" />
    </>
  );
}
