import React, { useEffect, useRef } from 'react';
import { Layers, Scissors, Hammer, Sparkles } from 'lucide-react';
import { gsap, ScrollTrigger } from '../../lib/gsap';

const CRAFT_STEPS = [
  {
    num: '01',
    title: 'Select',
    subtitle: 'Tannery Grading',
    icon: Layers,
    description:
      'Only raw Tuscan full-grain skins possessing zero stretch variation and microscopic pore uniformity pass our bench cut. Less than 2% of hides qualify for a NOIR last.',
    specs: ['Origin: Santa Croce sull’Arno', 'Grade: Uncorrected Grain', 'Aging: 90-Day Drum Curing'],
  },
  {
    num: '02',
    title: 'Cut',
    subtitle: 'Clicker Mastery',
    icon: Scissors,
    description:
      'A master clicker studies the hide topography for days. Blades slice along natural tension vectors to guarantee the vamp flexes without creasing or fatigue across decades.',
    specs: ['Tool: Hand-Honed Carbon Steel', 'Method: Freehand Clicking', 'Zero Machine Punching'],
  },
  {
    num: '03',
    title: 'Stitch',
    subtitle: 'Goodyear Welt',
    icon: Hammer,
    description:
      'An impenetrable lock-stitch binds the upper, insole rib, and leather welt using twisted hemp dipped in hot pitch wax. Waterproof, rebuildable, and resilient.',
    specs: ['Tension: 320 lbs Lock-Stitch', 'Thread: Wax-Impregnated Linen', 'Recrafting Life: Infinite'],
  },
  {
    num: '04',
    title: 'Finish',
    subtitle: 'Bone Burnishing',
    icon: Sparkles,
    description:
      'The shoe rests on cedar lasts for fourteen days before receiving twelve applications of champagne wax and bone friction. The obsidian glass mirror emerges without chemicals.',
    specs: ['Burnish Tool: Polished Deer Bone', 'Rest Time: 14-Day Last Set', 'Sheen: Obsidian Glaze'],
  },
];

export function Craft() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const numeralRefs = useRef([]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray('.craft-panel');
      const totalPanels = panels.length;

      // Pin the section and scrub xPercent horizontally
      gsap.to(panels, {
        xPercent: -100 * (totalPanels - 1),
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1,
          start: 'top top',
          end: () => `+=${trackRef.current.offsetWidth}`,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            // Fill numerals as progress passes their thresholds
            const p = self.progress;
            numeralRefs.current.forEach((el, idx) => {
              if (!el) return;
              const threshold = idx / (totalPanels - 1);
              if (p >= threshold - 0.1) {
                el.classList.add('active');
              } else {
                el.classList.remove('active');
              }
            });
          },
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="craft"
      ref={sectionRef}
      className="relative w-full h-screen bg-[#0a0a0a] text-[#f4f1ec] overflow-hidden"
    >
      {/* Top Banner */}
      <div className="absolute top-10 left-8 sm:left-16 z-20 flex items-center space-x-6">
        <span className="font-mono text-xs uppercase tracking-[0.35em] text-[#b08d57] font-semibold">
          Methodology
        </span>
        <div className="w-12 h-[1px] bg-white/20" />
        <span className="text-xs uppercase tracking-[0.25em] text-[#f4f1ec]/50 font-sans">
          Four Pillars of Bench Craft
        </span>
      </div>

      {/* Horizontal Track of Process Panels */}
      <div
        ref={trackRef}
        className="flex h-full w-[400vw] will-change-transform"
      >
        {CRAFT_STEPS.map((step, idx) => {
          const Icon = step.icon;
          return (
            <div
              key={step.num}
              className="craft-panel w-screen h-full flex items-center justify-center p-8 sm:p-16 md:p-24 relative select-none"
            >
              <div className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
                {/* Large Outlined Numeral that fills on scroll */}
                <div className="lg:col-span-5 flex flex-col items-start">
                  <div
                    ref={(el) => (numeralRefs.current[idx] = el)}
                    className="text-stroke-outline text-8xl sm:text-9xl md:text-[12rem] font-serif font-light leading-none transition-all duration-700 select-none"
                  >
                    {step.num}
                  </div>
                  <div className="mt-4 flex items-center space-x-3 text-xs font-mono uppercase tracking-[0.3em] text-[#b08d57]">
                    <Icon className="w-4 h-4 text-[#b08d57]" />
                    <span>Stage {step.num}</span>
                  </div>
                </div>

                {/* Content Card */}
                <div className="lg:col-span-7 p-8 sm:p-12 rounded-3xl bg-[#121212]/90 backdrop-blur-md border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                  <span className="text-xs font-mono tracking-widest text-[#f4f1ec]/40 uppercase">
                    {step.subtitle}
                  </span>
                  <h3 className="mt-2 text-4xl sm:text-5xl font-serif font-light text-[#f4f1ec] tracking-tight">
                    {step.title}.
                  </h3>
                  <p className="mt-6 text-sm sm:text-base font-sans font-light text-[#f4f1ec]/70 leading-relaxed">
                    {step.description}
                  </p>

                  <div className="mt-8 pt-6 border-t border-white/10 space-y-2">
                    {step.specs.map((spec, sIdx) => (
                      <div key={sIdx} className="text-xs font-mono text-[#f4f1ec]/55 tracking-wide flex items-center space-x-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#b08d57]" />
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Horizontal Scroll Instruction */}
      <div className="absolute bottom-10 right-8 sm:right-16 z-20 flex items-center space-x-3 text-[10px] font-mono tracking-[0.3em] uppercase text-[#f4f1ec]/40">
        <span>Scroll Down To Advance Craft</span>
        <span className="animate-pulse text-[#b08d57]">→</span>
      </div>
    </section>
  );
}

export default Craft;
