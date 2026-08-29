import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
dotenv.config();

import { auth } from "../lib/auth";
import { db } from "../lib/db";
import {
  siteSettings,
  user,
  account,
  services,
  products,
  galleryItems,
  testimonials,
} from "../lib/schema";
import { eq } from "drizzle-orm";

async function seed() {
  console.log("🌱 Starting database seeding...");

  const adminEmail = process.env.SEED_ADMIN_EMAIL || "alsyedaluminium@gmail.com";
  const adminPassword = process.env.SEED_ADMIN_PASSWORD || "AlSyed@Admin2026!";
  const adminName = process.env.SEED_ADMIN_NAME || "Al Syed Admin";

  if (!process.env.DATABASE_URL) {
    console.error("❌ DATABASE_URL is not defined in environment.");
    process.exit(1);
  }

  try {
    // 1. Admin User Seeding
    const existingUser = await db
      .select()
      .from(user)
      .where(eq(user.email, adminEmail))
      .limit(1);

    if (existingUser.length > 0) {
      const existingAccount = await db
        .select()
        .from(account)
        .where(eq(account.userId, existingUser[0].id))
        .limit(1);

      if (existingAccount.length === 0) {
        console.log(`ℹ️ Cleaning incomplete user profile for (${adminEmail}) to re-seed credentials...`);
        await db.delete(user).where(eq(user.id, existingUser[0].id));
        const res = await auth.api.signUpEmail({
          body: {
            email: adminEmail,
            password: adminPassword,
            name: adminName,
          },
        });
        if (res?.user?.id) {
          await db
            .update(user)
            .set({ role: "admin", emailVerified: true })
            .where(eq(user.id, res.user.id));
          console.log(`✅ Admin user re-seeded successfully with ID: ${res.user.id}`);
        }
      } else {
        console.log(`ℹ️ Admin user (${adminEmail}) and credentials already exist.`);
      }
    } else {
      console.log(`👤 Creating admin user: ${adminEmail} ...`);
      const res = await auth.api.signUpEmail({
        body: {
          email: adminEmail,
          password: adminPassword,
          name: adminName,
        },
      });

      if (res?.user?.id) {
        await db
          .update(user)
          .set({ role: "admin", emailVerified: true })
          .where(eq(user.id, res.user.id));
        console.log(`✅ Admin user created successfully with ID: ${res.user.id}`);
      }
    }

    // 2. Site Settings
    console.log("⚙️ Seeding default site settings...");
    const defaultSettings = [
      { key: "company_name", value: "Al Syed Aluminium & Glass Fabrications" },
      {
        key: "company_address",
        value: "Pak Land City Center, Office No. 05, I-8 Markaz, Islamabad",
      },
      { key: "company_phone", value: "0337 9289079" },
      { key: "company_whatsapp", value: "0337 9289079" },
      { key: "company_email", value: "alsyedaluminium@gmail.com" },
      { key: "operating_hours", value: "Mon - Sat: 9:00 AM - 8:00 PM" },
      {
        key: "seo_meta_title",
        value: "Al Syed Aluminium & Glass Fabrications | I-8 Markaz, Islamabad",
      },
      {
        key: "seo_meta_description",
        value:
          "Islamabad's premier architectural aluminium windows, tempered glass doors, curtain wall facades, and modern glass railings.",
      },
    ];

    for (const setting of defaultSettings) {
      await db
        .insert(siteSettings)
        .values({
          key: setting.key,
          value: setting.value,
          updatedAt: new Date(),
        })
        .onConflictDoUpdate({
          target: siteSettings.key,
          set: { value: setting.value, updatedAt: new Date() },
        });
    }

    // 3. Services Seeding
    console.log("🛠️ Seeding Services...");
    const initialServices = [
      {
        title: "Aluminium Windows",
        slug: "aluminium-windows",
        description:
          "High-performance sliding, casement, fixed, and tilt-and-turn aluminium window systems with thermal break options, acoustic insulation, and weatherproof seals.",
        iconOrImage: "window",
        order: 1,
      },
      {
        title: "Glass Doors & Partitions",
        slug: "glass-doors",
        description:
          "Sleek frameless 12mm tempered glass doors, automatic sliding doors, swing doors, and modern office glass partitions designed for transparency and luxury.",
        iconOrImage: "door",
        order: 2,
      },
      {
        title: "Curtain Walls & Facades",
        slug: "curtain-walls",
        description:
          "Engineered structural glazing and exterior curtain wall systems designed for high-rise commercial buildings, modern plazas, and luxury residences.",
        iconOrImage: "building",
        order: 3,
      },
      {
        title: "Glass Railings & Balustrades",
        slug: "glass-railings",
        description:
          "Contemporary frameless and stainless-steel supported safety glass railings for staircases, balconies, terrace perimeters, and mezzanine floors.",
        iconOrImage: "shield",
        order: 4,
      },
      {
        title: "Shower Enclosures & Cabins",
        slug: "shower-enclosures",
        description:
          "Custom-measured tempered glass shower cabins, frameless walk-in screens, and luxury bathroom partitions featuring anti-stain glass coating.",
        iconOrImage: "bath",
        order: 5,
      },
      {
        title: "ACP Panel Cladding",
        slug: "acp-cladding",
        description:
          "Durable Aluminium Composite Panel (ACP) exterior cladding providing weather resistance, modern aesthetics, and thermal insulation for commercial fronts.",
        iconOrImage: "layers",
        order: 6,
      },
    ];

    for (const s of initialServices) {
      const exists = await db
        .select()
        .from(services)
        .where(eq(services.slug, s.slug))
        .limit(1);

      if (exists.length === 0) {
        await db.insert(services).values(s);
      } else {
        await db.update(services).set(s).where(eq(services.slug, s.slug));
      }
    }

    // 4. Products Seeding
    console.log("📦 Seeding Products...");
    const initialProducts = [
      {
        name: "Thermal Break Aluminium Profile Series",
        category: "Aluminium Profiles",
        description:
          "Top-tier energy-efficient aluminium profile designed to eliminate heat transfer, condensation, and maximize acoustic insulation.",
        specs:
          "Alloy 6063-T6, Multi-chamber polyamide insulation bar, Powder-coated / Anodized finish, Double/Triple glass compatible",
        imageUrl:
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop",
      },
      {
        name: "Heavy-Duty Sliding Window Profile (100mm Series)",
        category: "Aluminium Profiles",
        description:
          "Engineered for smooth gliding, high wind-load resistance, multi-track sliding options, and large architectural glass spans.",
        specs:
          "Wall thickness 1.6mm - 2.0mm, Heavy-duty nylon roller bearings, EPDM weather seals, Multi-point locking system",
        imageUrl:
          "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=800&auto=format&fit=crop",
      },
      {
        name: "Slimline Minimalist Casement Series",
        category: "Aluminium Profiles",
        description:
          "Contemporary minimalist profile maximizing natural daylight, clean sightlines, and uninterrupted outdoor views.",
        specs:
          "Ultra-slim sightlines (45mm), Concealed heavy-duty hinges, Friction stay mechanism, Acoustic gasket",
        imageUrl:
          "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=800&auto=format&fit=crop",
      },
      {
        name: "12mm Clear Tempered Safety Glass",
        category: "Glass Types",
        description:
          "High-strength thermally toughened safety glass with polished flat edges, ideal for frameless doors and structural railings.",
        specs:
          "Thickness 12mm, Impact resistance 5x standard glass, Conforms to BS 6206 / ANSI Z97.1 safety standards",
        imageUrl:
          "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop",
      },
      {
        name: "Double Glazed Acoustic Insulated Glass (6mm + 12A + 6mm)",
        category: "Glass Types",
        description:
          "Double glazed sealed unit offering high sound dampening for noisy urban environments and superior thermal retention.",
        specs:
          "Sound reduction up to 38dB, Argon gas filled cavity, Low-E coating, Thermal U-value 1.4 W/m²K",
        imageUrl:
          "https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?q=80&w=800&auto=format&fit=crop",
      },
      {
        name: "Tinted & Reflective Solar Glass",
        category: "Glass Types",
        description:
          "Solar control glass engineered to reduce glare, block damaging UV rays, and maintain daytime privacy for commercial facades.",
        specs:
          "Colors: Bronze, Euro Grey, Dark Blue, Green, Solar heat gain reduction up to 60%",
        imageUrl:
          "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop",
      },
      {
        name: "Acid-Etched Frosted Privacy Glass",
        category: "Glass Types",
        description:
          "Translucent frosted glass providing soft diffused light transmission while ensuring complete visual privacy.",
        specs:
          "Fingerprint resistant surface, Uniform satin finish, 8mm & 10mm thickness options",
        imageUrl:
          "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800&auto=format&fit=crop",
      },
    ];

    const currentProducts = await db.select().from(products);
    if (currentProducts.length === 0) {
      for (const p of initialProducts) {
        await db.insert(products).values(p);
      }
      console.log(`✅ Seeded ${initialProducts.length} products.`);
    }

    // 5. Gallery Items Seeding
    console.log("🖼️ Seeding Gallery Items...");
    const initialGallery = [
      {
        title: "Commercial Facade & Curtain Wall Installation",
        category: "commercial",
        projectType: "Commercial Plaza",
        imageUrl:
          "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop",
      },
      {
        title: "Luxury Villa Modern Aluminium Windows",
        category: "residential",
        projectType: "Luxury Residence",
        imageUrl:
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
      },
      {
        title: "Frameless Glass Railing on Terrace Balcony",
        category: "residential",
        projectType: "Penthouse Balcony",
        imageUrl:
          "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=1200&auto=format&fit=crop",
      },
      {
        title: "Corporate Office Frameless Glass Partitions",
        category: "commercial",
        projectType: "Corporate Office",
        imageUrl:
          "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop",
      },
      {
        title: "Custom Sliding Windows & Glass Balustrade",
        category: "residential",
        projectType: "Modern Residence",
        imageUrl:
          "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200&auto=format&fit=crop",
      },
      {
        title: "High-Rise Structural Glazing & ACP Cladding",
        category: "commercial",
        projectType: "Commercial Plaza",
        imageUrl:
          "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1200&auto=format&fit=crop",
      },
    ];

    const currentGallery = await db.select().from(galleryItems);
    if (currentGallery.length === 0) {
      for (const g of initialGallery) {
        await db.insert(galleryItems).values(g);
      }
      console.log(`✅ Seeded ${initialGallery.length} gallery items.`);
    }

    // 6. Testimonials Seeding
    console.log("⭐ Seeding Testimonials...");
    const initialTestimonials = [
      {
        clientName: "Engr. Khalid Mansoor (Sector F-7/2, Islamabad)",
        message:
          "Al Syed installed thermal break sliding windows and 12mm frameless shower enclosures in our newly constructed villa. The acoustic insulation and sliding smoothness are remarkable. Punctual delivery and clean installation.",
        rating: 5,
        approved: true,
      },
      {
        clientName: "Apex Corporate Center (Blue Area, Islamabad)",
        message:
          "We contracted Al Syed for double-glazed structural curtain walls and office glass partitions. Their engineering team in I-8 Markaz provided exceptional precision and adhered strictly to our architect's specifications.",
        rating: 5,
        approved: true,
      },
      {
        clientName: "Dr. Farooq Qureshi (Bahria Town Phase 4, Rawalpindi)",
        message:
          "Replaced all wooden windows with Al Syed's heavy-duty 100mm aluminium series and installed stainless steel glass railings on the rooftop. Outstanding workmanship, highly recommended!",
        rating: 5,
        approved: true,
      },
      {
        clientName: "Naseem Akhtar (Sector G-13, Islamabad)",
        message:
          "Very professional team. They gave a transparent quote on WhatsApp, came on-site for laser measurement the next day, and delivered ahead of schedule. 5 stars for quality!",
        rating: 5,
        approved: true,
      },
    ];

    const currentTestimonials = await db.select().from(testimonials);
    if (currentTestimonials.length === 0) {
      for (const t of initialTestimonials) {
        await db.insert(testimonials).values(t);
      }
      console.log(`✅ Seeded ${initialTestimonials.length} approved testimonials.`);
    }

    console.log("🎉 Database seeding completed successfully.");
  } catch (error) {
    console.error("❌ Seeding error:", error);
    process.exit(1);
  }
}

seed();
