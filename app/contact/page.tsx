import type { Metadata } from "next";
import Image from "next/image";
import { ContactForm } from "@/components/ContactForm";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
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
    <div className="flex flex-col min-h-screen bg-white">
      {/* ── HERO BANNER ───────────────────────────────────────────── */}
      <section className="relative text-white pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=85&w=2000&auto=format&fit=crop"
            alt="Al Syed Aluminium Office Location"
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
            Pak Land City Center, I-8 Markaz, Islamabad
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight max-w-4xl mx-auto [text-shadow:_0_2px_12px_rgba(0,0,0,0.85)]">
            Contact Our Engineering &amp; Fabrication Team
          </h1>
          <p className="text-base sm:text-lg text-white max-w-2xl mx-auto mt-6 leading-relaxed [text-shadow:_0_1px_8px_rgba(0,0,0,0.85)]">
            Have questions about profile designs, glass thickness, or on-site laser measurements? Reach out directly to our central office and workshop.
          </p>
        </div>
      </section>

      {/* ── MAIN CONTACT DETAILS & FORM GRID ──────────────────────── */}
      <section className="py-20 lg:py-24 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left 5 Cols: Contact Information Cards */}
            <div className="lg:col-span-5 space-y-8">
              
              {/* Primary NAP Card */}
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-outline-variant space-y-8">
                <div className="flex items-center justify-between border-b border-outline-variant pb-5">
                  <h3 className="text-xl font-bold text-on-surface">
                    Head Office &amp; Workshop
                  </h3>
                  <span className="hidden sm:inline-block text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-secondary/10 text-secondary font-mono">
                    I-8 Markaz Hub
                  </span>
                </div>

                <div className="space-y-6">
                  {/* Address */}
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center shrink-0 mt-0.5">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                        Physical Address
                      </h4>
                      <p className="text-sm font-bold text-on-surface mt-1 leading-relaxed">
                        Pak Land City Center, Office No. 05, I-8 Markaz, Islamabad, 44000, Pakistan
                      </p>
                    </div>
                  </div>

                  {/* Phone Dial */}
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center shrink-0 mt-0.5">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                        Phone Number
                      </h4>
                      <a
                        href="tel:+923379289079"
                        className="text-sm font-bold text-on-surface hover:text-secondary mt-1 block transition-colors font-mono"
                      >
                        0337 9289079
                      </a>
                    </div>
                  </div>

                  {/* WhatsApp */}
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-xl bg-green-50 text-green-600 flex items-center justify-center shrink-0 mt-0.5">
                      <WhatsAppIcon className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                        WhatsApp Quick Chat
                      </h4>
                      <a
                        href="https://wa.me/923379289079?text=Hello%20Al%20Syed%20Fabrications,%20I%20would%20like%20to%20inquire%20about%20your%20services."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-bold text-green-600 hover:text-green-700 hover:underline mt-1 block font-mono transition-colors"
                      >
                        0337 9289079 (Click to Chat ↗)
                      </a>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center shrink-0 mt-0.5">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                        Email Inquiries
                      </h4>
                      <a
                        href="mailto:alsyedaluminium@gmail.com"
                        className="text-sm font-bold text-on-surface hover:text-secondary mt-1 block break-all transition-colors"
                      >
                        alsyedaluminium@gmail.com
                      </a>
                    </div>
                  </div>
                </div>

                {/* Working Hours */}
                <div className="flex items-start space-x-4 pt-6 border-t border-outline-variant">
                  <div className="w-12 h-12 rounded-xl bg-neutral-100 text-on-surface-variant flex items-center justify-center shrink-0 mt-0.5">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                      Business Hours
                    </h4>
                    <p className="text-sm font-bold text-on-surface mt-1">
                      Monday – Saturday: 9:00 AM – 8:00 PM
                    </p>
                    <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
                      Sunday: By appointment for on-site laser measurement
                    </p>
                  </div>
                </div>

              </div>


            </div>

            {/* Right 7 Cols: Contact Form & Google Map */}
            <div className="lg:col-span-7 space-y-8">
              
              {/* Form Component */}
              <ContactForm />

              {/* Google Maps Embed Card */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-outline-variant space-y-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2.5">
                    <MapPin className="w-5 h-5 text-secondary" />
                    <h4 className="text-base font-bold text-on-surface">
                      Our Location on Google Maps
                    </h4>
                  </div>
                  <span className="hidden sm:inline-block text-xs text-on-surface-variant font-medium bg-neutral-100 px-3 py-1 rounded-md">
                    Pak Land City Center, I-8
                  </span>
                </div>

                <div className="w-full h-[350px] rounded-xl overflow-hidden border border-outline-variant relative shadow-inner">
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
