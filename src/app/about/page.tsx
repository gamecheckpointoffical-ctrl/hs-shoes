import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About — HS Shoes',
  description: 'The story of HS Shoes — crafted to be remembered.',
};

export default function AboutPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="py-24 md:py-40 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <p className="text-[10px] uppercase tracking-[0.35em] text-ash mb-6 font-light">Our Story</p>
          <h1 className="font-display text-4xl md:text-[56px] mb-10 text-balance leading-tight">
            A belief that luxury should be felt, not heard.
          </h1>
          <div className="w-12 h-px bg-stone mx-auto mb-10" />
          <p className="text-ash text-[15px] leading-relaxed font-light max-w-2xl mx-auto">
            HS Shoes was founded on a simple principle: that true elegance speaks in whispers, not shouts.
            Every pair we create is an expression of restraint, quality, and timeless design.
          </p>
        </div>
      </section>

      {/* Philosophy Quote */}
      <section className="bg-ink text-cream py-24 md:py-36 px-6 relative overflow-hidden">
        <div className="film-grain" />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <span className="font-display text-5xl text-cream/20 leading-none mb-8 block">"</span>
          <blockquote className="font-display text-2xl md:text-[34px] text-cream text-balance leading-[1.3] mb-10">
            A gentleman is known by the shoes he wears — and the silence with which he wears them.
          </blockquote>
          <p className="text-[10px] uppercase tracking-[0.3em] text-cream/30 font-light">— The HS Philosophy</p>
        </div>
      </section>

      {/* Values */}
      <section className="section-pad">
        <div className="container-lux">
          <div className="grid md:grid-cols-3 gap-12 md:gap-20">
            {[
              { title: 'Material', text: 'We source only the finest full-grain leathers and premium materials from trusted tanneries. Every component is selected for its durability, character, and ability to age beautifully.' },
              { title: 'Craft', text: 'Each pair is hand-finished by master craftsmen using techniques passed down through generations. From cutting to stitching to the final burnish, every step is intentional.' },
              { title: 'Design', text: 'Our designs are restrained, modern, and timeless. We believe the most sophisticated shoes are those that feel effortless — noticed not for their flash, but for their quiet perfection.' },
            ].map((v, i) => (
              <div key={i}>
                <p className="text-[10px] uppercase tracking-[0.3em] text-ash mb-5 font-light">
                  {String(i + 1).padStart(2, '0')}
                </p>
                <h3 className="font-display text-2xl md:text-3xl mb-6">{v.title}</h3>
                <p className="text-ash text-[14px] leading-relaxed font-light">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-stone py-24 md:py-36 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-display text-3xl md:text-[44px] mb-8 text-balance leading-tight">
            Discover the collection.
          </h2>
          <a href="/shop" className="btn-primary inline-flex"><span>Shop Now</span></a>
        </div>
      </section>
    </div>
  );
}
