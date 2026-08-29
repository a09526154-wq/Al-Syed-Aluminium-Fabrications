import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SiteLayout } from "@/components/SiteLayout";
import { LocalBusinessJsonLd } from "@/components/JsonLd";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "https://alsyedfabrications.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Al Syed Aluminium & Glass Fabrications | I-8 Markaz, Islamabad",
    template: "%s | Al Syed Aluminium & Glass Fabrications",
  },
  description:
    "Islamabad's trusted architectural aluminium and glass fabricators located in Pak Land City Center, I-8 Markaz. Premium aluminium windows, 12mm tempered glass doors, curtain wall facades, and glass railings.",
  keywords: [
    "Aluminium Fabricator Islamabad",
    "Glass Works Islamabad",
    "Aluminium Windows I-8 Markaz",
    "Tempered Glass Doors Islamabad",
    "Curtain Wall Fabricators Islamabad",
    "Glass Railings Rawalpindi",
    "Shower Enclosures Islamabad",
    "ACP Cladding Islamabad",
    "Al Syed Aluminium Fabrications",
  ],
  authors: [{ name: "Al Syed Aluminium & Glass Fabrications" }],
  creator: "Al Syed Aluminium & Glass Fabrications",
  publisher: "Al Syed Aluminium & Glass Fabrications",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: "Al Syed Aluminium & Glass Fabrications | I-8 Markaz, Islamabad",
    description:
      "Quality You Can See, Trust You Can Feel. Master fabricators of architectural aluminium windows, tempered glass doors, curtain walls, and safety railings in Islamabad & Rawalpindi.",
    url: siteUrl,
    siteName: "Al Syed Aluminium & Glass Fabrications",
    images: [
      {
        url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
        width: 1200,
        height: 630,
        alt: "Al Syed Aluminium & Glass Fabrications Islamabad",
      },
    ],
    locale: "en_PK",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Al Syed Aluminium & Glass Fabrications | I-8 Markaz, Islamabad",
    description:
      "Master architectural aluminium and glass fabrication in Islamabad & Rawalpindi.",
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
    ],
  },
  icons: {
    icon: [
      { url: "/logo.jpeg" },
      { url: "/logo.jpeg", sizes: "32x32", type: "image/jpeg" },
      { url: "/logo.jpeg", sizes: "192x192", type: "image/jpeg" },
    ],
    shortcut: "/logo.jpeg",
    apple: "/logo.jpeg",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <LocalBusinessJsonLd />
      </head>
      <body className="antialiased font-sans bg-neutral-light text-text-dark flex flex-col min-h-screen">
        <SiteLayout>{children}</SiteLayout>
      </body>
    </html>
  );
}
