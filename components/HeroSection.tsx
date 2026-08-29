"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Layers,
  Clock,
  Phone,
} from "lucide-react";

// ── Typing animation for the tagline ─────────────────────────────────────────
const FULL_TEXT = "Quality You Can See, Trust You Can Feel";
const TYPING_SPEED = 55;  // ms per character
const START_DELAY = 600;  // ms before typing begins

function useTypingAnimation(text: string) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    setDisplayed("");
    setDone(false);

    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) {
          clearInterval(interval);
          setDone(true);
        }
      }, TYPING_SPEED);
      return () => clearInterval(interval);
    }, START_DELAY);

    return () => clearTimeout(timeout);
  }, [text]);

  return { displayed, done };
}

// ── WhatsApp SVG icon (official logo shape) ───────────────────────────────────
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M16.004 2.667C8.64 2.667 2.667 8.64 2.667 16c0 2.347.617 4.56 1.693 6.48L2.667 29.333l7.04-1.653A13.28 13.28 0 0016.004 29.333C23.36 29.333 29.333 23.36 29.333 16S23.36 2.667 16.004 2.667zm0 24c-2.107 0-4.08-.573-5.773-1.573l-.413-.24-4.187.987.987-4.08-.267-.427A10.627 10.627 0 015.333 16C5.333 10.12 10.12 5.333 16 5.333S26.667 10.12 26.667 16 21.88 26.667 16.004 26.667zm5.893-7.973c-.32-.16-1.893-.933-2.187-1.04-.293-.107-.507-.16-.72.16-.213.32-.827 1.04-1.013 1.253-.187.213-.373.24-.693.08-.32-.16-1.347-.493-2.56-1.573-.947-.84-1.587-1.88-1.773-2.2-.187-.32-.02-.493.14-.653.147-.147.32-.373.48-.56.16-.187.213-.32.32-.533.107-.213.053-.4-.027-.56-.08-.16-.72-1.733-.987-2.373-.253-.613-.52-.533-.72-.547-.187-.013-.4-.013-.613-.013-.213 0-.56.08-.853.4-.293.32-1.12 1.093-1.12 2.667s1.147 3.093 1.307 3.307c.16.213 2.253 3.44 5.453 4.827.76.333 1.36.533 1.827.68.773.24 1.467.213 2.013.133.613-.093 1.893-.773 2.16-1.52.267-.747.267-1.387.187-1.52-.08-.133-.293-.213-.613-.373z" />
    </svg>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);

  const { displayed, done } = useTypingAnimation(FULL_TEXT);

  return (
    <section
      ref={heroRef}
      className="relative min-h-[92vh] lg:min-h-[96vh] flex flex-col justify-between bg-[#0B0F1A] text-white overflow-hidden border-b border-white/10 select-none"
    >
      {/* ── Background image + clean dark overlay (no glows) ──────────────── */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=85&w=2000&auto=format&fit=crop"
          alt="Al Syed Aluminium and Glass Architectural Fabrication"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center scale-105"
        />
        {/* Single clean dark gradient — no coloured glows */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0F1A]/80 via-[#0B0F1A]/75 to-[#0B0F1A]" />
      </div>

      {/* ── Hero content (centered) ────────────────────────────────────────── */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">

        {/* Location pill */}
        <div className="inline-flex items-center space-x-2.5 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-8 animate-in fade-in slide-in-from-top-4 duration-700">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent" />
          </span>
          <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-accent">
            Pak Land City Center, I-8 Markaz, Islamabad
          </span>
          <span className="text-white/30 hidden sm:inline">•</span>
          <span className="text-xs text-gray-300 hidden sm:inline font-medium">Architectural Fabricators</span>
        </div>

        {/* Main headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1] max-w-4xl mb-4 animate-in fade-in zoom-in-95 duration-700">
          Precision Engineering in{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-[#F3E5AB] to-accent-light">
            Aluminium & Glass
          </span>
        </h1>

        {/* ── TYPING ANIMATION TAGLINE — static position ────────────────── */}
        <div className="mt-4 mb-2 z-20">
          <p className="text-xl sm:text-2xl md:text-3xl font-bold italic tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-[#FFF5D0] via-accent-light to-accent font-serif min-h-[2em] flex items-center justify-center">
            &ldquo;
            {displayed}
            {!done && (
              <span className="inline-block w-0.5 h-7 sm:h-8 md:h-9 bg-accent ml-0.5 animate-pulse" />
            )}
            &rdquo;
          </p>
        </div>

        {/* Subtitle */}
        <p className="mt-8 text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-normal">
          Islamabad & Rawalpindi&rsquo;s premier fabricators of high-performance aluminium windows, frameless tempered glass doors, structural curtain wall facades, and contemporary glass railings.
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">

          {/* Quote CTA */}
          <Link
            href="/quote"
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2.5 bg-accent hover:bg-accent-light text-primary font-bold px-8 py-4 rounded-xl text-base transition-all duration-200 hover:-translate-y-0.5"
          >
            <span>Request a Free Quote</span>
            <ArrowRight className="w-5 h-5" />
          </Link>

          {/* WhatsApp CTA — styled like the real WhatsApp brand */}
          <a
            href="https://wa.me/923379289079?text=Hello%20Al%20Syed%20Fabrications,%20I%20would%20like%20to%20inquire%20about%20a%20project."
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-3 bg-[#25D366] hover:bg-[#20BA5A] text-white font-bold px-7 py-4 rounded-xl text-base transition-all duration-200 hover:-translate-y-0.5"
          >
            {/* Official WhatsApp logo SVG */}
            <WhatsAppIcon className="w-6 h-6 shrink-0" />
            <span>Chat on WhatsApp</span>
          </a>

          {/* Phone */}
          <a
            href="tel:+923379289079"
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-4 rounded-xl text-base border border-white/20 backdrop-blur-md transition-all"
          >
            <Phone className="w-4 h-4 text-accent" />
            <span>0337 9289079</span>
          </a>
        </div>
      </div>

      {/* ── Bottom trust badges strip ──────────────────────────────────────── */}
      <div className="relative z-10 w-full bg-[#0F1420]/90 border-t border-white/10 py-5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center lg:justify-between gap-6 text-xs sm:text-sm text-gray-200">
          <div className="flex items-center space-x-2.5">
            <div className="w-7 h-7 rounded-lg bg-accent/15 text-accent flex items-center justify-center shrink-0 border border-accent/30">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <span className="font-semibold">Free Laser Site Measurement</span>
          </div>
          <div className="flex items-center space-x-2.5">
            <div className="w-7 h-7 rounded-lg bg-accent/15 text-accent flex items-center justify-center shrink-0 border border-accent/30">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <span className="font-semibold">100% Certified Tempered Safety Glass</span>
          </div>
          <div className="flex items-center space-x-2.5">
            <div className="w-7 h-7 rounded-lg bg-accent/15 text-accent flex items-center justify-center shrink-0 border border-accent/30">
              <Layers className="w-4 h-4" />
            </div>
            <span className="font-semibold">Heavy-Duty 6063-T6 Aluminium Profiles</span>
          </div>
          <div className="flex items-center space-x-2.5">
            <div className="w-7 h-7 rounded-lg bg-accent/15 text-accent flex items-center justify-center shrink-0 border border-accent/30">
              <Clock className="w-4 h-4" />
            </div>
            <span className="font-semibold">Punctual Delivery & Handover</span>
          </div>
        </div>
      </div>
    </section>
  );
}
