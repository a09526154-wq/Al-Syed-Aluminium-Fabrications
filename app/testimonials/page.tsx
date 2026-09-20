import type { Metadata } from "next";
import Image from "next/image";
import { db } from "@/lib/db";
import { testimonials } from "@/lib/schema";
import { eq, desc } from "drizzle-orm";
import { TestimonialModal } from "@/components/TestimonialModal";
import { TestimonialsJsonLd } from "@/components/JsonLd";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { Star, Quote, CheckCircle2 } from "lucide-react";

const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "https://alsyedfabrications.com";

export const metadata: Metadata = {
  title: "Client Reviews & Testimonials | Al Syed Aluminium & Glass Islamabad",
  description:
    "Read genuine reviews and ratings from residential and commercial clients across Islamabad and Rawalpindi for Al Syed Aluminium & Glass Fabrications.",
  keywords: [
    "Al Syed Aluminium Reviews",
    "Aluminium Fabricators Reviews Islamabad",
    "Glass Works Testimonials Islamabad",
    "Best Aluminium Contractor Islamabad",
    "I-8 Markaz Aluminium Reviews",
  ],
  alternates: {
    canonical: `${siteUrl}/testimonials`,
  },
  openGraph: {
    title: "Client Reviews & Testimonials | Al Syed Aluminium Islamabad",
    description:
      "See what property owners, builders, and architects say about our precision aluminium and glass fabrications.",
    url: `${siteUrl}/testimonials`,
    images: [
      {
        url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
        width: 1200,
        height: 630,
        alt: "Client Reviews - Al Syed Aluminium & Glass Fabrications",
      },
    ],
  },
};

export const revalidate = 60;

export default async function TestimonialsPage() {
  const approvedTestimonials = await db
    .select()
    .from(testimonials)
    .where(eq(testimonials.approved, true))
    .orderBy(desc(testimonials.createdAt));

  // Helper for author initials
  const getInitials = (name: string) => {
    const cleanName = name.replace(/^(Engr\.|Dr\.|Mr\.|Mrs\.|Brig\.)\s+/i, "");
    const parts = cleanName.trim().split(/\s+/);
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return (parts[0]?.slice(0, 2) || "AS").toUpperCase();
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <TestimonialsJsonLd reviews={approvedTestimonials} />

      {/* ── HERO BANNER ───────────────────────────────────────────── */}
      <section className="relative text-white pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=85&w=2000&auto=format&fit=crop"
            alt="Al Syed Architectural Glass & Aluminium Client Trust"
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
            Verified Customer Satisfaction · Islamabad &amp; Rawalpindi
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight max-w-4xl mx-auto [text-shadow:_0_2px_12px_rgba(0,0,0,0.85)]">
            Client Reviews &amp; Proven Trust
          </h1>
          <p className="text-base sm:text-lg text-white max-w-2xl mx-auto mt-6 leading-relaxed [text-shadow:_0_1px_8px_rgba(0,0,0,0.85)]">
            Read firsthand feedback from homeowners, corporate project managers, and architects who rely on our precision aluminium and glass fabrications.
          </p>
        </div>
      </section>

      {/* ── TESTIMONIALS GRID ───────────────────────────────────────── */}
      <section className="py-20 lg:py-24 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="flex items-center justify-center gap-4 mb-3">
              <span className="flex-1 max-w-[80px] h-[2px] bg-secondary rounded-full" />
              <h2 className="text-3xl sm:text-4xl font-extrabold text-on-surface tracking-tight">
                What Our Clients Say
              </h2>
              <span className="flex-1 max-w-[80px] h-[2px] bg-secondary rounded-full" />
            </div>
            <p className="text-base sm:text-lg text-on-surface-variant mt-3 leading-relaxed">
              Every review reflects our commitment to heavy-gauge aluminium profiles, certified safety glass, and punctual on-site execution.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <TestimonialModal />
              <a
                href="https://wa.me/923379289079?text=Hello%20Al%20Syed%20Fabrications,%20I%20would%20like%20to%20share%20my%20feedback."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center space-x-2 h-14 px-8 rounded-full bg-white hover:bg-neutral-50 text-on-surface font-semibold text-sm border border-outline-variant transition-all shadow-sm hover:shadow-md"
              >
                <WhatsAppIcon className="w-5 h-5 shrink-0 text-green-600" />
                <span>WhatsApp Feedback</span>
              </a>
            </div>
          </div>

          {approvedTestimonials.length === 0 ? (
            <div className="bg-white rounded-2xl p-16 text-center max-w-lg mx-auto border border-outline-variant shadow-sm">
              <Quote className="w-12 h-12 text-secondary/30 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-on-surface">No Reviews Yet</h3>
              <p className="text-sm text-on-surface-variant mt-2 max-w-sm mx-auto leading-relaxed">
                Be the first to share your experience with our architectural fabrication team!
              </p>
              <div className="mt-8">
                <TestimonialModal />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {approvedTestimonials.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl p-7 shadow-sm hover:shadow-lg border border-outline-variant hover:border-secondary/30 transition-all duration-300 flex flex-col justify-between relative overflow-hidden group"
                >
                  <Quote className="absolute -top-4 -right-4 w-24 h-24 text-secondary/5 rotate-12 transition-transform group-hover:scale-110 group-hover:text-secondary/10" />
                  
                  <div className="space-y-5 relative z-10">
                    {/* Star Rating Strip */}
                    <div className="flex items-center space-x-1">
                      {Array.from({ length: item.rating }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                      ))}
                      {Array.from({ length: 5 - item.rating }).map((_, i) => (
                        <Star key={`empty-${i}`} className="w-4 h-4 text-neutral-300" />
                      ))}
                    </div>

                    {/* Message Body */}
                    <p className="text-sm text-on-surface-variant leading-relaxed italic line-clamp-6">
                      &ldquo;{item.message}&rdquo;
                    </p>
                  </div>

                  {/* Author Block */}
                  <div className="mt-8 pt-5 border-t border-outline-variant flex items-center space-x-4 relative z-10">
                    <div className="w-11 h-11 rounded-full bg-secondary text-white font-bold text-sm flex items-center justify-center shrink-0 shadow-inner">
                      {getInitials(item.clientName)}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-on-surface line-clamp-1">
                        {item.clientName}
                      </h4>
                      <div className="flex items-center space-x-1.5 mt-0.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-green-500 shrink-0" />
                        <span className="text-xs text-on-surface-variant">Verified Client</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
