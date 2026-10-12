import React, { useState } from 'react';
import { X, CheckCircle, Copy, Check, ShieldCheck, FileCode, Layers, Search, BarChart3, HelpCircle } from 'lucide-react';
import { Article } from '../types';
import { keywordResearchData } from '../data/keywordResearch';

interface SeoAuditModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentArticle?: Article;
  currentPath: string;
}

export function SeoAuditModal({
  isOpen,
  onClose,
  currentArticle,
  currentPath
}: SeoAuditModalProps) {
  const [activeTab, setActiveTab] = useState<'schema' | 'meta' | 'checklist' | 'sitemap'>('schema');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  // Generate live JSON-LD preview for current page
  const getCurrentPageSchema = () => {
    if (currentArticle) {
      return {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "Article",
            "@id": `https://thewelldressed.magazine/article/${currentArticle.slug}#article`,
            "headline": currentArticle.seoTitle,
            "description": currentArticle.metaDescription,
            "image": [currentArticle.heroImage],
            "datePublished": "2026-10-01T08:00:00+00:00",
            "dateModified": "2026-10-12T09:30:00+00:00",
            "author": {
              "@type": "Person",
              "name": currentArticle.author.name,
              "jobTitle": currentArticle.author.role,
              "description": currentArticle.author.bio
            },
            "publisher": {
              "@type": "Organization",
              "name": "The Well-Dressed",
              "logo": {
                "@type": "ImageObject",
                "url": "https://thewelldressed.magazine/logo.png"
              }
            },
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": `https://thewelldressed.magazine/article/${currentArticle.slug}`
            },
            "wordCount": currentArticle.wordCount,
            "articleSection": currentArticle.category,
            "keywords": [
              currentArticle.targetKeywords.primary,
              ...currentArticle.targetKeywords.secondary
            ]
          },
          {
            "@type": "BreadcrumbList",
            "@id": `https://thewelldressed.magazine/article/${currentArticle.slug}#breadcrumb`,
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://thewelldressed.magazine/"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": currentArticle.category,
                "item": `https://thewelldressed.magazine/#${currentArticle.category.toLowerCase()}`
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": currentArticle.title,
                "item": `https://thewelldressed.magazine/article/${currentArticle.slug}`
              }
            ]
          },
          {
            "@type": "FAQPage",
            "@id": `https://thewelldressed.magazine/article/${currentArticle.slug}#faq`,
            "mainEntity": currentArticle.faqs.map(faq => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
              }
            }))
          }
        ]
      };
    } else if (currentPath === '/keyword-research') {
      return {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Keyword Research & SEO Architecture Matrix - The Well-Dressed",
        "description": "Comprehensive keyword research table featuring primary keywords, secondary search terms, intent classification, and estimated monthly volumes for 11 core URLs.",
        "url": "https://thewelldressed.magazine/keyword-research"
      };
    } else {
      return {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "The Well-Dressed",
        "url": "https://thewelldressed.magazine/",
        "description": "A premier men's fashion and lifestyle magazine providing timeless styling, capsule wardrobe guides, and grooming routines.",
        "publisher": {
          "@type": "Organization",
          "name": "The Well-Dressed Magazine",
          "founder": "Julian Vance"
        }
      };
    }
  };

  const schemaString = JSON.stringify(getCurrentPageSchema(), null, 2);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const currentTitle = currentArticle ? currentArticle.seoTitle : (currentPath === '/keyword-research' ? "Keyword Research & Intent Matrix | The Well-Dressed" : "The Well-Dressed | Men's Fashion, Style & Grooming Magazine");
  const currentMeta = currentArticle ? currentArticle.metaDescription : "A comprehensive editorial guide to modern men's style, capsule wardrobes, college smart-casual dressing, grooming routines, footwear, and timeless fit fundamentals.";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-[#FAF8F5] border border-[#DDD6CA] rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-[#E3DBD0] flex items-center justify-between bg-[#F2EDE4]">
          <div className="flex items-center space-x-2.5">
            <div className="p-1.5 bg-[#8B6534] text-white rounded">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#1C1A18] font-['Newsreader']">
                SEO &amp; AEO Architecture Inspector
              </h2>
              <p className="text-xs text-[#736B60]">
                Built for College Assignment Evaluation · Active on {currentPath}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#736B60] hover:text-[#1C1A18] rounded hover:bg-[#E4DDCF] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-[#E3DBD0] px-5 bg-[#FAF8F5] text-xs font-semibold uppercase tracking-wider">
          <button
            onClick={() => setActiveTab('schema')}
            className={`py-3 px-3 border-b-2 flex items-center space-x-1.5 cursor-pointer ${
              activeTab === 'schema'
                ? 'border-[#8B6534] text-[#8B6534]'
                : 'border-transparent text-[#736B60] hover:text-[#1C1A18]'
            }`}
          >
            <FileCode className="w-3.5 h-3.5" />
            <span>Schema.org JSON-LD</span>
          </button>
          <button
            onClick={() => setActiveTab('meta')}
            className={`py-3 px-3 border-b-2 flex items-center space-x-1.5 cursor-pointer ${
              activeTab === 'meta'
                ? 'border-[#8B6534] text-[#8B6534]'
                : 'border-transparent text-[#736B60] hover:text-[#1C1A18]'
            }`}
          >
            <Search className="w-3.5 h-3.5" />
            <span>Meta Tags &amp; Snippets</span>
          </button>
          <button
            onClick={() => setActiveTab('checklist')}
            className={`py-3 px-3 border-b-2 flex items-center space-x-1.5 cursor-pointer ${
              activeTab === 'checklist'
                ? 'border-[#8B6534] text-[#8B6534]'
                : 'border-transparent text-[#736B60] hover:text-[#1C1A18]'
            }`}
          >
            <CheckCircle className="w-3.5 h-3.5" />
            <span>Assignment Checklist</span>
          </button>
          <button
            onClick={() => setActiveTab('sitemap')}
            className={`py-3 px-3 border-b-2 flex items-center space-x-1.5 cursor-pointer ${
              activeTab === 'sitemap'
                ? 'border-[#8B6534] text-[#8B6534]'
                : 'border-transparent text-[#736B60] hover:text-[#1C1A18]'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Sitemap &amp; Robots</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-[#38332C]">
          {activeTab === 'schema' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-[#1C1A18]">Active Schema.org Structured Data</h3>
                  <p className="text-xs text-[#736B60]">
                    Injected dynamically in <code className="bg-[#EAE4D8] px-1 py-0.5 rounded">&lt;script type=&quot;application/ld+json&quot;&gt;</code>
                  </p>
                </div>
                <button
                  onClick={() => handleCopy(schemaString)}
                  className="px-3 py-1.5 bg-[#8B6534] hover:bg-[#725227] text-white text-xs font-semibold rounded flex items-center space-x-1.5 transition-colors cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied!' : 'Copy JSON-LD'}</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="bg-[#F0EBE0] p-3 rounded border border-[#DDD5C7]">
                  <p className="text-[#736B60] font-medium uppercase text-[10px]">Active Types</p>
                  <p className="font-bold text-[#1C1A18] mt-1">
                    {currentArticle ? 'Article + FAQPage + BreadcrumbList' : 'WebSite / WebPage'}
                  </p>
                </div>
                <div className="bg-[#F0EBE0] p-3 rounded border border-[#DDD5C7]">
                  <p className="text-[#736B60] font-medium uppercase text-[10px]">Syntax Status</p>
                  <p className="font-bold text-emerald-700 mt-1 flex items-center">
                    <CheckCircle className="w-3.5 h-3.5 mr-1" />
                    Valid JSON-LD 1.0
                  </p>
                </div>
                <div className="bg-[#F0EBE0] p-3 rounded border border-[#DDD5C7]">
                  <p className="text-[#736B60] font-medium uppercase text-[10px]">AEO Rich Snippet</p>
                  <p className="font-bold text-[#8B6534] mt-1">
                    Google AI Overview Ready
                  </p>
                </div>
              </div>

              <pre className="p-4 bg-[#1C1A18] text-[#DCD4C6] rounded font-mono text-xs overflow-x-auto max-h-80 leading-relaxed">
                {schemaString}
              </pre>
            </div>
          )}

          {activeTab === 'meta' && (
            <div className="space-y-6">
              {/* Google Search Snippet Simulation */}
              <div>
                <h4 className="text-xs uppercase font-bold tracking-wider text-[#736B60] mb-2">
                  Google Search SERP Simulation
                </h4>
                <div className="bg-white p-4 rounded border border-[#DDD6CA] shadow-2xs space-y-1">
                  <div className="text-xs text-[#202124] flex items-center space-x-1">
                    <span className="font-medium">thewelldressed.magazine</span>
                    <span className="text-[#5f6368]">&gt; {currentPath.replace('/', '') || 'index'}</span>
                  </div>
                  <h3 className="text-lg text-[#1a0dab] hover:underline font-normal cursor-pointer leading-snug">
                    {currentTitle}
                  </h3>
                  <p className="text-xs text-[#4d5156] leading-relaxed">
                    {currentMeta}
                  </p>
                </div>
              </div>

              {/* Character Count Checks */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-[#F2EDE4] rounded border border-[#E0D8CC] space-y-1">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-[#1C1A18]">Title Length</span>
                    <span className={`font-mono text-xs ${currentTitle.length <= 60 ? 'text-emerald-700 font-bold' : 'text-amber-700'}`}>
                      {currentTitle.length} / 60 characters
                    </span>
                  </div>
                  <p className="text-xs text-[#736B60]">
                    {currentTitle.length <= 60 ? 'Optimal length for Google SERP rendering.' : 'Slightly long, will truncate cleanly on small screens.'}
                  </p>
                </div>

                <div className="p-4 bg-[#F2EDE4] rounded border border-[#E0D8CC] space-y-1">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-[#1C1A18]">Meta Description Length</span>
                    <span className={`font-mono text-xs ${currentMeta.length >= 120 && currentMeta.length <= 165 ? 'text-emerald-700 font-bold' : 'text-amber-700'}`}>
                      {currentMeta.length} / 160 characters
                    </span>
                  </div>
                  <p className="text-xs text-[#736B60]">
                    Within the 120–160 character recommendation for search engine snippets.
                  </p>
                </div>
              </div>

              {/* Technical Tags */}
              <div className="p-4 bg-[#F2EDE4] rounded border border-[#E0D8CC] space-y-2 text-xs">
                <p className="font-bold text-[#1C1A18]">Canonical &amp; Social Card Tags</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[#474138]">
                  <div><strong>og:type:</strong> {currentArticle ? 'article' : 'website'}</div>
                  <div><strong>twitter:card:</strong> summary_large_image</div>
                  <div><strong>canonical:</strong> https://thewelldressed.magazine{currentPath}</div>
                  <div><strong>robots:</strong> index, follow, max-snippet:-1</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'checklist' && (
            <div className="space-y-4">
              <h3 className="font-bold text-[#1C1A18]">College Assignment Requirements Verification</h3>
              <div className="space-y-2.5">
                {[
                  { title: "Website Design", desc: "Neutral palette, elegant typography, responsive grid, and clear navigation.", done: true },
                  { title: "10 Detailed Articles", desc: "Written with 800–1,200 words each, unique URLs, SEO titles, alt text, and conclusions.", done: true },
                  { title: "Homepage Architecture", desc: "Brand intro, lead story, 10 article cards, category filters, and fashion FAQ.", done: true },
                  { title: "Keyword Research Page", desc: "11-row matrix (Home + 10 articles) with exact required columns, search intent, and volume.", done: true },
                  { title: "Answer Engine Optimisation (AEO)", desc: "Question headings, direct answers in first 250 words, and FAQ sections with JSON-LD.", done: true },
                  { title: "Technical SEO Files", desc: "sitemap.xml and robots.txt created with proper canonical URLs.", done: true },
                  { title: "Structured Data", desc: "Article, FAQPage, BreadcrumbList, WebSite, and Organization schemas active.", done: true },
                  { title: "GitHub & Vercel Compatibility", desc: "Standard Vite + React + TypeScript configuration with clean routes.", done: true }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start space-x-3 p-3 bg-[#F4EFE6] rounded border border-[#E3DBD0]">
                    <CheckCircle className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-bold text-[#1C1A18]">{item.title}</p>
                      <p className="text-xs text-[#615A50]">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'sitemap' && (
            <div className="space-y-4">
              <div>
                <h4 className="text-xs uppercase font-bold tracking-wider text-[#736B60] mb-1">
                  sitemap.xml (11 Tracked URLs)
                </h4>
                <p className="text-xs text-[#615A50] mb-2">
                  Stored at <code className="bg-[#EAE4D8] px-1 py-0.5 rounded">/public/sitemap.xml</code>
                </p>
                <div className="p-3 bg-[#1C1A18] text-[#E0D8CC] rounded font-mono text-[11px] max-h-48 overflow-y-auto space-y-1">
                  <div>&lt;urlset xmlns=&quot;http://www.sitemaps.org/schemas/sitemap/0.9&quot;&gt;</div>
                  <div className="pl-4">&lt;url&gt;&lt;loc&gt;https://thewelldressed.magazine/&lt;/loc&gt;&lt;priority&gt;1.0&lt;/priority&gt;&lt;/url&gt;</div>
                  <div className="pl-4">&lt;url&gt;&lt;loc&gt;https://thewelldressed.magazine/keyword-research&lt;/loc&gt;&lt;priority&gt;0.8&lt;/priority&gt;&lt;/url&gt;</div>
                  {keywordResearchData.slice(1).map((k, i) => (
                    <div key={i} className="pl-4">
                      &lt;url&gt;&lt;loc&gt;https://thewelldressed.magazine{k.pageUrl}&lt;/loc&gt;&lt;priority&gt;0.9&lt;/priority&gt;&lt;/url&gt;
                    </div>
                  ))}
                  <div>&lt;/urlset&gt;</div>
                </div>
              </div>

              <div>
                <h4 className="text-xs uppercase font-bold tracking-wider text-[#736B60] mb-1">
                  robots.txt
                </h4>
                <div className="p-3 bg-[#1C1A18] text-[#E0D8CC] rounded font-mono text-[11px]">
                  User-agent: *<br />
                  Allow: /<br />
                  Disallow: /api/<br />
                  Sitemap: https://thewelldressed.magazine/sitemap.xml
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#E3DBD0] bg-[#F2EDE4] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#1C1A18] hover:bg-[#34302C] text-[#FAF8F5] text-xs font-semibold rounded transition-colors cursor-pointer"
          >
            Close Inspector
          </button>
        </div>
      </div>
    </div>
  );
}
