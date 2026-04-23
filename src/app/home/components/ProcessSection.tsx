'use client';
import React, { useEffect, useRef } from 'react';
import AppImage from '@/components/ui/AppImage';

const steps = [
{
  number: '01',
  title: 'Discovery & Vision',
  description:
  'We begin before the brief. A site visit, a conversation about the guest you want to attract, the story your property will tell. We read the bones of the building and listen for what wants to be there.',
  detail: '2–3 weeks'
},
{
  number: '02',
  title: 'Concept & Rendering',
  description:
  'Mood boards give way to investor-grade renderings — photorealistic, atmospheric, persuasive. Every material, light source, and spatial proportion resolved on screen before a single tile is ordered.',
  detail: '4–6 weeks'
},
{
  number: '03',
  title: 'Material & Sourcing',
  description:
  'We work with a tight network of makers: ceramicists in Lisbon, metalworkers in Tokyo, textile studios in Morocco. Every piece has a provenance your guests can feel without being told.',
  detail: '6–8 weeks'
},
{
  number: '04',
  title: 'Installation & Opening',
  description:
  'We are on site for the final week. Styling, art placement, lighting calibration. The difference between a photographed hotel and a forgotten one is often measured in centimetres.',
  detail: '1–2 weeks on-site'
}];


export default function ProcessSection() {
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
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );

    const revealEls = sectionRef.current?.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
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

    return () => {observer.disconnect();ruleObserver.disconnect();};
  }, []);

  return (
    <section id="process" className="relative bg-charcoal/30 py-32 overflow-hidden" ref={sectionRef}>
      {/* Ambient glow */}
      <div
        className="ambient-glow absolute top-1/2 right-0 w-[500px] h-[500px] -translate-y-1/2"
        style={{ background: 'radial-gradient(ellipse, rgba(201,168,76,0.04) 0%, transparent 70%)' }} />
      

      <div className="max-w-screen-xl mx-auto px-10 md:px-16">
        {/* Section header */}
        <div className="gold-rule w-full mb-16" />

        <div className="grid md:grid-cols-5 gap-16 items-start">
          {/* Left: 40% — sticky image */}
          <div className="md:col-span-2 reveal-left">
            <p className="section-label mb-5">Our Process</p>
            <h2
              className="font-display text-ivory mb-8"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 300, lineHeight: 1.15 }}>
              
              From First<br />
              <em className="font-light text-ivory/60">Conversation</em><br />
              to Opening Night.
            </h2>
            <p className="text-ivory/45 text-sm font-sans leading-relaxed mb-10">
              We have refined this process across 40+ properties on four continents.
              It is designed to protect your investment, your timeline, and the
              integrity of the vision.
            </p>

            {/* Sticky image */}
            <div className="relative overflow-hidden" style={{ aspectRatio: '3/4' }}>
              <AppImage
                src="https://img.rocket.new/generatedImages/rocket_gen_img_1f638fabe-1772149727486.png"
                alt="Atelier design process — material samples and mood boards on a studio table"
                fill
                className="object-cover" />
              
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(to top, rgba(11,11,15,0.6) 0%, transparent 50%)' }} />
              
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-xs text-gold/70 tracking-widest uppercase font-sans">
                  Atelier Studio, 2026
                </p>
              </div>
            </div>
          </div>

          {/* Right: 60% — process steps */}
          <div className="md:col-span-3 space-y-0">
            {steps.map((step, idx) =>
            <div key={step.number}>
                <div className="reveal-up" style={{ transitionDelay: `${idx * 0.15}s` }}>
                  <div className="flex gap-8 py-10 group hover:bg-gold/[0.02] transition-colors duration-500 rounded-sm px-2 -mx-2">
                    {/* Number */}
                    <div className="flex-shrink-0">
                      <span
                      className="font-display text-gold/25 group-hover:text-gold/50 transition-colors duration-500"
                      style={{ fontSize: '2.5rem', fontWeight: 300, lineHeight: 1 }}>
                      
                        {step.number}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-baseline justify-between mb-3">
                        <h3 className="font-display text-ivory text-xl font-light">
                          {step.title}
                        </h3>
                        <span className="text-xs text-gold/50 tracking-wider font-sans ml-4 flex-shrink-0">
                          {step.detail}
                        </span>
                      </div>
                      <p className="text-ivory/45 text-sm font-sans leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
                {idx < steps.length - 1 &&
              <div className="gold-rule w-full opacity-20" />
              }
              </div>
            )}
          </div>
        </div>

        <div className="gold-rule w-full mt-16" />
      </div>
    </section>);

}