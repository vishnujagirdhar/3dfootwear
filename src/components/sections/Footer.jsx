import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { gsap, ScrollTrigger } from '../../lib/gsap';

export function Footer() {
  const footerRef = useRef(null);
  const bigNoirRef = useRef(null);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Giant NOIR wordmark rises into view on scroll
      gsap.fromTo(
        bigNoirRef.current,
        {
          yPercent: 40,
          opacity: 0.1,
        },
        {
          yPercent: 0,
          opacity: 1,
          duration: 1.4,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 80%',
            end: 'bottom bottom',
            scrub: 1,
          },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
      setSubscribed(false);
    }, 4000);
  };

  return (
    <footer
      id="journal"
      ref={footerRef}
      className="relative w-full bg-[#050505] text-[#f4f1ec] pt-24 pb-12 px-6 sm:px-12 md:px-20 border-t border-white/10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Top Grid: Newsletter & Link Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-24">
          {/* Newsletter Column */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.35em] text-[#b08d57] font-semibold">
                Private Gazette
              </span>
              <h3 className="mt-3 text-3xl sm:text-4xl font-serif font-light text-[#f4f1ec] tracking-tight">
                Receive confidential notifications of limited leather batch releases.
              </h3>
              <p className="mt-4 text-xs font-sans font-light text-[#f4f1ec]/60 leading-relaxed max-w-md">
                Dispatches are sent bi-annually. No commercial solicitations; strictly archival releases and salon invitationals.
              </p>
            </div>

            <form onSubmit={handleSubscribe} className="mt-8 max-w-md">
              <div className="relative flex items-center border-b border-white/20 pb-3 group focus-within:border-[#b08d57] transition-colors duration-300">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full bg-transparent text-sm font-sans font-light text-[#f4f1ec] placeholder-white/30 focus:outline-none"
                  required
                />
                <button
                  type="submit"
                  aria-label="Submit newsletter"
                  className="ml-3 p-2 rounded-full text-[#b08d57] hover:text-[#f4f1ec] transition-colors duration-300"
                >
                  {subscribed ? <Check className="w-4 h-4 text-emerald-400" /> : <ArrowRight className="w-4 h-4" />}
                </button>
              </div>
              {subscribed && (
                <span className="text-[11px] font-mono text-emerald-400 mt-2 block">
                  You are registered for our private dispatch.
                </span>
              )}
            </form>
          </div>

          {/* Navigation Links Columns */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {/* Column 1 */}
            <div>
              <h4 className="font-mono text-xs uppercase tracking-[0.3em] text-[#b08d57] mb-6">
                Collections
              </h4>
              <ul className="space-y-3 text-xs uppercase tracking-[0.18em] font-sans text-[#f4f1ec]/70">
                <li><a href="#collection" className="hover:text-[#b08d57] transition-colors">The Oxford No. 01</a></li>
                <li><a href="#collection" className="hover:text-[#b08d57] transition-colors">The Derby No. 02</a></li>
                <li><a href="#collection" className="hover:text-[#b08d57] transition-colors">The Loafer No. 03</a></li>
                <li><a href="#collection" className="hover:text-[#b08d57] transition-colors">Made-To-Order</a></li>
              </ul>
            </div>

            {/* Column 2 */}
            <div>
              <h4 className="font-mono text-xs uppercase tracking-[0.3em] text-[#b08d57] mb-6">
                The Atelier
              </h4>
              <ul className="space-y-3 text-xs uppercase tracking-[0.18em] font-sans text-[#f4f1ec]/70">
                <li><a href="#craft" className="hover:text-[#b08d57] transition-colors">Santa Croce Workshop</a></li>
                <li><a href="#story" className="hover:text-[#b08d57] transition-colors">Tannery Provenance</a></li>
                <li><a href="#faq" className="hover:text-[#b08d57] transition-colors">Resoling Program</a></li>
                <li><a href="#faq" className="hover:text-[#b08d57] transition-colors">Book Salon Fitting</a></li>
              </ul>
            </div>

            {/* Column 3 */}
            <div>
              <h4 className="font-mono text-xs uppercase tracking-[0.3em] text-[#b08d57] mb-6">
                Salons & Press
              </h4>
              <ul className="space-y-3 text-xs uppercase tracking-[0.18em] font-sans text-[#f4f1ec]/70">
                <li><span className="text-[#f4f1ec]/40">Florence · Via de' Tornabuoni</span></li>
                <li><span className="text-[#f4f1ec]/40">London · Mayfair</span></li>
                <li><span className="text-[#f4f1ec]/40">New York · Madison Ave</span></li>
                <li><span className="text-[#f4f1ec]/40">concierge@noir-atelier.com</span></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Giant NOIR Wordmark that rises into view */}
        <div className="w-full overflow-hidden border-t border-white/10 pt-12 pb-6">
          <div
            ref={bigNoirRef}
            className="w-full text-center text-[18vw] sm:text-[20vw] leading-none font-serif font-light tracking-[0.25em] text-[#f4f1ec]/90 select-none pointer-events-none drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
          >
            NOIR
          </div>
        </div>

        {/* Bottom Credits & Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-8 border-t border-white/5 text-[10px] font-mono uppercase tracking-[0.25em] text-[#f4f1ec]/40 space-y-4 sm:space-y-0">
          <div>
            © {new Date().getFullYear()} NOIR ATELIER TUSCANY. ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center space-x-6">
            <span className="hover:text-[#b08d57] cursor-pointer transition-colors">Privacy Protocol</span>
            <span>·</span>
            <span className="hover:text-[#b08d57] cursor-pointer transition-colors">Provenance Certificate</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
