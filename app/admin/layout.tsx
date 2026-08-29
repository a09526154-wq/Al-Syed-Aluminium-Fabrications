"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useSession, signOut } from "@/lib/auth-client";
import {
  LayoutDashboard,
  FileText,
  MessageSquare,
  Image as ImageIcon,
  Layers,
  ShoppingBag,
  Star,
  Settings,
  LogOut,
  ExternalLink,
  Menu,
  X,
  Shield,
  Loader2,
  Building,
} from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // If on login page, render clean container without dashboard sidebar
  if (pathname === "/admin/login") {
    return <div className="min-h-screen bg-neutral-light">{children}</div>;
  }

  const handleSignOut = async () => {
    await signOut();
    router.push("/admin/login");
    router.refresh();
  };

  const navLinks = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Quote Requests", href: "/admin/quotes", icon: FileText },
    { name: "Contact Messages", href: "/admin/messages", icon: MessageSquare },
    { name: "Gallery Portfolio", href: "/admin/gallery", icon: ImageIcon },
    { name: "Services", href: "/admin/services", icon: Layers },
    { name: "Testimonials", href: "/admin/testimonials", icon: Star },
    {
      name: "Site Settings",
      href: "/admin/settings",
      icon: Settings,
      adminOnly: true,
    },
  ];

  const userRole = session?.user?.role || "staff";

  return (
    <div className="h-screen overflow-hidden bg-[#F7F8FA] flex flex-col lg:flex-row text-text-dark font-sans">
      {/* ============================================================ */}
      {/* DESKTOP SIDEBAR */}
      {/* ============================================================ */}
      <aside className="hidden lg:flex flex-col w-64 h-screen bg-white border-r border-neutral-border shadow-xs shrink-0 select-none sticky top-0 overflow-y-auto">
        {/* Brand Header */}
        <div className="h-20 flex items-center px-6 border-b border-neutral-border bg-white">
          <Link href="/admin" className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#1E5FA8]/50 shadow-sm shrink-0">
              <Image
                src="/logo.jpeg"
                alt="Al Syed Logo"
                width={40}
                height={40}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-sm text-primary tracking-tight leading-tight">
                Al Syed Admin
              </span>
              <span className="text-[10px] font-semibold text-[#1E5FA8] tracking-wider uppercase">
                I-8 Markaz Portal
              </span>
            </div>
          </Link>
        </div>

        {/* User Mini Profile */}
        <div className="p-4 mx-4 my-4 rounded-xl bg-neutral-light border border-neutral-border">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-bold text-primary truncate max-w-[120px]">
              {session?.user?.name || "Administrator"}
            </span>
            <span
              className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded-md font-mono ${
                userRole === "admin"
                  ? "bg-[#C9A24B]/20 text-[#8a6b24] border border-[#C9A24B]/40"
                  : "bg-blue-100 text-[#1E5FA8] border border-blue-200"
              }`}
            >
              {userRole}
            </span>
          </div>
          <p className="text-[11px] text-text-dark/60 truncate">
            {session?.user?.email || "alsyedaluminium@gmail.com"}
          </p>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-4 space-y-1.5 overflow-y-auto">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive =
              link.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(link.href);

            if (link.adminOnly && userRole !== "admin") {
              return null; // Hide admin-only links from staff
            }

            return (
              <Link
                key={link.name}
                href={link.href}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150 ${
                  isActive
                    ? "bg-[#1E5FA8] text-white shadow-sm font-bold"
                    : "text-text-dark/70 hover:bg-neutral-light hover:text-[#1E5FA8]"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-text-muted"}`} />
                  <span>{link.name}</span>
                </div>
                {link.adminOnly && (
                  <span
                    className={`text-[9px] uppercase px-1.5 py-0.5 rounded font-mono ${
                      isActive ? "bg-white/20 text-white" : "bg-neutral-border text-text-dark/60"
                    }`}
                  >
                    Admin
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Sidebar Footer */}
        <div className="p-4 border-t border-neutral-border space-y-2">
          <Link
            href="/"
            target="_blank"
            className="w-full flex items-center justify-center space-x-2 px-3 py-2 text-xs font-medium text-text-dark/70 hover:text-primary hover:bg-neutral-light rounded-xl transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>View Public Website</span>
          </Link>
          <button
            onClick={handleSignOut}
            className="w-full flex items-center justify-center space-x-2 px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 rounded-xl transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* ============================================================ */}
      {/* MOBILE TOP BAR */}
      {/* ============================================================ */}
      <div className="lg:hidden bg-white border-b border-neutral-border px-4 py-3 flex items-center justify-between">
        <Link href="/admin" className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-[#1E5FA8]/50 shrink-0">
            <Image
              src="/logo.jpeg"
              alt="Al Syed Logo"
              width={32}
              height={32}
              className="object-cover w-full h-full"
            />
          </div>
          <span className="font-bold text-sm text-primary">Al Syed Admin</span>
        </Link>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-neutral-light border border-neutral-border text-text-dark"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-neutral-border px-4 py-3 space-y-1">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive =
              link.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(link.href);

            if (link.adminOnly && userRole !== "admin") return null;

            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg text-xs font-semibold ${
                  isActive
                    ? "bg-[#1E5FA8] text-white"
                    : "text-text-dark/80 hover:bg-neutral-light"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{link.name}</span>
              </Link>
            );
          })}
          <div className="pt-3 mt-2 border-t border-neutral-border flex items-center justify-between">
            <Link
              href="/"
              target="_blank"
              className="text-xs font-medium text-[#1E5FA8] flex items-center space-x-1"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Public Website</span>
            </Link>
            <button
              onClick={handleSignOut}
              className="text-xs font-semibold text-red-600 flex items-center space-x-1"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* MAIN CONTENT AREA */}
      {/* ============================================================ */}
      <main className="flex-1 flex flex-col min-w-0 overflow-x-hidden h-screen overflow-y-auto">
        {/* Top Header Bar */}
        <header className="hidden lg:flex items-center justify-between h-20 px-8 bg-white border-b border-neutral-border sticky top-0 z-10 shrink-0">
          <div>
            <h1 className="text-lg font-bold text-primary">
              Management Portal
            </h1>
            <p className="text-xs text-text-dark/60">
              Pak Land City Center, Office No. 05, I-8 Markaz, Islamabad
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-xs bg-neutral-light px-3 py-1.5 rounded-lg border border-neutral-border">
              <Shield className="w-3.5 h-3.5 text-[#1E5FA8]" />
              <span className="font-semibold text-text-dark/80">
                Logged in as:
              </span>
              <span className="font-mono font-bold text-primary">
                {session?.user?.email || "Admin"}
              </span>
            </div>
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center space-x-1.5 text-xs font-semibold text-[#1E5FA8] hover:text-[#2C74C9] bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-200 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Live Site</span>
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
