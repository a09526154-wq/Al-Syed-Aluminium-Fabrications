"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import {
  Save,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Shield,
  Phone,
  Globe,
} from "lucide-react";

export default function AdminSettingsPage() {
  const { data: session } = useSession();
  const [settings, setSettings] = useState<Record<string, string>>({
    company_name: "Al Syed Aluminium & Glass Fabrications",
    company_address: "Pak Land City Center, Office No. 05, I-8 Markaz, Islamabad",
    company_phone: "0337 9289079",
    company_whatsapp: "0337 9289079",
    company_email: "alsyedaluminium@gmail.com",
    operating_hours: "Mon - Sat: 9:00 AM - 8:00 PM",
    seo_meta_title: "Al Syed Aluminium & Glass Fabrications | I-8 Markaz, Islamabad",
    seo_meta_description:
      "Islamabad's premier architectural aluminium windows, tempered glass doors, curtain wall facades, and modern glass railings.",
    social_facebook: "",
    social_instagram: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const userRole = session?.user?.role || "staff";
  const isAdmin = userRole === "admin";

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/settings");
      const data = await res.json();
      if (res.ok && data.success) {
        setSettings((prev) => ({ ...prev, ...data.settings }));
      }
    } catch (err) {
      console.error("Error fetching settings:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleChange = (key: string, value: string) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAdmin) {
      setError("Only users with the 'admin' role have permission to save settings.");
      return;
    }

    setSaving(true);
    setError(null);
    setSavedSuccess(false);

    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ settings }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update settings");

      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 4000);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error saving settings");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* ── Header ────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-surface p-6 rounded-m3-lg border border-outline-variant elevation-1">
        <div>
          <h2 className="text-xl font-bold text-on-surface">
            Site Configuration & SEO Defaults
          </h2>
          <p className="text-xs text-on-surface-variant mt-1">
            Manage global NAP contact details, operating hours, and search engine metadata.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <span
            className={`text-xs font-bold uppercase px-3 py-1 rounded-m3-sm font-mono ${
              isAdmin
                ? "bg-secondary-container text-on-secondary-container border border-secondary/30"
                : "bg-surface-container text-on-surface-variant border border-outline-variant"
            }`}
          >
            Role: {userRole}
          </span>
        </div>
      </div>

      {!isAdmin && (
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-m3-md text-amber-800 text-xs flex items-start space-x-3">
          <Shield className="w-5 h-5 shrink-0 mt-0.5" />
          <div>
            <p className="font-bold">Read-Only Mode for Staff</p>
            <p className="mt-0.5 text-amber-700">
              Your account currently has the &ldquo;staff&rdquo; role. Site settings modification is restricted to Administrators.
            </p>
          </div>
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-m3-md text-red-700 text-xs flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
          <button onClick={() => setError(null)} className="text-red-700 font-bold">
            ×
          </button>
        </div>
      )}

      {savedSuccess && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-m3-md text-green-700 text-xs flex items-center space-x-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>Site settings and SEO defaults updated successfully in Neon PostgreSQL!</span>
        </div>
      )}

      {loading ? (
        <div className="p-12 text-center bg-surface rounded-m3-lg border border-outline-variant elevation-1">
          <Loader2 className="w-6 h-6 animate-spin text-secondary mx-auto mb-2" />
          <p className="text-xs text-on-surface-variant">Loading settings...</p>
        </div>
      ) : (
        <form onSubmit={handleSave} className="space-y-6">
          {/* Section 1: NAP Contact Details */}
          <div className="bg-surface p-6 sm:p-8 rounded-m3-lg border border-outline-variant elevation-1 space-y-5">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-on-surface border-b border-outline-variant pb-3 flex items-center space-x-2">
              <Phone className="w-4 h-4 text-secondary" />
              <span>Company NAP & Contact Information</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-on-surface mb-1.5">
                  Company Name
                </label>
                <input
                  type="text"
                  disabled={!isAdmin}
                  value={settings.company_name || ""}
                  onChange={(e) => handleChange("company_name", e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-m3-md border border-outline-variant bg-surface text-on-surface text-xs focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary disabled:bg-surface-container-low"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-on-surface mb-1.5">
                  Official Email
                </label>
                <input
                  type="email"
                  disabled={!isAdmin}
                  value={settings.company_email || ""}
                  onChange={(e) => handleChange("company_email", e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-m3-md border border-outline-variant bg-surface text-on-surface text-xs focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary disabled:bg-surface-container-low"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-on-surface mb-1.5">
                  Phone Number
                </label>
                <input
                  type="text"
                  disabled={!isAdmin}
                  value={settings.company_phone || ""}
                  onChange={(e) => handleChange("company_phone", e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-m3-md border border-outline-variant bg-surface text-on-surface text-xs focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary disabled:bg-surface-container-low"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-on-surface mb-1.5">
                  WhatsApp Number
                </label>
                <input
                  type="text"
                  disabled={!isAdmin}
                  value={settings.company_whatsapp || ""}
                  onChange={(e) => handleChange("company_whatsapp", e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-m3-md border border-outline-variant bg-surface text-on-surface text-xs focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary disabled:bg-surface-container-low"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-on-surface mb-1.5">
                Physical Office & Workshop Address
              </label>
              <input
                type="text"
                disabled={!isAdmin}
                value={settings.company_address || ""}
                onChange={(e) => handleChange("company_address", e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-m3-md border border-outline-variant bg-surface text-on-surface text-xs focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary disabled:bg-surface-container-low"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-on-surface mb-1.5">
                Operating / Business Hours
              </label>
              <input
                type="text"
                disabled={!isAdmin}
                value={settings.operating_hours || ""}
                onChange={(e) => handleChange("operating_hours", e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-m3-md border border-outline-variant bg-surface text-on-surface text-xs focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary disabled:bg-surface-container-low"
              />
            </div>
          </div>

          {/* Section 2: SEO Meta Defaults */}
          <div className="bg-surface p-6 sm:p-8 rounded-m3-lg border border-outline-variant elevation-1 space-y-5">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-on-surface border-b border-outline-variant pb-3 flex items-center space-x-2">
              <Globe className="w-4 h-4 text-secondary" />
              <span>Default SEO Metadata</span>
            </h3>

            <div>
              <label className="block text-xs font-semibold text-on-surface mb-1.5">
                Default Site Title Tag
              </label>
              <input
                type="text"
                disabled={!isAdmin}
                value={settings.seo_meta_title || ""}
                onChange={(e) => handleChange("seo_meta_title", e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-m3-md border border-outline-variant bg-surface text-on-surface text-xs focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary disabled:bg-surface-container-low"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-on-surface mb-1.5">
                Default Meta Description
              </label>
              <textarea
                rows={3}
                disabled={!isAdmin}
                value={settings.seo_meta_description || ""}
                onChange={(e) => handleChange("seo_meta_description", e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-m3-md border border-outline-variant bg-surface text-on-surface text-xs focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary disabled:bg-surface-container-low"
              />
            </div>
          </div>

          {isAdmin && (
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center space-x-2 bg-secondary hover:bg-secondary-hover text-white font-semibold px-6 py-3 rounded-m3-xl text-xs transition-colors elevation-1 disabled:opacity-60 cursor-pointer"
              >
                {saving ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Saving Settings...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>Save Site Settings</span>
                  </>
                )}
              </button>
            </div>
          )}
        </form>
      )}
    </div>
  );
}
