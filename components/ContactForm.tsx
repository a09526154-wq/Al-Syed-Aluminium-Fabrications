"use client";

import { useState } from "react";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone: phone || undefined, message }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to submit contact message.");
      }

      setSuccess(true);
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred."
      );
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="bg-white rounded-2xl p-8 sm:p-10 shadow-lg border border-outline-variant text-center space-y-4 animate-in fade-in zoom-in-95 duration-200">
        <div className="w-16 h-16 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center mx-auto border border-green-200">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="text-2xl font-extrabold text-on-surface">Message Sent Successfully!</h3>
        <p className="text-sm text-on-surface-variant max-w-md mx-auto leading-relaxed">
          Thank you for contacting us. A senior engineer from our Pak Land City Center, I-8 Markaz office will review your inquiry and respond within 24 hours.
        </p>
        <div className="pt-4">
          <a
            href="https://wa.me/923379289079?text=Hello%20Al%20Syed%20Fabrications,%20I%20just%20sent%20a%20message%20through%20your%20website."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2.5 bg-green-500 hover:bg-green-600 text-white font-semibold px-8 py-3.5 rounded-full text-sm transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
          >
            <WhatsAppIcon className="w-4 h-4 shrink-0" />
            <span>Chat on WhatsApp for Immediate Priority</span>
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-8 sm:p-10 shadow-lg border border-outline-variant">
      <div className="mb-8">
        <span className="text-xs font-bold uppercase tracking-wider text-secondary mb-2 block">
          Direct Fabrication Inquiry
        </span>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-on-surface tracking-tight">
          Send Us a Message
        </h3>
        <p className="text-sm text-on-surface-variant mt-2 leading-relaxed">
          Have questions regarding aluminium profiles, glass thickness, or custom architectural drawings?
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs font-semibold flex items-center space-x-2.5">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-on-surface mb-2">
            Your Full Name *
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Engr. Asad Ullah"
            className="w-full px-4 py-3.5 rounded-xl border border-outline-variant bg-neutral-50 text-on-surface text-sm focus:outline-none focus:border-secondary focus:bg-white focus:ring-1 focus:ring-secondary transition-colors"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-on-surface mb-2">
              Email Address *
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="asad@example.com"
              className="w-full px-4 py-3.5 rounded-xl border border-outline-variant bg-neutral-50 text-on-surface text-sm focus:outline-none focus:border-secondary focus:bg-white focus:ring-1 focus:ring-secondary transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-on-surface mb-2">
              Phone / WhatsApp
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="0337 9289079"
              className="w-full px-4 py-3.5 rounded-xl border border-outline-variant bg-neutral-50 text-on-surface text-sm focus:outline-none focus:border-secondary focus:bg-white focus:ring-1 focus:ring-secondary transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-on-surface mb-2">
            Your Message &amp; Project Details *
          </label>
          <textarea
            required
            rows={5}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Describe your requirements (e.g. aluminium sliding windows for a 1-kanal house, 12mm glass partitions, or curtain walls)..."
            className="w-full px-4 py-3.5 rounded-xl border border-outline-variant bg-neutral-50 text-on-surface text-sm focus:outline-none focus:border-secondary focus:bg-white focus:ring-1 focus:ring-secondary transition-colors leading-relaxed resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full inline-flex items-center justify-center space-x-2 bg-secondary hover:bg-secondary-hover text-white font-semibold py-4 px-6 rounded-full text-sm transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-70 cursor-pointer"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Submitting Message...</span>
            </>
          ) : (
            <>
              <span>Send Message</span>
              <Send className="w-5 h-5" />
            </>
          )}
        </button>
      </form>
    </div>
  );
}
