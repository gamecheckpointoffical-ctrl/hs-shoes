# HS Shoes — Premium Luxury Footwear

A production-ready luxury 3D footwear e-commerce platform built with Next.js, Supabase, and Tailwind CSS.

## Features
- Luxury homepage with cinematic hero
- Product catalog with filtering and search
- Interactive 3D-style product viewer (drag to rotate)
- Shopping cart with persistence
- Checkout with Cash on Delivery
- Product reviews
- SEO optimized (sitemap, robots, structured data)
- Responsive design (mobile + desktop)
- Supabase PostgreSQL backend

## Tech Stack
- **Frontend:** Next.js 14, React 18, TypeScript, Tailwind CSS
- **Backend:** Next.js API Routes, Supabase PostgreSQL
- **Storage:** Supabase Storage (product images)
- **Deployment:** Vercel

## Setup
```bash
npm install
cp .env.example .env.local  # Fill in Supabase keys
npm run dev
```

## Environment Variables
- `NEXT_PUBLIC_SUPABASE_URL` — Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — Supabase anon key
- `SUPABASE_SERVICE_ROLE_KEY` — Supabase service role key (server only)
- `NEXT_PUBLIC_SITE_URL` — Production URL

## Payment
Currently supports Cash on Delivery. Stripe/PayPal architecture is ready — requires API keys to activate.

## License
© HS Shoes. All rights reserved.
