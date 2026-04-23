'use client';
import React, { useEffect, useRef, useState } from 'react';
import MicroGallery from './MicroGallery';

interface Project {
  id: number;
  name: string;
  location: string;
  scope: string;
  year: string;
  quote: string;
  quoteAuthor: string;
  image: string;
  images: string[];
  tag: string;
}

const projects: Project[] = [
{
  id: 1,
  name: 'The Nocturne',
  location: 'Dubai, UAE',
  scope: 'Full Lobby & Rooftop Bar',
  year: '2025',
  quote: 'Our RevPAR increased 38% in the first quarter. Guests check in and immediately ask who designed the space.',
  quoteAuthor: 'Khalid Al-Rashid, General Manager',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_14a5ca983-1763300171126.png",
  images: [
  'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&q=85',
  'https://images.unsplash.com/photo-1559508551-44bff1de756b?w=1200&q=85',
  'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1200&q=85'],

  tag: 'Luxury Repositioning'
},
{
  id: 2,
  name: 'Maison Soleil',
  location: 'Lisbon, Portugal',
  scope: 'Boutique Suite Collection (22 keys)',
  year: '2024',
  quote: 'The rooms photograph themselves. Every travel publication reached out before we even opened.',
  quoteAuthor: 'Inês Carvalho, Founder',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1afc88c33-1769404255721.png",
  images: [
  'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&q=85',
  'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=1200&q=85',
  'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=1200&q=85'],

  tag: 'New Build'
},
{
  id: 3,
  name: 'Kōen Resort',
  location: 'Hakone, Japan',
  scope: 'Ryokan Renovation & Onsen Wing',
  year: '2025',
  quote: 'Atelier understood that restraint is the luxury. They gave us silence, and silence turned out to be exactly what our guests had been searching for.',
  quoteAuthor: 'Hiroshi Tanaka, Owner',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_171024f74-1772057172106.png",
  images: [
  'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=1200&q=85',
  'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=1200&q=85',
  'https://images.unsplash.com/photo-1506059612708-99d6128b4e20?w=1200&q=85'],

  tag: 'Cultural Heritage'
},
{
  id: 4,
  name: 'Casa Selva',
  location: 'Tulum, Mexico',
  scope: 'Ground-Up Eco-Luxury Resort (48 keys)',
  year: '2024',
  quote: 'From investor renderings to opening night, Atelier held the vision tighter than we did. The pitch deck closed our Series A.',
  quoteAuthor: 'Valentina Reyes, Co-Founder',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1d7ae26e2-1763300161611.png",
  images: [
  'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200&q=85',
  'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&q=85',
  'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=1200&q=85'],

  tag: 'Ground-Up Development'
}];


