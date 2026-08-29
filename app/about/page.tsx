import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import {
  ShieldCheck,
  Award,
  Users,
  CheckCircle2,
  Clock,
  ArrowRight,
  Building,
  Target,
  Sparkles,
  Layers,
  MapPin,
  Ruler,
  Phone,
  Hammer,
} from "lucide-react";

const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "https://alsyedfabrications.com";

export const metadata: Metadata = {
  title: "About Us | Al Syed Aluminium & Glass Fabrications Islamabad",
  description:
    "Learn about Al Syed Aluminium & Glass Fabrications in I-8 Markaz, Islamabad. Over a decade of excellence in architectural aluminium works, tempered glass installations, and commercial facades.",
  keywords: [
    "About Al Syed Aluminium",
    "Aluminium Fabricator Profile Islamabad",
    "Glass Works Company I-8 Markaz",
    "Architectural Glass Team Islamabad",
    "Best Aluminium Windows Islamabad",
  ],
  alternates: {
    canonical: `${siteUrl}/about`,
  },
  openGraph: {
    title: "About Us | Al Syed Aluminium & Glass Fabrications Islamabad",
    description:
      "Over a decade of excellence in architectural aluminium works, tempered glass installations, and commercial facades in Islamabad & Rawalpindi.",
    url: `${siteUrl}/about`,
    images: [
      {
        url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
        width: 1200,
        height: 630,
        alt: "About Al Syed Aluminium & Glass Fabrications",
      },
    ],
  },
};

