import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { scrollStore } from './scrollStore';

// Module-level handle so non-hook code (e.g. the global nav-click handler)
// can drive the active Lenis instance.
let instance: Lenis | null = null;
export function getLenis(): Lenis | null { return instance; }

export function useLenis() {
  const lenisRef = useRef<Lenis | null>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.3,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
      smoothWheel: true,
    });

    lenisRef.current = lenis;
    instance = lenis;

    lenis.on('scroll', (e: { progress: number }) => {
      scrollStore.progress = e.progress;
    });

    const raf = (time: number) => {
      lenis.raf(time);
      rafRef.current = requestAnimationFrame(raf);
    };
    rafRef.current = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafRef.current);
      lenis.destroy();
      if (instance === lenis) instance = null;
    };
  }, []);

  return { lenisRef };
}
