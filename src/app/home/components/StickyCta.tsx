'use client';
import React, { useEffect, useState } from 'react';

export default function StickyCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // Show after user has scrolled past ~150vh (past 2nd project card area)
      if (window.scrollY > window.innerHeight * 1.5) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <a
      href="#contact"
      className="sticky-cta fixed bottom-8 right-8 z-[100] flex items-center gap-3 bg-gold text-obsidian px-7 py-4 text-xs font-semibold tracking-widest uppercase shadow-2xl hover:bg-gold/90 transition-all duration-300 group"
      style={{
        boxShadow: '0 8px 40px rgba(201,168,76,0.25)',
      }}
      data-cursor-hover
      aria-label="Start a conversation with Atelier"
    >
      <span>Start a Conversation</span>
      <span
        className="block h-px w-4 bg-obsidian transition-all duration-500 group-hover:w-6"
      />
    </a>
  );
}