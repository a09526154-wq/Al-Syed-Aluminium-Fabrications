"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import {
  FileText,
  Upload,
  X,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Phone,
  ArrowRight,
  ShieldCheck,
  MapPin,
} from "lucide-react";

export function QuoteForm() {
  const searchParams = useSearchParams();
  const initialService = searchParams.get("service") || searchParams.get("product") || "";

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [projectType, setProjectType] = useState(
    initialService ? decodeURIComponent(initialService) : "Aluminium Windows"
  );
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("Islamabad");
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submittedQuoteId, setSubmittedQuoteId] = useState<string | null>(null);

  const serviceOptions = [
    "Aluminium Windows (Sliding/Casement)",
    "Glass Doors & Office Partitions",
    "Curtain Walls & Structural Facades",
    "Glass Railings & Balustrades",
    "Shower Enclosures & Cabins",
    "ACP Panel Cladding",
    "Custom Glass Work / Other",
  ];

  // Handle Multi-file Upload to Cloudinary via /api/upload
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploadingImage(true);
    setError(null);

    try {
      const uploadedUrls: string[] = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || "Failed to upload image.");
        }
        uploadedUrls.push(data.url);
      }

      setImageUrls((prev) => [...prev, ...uploadedUrls]);
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "Error uploading attached photos."
      );
    } finally {
      setUploadingImage(false);
    }
  };

  const removeImage = (index: number) => {
    setImageUrls((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const payload = {
        name,
        phone,
        email: email || undefined,
        projectType,
        description,
        location,
        imageUrls,
      };

      const res = await fetch("/api/quotes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to submit quote request.");
      }

      setSubmittedQuoteId(data.quoteId || "ok");
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred."
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (submittedQuoteId) {
    return (
      <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-md border border-neutral-border text-center max-w-2xl mx-auto animate-in fade-in zoom-in duration-300">
        <div className="w-16 h-16 bg-green-50 text-whatsapp rounded-full flex items-center justify-center mx-auto mb-6 border border-green-200 shadow-sm">
          <CheckCircle2 className="w-9 h-9" />
        </div>

        <span className="text-xs font-bold uppercase tracking-widest text-secondary">
          Request Received
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-primary mt-1">
          Thank You, {name}!
        </h2>
        <p className="text-sm text-text-dark/80 mt-3 max-w-md mx-auto leading-relaxed">
          Your quote inquiry for <strong>{projectType}</strong> has been sent to our fabrication team at Pak Land City Center, I-8 Markaz, Islamabad.
        </p>

        <div className="my-8 p-6 bg-neutral-light rounded-2xl border border-neutral-border text-left space-y-2 text-xs text-text-dark/80">
          <p><strong>Contact Phone:</strong> {phone}</p>
          <p><strong>Location:</strong> {location}</p>
          {imageUrls.length > 0 && (
            <p><strong>Attached Photos:</strong> {imageUrls.length} file(s) uploaded</p>
          )}
          <p className="text-text-dark/60 pt-2 border-t border-neutral-border">
            Our engineers will review your measurements and respond shortly.
          </p>
        </div>

        {/* WhatsApp Fast-Track Button */}
        <div className="space-y-3">
          <p className="text-xs font-semibold text-text-dark/70">
            Need faster assistance or immediate on-site measurement?
          </p>
          <a
            href={`https://wa.me/923379289079?text=${encodeURIComponent(
              `Hello Al Syed Fabrications, I just submitted a quote request for ${projectType} under the name ${name} (${phone}).`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center space-x-2 bg-whatsapp hover:bg-whatsapp-hover text-white font-bold py-3.5 px-6 rounded-xl text-sm transition-all shadow-md"
          >
            <WhatsAppIcon className="w-5 h-5 shrink-0" />
            <span>Message Us Directly on WhatsApp: 0337 9289079</span>
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-neutral-border">
      <div className="mb-8">
        <span className="text-xs font-bold uppercase tracking-widest text-secondary">
          No Obligation Consultation
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-primary mt-1">
          Request Your Free Fabrication Estimate
        </h2>
        <p className="text-xs sm:text-sm text-text-dark/70 mt-2">
          Fill out the details below. Attach drawings or site photos if available.
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs sm:text-sm flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Name */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-text-dark mb-2">
              Full Name *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Tariq Mehmood"
              className="w-full px-4 py-3 rounded-xl border border-neutral-border bg-neutral-light/50 text-sm focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/15"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-text-dark mb-2">
              Phone / WhatsApp Number *
            </label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="0337 9289079"
              className="w-full px-4 py-3 rounded-xl border border-neutral-border bg-neutral-light/50 text-sm focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/15"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Email */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-text-dark mb-2">
              Email Address (Optional)
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="client@gmail.com"
              className="w-full px-4 py-3 rounded-xl border border-neutral-border bg-neutral-light/50 text-sm focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/15"
            />
          </div>

          {/* Project Type */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-text-dark mb-2">
              Service / Project Type *
            </label>
            <select
              value={projectType}
              onChange={(e) => setProjectType(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-neutral-border bg-neutral-light/50 text-sm focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/15"
            >
              {serviceOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Location */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-text-dark mb-2">
            Project Location / City *
          </label>
          <input
            type="text"
            required
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="e.g. I-8/4, Islamabad / Bahria Town Phase 7, Rawalpindi"
            className="w-full px-4 py-3 rounded-xl border border-neutral-border bg-neutral-light/50 text-sm focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/15"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-text-dark mb-2">
            Project Details & Approximate Dimensions *
          </label>
          <textarea
            required
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your requirements (number of windows, sliding vs casement, glass thickness, dimensions in feet/inches)..."
            className="w-full px-4 py-3 rounded-xl border border-neutral-border bg-neutral-light/50 text-sm focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/15"
          />
        </div>

        {/* Image / Attachment Upload */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-text-dark mb-2">
            Upload Drawings or Site Photos (Cloudinary Upload)
          </label>
          <div className="border-2 border-dashed border-neutral-border hover:border-secondary/50 rounded-2xl p-6 text-center transition-colors bg-neutral-light/30">
            <input
              type="file"
              id="file-upload"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            <label
              htmlFor="file-upload"
              className="cursor-pointer flex flex-col items-center justify-center space-y-2"
            >
              <div className="w-10 h-10 rounded-full bg-secondary/10 text-secondary flex items-center justify-center">
                <Upload className="w-5 h-5" />
              </div>
              <p className="text-xs font-semibold text-primary">
                Click to browse photos or drawings
              </p>
              <p className="text-[11px] text-text-dark/60">
                Supports JPG, PNG, WEBP (Multiple uploads supported)
              </p>
            </label>
          </div>

          {/* Upload Progress Indicator */}
          {uploadingImage && (
            <div className="flex items-center space-x-2 text-xs text-secondary mt-3">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Uploading photo to secure cloud storage...</span>
            </div>
          )}

          {/* Uploaded Thumbnails Preview */}
          {imageUrls.length > 0 && (
            <div className="flex flex-wrap gap-3 mt-4">
              {imageUrls.map((url, idx) => (
                <div
                  key={idx}
                  className="relative w-20 h-20 rounded-xl overflow-hidden border border-neutral-border bg-neutral-light group"
                >
                  <Image
                    src={url}
                    alt={`Attachment ${idx + 1}`}
                    fill
                    className="object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(idx)}
                    className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 shadow-sm opacity-90 hover:opacity-100"
                    aria-label="Remove photo"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={submitting || uploadingImage}
          className="w-full inline-flex items-center justify-center space-x-2 bg-accent hover:bg-accent-light text-primary font-bold py-4 px-6 rounded-xl text-base transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-70"
        >
          {submitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Submitting Quote Request...</span>
            </>
          ) : (
            <>
              <span>Submit Request for Free Quote</span>
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </button>

        <div className="flex items-center justify-center space-x-2 text-xs text-text-muted pt-2">
          <ShieldCheck className="w-4 h-4 text-secondary" />
          <span>Your privacy is guaranteed. No spam, ever.</span>
        </div>
      </form>
    </div>
  );
}
