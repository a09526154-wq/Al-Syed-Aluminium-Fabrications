# Al Syed Aluminium & Glass Fabrications — Website Project Spec

**Location:** I-8 Markaz, Pak Land City Center, Office No. 05, Islamabad
**WhatsApp:** 0337 9289079 | **Email:** alsyedaluminium@gmail.com

---

## 1. Sitemap / Pages

### Public Website
| Page | Purpose |
|---|---|
| **Home** | Hero banner, services overview, why-choose-us, featured projects, CTA |
| **About Us** | Company history, experience, certifications, team |
| **Services** | Aluminium windows, glass doors, curtain walls, glass railings, ACP cladding, shower enclosures, structural glazing — each can have its own sub-page for SEO |
| **Products** | Aluminium profile types, glass types (tempered, laminated, tinted, frosted) with specs |
| **Gallery / Portfolio** | Categorized project photos (residential, commercial, before/after) |
| **Get a Quote** | Form: project type, dimensions, location, photo upload |
| **Testimonials** | Client reviews |
| **Blog / News** *(optional)* | Local SEO content — "aluminium door prices Islamabad," project case studies |
| **Contact Us** | Google Maps (I-8 Markaz), phone, WhatsApp button, email, contact form |

### Admin Panel
- Secure login (role-based: admin / staff)
- Dashboard — quote requests, messages, quick stats
- Manage Gallery — upload/organize/delete by category
- Manage Services/Products — add/edit/remove with images & descriptions
- Quote Requests inbox — status tracking (new/contacted/closed), export
- Contact Messages inbox
- Testimonials management — approve/edit/delete
- Blog editor *(if included)*
- Settings — company info, phone numbers, social links, SEO meta per page

---

## 2. Tech Stack

| Layer | Technology | Why |
|---|---|---|
| Framework | **Next.js (App Router)** | SSR/SSG for SEO, one codebase for frontend + backend API routes |
| Styling | **Tailwind CSS** | Fast, consistent, easy to theme |
| ORM | **Drizzle ORM** | Lightweight, type-safe, pairs well with Postgres + Better Auth |
| Database | **PostgreSQL** (via **Neon**) | Reliable, scalable, serverless-friendly — pairs well with Vercel/Next.js |
| Auth | **Better Auth** | TypeScript-first, built-in role/permission support, own session control — ideal for a small admin/staff login system |
| Image Storage | **Cloudinary** | Automatic optimization, responsive delivery, format conversion — critical for a photo-heavy gallery |
| Validation | **Zod** | Type-safe form & API validation |
| Email Notifications | **Resend** | Instant admin alerts on new quote requests |
| Hosting | **Vercel** (app) + **Neon** (DB) | Low maintenance, scales easily, good free tier to start |

### Structure
```
Next.js (App Router)
 ├─ Public site (SSR/SSG pages — SEO optimized)
 ├─ /admin (protected via Better Auth middleware)
 ├─ /api (route handlers: quotes, gallery, contact, auth)
 ├─ Drizzle + PostgreSQL (Neon)
 ├─ Better Auth (email/password, admin/staff roles)
 └─ Cloudinary (image upload & optimization)
```

---

## 3. Color Theme

Derived from your poster (navy + gold, premium) and logo (blue, trust/corporate) — unified into one system.

| Role | Color | Hex | Usage |
|---|---|---|---|
| Primary (dark base) | Deep Navy / Charcoal | `#0B0F1A` / `#0F1420` | Header, footer, hero background |
| Accent (luxury) | Gold / Bronze | `#C9A24B` / `#D4AF6A` | CTAs, headings, dividers, "Get a Quote" buttons |
| Secondary (brand blue) | Logo Blue | `#1E5FA8` / `#2C74C9` | Links, icons, hover states, admin panel primary color |
| Neutral light | Off-white / Light Gray | `#F7F8FA` | Section backgrounds, cards |
| Text (dark) | Near-black | `#1A1D24` | Body text on light backgrounds |
| Text (light) | White / Soft white | `#FFFFFF` / `#EAEAEA` | Copy on navy backgrounds |
| WhatsApp accent | WhatsApp Green | `#25D366` | WhatsApp button only |

**Application:**
- Hero: navy background, gold headline accents, real project photo
- Service cards: white/light cards, navy or gold icons (matching poster's 4 icons)
- Buttons: gold = primary CTA, blue = secondary actions
- Admin panel: lighter base (white/gray), blue as primary UI color, gold reserved for highlights
- Footer: navy background, gold social/WhatsApp icons, white text

---

## 4. SEO Strategy

### Technical SEO
- **Next.js SSR/SSG** — pages pre-rendered for fast load + full crawlability (critical vs. client-only React)
- **Metadata API** (Next.js `generateMetadata`) — unique title, description, Open Graph tags per page
- **Structured data (JSON-LD)** — `LocalBusiness` schema with NAP (Name, Address, Phone), `Service` schema per service page, `Review` schema for testimonials
- **Sitemap.xml + robots.txt** — auto-generated via `next-sitemap`
- **Image optimization** — Cloudinary `f_auto`/`q_auto` + `next/image` for fast Core Web Vitals (LCP)
- **Mobile-first responsive design** — most local searches happen on mobile
- **Fast load times** — minimize JS, lazy-load gallery images below the fold
- **Canonical URLs** — avoid duplicate content issues
- **HTTPS + clean URL structure** — `/services/aluminium-windows` not `/page?id=3`

### Local SEO (most important for this business)
- **Google Business Profile** — claim/verify listing for I-8 Markaz, Islamabad; link to website
- **NAP consistency** — same Name/Address/Phone format across website, GBP, and directories
- **Google Maps embed** on Contact page
- **Location-specific keywords** — "aluminium fabricator I-8 Islamabad," "glass railing installation Islamabad," naturally placed in headings/content, not stuffed
- **City/area landing content** — mention Islamabad/Rawalpindi service areas across relevant pages

### Content SEO
- Blog posts targeting long-tail local searches (e.g., "aluminium window price in Islamabad 2026")
- Alt text on every gallery/project image (also helps accessibility)
- Internal linking between services, blog, and gallery pages
- Testimonials/reviews as fresh, unique content signals

---

## 5. Suggested Build Order
1. Next.js project scaffold + Tailwind + design system (colors/typography)
2. Drizzle schema: users, services, products, gallery, quotes, testimonials, blog
3. Better Auth setup (admin/staff roles)
4. Public pages (Home → Services → Gallery → Contact → Quote form)
5. Admin panel (CRUD for gallery, services, quotes, testimonials)
6. Cloudinary integration for uploads
7. SEO pass (metadata, schema, sitemap) + performance audit
8. Deploy (Vercel + Neon)
