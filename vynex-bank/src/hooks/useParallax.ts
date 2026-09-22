import { useEffect, useRef } from 'react';
export function useParallax(disabled: boolean) {
  const pointer = useRef({ x: 0, y: 0 });
  useEffect(() => { if (disabled || !matchMedia('(pointer:fine)').matches) return;
    const update = (e: PointerEvent) => { pointer.current.x = e.clientX / innerWidth * 2 - 1; pointer.current.y = e.clientY / innerHeight * 2 - 1; };
    const reset = () => { pointer.current.x = pointer.current.y = 0; };
    window.addEventListener('pointermove', update, { passive: true }); document.addEventListener('pointerleave', reset);
    return () => { window.removeEventListener('pointermove', update); document.removeEventListener('pointerleave', reset); };
  }, [disabled]); return pointer;
}
