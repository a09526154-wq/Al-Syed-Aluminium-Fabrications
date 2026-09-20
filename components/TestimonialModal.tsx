"use client";

import { useState } from "react";
import { Star, X, CheckCircle2, AlertCircle, Loader2, MessageSquarePlus, Sparkles } from "lucide-react";

export function TestimonialModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [clientName, setClientName] = useState("");
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ clientName, message, rating }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to submit review");
      }

      setSuccess(true);
      setClientName("");
      setMessage("");
      setRating(5);
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred."
      );
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setIsOpen(false);
    setSuccess(false);
    setError(null);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center justify-center space-x-2 h-14 px-8 rounded-full bg-secondary hover:bg-secondary-hover text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
      >
        <MessageSquarePlus className="w-5 h-5" />
        <span>Share Your Review</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-outline-variant relative animate-in zoom-in-95 duration-150">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 p-2 rounded-full text-on-surface-variant/60 hover:text-on-surface hover:bg-neutral-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6">
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-md bg-secondary/10 text-secondary text-xs font-semibold uppercase tracking-wider mb-2 border border-secondary/20">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Verified Client Feedback</span>
              </div>
              <h3 className="text-xl font-extrabold text-on-surface mt-2">
                Share Your Experience
              </h3>
              <p className="text-sm text-on-surface-variant mt-1 leading-relaxed">
                Tell property owners and architects about the quality of our aluminium and glass fabrication work.
              </p>
            </div>

            {success ? (
              <div className="py-8 text-center space-y-4">
                <div className="w-14 h-14 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center mx-auto border border-green-200">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-bold text-on-surface">Thank You for Your Feedback!</h4>
                <p className="text-sm text-on-surface-variant max-w-xs mx-auto leading-relaxed">
                  Your review has been submitted and will appear on our website after quick moderation by our engineering team.
                </p>
                <button
                  onClick={closeModal}
                  className="bg-primary hover:bg-primary-dark text-white font-semibold px-8 py-3 rounded-full text-sm transition-colors mt-4"
                >
                  Close Window
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs flex items-center space-x-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                {/* Rating Stars */}
                <div>
                  <label className="block text-xs font-bold text-on-surface uppercase tracking-wider mb-2">
                    Your Overall Rating *
                  </label>
                  <div className="flex items-center space-x-1.5 p-3 rounded-xl bg-neutral-50 border border-outline-variant">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="p-1 focus:outline-none transition-transform hover:scale-110"
                      >
                        <Star
                          className={`w-6 h-6 transition-colors ${
                            (hoverRating || rating) >= star
                              ? "fill-amber-500 text-amber-500"
                              : "text-neutral-300"
                          }`}
                        />
                      </button>
                    ))}
                    <span className="text-xs font-bold text-on-surface ml-2 font-mono">
                      {rating} / 5 Stars
                    </span>
                  </div>
                </div>

                {/* Name */}
                <div>
                  <label className="block text-xs font-bold text-on-surface uppercase tracking-wider mb-2">
                    Your Name &amp; Location / Company *
                  </label>
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="e.g. Engr. Asim Khan (Sector F-8/2, Islamabad)"
                    className="w-full px-4 py-3 rounded-xl border border-outline-variant bg-white text-on-surface text-sm focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-colors"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-bold text-on-surface uppercase tracking-wider mb-2">
                    Your Review &amp; Experience *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us about the aluminium windows, frameless glass doors, curtain walls, or glass railings installation..."
                    className="w-full px-4 py-3 rounded-xl border border-outline-variant bg-white text-on-surface text-sm focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary leading-relaxed transition-colors resize-none"
                  />
                </div>

                <div className="pt-4 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-6 py-3 rounded-full text-sm font-semibold text-on-surface hover:bg-neutral-100 border border-outline-variant transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex items-center space-x-2 bg-secondary hover:bg-secondary-hover text-white px-8 py-3 rounded-full text-sm font-semibold transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        <span>Submit Review</span>
                        <CheckCircle2 className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
