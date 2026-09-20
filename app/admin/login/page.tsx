"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { signIn } from "@/lib/auth-client";
import {
  Lock,
  Mail,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  Loader2,
  Eye,
  EyeOff,
  Sparkles,
  Building2,
  CheckCircle2,
} from "lucide-react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/admin";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await signIn.email({
        email,
        password,
      });

      if (response.error) {
        setError(response.error.message || "Invalid email or password.");
      } else {
        router.push(callbackUrl);
        router.refresh();
      }
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : "An unexpected error occurred during sign in."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md p-6 sm:p-10 bg-white rounded-3xl shadow-xl border border-outline-variant/30">
      {/* Mobile Brand Header */}
      <div className="lg:hidden text-center mb-8">
        <div className="w-16 h-16 rounded-full overflow-hidden border border-outline-variant shadow-sm mx-auto mb-4 bg-white p-1">
          <Image
            src="/logo.jpeg"
            alt="Al Syed Logo"
            width={64}
            height={64}
            className="object-contain w-full h-full rounded-full"
          />
        </div>
        <h1 className="text-xl font-extrabold text-on-surface">
          Al Syed Fabrications
        </h1>
        <p className="text-xs text-on-surface-variant font-medium mt-1">Admin Management Portal</p>
      </div>

      {/* Form Header */}
      <div className="mb-8 hidden lg:block text-center">
        <div className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-secondary/10 text-secondary text-[11px] font-bold uppercase tracking-[0.15em] mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Management Portal</span>
        </div>
        <h2 className="text-3xl font-extrabold text-on-surface tracking-tight">
          Welcome Back
        </h2>
        <p className="text-sm text-on-surface-variant mt-2 leading-relaxed">
          Enter your authorized credentials to securely access the admin dashboard.
        </p>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 flex items-start space-x-3 text-red-700 text-xs font-semibold animate-in fade-in zoom-in-95">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
          <span>{error}</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-on-surface mb-2">
            Admin Email Address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-on-surface-variant/70">
              <Mail className="w-5 h-5" />
            </div>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@alsyedfabrications.com"
              className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-outline-variant bg-neutral-50 text-on-surface text-sm focus:outline-none focus:border-secondary focus:bg-white focus:ring-1 focus:ring-secondary transition-all"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-on-surface mb-2">
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-on-surface-variant/70">
              <Lock className="w-5 h-5" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full pl-11 pr-12 py-3.5 rounded-xl border border-outline-variant bg-neutral-50 text-on-surface text-sm focus:outline-none focus:border-secondary focus:bg-white focus:ring-1 focus:ring-secondary transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-on-surface-variant hover:text-secondary transition-colors"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-2 inline-flex items-center justify-center space-x-2.5 bg-secondary hover:bg-secondary-hover text-white font-bold h-14 px-6 rounded-full text-sm transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Verifying...</span>
            </>
          ) : (
            <>
              <span>Sign In to Dashboard</span>
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </button>
      </form>

      {/* Security Footer */}
      <div className="mt-8 pt-6 border-t border-outline-variant text-center space-y-4">
        <div className="flex items-center justify-center space-x-2 text-xs font-medium text-on-surface-variant">
          <ShieldCheck className="w-4 h-4 text-secondary" />
          <span>Role-Based Access Control • SSL Encrypted</span>
        </div>
        <div>
          <Link
            href="/"
            className="text-xs font-bold text-secondary hover:text-secondary-hover uppercase tracking-wider transition-colors"
          >
            ← Return to Public Website
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-12 bg-white">
      {/* Left Column: Visual Architectural Showcase (Desktop) */}
      <div className="hidden lg:flex lg:col-span-5 xl:col-span-6 relative bg-white flex-col justify-between overflow-hidden border-r border-outline-variant/30">
        {/* Background Image with Light Overlay */}
        <div className="absolute inset-0 z-0 p-6 pb-0">
          <div className="relative w-full h-full rounded-t-3xl overflow-hidden shadow-inner">
            <Image
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=85&w=1500&auto=format&fit=crop"
              alt="Al Syed Aluminium & Glass Fabrication Workshop"
              fill
              priority
              sizes="50vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-white/40" />
            <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent" />
          </div>
        </div>

        {/* Top Brand Tag */}
        <div className="relative z-10 p-12 flex items-center space-x-4">
          <div className="w-14 h-14 rounded-full overflow-hidden border border-outline-variant/30 bg-white shadow-md p-1 shrink-0">
            <Image
              src="/logo.jpeg"
              alt="Al Syed Logo"
              width={56}
              height={56}
              className="object-contain w-full h-full rounded-full"
            />
          </div>
          <div>
            <span className="font-extrabold text-xl tracking-tight text-on-surface block">
              AL SYED
            </span>
            <span className="text-[10px] font-bold text-secondary tracking-[0.15em] uppercase">
              Aluminium &amp; Glass
            </span>
          </div>
        </div>

        {/* Center Quotation / Mission */}
        <div className="relative z-10 max-w-lg space-y-6 px-12 py-8 mt-auto">
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white border border-outline-variant shadow-sm text-on-surface text-[11px] font-bold uppercase tracking-wider">
            <Building2 className="w-4 h-4 text-secondary" />
            <span>Pak Land City Center, I-8 Markaz</span>
          </div>
          <h2 className="text-4xl xl:text-5xl font-extrabold text-on-surface tracking-tight leading-tight [text-shadow:_0_1px_2px_rgba(255,255,255,0.8)]">
            Quality You Can See, <br />
            <span className="text-secondary">Trust You Can Feel</span>
          </h2>
          <p className="text-sm text-on-surface-variant leading-relaxed font-medium max-w-md">
            Manage quote inquiries, project portfolio gallery uploads, fabrication service catalogs, and live customer reviews from one centralized portal.
          </p>

          <div className="grid grid-cols-2 gap-4 pt-4 text-xs font-semibold text-on-surface-variant">
            <div className="flex items-center space-x-2.5">
              <CheckCircle2 className="w-4 h-4 text-secondary shrink-0" />
              <span>Real-Time Inbox</span>
            </div>
            <div className="flex items-center space-x-2.5">
              <CheckCircle2 className="w-4 h-4 text-secondary shrink-0" />
              <span>Cloudinary Sync</span>
            </div>
            <div className="flex items-center space-x-2.5">
              <CheckCircle2 className="w-4 h-4 text-secondary shrink-0" />
              <span>Service Editor</span>
            </div>
            <div className="flex items-center space-x-2.5">
              <CheckCircle2 className="w-4 h-4 text-secondary shrink-0" />
              <span>Live Reviews</span>
            </div>
          </div>
        </div>

        {/* Bottom Footer Info */}
        <div className="relative z-10 p-12 pt-6 flex items-center justify-between text-[11px] font-bold uppercase tracking-widest text-on-surface-variant border-t border-outline-variant/30 mt-8">
          <span>Engineering Hub: 0337 9289079</span>
          <span>Islamabad • Rawalpindi</span>
        </div>
      </div>

      {/* Right Column: Clean Login Form */}
      <div className="lg:col-span-7 xl:col-span-6 flex items-center justify-center bg-neutral-50 p-4 sm:p-8 relative overflow-hidden">
        {/* Subtle background decoration */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />
        
        <div className="w-full max-w-md relative z-10">
          <Suspense
            fallback={
              <div className="w-full p-12 flex flex-col items-center justify-center bg-white rounded-3xl shadow-xl border border-outline-variant/30">
                <Loader2 className="w-8 h-8 animate-spin text-secondary mb-4" />
                <p className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                  Loading Admin Sign In...
                </p>
              </div>
            }
          >
            <LoginForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
