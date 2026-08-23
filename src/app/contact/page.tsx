import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact — HS Shoes',
  description: 'Get in touch with HS Shoes.',
};

export default function ContactPage() {
  return (
    <div className="pt-20">
      <section className="container-lux py-20 md:py-32">
        <div className="text-center mb-20">
          <p className="text-[10px] uppercase tracking-[0.35em] text-ash mb-5 font-light">Get in Touch</p>
          <h1 className="font-display text-4xl md:text-[48px] mb-6">Contact Us</h1>
          <div className="flex items-center justify-center gap-3">
            <span className="w-6 h-px bg-stone" />
            <p className="text-xs text-ash">We'd love to hear from you</p>
            <span className="w-6 h-px bg-stone" />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-16 md:gap-24 max-w-5xl mx-auto">
          <div>
            <h2 className="font-display text-2xl md:text-3xl mb-10">Reach Us</h2>
            <div className="space-y-10">
              <div>
                <p className="text-[10px] uppercase tracking-[0.25em] text-ash mb-3 font-light">Phone</p>
                <a href="tel:003175477734" className="text-lg hover:text-ash transition-colors">+92 317 5477734</a>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.25em] text-ash mb-3 font-light">Email</p>
                <a href="mailto:hello@hsshoes.com" className="text-lg hover:text-ash transition-colors">hello@hsshoes.com</a>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.25em] text-ash mb-3 font-light">Region</p>
                <p className="text-lg text-ash font-light">Pakistan</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.25em] text-ash mb-3 font-light">Hours</p>
                <p className="text-sm text-ash font-light">Monday — Saturday<br/>10:00 AM — 8:00 PM PKT</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="font-display text-2xl md:text-3xl mb-10">Send a Message</h2>
            <form className="space-y-5">
              <input required placeholder="Your name" className="w-full border border-stone px-5 py-4 text-sm focus:outline-none focus:border-ink transition-colors" />
              <input required type="email" placeholder="Email address" className="w-full border border-stone px-5 py-4 text-sm focus:outline-none focus:border-ink transition-colors" />
              <input type="tel" placeholder="Phone (optional)" className="w-full border border-stone px-5 py-4 text-sm focus:outline-none focus:border-ink transition-colors" />
              <textarea required placeholder="Your message" rows={5} className="w-full border border-stone px-5 py-4 text-sm focus:outline-none focus:border-ink transition-colors resize-none" />
              <button type="submit" className="btn-primary w-full"><span>Send Message</span></button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
