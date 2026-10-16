import React, { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../../lib/gsap';

const STATS = [
  { value: 120, suffix: '+', label: 'Bespoke Steps', desc: 'Distinct manual operations required for each shoe' },
  { value: 30, suffix: ' YRS', label: 'Artisanal Heritage', desc: 'Continuous family bench shoemaking in Tuscany' },
  { value: 100, suffix: '%', label: 'Vegetable Tanned', desc: 'Zero toxic synthetic glues or corrected leather' },
  { value: 18, suffix: ' DAYS', label: 'Wood Lasting', desc: 'Resting period on solid beechwood shoe lasts' },
];

const MANIFESTO = 
  "True luxury does not clamor for attention. It resides in the disciplined weight of an artisan's hand, the enduring geometry of a Goodyear welt, and the mirror sheen of calfskin burnished in deliberate silence. We do not manufacture footwear for temporary seasons. We forge architectural heirlooms engineered to outlast fleeting trends and accompany you through decades of quiet distinction.";

export function StoryStats() {
  const containerRef = useRef(null);
  const statsRef = useRef([]);
  const paragraphRef = useRef(null);
  const wordsRef = useRef([]);

  const words = MANIFESTO.split(' ');

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // 1. Numbers count up on enter
      statsRef.current.forEach((el, index) => {
        if (!el) return;
        const targetVal = STATS[index].value;
        const numEl = el.querySelector('.counter-num');
        const obj = { val: 0 };

        gsap.to(obj, {
          val: targetVal,
          duration: 2.0,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            once: true,
          },
          onUpdate: () => {
            if (numEl) {
              numEl.innerText = Math.floor(obj.val);
            }
          },
        });
      });

      // 2. Word-by-word scroll highlight (opacity 0.2 to 1)
      if (wordsRef.current.length > 0) {
        gsap.to(wordsRef.current, {
          opacity: 1,
          color: '#0a0a0a',
          stagger: 0.1,
          ease: 'none',
          scrollTrigger: {
            trigger: paragraphRef.current,
            start: 'top 75%',
            end: 'bottom 45%',
            scrub: 1,
          },
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="story"
      ref={containerRef}
      className="relative w-full py-28 sm:py-36 px-6 sm:px-12 md:px-20 bg-[#f4f1ec] text-[#0a0a0a]"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header Label */}
        <div className="flex items-center space-x-3 mb-16">
          <span className="font-mono text-xs uppercase tracking-[0.35em] text-[#b08d57] font-semibold">
            The Philosophy
          </span>
          <div className="w-10 h-[1px] bg-[#0a0a0a]/20" />
          <span className="text-xs uppercase tracking-[0.25em] text-[#0a0a0a]/50 font-sans">
            Manifesto of Longevity
          </span>
        </div>

        {/* Word-by-word scrubbed paragraph */}
        <div ref={paragraphRef} className="max-w-5xl mb-24 sm:mb-32">
          <p className="font-serif text-3xl sm:text-5xl md:text-6xl font-light leading-snug tracking-tight">
            {words.map((word, i) => (
              <span
                key={i}
                ref={(el) => (wordsRef.current[i] = el)}
                className="inline-block mr-[0.3em] opacity-20 text-[#0a0a0a]/40 transition-colors duration-150"
              >
                {word}
              </span>
            ))}
          </p>
        </div>

        {/* 4 Animated Metric Counters */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 pt-16 border-t border-[#0a0a0a]/15">
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              ref={(el) => (statsRef.current[i] = el)}
              className="flex flex-col"
            >
              <div className="flex items-baseline font-serif font-light text-5xl sm:text-6xl md:text-7xl text-[#0a0a0a] tracking-tight">
                <span className="counter-num">0</span>
                <span className="text-[#b08d57] text-2xl sm:text-3xl font-mono ml-1">
                  {stat.suffix}
                </span>
              </div>
              <h4 className="mt-2 text-xs uppercase tracking-[0.25em] font-mono text-[#b08d57] font-semibold">
                {stat.label}
              </h4>
              <p className="mt-2 text-xs font-sans font-light text-[#0a0a0a]/65 leading-relaxed">
                {stat.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default StoryStats;
