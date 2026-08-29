"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { Phone, Mail, MapPin, Menu, X, ArrowRight } from "lucide-react";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Gallery", href: "/gallery" },
    { name: "Testimonials", href: "/testimonials" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-[#0B0F1A] shadow-lg border-b border-white/10 text-white">
      {/* Top bar info */}
      <div className="hidden lg:block bg-[#0F1420] border-b border-white/10 py-2.5 px-4 text-xs text-gray-300">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <MapPin className="w-3.5 h-3.5 text-accent shrink-0" />
              <span className="text-gray-200">Pak Land City Center, Office #05, I-8 Markaz, Islamabad</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="w-3.5 h-3.5 text-accent shrink-0" />
              <a href="mailto:alsyedaluminium@gmail.com" className="text-gray-200 hover:text-accent transition-colors">
                alsyedaluminium@gmail.com
              </a>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <a
              href="https://wa.me/923379289079"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1.5 text-whatsapp font-semibold hover:underline"
            >
              <WhatsAppIcon className="w-3.5 h-3.5 shrink-0" />
              <span>WhatsApp: 0337 9289079</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo Brand */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-accent/50 shadow-sm shrink-0">
              <Image
                src="/logo.jpeg"
                alt="Al Syed Aluminium & Glass Fabrications Logo"
                width={44}
                height={44}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-lg md:text-xl font-extrabold tracking-tight text-white group-hover:text-accent transition-colors">
                AL SYED
              </span>
              <span className="text-[10px] md:text-xs font-semibold tracking-widest text-accent uppercase">
                Aluminium & Glass Fabrications
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center space-x-7">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-semibold text-gray-200 hover:text-accent transition-colors relative py-1"
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/quote"
              className="inline-flex items-center space-x-2 bg-accent hover:bg-accent-light text-primary font-bold px-5 py-2.5 rounded-xl text-xs sm:text-sm transition-all duration-200 shadow-md hover:shadow-lg"
            >
              <span>Get a Quote</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </nav>

          {/* Mobile menu button */}
          <div className="flex lg:hidden items-center space-x-3">
            <Link
              href="/quote"
              className="bg-accent text-primary font-bold px-3 py-1.5 rounded-lg text-xs shadow-xs"
            >
              Quote
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-lg text-gray-200 hover:text-white hover:bg-white/10 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0F1420] border-t border-white/10 px-4 pt-3 pb-6 space-y-2 text-white">
          <div className="py-2 border-b border-white/10 mb-2 text-xs text-gray-300">
            <p className="flex items-center space-x-2 py-1">
              <MapPin className="w-3.5 h-3.5 text-accent" />
              <span>I-8 Markaz, Islamabad</span>
            </p>
            <p className="flex items-center space-x-2 py-1">
              <Phone className="w-3.5 h-3.5 text-accent" />
              <a href="tel:+923379289079" className="text-accent font-semibold">0337 9289079</a>
            </p>
          </div>
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-lg text-sm font-semibold text-gray-200 hover:bg-white/10 hover:text-accent transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-2">
            <Link
              href="/quote"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center space-x-2 bg-accent text-primary font-bold px-4 py-3 rounded-xl text-sm shadow-md"
            >
              <span>Get a Free Quote</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
