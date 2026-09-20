import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { db } from "@/lib/db";
import { services } from "@/lib/schema";
import { asc } from "drizzle-orm";
import {
  ArrowRight,
  Ruler,
  FileCheck2,
  Hammer,
  Clock,
  CheckCircle2,
} from "lucide-react";

const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "https://alsyedfabrications.com";

export const metadata: Metadata = {
  title: "Fabrication Services | Al Syed Aluminium & Glass Islamabad",
  description:
    "Explore our complete range of architectural aluminium and glass services in Islamabad & Rawalpindi: windows, frameless glass doors, curtain wall facades, glass railings, shower enclosures, and ACP cladding.",
  keywords: [
    "Aluminium Windows Services Islamabad",
    "Glass Railing Installation Islamabad",
    "Curtain Wall Fabricators Rawalpindi",
    "Tempered Glass Doors I-8 Markaz",
    "Shower Enclosures Islamabad",
    "ACP Panel Cladding Islamabad",
  ],
  alternates: {
    canonical: `${siteUrl}/services`,
  },
  openGraph: {
    title: "Fabrication Services | Al Syed Aluminium & Glass Islamabad",
    description:
      "Explore our complete range of architectural aluminium and glass services in Islamabad & Rawalpindi.",
    url: `${siteUrl}/services`,
    images: [
      {
        url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
        width: 1200,
        height: 630,
        alt: "Services - Al Syed Aluminium & Glass Fabrications",
      },
    ],
  },
};

export const revalidate = 60;

