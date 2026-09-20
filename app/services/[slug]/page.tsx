import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { services, galleryItems } from "@/lib/schema";
import { eq, ne } from "drizzle-orm";
import { ServiceJsonLd } from "@/components/JsonLd";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import {
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Phone,
  Layers,
  Settings2,
  FileCheck2,
  Ruler,
  Clock,
  Award,
} from "lucide-react";

interface ServiceDetailPageProps {
  params: Promise<{ slug: string }>;
}

const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "https://alsyedfabrications.com";

export async function generateMetadata({
  params,
}: ServiceDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = await db
    .select()
    .from(services)
    .where(eq(services.slug, slug))
    .limit(1);

  if (!service.length) {
    return {
      title: "Service Not Found",
    };
  }

  const s = service[0];
  const canonicalUrl = `${siteUrl}/services/${s.slug}`;

  return {
    title: `${s.title} Fabrication & Installation in Islamabad`,
    description: `${s.description} Custom-engineered by Al Syed Aluminium & Glass Fabrications in Pak Land City Center, I-8 Markaz, Islamabad.`,
    keywords: [
      `${s.title} Islamabad`,
      `${s.title} Rawalpindi`,
      `${s.title} Prices Pakistan`,
      `${s.title} Fabrication I-8 Markaz`,
      "Al Syed Aluminium Fabrications",
    ],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${s.title} Fabrication & Installation | Al Syed Islamabad`,
      description: s.description,
      url: canonicalUrl,
      images: [
        {
          url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
          width: 1200,
          height: 630,
          alt: `${s.title} - Al Syed Aluminium & Glass Fabrications`,
        },
      ],
    },
  };
}

export const revalidate = 60;

export default async function ServiceDetailPage({
  params,
}: ServiceDetailPageProps) {
  const { slug } = await params;

  // 1. Fetch service from DB
  const serviceResult = await db
    .select()
    .from(services)
    .where(eq(services.slug, slug))
    .limit(1);

  if (!serviceResult.length) {
    notFound();
  }

  const service = serviceResult[0];

  // 2. Fetch project photos
  const projectPhotos = await db
    .select()
    .from(galleryItems)
    .limit(4);

  // 3. Fetch other services for cross-navigation
  const otherServices = await db
    .select()
    .from(services)
    .where(ne(services.slug, slug))
    .limit(3);

  const serviceHeroImages: Record<string, string> = {
    "aluminium-windows":
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
    "glass-doors":
      "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop",
    "curtain-walls":
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1200&auto=format&fit=crop",
    "glass-railings":
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=1200&auto=format&fit=crop",
    "shower-enclosures":
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1200&auto=format&fit=crop",
    "acp-cladding":
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop",
  };

  const systemVariations: Record<
    string,
    { title: string; desc: string; tag: string }[]
  > = {
    "aluminium-windows": [
      {
        title: "Multi-Track Sliding Systems",
        desc: "Heavy-duty 2-track and 3-track sliding windows with stainless steel rollers and built-in mosquito mesh tracks.",
        tag: "Popular Residential",
      },
      {
        title: "Casement & Top-Hung Openings",
        desc: "Airtight friction-stay casement windows offering maximum ventilation and multi-point security locking.",
        tag: "Acoustic Insulation",
      },
      {
        title: "Thermal Break Tilt & Turn Systems",
        desc: "European-style dual-action windows with polyamide thermal barrier for superior energy efficiency.",
        tag: "Luxury Standard",
      },
      {
        title: "Fixed Panoramic Picture Windows",
        desc: "Seamless large-format architectural glazing frames designed for scenic views and maximum natural light.",
        tag: "Modern Villas",
      },
    ],
    "glass-doors": [
      {
        title: "Frameless Tempered Pivot Doors",
        desc: "12mm toughened safety glass with floor spring hydraulics, overhead patch fittings, and brushed stainless pull handles.",
        tag: "Commercial / Office",
      },
      {
        title: "Automatic Sensor Sliding Doors",
        desc: "Heavy-duty motorized belt-drive mechanism with radar sensors for commercial plaza entrances and lobbies.",
        tag: "High Traffic",
      },
      {
        title: "Interior Acoustic Glass Partitions",
        desc: "Modern office divider walls with slimline aluminium perimeter channels and sound-dampening glass.",
        tag: "Corporate",
      },
      {
        title: "Double-Action Swing Glass Entrances",
        desc: "Dual-opening tempered doors with 90-degree hold-open floor springs for shops, cafes, and showrooms.",
        tag: "Retail Storefront",
      },
    ],
    "curtain-walls": [
      {
        title: "Stick System Structural Glazing",
        desc: "Site-assembled vertical mullions and horizontal transoms supporting double-glazed solar reflective glass panels.",
        tag: "Commercial Plazas",
      },
      {
        title: "Point-Fixed Spider Glass Facades",
        desc: "Articulated stainless steel spider fittings and glass fins creating ultra-transparent glass canopy and atrium walls.",
        tag: "Iconic Architecture",
      },
      {
        title: "Unitized High-Rise Facades",
        desc: "Factory-prefabricated panel units with integrated thermal breaks for rapid, precision multi-story installation.",
        tag: "High-Rise Standard",
      },
      {
        title: "Integrated Louver & Shading Facades",
        desc: "Architectural aluminium louvers engineered to reduce solar heat gain while preserving exterior building aesthetics.",
        tag: "Energy Efficient",
      },
    ],
    "glass-railings": [
      {
        title: "Spigot-Mounted Frameless Balustrades",
        desc: "Solid SS 304/316 base clamps holding 12mm tempered safety glass without obstructing panoramic balcony views.",
        tag: "Balconies & Terraces",
      },
      {
        title: "Continuous U-Channel Floor Base",
        desc: "Heavy-gauge aluminium floor shoe concealed in floor finish for an entirely floating, minimalist glass look.",
        tag: "Minimalist Luxury",
      },
      {
        title: "Staircase Side-Standoff Glass Pins",
        desc: "Heavy-duty stainless steel side-mount standoff studs fastened directly to concrete stringers.",
        tag: "Modern Stairways",
      },
      {
        title: "Top Handrail Integrated Systems",
        desc: "Slim slotted stainless steel or aluminium top caps offering structural stiffness and comfortable hand grip.",
        tag: "Safety Compliant",
      },
    ],
    "shower-enclosures": [
      {
        title: "Frameless Walk-In Wet Room Screens",
        desc: "Single fixed 10mm tempered glass partition with ceiling/wall stabilization bar for open modern luxury bathrooms.",
        tag: "Contemporary",
      },
      {
        title: "Corner Sliding Shower Cabins",
        desc: "Space-saving dual sliding panels on precision stainless steel rollers with watertight magnetic seals.",
        tag: "Space Efficient",
      },
      {
        title: "Hinged Swing Glass Enclosures",
        desc: "Wall-to-glass 90/180 degree brass hinges with bottom sweep seals to prevent bathroom water splash.",
        tag: "Luxury Master Bath",
      },
      {
        title: "Fluted & Frosted Pattern Glass",
        desc: "Reed/fluted textured privacy glass providing diffused light and high-end boutique interior aesthetics.",
        tag: "Design Statement",
      },
    ],
    "acp-cladding": [
      {
        title: "4mm PVDF Solid & Metallic Sheets",
        desc: "High-performance exterior grade aluminium composite panels with UV-resistant Kynar 500 coating.",
        tag: "Exterior Facade",
      },
      {
        title: "Perforated Architectural Panels",
        desc: "CNC-punched geometric pattern panels backlit with LED illumination for striking commercial building fronts.",
        tag: "Commercial Signature",
      },
      {
        title: "Wood-Grain & Marble Finish ACP",
        desc: "Realistic natural wood and stone textures with the zero-maintenance durability of aluminium.",
        tag: "Warm Architectural",
      },
      {
        title: "Soffit, Canopy & Fascia Cladding",
        desc: "Seamless weather-sealed canopy and fascia wrapping for petrol stations, plaza canopies, and car porches.",
        tag: "Canopy & Soffits",
      },
    ],
  };

  const currentVariations = systemVariations[service.slug] || [
    {
      title: "Custom Engineered System",
      desc: "Tailored to exact architectural drawings with high-grade aluminium and certified safety glass.",
      tag: "Custom",
    },
    {
      title: "Weatherproof Commercial Grade",
      desc: "Built to withstand severe climate conditions with airtight seals and heavy-duty structural hardware.",
      tag: "Commercial",
    },
  ];

  const heroImage =
    service.iconOrImage && service.iconOrImage.startsWith("http")
      ? service.iconOrImage
      : serviceHeroImages[service.slug] ||
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop";

  return (
    <div className="flex flex-col min-h-screen">
      <ServiceJsonLd
        name={service.title}
        description={service.description}
        url={`${siteUrl}/services/${service.slug}`}
      />

      {/* ============================================================ */}
      {/* 1. HERO HEADER */}
      {/* ============================================================ */}
      <section className="relative text-white pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
        {/* Background Image Layer */}
        <div className="absolute inset-0 z-0">
          <Image
            src={heroImage}
            alt={service.title}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/25 to-black/60" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="flex items-center space-x-2 text-xs font-semibold text-white/80 mb-6 [text-shadow:_0_1px_4px_rgba(0,0,0,0.8)]">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/services" className="hover:text-white transition-colors">
              Services
            </Link>
            <span>/</span>
            <span className="text-secondary-light font-bold">{service.title}</span>
          </div>

          <div className="max-w-4xl">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-secondary-light mb-4 [text-shadow:_0_1px_6px_rgba(0,0,0,0.8)]">
              I-8 Markaz Master Fabrication Specification
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight [text-shadow:_0_2px_12px_rgba(0,0,0,0.85)]">
              {service.title}
            </h1>
            <p className="text-base sm:text-lg text-white mt-5 leading-relaxed max-w-2xl [text-shadow:_0_1px_8px_rgba(0,0,0,0.85)]">
              {service.description}
            </p>
          </div>

          {/* Quick Metrics Bar */}
          <div className="mt-14 pt-6 border-t border-white/20 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl text-xs sm:text-sm">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-5 h-5 text-secondary-light shrink-0" />
              <span className="text-white font-medium [text-shadow:_0_1px_4px_rgba(0,0,0,0.8)]">6063-T6 Structural Alloy</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-5 h-5 text-secondary-light shrink-0" />
              <span className="text-white font-medium [text-shadow:_0_1px_4px_rgba(0,0,0,0.8)]">100% Tempered Glass</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-5 h-5 text-secondary-light shrink-0" />
              <span className="text-white font-medium [text-shadow:_0_1px_4px_rgba(0,0,0,0.8)]">Laser Precision Fit</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-5 h-5 text-secondary-light shrink-0" />
              <span className="text-white font-medium [text-shadow:_0_1px_4px_rgba(0,0,0,0.8)]">On-Time Handover</span>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 2. MAIN CONTENT & SPECS SPLIT LAYOUT */}
      {/* ============================================================ */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Column (8 cols): Specifications & Details */}
            <div className="lg:col-span-8 space-y-16">
              
              {/* Engineering Overview */}
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-on-surface mb-6 tracking-tight">
                  Design Architecture &amp; Fabrication Capabilities
                </h2>
                <div className="space-y-4 text-base text-on-surface-variant leading-relaxed">
                  <p>
                    At <strong>Al Syed Aluminium and Glass Fabrications</strong>, our {service.title.toLowerCase()} systems are manufactured using heavy-gauge 6063-T6 architectural grade aluminium profiles and certified tempered safety glass. Designed specifically to withstand local climate conditions in Islamabad and Rawalpindi, our systems deliver superior acoustic dampening, weatherproofing, and modern aesthetics.
                  </p>
                  <p>
                    Every order is custom-fabricated in our I-8 Markaz workshop according to exact architectural dimensions, offering versatile powder-coated, anodized, and wood-finish textures.
                  </p>
                </div>
              </div>

              {/* System Variations Grid */}
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-on-surface mb-6 tracking-tight flex items-center space-x-3">
                  <Layers className="w-6 h-6 text-secondary" />
                  <span>Available Configurations</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {currentVariations.map((v, idx) => (
                    <div
                      key={idx}
                      className="bg-neutral-50 p-6 rounded-2xl border border-outline-variant hover:border-secondary hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-white border border-outline-variant text-secondary font-mono">
                            {v.tag}
                          </span>
                          <span className="text-sm font-mono font-bold text-on-surface-variant">
                            0{idx + 1}
                          </span>
                        </div>
                        <h4 className="text-base font-bold text-on-surface mb-2">
                          {v.title}
                        </h4>
                        <p className="text-sm text-on-surface-variant leading-relaxed">
                          {v.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technical Specifications Grid */}
              <div className="bg-neutral-50 p-6 sm:p-8 rounded-2xl border border-outline-variant space-y-6">
                <div className="flex items-center justify-between border-b border-outline-variant pb-4">
                  <h3 className="text-lg sm:text-xl font-bold text-on-surface flex items-center space-x-2">
                    <Settings2 className="w-5 h-5 text-secondary" />
                    <span>Technical Material Standards</span>
                  </h3>
                  <span className="hidden sm:inline-block text-xs font-bold px-2.5 py-1 rounded-md bg-white border border-outline-variant text-on-surface uppercase font-mono">
                    I-8 Standard
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="p-5 bg-white rounded-xl border border-outline-variant space-y-1 hover:border-secondary/30 transition-colors">
                    <span className="text-[11px] font-bold uppercase text-secondary tracking-wider">Aluminium Alloy</span>
                    <p className="text-sm font-bold text-on-surface">6063-T6 Architectural Grade</p>
                    <p className="text-xs text-on-surface-variant">Tensile yield 214 MPa, extreme structural rigidity</p>
                  </div>

                  <div className="p-5 bg-white rounded-xl border border-outline-variant space-y-1 hover:border-secondary/30 transition-colors">
                    <span className="text-[11px] font-bold uppercase text-secondary tracking-wider">Safety Glass Range</span>
                    <p className="text-sm font-bold text-on-surface">8mm, 10mm, 12mm &amp; DGU</p>
                    <p className="text-xs text-on-surface-variant">Shatterproof safety certified, tinted &amp; reflective options</p>
                  </div>

                  <div className="p-5 bg-white rounded-xl border border-outline-variant space-y-1 hover:border-secondary/30 transition-colors">
                    <span className="text-[11px] font-bold uppercase text-secondary tracking-wider">Gaskets &amp; Sealing</span>
                    <p className="text-sm font-bold text-on-surface">High-Density EPDM &amp; Silicon</p>
                    <p className="text-xs text-on-surface-variant">Continuous compression seal against dust &amp; heavy rain</p>
                  </div>

                  <div className="p-5 bg-white rounded-xl border border-outline-variant space-y-1 hover:border-secondary/30 transition-colors">
                    <span className="text-[11px] font-bold uppercase text-secondary tracking-wider">Surface Coatings</span>
                    <p className="text-sm font-bold text-on-surface">Powder Coat / Anodized</p>
                    <p className="text-xs text-on-surface-variant">Matt Black, Charcoal, Bronze, White &amp; Wood Finishes</p>
                  </div>
                </div>
              </div>

              {/* Quality Standards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div className="p-6 rounded-2xl bg-white border border-outline-variant hover:shadow-md transition-shadow text-center">
                  <div className="w-12 h-12 mx-auto rounded-xl bg-secondary/10 text-secondary flex items-center justify-center mb-4">
                    <Ruler className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-sm text-on-surface mb-2">Zero-Gap Sizing</h4>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    Laser measurement to fit masonry openings with zero gap tolerance.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-white border border-outline-variant hover:shadow-md transition-shadow text-center">
                  <div className="w-12 h-12 mx-auto rounded-xl bg-secondary/10 text-secondary flex items-center justify-center mb-4">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-sm text-on-surface mb-2">Structural Safety</h4>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    Engineered to meet wind load and impact resistance benchmarks.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-white border border-outline-variant hover:shadow-md transition-shadow text-center">
                  <div className="w-12 h-12 mx-auto rounded-xl bg-green-50 text-green-600 flex items-center justify-center mb-4">
                    <Clock className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-sm text-on-surface mb-2">Punctual Handover</h4>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    Reliable workshop scheduling with dedicated on-site installation crews.
                  </p>
                </div>
              </div>

              {/* Recent Installation Photos */}
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-on-surface mb-6 tracking-tight">
                  Recent Project Photos &amp; Installations
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {projectPhotos.map((photo) => (
                    <div
                      key={photo.id}
                      className="group relative h-64 rounded-2xl overflow-hidden bg-neutral-100 border border-outline-variant"
                    >
                      <Image
                        src={photo.imageUrl}
                        alt={`${service.title} installation photo - ${photo.title} by Al Syed Islamabad`}
                        fill
                        loading="lazy"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80" />
                      <div className="absolute bottom-4 left-4 right-4 text-white">
                        <p className="text-sm font-bold">{photo.title}</p>
                        <p className="text-[11px] text-secondary-light uppercase font-mono mt-0.5">{photo.projectType}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Column (4 cols): Sticky Consultation & Quote Drawer */}
            <div className="lg:col-span-4">
              <div className="sticky top-28 bg-white border border-outline-variant rounded-2xl p-6 sm:p-8 shadow-xl shadow-black/5 space-y-6">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-secondary mb-2">
                    Direct Consultation
                  </p>
                  <h3 className="text-2xl font-extrabold text-on-surface">
                    Request a Quote
                  </h3>
                  <p className="text-sm text-on-surface-variant mt-3 leading-relaxed">
                    Provide your approximate dimensions. We offer free on-site laser measurements in Islamabad &amp; Rawalpindi.
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  <Link
                    href={`/quote?service=${encodeURIComponent(service.title)}`}
                    className="w-full inline-flex items-center justify-center space-x-2 bg-secondary hover:bg-secondary-hover text-white font-semibold py-4 px-4 rounded-full text-sm transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5"
                  >
                    <FileCheck2 className="w-4 h-4" />
                    <span>Request Detailed Quote</span>
                  </Link>

                  <a
                    href={`https://wa.me/923379289079?text=${encodeURIComponent(
                      `Hello Al Syed Fabrications, I would like to inquire about ${service.title} for my project.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center space-x-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-4 px-4 rounded-full text-sm transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5"
                  >
                    <WhatsAppIcon className="w-5 h-5 shrink-0" />
                    <span>Chat on WhatsApp</span>
                  </a>

                  <a
                    href="tel:+923379289079"
                    className="w-full inline-flex items-center justify-center space-x-2 bg-white text-on-surface hover:bg-neutral-50 font-semibold py-3.5 px-4 rounded-full text-sm border border-outline-variant transition-all shadow-sm"
                  >
                    <Phone className="w-4 h-4 text-secondary" />
                    <span>Call: 0337 9289079</span>
                  </a>
                </div>

                <div className="pt-6 border-t border-outline-variant text-xs text-on-surface-variant space-y-3">
                  <div className="flex items-start space-x-2.5">
                    <CheckCircle2 className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                    <span>Pak Land City Center, Office #05, I-8 Markaz, Islamabad</span>
                  </div>
                  <div className="flex items-start space-x-2.5">
                    <CheckCircle2 className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                    <span>Guaranteed On-Time Handover</span>
                  </div>
                  <div className="flex items-start space-x-2.5">
                    <CheckCircle2 className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                    <span>100% Certified Safety Glass Guarantee</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 3. CROSS-SERVICES DISCOVERY SECTION */}
      {/* ============================================================ */}
      {otherServices.length > 0 && (
        <section className="py-20 bg-neutral-50 border-t border-outline-variant/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
              <div>
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-secondary">
                  Explore Further
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-on-surface mt-2 tracking-tight">
                  Other Architectural Solutions
                </h3>
              </div>
              <Link
                href="/services"
                className="group inline-flex items-center space-x-2 text-sm font-semibold text-secondary hover:text-secondary-hover transition-colors"
              >
                <span>View All Services</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {otherServices.map((other) => (
                <Link
                  key={other.id}
                  href={`/services/${other.slug}`}
                  className="group bg-white p-6 rounded-2xl border border-outline-variant hover:border-secondary hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <span className="text-xs font-mono font-bold text-secondary uppercase">
                      /services/{other.slug}
                    </span>
                    <h4 className="text-lg font-bold text-on-surface mt-2 group-hover:text-secondary transition-colors">
                      {other.title}
                    </h4>
                    <p className="text-sm text-on-surface-variant line-clamp-2 mt-2 leading-relaxed">
                      {other.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-outline-variant mt-5 flex items-center justify-between text-xs font-semibold text-secondary group-hover:text-secondary-hover transition-colors">
                    <span>View Specifications</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
