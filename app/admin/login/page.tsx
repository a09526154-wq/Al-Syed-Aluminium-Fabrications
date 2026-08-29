"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "@/lib/auth-client";
import { Lock, Mail, AlertCircle, ArrowRight, ShieldCheck, Loader2 } from "lucide-react";
import Link from "next/link";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/admin";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
        err instanceof Error ? err.message : "An unexpected error occurred during login."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-white rounded-3xl shadow-sm border border-neutral-border p-8 sm:p-10">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#1E5FA8] text-white font-bold text-xl mb-4 shadow-sm">
          AS
        </div>
        <h1 className="text-2xl font-bold text-primary">Admin Sign In</h1>
        <p className="text-xs text-text-dark/60 mt-1">
          Al Syed Aluminium & Glass Management Portal (I-8 Markaz)
        </p>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 flex items-start space-x-3 text-red-700 text-xs">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-text-dark mb-1.5">
            Admin Email Address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-text-muted">
              <Mail className="w-4 h-4" />
            </div>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@alsyedfabrications.com"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-neutral-border bg-neutral-light/50 text-text-dark text-xs focus:outline-none focus:border-[#1E5FA8] focus:ring-2 focus:ring-[#1E5FA8]/15 transition-all"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-text-dark mb-1.5">
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-text-muted">
              <Lock className="w-4 h-4" />
            </div>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-neutral-border bg-neutral-light/50 text-text-dark text-xs focus:outline-none focus:border-[#1E5FA8] focus:ring-2 focus:ring-[#1E5FA8]/15 transition-all"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-2 inline-flex items-center justify-center space-x-2 bg-[#1E5FA8] hover:bg-[#2C74C9] text-white font-bold py-3.5 px-4 rounded-xl text-xs transition-all duration-200 shadow-sm disabled:opacity-70"
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
      <div className="mt-8 pt-6 border-t border-neutral-border text-center">
        <div className="flex items-center justify-center space-x-2 text-xs text-text-muted">
          <ShieldCheck className="w-4 h-4 text-[#1E5FA8]" />
          <span>Role-Based Access Control (Admin / Staff)</span>
        </div>
        <div className="mt-3">
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
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-[#F7F8FA]">
      <Suspense
        fallback={
          <div className="w-full max-w-md bg-white rounded-3xl p-10 flex flex-col items-center justify-center border border-neutral-border">
            <Loader2 className="w-8 h-8 animate-spin text-[#1E5FA8] mb-3" />
            <p className="text-xs text-text-dark/70">Loading Admin Sign In...</p>
          </div>
        }
      >
        <LoginForm />
      </Suspense>
    </div>
  );
}
