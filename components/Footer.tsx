import Link from "next/link";
import Image from "next/image";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { Phone, Mail, MapPin, MessageCircle, Clock, ShieldCheck, ArrowUpRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#0B0F1A] text-gray-300 border-t border-white/10">
      {/* Top CTA Banner */}
      <div className="bg-[#0F1420] border-b border-white/10 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-accent">
              Ready for Premium Craftsmanship?
            </span>
            <h3 className="text-xl md:text-2xl font-bold text-white mt-1">
              Transform Your Space with High-Grade Aluminium & Glass
            </h3>
            <p className="text-xs sm:text-sm text-gray-300 mt-1">
              Serving Islamabad, Rawalpindi, and surrounding areas with custom architectural solutions.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href="https://wa.me/923379289079?text=Hello%20Al%20Syed%20Fabrications,%20I%20would%20like%20to%20inquire%20about%20a%20project."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-whatsapp hover:bg-whatsapp-hover text-white font-bold px-5 py-3 rounded-xl text-xs sm:text-sm transition-colors shadow-md"
            >
              <WhatsAppIcon className="w-4 h-4" />
              <span>Chat on WhatsApp</span>
            </a>
            <Link
              href="/quote"
              className="inline-flex items-center space-x-2 bg-accent hover:bg-accent-light text-primary font-bold px-5 py-3 rounded-xl text-xs sm:text-sm transition-colors shadow-md"
            >
              <span>Request a Quote</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-accent/50 shadow-sm shrink-0">
                <Image
                  src="/logo.jpeg"
                  alt="Al Syed Aluminium & Glass Fabrications Logo"
                  width={48}
                  height={48}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold tracking-tight text-white">AL SYED</span>
                <span className="text-[10px] font-semibold tracking-widest text-accent uppercase">
                  Aluminium & Glass
                </span>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              Specialists in premium architectural aluminium windows, tempered glass doors, curtain wall facades, glass railings, and modern interior glass partitions.
            </p>
            <div className="flex items-center space-x-2 text-xs text-accent font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>Quality Guaranteed • Custom Fabrication</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-accent/40 pb-2 inline-block">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link href="/" className="text-gray-300 hover:text-accent transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-accent transition-colors">About Company</Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-300 hover:text-accent transition-colors">Services & Expertise</Link>
              </li>
              <li>
                <Link href="/gallery" className="text-gray-300 hover:text-accent transition-colors">Project Portfolio</Link>
              </li>
              <li>
                <Link href="/testimonials" className="text-gray-300 hover:text-accent transition-colors">Client Testimonials</Link>
              </li>
              <li>
                <Link href="/quote" className="text-gray-300 hover:text-accent transition-colors">Get Free Quote</Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-accent transition-colors">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Services Overview */}
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-accent/40 pb-2 inline-block">
              Our Specializations
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-gray-300">
              <li>Aluminium Sliding & Casement Windows</li>
              <li>Frameless & Tempered Glass Doors</li>
              <li>Curtain Wall & Structural Glazing</li>
              <li>Glass Railings & Balustrades</li>
              <li>Shower Cabins & Enclosures</li>
              <li>ACP Panel Cladding & Facades</li>
            </ul>
          </div>

          {/* Contact Details & NAP */}
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-accent/40 pb-2 inline-block">
              Contact & Location
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <span className="text-gray-300 leading-snug">
                  Pak Land City Center, Office No. 05, I-8 Markaz, Islamabad, Pakistan
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-accent shrink-0" />
                <a href="tel:+923379289079" className="text-gray-300 hover:text-accent transition-colors">
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
                <Mail className="w-4 h-4 text-accent shrink-0" />
                <a href="mailto:alsyedaluminium@gmail.com" className="text-gray-300 hover:text-accent transition-colors break-all">
                  alsyedaluminium@gmail.com
                </a>
              </li>
              <li className="flex items-center space-x-3 text-xs text-gray-400 pt-1">
                <Clock className="w-4 h-4 text-accent shrink-0" />
                <span>Mon - Sat: 9:00 AM - 8:00 PM</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-4">
          <p>© {new Date().getFullYear()} Al Syed Aluminium and Glass Fabrications. All rights reserved.</p>
          <div className="flex items-center space-x-3 text-xs">
            <span className="text-accent font-semibold">Pak Land City Center, I-8 Markaz</span>
            <span>•</span>
            <span className="text-gray-400">Islamabad & Rawalpindi</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
