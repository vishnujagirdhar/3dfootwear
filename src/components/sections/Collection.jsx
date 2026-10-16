import React, { useEffect, useRef } from 'react';
import { ArrowUpRight, ShieldCheck, Sparkles } from 'lucide-react';
import { gsap, ScrollTrigger } from '../../lib/gsap';

const PRODUCTS = [
  {
    id: 'oxford-01',
    number: '01',
    name: 'The Oxford No. 01',
    edition: 'Formal Cap-Toe',
    price: '$820 USD',
    leather: 'Tuscan Obsidian Calfskin',
    sole: 'Single Leather Oak Bark with Brass Nails',
    welt: 'Closed Goodyear Welt 360°',
    gradient: 'from-[#141414] via-[#1a1a1a] to-[#0c0c0c]',
    shoeSvg: (
      <svg viewBox="0 0 400 200" className="w-full h-full drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)]">
        <path
          d="M 50 150 C 70 148, 120 150, 160 148 C 220 148, 280 155, 340 140 C 370 132, 380 115, 360 105 C 330 90, 270 95, 240 75 C 220 60, 200 45, 170 45 C 145 45, 130 65, 120 85 C 105 105, 75 110, 50 115 Z"
          fill="#0a0a0c"
          stroke="#b08d57"
          strokeWidth="1.5"
        />
        {/* Cap toe stitch line */}
        <path d="M 300 110 C 295 125, 290 142, 288 147" stroke="#b08d57" strokeWidth="1.5" strokeDasharray="3 3" />
        {/* Welt edge */}
        <path d="M 40 155 Q 200 155 355 145" stroke="#3d3326" strokeWidth="4" />
        {/* Heel block */}
        <rect x="55" y="157" width="55" height="18" rx="2" fill="#181410" stroke="#b08d57" strokeWidth="1" />
        {/* Lacing eyelets */}
        <circle cx="175" cy="72" r="2.5" fill="#b08d57" />
        <circle cx="188" cy="78" r="2.5" fill="#b08d57" />
        <circle cx="201" cy="84" r="2.5" fill="#b08d57" />
      </svg>
    ),
  },
  {
    id: 'derby-02',
    number: '02',
    name: 'The Derby No. 02',
    edition: 'Open-Laced Blucher',
    price: '$860 USD',
    leather: 'Drum-Dyed Cognac Calfskin',
    sole: 'Double Leather Storm Welt',
    welt: 'Heavy Reverse Welt 360°',
    gradient: 'from-[#1a1614] via-[#241c18] to-[#120f0d]',
    shoeSvg: (
      <svg viewBox="0 0 400 200" className="w-full h-full drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)]">
        <path
          d="M 50 150 C 70 148, 120 150, 160 148 C 220 148, 280 155, 345 138 C 375 128, 380 110, 355 102 C 320 90, 265 92, 235 68 C 215 50, 195 40, 165 42 C 140 44, 125 68, 115 88 C 100 108, 70 112, 50 118 Z"
          fill="#17120e"
          stroke="#b08d57"
          strokeWidth="1.5"
        />
        {/* Open quarters flap */}
        <path d="M 160 60 Q 185 85 200 100 Q 165 120 145 110" fill="none" stroke="#b08d57" strokeWidth="1.5" />
        {/* Welt edge */}
        <path d="M 40 156 Q 200 156 360 144" stroke="#4a3728" strokeWidth="5" />
        {/* Stacked Heel */}
        <rect x="55" y="158" width="58" height="20" rx="2" fill="#241b14" stroke="#b08d57" strokeWidth="1" />
      </svg>
    ),
  },
  {
    id: 'loafer-03',
    number: '03',
    name: 'The Loafer No. 03',
    edition: 'Florentine Penny Slip-On',
    price: '$790 USD',
    leather: 'Antiqued Saddle Calfskin',
    sole: 'Ultra-Flex Beveled Waist Sole',
    welt: 'Hand-Sewn Moccasin Welt',
    gradient: 'from-[#121215] via-[#1a1a20] to-[#0c0c0e]',
    shoeSvg: (
      <svg viewBox="0 0 400 200" className="w-full h-full drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)]">
        <path
          d="M 50 150 C 70 148, 120 150, 160 148 C 220 148, 280 152, 340 138 C 368 130, 375 115, 355 106 C 320 95, 270 98, 230 85 C 200 75, 175 70, 150 72 C 130 74, 115 88, 105 102 C 90 112, 70 115, 50 118 Z"
          fill="#0c0d10"
          stroke="#b08d57"
          strokeWidth="1.5"
        />
        {/* Saddle strap */}
        <path d="M 195 85 C 210 95, 215 115, 205 130" stroke="#b08d57" strokeWidth="2" fill="none" />
        <rect x="195" y="98" width="14" height="6" rx="1" fill="#b08d57" />
        {/* Welt edge */}
        <path d="M 40 155 Q 200 155 355 144" stroke="#362f28" strokeWidth="4" />
        {/* Low heel */}
        <rect x="55" y="157" width="55" height="15" rx="2" fill="#141416" stroke="#b08d57" strokeWidth="1" />
      </svg>
    ),
  },
];

