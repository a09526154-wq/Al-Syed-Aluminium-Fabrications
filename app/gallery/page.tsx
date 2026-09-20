import type { Metadata } from "next";
import Link from "next/link";
import { db } from "@/lib/db";
import { galleryItems } from "@/lib/schema";
import { desc } from "drizzle-orm";
import { GalleryView } from "@/components/GalleryView";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "https://alsyedfabrications.com";

export const metadata: Metadata = {
  title: "Project Gallery & Portfolio | Al Syed Aluminium & Glass Islamabad",
  description:
    "View our portfolio of completed architectural aluminium and glass projects across Islamabad and Rawalpindi: luxury residential windows, frameless glass railings, commercial curtain walls, and shower cabins.",
  keywords: [
    "Aluminium Windows Gallery Islamabad",
    "Glass Railing Projects Rawalpindi",
    "Curtain Wall Portfolio Islamabad",
    "Al Syed Fabrications Photos",
  ],
  alternates: {
    canonical: `${siteUrl}/gallery`,
  },
  openGraph: {
    title: "Project Gallery & Portfolio | Al Syed Aluminium & Glass Islamabad",
    description:
      "Explore a curated selection of residential and commercial aluminium windows, glass doors, curtain wall facades, and custom glass installations.",
    url: `${siteUrl}/gallery`,
    images: [
      {
        url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop",
        width: 1200,
        height: 630,
        alt: "Project Gallery - Al Syed Aluminium & Glass Fabrications",
      },
    ],
  },
};

export const revalidate = 60;

export default async function GalleryPage() {
  const allGalleryItems = await db
    .select()
    .from(galleryItems)
    .orderBy(desc(galleryItems.createdAt));

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* ── HERO BANNER ───────────────────────────────────────────── */}
      <section className="relative text-white pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=85&w=2000&auto=format&fit=crop"
            alt="Al Syed Architectural Projects Gallery"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/25 to-black/60" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-secondary-light mb-4 [text-shadow:_0_1px_6px_rgba(0,0,0,0.8)]">
            Completed Architectural Work
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight [text-shadow:_0_2px_12px_rgba(0,0,0,0.85)]">
            Our Project Gallery
          </h1>
          <p className="text-base sm:text-lg text-white max-w-2xl mx-auto mt-6 leading-relaxed [text-shadow:_0_1px_8px_rgba(0,0,0,0.85)]">
            Explore a curated selection of residential and commercial aluminium windows, glass doors, curtain wall facades, and custom glass installations across Islamabad &amp; Rawalpindi.
          </p>
        </div>
      </section>

      {/* ── MAIN GALLERY SECTION ──────────────────────────────────── */}
      <section className="py-20 lg:py-24 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <GalleryView items={allGalleryItems} />
        </div>
      </section>

      {/* ── BOTTOM CTA ────────────────────────────────────────────── */}
      <section className="relative text-white py-16 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=85&w=2000&auto=format&fit=crop"
            alt="Architectural aluminium project"
            fill
            sizes="100vw"
            className="object-cover object-center"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/25 to-black/60" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight [text-shadow:_0_2px_12px_rgba(0,0,0,0.85)] mb-5">
            Have a Similar Project in Mind?
          </h2>
          <p className="text-base sm:text-lg text-white max-w-2xl mx-auto mb-10 leading-relaxed [text-shadow:_0_1px_8px_rgba(0,0,0,0.85)]">
            Send us your photos or blueprints for a free fabrication estimate and on-site survey.
          </p>

          <Link
            href="/contact"
            className="group inline-flex items-center justify-center space-x-2.5 h-14 px-10 rounded-full bg-secondary hover:bg-secondary-hover text-white font-semibold text-base shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>Contact Us</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
  );
}
