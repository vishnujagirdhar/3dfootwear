import React, { useState } from 'react';
import useLenis from './hooks/useLenis';
import Cursor from './components/Cursor';
import Navbar from './components/Navbar';
import Preloader from './components/Preloader';

// Sections
import Hero from './components/sections/Hero';
import Story3D from './components/sections/Story3D';
import Marquee from './components/sections/Marquee';
import Collection from './components/sections/Collection';
import Craft from './components/sections/Craft';
import StoryStats from './components/sections/StoryStats';
import FAQ from './components/sections/FAQ';
import Footer from './components/sections/Footer';

export function App() {
  const [loading, setLoading] = useState(true);
  const { start } = useLenis();

  const handlePreloaderComplete = () => {
    setLoading(false);
    start();
  };

  return (
    <div className="relative w-full min-h-screen bg-[#0a0a0a] text-[#f4f1ec] selection:bg-[#b08d57] selection:text-[#0a0a0a]">
      {/* Desktop Custom Trailing Cursor */}
      <Cursor />

      {/* Initial Asset & Brand Preloader */}
      {loading && <Preloader onComplete={handlePreloaderComplete} />}

      {/* Floating Sticky Minimal Nav */}
      <Navbar />

      {/* Main Sections */}
      <main className="relative w-full">
        {/* 1. Hero with Masked Headline & 3D Floating Oxford */}
        <Hero isReady={!loading} />

        {/* 2. Pinned 3D Story Sequence (500vh, 360 scrub, 4 holds & callouts) */}
        <Story3D />

        {/* 3. Velocity-reactive Marquee */}
        <Marquee />

        {/* 4. Stacked Sticky Product Cards */}
        <Collection />

        {/* 5. Horizontal Craft Pinning Sequence */}
        <Craft />

        {/* 6. Word-by-word Highlight Manifesto & Metric Counters */}
        <StoryStats />

        {/* 7. Animated Inquiries Accordion */}
        <FAQ />
      </main>

      {/* 8. Footer with Giant Rising Wordmark & Gazette */}
      <Footer />
    </div>
  );
}

export default App;
