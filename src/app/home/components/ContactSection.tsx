'use client';
import React, { useState, useEffect, useRef } from 'react';
import ProcessDeckModal from './ProcessDeckModal';

type FormStep = 1 | 2 | 3 | 4;

interface FormData {
  propertyName: string;
  location: string;
  stage: string;
  timeline: string;
  budget: string;
  brief: File | null;
}

const stages = ['Concept & Vision', 'Active Renovation', 'New Build', 'Brand Relaunch'];
const timelines = ['Within 3 months', '3–6 months', '6–12 months', 'Exploring options'];
const budgets = ['Under $500K', '$500K – $1.5M', '$1.5M – $5M', '$5M+'];

export default function ContactSection() {
  const [step, setStep] = useState<FormStep>(1);
  const [formData, setFormData] = useState<FormData>({
    propertyName: '',
    location: '',
    stage: '',
    timeline: '',
    budget: '',
    brief: null,
  });
  const [submitted, setSubmitted] = useState(false);
  const [deckModalOpen, setDeckModalOpen] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 }
    );
    const revealEls = sectionRef.current?.querySelectorAll('.reveal-up, .reveal-left');
    revealEls?.forEach((el) => observer.observe(el));

    const rules = sectionRef.current?.querySelectorAll('.gold-rule');
    const ruleObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) (e.target as HTMLElement).classList.add('drawn');
        });
      },
      { threshold: 0.5 }
    );
    rules?.forEach((r) => ruleObserver.observe(r));

    return () => { observer.disconnect(); ruleObserver.disconnect(); };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 4) {
      setStep((s) => (s + 1) as FormStep);
    } else {
      // Mock submit handler — connect to backend/CRM here
      setSubmitted(true);
    }
  };

  const progressWidth = `${(step / 4) * 100}%`;

  return (
    <section id="contact" className="relative bg-charcoal/20 py-32" ref={sectionRef}>
      {/* Ambient glow */}
      <div
        className="ambient-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px]"
        style={{ background: 'radial-gradient(ellipse, rgba(201,168,76,0.05) 0%, transparent 70%)' }}
      />

      <div className="max-w-screen-xl mx-auto px-10 md:px-16 relative z-10">
        <div className="gold-rule w-full mb-20" />

        <div className="grid md:grid-cols-5 gap-16 items-start">
          {/* Left: 40% — copy */}
          <div className="md:col-span-2 reveal-left">
            <p className="section-label mb-5">Commission</p>
            <h2
              className="font-display text-ivory mb-6"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 300, lineHeight: 1.15 }}
            >
              Start a<br />
              <em className="text-ivory/50 font-light">Conversation.</em>
            </h2>
            <p className="text-ivory/45 text-sm font-sans leading-relaxed mb-10">
              We take on six to eight projects per year. Each begins with a
              conversation about what you want your guests to feel — before we
              talk about budgets, timelines, or tile samples.
            </p>

            {/* Stats */}
            <div className="space-y-5">
              {[
                { label: 'Response time', value: '24 hours' },
                { label: 'Initial consultation', value: 'No charge' },
                { label: 'Projects per year', value: '6–8 only' },
              ].map((stat) => (
                <div key={stat.label} className="flex items-center justify-between border-b border-gold/10 pb-4">
                  <span className="text-ivory/40 text-xs font-sans tracking-wider uppercase">{stat.label}</span>
                  <span className="text-ivory text-sm font-display">{stat.value}</span>
                </div>
              ))}
            </div>

            {/* Secondary CTA */}
            <div className="mt-12 p-6 border border-gold/15 bg-gold/[0.03]">
              <p className="text-ivory/60 text-sm font-sans leading-relaxed mb-4">
                Not ready to commission? Our Process Deck walks you through
                our methodology, material philosophy, and past project outcomes.
              </p>
              <button
                onClick={() => setDeckModalOpen(true)}
                className="inline-flex items-center gap-3 text-xs tracking-widest uppercase text-gold font-sans group"
                data-cursor-hover
              >
                <span>Download Process Deck</span>
                <span className="block h-px w-6 bg-gold transition-all duration-500 group-hover:w-10" />
              </button>
            </div>
          </div>

          {/* Right: 60% — progressive form */}
          <div className="md:col-span-3 reveal-up">
            {!submitted ? (
              <div>
                {/* Progress bar */}
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs text-ivory/30 font-sans tracking-widest uppercase">
                    Step {step} of 4
                  </p>
                  <p className="text-xs text-gold/60 font-sans">
                    {step === 1 && 'Your Property'}
                    {step === 2 && 'Project Stage'}
                    {step === 3 && 'Timeline & Budget'}
                    {step === 4 && 'Brief Upload'}
                  </p>
                </div>
                <div className="w-full h-px bg-gold/10 mb-10 relative overflow-hidden">
                  <div
                    className="absolute top-0 left-0 h-full bg-gold transition-all duration-700 ease-out"
                    style={{ width: progressWidth }}
                  />
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Step 1: Property name & location */}
                  {step === 1 && (
                    <div className="space-y-5" style={{ animation: 'formSlideIn 0.4s ease forwards' }}>
                      <div>
                        <label className="block text-xs text-ivory/40 tracking-widest uppercase font-sans mb-2">
                          Property Name
                        </label>
                        <input
                          type="text"
                          className="gold-input w-full px-4 py-4 text-sm"
                          placeholder="The Grand Meridian"
                          value={formData.propertyName}
                          onChange={(e) => setFormData((p) => ({ ...p, propertyName: e.target.value }))}
                          required
                          autoFocus
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-ivory/40 tracking-widest uppercase font-sans mb-2">
                          Location
                        </label>
                        <input
                          type="text"
                          className="gold-input w-full px-4 py-4 text-sm"
                          placeholder="City, Country"
                          value={formData.location}
                          onChange={(e) => setFormData((p) => ({ ...p, location: e.target.value }))}
                          required
                        />
                      </div>
                    </div>
                  )}

                  {/* Step 2: Project stage */}
                  {step === 2 && (
                    <div style={{ animation: 'formSlideIn 0.4s ease forwards' }}>
                      <label className="block text-xs text-ivory/40 tracking-widest uppercase font-sans mb-4">
                        Project Stage
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        {stages.map((s) => (
                          <button
                            key={s}
                            type="button"
                            onClick={() => setFormData((p) => ({ ...p, stage: s }))}
                            className={`px-4 py-4 text-sm font-sans text-left border transition-all duration-300 ${
                              formData.stage === s
                                ? 'border-gold bg-gold/10 text-gold' :'border-gold/15 text-ivory/50 hover:border-gold/40 hover:text-ivory/80'
                            }`}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Step 3: Timeline & budget */}
                  {step === 3 && (
                    <div className="space-y-8" style={{ animation: 'formSlideIn 0.4s ease forwards' }}>
                      <div>
                        <label className="block text-xs text-ivory/40 tracking-widest uppercase font-sans mb-4">
                          Preferred Timeline
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                          {timelines.map((t) => (
                            <button
                              key={t}
                              type="button"
                              onClick={() => setFormData((p) => ({ ...p, timeline: t }))}
                              className={`px-4 py-3 text-sm font-sans text-left border transition-all duration-300 ${
                                formData.timeline === t
                                  ? 'border-gold bg-gold/10 text-gold' :'border-gold/15 text-ivory/50 hover:border-gold/40 hover:text-ivory/80'
                              }`}
                            >
                              {t}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs text-ivory/40 tracking-widest uppercase font-sans mb-4">
                          Design Budget Range
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                          {budgets.map((b) => (
                            <button
                              key={b}
                              type="button"
                              onClick={() => setFormData((p) => ({ ...p, budget: b }))}
                              className={`px-4 py-3 text-sm font-sans text-left border transition-all duration-300 ${
                                formData.budget === b
                                  ? 'border-gold bg-gold/10 text-gold' :'border-gold/15 text-ivory/50 hover:border-gold/40 hover:text-ivory/80'
                              }`}
                            >
                              {b}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 4: Brief upload */}
                  {step === 4 && (
                    <div style={{ animation: 'formSlideIn 0.4s ease forwards' }}>
                      <label className="block text-xs text-ivory/40 tracking-widest uppercase font-sans mb-2">
                        Brief or Inspiration File{' '}
                        <span className="text-ivory/25 normal-case tracking-normal">(optional)</span>
                      </label>
                      <div className="border border-dashed border-gold/20 p-10 text-center hover:border-gold/40 transition-colors duration-300">
                        <input
                          type="file"
                          id="brief-upload"
                          className="hidden"
                          accept=".pdf,.doc,.docx,.ppt,.pptx,.jpg,.png"
                          onChange={(e) =>
                            setFormData((p) => ({ ...p, brief: e.target.files?.[0] || null }))
                          }
                        />
                        <label htmlFor="brief-upload" className="cursor-pointer">
                          {formData.brief ? (
                            <p className="text-gold text-sm font-sans">{formData.brief.name}</p>
                          ) : (
                            <>
                              <p className="text-ivory/40 text-sm font-sans mb-2">
                                Drop a PDF, deck, or mood board
                              </p>
                              <p className="text-ivory/25 text-xs font-sans">
                                PDF, DOC, PPT, JPG · Max 20MB
                              </p>
                            </>
                          )}
                        </label>
                      </div>
                      <p className="text-ivory/30 text-xs font-sans mt-4 leading-relaxed">
                        No brief? No problem. Many of our best projects began
                        with nothing more than &ldquo;I want guests to feel like
                        they&rsquo;ve arrived somewhere.&rdquo;
                      </p>
                    </div>
                  )}

                  {/* Navigation */}
                  <div className="flex items-center justify-between pt-4">
                    {step > 1 ? (
                      <button
                        type="button"
                        onClick={() => setStep((s) => (s - 1) as FormStep)}
                        className="text-xs tracking-widest uppercase text-ivory/30 hover:text-ivory/60 font-sans transition-colors duration-300"
                      >
                        ← Back
                      </button>
                    ) : (
                      <span />
                    )}
                    <button
                      type="submit"
                      className="inline-flex items-center gap-3 bg-gold text-obsidian px-10 py-4 text-xs font-semibold tracking-widest uppercase hover:bg-gold/90 transition-all duration-300"
                      style={{ animation: 'goldPulse 3s ease-in-out infinite' }}
                    >
                      {step < 4 ? 'Continue' : 'Send Enquiry'}
                      <span className="block w-4 h-px bg-obsidian" />
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              /* Success state */
              <div
                className="text-center py-20"
                style={{ animation: 'formSlideIn 0.6s ease forwards' }}
              >
                <div className="w-px h-20 bg-gradient-to-b from-gold to-transparent mx-auto mb-10 opacity-60" />
                <h3
                  className="font-display text-ivory mb-4"
                  style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', fontWeight: 300 }}
                >
                  We&rsquo;ll be in touch.
                </h3>
                <p className="text-ivory/45 text-sm font-sans leading-relaxed max-w-sm mx-auto">
                  Expect a reply from our studio within 24 hours. In the meantime,
                  explore the work — and imagine what we could do with your property.
                </p>
                <div className="w-px h-20 bg-gradient-to-t from-gold to-transparent mx-auto mt-10 opacity-60" />
              </div>
            )}
          </div>
        </div>

        <div className="gold-rule w-full mt-20" />
      </div>

      {/* Process Deck Modal */}
      {deckModalOpen && (
        <ProcessDeckModal onClose={() => setDeckModalOpen(false)} />
      )}
    </section>
  );
}