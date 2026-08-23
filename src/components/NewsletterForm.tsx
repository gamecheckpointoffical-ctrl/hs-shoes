'use client';
import { useState } from 'react';

export default function NewsletterForm({ dark = false }: { dark?: boolean }) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    setTimeout(() => { setStatus('success'); setEmail(''); }, 800);
  };

  if (status === 'success') {
    return (
      <p className="text-sm font-light text-gold">
        Thank you for joining the HS Circle.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex gap-0">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email address"
          className={`flex-1 px-5 py-4 text-sm bg-transparent border-b ${dark ? 'border-stone/60 text-cream placeholder:text-ash focus:border-gold' : 'border-stone text-cream placeholder:text-ash focus:border-gold'} transition-colors outline-none`}
        />
        <button type="submit" disabled={status === 'loading'}
          className={`px-8 py-4 text-[10px] uppercase tracking-[0.2em] border-b transition-colors ${dark ? 'border-stone/60 text-gold hover:border-gold' : 'border-stone text-gold hover:border-gold'} ${status === 'loading' ? 'opacity-30' : ''}`}>
          {status === 'loading' ? '...' : 'Subscribe'}
        </button>
      </div>
    </form>
  );
}
