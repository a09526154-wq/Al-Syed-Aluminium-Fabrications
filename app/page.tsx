import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { db } from "@/lib/db";
import { services, galleryItems } from "@/lib/schema";
import { asc, desc } from "drizzle-orm";
import { HeroSection } from "@/components/HeroSection";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import {
  ShieldCheck,
  Award,
  Sparkles,
  Clock,
  ArrowRight,
  MessageCircle,
  Phone,
  CheckCircle2,
  Layers,
  Building2,
  PanelTop,
  DoorOpen,
} from "lucide-react";

const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "https://alsyedfabrications.com";

export const metadata: Metadata = {
  title: "Al Syed Aluminium & Glass Fabrications | I-8 Markaz, Islamabad",
  description:
    "Quality You Can See, Trust You Can Feel. Islamabad's premier architectural aluminium windows, tempered glass doors, curtain walls, and glass railings fabricator in Pak Land City Center, I-8 Markaz.",
  keywords: [
    "Aluminium Windows Islamabad",
    "Glass Doors Islamabad",
    "Curtain Wall Fabricators I-8 Markaz",
    "Glass Railings Islamabad",
    "Al Syed Aluminium Fabrications",
    "Pak Land City Center Glass Workshop",
  ],
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: "Al Syed Aluminium & Glass Fabrications | I-8 Markaz, Islamabad",
    description:
      "Quality You Can See, Trust You Can Feel. Islamabad's premier architectural aluminium windows, tempered glass doors, curtain walls, and glass railings fabricator.",
    url: siteUrl,
    images: [
      {
        url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
        width: 1200,
        height: 630,
        alt: "Al Syed Aluminium & Glass Fabrications Islamabad",
      },
    ],
  },
};

export const revalidate = 60; // Revalidate every 60 seconds

