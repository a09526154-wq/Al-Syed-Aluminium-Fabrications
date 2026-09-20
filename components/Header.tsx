"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ArrowRight } from "lucide-react";
import { usePathname } from "next/navigation";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Gallery", href: "/gallery" },
    { name: "Testimonials", href: "/testimonials" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-md border-b border-outline-variant"
          : mobileMenuOpen
          ? "bg-primary border-b border-white/10"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      {/* ── Main Navigation Bar ─────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 sm:h-24 transition-all duration-300">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div
              className={`w-12 h-12 rounded-full overflow-hidden border-2 shrink-0 transition-colors shadow-sm ${
                isScrolled ? "border-secondary/20 bg-white" : "border-white/20 bg-white"
              }`}
            >
              <Image
                src="/logo.jpeg"
                alt="Al Syed Aluminium & Glass Fabrications Logo"
                width={48}
                height={48}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="flex flex-col">
              <span
                className={`text-lg sm:text-xl font-extrabold tracking-tight transition-colors ${
                  isScrolled ? "text-on-surface" : "text-white"
                }`}
              >
                AL SYED
              </span>
              <span
                className={`text-[9px] sm:text-[10px] font-bold tracking-[0.15em] uppercase transition-colors ${
                  isScrolled ? "text-secondary" : "text-secondary-light"
                }`}
              >
                Aluminium &amp; Glass
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative py-2 text-sm font-bold uppercase tracking-wider transition-all duration-200 group ${
                    isScrolled
                      ? isActive
                        ? "text-primary"
                        : "text-on-surface-variant hover:text-primary"
                      : isActive
                      ? "text-white"
                      : "text-white/80 hover:text-white"
                  }`}
                >
                  {link.name}
                  {/* Underline Indicator */}
                  <span
                    className={`absolute left-0 -bottom-1 w-full h-[3px] rounded-full transition-all duration-300 ${
                      isActive
                        ? "opacity-100 scale-x-100"
                        : "opacity-0 scale-x-50 group-hover:opacity-50 group-hover:scale-x-100"
                    } ${isScrolled ? "bg-primary" : "bg-white"}`}
                  />
                </Link>
              );
            })}
            <Link
              href="/quote"
              className="ml-6 inline-flex items-center space-x-2 bg-secondary hover:bg-secondary-hover text-white font-bold px-6 py-2.5 rounded-full text-sm transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5"
            >
              <span>Get a Quote</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </nav>

          {/* Mobile Controls */}
          <div className="flex lg:hidden items-center space-x-3">
            <Link
              href="/quote"
              className="bg-secondary text-white font-bold px-4 py-2 rounded-full text-xs shadow-sm"
            >
              Quote
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className={`inline-flex items-center justify-center w-10 h-10 rounded-full transition-colors ${
                isScrolled
                  ? "text-on-surface hover:bg-neutral-100"
                  : "text-white hover:bg-white/10"
              }`}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile Menu Drawer ──────────────────────────────────────── */}
      {mobileMenuOpen && (
        <div
          className={`lg:hidden px-4 pt-2 pb-6 space-y-2 shadow-2xl transition-colors ${
            isScrolled
              ? "bg-white border-t border-outline-variant text-on-surface"
              : "bg-primary border-t border-white/10 text-white"
          }`}
        >
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`relative block px-5 py-4 text-sm font-bold uppercase tracking-wider transition-colors ${
                  isScrolled
                    ? isActive
                      ? "text-primary bg-primary/5 rounded-xl"
                      : "text-on-surface hover:bg-neutral-50 rounded-xl"
                    : isActive
                    ? "text-white bg-white/10 rounded-xl"
                    : "text-white/90 hover:bg-white/5 rounded-xl"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      isActive
                        ? isScrolled ? "bg-primary" : "bg-white"
                        : "bg-transparent"
                    }`}
                  />
                  <span>{link.name}</span>
                </div>
              </Link>
            );
          })}

          <div className="pt-4 mt-2 border-t border-outline-variant/30">
            <Link
              href="/quote"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center space-x-2 bg-secondary hover:bg-secondary-hover text-white font-bold px-5 py-4 rounded-full text-sm transition-colors shadow-sm"
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
