import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { db } from "@/lib/db";
import { services } from "@/lib/schema";
import { asc } from "drizzle-orm";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import {
  PanelTop,
  DoorOpen,
  Building2,
  ShieldCheck,
  Bath,
  Layers,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Phone,
  Ruler,
  FileCheck2,
  Hammer,
  Clock,
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

  const serviceIcons: Record<string, React.ReactNode> = {
    "aluminium-windows": <PanelTop className="w-7 h-7 text-accent" />,
    "glass-doors": <DoorOpen className="w-7 h-7 text-accent" />,
    "curtain-walls": <Building2 className="w-7 h-7 text-accent" />,
    "glass-railings": <ShieldCheck className="w-7 h-7 text-accent" />,
    "shower-enclosures": <Bath className="w-7 h-7 text-accent" />,
    "acp-cladding": <Layers className="w-7 h-7 text-accent" />,
  };

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
    <div className="flex flex-col min-h-screen bg-neutral-light">
      {/* ============================================================ */}
      {/* 1. HERO BANNER */}
      {/* ============================================================ */}
      <section className="relative bg-[#0B0F1A] text-white py-20 lg:py-28 overflow-hidden border-b border-white/10">
        {/* Background Image Layer */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=85&w=2000&auto=format&fit=crop"
            alt="Al Syed Architectural Glass & Aluminium Services"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B0F1A]/90 via-[#0B0F1A]/85 to-[#0B0F1A]" />
          <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(to_right,#ffffff15_1px,transparent_1px),linear-gradient(to_bottom,#ffffff15_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-accent text-xs font-semibold uppercase tracking-wider mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Master Fabrication Expertise • Islamabad & Rawalpindi</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight max-w-4xl mx-auto">
            Architectural Metal & Glass <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-[#F3E5AB] to-accent-light">
              Engineering Services
            </span>
          </h1>

          <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto mt-6 leading-relaxed">
            Custom-engineered aluminium window systems, frameless tempered glass doors, structural curtain wall facades, and modern balustrades fabricated to exact millimeter tolerances.
          </p>

          {/* Quick Metrics Strip */}
          <div className="mt-12 pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto text-center">
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-accent font-mono">6063-T6</div>
              <p className="text-xs text-gray-400 mt-1 uppercase tracking-wider">Alloy Standard</p>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">100%</div>
              <p className="text-xs text-gray-400 mt-1 uppercase tracking-wider">Tempered Safety Glass</p>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-accent font-mono">Laser</div>
              <p className="text-xs text-gray-400 mt-1 uppercase tracking-wider">Free Site Survey</p>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">I-8 Markaz</div>
              <p className="text-xs text-gray-400 mt-1 uppercase tracking-wider">Workshop Hub</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 2. SERVICES CATALOG GRID */}
      {/* ============================================================ */}
      <section className="py-24 bg-gradient-to-b from-neutral-light via-white to-neutral-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-secondary">
              Comprehensive Portfolio
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-primary mt-2 tracking-tight">
              Specialized Fabrication Solutions
            </h2>
            <div className="w-16 h-1 bg-accent mx-auto mt-4 rounded-full" />
            <p className="text-sm sm:text-base text-text-dark/70 mt-4 leading-relaxed">
              Every system is manufactured in our dedicated workshop with top-tier hardware, thermal insulation, and custom powder-coated or anodized finishes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allServices.map((service, idx) => {
              const img =
                service.iconOrImage && service.iconOrImage.startsWith("http")
                  ? service.iconOrImage
                  : serviceImages[service.slug] ||
                    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000&auto=format&fit=crop";
              const highlights =
                serviceHighlights[service.slug] || [
                  "Custom millimeter dimensioning",
                  "Safety certified tempered glass",
                  "Weatherproof insulation",
                ];

              return (
                <div
                  key={service.id}
                  className="group bg-white rounded-3xl overflow-hidden border border-neutral-border shadow-sm hover:shadow-2xl hover:border-accent/40 transition-all duration-500 flex flex-col justify-between"
                >
                  <div>
                    {/* Visual Card Banner */}
                    <div className="relative h-60 w-full overflow-hidden bg-primary">
                      <Image
                        src={img}
                        alt={`${service.title} architectural fabrication by Al Syed Islamabad`}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover group-hover:scale-110 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F1A] via-[#0B0F1A]/40 to-transparent" />

                      {/* Numeric Badge */}
                      <span className="absolute top-4 right-4 px-3 py-1 rounded-xl bg-black/60 backdrop-blur-md text-accent font-mono text-xs font-bold border border-white/10">
                        0{idx + 1}
                      </span>

                      {/* Service Icon */}
                      <div className="absolute bottom-4 left-5 w-12 h-12 rounded-2xl bg-gradient-to-br from-secondary to-primary-surface border border-accent/40 flex items-center justify-center shadow-lg">
                        {serviceIcons[service.slug] || <Layers className="w-6 h-6 text-accent" />}
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-7">
                      <h3 className="text-2xl font-bold text-primary mb-3 group-hover:text-secondary transition-colors">
                        {service.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-text-dark/75 leading-relaxed mb-6">
                        {service.description}
                      </p>

                      {/* Bullet Highlights */}
                      <div className="space-y-2.5 pt-4 border-t border-neutral-border/80 mb-6">
                        {highlights.map((item, hIdx) => (
                          <div key={hIdx} className="flex items-start space-x-2.5 text-xs text-text-dark/85">
                            <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                            <span className="font-medium leading-snug">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Card Bottom CTA Links */}
                  <div className="p-7 pt-0 flex items-center gap-3">
                    <Link
                      href={`/services/${service.slug}`}
                      className="flex-1 inline-flex items-center justify-center space-x-2 bg-neutral-light group-hover:bg-primary text-secondary group-hover:text-accent font-bold py-3.5 px-4 rounded-xl text-xs sm:text-sm transition-all duration-300 border border-neutral-border group-hover:border-primary shadow-xs"
                    >
                      <span>Explore Specs</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>

                    <Link
                      href={`/quote?service=${encodeURIComponent(service.title)}`}
                      className="inline-flex items-center justify-center bg-accent hover:bg-accent-light text-primary font-bold py-3.5 px-4 rounded-xl text-xs sm:text-sm transition-all duration-200 shadow-xs shrink-0"
                      title="Request a quote for this service"
                    >
                      <span>Quote</span>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ============================================================ */}
      {/* 3. 4-STEP PROCESS WORKFLOW */}
      {/* ============================================================ */}
      <section className="py-20 bg-primary text-white relative overflow-hidden border-t border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-accent">
              Our Execution Standards
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">
              4-Step Engineering & Installation Workflow
            </h2>
            <div className="w-16 h-1 bg-accent mx-auto mt-4 rounded-full" />
            <p className="text-sm sm:text-base text-gray-300 mt-4 leading-relaxed">
              From site survey to final weatherproofing, our process ensures zero millimeter error.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Step 1 */}
            <div className="bg-[#0F1420] border border-white/10 rounded-2xl p-7 relative group hover:border-accent/50 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-secondary/30 text-accent flex items-center justify-center mb-5 border border-accent/30 font-bold text-lg font-mono">
                01
              </div>
              <div className="flex items-center space-x-2 text-accent mb-2">
                <Ruler className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-wider">Site Survey</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Laser Measurement</h3>
              <p className="text-xs text-gray-300 leading-relaxed">
                Free on-site laser leveling and dimension verification at your project in Islamabad or Rawalpindi.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-[#0F1420] border border-white/10 rounded-2xl p-7 relative group hover:border-accent/50 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-secondary/30 text-accent flex items-center justify-center mb-5 border border-accent/30 font-bold text-lg font-mono">
                02
              </div>
              <div className="flex items-center space-x-2 text-accent mb-2">
                <FileCheck2 className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-wider">Custom Design</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Profile & Glass Specs</h3>
              <p className="text-xs text-gray-300 leading-relaxed">
                Selecting ideal 6063-T6 aluminium alloy series, glass thickness (8–12mm), and powder-coated finishes.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-[#0F1420] border border-white/10 rounded-2xl p-7 relative group hover:border-accent/50 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-secondary/30 text-accent flex items-center justify-center mb-5 border border-accent/30 font-bold text-lg font-mono">
                03
              </div>
              <div className="flex items-center space-x-2 text-accent mb-2">
                <Hammer className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-wider">Fabrication</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Workshop Precision</h3>
              <p className="text-xs text-gray-300 leading-relaxed">
                Precision CNC miter cutting, thermal break assembly, and tempered glass quality testing in I-8 Markaz.
              </p>
            </div>

            {/* Step 4 */}
            <div className="bg-[#0F1420] border border-white/10 rounded-2xl p-7 relative group hover:border-accent/50 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-secondary/30 text-accent flex items-center justify-center mb-5 border border-accent/30 font-bold text-lg font-mono">
                04
              </div>
              <div className="flex items-center space-x-2 text-accent mb-2">
                <Clock className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-wider">Handover</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">On-Site Installation</h3>
              <p className="text-xs text-gray-300 leading-relaxed">
                Airtight EPDM gasket fitting, structural silicon sealing, and complete functional warranty handover.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ============================================================ */}
      {/* 4. DIRECT QUOTE CTA */}
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
            Custom Fabrication Inquiry
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white max-w-3xl mx-auto leading-tight">
            Have an Architectural Drawing or Project in Mind?
          </h2>
          <p className="text-base sm:text-lg text-gray-300 max-w-xl mx-auto mt-4 mb-8 leading-relaxed">
            Send us your site plans or schedule a free on-site laser measurement with our senior fabrication engineers in Islamabad & Rawalpindi.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/quote"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-accent hover:bg-accent-light text-primary font-bold px-8 py-4 rounded-xl text-base transition-all duration-200 shadow-md hover:-translate-y-0.5"
            >
              <span>Request Detailed Quote</span>
              <ArrowRight className="w-5 h-5" />
            </Link>

            <a
              href="https://wa.me/923379289079?text=Hello%20Al%20Syed%20Fabrications,%20I%20would%20like%20to%20inquire%20about%20your%20services."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2.5 bg-[#25D366] hover:bg-[#20BA5A] text-white font-bold px-8 py-4 rounded-xl text-base transition-all duration-200 shadow-md hover:-translate-y-0.5"
            >
              <WhatsAppIcon className="w-5 h-5 shrink-0" />
              <span>Chat on WhatsApp: 0337 9289079</span>
            </a>

            <a
              href="tel:+923379289079"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-4 rounded-xl text-base border border-white/20 backdrop-blur-sm transition-all"
            >
              <Phone className="w-5 h-5 text-accent" />
              <span>0337 9289079</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
