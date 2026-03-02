interface JsonLdProps {
  data: Record<string, unknown>;
}

export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Keith L. Odom",
    url: "https://keithlodom.io",
    image: "https://keithlodom.io/images/keith-odom.jpg",
    jobTitle: "CEO & Solution Architect at Axtegrity Consulting | Director of Technology, COGIC",
    description:
      "AI Advisory, Leadership Assessments, and Strategic Insight for organizations navigating digital transformation.",
    sameAs: [
      "https://www.linkedin.com/in/keithlodom/",
      "https://twitter.com/keithlodom",
      "https://www.instagram.com/pastorkeithodom/",
    ],
    knowsAbout: [
      "Artificial Intelligence",
      "Digital Transformation",
      "Leadership",
      "Technology Strategy",
      "Cybersecurity",
      "Church Technology",
    ],
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "KLO",
    url: "https://keithlodom.io",
    logo: "https://keithlodom.io/images/icon-512.png",
    description:
      "AI-powered advisory, leadership assessments, and strategic insight platform by Keith L. Odom.",
    founder: {
      "@type": "Person",
      name: "Keith L. Odom",
    },
    email: "info@keithlodom.io",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Orlando",
      addressRegion: "FL",
      postalCode: "32822",
      addressCountry: "US",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: "info@keithlodom.io",
      url: "https://keithlodom.io/booking",
    },
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "KLO | Keith L. Odom",
    url: "https://keithlodom.io",
    description:
      "Technology Innovator, Speaker & Pastor — AI Advisory, Assessments, and Strategic Insight",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://keithlodom.io/search?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };
}
