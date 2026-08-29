# Deployment & Launch Guide

**Business**: Al Syed Aluminium and Glass Fabrications  
**Location**: Pak Land City Center, Office No. 05, I-8 Markaz, Islamabad  
**Contact**: 0337 9289079 | alsyedaluminium@gmail.com  
**Stack**: Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS, Neon Serverless PostgreSQL, Drizzle ORM, Better Auth, Cloudinary, Resend.

---

## 1. Production Deployment on Vercel

### Step 1: Push Code to GitHub / Git Repository
```bash
git add .
git commit -m "feat: complete Al Syed website & admin portal"
git push origin main
```

### Step 2: Import Project to Vercel
1. Go to [vercel.com/new](https://vercel.com/new).
2. Select your repository.
3. Framework Preset: **Next.js**.
4. Root Directory: `./` (leave default).

---

## 2. Production Environment Variables Checklist

Add the following environment variables in **Vercel Project Settings → Environment Variables**:

| Variable Name | Description | Example / Current Value |
|---|---|---|
| `DATABASE_URL` | Neon PostgreSQL pooled connection string with SSL | `postgresql://neondb_owner:npg_MpmTu6D5yeGz@ep-flat-sound-ayy374tz-pooler.c-5.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require` |
| `NEXT_PUBLIC_APP_URL` | Production website URL (with https) | `https://alsyedfabrications.com` |
| `BETTER_AUTH_SECRET` | 32+ character random secret key for session signing | `alsyed_super_secret_auth_key_2026_secure_fabrication_token_xyz99` |
| `BETTER_AUTH_URL` | Base URL for auth callbacks | `https://alsyedfabrications.com` |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary Cloud Name | `lpcqpx7a` |
| `CLOUDINARY_API_KEY` | Cloudinary API Key | `349187281517524` |
| `CLOUDINARY_API_SECRET` | Cloudinary API Secret | `3QaL90IL8x4EP8pXJbWlonl3c4o` |
| `CLOUDINARY_URL` | Cloudinary URL Connection String | `cloudinary://349187281517524:3QaL90IL8x4EP8pXJbWlonl3c4o@lpcqpx7a` |
| `RESEND_API_KEY` | Resend API key for sending alert emails | `re_your_live_resend_api_key` |
| `ADMIN_NOTIFICATION_EMAIL`| Recipient email for quote & contact alerts | `alsyedaluminium@gmail.com` |
| `SEED_ADMIN_EMAIL` | Default administrator sign-in email | `alsyedaluminium@gmail.com` |
| `SEED_ADMIN_PASSWORD` | Default administrator password | `AlSyed@Admin2026!` |
| `SEED_ADMIN_NAME` | Default administrator full name | `Al Syed Admin` |

---

## 3. Database Migration & Initial Seeding on Neon

Once your Neon PostgreSQL database is connected, execute the migration and seed commands locally or via CI/CD:

```bash
# 1. Apply all database schema tables
npm run db:migrate

# 2. Seed default admin credentials, catalog, and site settings
npm run db:seed
```

---

## 4. Post-Deployment Manual Checklist Before Public Launch

### 1. Custom Domain & DNS Setup
1. In Vercel, go to **Settings → Domains** and add your custom domain (e.g., `alsyedfabrications.com` & `www.alsyedfabrications.com`).
2. Add DNS records at your domain registrar (Namecheap, GoDaddy, Cloudflare):
   - **Type A**: `@` → `76.76.21.21` (Vercel IP)
   - **Type CNAME**: `www` → `cname.vercel-dns.com`
3. Update `NEXT_PUBLIC_APP_URL` and `BETTER_AUTH_URL` in Vercel to match your final domain.

### 2. Google Search Console & Sitemaps
1. Add property in [Google Search Console](https://search.google.com/search-console).
2. Submit your sitemap at: `https://alsyedfabrications.com/sitemap.xml`.
3. Verify that `https://alsyedfabrications.com/robots.txt` disallows `/admin*` and allows `/`.

### 3. Google Business Profile (GBP) Verification & Local SEO
To dominate local search results in Islamabad & Rawalpindi:
1. Claim / Create **"Al Syed Aluminium and Glass Fabrications"** on [Google Business Profile](https://business.google.com/).
2. Set Primary Category: **"Aluminium Window Manufacturer"** or **"Glass & Mirror Shop"**.
3. Match exact NAP:
   - **Name**: Al Syed Aluminium & Glass Fabrications
   - **Address**: Pak Land City Center, Office No. 05, I-8 Markaz, Islamabad, 44000
   - **Phone**: `0337 9289079`
   - **Website**: `https://alsyedfabrications.com`
4. Upload photos from the project gallery to your GBP.

### 4. Resend Live Domain Verification (Optional but Recommended)
1. In [Resend Dashboard](https://resend.com/domains), add your sending domain (e.g., `quotes@alsyedfabrications.com`).
2. Add the provided DKIM and SPF TXT records to your DNS provider to avoid spam filters.
