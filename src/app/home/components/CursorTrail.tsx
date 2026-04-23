'use client';
import React, { useEffect, useRef } from 'react';

export default function CursorTrail() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.left = `${e.clientX}px`;
        dotRef.current.style.top = `${e.clientY}px`;
      }
    };

    const animate = () => {
      ring.current.x += (mouse.current.x - ring.current.x) * 0.12;
      ring.current.y += (mouse.current.y - ring.current.y) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.left = `${ring.current.x}px`;
        ringRef.current.style.top = `${ring.current.y}px`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    const onEnterHoverable = () => {
      ringRef.current?.classList.add('hovering');
    };
    const onLeaveHoverable = () => {
      ringRef.current?.classList.remove('hovering');
    };

    document.addEventListener('mousemove', onMove);
    rafRef.current = requestAnimationFrame(animate);

    const hoverables = document.querySelectorAll('a, button, [data-cursor-hover]');
    hoverables.forEach((el) => {
      el.addEventListener('mouseenter', onEnterHoverable);
      el.addEventListener('mouseleave', onLeaveHoverable);
    });

    return () => {
      document.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  );
}