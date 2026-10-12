import React, { useState } from 'react';
import { Article } from '../types';
import { articles } from '../data/articles';
import { SEOHead } from '../components/SEOHead';
import { AEOAnswerBox } from '../components/AEOAnswerBox';
import { ArticleCard } from '../components/ArticleCard';
import {
  ChevronRight,
  Clock,
  Calendar,
  Share2,
  CheckCircle,
  ArrowLeft,
  ChevronDown,
  BookOpen,
  ArrowRight,
  ExternalLink,
  Tag
} from 'lucide-react';

interface ArticlePageProps {
  article: Article;
  onNavigate: (path: string) => void;
  onSelectArticle: (slug: string) => void;
}

export function ArticlePage({
  article,
  onNavigate,
  onSelectArticle
}: ArticlePageProps) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [copiedLink, setCopiedLink] = useState(false);

  // Find related articles based on slugs
  const relatedArticles = articles.filter((a) =>
    article.relatedArticleSlugs.includes(a.slug)
  );

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  // Structured Data Schema for this article
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.seoTitle,
    "description": article.metaDescription,
    "image": [article.heroImage],
    "datePublished": "2026-10-01T08:00:00+00:00",
    "dateModified": "2026-10-12T09:30:00+00:00",
    "author": {
      "@type": "Person",
      "name": article.author.name,
      "jobTitle": article.author.role
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
      "@id": `https://thewelldressed.magazine/article/${article.slug}`
    },
    "wordCount": article.wordCount,
    "articleSection": article.category
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": article.faqs.map((f) => ({
      "@type": "Question",
      "name": f.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.answer
      }
    }))
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
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
        "name": article.category,
        "item": `https://thewelldressed.magazine/#${article.category.toLowerCase()}`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": article.title,
        "item": `https://thewelldressed.magazine/article/${article.slug}`
      }
    ]
  };

  return (
    <>
      <SEOHead
        title={article.seoTitle}
        description={article.metaDescription}
        canonicalUrl={`https://thewelldressed.magazine/article/${article.slug}`}
        ogImage={article.heroImage}
        ogType="article"
        authorName={article.author.name}
        publishDate={article.publishDate}
        jsonLd={[articleSchema, faqSchema, breadcrumbSchema]}
      />

      <article className="max-w-4xl mx-auto px-4 sm:px-8 py-6 sm:py-10 space-y-8">
        {/* Breadcrumb Navigation */}
        <nav
          aria-label="Breadcrumbs"
          className="flex items-center space-x-2 text-xs text-[#736B60] pb-2 border-b border-[#ECE7DE]"
        >
          <button
            onClick={() => onNavigate('/')}
            className="hover:text-[#1C1A18] transition-colors cursor-pointer"
          >
            Home
          </button>
          <ChevronRight className="w-3 h-3 text-[#A8A196]" />
          <button
            onClick={() => onNavigate('/')}
            className="hover:text-[#1C1A18] transition-colors cursor-pointer"
          >
            {article.category}
          </button>
          <ChevronRight className="w-3 h-3 text-[#A8A196]" />
          <span className="text-[#1C1A18] font-medium truncate max-w-xs sm:max-w-md">
            {article.title}
          </span>
        </nav>

        {/* Article Header (One Single H1 per page) */}
        <header className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#8B6534]">
              {article.category} Editorial · Guide #{article.id}
            </span>
            <div className="flex items-center space-x-3 text-xs text-[#736B60]">
              <span className="flex items-center space-x-1">
                <Clock className="w-3.5 h-3.5 text-[#8B6534]" />
                <span>{article.readTime}</span>
              </span>
              <span>·</span>
              <span>{article.wordCount} words</span>
            </div>
          </div>

          <h1 className="font-['Newsreader'] text-3xl sm:text-4xl md:text-5xl font-bold text-[#1C1A18] leading-[1.15] tracking-tight">
            {article.title}
          </h1>

          <p className="font-['Newsreader'] italic text-lg sm:text-xl text-[#524B40] leading-relaxed">
            {article.summary}
          </p>

          {/* Author Byline and Metadata Bar */}
          <div className="pt-4 border-y border-[#ECE7DE] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-[#665F53]">
            <div className="flex items-center space-x-3">
              <img
                src={article.author.avatar}
                alt={article.author.name}
                className="w-11 h-11 rounded-full object-cover border border-[#DDD6CA]"
              />
              <div>
                <p className="font-semibold text-sm text-[#1C1A18]">
                  {article.author.name}
                </p>
                <p className="text-[#7C756B]">{article.author.role}</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1 text-[#7C756B]">
                <Calendar className="w-3.5 h-3.5" />
                <span>Published {article.publishDate}</span>
              </div>
              <button
                onClick={handleShare}
                className="p-1.5 rounded hover:bg-[#EAE4D8] text-[#554E44] hover:text-[#1C1A18] transition-colors flex items-center space-x-1 cursor-pointer"
                title="Copy share link"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>{copiedLink ? 'Copied' : 'Share'}</span>
              </button>
            </div>
          </div>
        </header>

        {/* Hero Image with Descriptive Alt Text */}
        <figure className="space-y-2">
          <div className="overflow-hidden rounded-lg aspect-[16/9] bg-[#E3DBD0] border border-[#DDD6CA]">
            <img
              src={article.heroImage}
              alt={article.heroImageAlt}
              className="w-full h-full object-cover"
              loading="eager"
            />
          </div>
          <figcaption className="text-xs text-[#7C756B] italic text-center">
            {article.heroImageAlt}
          </figcaption>
        </figure>

        {/* Requirement 6: AEO Direct Answer Snippet Box (under 250 words) */}
        <AEOAnswerBox
          question={article.aeoQuickAnswer.question}
          directAnswer={article.aeoQuickAnswer.directAnswer}
          keyPoints={article.aeoQuickAnswer.keyPoints}
          targetKeyword={article.targetKeywords.primary}
        />

        {/* Table of Contents Box */}
        <div className="p-5 bg-[#F2EDE4] rounded border border-[#E0D8CB] space-y-2">
          <div className="flex items-center space-x-2 text-xs uppercase tracking-wider font-semibold text-[#1C1A18]">
            <BookOpen className="w-4 h-4 text-[#8B6534]" />
            <span>Table of Contents</span>
          </div>
          <ol className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#524B40]">
            {article.tableOfContents.map((item, idx) => (
              <li key={idx}>
                <a
                  href={`#${item.id}`}
                  className="hover:text-[#8B6534] hover:underline flex items-center space-x-1"
                >
                  <span className="text-[#8B6534] font-mono font-semibold">#{idx + 1}</span>
                  <span className="truncate">{item.title}</span>
                </a>
              </li>
            ))}
          </ol>
        </div>

        {/* Article Body Content Sections */}
        <div className="space-y-12 text-[#2A2724] leading-relaxed pt-2">
          {article.sections.map((section) => (
            <section
              key={section.id}
              id={section.id}
              className="space-y-4 scroll-mt-24"
            >
              <h2 className="font-['Newsreader'] text-2xl sm:text-3xl font-bold text-[#1C1A18] tracking-tight border-b border-[#ECE7DE] pb-2">
                {section.heading}
              </h2>

              {section.leadParagraph && (
                <p className="text-base sm:text-lg font-normal text-[#38332C] leading-relaxed">
                  {section.leadParagraph}
                </p>
              )}

              {section.paragraphs.map((p, pIdx) => (
                <p key={pIdx} className="text-sm sm:text-base text-[#423C34] leading-relaxed">
                  {p}
                </p>
              ))}

              {/* Comparison Table if present */}
              {section.comparisonTable && (
                <div className="my-6 overflow-x-auto rounded border border-[#DDD5C7] bg-[#FAF8F5]">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead className="bg-[#EFEAE0] text-[#1C1A18] uppercase tracking-wider text-[11px] font-semibold border-b border-[#DDD5C7]">
                      <tr>
                        {section.comparisonTable.headers.map((h, hIdx) => (
                          <th key={hIdx} className="p-3 sm:p-4">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#EBE5DB]">
                      {section.comparisonTable.rows.map((row, rIdx) => (
                        <tr key={rIdx} className="hover:bg-[#F5F0E6] transition-colors">
                          {row.map((cell, cIdx) => (
                            <td key={cIdx} className="p-3 sm:p-4 text-[#3E382F] leading-snug">
                              {cIdx === 0 ? <strong className="text-[#1C1A18]">{cell}</strong> : cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Pull quote if present */}
              {section.quote && (
                <blockquote className="my-6 p-6 border-l-3 border-[#8B6534] bg-[#F7F3EA] rounded-r space-y-2">
                  <p className="font-['Newsreader'] italic text-lg sm:text-xl text-[#1C1A18]">
                    &ldquo;{section.quote.text}&rdquo;
                  </p>
                  <cite className="block text-xs uppercase tracking-wider font-semibold text-[#8B6534]">
                    &mdash; {section.quote.author}
                  </cite>
                </blockquote>
              )}

              {/* Pro tip callout if present */}
              {section.proTip && (
                <div className="my-4 p-4 bg-[#F2EDE4] border border-[#DDD6CA] rounded text-xs sm:text-sm text-[#4A433A] flex items-start space-x-3">
                  <span className="font-bold text-[#8B6534] uppercase tracking-wider text-[11px] shrink-0 pt-0.5">
                    Pro Tip:
                  </span>
                  <span>{section.proTip}</span>
                </div>
              )}

              {/* Internal Link contextual prompt */}
              {section.internalLinkPrompt && (
                <div className="my-5 p-4 bg-[#EFEAE0] border border-[#DDD6CA] rounded flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <span className="text-[#4F473C]">
                    {section.internalLinkPrompt.text}
                  </span>
                  <button
                    onClick={() => onSelectArticle(section.internalLinkPrompt!.targetSlug)}
                    className="inline-flex items-center space-x-1 font-bold text-[#8B6534] hover:text-[#5E421E] shrink-0 cursor-pointer"
                  >
                    <span>{section.internalLinkPrompt.anchorText}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </section>
          ))}
        </div>

        {/* Conclusion Section */}
        <section className="mt-12 p-6 sm:p-8 bg-[#F5F0E6] rounded-lg border border-[#DDD5C7] space-y-4">
          <h2 className="font-['Newsreader'] text-2xl font-bold text-[#1C1A18]">
            {article.conclusion.heading}
          </h2>
          <p className="text-sm sm:text-base text-[#4A433A] leading-relaxed">
            {article.conclusion.summary}
          </p>
          <div className="pt-2 space-y-2">
            <h3 className="text-xs uppercase tracking-wider font-bold text-[#1C1A18]">
              Your Actionable Checklist:
            </h3>
            <ul className="space-y-1.5 text-xs sm:text-sm text-[#3E382F]">
              {article.conclusion.actionableChecklist.map((item, idx) => (
                <li key={idx} className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <span className="leading-snug">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Article FAQs (Requirement 6: AEO structured answers) */}
        <section id="faqs" className="mt-12 space-y-4 scroll-mt-24">
          <div className="space-y-1">
            <span className="text-xs uppercase tracking-wider font-semibold text-[#8B6534]">
              Frequently Asked Questions
            </span>
            <h2 className="font-['Newsreader'] text-2xl font-bold text-[#1C1A18]">
              Frequently Asked Questions About {article.title}
            </h2>
          </div>

          <div className="space-y-2.5">
            {article.faqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="border border-[#E0D8CB] rounded bg-[#FAF8F5] overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full text-left p-4 flex items-center justify-between text-sm sm:text-base font-semibold text-[#1C1A18] hover:text-[#8B6534] transition-colors cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#7C756B] transition-transform shrink-0 ml-4 ${
                        isOpen ? 'rotate-180 text-[#8B6534]' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 pt-1 text-xs sm:text-sm text-[#4A433A] leading-relaxed border-t border-[#ECE6DC] bg-[#F7F3EB]">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Author Bio Card */}
        <section className="p-6 bg-[#F2EDE4] rounded border border-[#E0D8CB] flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-5">
          <img
            src={article.author.avatar}
            alt={article.author.name}
            className="w-16 h-16 rounded-full object-cover border border-[#DDD6CA]"
          />
          <div className="space-y-1.5 text-center sm:text-left">
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2">
              <h3 className="font-bold text-[#1C1A18] text-base">{article.author.name}</h3>
              <span className="hidden sm:inline text-[#B5AEA4]">·</span>
              <span className="text-xs text-[#8B6534] font-medium">{article.author.role}</span>
            </div>
            <p className="text-xs text-[#5C564C] leading-relaxed">
              {article.author.bio}
            </p>
          </div>
        </section>

        {/* Target Keyword Metadata Bar for Assignment Verification */}
        <div className="p-4 bg-[#EAE4D8] rounded border border-[#D8D0C2] text-xs text-[#4F473C] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <Tag className="w-3.5 h-3.5 text-[#8B6534]" />
            <span>Target Keyword: <strong>&quot;{article.targetKeywords.primary}&quot;</strong></span>
            <span>· Intent: <strong>{article.targetKeywords.searchIntent}</strong></span>
            <span>· Est. Vol: <strong>{article.targetKeywords.monthlyVolumeEstimate}</strong></span>
          </div>
          <button
            onClick={() => onNavigate('/keyword-research')}
            className="text-[#8B6534] font-semibold hover:underline cursor-pointer"
          >
            Inspect in Keyword Table &rarr;
          </button>
        </div>

        {/* Related Articles Carousel / Grid */}
        {relatedArticles.length > 0 && (
          <section className="pt-8 border-t border-[#ECE7DE] space-y-6">
            <div>
              <span className="text-xs uppercase tracking-wider font-semibold text-[#8B6534]">
                Continue Reading
              </span>
              <h2 className="font-['Newsreader'] text-2xl font-bold text-[#1C1A18]">
                Related Style &amp; Wardrobe Dispatches
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {relatedArticles.map((rel) => (
                <ArticleCard
                  key={rel.id}
                  article={rel}
                  onSelect={onSelectArticle}
                />
              ))}
            </div>
          </section>
        )}

        {/* Back to Home Button */}
        <div className="pt-6 text-center">
          <button
            onClick={() => onNavigate('/')}
            className="inline-flex items-center space-x-2 px-6 py-2.5 bg-[#1C1A18] text-white text-xs font-semibold rounded hover:bg-[#34302C] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to All Stories</span>
          </button>
        </div>
      </article>
    </>
  );
}
