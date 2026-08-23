'use client';
export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <p className="font-display text-4xl mb-4">Something went wrong.</p>
      <p className="text-ash mb-8">{error.message}</p>
      <button onClick={reset} className="btn-primary">Try Again</button>
    </div>
  );
}
