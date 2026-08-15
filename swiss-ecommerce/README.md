# Monochrome Studio

A clean, minimal online store built as a portfolio project.

**Live site:** https://swiss-ecommerce.vercel.app

---

## What It Does

This is a fully working e-commerce store. You can browse products, add them to your cart, save items to a wishlist, and check out. Products are stored in a real database.

---

## The Three Phases

The store has a phase switcher in the top-right corner. Each phase shows a different version of the design.

**Phase 1 — Wireframe**
No photos. Just boxes and text. This shows the layout and structure before any visuals are added.

**Phase 2 — Color**
Photos appear. The color scheme changes to blue. This is the full visual design.

**Phase 3 — Animated**
Same as Phase 2, but images zoom in when you hover over them. Colors shift to teal green.

The site remembers which phase you picked the next time you visit.

---

## Pages

- **Home** — Hero image, popular products, and the full product grid
- **Products** — Browse all 34 products, filter by category
- **Product Page** — Photo, description, price, add to cart or wishlist
- **Cart** — Review items, update quantities, go to checkout
- **Wishlist** — Saved products you want to come back to
- **Orders** — Your past orders
- **About** — About the store
- **Contact** — Send a message

---

## Built With

- **Next.js 16** — The React framework that powers the site
- **TypeScript** — Keeps the code reliable and catches errors early
- **Tailwind CSS** — Handles all the styling
- **Prisma + Neon** — The database where products are stored
- **Zustand** — Manages the cart and wishlist in the browser
- **Vercel** — Where the site is hosted and deployed

---

## Running It Locally

```bash
# 1. Install packages
npm install

# 2. Add your database credentials to .env
DATABASE_URL="your-neon-pooled-url"
DIRECT_URL="your-neon-direct-url"

# 3. Push the schema to the database
npx prisma db push

# 4. Seed the 34 products
npx ts-node prisma/seed.ts

# 5. Start the dev server
npm run dev
```

---

## Deploying to Vercel

1. Push to GitHub
2. Connect the repo in Vercel
3. Add `DATABASE_URL` and `DIRECT_URL` in Vercel → Settings → Environment Variables
4. Vercel builds and deploys automatically on every push

---

## Product Images

All 34 product photos come from Unsplash. They load as URLs — no image files are stored in the project.
