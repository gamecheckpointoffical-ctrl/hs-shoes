'use client';
import { useState } from 'react';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/newsletter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    setEmail('');
    setDone(true);
  };

  if (done) return <p className="text-sm text-cream/50">Welcome to the HS Circle.</p>;

  return (
    <form className="flex gap-0 w-full" onSubmit={handleSubmit}>
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email address"
        className="flex-1 bg-transparent border border-cream/20 px-4 py-3.5 text-sm text-cream placeholder:text-cream/30 focus:outline-none focus:border-cream/60"
      />
      <button type="submit" className="px-8 py-3.5 bg-cream text-ink text-[11px] uppercase tracking-[0.15em] hover:bg-cream/90 transition-colors">
        Subscribe
      </button>
    </form>
  );
}
