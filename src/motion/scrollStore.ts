// Module-level stores read inside the R3F render loop without triggering React
// re-renders. Lenis writes scroll; a window listener writes pointer.
export const scrollStore = { progress: 0 };

// Normalised pointer (-1..1) for 3D parallax, lazily smoothed in useFrame.
export const pointerStore = { x: 0, y: 0 };

let bound = false;
export function bindPointer() {
  if (bound || typeof window === 'undefined') return;
  bound = true;
  window.addEventListener(
    'pointermove',
    (e) => {
      pointerStore.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointerStore.y = (e.clientY / window.innerHeight) * 2 - 1;
    },
    { passive: true },
  );
}
