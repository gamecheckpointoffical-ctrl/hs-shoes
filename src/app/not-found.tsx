import Link from 'next/link';
export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <p className="font-display text-8xl mb-4">404</p>
      <p className="text-ash mb-8">This page could not be found.</p>
      <Link href="/" className="btn-primary">Return Home</Link>
    </div>
  );
}
