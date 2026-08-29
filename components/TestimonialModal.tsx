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
        className="inline-flex items-center space-x-2.5 bg-accent hover:bg-accent-light text-primary font-bold px-6 py-3.5 rounded-xl text-sm transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 cursor-pointer"
      >
        <MessageSquarePlus className="w-4 h-4" />
        <span>Share Your Project Review</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-neutral-border relative animate-in zoom-in-95 duration-150">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-text-dark/40 hover:text-text-dark hover:bg-neutral-light transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6">
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#1E5FA8] text-xs font-bold uppercase tracking-wider mb-2">
                <Sparkles className="w-3 h-3" />
                <span>Verified Client Feedback</span>
              </div>
              <h3 className="text-xl font-extrabold text-primary">
                Share Your Experience
              </h3>
              <p className="text-xs text-text-dark/60 mt-1">
                Tell property owners and architects about the quality of our aluminium and glass fabrication work.
              </p>
            </div>

            {success ? (
              <div className="py-8 text-center space-y-4">
                <div className="w-14 h-14 bg-green-50 text-[#25D366] rounded-2xl flex items-center justify-center mx-auto border border-green-200">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-bold text-primary">Thank You for Your Feedback!</h4>
                <p className="text-xs text-text-dark/70 max-w-xs mx-auto leading-relaxed">
                  Your review has been submitted and will appear on our website after quick moderation by our engineering team.
                </p>
                <button
                  onClick={closeModal}
                  className="bg-primary hover:bg-[#0F1420] text-accent font-bold px-6 py-2.5 rounded-xl text-xs transition-colors"
                >
                  Close Window
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs flex items-center space-x-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                {/* Rating Stars */}
                <div>
                  <label className="block text-xs font-bold text-text-dark mb-1.5">
                    Your Overall Rating *
                  </label>
                  <div className="flex items-center space-x-1.5 p-3 rounded-xl bg-neutral-light border border-neutral-border">
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
                              ? "fill-accent text-accent"
                              : "text-neutral-border"
                          }`}
                        />
                      </button>
                    ))}
                    <span className="text-xs font-bold text-primary ml-2 font-mono">
                      {rating} / 5 Stars
                    </span>
                  </div>
                </div>

                {/* Name */}
                <div>
                  <label className="block text-xs font-bold text-text-dark mb-1">
                    Your Name & Location / Company *
                  </label>
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="e.g. Engr. Asim Khan (Sector F-8/2, Islamabad)"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-border text-xs focus:outline-none focus:border-[#1E5FA8]"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-bold text-text-dark mb-1">
                    Your Review & Experience *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us about the aluminium windows, frameless glass doors, curtain walls, or glass railings installation..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-border text-xs focus:outline-none focus:border-[#1E5FA8] leading-relaxed"
                  />
                </div>

                <div className="pt-2 border-t border-neutral-border flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-text-dark hover:bg-neutral-light border border-neutral-border"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center space-x-2 bg-primary hover:bg-[#0F1420] text-accent font-bold px-5 py-2 rounded-xl text-xs transition-all disabled:opacity-60"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <span>Submit Review</span>
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
