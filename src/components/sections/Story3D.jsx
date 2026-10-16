import React, { useEffect, useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import CanvasContainer from '../CanvasContainer';
import Shoe from '../Shoe';
import { gsap, ScrollTrigger } from '../../lib/gsap';

const CALLOUTS = [
  {
    step: '01',
    category: 'Material Sourcing',
    title: 'Full-grain Italian leather',
    description:
      'Drum-dyed Tuscan calfskin selected from the top 1% of raw hides. Retains natural breathability, developing a rich, unmistakable patina over years of wear.',
    alignment: 'left',
  },
  {
    step: '02',
    category: 'Precision Craft',
    title: 'Hand-stitched Goodyear welt',
    description:
      'A true 360° welt lock-stitched directly through the upper, rib, and insole. Impassable barrier against rain and pavement friction, engineered for unlimited rebuilds.',
    alignment: 'right',
  },
  {
    step: '03',
    category: 'Artisanal Patina',
    title: 'Hand-burnished finish',
    description:
      'Twelve consecutive applications of beeswax and carnauba wax, manually worked into the grain with deer bone tools to achieve a glass-like obsidian depth.',
    alignment: 'left',
  },
  {
    step: '04',
    category: 'Lifespan',
    title: 'Built to be resoled',
    description:
      'Vegetable-tanned oak bark outsoles pressed for nine months in subterranean pits. When worn, return to our atelier for factory-restored original lasting.',
    alignment: 'right',
  },
];

// Inner 3D scene controller reading from animState
function ScrubbedShoeScene({ animState }) {
  const shoeRef = useRef();
  const { camera } = useThree();

  useFrame(() => {
    if (!shoeRef.current) return;
    // Scrub shoe rotation
    shoeRef.current.rotation.x = animState.current.shoeRotX;
    shoeRef.current.rotation.y = animState.current.shoeRotY;
    shoeRef.current.rotation.z = animState.current.shoeRotZ;
    shoeRef.current.scale.setScalar(animState.current.shoeScale);

    // Scrub camera position
    camera.position.x = animState.current.camX;
    camera.position.y = animState.current.camY;
    camera.position.z = animState.current.camZ;
    camera.lookAt(animState.current.lookX, animState.current.lookY, animState.current.lookZ);
  });

  return (
    <group ref={shoeRef} position={[0, 0, 0]}>
      <Shoe scale={1.12} />
    </group>
  );
}

export function Story3D() {
  const sectionRef = useRef(null);
  const stickyRef = useRef(null);
  const progressBarRef = useRef(null);
  const calloutRefs = useRef([]);
  const [activeStep, setActiveStep] = useState(1);

  // Animation state values manipulated by GSAP
  const animState = useRef({
    shoeRotX: 0.1,
    shoeRotY: 0,
    shoeRotZ: 0,
    shoeScale: 1,
    camX: 0,
    camY: 1.1,
    camZ: 5.5,
    lookX: 0,
    lookY: 0.2,
    lookZ: 0,
  });

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Main Scrubbed Timeline pinned across 500vh
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom bottom',
          pin: stickyRef.current,
          scrub: 1, // Smooth scrub forward and reverse
          onUpdate: (self) => {
            const p = self.progress;
            if (progressBarRef.current) {
              progressBarRef.current.style.transform = `scaleY(${p})`;
            }
            if (p < 0.28) setActiveStep(1);
            else if (p < 0.54) setActiveStep(2);
            else if (p < 0.8) setActiveStep(3);
            else setActiveStep(4);
          },
        },
      });

      // --- PHASE 1: 0 to 25% (Angle 1: Side Profile / Leather) ---
      // Hold & Callout 1 appears
      tl.to(
        calloutRefs.current[0],
        { opacity: 1, x: 0, duration: 0.8, ease: 'power2.out' },
        0.1
      );
      tl.to(
        animState.current,
        {
          shoeRotY: 1.57, // 90 deg side
          shoeRotX: 0.08,
          shoeRotZ: 0.02,
          camX: 0.6,
          camY: 0.9,
          camZ: 4.8,
          duration: 2.5,
          ease: 'none',
        },
        0
      );
      // Callout 1 fades out
      tl.to(
        calloutRefs.current[0],
        { opacity: 0, x: -30, duration: 0.6, ease: 'power2.in' },
        2.2
      );

      // --- PHASE 2: 25% to 50% (Angle 2: Top-down / Goodyear Welt) ---
      tl.to(
        animState.current,
        {
          shoeRotY: 3.14, // 180 deg
          shoeRotX: 0.85, // Tilt to see top & throat
          shoeRotZ: -0.1,
          camX: -0.5,
          camY: 1.8,
          camZ: 4.4,
          duration: 2.5,
          ease: 'none',
        },
        2.5
      );
      tl.to(
        calloutRefs.current[1],
        { opacity: 1, x: 0, duration: 0.8, ease: 'power2.out' },
        2.8
      );
      tl.to(
        calloutRefs.current[1],
        { opacity: 0, x: 30, duration: 0.6, ease: 'power2.in' },
        4.7
      );

      // --- PHASE 3: 50% to 75% (Angle 3: Sole & Burnish) ---
      tl.to(
        animState.current,
        {
          shoeRotY: 4.71, // 270 deg
          shoeRotX: -1.15, // Invert upward to reveal sole & welt underside
          shoeRotZ: 0.15,
          camX: 0.4,
          camY: 0.4,
          camZ: 4.5,
          duration: 2.5,
          ease: 'none',
        },
        5.0
      );
      tl.to(
        calloutRefs.current[2],
        { opacity: 1, x: 0, duration: 0.8, ease: 'power2.out' },
        5.3
      );
      tl.to(
        calloutRefs.current[2],
        { opacity: 0, x: -30, duration: 0.6, ease: 'power2.in' },
        7.2
      );

      // --- PHASE 4: 75% to 95% (Angle 4: Full 360° completed & Resole) ---
      tl.to(
        animState.current,
        {
          shoeRotY: 6.28, // 360 deg
          shoeRotX: 0.12,
          shoeRotZ: 0,
          camX: 0,
          camY: 1.1,
          camZ: 5.2,
          duration: 2.5,
          ease: 'none',
        },
        7.5
      );
      tl.to(
        calloutRefs.current[3],
        { opacity: 1, x: 0, duration: 0.8, ease: 'power2.out' },
        7.8
      );
      tl.to(
        calloutRefs.current[3],
        { opacity: 0, x: 30, duration: 0.6, ease: 'power2.in' },
        9.4
      );

      // --- RELEASE PHASE: 95% to 100% ---
      tl.to(
        animState.current,
        {
          shoeScale: 0.75,
          camZ: 6.0,
          duration: 0.6,
          ease: 'power2.inOut',
        },
        9.5
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="story3d"
      ref={sectionRef}
      className="relative w-full h-[500vh] bg-[#0a0a0a]"
    >
      {/* Sticky Fullscreen Container */}
      <div
        ref={stickyRef}
        className="sticky top-0 left-0 w-full h-screen overflow-hidden flex items-center justify-center"
      >
        {/* Subtle Ambient Background Vignette */}
        <div className="absolute inset-0 bg-radial from-transparent via-[#0a0a0a]/50 to-[#0a0a0a] pointer-events-none" />

        {/* 3D Canvas with Persistent Shoe Model */}
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <CanvasContainer camera={{ position: [0, 1.1, 5.5], fov: 38 }}>
            <ScrubbedShoeScene animState={animState} />
          </CanvasContainer>
        </div>

        {/* Side Progress Tracker & Counter */}
        <div className="absolute right-8 sm:right-16 top-1/2 -translate-y-1/2 z-20 flex items-center space-x-4 pointer-events-none">
          <div className="flex flex-col items-center">
            <span className="font-mono text-xs tracking-widest text-[#b08d57] font-semibold mb-3">
              0{activeStep}
            </span>
            <div className="w-[1px] h-32 bg-white/10 relative overflow-hidden">
              <div
                ref={progressBarRef}
                className="w-full h-full bg-[#b08d57] origin-top scale-y-0 transition-transform duration-75"
              />
            </div>
            <span className="font-mono text-[10px] tracking-widest text-[#f4f1ec]/40 mt-3">
              04
            </span>
          </div>
        </div>

        {/* Callout Panels (Positioned Alternating Left / Right) */}
        <div className="absolute inset-0 z-20 pointer-events-none max-w-7xl mx-auto px-6 sm:px-12 md:px-20 flex items-center">
          {CALLOUTS.map((callout, index) => {
            const isLeft = callout.alignment === 'left';
            return (
              <div
                key={callout.step}
                ref={(el) => (calloutRefs.current[index] = el)}
                className={`absolute w-full max-w-sm sm:max-w-md ${
                  isLeft ? 'left-6 sm:left-12 md:left-20' : 'right-16 sm:right-28 md:right-36'
                } opacity-0 ${isLeft ? 'transform -translate-x-8' : 'transform translate-x-8'}`}
              >
                <div className="p-8 rounded-2xl bg-[#111111]/85 backdrop-blur-xl border border-white/10 shadow-[0_16px_48px_rgba(0,0,0,0.6)]">
                  <div className="flex items-center space-x-3 mb-3">
                    <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#b08d57] font-semibold">
                      {callout.step} · {callout.category}
                    </span>
                    <div className="w-8 h-[1px] bg-[#b08d57]/40" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-serif text-[#f4f1ec] font-light tracking-tight mb-3">
                    {callout.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#f4f1ec]/70 font-sans font-light leading-relaxed">
                    {callout.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Section Label */}
        <div className="absolute bottom-10 left-8 sm:left-16 z-20 text-[10px] font-mono tracking-[0.35em] uppercase text-[#f4f1ec]/40 pointer-events-none">
          <span>Continuous Examination · Scrubbing Active</span>
        </div>
      </div>
    </section>
  );
}

export default Story3D;
