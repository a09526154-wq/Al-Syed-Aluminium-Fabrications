"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { getOptimizedCloudinaryUrl } from "@/lib/cloudinary-url";
import { X, ChevronLeft, ChevronRight, Maximize2, Tag } from "lucide-react";

export interface GalleryItemType {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  cloudinaryPublicId?: string | null;
  projectType: string;
  createdAt: Date;
}

interface GalleryViewProps {
  items: GalleryItemType[];
}

export function GalleryView({ items }: GalleryViewProps) {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = [
    { label: "All Projects", value: "all" },
    { label: "Residential", value: "residential" },
    { label: "Commercial", value: "commercial" },
    { label: "Before & After", value: "before_after" },
  ];

  const filteredItems = items.filter((item) => {
    if (activeCategory === "all") return true;
    if (activeCategory === "before_after") {
      return (
        item.category.toLowerCase().includes("before") ||
        item.category.toLowerCase().includes("after")
      );
    }
    return item.category.toLowerCase().includes(activeCategory);
  });

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const showNext = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % filteredItems.length);
  }, [lightboxIndex, filteredItems.length]);

  const showPrev = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex(
      (lightboxIndex - 1 + filteredItems.length) % filteredItems.length
    );
  }, [lightboxIndex, filteredItems.length]);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") showNext();
      if (e.key === "ArrowLeft") showPrev();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, showNext, showPrev]);

  return (
    <div>
      {/* Category Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => {
              setActiveCategory(cat.value);
              setLightboxIndex(null);
            }}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 shadow-xs ${
              activeCategory === cat.value
                ? "bg-primary text-accent border border-accent/40 shadow-sm"
                : "bg-white text-text-dark/70 hover:bg-neutral-light border border-neutral-border hover:text-primary"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      {filteredItems.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-neutral-border max-w-lg mx-auto">
          <Tag className="w-8 h-8 text-secondary mx-auto mb-3 opacity-60" />
          <h3 className="text-lg font-bold text-primary">No Projects In This Category</h3>
          <p className="text-xs text-text-dark/70 mt-1">
            Check back soon or select &ldquo;All Projects&rdquo; to view our full fabrication portfolio.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => {
            const optimizedUrl = getOptimizedCloudinaryUrl(
              item.imageUrl,
              "f_auto,q_auto,w_800"
            );

            return (
              <div
                key={item.id}
                onClick={() => openLightbox(index)}
                className="group relative rounded-2xl overflow-hidden bg-neutral-light border border-neutral-border shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                <div className="relative h-72 w-full overflow-hidden">
                  <Image
                    src={optimizedUrl}
                    alt={`${item.title} - ${item.projectType} aluminium & glass fabrication by Al Syed Islamabad`}
                    fill
                    loading={index < 3 ? "eager" : "lazy"}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/20 to-transparent opacity-0 group-hover:opacity-90 transition-opacity duration-300 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-accent/90 text-primary flex items-center justify-center shadow-lg transform scale-75 group-hover:scale-100 transition-transform">
                      <Maximize2 className="w-5 h-5" />
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-0 inset-x-0 p-5 text-white bg-gradient-to-t from-primary/95 via-primary/70 to-transparent">
                  <span className="inline-block px-2.5 py-0.5 rounded-md bg-accent text-primary text-[10px] font-bold uppercase tracking-wider mb-1.5">
                    {item.category}
                  </span>
                  <h3 className="text-sm sm:text-base font-bold text-white line-clamp-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-text-soft/80 mt-0.5">
                    {item.projectType}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Lightbox Modal */}
      {lightboxIndex !== null && filteredItems[lightboxIndex] && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
          onClick={closeLightbox}
        >
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-50 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Close Lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Prev Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              showPrev();
            }}
            className="absolute left-4 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Previous Image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              showNext();
            }}
            className="absolute right-4 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Next Image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Lightbox Content */}
          <div
            className="relative max-w-5xl w-full max-h-[85vh] flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-[65vh] sm:h-[75vh] rounded-2xl overflow-hidden border border-white/10 bg-primary-surface shadow-2xl">
              <Image
                src={getOptimizedCloudinaryUrl(
                  filteredItems[lightboxIndex].imageUrl,
                  "f_auto,q_auto,w_1600"
                )}
                alt={filteredItems[lightboxIndex].title}
                fill
                sizes="100vw"
                className="object-contain"
              />
            </div>

            {/* Caption Strip */}
            <div className="w-full bg-primary/80 backdrop-blur-md p-4 mt-3 rounded-xl border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2 text-white">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-accent">
                  {filteredItems[lightboxIndex].category} • {filteredItems[lightboxIndex].projectType}
                </span>
                <h4 className="text-sm sm:text-base font-bold">
                  {filteredItems[lightboxIndex].title}
                </h4>
              </div>
              <span className="text-xs text-text-soft/70 font-mono">
                {lightboxIndex + 1} of {filteredItems.length}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
