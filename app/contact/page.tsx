import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Sparkles,
  ShieldCheck,
  Building,
  Ruler,
  CheckCircle2,
  Navigation,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us | Al Syed Aluminium & Glass Fabrications Islamabad",
  description:
    "Visit our office and fabrication facility in Pak Land City Center, Office No. 05, I-8 Markaz, Islamabad. Contact us via phone, WhatsApp (0337 9289079), or online form.",
  keywords: [
    "Contact Al Syed Aluminium",
    "Aluminium Fabricators I-8 Markaz Islamabad",
    "Glass Works Location Islamabad",
    "Al Syed Phone Number",
    "Pak Land City Center Aluminium Office",
  ],
};

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen bg-neutral-light">
      {/* ============================================================ */}
      {/* 1. HERO BANNER */}
      {/* ============================================================ */}
      <section className="bg-primary text-text-light py-20 lg:py-24 border-b border-primary-surface relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_right,#ffffff15_1px,transparent_1px),linear-gradient(to_bottom,#ffffff15_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-primary-surface border border-accent/40 text-accent text-xs font-semibold uppercase tracking-wider mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Pak Land City Center, I-8 Markaz, Islamabad</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight max-w-4xl mx-auto">
            Contact Our Engineering &{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-[#F3E5AB] to-accent-light">
              Fabrication Team
            </span>
          </h1>

          <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto mt-6 leading-relaxed">
            Have questions about profile designs, glass thickness, or on-site laser measurements? Reach out directly to our central office and workshop.
          </p>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 2. MAIN CONTACT DETAILS & FORM GRID */}
      {/* ============================================================ */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left 5 Cols: Contact Information Cards */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Primary NAP Card */}
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-neutral-border space-y-6">
                <div className="flex items-center justify-between border-b border-neutral-border pb-4">
                  <h3 className="text-xl font-bold text-primary">
                    Head Office & Workshop
                  </h3>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-blue-50 text-[#1E5FA8] font-mono">
                    I-8 Markaz Hub
                  </span>
                </div>

                {/* Address */}
                <div className="flex items-start space-x-4">
                  <div className="w-11 h-11 rounded-2xl bg-accent/15 text-accent flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-text-dark/60">
                      Physical Address
                    </h4>
                    <p className="text-sm font-bold text-primary mt-1 leading-snug">
                      Pak Land City Center, Office No. 05, I-8 Markaz, Islamabad, 44000, Pakistan
                    </p>
                  </div>
                </div>

                {/* Phone Dial */}
                <div className="flex items-start space-x-4">
                  <div className="w-11 h-11 rounded-2xl bg-secondary/15 text-secondary flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-text-dark/60">
                      Phone Number
                    </h4>
                    <a
                      href="tel:+923379289079"
                      className="text-sm font-bold text-primary hover:text-secondary mt-1 block transition-colors font-mono"
                    >
                      0337 9289079
                    </a>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex items-start space-x-4">
                  <div className="w-11 h-11 rounded-2xl bg-green-50 text-[#25D366] flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                    <WhatsAppIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-text-dark/60">
                      WhatsApp Quick Chat
                    </h4>
                    <a
                      href="https://wa.me/923379289079?text=Hello%20Al%20Syed%20Fabrications,%20I%20would%20like%20to%20inquire%20about%20your%20services."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-bold text-[#25D366] hover:underline mt-1 block font-mono"
                    >
                      0337 9289079 (Click to Chat ↗)
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start space-x-4">
                  <div className="w-11 h-11 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-text-dark/60">
                      Email Inquiries
                    </h4>
                    <a
                      href="mailto:alsyedaluminium@gmail.com"
                      className="text-sm font-bold text-primary hover:text-secondary mt-1 block break-all transition-colors"
                    >
                      alsyedaluminium@gmail.com
                    </a>
                  </div>
                </div>

                {/* Working Hours */}
                <div className="flex items-start space-x-4 pt-4 border-t border-neutral-border">
                  <div className="w-11 h-11 rounded-2xl bg-neutral-light text-text-dark/70 flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-text-dark/60">
                      Business Hours
                    </h4>
                    <p className="text-xs font-bold text-primary mt-1">
                      Monday – Saturday: 9:00 AM – 8:00 PM
                    </p>
                    <p className="text-[11px] text-text-dark/50 mt-0.5">
                      Sunday: By appointment for on-site laser measurement
                    </p>
                  </div>
                </div>

              </div>

              {/* Service Areas Card */}
              <div className="bg-primary text-text-light p-7 rounded-3xl border border-white/10 shadow-md space-y-2.5">
                <div className="flex items-center space-x-2 text-accent">
                  <Navigation className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-widest">
                    Coverage Area
                  </span>
                </div>
                <h4 className="text-lg font-bold text-white">
                  Daily Twin Cities Site Dispatch
                </h4>
                <p className="text-xs text-text-soft/80 leading-relaxed">
                  Regular site teams covering I-8, F-6, F-7, F-8, F-10, F-11, E-11, DHA Islamabad, Bahria Town, Gulberg Greens, and Rawalpindi Cantt.
                </p>
              </div>

            </div>

            {/* Right 7 Cols: Contact Form & Google Map */}
            <div className="lg:col-span-7 space-y-8">
              
              {/* Form Component */}
              <ContactForm />

              {/* Google Maps Embed Card */}
              <div className="bg-white rounded-3xl p-7 shadow-sm border border-neutral-border space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-accent" />
                    <h4 className="text-sm font-bold text-primary">
                      Our Location on Google Maps
                    </h4>
                  </div>
                  <span className="text-xs text-text-dark/60 font-semibold">Pak Land City Center, I-8 Markaz</span>
                </div>

                <div className="w-full h-80 rounded-2xl overflow-hidden border border-neutral-border shadow-inner relative">
                  <iframe
                    title="Al Syed Aluminium & Glass Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3319.497554907127!2d73.07632617637845!3d33.68314113711927!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38dfbfe97587efc3%3A0xe54e366bc58b29c9!2sPakland%20City%20Center!5e0!3m2!1sen!2s!4v1709123456789!5m2!1sen!2s"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
