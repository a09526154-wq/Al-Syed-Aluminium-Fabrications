export function LocalBusinessJsonLd() {
  const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "https://alsyedfabrications.com";

  const schema = {
    "@context": "https://schema.org",
    "@type": ["HomeAndConstructionBusiness", "LocalBusiness"],
    "@id": `${siteUrl}/#organization`,
    name: "Al Syed Aluminium & Glass Fabrications",
    alternateName: "Al Syed Aluminium Fabrications Islamabad",
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
    description:
      "Premier architectural aluminium and glass fabricator in Islamabad & Rawalpindi. Specializing in aluminium windows, tempered glass doors, curtain walls, glass railings, and ACP cladding.",
    telephone: "+923379289079",
    email: "alsyedaluminium@gmail.com",
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Pak Land City Center, Office No. 05, I-8 Markaz",
      addressLocality: "Islamabad",
      addressRegion: "Islamabad Capital Territory",
      postalCode: "44000",
      addressCountry: "PK",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 33.683141,
      longitude: 73.076326,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "09:00",
        closes: "20:00",
      },
    ],
    areaServed: [
      {
        "@type": "AdministrativeArea",
        name: "Islamabad",
      },
      {
        "@type": "AdministrativeArea",
        name: "Rawalpindi",
      },
    ],
    sameAs: [
      "https://wa.me/923379289079",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface ServiceJsonLdProps {
  name: string;
  description: string;
  url: string;
  image?: string;
}

export function ServiceJsonLd({
  name,
  description,
  url,
  image,
}: ServiceJsonLdProps) {
  const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "https://alsyedfabrications.com";

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url,
    image: image || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
    provider: {
      "@type": "LocalBusiness",
      name: "Al Syed Aluminium & Glass Fabrications",
      telephone: "+923379289079",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Pak Land City Center, Office No. 05, I-8 Markaz",
        addressLocality: "Islamabad",
        addressCountry: "PK",
      },
    },
    areaServed: ["Islamabad", "Rawalpindi"],
    serviceType: "Architectural Aluminium & Glass Fabrication",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface TestimonialsJsonLdProps {
  reviews: Array<{
    clientName: string;
    message: string;
    rating: number;
    createdAt?: Date | string;
  }>;
}

export function TestimonialsJsonLd({ reviews }: TestimonialsJsonLdProps) {
  const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "https://alsyedfabrications.com";

  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
        ).toFixed(1)
      : "5.0";

  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Al Syed Aluminium & Glass Fabrications",
    url: siteUrl,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: averageRating,
      reviewCount: reviews.length || 1,
      bestRating: "5",
      worstRating: "1",
    },
    review: reviews.map((r) => ({
      "@type": "Review",
      author: {
        "@type": "Person",
        name: r.clientName,
      },
      reviewRating: {
        "@type": "Rating",
        ratingValue: r.rating.toString(),
        bestRating: "5",
      },
      reviewBody: r.message,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
