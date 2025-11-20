import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: 'website' | 'article' | 'profile';
  noindex?: boolean;
  structuredData?: object | object[];
}

const SEO = ({
  title,
  description,
  keywords,
  canonical,
  ogImage = '/og-image.png',
  ogType = 'website',
  noindex = false,
  structuredData
}: SEOProps) => {
  const siteName = 'Hackethos4U';
  const fullTitle = title.includes(siteName) ? title : `${title} | ${siteName}`;
  const baseUrl = 'https://hackethos4u.com';
  const canonicalUrl = canonical || (typeof window !== 'undefined' ? window.location.href : baseUrl);
  const fullOgImage = ogImage.startsWith('http') ? ogImage : `${baseUrl}${ogImage}`;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="author" content="Hackethos4U" />

      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />

      {/* Robots */}
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      {!noindex && <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />}
      <meta name="googlebot" content="index, follow" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullOgImage} />
      <meta property="og:site_name" content={siteName} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullOgImage} />

      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(Array.isArray(structuredData) ? structuredData : [structuredData])}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;

// Structured Data Helpers
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Hackethos4U",
  "alternateName": "Hackethos 4 U",
  "url": "https://hackethos4u.com",
  "logo": "https://hackethos4u.com/logo.png",
  "description": "Professional cybersecurity training and VAPT (Vulnerability Assessment and Penetration Testing) services. We offer ethical hacking courses, bug bounty training, OWASP testing, mobile security, and API security services.",
  "email": "h4u.info@hackethos4u.com",
  "telephone": "+91-7095188315",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "9G8C+PRQ, Dilsukhnagar",
    "addressLocality": "Hyderabad",
    "addressRegion": "Telangana",
    "postalCode": "500036",
    "addressCountry": "IN"
  },
  "sameAs": [
    "https://www.facebook.com/people/Hackethos4u/61566999715807/",
    "https://www.threads.com/@hackethos4u",
    "https://www.linkedin.com/in/maniteja7v/",
    "https://www.instagram.com/hackethos4u/",
    "https://www.youtube.com/@hackethos4u"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "Customer Service",
    "telephone": "+91-7095188315",
    "email": "h4u.info@hackethos4u.com",
    "areaServed": "IN",
    "availableLanguage": ["English", "Hindi", "Telugu"]
  }
};

export const createCourseSchema = (course: any) => ({
  "@context": "https://schema.org",
  "@type": "Course",
  "name": course.title,
  "description": course.description,
  "provider": {
    "@type": "Organization",
    "name": "Hackethos4U",
    "url": "https://hackethos4u.com"
  },
  "educationalLevel": course.level || "Beginner to Advanced",
  "timeRequired": course.duration,
  "coursePrerequisites": "Basic computer knowledge",
  "inLanguage": "en",
  "availableLanguage": ["en", "hi", "te"],
  "url": `https://hackethos4u.com/courses/${course.slug}`,
  "image": "https://hackethos4u.com/course-banner.png",
  ...(course.pricing && {
    "offers": {
      "@type": "Offer",
      "price": course.pricing.oneToOne || course.pricing.groupMin,
      "priceCurrency": "INR",
      "availability": "https://schema.org/InStock",
      "validFrom": new Date().toISOString()
    }
  })
});

export const createServiceSchema = (service: any) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "name": service.title,
  "description": service.description,
  "provider": {
    "@type": "Organization",
    "name": "Hackethos4U",
    "url": "https://hackethos4u.com"
  },
  "serviceType": "Cybersecurity Testing",
  "areaServed": {
    "@type": "Country",
    "name": "India"
  },
  "url": `https://hackethos4u.com/services/${service.slug}`,
  "image": "https://hackethos4u.com/service-banner.png",
  "category": "Cybersecurity"
});

export const createBreadcrumbSchema = (items: { name: string; url: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": item.url
  }))
});

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Hackethos4U",
  "url": "https://hackethos4u.com",
  "description": "Professional cybersecurity training and VAPT services in India",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://hackethos4u.com/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
};