export default function ProjectGrid() {
  const [openProject, setOpenProject] = useState<Project | null>(null);
  const rulesRef = useRef<NodeListOf<Element> | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // Gold rule draw animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add('drawn');
          }
        });
      },
      { threshold: 0.5 }
    );

    const rules = document.querySelectorAll('.gold-rule');
    rulesRef.current = rules;
    rules.forEach((rule) => observer.observe(rule));

    return () => observer.disconnect();
  }, []);

  // Scroll reveal
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
      { threshold: 0.08, rootMargin: '0px 0px -60px 0px' }
    );

    const revealEls = gridRef.current?.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
    revealEls?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="work" className="relative bg-obsidian py-24 px-0" ref={gridRef}>
      {/* Section header */}
      <div className="px-10 md:px-16 mb-16 reveal-up">
        <p className="section-label mb-4">Selected Projects</p>
        <div className="flex items-end gap-8">
          <h2
            className="font-display text-ivory"
            style={{ fontSize: 'clamp(2.2rem, 5vw, 4.5rem)', fontWeight: 300, lineHeight: 1.1 }}>
            
            The Work
          </h2>
          <p className="text-ivory/40 text-sm font-sans mb-2 max-w-xs leading-relaxed hidden md:block">
            Every surface chosen by someone who understands desire.
          </p>
        </div>
      </div>

      {/* Projects */}
      <div className="space-y-0">
        {projects.map((project, idx) => {
          const isEven = idx % 2 === 0;
          return (
            <div key={project.id}>
              {/* Gold rule before each project */}
              <div className="px-10 md:px-16">
                <div className="gold-rule w-full" />
              </div>

              {/* Asymmetric 60/40 grid */}
              <div
                className={`grid md:grid-cols-5 min-h-[70vh] cursor-pointer group`}
                onClick={() => setOpenProject(project)}
                data-cursor-hover
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && setOpenProject(project)}
                aria-label={`View ${project.name} project`}>
                
                {/* 60% — Full-bleed image (left for even, right for odd) */}
                <div
                  className={`project-card relative md:col-span-3 h-[55vw] md:h-auto overflow-hidden ${
                  isEven ? 'md:order-1' : 'md:order-2'}`
                  }>
                  
                  <div
                    className="project-card-image absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url('${project.image}')` }}
                    role="img"
                    aria-label={`${project.name} interior photography`} />
                  
                  {/* Always-visible tag */}
                  <div className="absolute top-8 left-8 z-20">
                    <span className="section-label bg-obsidian/60 backdrop-blur-sm px-3 py-1.5">
                      {project.tag}
                    </span>
                  </div>
                  {/* Hover overlay */}
                  <div className="project-card-overlay absolute inset-0 z-10" />
                </div>

                {/* 40% — Details panel */}
                <div
                  className={`md:col-span-2 flex flex-col justify-center px-10 md:px-14 py-16 bg-charcoal/40 border-l border-gold/5 ${
                  isEven ? 'md:order-2' : 'md:order-1'}`
                  }
                  style={{ borderColor: 'rgba(201,168,76,0.06)' }}>
                  
                  {/* Project number */}
                  <p
                    className="font-display text-gold/20 mb-6"
                    style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', fontWeight: 300, lineHeight: 1 }}>
                    
                    {String(idx + 1).padStart(2, '0')}
                  </p>

                  <div className={`reveal-${isEven ? 'right' : 'left'}`}>
                    {/* Name & location */}
                    <h3
                      className="font-display text-ivory mb-1"
                      style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2.2rem)', fontWeight: 400, lineHeight: 1.2 }}>
                      
                      {project.name}
                    </h3>
                    <p className="text-gold text-xs tracking-widest uppercase mb-6 font-sans">
                      {project.location} · {project.year}
                    </p>

                    {/* Scope */}
                    <p className="text-ivory/50 text-sm font-sans leading-relaxed mb-8">
                      {project.scope}
                    </p>

                    {/* Pull quote */}
                    <blockquote className="border-l-2 border-gold/30 pl-5 mb-8">
                      <p className="font-display italic text-ivory/70 text-base leading-relaxed mb-3">
                        &ldquo;{project.quote}&rdquo;
                      </p>
                      <cite className="text-xs text-ivory/35 not-italic tracking-wider font-sans">
                        — {project.quoteAuthor}
                      </cite>
                    </blockquote>

                    {/* View CTA */}
                    <button className="inline-flex items-center gap-3 text-xs tracking-widest uppercase text-gold font-sans group/btn">
                      <span>View Project</span>
                      <span
                        className="block h-px bg-gold transition-all duration-500 group-hover/btn:w-10"
                        style={{ width: '24px' }} />
                      
                    </button>
                  </div>
                </div>
              </div>
            </div>);

        })}

        {/* Final gold rule */}
        <div className="px-10 md:px-16">
          <div className="gold-rule w-full" />
        </div>
      </div>

      {/* Micro-gallery overlay */}
      {openProject &&
      <MicroGallery
        project={openProject}
        onClose={() => setOpenProject(null)} />

      }
    </section>);

}