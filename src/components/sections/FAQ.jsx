import React, { useState } from 'react';
import { Plus } from 'lucide-react';

const FAQS = [
  {
    q: 'How do I determine my size and fitting for a NOIR shoe last?',
    a: 'Every NOIR last follows traditional British standard sizing with a generous instep and sculpted waist. We provide a complimentary tactile measuring kit containing leather calibration strips and arch templates prior to crafting your pair. You may also visit our private appointment salons in Florence, London, and New York.',
  },
  {
    q: 'What makes a 360° Goodyear welt superior to standard footwear?',
    a: 'Unlike cemented (glued) or Blake-stitched footwear, our Goodyear welt runs unbroken around the entire perimeter of the shoe. The cavity between the insole and outsole is filled with granulated Portuguese cork that molds to your unique foot impression over thirty hours of wear. Furthermore, the sole can be replaced infinitely without ever piercing the upper leather.',
  },
  {
    q: 'How does the atelier resoling and restoration program work?',
    a: 'Every pair of NOIR shoes comes with lifetime service enrollment. Whenever your oak bark outsoles require replacement, send your shoes back to our Tuscany workshop in their original cedar box. Our artisans will strip the worn sole, inspect the welt, replace the cork bed, rest the shoe on its original wooden last, and apply a factory mirror burnish before return.',
  },
  {
    q: 'What routine care does the full-grain obsidian leather require?',
    a: 'Because our calfskin is drum-dyed with natural oils, it requires minimal intervention. Insert raw cedar shoe trees immediately after removal to absorb moisture and preserve shape. Dust lightly with a horsehair brush after each outing, and massage with neutral carnauba wax cream every six to eight weeks.',
  },
  {
    q: 'Where are NOIR oxfords manufactured, and what is the production lead time?',
    a: 'All NOIR footwear is bench-made in Santa Croce sull’Arno, Tuscany, by craftsmen with at least fifteen years of individual shoemaking experience. Due to our fourteen-day last resting cycle and twelve-stage hand-burnishing process, lead times average four to six weeks from order confirmation.',
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section
      id="faq"
      className="relative w-full py-28 sm:py-36 px-6 sm:px-12 md:px-20 bg-[#0a0a0a] text-[#f4f1ec] border-t border-white/10"
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 sm:mb-20">
          <span className="font-mono text-xs uppercase tracking-[0.35em] text-[#b08d57] font-semibold">
            Inquiries
          </span>
          <h2 className="mt-3 text-4xl sm:text-6xl font-serif font-light tracking-tight text-[#f4f1ec]">
            Frequently Answered.
          </h2>
          <p className="mt-4 text-xs sm:text-sm font-sans font-light text-[#f4f1ec]/60 max-w-md mx-auto">
            Everything you need to know about provenance, sizing, and lifetime recrafting.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="rounded-2xl border border-white/10 bg-[#121212]/60 overflow-hidden transition-colors duration-300 hover:border-white/20"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between p-6 sm:p-8 text-left focus:outline-none focus-visible:ring-1 focus-visible:ring-[#b08d57]"
                >
                  <span className="font-serif text-lg sm:text-2xl text-[#f4f1ec] font-light pr-6 tracking-wide">
                    {faq.q}
                  </span>
                  <div
                    className={`flex-shrink-0 w-8 h-8 rounded-full border border-white/15 flex items-center justify-center text-[#b08d57] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      isOpen ? 'rotate-45 bg-[#b08d57]/10 border-[#b08d57]' : 'rotate-0'
                    }`}
                  >
                    <Plus className="w-4 h-4" />
                  </div>
                </button>

                {/* Animated expandable content */}
                <div
                  className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-8 sm:px-8 text-xs sm:text-sm font-sans font-light text-[#f4f1ec]/70 leading-relaxed border-t border-white/5 pt-4">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default FAQ;
