import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import { CartProvider } from '@/context/CartContext';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-serif' });

export const metadata: Metadata = {
  title: 'HS Shoes — Premium Footwear',
  description: 'HS Shoes — Crafted to Be Remembered. Premium luxury footwear hand-finished from the finest materials. Shop the Signature Collection.',
  metadataBase: new URL('https://hs-shoes.vercel.app'),
  openGraph: {
    title: 'HS Shoes — Premium Footwear',
    description: 'Crafted to Be Remembered. Premium luxury footwear.',
    type: 'website',
    siteName: 'HS Shoes',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HS Shoes — Premium Footwear',
    description: 'Crafted to Be Remembered. Premium luxury footwear.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans bg-cream text-ink antialiased">
        <CartProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
