import { Suspense } from "react";
import type { Metadata } from "next";
import { QuoteForm } from "@/components/QuoteForm";
import {
  ShieldCheck,
  CheckCircle2,
  Clock,
  Sparkles,
  Phone,
  MessageCircle,
  MapPin,
  Loader2,
} from "lucide-react";

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
    <div className="flex flex-col min-h-screen bg-neutral-light">
      {/* Header Banner */}
      <section className="bg-primary text-text-light py-16 lg:py-20 border-b border-primary-surface relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-primary-surface border border-accent/40 text-accent text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Fast & Transparent Estimates</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Get an Instant Fabrication Quote
          </h1>
          <p className="text-base sm:text-lg text-text-soft/90 max-w-2xl mx-auto mt-3">
            Tell us about your project dimensions, desired profile series, or glass thickness. Our master fabricators will prepare a customized proposal.
          </p>
        </div>
      </section>

      {/* Main Quote Form Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Side: Form */}
            <div className="lg:col-span-8">
              <Suspense
                fallback={
                  <div className="bg-white rounded-3xl p-12 text-center border border-neutral-border">
                    <Loader2 className="w-8 h-8 animate-spin text-accent mx-auto mb-3" />
                    <p className="text-sm text-text-dark/70">Loading Quote System...</p>
                  </div>
                }
              >
                <QuoteForm />
              </Suspense>
            </div>

            {/* Right Side: Trust & Direct Contact Info */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Direct WhatsApp Callout */}
              <div className="bg-primary text-text-light p-7 rounded-3xl border border-white/10 shadow-md space-y-4">
                <span className="text-xs font-bold uppercase tracking-widest text-accent">
                  Immediate Assistance
                </span>
                <h3 className="text-xl font-bold text-white">
                  Prefer a Quick Chat on WhatsApp?
                </h3>
                <p className="text-xs text-text-soft/80 leading-relaxed">
                  Send your rough dimensions, sketches, or photos directly to our engineering number.
                </p>
                <a
                  href="https://wa.me/923379289079?text=Hello%20Al%20Syed%20Fabrications,%20I%20would%20like%20to%20get%20a%20quote."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center space-x-2 bg-whatsapp hover:bg-whatsapp-hover text-white font-bold py-3 px-4 rounded-xl text-sm transition-colors shadow"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat: 0337 9289079</span>
                </a>
              </div>

              {/* Guarantees Box */}
              <div className="bg-white p-7 rounded-3xl border border-neutral-border shadow-xs space-y-4">
                <h4 className="text-sm font-bold text-primary uppercase tracking-wider">
                  The Al Syed Guarantee
                </h4>
                <div className="space-y-3 text-xs text-text-dark/80">
                  <div className="flex items-start space-x-3">
                    <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                    <span>Free On-Site Laser Measurements across Islamabad & Rawalpindi.</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                    <span>Transparent breakdown of aluminium alloys and glass specs.</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                    <span>No hidden fabrication or transport surcharges.</span>
                  </div>
                </div>
              </div>

              {/* Location Card */}
              <div className="bg-white p-7 rounded-3xl border border-neutral-border shadow-xs text-xs text-text-dark/80 space-y-2">
                <div className="flex items-center space-x-2 text-secondary font-bold">
                  <MapPin className="w-4 h-4" />
                  <span>Workshop & Office Location</span>
                </div>
                <p className="text-text-dark/90 leading-relaxed font-medium">
                  Pak Land City Center, Office No. 05, I-8 Markaz, Islamabad
                </p>
                <p className="text-text-dark/60">
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
