import React from 'react';
import AppLogo from '@/components/ui/AppLogo';

export default function Footer() {
  return (
    <footer className="border-t border-gold/10 py-10 px-8">
      <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Logo */}
        <AppLogo size={28} text="ATELIER" className="text-ivory/60" />

        {/* Links */}
        <nav className="flex items-center gap-8">
          {[
            { label: 'Work', href: '#work' },
            { label: 'Process', href: '#process' },
            { label: 'Studio', href: '#studio' },
            { label: 'Privacy', href: '#' },
            { label: 'Terms', href: '#' },
          ]?.map((link) => (
            <a
              key={link?.label}
              href={link?.href}
              className="text-xs font-medium tracking-widest uppercase text-ivory/35 hover:text-ivory/80 transition-colors duration-300"
            >
              {link?.label}
            </a>
          ))}
        </nav>

        {/* Copyright */}
        <p className="text-xs text-ivory/25 tracking-wider">
          © 2026 Atelier Studio
        </p>
      </div>
    </footer>
  );
}