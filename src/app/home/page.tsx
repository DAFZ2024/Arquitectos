import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from './components/HeroSection';
import ProjectGrid from './components/ProjectGrid';
import ProcessSection from './components/ProcessSection';
import TestimonialsSection from './components/TestimonialsSection';
import ContactSection from './components/ContactSection';
import CursorTrail from './components/CursorTrail';
import StickyCta from './components/StickyCta';

export default function HomePage() {
  return (
    <main className="relative bg-obsidian min-h-screen overflow-x-hidden">
      {/* Noise texture overlay */}
      <div className="noise-overlay" aria-hidden="true" />

      {/* Custom cursor */}
      <CursorTrail />

      {/* Navigation */}
      <Header />

      {/* Sections */}
      <HeroSection />
      <ProjectGrid />
      <ProcessSection />
      <TestimonialsSection />
      <ContactSection />

      {/* Sticky CTA (appears after 2nd project) */}
      <StickyCta />

      <Footer />
    </main>
  );
}