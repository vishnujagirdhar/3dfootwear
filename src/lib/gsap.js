import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
  
  // Default easing and duration matching design specifications
  gsap.defaults({
    ease: 'power3.out',
    duration: 1.0,
  });
}

export { gsap, ScrollTrigger };
export default gsap;
