'use client';
import React, { useEffect, useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface ProcessDeckModalProps {
  onClose: () => void;
}

export default function ProcessDeckModal({ onClose }: ProcessDeckModalProps) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock submit — connect to email capture backend here
    setSubmitted(true);
  };

  return (
    <div
      className="fixed inset-0 z-[300] flex items-center justify-center px-6"
      style={{ background: 'rgba(11,11,15,0.92)', backdropFilter: 'blur(12px)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="relative bg-charcoal border border-gold/15 p-10 md:p-14 max-w-lg w-full"
        style={{ animation: 'formSlideIn 0.4s cubic-bezier(0.22,1,0.36,1) forwards' }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-ivory/30 hover:text-ivory transition-colors"
          aria-label="Close modal"
        >
          <Icon name="XMarkIcon" size={20} variant="outline" />
        </button>

        {!submitted ? (
          <>
            <p className="section-label mb-5">Process Deck</p>
            <h3
              className="font-display text-ivory mb-4"
              style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', fontWeight: 300 }}
            >
              Our methodology,<br />
              <em className="text-ivory/50">in your inbox.</em>
            </h3>
            <p className="text-ivory/40 text-sm font-sans leading-relaxed mb-8">
              A 28-page PDF covering our design philosophy, material sourcing
              process, past project outcomes, and the questions we ask before
              every commission.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs text-ivory/35 tracking-widest uppercase font-sans mb-2">
                  Your Email
                </label>
                <input
                  type="email"
                  className="gold-input w-full px-4 py-4 text-sm"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoFocus
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gold text-obsidian py-4 text-xs font-semibold tracking-widest uppercase hover:bg-gold/90 transition-all duration-300"
              >
                Send Me the Deck
              </button>
            </form>
            <p className="text-ivory/20 text-xs font-sans mt-5 text-center">
              No newsletters. One email, one PDF.
            </p>
          </>
        ) : (
          <div className="text-center py-8">
            <div className="w-px h-12 bg-gradient-to-b from-gold to-transparent mx-auto mb-8 opacity-60" />
            <h3 className="font-display text-ivory text-xl font-light mb-3">
              Check your inbox.
            </h3>
            <p className="text-ivory/40 text-sm font-sans">
              The deck is on its way to {email}.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}