# Monochrome Studio — Swiss E-Commerce

A minimalist e-commerce storefront built with Next.js 16, Prisma, and Neon PostgreSQL. Deployed on Vercel.

**Live site:** https://swiss-ecommerce.vercel.app

---

## Tech Stack

- **Framework:** Next.js 16 (App Router, Turbopack)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + CSS custom properties
- **Database:** Neon PostgreSQL via Prisma ORM
- **State:** Zustand (cart, wishlist)
- **Deployment:** Vercel

---

## Phase System

The site has a three-phase design switcher (top-right corner):

| Phase | Theme | Images | Animations |
|-------|-------|--------|------------|
| Phase 1 | Grayscale | No (wireframe placeholders) | No |
| Phase 2 | Color | Yes (Unsplash) | No |
| Phase 3 | Animated | Yes (Unsplash) | Yes (hover zoom, transitions) |

Theme preference is saved to `localStorage`.

---

## Pages

| Route | Description |
|-------|-------------|
| `/` | Homepage — hero, popular products, full product grid |
| `/products` | All products with category filter |
| `/product/[id]` | Product detail — image, description, add to cart/wishlist |
| `/cart` | Shopping cart with quantity controls |
| `/wishlist` | Saved products |
| `/orders` | Order history (localStorage) |
| `/checkout/success` | Order confirmation after Stripe checkout |
| `/checkout/cancel` | Cancelled checkout redirect |
| `/about` | About page |
| `/contact` | Contact form |
| `/privacy` | Privacy policy |

---

## Product Data

34 products seeded into Neon PostgreSQL via `prisma/seed.ts`.  
Images sourced from Unsplash (stored as URLs in the `images` field).

To reseed:
```bash
npx ts-node prisma/seed.ts
```

---

## Local Development

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Add DATABASE_URL and DIRECT_URL from Neon console

# Push schema to database
npx prisma db push

# Seed products
npx ts-node prisma/seed.ts

# Start dev server
npm run dev
```

---

## Environment Variables

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | Neon pooled connection string |
| `DIRECT_URL` | Neon direct connection string (migrations) |

Set both in Vercel → Settings → Environment Variables.

---

## Build

```bash
npm run build   # prisma generate + next build
npm run lint    # ESLint v10
npx tsc --noEmit  # TypeScript check
```
