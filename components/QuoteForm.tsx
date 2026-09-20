"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import {
  Upload,
  X,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ArrowRight,
} from "lucide-react";

export function QuoteForm() {
  const searchParams = useSearchParams();
  const initialService = searchParams.get("service") || searchParams.get("product") || "";

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [projectType, setProjectType] = useState(
    initialService ? decodeURIComponent(initialService) : "Aluminium Windows (Sliding/Casement)"
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
      <div className="bg-white rounded-2xl p-8 sm:p-12 shadow-lg border border-outline-variant text-center max-w-2xl mx-auto animate-in fade-in zoom-in duration-300">
        <div className="w-16 h-16 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-green-200">
          <CheckCircle2 className="w-9 h-9" />
        </div>

        <span className="text-xs font-bold uppercase tracking-[0.15em] text-secondary">
          Request Received
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-on-surface mt-2">
          Thank You, {name}!
        </h2>
        <p className="text-sm text-on-surface-variant mt-3 max-w-md mx-auto leading-relaxed">
          Your quote inquiry for <strong>{projectType}</strong> has been sent to our fabrication team at Pak Land City Center, I-8 Markaz, Islamabad.
        </p>

        <div className="my-8 p-6 bg-neutral-50 rounded-xl border border-outline-variant text-left space-y-3 text-sm text-on-surface">
          <p><strong className="text-on-surface-variant">Contact Phone:</strong> {phone}</p>
          <p><strong className="text-on-surface-variant">Location:</strong> {location}</p>
          {imageUrls.length > 0 && (
            <p><strong className="text-on-surface-variant">Attached Photos:</strong> {imageUrls.length} file(s) uploaded</p>
          )}
          <p className="text-xs text-on-surface-variant pt-3 border-t border-outline-variant">
            Our engineers will review your measurements and respond shortly.
          </p>
        </div>

        {/* WhatsApp Fast-Track Button */}
        <div className="space-y-4">
          <p className="text-xs font-bold uppercase text-on-surface-variant tracking-wider">
            Need faster assistance or immediate on-site measurement?
          </p>
          <a
            href={`https://wa.me/923379289079?text=${encodeURIComponent(
              `Hello Al Syed Fabrications, I just submitted a quote request for ${projectType} under the name ${name} (${phone}).`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center space-x-2.5 bg-green-500 hover:bg-green-600 text-white font-semibold h-14 px-8 rounded-full text-sm transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
          >
            <WhatsAppIcon className="w-5 h-5 shrink-0" />
            <span>Message Us Directly on WhatsApp</span>
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-8 sm:p-12 shadow-lg border border-outline-variant">
      <div className="mb-8">
        <span className="text-xs font-bold uppercase tracking-[0.15em] text-secondary block mb-2">
          No Obligation Consultation
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-on-surface">
          Request Your Free Estimate
        </h2>
        <p className="text-sm text-on-surface-variant mt-2 leading-relaxed">
          Provide your approximate dimensions or attach site photos. We offer free on-site laser measurements in Islamabad &amp; Rawalpindi.
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs font-semibold flex items-center space-x-2.5">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Personal Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-bold text-on-surface uppercase tracking-wider mb-2">
              Full Name *
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

          <div>
            <label className="block text-xs font-bold text-on-surface uppercase tracking-wider mb-2">
              Phone Number *
            </label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="0337 9289079"
              className="w-full px-4 py-3.5 rounded-xl border border-outline-variant bg-neutral-50 text-on-surface text-sm focus:outline-none focus:border-secondary focus:bg-white focus:ring-1 focus:ring-secondary transition-colors"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-bold text-on-surface uppercase tracking-wider mb-2">
              Email Address (Optional)
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="asad@example.com"
              className="w-full px-4 py-3.5 rounded-xl border border-outline-variant bg-neutral-50 text-on-surface text-sm focus:outline-none focus:border-secondary focus:bg-white focus:ring-1 focus:ring-secondary transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-on-surface uppercase tracking-wider mb-2">
              Project Location *
            </label>
            <input
              type="text"
              required
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. F-8/2, Islamabad"
              className="w-full px-4 py-3.5 rounded-xl border border-outline-variant bg-neutral-50 text-on-surface text-sm focus:outline-none focus:border-secondary focus:bg-white focus:ring-1 focus:ring-secondary transition-colors"
            />
          </div>
        </div>

        {/* Service Type Selection */}
        <div>
          <label className="block text-xs font-bold text-on-surface uppercase tracking-wider mb-2">
            Primary Fabrication Service *
          </label>
          <select
            required
            value={projectType}
            onChange={(e) => setProjectType(e.target.value)}
            className="w-full px-4 py-3.5 rounded-xl border border-outline-variant bg-neutral-50 text-on-surface text-sm focus:outline-none focus:border-secondary focus:bg-white focus:ring-1 focus:ring-secondary transition-colors appearance-none cursor-pointer"
            style={{
              backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M7%2010L12%2015L17%2010%22%20stroke%3D%22%23666666%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3C%2Fsvg%3E")',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 12px center',
            }}
          >
            <option value="" disabled>Select a fabrication service...</option>
            {serviceOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        {/* Project Description */}
        <div>
          <label className="block text-xs font-bold text-on-surface uppercase tracking-wider mb-2">
            Project Description &amp; Dimensions *
          </label>
          <textarea
            required
            rows={5}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Please provide rough dimensions (Width x Height), quantity, glass preferences (e.g. 12mm tempered), and aluminium profile series (e.g. 1.6mm Chawla / Prime)..."
            className="w-full px-4 py-3.5 rounded-xl border border-outline-variant bg-neutral-50 text-on-surface text-sm focus:outline-none focus:border-secondary focus:bg-white focus:ring-1 focus:ring-secondary transition-colors leading-relaxed resize-none"
          />
        </div>

        {/* Image Upload Area */}
        <div className="bg-neutral-50 p-6 rounded-xl border border-dashed border-outline-variant transition-colors hover:border-secondary/50">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
            <div>
              <h4 className="text-sm font-bold text-on-surface">Attach Site Photos / Architectural Drawings</h4>
              <p className="text-xs text-on-surface-variant mt-1 max-w-sm leading-relaxed">
                Visualizing the masonry opening or site layout helps our engineers provide a 100% accurate quote. (Optional)
              </p>
            </div>
            
            <label className={`
              shrink-0 inline-flex items-center space-x-2 px-5 py-2.5 rounded-full border text-sm font-semibold cursor-pointer transition-colors
              ${uploadingImage 
                ? 'bg-neutral-100 border-outline-variant text-on-surface-variant cursor-not-allowed' 
                : 'bg-white border-secondary/30 text-secondary hover:bg-secondary/5 hover:border-secondary'
              }
            `}>
              {uploadingImage ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Upload className="w-4 h-4" />
              )}
              <span>{uploadingImage ? "Uploading..." : "Upload Photos"}</span>
              <input
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
                disabled={uploadingImage}
              />
            </label>
          </div>

          {/* Uploaded Images Preview Grid */}
          {imageUrls.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4 pt-4 border-t border-outline-variant/50">
              {imageUrls.map((url, idx) => (
                <div key={idx} className="relative group rounded-lg overflow-hidden bg-white border border-outline-variant aspect-square">
                  <Image
                    src={url}
                    alt={`Attached layout ${idx + 1}`}
                    fill
                    className="object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(idx)}
                    className="absolute top-1.5 right-1.5 p-1.5 bg-black/60 hover:bg-red-600 text-white rounded-full backdrop-blur-sm transition-colors opacity-0 group-hover:opacity-100"
                    aria-label="Remove image"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className="pt-4 border-t border-outline-variant">
          <button
            type="submit"
            disabled={submitting || uploadingImage}
            className="w-full inline-flex items-center justify-center space-x-2 bg-secondary hover:bg-secondary-hover text-white font-semibold h-14 rounded-full text-base transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer hover:-translate-y-0.5 active:translate-y-0"
          >
            {submitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Processing Quote Request...</span>
              </>
            ) : (
              <>
                <span>Submit for Free Estimate</span>
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
          
          <p className="text-center text-[11px] text-on-surface-variant mt-4 leading-relaxed">
            By submitting this request, you agree that an engineer from Al Syed Fabrications may contact you regarding your architectural requirements. We never share your data.
          </p>
        </div>
      </form>
    </div>
  );
}
