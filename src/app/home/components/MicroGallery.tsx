'use client';
import React, { useEffect, useState, useCallback } from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface Project {
  id: number;
  name: string;
  location: string;
  scope: string;
  year: string;
  images: string[];
  tag: string;
}

interface MicroGalleryProps {
  project: Project;
  onClose: () => void;
}

export default function MicroGallery({ project, onClose }: MicroGalleryProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [parallaxOffset, setParallaxOffset] = useState({ x: 0, y: 0 });

  // Mouse parallax
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 12;
      setParallaxOffset({ x, y });
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  // Keyboard navigation
  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') setActiveIdx((i) => (i + 1) % project.images.length);
      if (e.key === 'ArrowLeft') setActiveIdx((i) => (i - 1 + project.images.length) % project.images.length);
    },
    [onClose, project.images.length]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [handleKey]);

  return (
    <div
      className="gallery-overlay fixed inset-0 z-[200] bg-obsidian/97 backdrop-blur-sm flex flex-col"
      role="dialog"
      aria-modal="true"
      aria-label={`${project.name} gallery`}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-10 py-6 border-b border-gold/10">
        <div>
          <h3 className="font-display text-ivory text-xl font-light">{project.name}</h3>
          <p className="text-gold text-xs tracking-widest uppercase font-sans mt-0.5">
            {project.location} · {project.scope}
          </p>
        </div>
        <div className="flex items-center gap-6">
          <span className="text-ivory/30 text-xs font-sans tracking-widest">
            {activeIdx + 1} / {project.images.length}
          </span>
          <button
            onClick={onClose}
            className="text-ivory/50 hover:text-ivory transition-colors p-2"
            aria-label="Close gallery"
          >
            <Icon name="XMarkIcon" size={22} variant="outline" />
          </button>
        </div>
      </div>

      {/* Main image with parallax */}
      <div className="flex-1 relative overflow-hidden">
        <div
          className="absolute inset-[-30px] transition-transform duration-300 ease-out"
          style={{
            transform: `translate(${parallaxOffset.x}px, ${parallaxOffset.y}px)`,
          }}
        >
          <AppImage
            src={project.images[activeIdx]}
            alt={`${project.name} interior view ${activeIdx + 1}`}
            fill
            className="object-cover gallery-image-pan"
            priority
          />
        </div>

        {/* Gradient vignette */}
        <div
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 40%, rgba(11,11,15,0.5) 100%)',
          }}
        />

        {/* Navigation arrows */}
        <button
          onClick={() => setActiveIdx((i) => (i - 1 + project.images.length) % project.images.length)}
          className="absolute left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 border border-gold/20 flex items-center justify-center text-ivory/60 hover:text-gold hover:border-gold/60 transition-all duration-300 bg-obsidian/40 backdrop-blur-sm"
          aria-label="Previous image"
        >
          <Icon name="ChevronLeftIcon" size={20} variant="outline" />
        </button>
        <button
          onClick={() => setActiveIdx((i) => (i + 1) % project.images.length)}
          className="absolute right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 border border-gold/20 flex items-center justify-center text-ivory/60 hover:text-gold hover:border-gold/60 transition-all duration-300 bg-obsidian/40 backdrop-blur-sm"
          aria-label="Next image"
        >
          <Icon name="ChevronRightIcon" size={20} variant="outline" />
        </button>
      </div>

      {/* Thumbnails */}
      <div className="flex items-center gap-3 px-10 py-5 border-t border-gold/10">
        {project.images.map((img, i) => (
          <button
            key={i}
            onClick={() => setActiveIdx(i)}
            className={`relative w-16 h-10 overflow-hidden transition-all duration-300 ${
              i === activeIdx ? 'ring-1 ring-gold opacity-100' : 'opacity-40 hover:opacity-70'
            }`}
            aria-label={`View image ${i + 1}`}
          >
            <AppImage
              src={img}
              alt={`${project.name} thumbnail ${i + 1}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
        <span className="ml-auto text-ivory/25 text-xs font-sans tracking-wider hidden md:block">
          ← → to navigate · Esc to close
        </span>
      </div>
    </div>
  );
}