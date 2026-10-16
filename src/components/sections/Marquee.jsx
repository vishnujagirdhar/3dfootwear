import React, { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../../lib/gsap';

export function Marquee() {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const isHovered = useRef(false);
  const velocityMultiplier = useRef(1);

  const marqueeText = 'Handcrafted · Timeless · Italian Leather · Made to Last · Goodyear Welted · Florentine Heritage · ';

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Track scroll velocity using ScrollTrigger
    let lastScroll = window.scrollY;
    let timeout;

    const handleScroll = () => {
      const currentScroll = window.scrollY;
      const velocity = Math.abs(currentScroll - lastScroll);
      lastScroll = currentScroll;

      // Increase multiplier proportionally up to 3.5x
      velocityMultiplier.current = 1 + Math.min(velocity * 0.05, 2.5);

      clearTimeout(timeout);
      timeout = setTimeout(() => {
        velocityMultiplier.current = 1;
      }, 150);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Continuous ticker loop for butter-smooth translation
    let xPos = 0;
    const baseSpeed = 1.2;

    const tick = () => {
      if (!isHovered.current) {
        xPos -= baseSpeed * velocityMultiplier.current;
        // Reset seamlessly when half has passed
        const singleWidth = track.scrollWidth / 2;
        if (Math.abs(xPos) >= singleWidth) {
          xPos = 0;
        }
        track.style.transform = `translate3d(${xPos}px, 0, 0)`;
      }
      requestAnimationFrame(tick);
    };

    const animId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animId);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      onMouseEnter={() => (isHovered.current = true)}
      onMouseLeave={() => (isHovered.current = false)}
      className="relative w-full py-16 sm:py-24 bg-[#0a0a0a] border-y border-white/10 overflow-hidden cursor-default select-none"
    >
      <div
        ref={trackRef}
        className="flex whitespace-nowrap will-change-transform font-serif text-4xl sm:text-6xl md:text-7xl font-light uppercase tracking-tight text-[#f4f1ec]"
      >
        <span className="flex-shrink-0 flex items-center space-x-6 pr-6">
          <span>Handcrafted</span>
          <span className="text-[#b08d57]">·</span>
          <span className="text-stroke-outline hover:text-[#f4f1ec] transition-colors">Timeless</span>
          <span className="text-[#b08d57]">·</span>
          <span>Italian Leather</span>
          <span className="text-[#b08d57]">·</span>
          <span className="italic font-normal text-[#e8e4dc]">Made to Last</span>
          <span className="text-[#b08d57]">·</span>
          <span>Goodyear Welted</span>
          <span className="text-[#b08d57]">·</span>
          <span className="text-stroke-outline">Florentine Heritage</span>
          <span className="text-[#b08d57]">·</span>
        </span>

        {/* Duplicate for seamless infinite loop */}
        <span className="flex-shrink-0 flex items-center space-x-6 pr-6">
          <span>Handcrafted</span>
          <span className="text-[#b08d57]">·</span>
          <span className="text-stroke-outline hover:text-[#f4f1ec] transition-colors">Timeless</span>
          <span className="text-[#b08d57]">·</span>
          <span>Italian Leather</span>
          <span className="text-[#b08d57]">·</span>
          <span className="italic font-normal text-[#e8e4dc]">Made to Last</span>
          <span className="text-[#b08d57]">·</span>
          <span>Goodyear Welted</span>
          <span className="text-[#b08d57]">·</span>
          <span className="text-stroke-outline">Florentine Heritage</span>
          <span className="text-[#b08d57]">·</span>
        </span>
      </div>
    </section>
  );
}

export default Marquee;
