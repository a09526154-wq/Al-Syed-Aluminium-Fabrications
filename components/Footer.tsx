import Link from "next/link";
import Image from "next/image";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { Phone, Mail, MapPin, Clock, ShieldCheck } from "lucide-react";

export function Footer() {
  return (
    <footer className="text-slate-300" style={{ backgroundColor: '#111111' }}>

      {/* ── Main Footer Content ──────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-11 h-11 rounded-m3-lg overflow-hidden border-2 border-secondary/40 shrink-0">
                <Image
                  src="/logo.jpeg"
                  alt="Al Syed Aluminium & Glass Fabrications Logo"
                  width={44}
                  height={44}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold tracking-tight text-white">AL SYED</span>
                <span className="text-[10px] font-semibold tracking-[0.15em] text-secondary-light uppercase">
                  Aluminium & Glass
                </span>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Specialists in premium architectural aluminium windows, tempered glass doors, curtain wall facades, glass railings, and modern interior glass partitions.
            </p>
            <div className="flex items-center space-x-2 text-xs text-secondary-light font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>Quality Guaranteed • Custom Fabrication</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider mb-4 pb-2 border-b border-secondary/30 inline-block">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              {[
                { name: "Home", href: "/" },
                { name: "About Company", href: "/about" },
                { name: "Services & Expertise", href: "/services" },
                { name: "Project Portfolio", href: "/gallery" },
                { name: "Client Testimonials", href: "/testimonials" },
                { name: "Get Free Quote", href: "/quote" },
                { name: "Contact Us", href: "/contact" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Overview */}
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider mb-4 pb-2 border-b border-secondary/30 inline-block">
              Our Specializations
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-400">
              <li>Aluminium Sliding & Casement Windows</li>
              <li>Frameless & Tempered Glass Doors</li>
              <li>Curtain Wall & Structural Glazing</li>
              <li>Glass Railings & Balustrades</li>
              <li>Shower Cabins & Enclosures</li>
              <li>ACP Panel Cladding & Facades</li>
            </ul>
          </div>

          {/* Contact NAP */}
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider mb-4 pb-2 border-b border-secondary/30 inline-block">
              Contact & Location
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm">
              <li className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-secondary-light shrink-0 mt-0.5" />
                <span className="text-slate-400 leading-snug">
                  Pak Land City Center, Office No. 05, I-8 Markaz, Islamabad, Pakistan
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-secondary-light shrink-0" />
                <a href="tel:+923379289079" className="text-slate-400 hover:text-white transition-colors">
                  0337 9289079
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <WhatsAppIcon className="w-4 h-4 text-whatsapp shrink-0" />
                <a
                  href="https://wa.me/923379289079"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-whatsapp hover:underline font-semibold"
                >
                  WhatsApp: 0337 9289079
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-secondary-light shrink-0" />
                <a href="mailto:alsyedaluminium@gmail.com" className="text-slate-400 hover:text-white transition-colors break-all">
                  alsyedaluminium@gmail.com
                </a>
              </li>
              <li className="flex items-center space-x-3 text-xs text-slate-500 pt-1">
                <Clock className="w-4 h-4 text-secondary-light shrink-0" />
                <span>Mon - Sat: 9:00 AM - 8:00 PM</span>
              </li>
            </ul>
          </div>
        </div>

        {/* ── Bottom Bar ─────────────────────────────────────────────── */}
        <div className="mt-12 pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Al Syed Aluminium and Glass Fabrications. All rights reserved.</p>
          <div className="flex items-center space-x-3 text-xs">
            <span className="text-secondary-light font-semibold">Pak Land City Center, I-8 Markaz</span>
            <span>•</span>
            <span className="text-slate-500">Islamabad & Rawalpindi</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
