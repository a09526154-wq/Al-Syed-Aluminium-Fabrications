"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import {
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Layers,
  Clock,
  Phone,
  Sparkles,
} from "lucide-react";

// ── Typing animation for the tagline ─────────────────────────────────────────
const FULL_TEXT = "Quality You Can See, Trust You Can Feel";
const TYPING_SPEED = 55; // ms per character
const START_DELAY = 600; // ms before typing begins

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

// ── Main Component ────────────────────────────────────────────────────────────
export function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const { displayed, done } = useTypingAnimation(FULL_TEXT);

  return (
    <section
      ref={heroRef}
      className="relative min-h-[92vh] lg:min-h-[96vh] flex flex-col justify-between bg-[#0B0F1A] text-white overflow-hidden border-b border-white/10 select-none"
    >
      {/* ── Background Video + clean dark overlay ─────────────────────────── */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=75&w=1400&auto=format&fit=crop"
          className="w-full h-full object-cover object-center scale-105"
        >
          <source src="/hero.mp4" type="video/mp4" />
        </video>
        {/* Single clean dark gradient overlay for optimal contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0F1A]/85 via-[#0B0F1A]/80 to-[#0B0F1A]" />
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#ffffff15_1px,transparent_1px),linear-gradient(to_bottom,#ffffff15_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      {/* ── Hero content (centered) ────────────────────────────────────────── */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        {/* Location & Title Header (Clean floating typography, no card/pill container) */}
        <div className="flex items-center justify-center space-x-2.5 mb-6 animate-in fade-in slide-in-from-top-3 duration-700">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
          </span>
          <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-accent">
            Pak Land City Center, I-8 Markaz, Islamabad
          </span>
          <span className="text-white/40 hidden sm:inline">•</span>
          <span className="text-xs sm:text-sm text-gray-300 tracking-wider hidden sm:inline font-semibold uppercase">
            Architectural Fabricators
          </span>
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
        <p className="mt-6 text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-normal">
          Islamabad & Rawalpindi&rsquo;s premier fabricators of high-performance aluminium windows, frameless tempered glass doors, structural curtain wall facades, and contemporary glass railings.
        </p>

        {/* ── REDESIGNED PROFESSIONAL CTA BUTTONS ─────────────────────────── */}
        <div className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3.5 sm:gap-4 w-full max-w-md sm:max-w-none">
          {/* Button 1: Primary Free Quote CTA */}
          <Link
            href="/quote"
            className="group relative inline-flex items-center justify-center space-x-2.5 h-13 sm:h-14 px-7 sm:px-8 rounded-xl sm:rounded-2xl bg-gradient-to-r from-[#C9A24B] via-[#D8B45E] to-[#E5C97D] text-[#0B0F1A] font-extrabold text-sm sm:text-base tracking-tight shadow-[0_10px_25px_-5px_rgba(201,162,75,0.35)] hover:shadow-[0_15px_30px_-5px_rgba(201,162,75,0.5)] border border-[#FFE8A3]/50 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>Request a Free Quote</span>
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>

          {/* Button 2: Official WhatsApp CTA */}
          <a
            href="https://wa.me/923379289079?text=Hello%20Al%20Syed%20Fabrications,%20I%20would%20like%20to%20inquire%20about%20a%20project."
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center justify-center space-x-2.5 h-13 sm:h-14 px-6 sm:px-7 rounded-xl sm:rounded-2xl bg-gradient-to-r from-[#25D366] to-[#20BA5A] hover:from-[#22bf5b] hover:to-[#1ca44f] text-white font-bold text-sm sm:text-base tracking-tight shadow-[0_10px_25px_-5px_rgba(37,211,102,0.3)] hover:shadow-[0_15px_30px_-5px_rgba(37,211,102,0.45)] border border-[#4AE584]/40 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
          >
            <WhatsAppIcon className="w-5 h-5 sm:w-5.5 sm:h-5.5 shrink-0 transition-transform duration-200 group-hover:scale-110" />
            <span>Chat on WhatsApp</span>
          </a>

          {/* Button 3: Direct Phone Call */}
          <a
            href="tel:+923379289079"
            className="group relative inline-flex items-center justify-center space-x-2.5 h-13 sm:h-14 px-6 sm:px-7 rounded-xl sm:rounded-2xl bg-white/[0.08] hover:bg-white/[0.14] text-white font-bold text-sm sm:text-base tracking-tight border border-white/20 hover:border-white/40 backdrop-blur-md shadow-[0_10px_25px_-5px_rgba(0,0,0,0.3)] hover:shadow-[0_15px_30px_-5px_rgba(0,0,0,0.4)] transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
          >
            <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center text-accent shrink-0 border border-accent/30 group-hover:bg-accent group-hover:text-primary transition-colors">
              <Phone className="w-3.5 h-3.5" />
            </div>
            <span className="font-mono tracking-normal">0337 9289079</span>
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
