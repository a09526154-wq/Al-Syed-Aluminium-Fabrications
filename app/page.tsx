import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { db } from "@/lib/db";
import { services, galleryItems } from "@/lib/schema";
import { asc, desc } from "drizzle-orm";
import { HeroSection } from "@/components/HeroSection";
import {
  ShieldCheck,
  Award,
  Sparkles,
  Clock,
  ArrowRight,
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

export const revalidate = 60;

export default async function HomePage() {
  const featuredServices = await db
    .select()
    .from(services)
    .orderBy(asc(services.order))
    .limit(4);

  const featuredProjects = await db
    .select()
    .from(galleryItems)
    .orderBy(desc(galleryItems.createdAt))
    .limit(6);


  return (
    <div className="flex flex-col min-h-screen">
      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* 1. HERO SECTION                                               */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <HeroSection />

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* 2. SERVICES — Material 3 Elevated Cards on White              */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="flex items-center justify-center gap-4 mb-3">
              <span className="flex-1 max-w-[80px] h-[2px] bg-secondary rounded-full" />
              <h2 className="text-3xl sm:text-4xl font-extrabold text-on-surface tracking-tight">
                Our Core Services
              </h2>
              <span className="flex-1 max-w-[80px] h-[2px] bg-secondary rounded-full" />
            </div>
            <p className="text-base sm:text-lg text-on-surface-variant mt-3 leading-relaxed">
              Engineered with precision cutting, premium structural profiles, and safety-certified tempered glass for modern residential and commercial architectures.
            </p>
          </div>

          {/* Service Cards Grid — 2×2 horizontal cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {featuredServices.map((service) => {
              const serviceImages: Record<string, string> = {
                "aluminium-windows":
                  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600&auto=format&fit=crop",
                "glass-doors":
                  "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=600&auto=format&fit=crop",
                "curtain-walls":
                  "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=600&auto=format&fit=crop",
                "glass-railings":
                  "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=600&auto=format&fit=crop",
              };

              const imageUrl =
                service.iconOrImage && service.iconOrImage.startsWith("http")
                  ? service.iconOrImage
                  : serviceImages[service.slug] ||
                    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600&auto=format&fit=crop";

              return (
                <div
                  key={service.id}
                  className="group bg-white rounded-2xl overflow-hidden border border-outline-variant hover:shadow-lg hover:border-secondary/30 transition-all duration-300 flex flex-row"
                >
                  {/* Image — left side, fixed width */}
                  <div className="relative w-[200px] sm:w-[220px] shrink-0 overflow-hidden bg-neutral-100">
                    <Image
                      src={imageUrl}
                      alt={`${service.title} fabrication by Al Syed Aluminium & Glass Islamabad`}
                      fill
                      sizes="220px"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Content — right side */}
                  <div className="flex flex-col justify-between p-5 sm:p-6 flex-1 min-w-0">
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-on-surface mb-2 group-hover:text-secondary transition-colors line-clamp-1">
                        {service.title}.
                      </h3>
                      <p className="text-sm text-on-surface-variant leading-relaxed line-clamp-4">
                        {service.description}
                      </p>
                    </div>

                    {/* Explore more — bottom-right aligned */}
                    <div className="flex justify-end mt-4">
                      <Link
                        href={`/services/${service.slug}`}
                        className="inline-flex items-center space-x-1.5 text-sm font-semibold text-secondary hover:text-secondary-hover transition-colors group/link"
                      >
                        <span>Explore more</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Explore All — outlined pill, same style as View Full Gallery */}
          <div className="text-center mt-12">
            <Link
              href="/services"
              className="group inline-flex items-center justify-center space-x-2.5 h-12 px-8 rounded-full border-2 border-secondary text-secondary hover:bg-secondary hover:text-white font-semibold text-sm transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>Explore All Fabrication Services</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* 3. WHY CHOOSE US — Two-column split layout                    */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-24 bg-white relative overflow-hidden border-t border-outline-variant/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* Left column — label + heading + description */}
            <div className="lg:pr-8">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-secondary mb-4">
                Why Choose Us
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-extrabold text-on-surface leading-tight tracking-tight mb-6">
                Islamabad&apos;s Trusted Aluminium &amp; Glass Fabricators
              </h2>
              <p className="text-base sm:text-lg text-on-surface-variant leading-relaxed">
                We uphold the highest benchmarks of material integrity, structural safety, and timely on-site execution — from precision cutting in our I-8 workshop to flawless installation at your site.
              </p>
            </div>

            {/* Right column — 2x2 cards grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  icon: ShieldCheck,
                  title: "High Quality Materials",
                  desc: "Premium 6063-T6 aluminium alloys, shatter-resistant tempered safety glass, and certified EPDM weather gaskets.",
                },
                {
                  icon: Award,
                  title: "Expert Installation",
                  desc: "Skilled fabricators ensuring exact millimeter leveling, airtight seals, and flawless structural alignment.",
                },
                {
                  icon: Sparkles,
                  title: "Modern Designs",
                  desc: "Contemporary slimline profiles, frameless aesthetics, and customized finishes matching today's luxury trends.",
                },
                {
                  icon: Clock,
                  title: "On-Time Delivery",
                  desc: "Reliable schedules, transparent timelines, and punctual handover for residential and commercial sites.",
                },
              ].map(({ icon: Icon, title, desc }, i) => (
                <div
                  key={title}
                  className={`bg-white border border-outline-variant rounded-2xl p-6 hover:shadow-md hover:border-secondary/30 transition-all duration-300 group${i === 1 ? " sm:mt-6" : ""}${i === 3 ? " sm:mt-6" : ""}`}
                >
                  {/* Icon box */}
                  <div className="w-12 h-12 rounded-xl bg-surface-container-low border border-outline-variant flex items-center justify-center mb-4 text-secondary group-hover:bg-secondary group-hover:text-white group-hover:border-secondary transition-all duration-300">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-on-surface mb-2">{title}</h3>
                  <p className="text-sm text-on-surface-variant leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* 4. FEATURED PROJECTS — Material 3 Photo Cards on White        */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-24 bg-white border-t border-outline-variant/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="flex items-center justify-center gap-4 mb-3">
              <span className="flex-1 max-w-[80px] h-[2px] bg-secondary rounded-full" />
              <h2 className="text-3xl sm:text-4xl font-extrabold text-on-surface tracking-tight">
                Our Projects
              </h2>
              <span className="flex-1 max-w-[80px] h-[2px] bg-secondary rounded-full" />
            </div>
            <p className="text-base sm:text-lg text-on-surface-variant mt-3 leading-relaxed">
              A showcase of our completed architectural aluminium and glass installations across Islamabad and Rawalpindi.
            </p>
          </div>

          {/* Project Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map((project) => (
              <div
                key={project.id}
                className="group relative rounded-m3-lg overflow-hidden bg-white border border-outline-variant elevation-1 hover:elevation-3 transition-all duration-300"
              >
                <div className="relative h-64 w-full overflow-hidden">
                  <Image
                    src={project.imageUrl}
                    alt={`${project.title} - ${project.projectType} by Al Syed Aluminium & Glass Fabrications Islamabad`}
                    fill
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                </div>

                <div className="absolute bottom-0 inset-x-0 p-5 text-white">
                  <span className="inline-block px-2.5 py-0.5 rounded-m3-sm bg-secondary text-white text-[10px] font-bold uppercase tracking-wider mb-2">
                    {project.category}
                  </span>
                  <h3 className="text-base font-bold text-white group-hover:text-secondary-light transition-colors line-clamp-1">
                    {project.title}
                  </h3>
                  <p className="text-xs text-slate-300 mt-0.5">
                    {project.projectType}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* View Full Gallery button — below the grid */}
          <div className="text-center mt-12">
            <Link
              href="/gallery"
              className="group inline-flex items-center justify-center space-x-2.5 h-12 px-8 rounded-full border-2 border-secondary text-secondary hover:bg-secondary hover:text-white font-semibold text-sm transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>View Full Gallery ({featuredProjects.length}+ Projects)</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* 5. BOTTOM CTA — Full-bleed background with hero-style filter  */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <section className="relative text-white py-16 overflow-hidden">
        {/* Background image — modern construction/aluminium facade */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=85&w=2000&auto=format&fit=crop"
            alt="Modern architectural aluminium building under construction"
            fill
            sizes="100vw"
            className="object-cover object-center"
            loading="lazy"
          />
          {/* Same low-intensity filter as hero section */}
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/25 to-black/60" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight [text-shadow:_0_2px_12px_rgba(0,0,0,0.85)] mb-5">
            Ready to Bring Architectural Precision to Your Next Project?
          </h2>
          <p className="text-base sm:text-lg text-white max-w-2xl mx-auto mb-10 leading-relaxed [text-shadow:_0_1px_8px_rgba(0,0,0,0.85)]">
            Visit our workshop in I-8 Markaz, Islamabad or send us a message. Our engineers are ready to help with free site measurement and transparent pricing.
          </p>

          <Link
            href="/contact"
            className="group inline-flex items-center justify-center space-x-2.5 h-14 px-10 rounded-full bg-secondary hover:bg-secondary-hover text-white font-semibold text-base elevation-3 hover:elevation-4 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>Contact Us</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
  );
}
