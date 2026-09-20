import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Layers,
  MapPin,
  Ruler,
  Hammer,
  CheckCircle2,
  Quote,
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
      title: "Workshop Assembly",
      desc: "Precision mitering, thermal break crimping, and EPDM gasket insertion in our dedicated I-8 Markaz fabrication workshop.",
    },
    {
      step: "04",
      icon: CheckCircle2,
      title: "Installation & Handover",
      desc: "Airtight on-site mounting, structural silicon weatherproofing, smooth roller calibration, and full functional inspection.",
    },
  ];

  const coverageAreas = [
    "F-6",
    "F-7",
    "F-8",
    "F-10",
    "F-11",
    "E-11",
    "I-8 Markaz",
    "DHA Islamabad",
    "Bahria Town",
    "Gulberg Greens",
    "PWD",
    "Rawalpindi Cantt",
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* 1. HERO BANNER — Dark overlay, matching homepage                 */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <section className="relative pt-36 pb-48 lg:pt-48 lg:pb-64 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=85&w=2000&auto=format&fit=crop"
            alt="Al Syed Aluminium & Glass Workshop"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/25 to-black/60" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
          {/* Logo representation */}
          <div className="flex flex-col items-center justify-center mb-6">
            <div className="flex flex-col items-center space-y-4 text-white mb-2 [text-shadow:_0_1px_8px_rgba(0,0,0,0.8)]">
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 bg-white rounded-full flex items-center justify-center shadow-lg overflow-hidden border-4 border-white/20">
                <Image src="/logo.jpeg" alt="Al Syed Logo" fill className="object-contain" />
              </div>
              <span className="text-4xl sm:text-5xl font-extrabold tracking-tight">
                Al Syed Fabrications
              </span>
            </div>
          </div>

          <h1 className="text-lg sm:text-xl font-semibold text-slate-200 tracking-tight max-w-2xl mx-auto [text-shadow:_0_1px_6px_rgba(0,0,0,0.8)]">
            Building Your Future, One Project at a Time.
          </h1>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* 2. OUR STORY (Overlapping Card)                               */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <section className="relative z-20 -mt-28 sm:-mt-40 lg:-mt-48 mb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-[2rem] shadow-2xl shadow-black/10 flex flex-col md:flex-row overflow-hidden border border-outline-variant/30">
            {/* Text Side */}
            <div className="flex-1 p-8 sm:p-12 lg:p-16 flex flex-col justify-center bg-white">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-secondary mb-3">
                Our Story
              </p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-on-surface mb-6 tracking-tight">
                Our Story
              </h2>
              <div className="space-y-4 text-sm sm:text-base text-on-surface-variant leading-relaxed">
                <p>
                  Al Syed Aluminium &amp; Glass Fabrications was founded with a singular vision: to revolutionize the architectural fabrication market in Islamabad and Rawalpindi by providing transparent, trustworthy, and premium fabrication services.
                </p>
                <p>
                  Over the years, we have grown from a small local workshop into a trusted regional partner, helping countless families and businesses build their perfect space with precision-engineered windows, doors, and curtain walls.
                </p>
              </div>
            </div>
            {/* Image Side */}
            <div className="md:w-5/12 lg:w-1/2 relative min-h-[300px] md:min-h-full">
              <Image
                src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1000&auto=format&fit=crop"
                alt="Our Story"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* 3. CEO MESSAGE                                                */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <section className="py-16 sm:py-20 bg-neutral-50 border-y border-outline-variant/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="flex-1 max-w-[60px] h-[2px] bg-secondary rounded-full" />
            <h2 className="text-3xl sm:text-4xl font-extrabold text-on-surface tracking-tight">
              CEO Message
            </h2>
            <span className="flex-1 max-w-[60px] h-[2px] bg-secondary rounded-full" />
          </div>

          <div className="bg-white rounded-3xl p-8 sm:p-12 lg:p-16 shadow-sm border border-outline-variant mt-10 relative">
            <Quote className="w-16 h-16 text-secondary/10 absolute top-8 left-8" />
            
            <div className="relative z-10 space-y-6 text-on-surface-variant leading-relaxed text-sm sm:text-base text-left">
              <p>
                &ldquo;Welcome to Al Syed Aluminium &amp; Glass Fabrications. When we started this company, our goal was simple: to bring integrity, precision, and world-class craftsmanship to the local fabrication industry. Today, I am proud to say that we have stayed true to that mission.
              </p>
              <p>
                We understand that when you invest in architectural aluminium and glass, you are investing in the safety, aesthetics, and longevity of your property. That is why we refuse to compromise on material quality. We strictly use heavy-gauge structural alloys and certified safety glass, ensuring our installations can withstand the test of time and the harsh realities of our local climate.
              </p>
              <p>
                To our clients, thank you for your continued trust. To our prospective partners, we look forward to bringing your architectural visions to life with zero-gap precision and absolute transparency.&rdquo;
              </p>
              <div className="pt-8 mt-8 border-t border-outline-variant flex flex-col items-start">
                <p className="font-extrabold text-on-surface text-lg">Muhammad Rizwan</p>
                <p className="text-secondary text-xs font-bold uppercase tracking-wider mt-1">Chief Executive Officer</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* 4. OUR PROCESS                                                */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section heading */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="flex items-center justify-center gap-4 mb-3">
              <span className="flex-1 max-w-[80px] h-[2px] bg-secondary rounded-full" />
              <h2 className="text-3xl sm:text-4xl font-extrabold text-on-surface tracking-tight">
                Our Process
              </h2>
              <span className="flex-1 max-w-[80px] h-[2px] bg-secondary rounded-full" />
            </div>
            <p className="text-base sm:text-lg text-on-surface-variant mt-3 leading-relaxed">
              From architectural blueprint review to final lock and sliding calibration — every millimeter strictly verified.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {workflowSteps.map((step) => {
              const IconComponent = step.icon;
              return (
                <div
                  key={step.step}
                  className="bg-white rounded-2xl p-7 border border-outline-variant hover:shadow-lg hover:border-secondary/30 transition-all duration-300 flex flex-col group"
                >
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-2xl font-mono font-extrabold text-secondary">
                      {step.step}
                    </span>
                    <div className="w-12 h-12 rounded-xl bg-secondary/10 text-secondary group-hover:bg-secondary group-hover:text-white flex items-center justify-center transition-all duration-300">
                      <IconComponent className="w-6 h-6" />
                    </div>
                  </div>
                  <h3 className="text-base font-bold text-on-surface mb-2 group-hover:text-secondary transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-sm text-on-surface-variant leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* 5. AREAS WE SERVE                                             */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-24 bg-neutral-50 border-t border-outline-variant/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="flex items-center justify-center gap-4 mb-3">
              <span className="flex-1 max-w-[80px] h-[2px] bg-secondary rounded-full" />
              <h2 className="text-3xl sm:text-4xl font-extrabold text-on-surface tracking-tight">
                Areas We Serve
              </h2>
              <span className="flex-1 max-w-[80px] h-[2px] bg-secondary rounded-full" />
            </div>
            <p className="text-base sm:text-lg text-on-surface-variant mt-3">
              Daily fabrication dispatch across all major sectors of Islamabad &amp; Rawalpindi.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {coverageAreas.map((area) => (
              <span
                key={area}
                className="inline-flex items-center space-x-1.5 px-5 py-2.5 rounded-full bg-white border border-outline-variant text-sm font-semibold text-on-surface hover:border-secondary hover:text-secondary transition-colors shadow-sm hover:shadow-md"
              >
                <MapPin className="w-4 h-4 text-secondary" />
                <span>{area}</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* 6. BOTTOM CTA                                                 */}
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
            Discuss Your Project With Our Engineers
          </h2>
          <p className="text-base sm:text-lg text-white max-w-2xl mx-auto mb-10 leading-relaxed [text-shadow:_0_1px_8px_rgba(0,0,0,0.85)]">
            Speak directly with our senior fabrication team for profile samples, structural consultations, and transparent pricing.
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
