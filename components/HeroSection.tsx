"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

interface HeroSlide {
  image: string;
  headlineMain: string;
  headlineHighlight: string;
  tagline: string;
  description: string;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    image: "/hero.jpeg",
    headlineMain: "Precision Engineering in ",
    headlineHighlight: "Aluminium & Glass",
    tagline: "Quality You Can See, Trust You Can Feel",
    description:
      "Islamabad & Rawalpindi's premier fabricators of high-performance aluminium windows, frameless tempered glass doors, structural curtain wall facades, and contemporary glass railings.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=85&w=2000&auto=format&fit=crop",
    headlineMain: "Custom Sliding & ",
    headlineHighlight: "Casement Windows",
    tagline: "Engineered for Aesthetics, Built for Durability",
    description:
      "Bespoke thermal-break and multi-track window systems custom-manufactured to exact millimeter dimensions in our dedicated I-8 Markaz workshop.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=85&w=2000&auto=format&fit=crop",
    headlineMain: "Curtain Walls & ",
    headlineHighlight: "Modern Glass Railings",
    tagline: "Modern Architectural Facades & Balustrades",
    description:
      "Elevating commercial buildings and residential villas with high-wind structural glazing, minimalist frameless spigots, and weather-sealed installations.",
  },
];

const SLIDE_DURATION = 6000; // 6 seconds per slide

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, SLIDE_DURATION);

    return () => clearInterval(timer);
  }, [nextSlide]);

  const slide = HERO_SLIDES[currentSlide];

  return (
    <section className="relative min-h-[70vh] lg:min-h-[78vh] flex flex-col justify-center bg-black text-white overflow-hidden select-none">
      {/* ── Background Carousel Images with Smooth Cross-Fade ───────── */}
      {HERO_SLIDES.map((s, index) => (
        <div
          key={s.image}
          className={`absolute inset-0 z-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? "opacity-100 scale-100" : "opacity-0 scale-105 pointer-events-none"
          }`}
          style={{ transitionProperty: "opacity, transform" }}
        >
          <Image
            src={s.image}
            alt={`${s.headlineMain} ${s.headlineHighlight}`}
            fill
            priority={index === 0}
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>
      ))}

      {/* ── Light Black / Grey Low-Intensity Filter on Images ────────── */}
      <div className="absolute inset-0 z-0 bg-black/40" />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/50 via-black/25 to-black/60" />

      {/* ── Hero Content (Centered, Decreased Height, 100% Solid White Text) ── */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-14 sm:pt-28 sm:pb-16 text-center flex flex-col items-center justify-center">
        {/* Main Headline — 100% Solid White Text with High Readability Shadow */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15] max-w-4xl mb-3 [text-shadow:_0_2px_12px_rgba(0,0,0,0.85)] transition-all duration-500">
          <span>{slide.headlineMain}</span>
          <span className="text-white">{slide.headlineHighlight}</span>
        </h1>

        {/* Tagline — 100% Solid White Text */}
        <div className="mt-2 mb-2">
          <p className="text-lg sm:text-xl md:text-2xl font-bold italic tracking-wide text-white font-serif [text-shadow:_0_2px_10px_rgba(0,0,0,0.85)] transition-all duration-500">
            &ldquo;{slide.tagline}&rdquo;
          </p>
        </div>

        {/* Subtitle Description — 100% Solid White Text */}
        <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg text-white max-w-2xl mx-auto leading-relaxed font-medium [text-shadow:_0_1px_8px_rgba(0,0,0,0.85)] transition-all duration-500">
          {slide.description}
        </p>

        {/* ── Action Button ──────────────────────────────────────────── */}
        <div className="mt-8 sm:mt-10 flex items-center justify-center">
          <Link
            href="/quote"
            className="group inline-flex items-center justify-center space-x-2.5 h-14 px-10 rounded-full bg-secondary hover:bg-secondary-hover text-white font-semibold text-base tracking-tight elevation-3 hover:elevation-4 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 [text-shadow:none]"
          >
            <span>Request a Free Quote</span>
            <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* ── Slide Indicator Dots (Material 3 Pill System) ──────────── */}
        <div className="flex items-center justify-center space-x-2 mt-8">
          {HERO_SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-2 transition-all duration-300 rounded-m3-full cursor-pointer ${
                idx === currentSlide
                  ? "w-7 bg-white"
                  : "w-2 bg-white/40 hover:bg-white/70"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
