"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import {
  FileText,
  Search,
  Filter,
  Download,
  Phone,
  Mail,
  MapPin,
  Clock,
  Trash2,
  X,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ExternalLink,
  ChevronRight,
} from "lucide-react";

interface QuoteItem {
  id: string;
  name: string;
  phone: string;
  email?: string | null;
  projectType: string;
  description?: string | null;
  location?: string | null;
  imageUrls: string[];
  status: "new" | "contacted" | "closed";
  createdAt: string;
}

export default function AdminQuotesPage() {
  const [quotes, setQuotes] = useState<QuoteItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedQuote, setSelectedQuote] = useState<QuoteItem | null>(null);
  const [deletingQuote, setDeletingQuote] = useState<QuoteItem | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchQuotes = useCallback(async () => {
    setLoading(true);
    try {
      const url =
        filterStatus === "all"
          ? "/api/admin/quotes"
          : `/api/admin/quotes?status=${filterStatus}`;
      const res = await fetch(url);
      const data = await res.json();
      if (res.ok && data.success) {
        setQuotes(data.quotes);
      } else {
        setError(data.error || "Failed to load quotes");
      }
    } catch (err) {
      setError("Network error fetching quotes");
    } finally {
      setLoading(false);
    }
  }, [filterStatus]);

  useEffect(() => {
    fetchQuotes();
  }, [fetchQuotes]);

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const res = await fetch("/api/admin/quotes", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setQuotes((prev) =>
          prev.map((q) => (q.id === id ? { ...q, status: newStatus as any } : q))
        );
        if (selectedQuote?.id === id) {
          setSelectedQuote((prev) => (prev ? { ...prev, status: newStatus as any } : null));
        }
      }
    } catch (err) {
      console.error("Status update error:", err);
    }
  };

  const handleDelete = async () => {
    if (!deletingQuote) return;
    setActionLoading(true);
    try {
      const res = await fetch(`/api/admin/quotes?id=${deletingQuote.id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to delete");

      setDeletingQuote(null);
      if (selectedQuote?.id === deletingQuote.id) setSelectedQuote(null);
      fetchQuotes();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error deleting quote");
    } finally {
      setActionLoading(false);
    }
  };

  // Export Filtered Quotes to CSV
  const exportToCSV = () => {
    if (filteredQuotes.length === 0) return;

    const headers = [
      "ID",
      "Date",
      "Customer Name",
      "Phone",
      "Email",
      "Project Type",
      "Location",
      "Status",
      "Description",
      "Attached Photos",
    ];

    const rows = filteredQuotes.map((q) => [
      `"${q.id}"`,
      `"${new Date(q.createdAt).toLocaleString("en-PK")}"`,
      `"${(q.name || "").replace(/"/g, '""')}"`,
      `"${(q.phone || "").replace(/"/g, '""')}"`,
      `"${(q.email || "").replace(/"/g, '""')}"`,
      `"${(q.projectType || "").replace(/"/g, '""')}"`,
      `"${(q.location || "").replace(/"/g, '""')}"`,
      `"${q.status}"`,
      `"${(q.description || "").replace(/"/g, '""').replace(/\n/g, " ")}"`,
      `"${(q.imageUrls || []).join(" | ")}"`,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `Al_Syed_Quotes_${filterStatus}_${new Date().toISOString().split("T")[0]}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredQuotes = quotes.filter((q) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      q.name.toLowerCase().includes(query) ||
      q.phone.includes(query) ||
      (q.location && q.location.toLowerCase().includes(query)) ||
      q.projectType.toLowerCase().includes(query)
    );
  });

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-neutral-border shadow-xs">
        <div>
          <h2 className="text-xl font-bold text-primary">
            Quote Inquiries Inbox
          </h2>
          <p className="text-xs text-text-dark/60 mt-1">
            Review client requests, examine site photos, manage status, and export to CSV.
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={exportToCSV}
            disabled={filteredQuotes.length === 0}
            className="inline-flex items-center space-x-2 bg-neutral-light hover:bg-neutral-border text-primary font-bold px-4 py-2.5 rounded-xl text-xs border border-neutral-border transition-colors disabled:opacity-50"
          >
            <Download className="w-4 h-4" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
          <button onClick={() => setError(null)} className="text-red-700 font-bold">
            ×
          </button>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-neutral-border shadow-xs">
        {/* Status Filter Tabs */}
        <div className="flex items-center space-x-1.5 overflow-x-auto w-full sm:w-auto">
          {["all", "new", "contacted", "closed"].map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors ${
                filterStatus === st
                  ? "bg-secondary text-white"
                  : "text-text-dark/70 hover:bg-neutral-light"
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-text-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search name, phone, area..."
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-neutral-border text-xs focus:outline-none focus:border-secondary"
          />
        </div>
      </div>

      {/* Quotes Table */}
      <div className="bg-white rounded-2xl border border-neutral-border shadow-xs overflow-hidden">
        {loading ? (
          <div className="p-12 text-center">
            <Loader2 className="w-6 h-6 animate-spin text-secondary mx-auto mb-2" />
            <p className="text-xs text-text-dark/60">Loading quote requests...</p>
          </div>
        ) : filteredQuotes.length === 0 ? (
          <div className="p-12 text-center text-text-dark/60 text-xs">
            No quote requests matching your current filters.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-neutral-light/70 border-b border-neutral-border text-text-dark/70 font-bold uppercase">
                <tr>
                  <th className="p-4">Customer</th>
                  <th className="p-4">Project Type</th>
                  <th className="p-4">Location</th>
                  <th className="p-4">Photos</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Date</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-border">
                {filteredQuotes.map((q) => (
                  <tr
                    key={q.id}
                    className="hover:bg-neutral-light/50 transition-colors cursor-pointer"
                    onClick={() => setSelectedQuote(q)}
                  >
                    <td className="p-4">
                      <div className="font-bold text-primary">{q.name}</div>
                      <div className="text-[11px] text-text-dark/60 font-mono">
                        {q.phone}
                      </div>
                    </td>
                    <td className="p-4 font-semibold text-secondary">
                      {q.projectType}
                    </td>
                    <td className="p-4 text-text-dark/70">
                      {q.location || "Islamabad"}
                    </td>
                    <td className="p-4">
                      {q.imageUrls && q.imageUrls.length > 0 ? (
                        <span className="inline-block px-2 py-0.5 rounded-md bg-blue-50 text-secondary font-bold text-[10px] border border-blue-200">
                          {q.imageUrls.length} image(s)
                        </span>
                      ) : (
                        <span className="text-text-dark/40 text-[11px]">—</span>
                      )}
                    </td>
                    <td className="p-4" onClick={(e) => e.stopPropagation()}>
                      <select
                        value={q.status}
                        onChange={(e) => handleStatusChange(q.id, e.target.value)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-bold uppercase border font-mono ${
                          q.status === "new"
                            ? "bg-blue-50 text-secondary border-blue-200"
                            : q.status === "contacted"
                            ? "bg-amber-50 text-amber-700 border-amber-200"
                            : "bg-green-50 text-green-700 border-green-200"
                        }`}
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="closed">Closed</option>
                      </select>
                    </td>
                    <td className="p-4 text-text-dark/50 text-[11px]">
                      {new Date(q.createdAt).toLocaleDateString()}
                    </td>
                    <td
                      className="p-4 text-right space-x-2 shrink-0"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <a
                        href={`https://wa.me/${q.phone.replace(/\D/g, "")}?text=${encodeURIComponent(
                          `Hello ${q.name}, this is Al Syed Aluminium & Glass Fabrications regarding your quote request for ${q.projectType}.`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex p-1.5 rounded-lg bg-green-50 text-whatsapp hover:bg-green-100 transition-colors"
                        title="Chat on WhatsApp"
                      >
                        <WhatsAppIcon className="w-4 h-4" />
                      </a>
                      <button
                        onClick={() => setSelectedQuote(q)}
                        className="inline-flex p-1.5 rounded-lg text-secondary hover:bg-blue-50 transition-colors"
                        title="View Details"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setDeletingQuote(q)}
                        className="inline-flex p-1.5 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                        title="Delete Quote"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ============================================================ */}
      {/* QUOTE DETAIL DRAWER / MODAL */}
      {/* ============================================================ */}
      {selectedQuote && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-neutral-border animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-border">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-secondary">
                  Quote Detail
                </span>
                <h3 className="text-xl font-bold text-primary mt-0.5">
                  {selectedQuote.name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedQuote(null)}
                className="p-1.5 rounded-lg hover:bg-neutral-light text-text-dark"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-6 space-y-6">
              {/* Contact & Status Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-neutral-light p-4 rounded-2xl border border-neutral-border text-xs">
                <div>
                  <span className="text-text-dark/50 font-semibold block">Phone / WhatsApp</span>
                  <div className="flex items-center space-x-2 mt-1">
                    <a
                      href={`tel:${selectedQuote.phone}`}
                      className="font-bold text-primary hover:text-secondary"
                    >
                      {selectedQuote.phone}
                    </a>
                    <a
                      href={`https://wa.me/${selectedQuote.phone.replace(/\D/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-whatsapp hover:underline"
                    >
                      (WhatsApp)
                    </a>
                  </div>
                </div>

                <div>
                  <span className="text-text-dark/50 font-semibold block">Email</span>
                  <span className="font-bold text-primary mt-1 block">
                    {selectedQuote.email || "Not provided"}
                  </span>
                </div>

                <div>
                  <span className="text-text-dark/50 font-semibold block">Project Location</span>
                  <span className="font-bold text-primary mt-1 block">
                    {selectedQuote.location || "Islamabad"}
                  </span>
                </div>

                <div>
                  <span className="text-text-dark/50 font-semibold block">Current Status</span>
                  <select
                    value={selectedQuote.status}
                    onChange={(e) =>
                      handleStatusChange(selectedQuote.id, e.target.value)
                    }
                    className="mt-1 px-2.5 py-1 rounded-lg text-xs font-bold uppercase bg-white border border-neutral-border"
                  >
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="closed">Closed</option>
                  </select>
                </div>
              </div>

              {/* Description */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-text-dark mb-2">
                  Project Description & Measurement Notes
                </h4>
                <div className="p-4 bg-neutral-light rounded-2xl border border-neutral-border text-xs text-text-dark/80 whitespace-pre-wrap leading-relaxed">
                  {selectedQuote.description || "No description provided."}
                </div>
              </div>

              {/* Uploaded Photos */}
              {selectedQuote.imageUrls && selectedQuote.imageUrls.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-text-dark mb-2">
                    Attached Site Photos / Drawings ({selectedQuote.imageUrls.length})
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {selectedQuote.imageUrls.map((url, idx) => (
                      <a
                        key={idx}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative h-28 rounded-xl overflow-hidden border border-neutral-border group bg-neutral-light"
                      >
                        <Image
                          src={url}
                          alt={`Attachment ${idx + 1}`}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-[10px] font-bold transition-opacity">
                          View Full Image ↗
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Actions Bar */}
            <div className="pt-4 border-t border-neutral-border flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={() => setDeletingQuote(selectedQuote)}
                className="inline-flex items-center space-x-1.5 text-xs font-semibold text-red-600 hover:underline"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete Quote Request</span>
              </button>

              <div className="flex items-center space-x-3">
                <a
                  href={`https://wa.me/${selectedQuote.phone.replace(/\D/g, "")}?text=${encodeURIComponent(
                    `Hello ${selectedQuote.name}, thank you for contacting Al Syed Aluminium & Glass Fabrications (I-8 Markaz, Islamabad). We have reviewed your quote request for ${selectedQuote.projectType}.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 bg-whatsapp hover:bg-whatsapp-hover text-white font-bold px-4 py-2 rounded-xl text-xs transition-colors shadow-xs"
                >
                  <WhatsAppIcon className="w-4 h-4" />
                  <span>Reply on WhatsApp</span>
                </a>
                <a
                  href={`tel:${selectedQuote.phone}`}
                  className="inline-flex items-center space-x-1.5 bg-secondary hover:bg-secondary-hover text-white font-bold px-4 py-2 rounded-xl text-xs transition-colors shadow-xs"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call Customer</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DELETE MODAL */}
      {deletingQuote && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-neutral-border text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-red-50 text-red-600 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-primary">
              Delete Quote Request?
            </h3>
            <p className="text-xs text-text-dark/70">
              Are you sure you want to permanently delete this quote request from &ldquo;{deletingQuote.name}&rdquo;?
            </p>
            <div className="flex justify-center space-x-3 pt-2">
              <button
                onClick={() => setDeletingQuote(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-text-dark hover:bg-neutral-light border border-neutral-border"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={actionLoading}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-red-600 hover:bg-red-700 text-white transition-colors disabled:opacity-60"
              >
                {actionLoading ? "Deleting..." : "Confirm Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
