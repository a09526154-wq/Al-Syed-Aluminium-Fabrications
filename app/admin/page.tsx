"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  FileText,
  MessageSquare,
  Image as ImageIcon,
  Star,
  Layers,
  ArrowRight,
  Phone,
  MessageCircle,
  CheckCircle2,
  RefreshCw,
} from "lucide-react";

interface AdminStats {
  newQuotes: number;
  totalQuotes: number;
  newMessages: number;
  totalGallery: number;
  pendingTestimonials: number;
  totalServices: number;
  totalProducts: number;
}

interface RecentQuote {
  id: string;
  name: string;
  phone: string;
  projectType: string;
  location: string | null;
  status: string;
  createdAt: string;
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [recentQuotes, setRecentQuotes] = useState<RecentQuote[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/stats");
      const data = await res.json();
      if (res.ok && data.success) {
        setStats(data.stats);
        setRecentQuotes(data.recentQuotes || []);
      }
    } catch (err) {
      console.error("Error fetching stats:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="space-y-8">
      {/* ── Top Banner ────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-surface p-6 rounded-m3-lg border border-outline-variant elevation-1">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-on-surface">
            Fabrication Operations Overview
          </h2>
          <p className="text-xs text-on-surface-variant mt-1">
            Real-time status of inquiries, gallery portfolio, and fabrication catalog.
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={fetchStats}
            disabled={loading}
            className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-m3-xl text-xs font-semibold bg-surface-container-low hover:bg-surface-container text-on-surface transition-colors border border-outline-variant disabled:opacity-60 cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
            <span>Refresh</span>
          </button>
          <Link
            href="/admin/quotes"
            className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-m3-xl text-xs font-semibold bg-secondary hover:bg-secondary-hover text-white elevation-1 transition-colors"
          >
            <span>View All Quotes</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* ── Stat Cards Grid ───────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Card 1: New Quotes */}
        <Link
          href="/admin/quotes"
          className="bg-surface p-6 rounded-m3-lg border border-outline-variant elevation-1 hover:border-secondary hover:elevation-2 transition-all group"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
              New Quotes
            </span>
            <div className="w-10 h-10 rounded-m3-md bg-secondary-container text-on-secondary-container flex items-center justify-center group-hover:scale-105 transition-transform">
              <FileText className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-extrabold text-on-surface font-mono">
              {loading ? "..." : stats?.newQuotes ?? 0}
            </span>
            <span className="text-xs text-on-surface-variant/70">
              of {stats?.totalQuotes ?? 0} total
            </span>
          </div>
          <div className="mt-3 text-[11px] text-secondary font-semibold flex items-center space-x-1">
            <span>Inquiries awaiting contact</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        {/* Card 2: Contact Messages */}
        <Link
          href="/admin/messages"
          className="bg-surface p-6 rounded-m3-lg border border-outline-variant elevation-1 hover:border-secondary hover:elevation-2 transition-all group"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
              New Messages
            </span>
            <div className="w-10 h-10 rounded-m3-md bg-secondary-container text-on-secondary-container flex items-center justify-center group-hover:scale-105 transition-transform">
              <MessageSquare className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-extrabold text-on-surface font-mono">
              {loading ? "..." : stats?.newMessages ?? 0}
            </span>
            <span className="text-xs text-on-surface-variant/70">unread</span>
          </div>
          <div className="mt-3 text-[11px] text-secondary font-semibold flex items-center space-x-1">
            <span>Website contact inquiries</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        {/* Card 3: Gallery Portfolio */}
        <Link
          href="/admin/gallery"
          className="bg-surface p-6 rounded-m3-lg border border-outline-variant elevation-1 hover:border-secondary hover:elevation-2 transition-all group"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
              Gallery Projects
            </span>
            <div className="w-10 h-10 rounded-m3-md bg-secondary-container text-on-secondary-container flex items-center justify-center group-hover:scale-105 transition-transform">
              <ImageIcon className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-extrabold text-on-surface font-mono">
              {loading ? "..." : stats?.totalGallery ?? 0}
            </span>
            <span className="text-xs text-on-surface-variant/70">published</span>
          </div>
          <div className="mt-3 text-[11px] text-secondary font-semibold flex items-center space-x-1">
            <span>Manage Cloudinary portfolio</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        {/* Card 4: Pending Testimonials */}
        <Link
          href="/admin/testimonials"
          className="bg-surface p-6 rounded-m3-lg border border-outline-variant elevation-1 hover:border-secondary hover:elevation-2 transition-all group"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
              Pending Reviews
            </span>
            <div className="w-10 h-10 rounded-m3-md bg-secondary-container text-on-secondary-container flex items-center justify-center group-hover:scale-105 transition-transform">
              <Star className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-extrabold text-on-surface font-mono">
              {loading ? "..." : stats?.pendingTestimonials ?? 0}
            </span>
            <span className="text-xs text-on-surface-variant/70">for review</span>
          </div>
          <div className="mt-3 text-[11px] text-secondary font-semibold flex items-center space-x-1">
            <span>Moderate client feedback</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>
      </div>

      {/* ── Quick Action Hub ──────────────────────────────────────── */}
      <div className="bg-surface p-6 rounded-m3-lg border border-outline-variant elevation-1">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-on-surface mb-4">
          Quick Management Shortcuts
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Link
            href="/admin/gallery"
            className="p-4 rounded-m3-md bg-surface-container-low hover:bg-secondary-container/50 border border-outline-variant hover:border-secondary/40 transition-colors text-center"
          >
            <ImageIcon className="w-6 h-6 text-secondary mx-auto mb-2" />
            <p className="text-xs font-bold text-on-surface">Upload Project</p>
            <p className="text-[10px] text-on-surface-variant mt-0.5">To Gallery</p>
          </Link>

          <Link
            href="/admin/services"
            className="p-4 rounded-m3-md bg-surface-container-low hover:bg-secondary-container/50 border border-outline-variant hover:border-secondary/40 transition-colors text-center"
          >
            <Layers className="w-6 h-6 text-secondary mx-auto mb-2" />
            <p className="text-xs font-bold text-on-surface">Edit Services</p>
            <p className="text-[10px] text-on-surface-variant mt-0.5">Catalog & Specs</p>
          </Link>

          <Link
            href="/admin/testimonials"
            className="p-4 rounded-m3-md bg-surface-container-low hover:bg-secondary-container/50 border border-outline-variant hover:border-secondary/40 transition-colors text-center"
          >
            <Star className="w-6 h-6 text-secondary mx-auto mb-2" />
            <p className="text-xs font-bold text-on-surface">Testimonials</p>
            <p className="text-[10px] text-on-surface-variant mt-0.5">Reviews & Ratings</p>
          </Link>

          <Link
            href="/admin/settings"
            className="p-4 rounded-m3-md bg-surface-container-low hover:bg-secondary-container/50 border border-outline-variant hover:border-secondary/40 transition-colors text-center"
          >
            <CheckCircle2 className="w-6 h-6 text-secondary mx-auto mb-2" />
            <p className="text-xs font-bold text-on-surface">Site Settings</p>
            <p className="text-[10px] text-on-surface-variant mt-0.5">Phone & Address</p>
          </Link>
        </div>
      </div>

      {/* ── Recent Quote Requests ─────────────────────────────────── */}
      <div className="bg-surface rounded-m3-lg border border-outline-variant elevation-1 overflow-hidden">
        <div className="p-6 border-b border-outline-variant flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-on-surface">
              Recent Quote Requests
            </h3>
            <p className="text-xs text-on-surface-variant mt-0.5">
              Latest client inquiries submitted via website form
            </p>
          </div>
          <Link
            href="/admin/quotes"
            className="text-xs font-semibold text-secondary hover:underline"
          >
            View All Quotes →
          </Link>
        </div>

        {recentQuotes.length === 0 ? (
          <div className="p-12 text-center text-on-surface-variant text-xs">
            No quote requests found.
          </div>
        ) : (
          <div className="divide-y divide-outline-variant">
            {recentQuotes.map((quote) => (
              <div
                key={quote.id}
                className="p-5 hover:bg-surface-container-low/50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center space-x-3">
                    <span className="text-sm font-bold text-on-surface">
                      {quote.name}
                    </span>
                    <span
                      className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-m3-sm font-mono ${
                        quote.status === "new"
                          ? "bg-secondary-container text-on-secondary-container"
                          : quote.status === "contacted"
                          ? "bg-amber-100 text-amber-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {quote.status}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-on-surface-variant">
                    <span className="font-semibold text-secondary">
                      {quote.projectType}
                    </span>
                    <span>•</span>
                    <span>{quote.location || "Islamabad"}</span>
                    <span>•</span>
                    <span className="text-on-surface-variant/60">
                      {new Date(quote.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-2 shrink-0">
                  <a
                    href={`https://wa.me/${quote.phone.replace(/\D/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-m3-sm bg-green-50 text-whatsapp hover:bg-green-100 transition-colors"
                    title="Open WhatsApp chat"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </a>
                  <a
                    href={`tel:${quote.phone}`}
                    className="p-2 rounded-m3-sm bg-surface-container text-secondary hover:bg-surface-container-high transition-colors"
                    title="Call customer"
                  >
                    <Phone className="w-4 h-4" />
                  </a>
                  <Link
                    href="/admin/quotes"
                    className="px-3.5 py-1.5 rounded-m3-xl bg-surface-container-low hover:bg-secondary hover:text-white text-xs font-semibold transition-colors"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
