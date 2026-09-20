import { Suspense } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { QuoteForm } from "@/components/QuoteForm";
import {
  CheckCircle2,
  MapPin,
  Loader2,
} from "lucide-react";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";

const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "https://alsyedfabrications.com";

export const metadata: Metadata = {
  title: "Get a Free Quote | Al Syed Aluminium & Glass Fabrications Islamabad",
  description:
    "Request an instant architectural fabrication quote for aluminium windows, glass doors, railings, and curtain walls in Islamabad & Rawalpindi. Upload site photos for accurate estimates.",
  keywords: [
    "Aluminium Window Prices Islamabad",
    "Glass Door Quote Rawalpindi",
    "Fabrication Rates I-8 Markaz",
    "Al Syed Aluminium Estimate",
  ],
  alternates: {
    canonical: `${siteUrl}/quote`,
  },
  openGraph: {
    title: "Get a Free Quote | Al Syed Aluminium & Glass Fabrications Islamabad",
    description:
      "Request an instant architectural fabrication quote for aluminium windows, glass doors, railings, and curtain walls in Islamabad & Rawalpindi.",
    url: `${siteUrl}/quote`,
    images: [
      {
        url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
        width: 1200,
        height: 630,
        alt: "Get a Quote - Al Syed Aluminium & Glass Fabrications",
      },
    ],
  },
};

export default function QuotePage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* ── HERO BANNER ─────────────────────────────────────────── */}
      <section className="relative text-white pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=85&w=2000&auto=format&fit=crop"
            alt="Al Syed Aluminium Quote Request"
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
            Fast &amp; Transparent Estimates
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight max-w-4xl mx-auto [text-shadow:_0_2px_12px_rgba(0,0,0,0.85)]">
            Get an Instant Fabrication Quote
          </h1>
          <p className="text-base sm:text-lg text-white max-w-2xl mx-auto mt-6 leading-relaxed [text-shadow:_0_1px_8px_rgba(0,0,0,0.85)]">
            Tell us about your project dimensions, desired profile series, or glass thickness. Our master fabricators will prepare a customized proposal.
          </p>
        </div>
      </section>

      {/* ── MAIN QUOTE FORM SECTION ───────────────────────────────── */}
      <section className="py-20 lg:py-24 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Side: Form */}
            <div className="lg:col-span-8">
              <Suspense
                fallback={
                  <div className="bg-white rounded-2xl p-12 text-center border border-outline-variant shadow-sm">
                    <Loader2 className="w-10 h-10 animate-spin text-secondary mx-auto mb-4" />
                    <p className="text-sm font-semibold text-on-surface-variant">Loading Secure Quote System...</p>
                  </div>
                }
              >
                <QuoteForm />
              </Suspense>
            </div>

            {/* Right Side: Trust & Direct Contact Info */}
            <div className="lg:col-span-4 space-y-8">
              
              {/* Direct WhatsApp Callout */}
              <div className="bg-primary text-white p-8 rounded-2xl shadow-lg space-y-4 text-center sm:text-left">
                <span className="inline-block text-xs font-bold uppercase tracking-[0.15em] text-secondary-light mb-1">
                  Immediate Assistance
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                  Prefer a Quick Chat on WhatsApp?
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Send your rough dimensions, sketches, or photos directly to our engineering number for a rapid estimate.
                </p>
                <a
                  href="https://wa.me/923379289079?text=Hello%20Al%20Syed%20Fabrications,%20I%20would%20like%20to%20get%20a%20quote."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center space-x-2 bg-green-500 hover:bg-green-600 text-white font-semibold h-14 rounded-full text-sm transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 mt-2"
                >
                  <WhatsAppIcon className="w-5 h-5" />
                  <span>Chat: 0337 9289079</span>
                </a>
              </div>

              {/* Guarantees Box */}
              <div className="bg-white p-8 rounded-2xl border border-outline-variant shadow-sm space-y-5">
                <h4 className="text-sm font-bold text-on-surface uppercase tracking-wider flex items-center space-x-2">
                  <CheckCircle2 className="w-5 h-5 text-secondary" />
                  <span>The Al Syed Guarantee</span>
                </h4>
                <div className="space-y-4 text-sm text-on-surface-variant">
                  <div className="flex items-start space-x-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary mt-2 shrink-0" />
                    <span className="leading-relaxed">Free On-Site Laser Measurements across Islamabad &amp; Rawalpindi.</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary mt-2 shrink-0" />
                    <span className="leading-relaxed">Transparent breakdown of aluminium alloys and glass specs.</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary mt-2 shrink-0" />
                    <span className="leading-relaxed">No hidden fabrication or transport surcharges.</span>
                  </div>
                </div>
              </div>

              {/* Location Card */}
              <div className="bg-white p-8 rounded-2xl border border-outline-variant shadow-sm space-y-3">
                <div className="flex items-center space-x-2.5 text-secondary font-bold">
                  <MapPin className="w-5 h-5" />
                  <span className="text-sm uppercase tracking-wider">Workshop &amp; Office</span>
                </div>
                <p className="text-sm text-on-surface font-bold leading-relaxed pt-2">
                  Pak Land City Center, Office No. 05, I-8 Markaz, Islamabad
                </p>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Open Mon - Sat: 9:00 AM to 8:00 PM
                </p>
              </div>

            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
