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

  if (done) return <p className="text-sm text-ash">Welcome to the HS Circle.</p>;

  return (
    <form className="flex flex-col sm:flex-row gap-0 max-w-md mx-auto" onSubmit={handleSubmit}>
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email address"
        className="flex-1 border border-ink/20 px-4 py-4 text-sm focus:outline-none focus:border-ink bg-transparent"
      />
      <button type="submit" className="btn-primary sm:ml-0">Subscribe</button>
    </form>
  );
}
