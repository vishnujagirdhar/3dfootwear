import React, { useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { ArrowDown } from 'lucide-react';
import CanvasContainer from '../CanvasContainer';
import Shoe from '../Shoe';
import { gsap } from '../../lib/gsap';
import useMagnetic from '../../hooks/useMagnetic';

function FloatingHeroShoe() {
  const shoeRef = useRef();

  useFrame((state) => {
    if (!shoeRef.current) return;
    const t = state.clock.getElapsedTime();
    // Idle floating bob
    shoeRef.current.position.y = Math.sin(t * 1.2) * 0.08;
    // Mouse parallax tilt
    const mouseX = state.pointer.x * 0.35;
    const mouseY = state.pointer.y * 0.25;
    shoeRef.current.rotation.y = THREE_LERP(shoeRef.current.rotation.y, 0.45 + mouseX, 0.05);
    shoeRef.current.rotation.x = THREE_LERP(shoeRef.current.rotation.x, 0.15 - mouseY, 0.05);
    shoeRef.current.rotation.z = THREE_LERP(shoeRef.current.rotation.z, -0.05 + mouseX * 0.2, 0.05);
  });

  return (
    <group ref={shoeRef} position={[0, 0, 0]} rotation={[0.15, 0.45, -0.05]}>
      <Shoe scale={1.05} />
    </group>
  );
}

function THREE_LERP(start, end, factor) {
  return start + (end - start) * factor;
}

export function Hero({ isReady = true }) {
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const subcopyRef = useRef(null);
  const ctaRef = useRef(null);
  const indicatorRef = useRef(null);
  const buttonMagneticRef = useMagnetic(0.3);

  useEffect(() => {
    if (!isReady) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });

      // Masked text reveal: translateY 110% to 0, stagger 0.08
      tl.to([line1Ref.current, line2Ref.current], {
        y: '0%',
        duration: 1.1,
        stagger: 0.12,
        ease: 'power3.out',
      });

      // Subcopy and CTA fade up
      tl.to(
        subcopyRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
        },
        '-=0.6'
      );

      tl.to(
        ctaRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
        },
        '-=0.7'
      );

      tl.to(
        indicatorRef.current,
        {
          opacity: 1,
          duration: 0.8,
        },
        '-=0.5'
      );
    });

    return () => ctx.revert();
  }, [isReady]);

  const scrollToStory = () => {
    const el = document.getElementById('story3d');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative w-full min-h-screen flex flex-col justify-between pt-32 pb-12 px-6 sm:px-12 md:px-20 overflow-hidden bg-[#0a0a0a]">
      {/* Background subtle noise and atmospheric glow */}
      <div className="absolute inset-0 pointer-events-none noise-overlay opacity-40" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#b08d57]/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Hero Typography & Content */}
      <div className="relative z-10 max-w-6xl mx-auto w-full flex flex-col items-center text-center mt-4">
        {/* Edition Label */}
        <div className="mb-4 overflow-hidden">
          <p className="text-[11px] sm:text-xs font-mono tracking-[0.35em] text-[#b08d57] uppercase">
            Bespoke Oxford Series · 001
          </p>
        </div>

        {/* Masked Headline: "Walk In Silence." */}
        <h1 className="font-serif font-light text-[#f4f1ec] tracking-tighter flex flex-col items-center">
          <div className="overflow-hidden leading-none py-1">
            <span
              ref={line1Ref}
              className="inline-block transform translate-y-[115%] text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] font-light"
            >
              Walk In
            </span>
          </div>
          <div className="overflow-hidden leading-none py-1">
            <span
              ref={line2Ref}
              className="inline-block transform translate-y-[115%] text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] italic font-normal text-[#e8e4dc]"
            >
              Silence.
            </span>
          </div>
        </h1>

        {/* Sub-copy */}
        <p
          ref={subcopyRef}
          className="mt-6 max-w-xl text-sm sm:text-base text-[#f4f1ec]/65 font-sans font-light tracking-wide leading-relaxed opacity-0 transform translate-y-6"
        >
          Every stitch deliberate. Every contour sculpted from single-source
          Tuscan calfskin. Engineered with Goodyear welt construction to outlast the decade.
        </p>

        {/* CTA Button */}
        <div
          ref={ctaRef}
          className="mt-8 flex flex-col sm:flex-row items-center gap-4 opacity-0 transform translate-y-6"
        >
          <button
            ref={buttonMagneticRef}
            onClick={scrollToStory}
            className="group relative px-9 py-4 rounded-full bg-[#f4f1ec] text-[#0a0a0a] font-sans text-xs uppercase tracking-[0.25em] font-medium overflow-hidden transition-all duration-300 shadow-[0_4px_24px_rgba(244,241,236,0.12)] hover:shadow-[0_6px_32px_rgba(176,141,87,0.3)]"
          >
            <span className="relative z-10 flex items-center space-x-2 group-hover:text-[#f4f1ec] transition-colors duration-300">
              <span>Explore The Craft</span>
            </span>
            <span className="absolute inset-0 bg-[#0a0a0a] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]" />
          </button>
        </div>
      </div>

      {/* Floating 3D Shoe Canvas Container */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-auto">
        <div className="w-full max-w-4xl h-[420px] sm:h-[550px] md:h-[650px] relative mt-16 sm:mt-24">
          <CanvasContainer camera={{ position: [0, 1.2, 5.2], fov: 38 }}>
            <FloatingHeroShoe />
          </CanvasContainer>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div
        ref={indicatorRef}
        onClick={scrollToStory}
        className="relative z-10 mx-auto flex flex-col items-center space-y-2 cursor-pointer opacity-0 group"
      >
        <span className="text-[10px] uppercase font-mono tracking-[0.3em] text-[#f4f1ec]/50 group-hover:text-[#b08d57] transition-colors duration-300">
          Scroll To Reveal
        </span>
        <div className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center p-1 group-hover:border-[#b08d57] transition-colors duration-300">
          <div className="w-1 h-2 rounded-full bg-[#b08d57] animate-bounce" />
        </div>
      </div>
    </section>
  );
}

export default Hero;
