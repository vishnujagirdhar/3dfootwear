import React, { useEffect, useRef, useState } from 'react';
import { gsap } from '../lib/gsap';

export function Preloader({ onComplete }) {
  const [count, setCount] = useState(0);
  const curtainRef = useRef(null);
  const contentRef = useRef(null);
  const barRef = useRef(null);

  useEffect(() => {
    // Lock scrolling while preloader runs
    document.body.style.overflow = 'hidden';

    const obj = { val: 0 };
    const tl = gsap.timeline();

    // 1. Counter animation 0 to 100
    tl.to(obj, {
      val: 100,
      duration: 1.8,
      ease: 'power2.inOut',
      onUpdate: () => {
        setCount(Math.floor(obj.val));
      },
    });

    // 2. Animate progress bar scale
    tl.to(
      barRef.current,
      {
        scaleX: 1,
        duration: 1.8,
        ease: 'power2.inOut',
      },
      0
    );

    // 3. Slide curtain up to reveal Hero
    tl.to(contentRef.current, {
      opacity: 0,
      y: -30,
      duration: 0.6,
      ease: 'power3.in',
    });

    tl.to(curtainRef.current, {
      yPercent: -100,
      duration: 1.1,
      ease: 'power3.inOut',
      onComplete: () => {
        document.body.style.overflow = '';
        if (onComplete) onComplete();
      },
    });

    return () => {
      document.body.style.overflow = '';
    };
  }, [onComplete]);

  return (
    <div
      ref={curtainRef}
      className="fixed inset-0 z-50 flex flex-col justify-between p-8 sm:p-14 bg-[#0a0a0a] text-[#f4f1ec]"
    >
      {/* Top micro tag */}
      <div className="flex justify-between items-center text-[10px] uppercase tracking-[0.3em] text-[#f4f1ec]/40 font-mono">
        <span>Handcrafted in Tuscany</span>
        <span>Atelier Edition 2026</span>
      </div>

      {/* Center Brand Identity */}
      <div ref={contentRef} className="flex flex-col items-center justify-center my-auto">
        <h1 className="text-5xl sm:text-7xl md:text-9xl font-serif font-light tracking-[0.35em] text-[#f4f1ec]">
          NOIR
        </h1>
        <p className="mt-4 text-xs sm:text-sm tracking-[0.4em] uppercase text-[#b08d57] font-sans font-medium">
          Silence In Every Step
        </p>
      </div>

      {/* Bottom Counter & Bar */}
      <div className="flex flex-col space-y-3">
        <div className="flex justify-between items-end text-xs uppercase tracking-[0.25em] font-mono text-[#f4f1ec]/60">
          <span>Loading Experience</span>
          <span className="text-sm font-semibold text-[#b08d57]">{count.toString().padStart(3, '0')}%</span>
        </div>
        <div className="w-full h-[2px] bg-white/10 overflow-hidden">
          <div
            ref={barRef}
            className="w-full h-full bg-[#b08d57] origin-left scale-x-0"
          />
        </div>
      </div>
    </div>
  );
}

export default Preloader;
