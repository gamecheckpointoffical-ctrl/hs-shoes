'use client';
export default function ContactPage() {
  return (
    <div className="container-lux pt-32 pb-20 max-w-2xl mx-auto">
      <p className="text-xs uppercase tracking-widest text-ash mb-4 text-center">Get in Touch</p>
      <h1 className="font-display text-4xl md:text-5xl mb-8 text-center">Contact Us</h1>
      <p className="text-ash text-center mb-12">Have a question? We'd love to hear from you.</p>
      <form className="space-y-4" onSubmit={async (e) => { e.preventDefault(); alert('Thank you! We will get back to you shortly.'); (e.target as HTMLFormElement).reset(); }}>
        <input required placeholder="Your name" className="w-full border border-stone px-4 py-3 text-sm focus:outline-none focus:border-ink" />
        <input required type="email" placeholder="Email" className="w-full border border-stone px-4 py-3 text-sm focus:outline-none focus:border-ink" />
        <textarea required placeholder="Message" rows={5} className="w-full border border-stone px-4 py-3 text-sm focus:outline-none focus:border-ink" />
        <button type="submit" className="btn-primary w-full">Send Message</button>
      </form>
      <div className="mt-12 grid grid-cols-3 gap-4 text-center text-xs">
        <div><p className="text-ash uppercase tracking-widest mb-1">Email</p><p>care@hsshoes.com</p></div>
        <div><p className="text-ash uppercase tracking-widest mb-1">Phone</p><p>+1 (800) 477-4637</p></div>
        <div><p className="text-ash uppercase tracking-widest mb-1">Hours</p><p>Mon–Fri 9–6</p></div>
      </div>
    </div>
  );
}
