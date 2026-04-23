'use client';
import React, { useEffect, useRef, useState } from 'react';

export default function HeroSection() {
  const [wordmarkVisible, setWordmarkVisible] = useState(false);
  const [subVisible, setSubVisible] = useState(false);
  const [scrollVisible, setScrollVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Staggered entrance
    const t1 = setTimeout(() => setWordmarkVisible(true), 1200);
    const t2 = setTimeout(() => setSubVisible(true), 2200);
    const t3 = setTimeout(() => setScrollVisible(true), 3000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  // Parallax on scroll
  useEffect(() => {
    const onScroll = () => {
      if (!sectionRef.current) return;
      const scrollY = window.scrollY;
      const overlay = sectionRef.current.querySelector('.hero-parallax-content') as HTMLElement;
      if (overlay) {
        overlay.style.transform = `translateY(${scrollY * 0.35}px)`;
        overlay.style.opacity = `${Math.max(0, 1 - scrollY / 600)}`;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative w-full h-screen min-h-screen overflow-hidden flex items-end"
    >
      {/* Cinematic video background */}
      <div className="absolute inset-0 z-0">
        {/* Fallback: high-quality hotel lobby image while video loads */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=1920&q=80')`,
          }}
          aria-hidden="true"
        />
        {/* Video layer */}
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster="https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=1920&q=80"
          aria-hidden="true"
        >
          <source
            src="https://assets.mixkit.co/videos/preview/mixkit-hotel-corridor-with-a-person-walking-away-43514-large.mp4"
            type="video/mp4"
          />
        </video>

        {/* Multi-layer cinematic overlay */}
        <div className="hero-video-overlay absolute inset-0 z-10" />

        {/* Ambient gold glow — lower left */}
        <div
          className="ambient-glow absolute bottom-0 left-0 w-[600px] h-[400px] z-10"
          style={{ background: 'radial-gradient(ellipse, rgba(201,168,76,0.06) 0%, transparent 70%)' }}
        />
      </div>

      {/* Wordmark — centered, fades in at midpoint */}
      <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
        <div
          className="text-center hero-parallax-content"
          style={{ willChange: 'transform, opacity' }}
        >
          <h1
            className="font-display text-ivory"
            style={{
              fontSize: 'clamp(3.5rem, 10vw, 9rem)',
              fontWeight: 300,
              letterSpacing: wordmarkVisible ? '0.25em' : '0.6em',
              opacity: wordmarkVisible ? 1 : 0,
              transition: 'opacity 1.6s cubic-bezier(0.22,1,0.36,1), letter-spacing 2s cubic-bezier(0.22,1,0.36,1)',
              textTransform: 'uppercase',
            }}
          >
            Atelier
          </h1>

          <p
            className="font-sans text-xs tracking-[0.4em] uppercase mt-4"
            style={{
              color: 'var(--gold)',
              opacity: subVisible ? 0.75 : 0,
              transform: subVisible ? 'translateY(0)' : 'translateY(10px)',
              transition: 'opacity 1.2s ease, transform 1.2s ease',
            }}
          >
            Hospitality Interiors
          </p>
        </div>
      </div>

      {/* Bottom content — location tag + scroll */}
      <div className="relative z-30 w-full px-10 md:px-16 pb-12 flex items-end justify-between">
        {/* Location tags */}
        <div
          style={{
            opacity: subVisible ? 1 : 0,
            transform: subVisible ? 'translateY(0)' : 'translateY(12px)',
            transition: 'opacity 1s ease 0.3s, transform 1s ease 0.3s',
          }}
        >
          <p className="section-label mb-2">Selected Works</p>
          <p className="font-display italic text-ivory/50 text-sm">
            Dubai · Tokyo · Tulum · Lisbon
          </p>
        </div>

        {/* Scroll prompt */}
        <div
          className="flex flex-col items-center gap-3"
          style={{
            opacity: scrollVisible ? 1 : 0,
            transition: 'opacity 1s ease',
          }}
          aria-label="Scroll to explore"
        >
          <span className="section-label" style={{ writingMode: 'vertical-rl', letterSpacing: '0.25em' }}>
            Scroll
          </span>
          <div
            className="w-px h-14"
            style={{
              background: 'linear-gradient(to bottom, rgba(201,168,76,0.6), transparent)',
              animation: 'scrollPrompt 2s ease-in-out infinite',
            }}
          />
        </div>
      </div>
    </section>
  );
}