export default function AboutPage() {
  const stats = [
    { number: "10+", label: "Years of Master Craftsmanship" },
    { number: "500+", label: "Projects Completed in Twin Cities" },
    { number: "100%", label: "Certified Safety Tempered Glass" },
    { number: "0 mm", label: "Laser Measurement Sizing Tolerance" },
  ];

  const workflowSteps = [
    {
      step: "01",
      icon: Ruler,
      title: "Laser Site Measurement",
      desc: "Our senior fabrication specialists visit your site in Islamabad or Rawalpindi to verify masonry openings with laser precision.",
    },
    {
      step: "02",
      icon: Layers,
      title: "Profile & Glass Selection",
      desc: "Architectural consultation on 6063-T6 alloy series, glass thickness (8–12mm / DGU), acoustic dampening, and powder-coated finishes.",
    },
    {
      step: "03",
      icon: Hammer,
      title: "Workshop Precision Assembly",
      desc: "Precision mitering, thermal break crimping, and EPDM gasket insertion in our dedicated I-8 Markaz fabrication workshop.",
    },
    {
      step: "04",
      icon: CheckCircle2,
      title: "Master Installation & Handover",
      desc: "Airtight on-site mounting, structural silicon weatherproofing, smooth roller calibration, and full functional inspection.",
    },
  ];

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
            alt="Al Syed Aluminium & Glass Workshop"
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
            <span>Over a Decade of Engineering Excellence • I-8 Markaz, Islamabad</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight max-w-4xl mx-auto">
            About Al Syed{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-[#F3E5AB] to-accent-light">
              Aluminium & Glass
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-accent-light/95 italic font-serif mt-5 max-w-2xl mx-auto">
            &ldquo;Quality You Can See, Trust You Can Feel&rdquo;
          </p>

          <p className="text-sm sm:text-base text-gray-300 max-w-2xl mx-auto mt-4 leading-relaxed font-normal">
            Islamabad and Rawalpindi&apos;s trusted fabrication engineers specializing in high-performance aluminium windows, frameless tempered glass doors, curtain wall facades, and contemporary railings.
          </p>

          {/* Key Metrics Counter Strip */}
          <div className="mt-14 pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto text-center">
            {stats.map((stat, idx) => (
              <div key={idx} className="space-y-1">
                <p className="text-3xl sm:text-4xl font-extrabold text-accent font-mono">
                  {stat.number}
                </p>
                <p className="text-xs text-gray-300 uppercase tracking-wider font-medium">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 2. COMPANY STORY & HERITAGE */}
      {/* ============================================================ */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Story Text */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-bold uppercase tracking-wider">
                <span>Our Heritage & Vision</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-primary leading-tight tracking-tight">
                Architectural Precision, Built for Islamabad&apos;s Modern Skylines
              </h2>
              <div className="w-20 h-1.5 bg-gradient-to-r from-accent to-secondary rounded-full" />
              
              <p className="text-base text-text-dark/80 leading-relaxed">
                Operating from our engineering workshop and office in <span className="font-bold text-primary">Pak Land City Center, Office No. 05, I-8 Markaz, Islamabad</span>, <strong>Al Syed Aluminium and Glass Fabrications</strong> delivers bespoke architectural metalwork and glazing solutions across the Twin Cities.
              </p>

              <p className="text-base text-text-dark/80 leading-relaxed">
                Whether fabricating slimline multi-track sliding windows for luxury residential villas, frameless 12mm glass entrance systems for corporate plazas, or structural curtain wall facades for commercial developments, our focus remains uncompromising: <span className="text-primary font-bold">heavy-gauge 6063-T6 aluminium alloys, certified safety glass, and punctual on-site installation</span>.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3">
                <div className="flex items-start space-x-3.5 p-5 rounded-2xl bg-neutral-light border border-neutral-border shadow-2xs">
                  <div className="w-10 h-10 rounded-xl bg-accent/15 text-accent flex items-center justify-center shrink-0 mt-0.5">
                    <Target className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-primary">Our Mission</h3>
                    <p className="text-xs text-text-dark/70 mt-1 leading-relaxed">
                      Deliver long-lasting, weather-resistant, and aesthetically refined architectural fabrications.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5 p-5 rounded-2xl bg-neutral-light border border-neutral-border shadow-2xs">
                  <div className="w-10 h-10 rounded-xl bg-secondary/15 text-secondary flex items-center justify-center shrink-0 mt-0.5">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-primary">Safety & Integrity</h3>
                    <p className="text-xs text-text-dark/70 mt-1 leading-relaxed">
                      100% certified tempered safety glass and structural hardware engineered for wind-load resistance.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Visual Photo Card */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-neutral-border bg-primary">
                <div className="relative h-96 w-full">
                  <Image
                    src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1000&auto=format&fit=crop"
                    alt="Fabrication Workshop and Installation"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F1A] via-[#0B0F1A]/30 to-transparent" />
                </div>
                <div className="p-7 text-white bg-[#0B0F1A] border-t border-white/10">
                  <div className="flex items-center space-x-2 text-accent text-xs font-bold uppercase mb-1.5">
                    <MapPin className="w-4 h-4" />
                    <span>Pak Land City Center, I-8 Markaz, Islamabad</span>
                  </div>
                  <p className="text-sm font-bold text-white leading-snug">
                    Centrally located fabrication hub for rapid laser survey and on-site dispatch across Islamabad & Rawalpindi.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 3. 4-STEP QUALITY PROCESS WORKFLOW */}
      {/* ============================================================ */}
      <section className="py-24 bg-gradient-to-b from-neutral-light via-white to-neutral-light border-t border-b border-neutral-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-secondary">
              Strict Quality Control
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-primary mt-2 tracking-tight">
              Our 4-Step Engineering & Quality Process
            </h2>
            <div className="w-16 h-1 bg-accent mx-auto mt-4 rounded-full" />
            <p className="text-sm sm:text-base text-text-dark/70 mt-4 leading-relaxed">
              From architectural blueprint review to final lock and sliding calibration, every millimeter is strictly verified.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {workflowSteps.map((step) => {
              const IconComponent = step.icon;
              return (
                <div
                  key={step.step}
                  className="bg-white rounded-3xl p-7 shadow-sm hover:shadow-xl border border-neutral-border hover:border-accent/40 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <span className="text-2xl font-mono font-extrabold text-accent">
                        {step.step}
                      </span>
                      <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-accent shadow-xs">
                        <IconComponent className="w-5 h-5" />
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-primary mb-2 group-hover:text-secondary transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-xs text-text-dark/70 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ============================================================ */}
      {/* 4. COVERAGE AREAS STRIP */}
      {/* ============================================================ */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-primary text-white rounded-3xl p-8 sm:p-12 border border-white/10 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-2 max-w-xl text-center lg:text-left">
              <span className="text-xs font-bold uppercase tracking-widest text-accent">
                Twin Cities Service Coverage
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                Serving All Major Sectors & Housing Societies
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                Daily fabrication dispatch across Sector F-6, F-7, F-8, F-10, F-11, E-11, I-8, DHA Islamabad, Bahria Town, Gulberg Greens, and Rawalpindi Cantt.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
              <Link
                href="/quote"
                className="inline-flex items-center space-x-2 bg-accent hover:bg-accent-light text-primary font-bold px-6 py-3.5 rounded-xl text-sm transition-all shadow-md"
              >
                <span>Request On-Site Survey</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="tel:+923379289079"
                className="inline-flex items-center space-x-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-5 py-3.5 rounded-xl text-sm border border-white/20 transition-all"
              >
                <Phone className="w-4 h-4 text-accent" />
                <span>0337 9289079</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 5. BOTTOM CTA BANNER */}
      {/* ============================================================ */}
      <section className="relative text-white py-20 overflow-hidden">
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
            Get Started Today
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white max-w-3xl mx-auto leading-tight">
            Discuss Your Architectural Glass & Aluminium Project
          </h2>
          <p className="text-base sm:text-lg text-gray-300 max-w-xl mx-auto mt-4 mb-8 leading-relaxed">
            Speak directly with our senior fabrication engineers for profile samples, structural consultations, and transparent pricing.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/quote"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-accent hover:bg-accent-light text-primary font-bold px-8 py-4 rounded-xl text-base transition-all duration-200 shadow-md hover:-translate-y-0.5"
            >
              <span>Get a Free Quote</span>
              <ArrowRight className="w-5 h-5" />
            </Link>

            <a
              href="https://wa.me/923379289079?text=Hello%20Al%20Syed%20Fabrications,%20I%20would%20like%20to%20discuss%20a%20project."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2.5 bg-[#25D366] hover:bg-[#20BA5A] text-white font-bold px-8 py-4 rounded-xl text-base transition-all duration-200 shadow-md hover:-translate-y-0.5"
            >
              <WhatsAppIcon className="w-5 h-5 shrink-0" />
              <span>WhatsApp Direct</span>
            </a>

            <a
              href="tel:+923379289079"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-4 rounded-xl text-base border border-white/20 backdrop-blur-sm transition-all"
            >
              <Phone className="w-4 h-4 text-accent" />
              <span>0337 9289079</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
