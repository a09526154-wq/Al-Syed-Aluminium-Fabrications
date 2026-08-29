# Al Syed Aluminium & Glass Fabrications — Official Website & Admin Portal

A modern business website and administrative management portal for **Al Syed Aluminium and Glass Fabrications** (Pak Land City Center, Office No. 05, I-8 Markaz, Islamabad).

---

## 🌟 Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router, Server Components & Actions)
- **UI & Styling**: [Tailwind CSS](https://tailwindcss.com/) with brand color variables
  - Navy/Charcoal Primary: `#0B0F1A`, `#0F1420`
  - Gold Accent: `#C9A24B`, `#D4AF6A`
  - Brand Blue Admin / Secondary: `#1E5FA8`, `#2C74C9`
  - WhatsApp Green: `#25D366`
- **Database & ORM**: [Neon](https://neon.tech/) Serverless PostgreSQL with [Drizzle ORM](https://orm.drizzle.team/)
- **Authentication**: [Better Auth](https://better-auth.com/) with Role-Based Access Control (`admin` / `staff`)
- **Cloud Media**: [Cloudinary](https://cloudinary.com/) for media storage, uploads, and automated `f_auto,q_auto` optimizations
- **Notifications**: [Resend](https://resend.com/) for real-time email alerts
- **SEO & Structured Data**: JSON-LD (`LocalBusiness`, `Service`, `AggregateRating`), OpenGraph, `next-sitemap`

---

## 📂 Project Structure

```
├── app/
│   ├── (public pages)
│   │   ├── page.tsx            # Home (Hero, Services, Badges, Gallery preview, CTA)
│   │   ├── about/              # About Us (Story, Stats, 4-Step Engineering Workflow)
│   │   ├── services/           # Services overview & dynamic [slug] detail pages
│   │   ├── products/           # Aluminium profiles & glass types with specs
│   │   ├── gallery/            # Filterable project portfolio with interactive Lightbox
│   │   ├── testimonials/       # Approved client reviews with submission modal
│   │   ├── quote/              # Multi-step Quote Request with Cloudinary image upload
│   │   └── contact/            # Contact Us with NAP cards & Google Maps embed
│   ├── admin/                  # Protected Admin Management Portal
│   │   ├── login/              # Admin Sign In
│   │   ├── page.tsx            # Dashboard Overview & Metrics
│   │   ├── gallery/            # Cloudinary project upload & category manager
│   │   ├── services/           # Services CRUD
│   │   ├── products/           # Products CRUD
│   │   ├── quotes/             # Quote Inquiries Inbox & CSV Export
│   │   ├── messages/           # Contact Messages Inbox
│   │   ├── testimonials/       # Reviews moderation & Approve/Reject toggle
│   │   └── settings/           # Site settings & SEO defaults (Admin Only)
│   └── api/                    # REST API route handlers
├── components/                 # Reusable UI components & Schema generators
├── lib/                        # DB client, Auth client, Cloudinary, Mailer, Validations
├── drizzle/                    # Drizzle SQL migrations
├── scripts/                    # Migration, seed, and verification scripts
└── public/                     # Static assets, robots.txt, sitemap.xml
```

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env.local` and add your credentials:
```bash
cp .env.example .env.local
```

### 3. Apply Migrations & Seed Database
```bash
npm run db:migrate
npm run db:seed
```

### 4. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) for the public site, and [http://localhost:3000/admin](http://localhost:3000/admin) for the admin portal.

---

## 🛠️ Verification & Build Commands

- `npm run build` — Builds the production bundle and generates sitemaps.
- `npm run db:migrate` — Executes Drizzle migrations directly on Neon PostgreSQL.
- `npm run db:seed` — Seeds default administrator profile, catalog items, and site settings.
- `npm run db:studio` — Launches Drizzle Studio for visual database inspection.

---

## 📖 Deployment Guide

See [DEPLOYMENT.md](file:///d:/VS%20CODE/Al%20Syed%20Aluminium%20Fabrications/DEPLOYMENT.md) for full production deployment instructions on Vercel and Neon.
