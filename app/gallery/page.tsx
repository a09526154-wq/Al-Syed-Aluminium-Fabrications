import type { Metadata } from "next";
import Link from "next/link";
import { db } from "@/lib/db";
import { galleryItems } from "@/lib/schema";
import { desc } from "drizzle-orm";
import { GalleryView } from "@/components/GalleryView";
import { Sparkles, ArrowRight, MessageCircle, FileText } from "lucide-react";

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
    <div className="flex flex-col min-h-screen">
      {/* Hero Header */}
      <section className="bg-primary text-text-light py-16 lg:py-20 border-b border-primary-surface relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-primary-surface border border-accent/40 text-accent text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Completed Architectural Work</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Our Project Gallery
          </h1>
          <p className="text-base sm:text-lg text-text-soft/90 max-w-2xl mx-auto mt-3">
            Explore a curated selection of residential and commercial aluminium windows, glass doors, curtain wall facades, and custom glass installations across Islamabad & Rawalpindi.
          </p>
        </div>
      </section>

      {/* Main Gallery Section */}
      <section className="py-20 bg-neutral-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <GalleryView items={allGalleryItems} />
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-primary text-text-light py-16 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
            Have a Similar Project in Mind?
          </h3>
          <p className="text-sm text-text-soft/80 max-w-lg mx-auto mb-8">
            Send us your photos or blueprints for a free fabrication estimate and on-site survey.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/quote"
              className="inline-flex items-center space-x-2 bg-accent hover:bg-accent-light text-primary font-bold px-7 py-3.5 rounded-xl text-sm transition-all shadow"
            >
              <FileText className="w-4 h-4" />
              <span>Request a Quote with Photos</span>
            </Link>
            <a
              href="https://wa.me/923379289079"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-whatsapp hover:bg-whatsapp-hover text-white font-semibold px-7 py-3.5 rounded-xl text-sm transition-all shadow"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Direct: 0337 9289079</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
