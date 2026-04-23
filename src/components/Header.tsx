'use client';
import React, { useEffect, useState } from 'react';
import AppLogo from '@/components/ui/AppLogo';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ${
        scrolled
          ? 'bg-obsidian/80 backdrop-blur-md border-b border-gold/10' :'bg-transparent'
      }`}
    >
      <div className="max-w-screen-xl mx-auto px-8 py-5 flex items-center justify-between">
        {/* Logo / Wordmark */}
        <a
          href="#"
          className="flex items-center gap-3 group"
          aria-label="Atelier home"
        >
          <AppLogo
            size={32}
            text="ATELIER"
            className="text-ivory"
          />
        </a>

        {/* Nav links */}
        <nav className="hidden md:flex items-center gap-10">
          {['Work', 'Process', 'Studio']?.map((item) => (
            <a
              key={item}
              href={`#${item?.toLowerCase()}`}
              className="text-xs font-medium tracking-widest uppercase text-ivory/50 hover:text-ivory transition-colors duration-300"
            >
              {item}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <a
          href="#contact"
          className="hidden md:inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-gold border border-gold/30 px-6 py-3 hover:bg-gold/10 hover:border-gold/60 transition-all duration-300"
        >
          Start a Conversation
        </a>
      </div>
    </header>
  );
}