export default async function HomePage() {
  // 1. Fetch featured services
  const featuredServices = await db
    .select()
    .from(services)
    .orderBy(asc(services.order))
    .limit(4);

  // 2. Fetch featured gallery projects
  const featuredProjects = await db
    .select()
    .from(galleryItems)
    .orderBy(desc(galleryItems.createdAt))
    .limit(6);

  // Icons mapping for services
  const getServiceIcon = (slug: string) => {
    switch (slug) {
      case "aluminium-windows":
        return <PanelTop className="w-7 h-7 text-accent" />;
      case "glass-doors":
        return <DoorOpen className="w-7 h-7 text-accent" />;
      case "curtain-walls":
        return <Building2 className="w-7 h-7 text-accent" />;
      case "glass-railings":
        return <ShieldCheck className="w-7 h-7 text-accent" />;
      default:
        return <Layers className="w-7 h-7 text-accent" />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* ============================================================ */}
      {/* 1. HERO SECTION (Background images, Centered content, Scroll Animation) */}
      {/* ============================================================ */}
      <HeroSection />

      {/* ============================================================ */}
      {/* 2. SERVICES OVERVIEW GRID (What We Excel At) */}
      {/* ============================================================ */}
      <section className="py-24 bg-gradient-to-b from-neutral-light via-white to-neutral-light relative overflow-hidden">
        {/* Subtle background grid pattern */}
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-secondary/10 border border-secondary/20 text-secondary text-xs font-bold uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5 text-accent" />
              <span>What We Excel At</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-primary tracking-tight">
              Our Core Fabrication Services
            </h2>
            <div className="w-20 h-1.5 bg-gradient-to-r from-accent to-secondary mx-auto mt-4 rounded-full" />
            <p className="text-base sm:text-lg text-text-dark/75 mt-5 leading-relaxed font-normal">
              Engineered with precision cutting, premium structural profiles, and safety-certified tempered glass for modern residential and commercial architectures.
            </p>
          </div>

          {/* 4 Modern Service Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredServices.map((service, idx) => {
              const serviceImages: Record<string, string> = {
                "aluminium-windows":
                  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop",
                "glass-doors":
                  "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop",
                "curtain-walls":
                  "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=800&auto=format&fit=crop",
                "glass-railings":
                  "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=800&auto=format&fit=crop",
              };

              const serviceTags: Record<string, string[]> = {
                "aluminium-windows": ["6063-T6 Alloy", "Double Glazed", "Weatherproof"],
                "glass-doors": ["12mm Tempered", "Frameless", "Acoustic Seal"],
                "curtain-walls": ["Structural Glazing", "High-Rise", "Wind-Resistant"],
                "glass-railings": ["Safety Glass", "Stainless Spigots", "Modern Finish"],
              };

              const imageUrl =
                service.iconOrImage && service.iconOrImage.startsWith("http")
                  ? service.iconOrImage
                  : serviceImages[service.slug] ||
                    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop";
              const tags = serviceTags[service.slug] || ["Custom Engineered", "Safety Tested"];

              return (
                <div
                  key={service.id}
                  className="group relative bg-white rounded-3xl overflow-hidden border border-neutral-border shadow-sm hover:shadow-2xl hover:border-accent/40 transition-all duration-500 flex flex-col justify-between"
                >
                  {/* Top Image Preview with Dark Gradient & Badge */}
                  <div className="relative h-48 w-full overflow-hidden bg-primary">
                    <Image
                      src={imageUrl}
                      alt={`${service.title} fabrication by Al Syed Aluminium & Glass Islamabad`}
                      fill
                      sizes="(max-width: 768px) 100vw, 25vw"
                      className="object-cover group-hover:scale-110 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F1A] via-[#0B0F1A]/40 to-transparent" />

                    {/* Step Number Tag */}
                    <span className="absolute top-3.5 right-3.5 px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md text-accent font-mono text-xs font-bold border border-white/10">
                      0{idx + 1}
                    </span>

                    {/* Icon Badge */}
                    <div className="absolute bottom-3.5 left-4 w-11 h-11 rounded-xl bg-gradient-to-br from-secondary to-primary-surface border border-accent/40 flex items-center justify-center text-accent shadow-md">
                      {getServiceIcon(service.slug)}
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Title */}
                      <h3 className="text-xl font-bold text-primary mb-2 group-hover:text-secondary transition-colors">
                        {service.title}
                      </h3>

                      {/* Description */}
                      <p className="text-xs sm:text-sm text-text-dark/70 leading-relaxed line-clamp-3 mb-4">
                        {service.description}
                      </p>

                      {/* Feature Tags */}
                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {tags.map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-2 py-0.5 rounded-md bg-neutral-light border border-neutral-border text-[11px] font-semibold text-text-dark/80"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Button */}
                    <Link
                      href={`/services/${service.slug}`}
                      className="inline-flex items-center justify-between w-full bg-neutral-light group-hover:bg-primary text-secondary group-hover:text-accent font-bold px-4 py-3 rounded-xl text-xs sm:text-sm transition-all duration-300 border border-neutral-border group-hover:border-primary shadow-xs"
                    >
                      <span>View Specifications</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {/* View All Services Button */}
          <div className="text-center mt-14">
            <Link
              href="/services"
              className="inline-flex items-center space-x-3 bg-primary hover:bg-[#0F1420] text-accent font-bold px-8 py-4 rounded-xl text-sm sm:text-base transition-all duration-200 shadow-md hover:shadow-xl hover:-translate-y-0.5 border border-accent/30"
            >
              <span>Explore All 6 Fabrication Services</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

        </div>
      </section>

      {/* ============================================================ */}
      {/* 3. WHY CHOOSE US (4 Trust Badges matching Poster) */}
      {/* ============================================================ */}
      <section className="py-20 bg-primary text-text-light relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-accent">
              The Al Syed Advantage
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">
              Why Islamabad Trusts Our Craftsmanship
            </h2>
            <div className="w-16 h-1 bg-accent mx-auto mt-4 rounded-full" />
            <p className="text-base text-text-soft/80 mt-4">
              We uphold the highest benchmarks of material integrity, structural safety, and timely on-site execution.
            </p>
          </div>

          {/* 4 Trust Badges Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Badge 1: High Quality Materials */}
            <div className="bg-primary-surface border border-white/10 rounded-2xl p-6 text-center hover:border-accent/50 transition-all duration-300 group">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-secondary to-primary-surface border border-accent/40 flex items-center justify-center mx-auto mb-5 text-accent group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">High Quality Materials</h3>
              <p className="text-xs text-text-soft/80 leading-relaxed">
                Premium 6063-T6 architectural aluminium alloys, shatter-resistant tempered safety glass, and certified EPDM weather gaskets.
              </p>
            </div>

            {/* Badge 2: Expert Installation */}
            <div className="bg-primary-surface border border-white/10 rounded-2xl p-6 text-center hover:border-accent/50 transition-all duration-300 group">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-secondary to-primary-surface border border-accent/40 flex items-center justify-center mx-auto mb-5 text-accent group-hover:scale-110 transition-transform">
                <Award className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Expert Installation</h3>
              <p className="text-xs text-text-soft/80 leading-relaxed">
                Skilled master fabricators and installers ensuring exact millimeter leveling, airtight seals, and flawless structural alignment.
              </p>
            </div>

            {/* Badge 3: Modern Designs */}
            <div className="bg-primary-surface border border-white/10 rounded-2xl p-6 text-center hover:border-accent/50 transition-all duration-300 group">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-secondary to-primary-surface border border-accent/40 flex items-center justify-center mx-auto mb-5 text-accent group-hover:scale-110 transition-transform">
                <Sparkles className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Modern Designs</h3>
              <p className="text-xs text-text-soft/80 leading-relaxed">
                Contemporary slimline profiles, frameless glass aesthetics, and customized architectural finishes matching today&apos;s luxury trends.
              </p>
            </div>

            {/* Badge 4: On-Time Delivery */}
            <div className="bg-primary-surface border border-white/10 rounded-2xl p-6 text-center hover:border-accent/50 transition-all duration-300 group">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-secondary to-primary-surface border border-accent/40 flex items-center justify-center mx-auto mb-5 text-accent group-hover:scale-110 transition-transform">
                <Clock className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">On-Time Delivery</h3>
              <p className="text-xs text-text-soft/80 leading-relaxed">
                Reliable project schedules, transparent fabrication timelines, and punctual handover for residential and commercial sites.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ============================================================ */}
      {/* 4. FEATURED PROJECTS PREVIEW (from gallery_items table) */}
      {/* ============================================================ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-secondary">
                Portfolio of Excellence
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-primary mt-2">
                Featured Completed Projects
              </h2>
              <div className="w-16 h-1 bg-accent mt-3 rounded-full" />
            </div>
            <Link
              href="/gallery"
              className="inline-flex items-center space-x-2 text-sm font-bold text-secondary hover:text-secondary-light transition-colors"
            >
              <span>View Full Gallery ({featuredProjects.length}+ Projects)</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Project Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map((project) => (
              <div
                key={project.id}
                className="group relative rounded-2xl overflow-hidden bg-neutral-light border border-neutral-border shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="relative h-64 w-full overflow-hidden">
                  <Image
                    src={project.imageUrl}
                    alt={`${project.title} - ${project.projectType} by Al Syed Aluminium & Glass Fabrications Islamabad`}
                    fill
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                </div>

                <div className="absolute bottom-0 inset-x-0 p-5 text-white">
                  <span className="inline-block px-2.5 py-0.5 rounded-md bg-accent text-primary text-[10px] font-bold uppercase tracking-wider mb-2">
                    {project.category}
                  </span>
                  <h3 className="text-base font-bold text-white group-hover:text-accent-light transition-colors line-clamp-1">
                    {project.title}
                  </h3>
                  <p className="text-xs text-text-soft/80 mt-0.5">
                    {project.projectType}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ============================================================ */}
      {/* 5. BOTTOM CTA BANNER — Background image + WhatsApp + Quote  */}
      {/* ============================================================ */}
      <section className="relative text-white py-24 overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=2000&auto=format&fit=crop"
            alt="Modern architectural glass building facade"
            fill
            sizes="100vw"
            className="object-cover object-center"
            loading="lazy"
          />
          {/* Dark navy overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B0F1A]/95 via-[#0B0F1A]/85 to-[#0B0F1A]/70" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-accent mb-3">
            Get Started Today
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white max-w-3xl mx-auto leading-tight">
            Ready to Bring Architectural Precision to Your Next Project?
          </h2>
          <p className="text-base sm:text-lg text-gray-300 max-w-xl mx-auto mt-5 mb-10 leading-relaxed">
            Contact our fabrication engineers in I-8 Markaz, Islamabad for free site measurement, custom profile consultations, and transparent pricing.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/quote"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-accent hover:bg-accent-light text-primary font-bold px-8 py-4 rounded-xl text-base transition-all duration-200 hover:-translate-y-0.5"
            >
              <span>Request Free Quote</span>
              <ArrowRight className="w-5 h-5" />
            </Link>

            <a
              href="https://wa.me/923379289079?text=Hello%20Al%20Syed%20Fabrications,%20I%20am%20interested%20in%20discussing%20a%20project."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2.5 bg-[#25D366] hover:bg-[#20BA5A] text-white font-bold px-8 py-4 rounded-xl text-base transition-all duration-200 hover:-translate-y-0.5"
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
