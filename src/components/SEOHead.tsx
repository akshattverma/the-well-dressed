import { useEffect } from 'react';

interface SEOHeadProps {
  title: string;
  description: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  authorName?: string;
  publishDate?: string;
  jsonLd?: object[];
}

export function SEOHead({
  title,
  description,
  canonicalUrl,
  ogImage = "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80",
  ogType = 'website',
  authorName,
  publishDate,
  jsonLd
}: SEOHeadProps) {
  useEffect(() => {
    // 1. Update Document Title
    document.title = title;

    // 2. Helper to set or create meta tag
    const setMetaTag = (attribute: string, key: string, content: string) => {
      let element = document.querySelector(`meta[${attribute}="${key}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, key);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Standard meta
    setMetaTag('name', 'description', description);
    if (authorName) {
      setMetaTag('name', 'author', authorName);
    }

    // OpenGraph
    setMetaTag('property', 'og:title', title);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:type', ogType);
    setMetaTag('property', 'og:image', ogImage);
    const resolvedCanonical = canonicalUrl || (window.location.origin + window.location.pathname);
    setMetaTag('property', 'og:url', resolvedCanonical);

    // Twitter Card
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', title);
    setMetaTag('name', 'twitter:description', description);
    setMetaTag('name', 'twitter:image', ogImage);

    // Canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', resolvedCanonical);

    // 3. Inject Structured Data JSON-LD
    const scriptId = 'dynamic-json-ld';
    let scriptElement = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!scriptElement) {
      scriptElement = document.createElement('script');
      scriptElement.id = scriptId;
      scriptElement.type = 'application/ld+json';
      document.head.appendChild(scriptElement);
    }

    if (jsonLd && jsonLd.length > 0) {
      scriptElement.textContent = JSON.stringify(jsonLd.length === 1 ? jsonLd[0] : jsonLd, null, 2);
    } else {
      // Default WebSite Schema
      const defaultSchema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "The Well-Dressed",
        "url": resolvedCanonical,
        "description": description,
        "potentialAction": {
          "@type": "SearchAction",
          "target": `${window.location.origin}/?q={search_term_string}`,
          "query-input": "required name=search_term_string"
        }
      };
      scriptElement.textContent = JSON.stringify(defaultSchema, null, 2);
    }

    // Scroll to top upon route change
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [title, description, canonicalUrl, ogImage, ogType, authorName, publishDate, jsonLd]);

  return null;
}
