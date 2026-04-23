'use client';
import React, { useEffect, useRef } from 'react';
import AppImage from '@/components/ui/AppImage';

const testimonials = [
{
  quote:
  'Atelier did not just design our lobby — they authored the first chapter of every guest\'s stay. The space tells a story before a single word is spoken.',
  author: 'Marcus Holloway',
  role: 'CEO, Holloway Hospitality Group',
  property: 'The Meridian, London',
  avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_14a5ca983-1763300171126.png"
},
{
  quote:
  'Our investor presentation closed in one meeting. The renderings Atelier produced were so atmospheric that one board member asked if we had already built the hotel.',
  author: 'Priya Nair',
  role: 'Founder, Nair Resort Ventures',
  property: 'Malabar Cliff, Kerala',
  avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_156202218-1772149729773.png"
},
{
  quote:
  'We handed them a tired 1970s property in the mountains. Six months later, it was on the cover of Condé Nast Traveller. The bones were always there — they just knew how to dress them.',
  author: 'Stefan Wüthrich',
  role: 'Owner, Wüthrich Alpine Properties',
  property: 'Weisshorn Lodge, Verbier',
  avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_19dd6c3ae-1772149728162.png"
}];


const credentials = [
{ label: 'Properties Completed', value: '47' },
{ label: 'Countries', value: '14' },
{ label: 'Average RevPAR Lift', value: '+31%' },
{ label: 'Press Features', value: '90+' }];


export default function TestimonialsSection() {
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
    <section id="studio" className="relative bg-obsidian py-32 overflow-hidden" ref={sectionRef}>
      {/* Ambient glow */}
      <div
        className="ambient-glow absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px]"
        style={{ background: 'radial-gradient(ellipse, rgba(201,168,76,0.04) 0%, transparent 70%)' }} />
      

      <div className="max-w-screen-xl mx-auto px-10 md:px-16">
        {/* Credentials bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-24">
          {credentials.map((cred, i) =>
          <div
            key={cred.label}
            className="reveal-up text-center md:text-left border-l border-gold/15 pl-6"
            style={{ transitionDelay: `${i * 0.1}s` }}>
            
              <p
              className="font-display text-gold mb-1"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 300 }}>
              
                {cred.value}
              </p>
              <p className="text-ivory/40 text-xs font-sans tracking-wider uppercase">
                {cred.label}
              </p>
            </div>
          )}
        </div>

        <div className="gold-rule w-full mb-20" />

        {/* Section label */}
        <div className="reveal-up mb-12">
          <p className="section-label">What Owners Say</p>
        </div>

        {/* Testimonials — asymmetric layout */}
        <div className="grid md:grid-cols-5 gap-0">
          {/* Large featured testimonial */}
          <div className="md:col-span-3 pr-0 md:pr-16 reveal-left">
            <blockquote className="mb-8">
              <div className="text-gold/30 font-display mb-4" style={{ fontSize: '5rem', lineHeight: 0.8, fontWeight: 300 }}>
                &ldquo;
              </div>
              <p
                className="font-display text-ivory leading-relaxed"
                style={{ fontSize: 'clamp(1.1rem, 2vw, 1.5rem)', fontWeight: 300 }}>
                
                {testimonials[0].quote}
              </p>
            </blockquote>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                <AppImage
                  src={testimonials[0].avatar}
                  alt={`${testimonials[0].author} profile photo`}
                  width={48}
                  height={48}
                  className="object-cover w-full h-full" />
                
              </div>
              <div>
                <p className="text-ivory text-sm font-sans font-medium">{testimonials[0].author}</p>
                <p className="text-ivory/40 text-xs font-sans">{testimonials[0].role}</p>
                <p className="text-gold/60 text-xs font-sans tracking-wider mt-0.5">{testimonials[0].property}</p>
              </div>
            </div>
          </div>

          {/* Two smaller testimonials */}
          <div className="md:col-span-2 flex flex-col gap-8 mt-12 md:mt-0 border-l border-gold/10 pl-0 md:pl-10">
            {testimonials.slice(1).map((t, i) =>
            <div
              key={t.author}
              className="reveal-right"
              style={{ transitionDelay: `${i * 0.2}s` }}>
              
                <blockquote className="mb-4">
                  <p className="font-display italic text-ivory/65 text-sm leading-relaxed">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </blockquote>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0">
                    <AppImage
                    src={t.avatar}
                    alt={`${t.author} profile photo`}
                    width={36}
                    height={36}
                    className="object-cover w-full h-full" />
                  
                  </div>
                  <div>
                    <p className="text-ivory/80 text-xs font-sans font-medium">{t.author}</p>
                    <p className="text-ivory/35 text-xs font-sans">{t.property}</p>
                  </div>
                </div>
                {i === 0 && <div className="gold-rule w-full mt-8 opacity-30" />}
              </div>
            )}
          </div>
        </div>

        <div className="gold-rule w-full mt-20" />
      </div>
    </section>);

}