export default async function ServicesPage() {
  const allServices = await db
    .select()
    .from(services)
    .orderBy(asc(services.order));

  const serviceImages: Record<string, string> = {
    "aluminium-windows":
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000&auto=format&fit=crop",
    "glass-doors":
      "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1000&auto=format&fit=crop",
    "curtain-walls":
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1000&auto=format&fit=crop",
    "glass-railings":
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=1000&auto=format&fit=crop",
    "shower-enclosures":
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1000&auto=format&fit=crop",
    "acp-cladding":
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000&auto=format&fit=crop",
  };

  const serviceHighlights: Record<string, string[]> = {
    "aluminium-windows": [
      "Sliding, Casement & Tilt-and-Turn Systems",
      "Thermal Break & Acoustic Noise Reduction",
      "Multi-point Locking with EPDM Weather Seals",
    ],
    "glass-doors": [
      "10mm & 12mm Toughened Safety Glass",
      "Frameless Patch Fittings & Hydraulic Floor Springs",
      "Modern Commercial & Residential Partitions",
    ],
    "curtain-walls": [
      "Heavy-Duty Structural Glazing & Spider Glass",
      "Solar Control Double-Glazed Units (DGU)",
      "Engineered for High-Rise Wind Pressure Standards",
    ],
    "glass-railings": [
      "SS 304/316 Base Spigots & Top Handrails",
      "12mm Clear & Frosted Tempered Glass Panels",
      "Balconies, Staircases & Terrace Perimeters",
    ],
    "shower-enclosures": [
      "Custom Walk-in Screens & Sliding Shower Cabins",
      "Rust-Proof Brass / SS Hinges & Magnetic Seals",
      "Easy-Clean Anti-Limescale Coating Treatment",
    ],
    "acp-cladding": [
      "4mm PVDF Coated Aluminium Composite Panels",
      "Weather-Resistant & Fire-Retardant Grades",
      "Modern Exterior Facade Renovations for Plazas",
    ],
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* 1. HERO BANNER                                                */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <section className="relative text-white pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=85&w=2000&auto=format&fit=crop"
            alt="Al Syed Architectural Glass & Aluminium Services"
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
            Master Fabrication Expertise · Islamabad &amp; Rawalpindi
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight max-w-4xl mx-auto [text-shadow:_0_2px_12px_rgba(0,0,0,0.85)]">
            Architectural Metal &amp; Glass Services
          </h1>
          <p className="text-base sm:text-lg text-white max-w-2xl mx-auto mt-6 leading-relaxed [text-shadow:_0_1px_8px_rgba(0,0,0,0.85)]">
            Custom-engineered aluminium window systems, frameless tempered glass doors, structural curtain wall facades, and modern balustrades fabricated to exact millimeter tolerances.
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* 2. SERVICES CATALOG (New horizontal layout)                   */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="flex items-center justify-center gap-4 mb-3">
              <span className="flex-1 max-w-[80px] h-[2px] bg-secondary rounded-full" />
              <h2 className="text-3xl sm:text-4xl font-extrabold text-on-surface tracking-tight">
                Specialized Solutions
              </h2>
              <span className="flex-1 max-w-[80px] h-[2px] bg-secondary rounded-full" />
            </div>
            <p className="text-base sm:text-lg text-on-surface-variant mt-3 leading-relaxed">
              Every system is manufactured in our dedicated workshop with top-tier hardware, thermal insulation, and custom powder-coated or anodized finishes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {allServices.map((service) => {
              const img =
                service.iconOrImage && service.iconOrImage.startsWith("http")
                  ? service.iconOrImage
                  : serviceImages[service.slug] ||
                    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600&auto=format&fit=crop";
              const highlights = serviceHighlights[service.slug] || [];

              return (
                <div
                  key={service.id}
                  className="group bg-white rounded-2xl overflow-hidden border border-outline-variant hover:shadow-lg hover:border-secondary/30 transition-all duration-300 flex flex-row"
                >
                  {/* Image — left side */}
                  <div className="relative w-[160px] sm:w-[220px] shrink-0 overflow-hidden bg-neutral-100">
                    <Image
                      src={img}
                      alt={`${service.title} architectural fabrication by Al Syed Islamabad`}
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
                      <p className="text-sm text-on-surface-variant leading-relaxed line-clamp-2 sm:line-clamp-3 mb-4">
                        {service.description}
                      </p>
                      
                      {/* Highlight list */}
                      <div className="hidden sm:block space-y-1.5 mb-2">
                        {highlights.slice(0, 2).map((item, hIdx) => (
                          <div key={hIdx} className="flex items-start space-x-2 text-[13px] text-on-surface-variant">
                            <CheckCircle2 className="w-3.5 h-3.5 text-secondary shrink-0 mt-0.5" />
                            <span className="leading-snug line-clamp-1">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Explore more link */}
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

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* 3. 4-STEP WORKFLOW                                            */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-24 bg-white border-t border-outline-variant/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="flex items-center justify-center gap-4 mb-3">
              <span className="flex-1 max-w-[80px] h-[2px] bg-secondary rounded-full" />
              <h2 className="text-3xl sm:text-4xl font-extrabold text-on-surface tracking-tight">
                Our Execution Standards
              </h2>
              <span className="flex-1 max-w-[80px] h-[2px] bg-secondary rounded-full" />
            </div>
            <p className="text-base sm:text-lg text-on-surface-variant mt-3 leading-relaxed">
              From site survey to final weatherproofing, our process ensures zero millimeter error.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: "01", icon: Ruler, label: "Survey", title: "Laser Measurement", desc: "Free on-site laser leveling and dimension verification at your project in Islamabad or Rawalpindi." },
              { step: "02", icon: FileCheck2, label: "Design", title: "Profile & Specs", desc: "Selecting ideal 6063-T6 aluminium alloy series, glass thickness, and powder-coated finishes." },
              { step: "03", icon: Hammer, label: "Fabrication", title: "Workshop Precision", desc: "Precision CNC miter cutting, thermal break assembly, and glass quality testing in I-8 Markaz." },
              { step: "04", icon: Clock, label: "Handover", title: "On-Site Installation", desc: "Airtight EPDM gasket fitting, structural silicon sealing, and complete functional warranty handover." },
            ].map(({ step, icon: Icon, label, title, desc }) => (
              <div key={step} className="bg-white rounded-2xl p-7 border border-outline-variant hover:shadow-md hover:border-secondary/30 transition-all duration-300 flex flex-col group">
                <div className="flex items-center justify-between mb-5">
                  <span className="text-2xl font-mono font-extrabold text-secondary">
                    {step}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-secondary-container text-secondary group-hover:bg-secondary group-hover:text-white flex items-center justify-center transition-all duration-300">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>
                <div className="flex items-center space-x-2 text-secondary mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider">{label}</span>
                </div>
                <h3 className="text-base font-bold text-on-surface mb-2 group-hover:text-secondary transition-colors">
                  {title}
                </h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  {desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* 4. BOTTOM CTA                                                 */}
      {/* ═══════════════════════════════════════════════════════════════ */}
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
            Have an Architectural Drawing or Project in Mind?
          </h2>
          <p className="text-base sm:text-lg text-white max-w-2xl mx-auto mb-10 leading-relaxed [text-shadow:_0_1px_8px_rgba(0,0,0,0.85)]">
            Send us your site plans or schedule a free on-site laser measurement with our senior fabrication engineers in Islamabad &amp; Rawalpindi.
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