export function Collection() {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const cards = cardsRef.current;
    const ctx = gsap.context(() => {
      // Stacked sticky cards animation
      cards.forEach((card, index) => {
        if (index === cards.length - 1) return; // Last card doesn't need to scale down for next

        const nextCard = cards[index + 1];

        gsap.to(card, {
          scale: 0.92,
          opacity: 0.35,
          y: -20,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: nextCard,
            start: 'top 85%',
            end: 'top 25%',
            scrub: true,
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="collection"
      ref={containerRef}
      className="relative w-full py-28 sm:py-36 px-6 sm:px-12 md:px-20 bg-[#f4f1ec] text-[#0a0a0a]"
    >
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-20 sm:mb-28 flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-[#0a0a0a]/15 pb-12">
        <div>
          <span className="text-xs font-mono uppercase tracking-[0.35em] text-[#b08d57] font-semibold">
            Permanent Archive
          </span>
          <h2 className="mt-3 text-5xl sm:text-7xl md:text-8xl font-serif font-light tracking-tighter text-[#0a0a0a]">
            The Collection.
          </h2>
        </div>
        <p className="max-w-md text-sm sm:text-base font-sans font-light text-[#0a0a0a]/70 leading-relaxed">
          Three silhouettes refined over three decades. Bench-made in limited batches of twenty-four pairs per month.
        </p>
      </div>

      {/* Stacked Cards Container */}
      <div className="max-w-6xl mx-auto flex flex-col gap-16 sm:gap-24">
        {PRODUCTS.map((product, index) => (
          <div
            key={product.id}
            ref={(el) => (cardsRef.current[index] = el)}
            className="sticky top-28 sm:top-32 w-full rounded-3xl bg-[#0a0a0a] text-[#f4f1ec] p-8 sm:p-14 md:p-16 shadow-[0_24px_64px_rgba(0,0,0,0.35)] border border-white/10 overflow-hidden group origin-top transition-all duration-300"
          >
            {/* Background subtle radial gradient */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${product.gradient} opacity-90 pointer-events-none`}
            />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              {/* Left Column: Product Information */}
              <div className="lg:col-span-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center space-x-3 mb-4">
                    <span className="font-mono text-xs tracking-widest text-[#b08d57] font-semibold">
                      ARCHIVE NO. {product.number}
                    </span>
                    <span className="text-white/20">|</span>
                    <span className="font-sans text-xs tracking-widest uppercase text-[#f4f1ec]/60">
                      {product.edition}
                    </span>
                  </div>

                  <h3 className="text-4xl sm:text-5xl md:text-6xl font-serif font-light tracking-tight text-[#f4f1ec] mb-4">
                    {product.name}
                  </h3>

                  <p className="text-2xl font-serif italic text-[#b08d57] mb-8">
                    {product.price}
                  </p>

                  <div className="space-y-4 border-t border-white/10 pt-6 text-xs sm:text-sm font-sans font-light text-[#f4f1ec]/75">
                    <div className="flex justify-between py-1 border-b border-white/5">
                      <span className="text-[#f4f1ec]/50 uppercase tracking-widest">Leather</span>
                      <span>{product.leather}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-white/5">
                      <span className="text-[#f4f1ec]/50 uppercase tracking-widest">Construction</span>
                      <span>{product.welt}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-white/5">
                      <span className="text-[#f4f1ec]/50 uppercase tracking-widest">Outsole</span>
                      <span>{product.sole}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-10 flex items-center space-x-6">
                  <button className="group/btn relative px-8 py-3.5 rounded-full bg-[#b08d57] text-[#0a0a0a] text-xs uppercase tracking-[0.2em] font-sans font-medium overflow-hidden transition-all duration-300">
                    <span className="relative z-10 flex items-center space-x-2 group-hover/btn:text-[#f4f1ec] transition-colors duration-300">
                      <span>Request Bespoke Lasting</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </span>
                    <span className="absolute inset-0 bg-[#0a0a0a] translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                  </button>

                  <span className="text-xs uppercase tracking-widest font-mono text-[#f4f1ec]/40">
                    6-Week Lead Time
                  </span>
                </div>
              </div>

              {/* Right Column: Visual Silhouette Illustration with Hover Zoom */}
              <div className="lg:col-span-6 relative flex items-center justify-center p-6 sm:p-10 rounded-2xl bg-[#050505]/60 border border-white/5 overflow-hidden">
                <div className="absolute inset-0 bg-radial from-[#b08d57]/10 via-transparent to-transparent pointer-events-none" />
                <div className="w-full max-w-md h-64 sm:h-80 flex items-center justify-center transform group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]">
                  {product.shoeSvg}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Collection;
