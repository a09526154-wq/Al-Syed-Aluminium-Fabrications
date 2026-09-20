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
  Star,
  Settings,
  LogOut,
  ExternalLink,
  Menu,
  X,
  Shield,
} from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // If on login page, render clean container without dashboard sidebar
  if (pathname === "/admin/login") {
    return <div className="min-h-screen bg-surface-dim">{children}</div>;
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
    <div className="h-screen overflow-hidden bg-surface-dim flex flex-col lg:flex-row text-on-surface font-sans">
      {/* ── Desktop Sidebar ───────────────────────────────────────── */}
      <aside className="hidden lg:flex flex-col w-64 h-screen bg-surface border-r border-outline-variant elevation-1 shrink-0 select-none sticky top-0 overflow-y-auto">
        {/* Brand Header */}
        <div className="h-20 flex items-center px-6 border-b border-outline-variant bg-surface">
          <Link href="/admin" className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-m3-md overflow-hidden border-2 border-secondary/40 shrink-0">
              <Image
                src="/logo.jpeg"
                alt="Al Syed Logo"
                width={40}
                height={40}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-sm text-on-surface tracking-tight leading-tight">
                Al Syed Admin
              </span>
              <span className="text-[10px] font-semibold text-secondary tracking-wider uppercase">
                I-8 Markaz Portal
              </span>
            </div>
          </Link>
        </div>

        {/* User Mini Profile */}
        <div className="p-4 mx-4 my-4 rounded-m3-md bg-surface-container-low border border-outline-variant">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-bold text-on-surface truncate max-w-[120px]">
              {session?.user?.name || "Administrator"}
            </span>
            <span
              className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded-m3-sm font-mono ${
                userRole === "admin"
                  ? "bg-secondary-container text-on-secondary-container border border-secondary/30"
                  : "bg-surface-container text-on-surface-variant border border-outline-variant"
              }`}
            >
              {userRole}
            </span>
          </div>
          <p className="text-[11px] text-on-surface-variant/70 truncate">
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
              return null;
            }

            return (
              <Link
                key={link.name}
                href={link.href}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-m3-xl text-xs font-semibold transition-all duration-150 ${
                  isActive
                    ? "bg-secondary text-white elevation-1 font-bold"
                    : "text-on-surface-variant hover:bg-surface-container-low hover:text-secondary"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-on-surface-variant"}`} />
                  <span>{link.name}</span>
                </div>
                {link.adminOnly && (
                  <span
                    className={`text-[9px] uppercase px-1.5 py-0.5 rounded-m3-sm font-mono ${
                      isActive ? "bg-white/20 text-white" : "bg-outline-variant text-on-surface-variant"
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
        <div className="p-4 border-t border-outline-variant space-y-2">
          <Link
            href="/"
            target="_blank"
            className="w-full flex items-center justify-center space-x-2 px-3 py-2 text-xs font-medium text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low rounded-m3-xl transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>View Public Website</span>
          </Link>
          <button
            onClick={handleSignOut}
            className="w-full flex items-center justify-center space-x-2 px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 rounded-m3-xl transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* ── Mobile Top Bar ────────────────────────────────────────── */}
      <div className="lg:hidden bg-surface border-b border-outline-variant px-4 py-3 flex items-center justify-between">
        <Link href="/admin" className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-m3-sm overflow-hidden border-2 border-secondary/40 shrink-0">
            <Image
              src="/logo.jpeg"
              alt="Al Syed Logo"
              width={32}
              height={32}
              className="object-cover w-full h-full"
            />
          </div>
          <span className="font-bold text-sm text-on-surface">Al Syed Admin</span>
        </Link>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-m3-md bg-surface-container-low border border-outline-variant text-on-surface"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-surface border-b border-outline-variant px-4 py-3 space-y-1">
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
                className={`flex items-center space-x-3 px-3 py-2.5 rounded-m3-md text-xs font-semibold ${
                  isActive
                    ? "bg-secondary text-white"
                    : "text-on-surface-variant hover:bg-surface-container-low"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{link.name}</span>
              </Link>
            );
          })}
          <div className="pt-3 mt-2 border-t border-outline-variant flex items-center justify-between">
            <Link
              href="/"
              target="_blank"
              className="text-xs font-medium text-secondary flex items-center space-x-1"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Public Website</span>
            </Link>
            <button
              onClick={handleSignOut}
              className="text-xs font-semibold text-red-600 flex items-center space-x-1 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}

      {/* ── Main Content Area ─────────────────────────────────────── */}
      <main className="flex-1 flex flex-col min-w-0 overflow-x-hidden h-screen overflow-y-auto">
        {/* Top Header Bar */}
        <header className="hidden lg:flex items-center justify-between h-20 px-8 bg-surface border-b border-outline-variant sticky top-0 z-10 shrink-0 elevation-1">
          <div>
            <h1 className="text-lg font-bold text-on-surface">
              Management Portal
            </h1>
            <p className="text-xs text-on-surface-variant">
              Pak Land City Center, Office No. 05, I-8 Markaz, Islamabad
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-xs bg-surface-container-low px-3 py-1.5 rounded-m3-md border border-outline-variant">
              <Shield className="w-3.5 h-3.5 text-secondary" />
              <span className="font-semibold text-on-surface-variant">
                Logged in as:
              </span>
              <span className="font-mono font-bold text-on-surface">
                {session?.user?.email || "Admin"}
              </span>
            </div>
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center space-x-1.5 text-xs font-semibold text-on-secondary-container hover:text-secondary bg-secondary-container px-3 py-1.5 rounded-m3-md border border-secondary/20 transition-colors"
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
