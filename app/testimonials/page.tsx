import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { db } from "@/lib/db";
import { testimonials } from "@/lib/schema";
import { eq, desc } from "drizzle-orm";
import { TestimonialModal } from "@/components/TestimonialModal";
import { TestimonialsJsonLd } from "@/components/JsonLd";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import {
  Star,
  Quote,
  ShieldCheck,
  Building,
  Sparkles,
  ArrowRight,
  Phone,
  CheckCircle2,
  Award,
  ThumbsUp,
  MapPin,
} from "lucide-react";

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
    <div className="flex flex-col min-h-screen bg-neutral-light">
      <TestimonialsJsonLd reviews={approvedTestimonials} />

      {/* ============================================================ */}
      {/* 1. HERO BANNER */}
      {/* ============================================================ */}
      <section className="relative bg-[#0B0F1A] text-white py-20 lg:py-28 overflow-hidden border-b border-white/10">
        {/* Background Image Layer */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=85&w=2000&auto=format&fit=crop"
            alt="Al Syed Architectural Glass & Aluminium Client Trust"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center scale-105 opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B0F1A]/90 via-[#0B0F1A]/85 to-[#0B0F1A]" />
          <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_right,#ffffff15_1px,transparent_1px),linear-gradient(to_bottom,#ffffff15_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-accent text-xs font-semibold uppercase tracking-wider mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Verified Customer Satisfaction • Islamabad & Rawalpindi</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight max-w-4xl mx-auto">
            Client Reviews &{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-[#F3E5AB] to-accent-light">
              Proven Trust
            </span>
          </h1>

          <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto mt-6 leading-relaxed">
            Read firsthand feedback from homeowners, corporate project managers, and architects who rely on our precision aluminium and glass fabrications.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <TestimonialModal />
            <a
              href="https://wa.me/923379289079?text=Hello%20Al%20Syed%20Fabrications,%20I%20would%20like%20to%20share%20my%20feedback."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3.5 rounded-xl text-sm border border-white/20 backdrop-blur-sm transition-all"
            >
              <WhatsAppIcon className="w-4 h-4 shrink-0" />
              <span>WhatsApp Feedback</span>
            </a>
          </div>

          {/* Metrics Strip */}
          <div className="mt-14 pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto text-center">
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-accent font-mono">4.9 / 5.0</div>
              <p className="text-xs text-gray-400 mt-1 uppercase tracking-wider">Average Rating</p>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">100%</div>
              <p className="text-xs text-gray-400 mt-1 uppercase tracking-wider">Verified Projects</p>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-accent font-mono">Zero Error</div>
              <p className="text-xs text-gray-400 mt-1 uppercase tracking-wider">Laser Sizing</p>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">I-8 Markaz</div>
              <p className="text-xs text-gray-400 mt-1 uppercase tracking-wider">Workshop Hub</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 2. TESTIMONIALS GRID */}
      {/* ============================================================ */}
      <section className="py-24 bg-gradient-to-b from-neutral-light via-white to-neutral-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-secondary">
              Genuine Experiences
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-primary mt-2 tracking-tight">
              What Our Clients Say
            </h2>
            <div className="w-16 h-1 bg-accent mx-auto mt-4 rounded-full" />
            <p className="text-sm sm:text-base text-text-dark/70 mt-4 leading-relaxed">
              Every review reflects our commitment to heavy-gauge aluminium profiles, certified safety glass, and punctual on-site execution.
            </p>
          </div>

          {approvedTestimonials.length === 0 ? (
            <div className="bg-white rounded-3xl p-16 text-center max-w-lg mx-auto border border-neutral-border shadow-sm">
              <Quote className="w-12 h-12 text-secondary/30 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-primary">No Reviews Yet</h3>
              <p className="text-xs sm:text-sm text-text-dark/70 mt-2 max-w-sm mx-auto leading-relaxed">
                Be the first to share your experience with our architectural fabrication team!
              </p>
              <div className="mt-6">
                <TestimonialModal />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {approvedTestimonials.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl border border-neutral-border hover:border-accent/40 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
                >
                  {/* Subtle Background Quote Watermark */}
                  <Quote className="w-24 h-24 text-neutral-border/20 absolute -bottom-4 -right-4 pointer-events-none group-hover:text-accent/10 transition-colors" />

                  <div className="space-y-4 relative z-10">
                    {/* Star Rating Strip */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1 text-accent">
                        {Array.from({ length: item.rating }).map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-accent" />
                        ))}
                      </div>

                      <span className="px-2.5 py-0.5 rounded-full bg-green-50 text-[#25D366] text-[10px] font-bold uppercase tracking-wider border border-green-200 inline-flex items-center space-x-1">
                        <ShieldCheck className="w-3 h-3" />
                        <span>Verified</span>
                      </span>
                    </div>

                    {/* Review Body */}
                    <p className="text-xs sm:text-sm text-text-dark/80 leading-relaxed italic font-normal">
                      &ldquo;{item.message}&rdquo;
                    </p>
                  </div>

                  {/* Client Info Footer */}
                  <div className="mt-6 pt-5 border-t border-neutral-border/80 flex items-center space-x-3.5 relative z-10">
                    {/* Avatar Initials Badge */}
                    <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-primary to-primary-surface text-accent font-extrabold text-xs flex items-center justify-center shrink-0 border border-accent/40 shadow-xs">
                      {getInitials(item.clientName)}
                    </div>

                    {/* Name and Date */}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs sm:text-sm font-bold text-primary truncate">
                        {item.clientName}
                      </h4>
                      <p className="text-[11px] text-text-dark/50 font-mono mt-0.5">
                        {new Date(item.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </section>

      {/* ============================================================ */}
      {/* 3. DIRECT QUOTE CTA BANNER */}
      {/* ============================================================ */}
      <section className="relative text-white py-20 overflow-hidden">
        {/* Background Image with Dark Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=2000&auto=format&fit=crop"
            alt="Architectural facade"
            fill
            sizes="100vw"
            className="object-cover object-center"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B0F1A]/95 via-[#0B0F1A]/88 to-[#0B0F1A]/75" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-accent mb-3">
            Join Our Satisfied Clients
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white max-w-3xl mx-auto leading-tight">
            Ready to Experience Master Architectural Fabrication?
          </h2>
          <p className="text-base sm:text-lg text-gray-300 max-w-xl mx-auto mt-4 mb-8 leading-relaxed">
            Get a transparent quotation or schedule a free on-site laser measurement with our fabrication engineers in Islamabad & Rawalpindi.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/quote"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-accent hover:bg-accent-light text-primary font-bold px-8 py-4 rounded-xl text-base transition-all duration-200 shadow-md hover:-translate-y-0.5"
            >
              <span>Request Free Quote</span>
              <ArrowRight className="w-5 h-5" />
            </Link>

            <a
              href="https://wa.me/923379289079?text=Hello%20Al%20Syed%20Fabrications,%20I%20am%20interested%20in%20discussing%20a%20project."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2.5 bg-[#25D366] hover:bg-[#20BA5A] text-white font-bold px-8 py-4 rounded-xl text-base transition-all duration-200 shadow-md hover:-translate-y-0.5"
            >
              <WhatsAppIcon className="w-5 h-5 shrink-0" />
              <span>WhatsApp: 0337 9289079</span>
            </a>

            <a
              href="tel:+923379289079"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-4 rounded-xl text-base border border-white/20 backdrop-blur-sm transition-all"
            >
              <Phone className="w-5 h-5 text-accent" />
              <span>Call Direct</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
