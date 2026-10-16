import React, { useEffect, useRef, useState } from 'react';
import { gsap } from '../lib/gsap';

export function Cursor() {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(true);

  useEffect(() => {
    // Check if device supports fine pointer (mouse)
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!hasFinePointer) {
      setIsTouch(true);
      return;
    }
    setIsTouch(false);

    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    // Quick setters for 60fps tracking
    const setCursorX = gsap.quickTo(cursor, 'x', { duration: 0.1, ease: 'power3.out' });
    const setCursorY = gsap.quickTo(cursor, 'y', { duration: 0.1, ease: 'power3.out' });
    const setFollowerX = gsap.quickTo(follower, 'x', { duration: 0.35, ease: 'power3.out' });
    const setFollowerY = gsap.quickTo(follower, 'y', { duration: 0.35, ease: 'power3.out' });

    const onMouseMove = (e) => {
      if (!isVisible) setIsVisible(true);
      setCursorX(e.clientX);
      setCursorY(e.clientY);
      setFollowerX(e.clientX);
      setFollowerY(e.clientY);
    };

    const onMouseEnter = () => setIsVisible(true);
    const onMouseLeave = () => setIsVisible(false);

    // Track hoverable targets
    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.closest('a') ||
        target.closest('button') ||
        target.closest('input') ||
        target.closest('[role="button"]') ||
        target.closest('.hover-trigger')
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseenter', onMouseEnter);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, [isVisible]);

  if (isTouch) return null;

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-50 transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Inner Dot */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 -ml-1 -mt-1 w-2 h-2 rounded-full bg-[#f4f1ec] mix-blend-difference pointer-events-none"
      />

      {/* Trailing Outer Ring / Glow */}
      <div
        ref={followerRef}
        className={`fixed top-0 left-0 rounded-full border pointer-events-none transition-all duration-300 ${
          isHovered
            ? '-ml-7 -mt-7 w-14 h-14 border-[#b08d57] bg-[#b08d57]/15 scale-110 backdrop-blur-[1px]'
            : '-ml-4 -mt-4 w-8 h-8 border-[#f4f1ec]/40 bg-transparent scale-100'
        }`}
      />
    </div>
  );
}

export default Cursor;
