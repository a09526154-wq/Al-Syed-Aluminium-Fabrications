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
    <div className="w-full max-w-md p-6 sm:p-10">
      {/* Mobile Brand Header */}
      <div className="lg:hidden text-center mb-8">
        <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#1E5FA8]/50 shadow-md mx-auto mb-3">
          <Image
            src="/logo.jpeg"
            alt="Al Syed Logo"
            width={64}
            height={64}
            className="object-cover w-full h-full"
          />
        </div>
        <h1 className="text-xl font-extrabold text-primary">
          Al Syed Fabrications
        </h1>
        <p className="text-xs text-text-dark/60">Admin Management Portal</p>
      </div>

      {/* Form Header */}
      <div className="mb-8">
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#1E5FA8] text-xs font-bold uppercase tracking-wider mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Management Portal</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-primary tracking-tight">
          Welcome back
        </h2>
        <p className="text-xs sm:text-sm text-text-dark/60 mt-1">
          Enter your authorized credentials to access the admin dashboard.
        </p>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 flex items-start space-x-3 text-red-700 text-xs font-medium animate-in fade-in">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
          <span>{error}</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-text-dark mb-1.5">
            Admin Email Address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-text-dark/40">
              <Mail className="w-4 h-4" />
            </div>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="alsyedaluminium@gmail.com"
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-neutral-border bg-neutral-light/50 text-text-dark text-xs sm:text-sm focus:outline-none focus:border-[#1E5FA8] focus:bg-white transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-text-dark mb-1.5">
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-text-dark/40">
              <Lock className="w-4 h-4" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full pl-10 pr-10 py-3 rounded-xl border border-neutral-border bg-neutral-light/50 text-text-dark text-xs sm:text-sm focus:outline-none focus:border-[#1E5FA8] focus:bg-white transition-colors"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-text-dark/40 hover:text-text-dark"
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-2 inline-flex items-center justify-center space-x-2 bg-primary hover:bg-[#0F1420] text-accent font-bold py-3.5 px-4 rounded-xl text-xs sm:text-sm transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-70 cursor-pointer"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Verifying credentials...</span>
            </>
          ) : (
            <>
              <span>Sign In to Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>

      {/* Security Footer */}
      <div className="mt-8 pt-6 border-t border-neutral-border text-center space-y-3">
        <div className="flex items-center justify-center space-x-2 text-[11px] text-text-dark/60">
          <ShieldCheck className="w-4 h-4 text-accent" />
          <span>Role-Based Access Control • SSL Encrypted</span>
        </div>
        <div>
          <Link
            href="/"
            className="text-xs font-semibold text-[#1E5FA8] hover:underline"
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
      <div className="hidden lg:flex lg:col-span-6 xl:col-span-7 relative bg-[#0B0F1A] text-white p-12 flex-col justify-between overflow-hidden">
        {/* Background Image with Dark Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=85&w=2000&auto=format&fit=crop"
            alt="Al Syed Aluminium & Glass Fabrication Workshop"
            fill
            priority
            sizes="50vw"
            className="object-cover object-center opacity-30 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F1A] via-[#0B0F1A]/80 to-[#0B0F1A]/60" />
          <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_right,#ffffff15_1px,transparent_1px),linear-gradient(to_bottom,#ffffff15_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        </div>

        {/* Top Brand Tag */}
        <div className="relative z-10 flex items-center space-x-3.5">
          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-accent/50 shadow-md shrink-0">
            <Image
              src="/logo.jpeg"
              alt="Al Syed Logo"
              width={48}
              height={48}
              className="object-cover w-full h-full"
            />
          </div>
          <div>
            <span className="font-extrabold text-base tracking-tight text-white block">
              AL SYED
            </span>
            <span className="text-[10px] font-semibold text-accent tracking-widest uppercase">
              Aluminium & Glass Fabrications
            </span>
          </div>
        </div>

        {/* Center Quotation / Mission */}
        <div className="relative z-10 max-w-lg space-y-4 my-auto py-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-accent text-xs font-semibold uppercase tracking-wider">
            <Building2 className="w-3.5 h-3.5" />
            <span>Pak Land City Center, I-8 Markaz, Islamabad</span>
          </div>
          <h2 className="text-3xl xl:text-4xl font-extrabold text-white tracking-tight leading-tight">
            &ldquo;Quality You Can See, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-[#F3E5AB] to-accent-light">
              Trust You Can Feel
            </span>
            &rdquo;
          </h2>
          <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-normal">
            Manage quote inquiries, project portfolio gallery uploads, fabrication service catalogs, and live customer reviews from one centralized portal.
          </p>

          <div className="grid grid-cols-2 gap-3 pt-4 text-xs text-gray-300">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
              <span>Real-Time Quote Inbox</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
              <span>Gallery Cloudinary Sync</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
              <span>Service Catalog Editor</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
              <span>Testimonials Moderation</span>
            </div>
          </div>
        </div>

        {/* Bottom Footer Info */}
        <div className="relative z-10 pt-6 border-t border-white/10 flex items-center justify-between text-[11px] text-gray-400">
          <span>Engineering Hub: 0337 9289079</span>
          <span>Islamabad • Rawalpindi</span>
        </div>
      </div>

      {/* Right Column: Clean Login Form */}
      <div className="lg:col-span-6 xl:col-span-5 flex items-center justify-center bg-white p-4 sm:p-8">
        <Suspense
          fallback={
            <div className="w-full max-w-md p-10 flex flex-col items-center justify-center">
              <Loader2 className="w-8 h-8 animate-spin text-[#1E5FA8] mb-3" />
              <p className="text-xs text-text-dark/70">
                Loading Admin Sign In...
              </p>
            </div>
          }
        >
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
