"use client";

import { useEffect, useState } from "react";
import {
  Star,
  CheckCircle,
  XCircle,
  Edit2,
  Trash2,
  X,
  Loader2,
  AlertCircle,
  ShieldCheck,
} from "lucide-react";

interface TestimonialItem {
  id: string;
  clientName: string;
  message: string;
  rating: number;
  approved: boolean;
  createdAt: string;
}

export default function AdminTestimonialsPage() {
  const [testimonialsList, setTestimonialsList] = useState<TestimonialItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<TestimonialItem | null>(null);
  const [deletingItem, setDeletingItem] = useState<TestimonialItem | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form
  const [clientName, setClientName] = useState("");
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(5);

  const fetchTestimonials = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/testimonials");
      const data = await res.json();
      if (res.ok && data.success) {
        setTestimonialsList(data.testimonials);
      } else {
        setError(data.error || "Failed to load testimonials");
      }
    } catch (err) {
      setError("Network error fetching testimonials");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleToggleApprove = async (id: string, currentStatus: boolean) => {
    try {
      const res = await fetch("/api/admin/testimonials", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, approved: !currentStatus }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setTestimonialsList((prev) =>
          prev.map((t) => (t.id === id ? { ...t, approved: !currentStatus } : t))
        );
      }
    } catch (err) {
      console.error("Error toggling approval:", err);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    setActionLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/admin/testimonials", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: editingItem.id,
          clientName,
          message,
          rating,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update review");

      setEditingItem(null);
      fetchTestimonials();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error updating review");
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deletingItem) return;
    setActionLoading(true);
    try {
      const res = await fetch(`/api/admin/testimonials?id=${deletingItem.id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to delete");

      setDeletingItem(null);
      fetchTestimonials();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error deleting review");
    } finally {
      setActionLoading(false);
    }
  };

  const openEdit = (item: TestimonialItem) => {
    setEditingItem(item);
    setClientName(item.clientName);
    setMessage(item.message);
    setRating(item.rating);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-neutral-border shadow-xs">
        <div>
          <h2 className="text-xl font-bold text-primary">
            Testimonials & Reviews Moderation
          </h2>
          <p className="text-xs text-text-dark/60 mt-1">
            Review customer feedback, toggle approval for public visibility, or edit content.
          </p>
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

      {/* Reviews Table */}
      <div className="bg-white rounded-2xl border border-neutral-border shadow-xs overflow-hidden">
        {loading ? (
          <div className="p-12 text-center">
            <Loader2 className="w-6 h-6 animate-spin text-secondary mx-auto mb-2" />
            <p className="text-xs text-text-dark/60">Loading reviews...</p>
          </div>
        ) : testimonialsList.length === 0 ? (
          <div className="p-12 text-center text-text-dark/60 text-xs">
            No testimonials found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-neutral-light/70 border-b border-neutral-border text-text-dark/70 font-bold uppercase">
                <tr>
                  <th className="p-4">Status</th>
                  <th className="p-4">Client Name</th>
                  <th className="p-4">Rating</th>
                  <th className="p-4">Review Message</th>
                  <th className="p-4">Submitted</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-border">
                {testimonialsList.map((t) => (
                  <tr key={t.id} className="hover:bg-neutral-light/40 transition-colors">
                    <td className="p-4">
                      <button
                        onClick={() => handleToggleApprove(t.id, t.approved)}
                        className={`inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase transition-colors ${
                          t.approved
                            ? "bg-green-100 text-green-800 hover:bg-green-200"
                            : "bg-amber-100 text-amber-800 hover:bg-amber-200"
                        }`}
                      >
                        {t.approved ? (
                          <>
                            <CheckCircle className="w-3 h-3" />
                            <span>Approved</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="w-3 h-3" />
                            <span>Pending</span>
                          </>
                        )}
                      </button>
                    </td>
                    <td className="p-4 font-bold text-primary max-w-xs">
                      {t.clientName}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-0.5 text-accent">
                        {Array.from({ length: t.rating }).map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-accent" />
                        ))}
                      </div>
                    </td>
                    <td className="p-4 text-text-dark/80 max-w-md truncate">
                      &ldquo;{t.message}&rdquo;
                    </td>
                    <td className="p-4 text-text-dark/50 text-[11px]">
                      {new Date(t.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-4 text-right space-x-2 shrink-0">
                      <button
                        onClick={() => openEdit(t)}
                        className="p-1.5 rounded-lg text-secondary hover:bg-blue-50 transition-colors"
                        title="Edit Review"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setDeletingItem(t)}
                        className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                        title="Delete Review"
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

      {/* EDIT MODAL */}
      {editingItem && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-neutral-border animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-primary">Edit Review</h3>
              <button
                onClick={() => setEditingItem(null)}
                className="p-1.5 rounded-lg hover:bg-neutral-light text-text-dark"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-text-dark mb-1">
                  Client Name / Location
                </label>
                <input
                  type="text"
                  required
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-neutral-border text-xs focus:outline-none focus:border-secondary"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-text-dark mb-1">
                  Rating (1 to 5)
                </label>
                <select
                  value={rating}
                  onChange={(e) => setRating(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl border border-neutral-border text-xs focus:outline-none focus:border-secondary"
                >
                  <option value={5}>5 Stars (Excellent)</option>
                  <option value={4}>4 Stars (Good)</option>
                  <option value={3}>3 Stars (Average)</option>
                  <option value={2}>2 Stars (Poor)</option>
                  <option value={1}>1 Star (Terrible)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-text-dark mb-1">
                  Review Text
                </label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-neutral-border text-xs focus:outline-none focus:border-secondary"
                />
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-text-dark hover:bg-neutral-light border border-neutral-border"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-secondary hover:bg-secondary-hover text-white transition-colors disabled:opacity-60"
                >
                  {actionLoading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE MODAL */}
      {deletingItem && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-neutral-border text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-red-50 text-red-600 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-primary">
              Delete Testimonial?
            </h3>
            <p className="text-xs text-text-dark/70">
              Are you sure you want to delete review from &ldquo;{deletingItem.clientName}&rdquo;?
            </p>
            <div className="flex justify-center space-x-3 pt-2">
              <button
                onClick={() => setDeletingItem(null)}
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
