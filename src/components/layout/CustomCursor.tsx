'use client';

import { useEffect, useRef, useState } from 'react';

export function CustomCursor() {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const frameId = requestAnimationFrame(() => setVisible(true));

    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      // Directly set transform — fastest possible update, no React re-render
      if (outerRef.current) {
        outerRef.current.style.transform = `translate(calc(${x}px - 50%), calc(${y}px - 50%))`;
      }
      if (innerRef.current) {
        innerRef.current.style.transform = `translate(calc(${x}px - 50%), calc(${y}px - 50%))`;
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, [role="button"], input, textarea, select, [data-cursor-hover]')) {
        setHovering(true);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, [role="button"], input, textarea, select, [data-cursor-hover]')) {
        setHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseover', handleMouseOver, { passive: true });
    document.addEventListener('mouseout', handleMouseOut, { passive: true });

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  if (!visible) return null;

  return (
    <>
      {/* Outer ring */}
      <div
        ref={outerRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full border-2 mix-blend-difference"
        style={{
          width: hovering ? 48 : 32,
          height: hovering ? 48 : 32,
          borderColor: 'var(--sunset-1)',
          transition: 'width 0.2s ease, height 0.2s ease',
          willChange: 'transform',
        }}
      />

      {/* Inner dot */}
      <div
        ref={innerRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full"
        style={{
          width: hovering ? 0 : 8,
          height: hovering ? 0 : 8,
          backgroundColor: 'var(--sunset-1)',
          opacity: hovering ? 0 : 1,
          transition: 'width 0.2s ease, height 0.2s ease, opacity 0.2s ease',
          willChange: 'transform',
        }}
      />
    </>
  );
}
