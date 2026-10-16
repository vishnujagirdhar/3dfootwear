import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import useMagnetic from '../hooks/useMagnetic';

export function Navbar({ onNavigate }) {
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const lastScrollY = useRef(0);
  const shopBtnRef = useMagnetic(0.25);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Detect background blur trigger
      if (currentScrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Hide on scroll down, show on scroll up
      if (currentScrollY > 120 && currentScrollY > lastScrollY.current) {
        // Scrolling down
        setIsVisible(false);
      } else {
        // Scrolling up or at top
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e, id) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 px-6 sm:px-12 py-5 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div
          className={`max-w-7xl mx-auto flex items-center justify-between px-6 py-3.5 rounded-full transition-all duration-500 ${
            isScrolled
              ? 'bg-[#0a0a0a]/80 backdrop-blur-md border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)]'
              : 'bg-transparent border border-transparent'
          }`}
        >
          {/* Brand Wordmark */}
          <a
            href="#"
            className="group flex items-center space-x-2 text-xl tracking-[0.3em] font-serif uppercase font-semibold text-[#f4f1ec]"
          >
            <span>NOIR</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#b08d57] opacity-80 group-hover:scale-150 transition-transform duration-300" />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-9 text-xs uppercase tracking-[0.2em] font-sans text-[#f4f1ec]/70">
            {[
              { label: 'Collection', id: 'collection' },
              { label: 'Craft', id: 'craft' },
              { label: 'Story', id: 'story' },
              { label: 'Journal', id: 'journal' },
            ].map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => handleLinkClick(e, link.id)}
                className="relative py-1 hover:text-[#f4f1ec] transition-colors duration-300 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#b08d57] hover:after:w-full after:transition-all after:duration-300"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <button
              ref={shopBtnRef}
              onClick={(e) => handleLinkClick(e, 'collection')}
              className="relative overflow-hidden group px-6 py-2 rounded-full border border-[#b08d57]/60 text-xs uppercase tracking-[0.2em] text-[#f4f1ec] font-sans font-medium hover:border-[#b08d57] transition-colors duration-300"
            >
              <span className="relative z-10 flex items-center space-x-1 group-hover:text-[#0a0a0a] transition-colors duration-300">
                <span>Shop</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#b08d57] group-hover:text-[#0a0a0a] transition-colors duration-300" />
              </span>
              <span className="absolute inset-0 bg-[#b08d57] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]" />
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-[#f4f1ec] p-1.5 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <div
        className={`fixed inset-0 z-30 bg-[#0a0a0a]/95 backdrop-blur-xl flex flex-col justify-center items-center px-8 transition-opacity duration-500 md:hidden ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <nav className="flex flex-col items-center space-y-8 text-2xl font-serif tracking-[0.2em] uppercase text-[#f4f1ec]">
          {[
            { label: 'Collection', id: 'collection' },
            { label: 'Craft', id: 'craft' },
            { label: 'Story', id: 'story' },
            { label: 'Journal', id: 'journal' },
          ].map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => handleLinkClick(e, link.id)}
              className="hover:text-[#b08d57] transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}
          <button
            onClick={(e) => handleLinkClick(e, 'collection')}
            className="mt-6 px-8 py-3 rounded-full bg-[#b08d57] text-[#0a0a0a] text-sm uppercase tracking-[0.2em] font-sans font-semibold"
          >
            Explore Collection
          </button>
        </nav>
      </div>
    </>
  );
}

export default Navbar;
