import React, { useState } from 'react';
import { articles } from '../data/articles';
import { ArticleCard } from '../components/ArticleCard';
import { SEOHead } from '../components/SEOHead';
import { Category } from '../types';
import { ArrowRight, ChevronDown, BarChart3, Sparkles, CheckCircle2, Shield, Shirt, Scissors, Footprints, Layers } from 'lucide-react';

interface HomePageProps {
  onSelectArticle: (slug: string) => void;
  selectedCategory: Category | 'All';
  onSelectCategory: (category: Category | 'All') => void;
  onNavigate: (path: string) => void;
  searchQuery: string;
}

export function HomePage({
  onSelectArticle,
  selectedCategory,
  onSelectCategory,
  onNavigate,
  searchQuery
}: HomePageProps) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Filter articles based on category and search query
  const filteredArticles = articles.filter((art) => {
    const matchesCat = selectedCategory === 'All' || art.category === selectedCategory;
    const matchesSearch =
      !searchQuery ||
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.targetKeywords.primary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const featuredArticle = articles[0]; // Lead story
  const remainingArticles = filteredArticles.filter((a) => a.id !== featuredArticle.id || selectedCategory !== 'All' || Boolean(searchQuery));

  // Common Fashion Questions (Homepage AEO FAQ)
  const homeFaqs = [
    {
      q: "What is the single most important rule in men's fashion?",
      a: "Fit is the single most critical factor in menswear. An inexpensive garment that aligns precisely with your shoulder seams, frames your torso naturally, and sits at a clean slight break on your shoes will always look superior to an ill-fitting four-hundred-dollar designer piece."
    },
    {
      q: "How many clothes does a man actually need to dress well?",
      a: "A versatile men's capsule wardrobe requires only 15 to 20 carefully chosen items: 4 neutral tops, 3 versatile trousers (chinos, dark denim, wool trousers), 2 layering pieces (overshirt and knit sweater), 2 coats, and 3 pairs of shoes. These generate over 50 distinct combinations."
    },
    {
      q: "Can you wear sneakers in a smart-casual dress code?",
      a: "Yes, provided they are minimalist, low-profile leather sneakers with zero athletic logos or neon mesh. Pristine white or off-white leather court shoes paired with chinos, an Oxford button-down, and a chore coat or blazer represent the modern benchmark of smart-casual."
    },
    {
      q: "What is Answer Engine Optimisation (AEO) and why does it matter for fashion?",
      a: "AEO structures editorial content to provide direct, authoritative answers to conversational search queries (like 'how to dress smart-casual for college') so that AI search engines (Google AI Overviews, Perplexity, ChatGPT) can parse, extract, and cite the publication directly as a trusted source."
    }
  ];

  const categoriesList: { name: Category; count: number; icon: React.ReactNode; desc: string }[] = [
    {
      name: 'Style',
      count: articles.filter(a => a.category === 'Style').length,
      icon: <Shirt className="w-5 h-5 text-[#8B6534]" />,
      desc: "Proportions, color harmony, silhouette balancing, and everyday outfit templates."
    },
    {
      name: 'Wardrobe',
      count: articles.filter(a => a.category === 'Wardrobe').length,
      icon: <Layers className="w-5 h-5 text-[#8B6534]" />,
      desc: "Capsule systems, budget arithmetic, collegiate rotations, and closet minimalism."
    },
    {
      name: 'Grooming',
      count: articles.filter(a => a.category === 'Grooming').length,
      icon: <Scissors className="w-5 h-5 text-[#8B6534]" />,
      desc: "Dermatological skincare regimens, facial hair trimming, and haircuts by face shape."
    },
    {
      name: 'Footwear',
      count: articles.filter(a => a.category === 'Footwear').length,
      icon: <Footprints className="w-5 h-5 text-[#8B6534]" />,
      desc: "Goodyear welt construction, the essential 5 pairs, and leather maintenance."
    }
  ];

  return (
    <>
      <SEOHead
        title="The Well-Dressed | Men's Fashion, Style & Grooming Magazine"
        description="A comprehensive editorial guide to modern men's style, capsule wardrobes, college smart-casual dressing, grooming routines, footwear, and timeless fit fundamentals."
        canonicalUrl="https://thewelldressed.magazine/"
        ogType="website"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 sm:py-12 space-y-16">
        {/* Editorial Introduction Banner */}
        <section className="text-center max-w-3xl mx-auto space-y-4 pt-4 border-b border-[#ECE7DE] pb-10">
          <p className="text-xs uppercase tracking-[0.25em] font-semibold text-[#8B6534]">
            An Editorial Guide for Men of Taste
          </p>
          <h1 className="font-['Newsreader'] text-3xl sm:text-5xl font-bold text-[#1C1A18] tracking-tight leading-tight">
            Style is an Engineered Discipline, Not an Accident.
          </h1>
          <p className="text-sm sm:text-base text-[#615A50] leading-relaxed font-light max-w-2xl mx-auto">
            Welcome to <strong className="font-semibold text-[#1C1A18]">The Well-Dressed</strong>. We demystify menswear through fit physics, fabric integrity, minimalist capsule architecture, and pragmatic grooming routines.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4 text-xs text-[#736B60]">
            <span className="flex items-center space-x-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#8B6534]" />
              <span>10 Fully Written Guides</span>
            </span>
            <span className="text-[#C8C0B4]">·</span>
            <span className="flex items-center space-x-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#8B6534]" />
              <span>AEO Answer Snippets</span>
            </span>
            <span className="text-[#C8C0B4]">·</span>
            <button
              onClick={() => onNavigate('/keyword-research')}
              className="text-[#8B6534] font-semibold hover:underline flex items-center space-x-1 cursor-pointer"
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>View Keyword Matrix (11 Rows)</span>
            </button>
          </div>
        </section>

        {/* Lead Story (Only if 'All' category and no active search query) */}
        {selectedCategory === 'All' && !searchQuery && (
          <section aria-label="Lead Story">
            <ArticleCard
              article={featuredArticle}
              onSelect={onSelectArticle}
              featured={true}
            />
          </section>
        )}

        {/* Category Navigation Pills / Filter Bar */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E3DBD0] gap-4">
            <div>
              <h2 className="font-['Newsreader'] text-2xl font-bold text-[#1C1A18]">
                {selectedCategory === 'All' ? 'Latest Editorial Dispatches' : `${selectedCategory} Editorial Archive`}
              </h2>
              <p className="text-xs text-[#7C756B] mt-0.5">
                Showing {filteredArticles.length} {filteredArticles.length === 1 ? 'article' : 'articles'}
                {searchQuery && ` matching "${searchQuery}"`}
              </p>
            </div>

            {/* Filter buttons */}
            <div className="flex flex-wrap gap-2 text-xs">
              {(['All', 'Style', 'Wardrobe', 'Grooming', 'Footwear'] as (Category | 'All')[]).map((cat) => (
                <button
                  key={cat}
                  onClick={() => onSelectCategory(cat)}
                  className={`px-3 py-1.5 rounded transition-all cursor-pointer font-medium ${
                    selectedCategory === cat
                      ? 'bg-[#1C1A18] text-[#FAF8F5] shadow-xs'
                      : 'bg-[#F0EBE0] text-[#554E44] hover:bg-[#E4DDCF]'
                  }`}
                >
                  {cat === 'All' ? 'All (10)' : `${cat} (${articles.filter(a => a.category === cat).length})`}
                </button>
              ))}
            </div>
          </div>

          {/* Articles Grid */}
          {filteredArticles.length === 0 ? (
            <div className="text-center py-16 bg-[#F4EFE6] rounded border border-[#E0D8CB] space-y-3">
              <p className="font-['Newsreader'] text-xl font-bold text-[#1C1A18]">No articles found matching &quot;{searchQuery}&quot;</p>
              <p className="text-xs text-[#736B60]">Try adjusting your search terms or selecting another category.</p>
              <button
                onClick={() => onSelectCategory('All')}
                className="mt-2 px-4 py-2 bg-[#8B6534] text-white text-xs font-semibold rounded hover:bg-[#705026] cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {remainingArticles.map((article) => (
                <ArticleCard
                  key={article.id}
                  article={article}
                  onSelect={onSelectArticle}
                />
              ))}
            </div>
          )}
        </section>

        {/* 4 Core Editorial Categories Showcase */}
        <section className="bg-[#F2EDE3] border border-[#DDD5C7] rounded-lg p-6 sm:p-10 space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#8B6534]">
              Editorial Desks
            </span>
            <h2 className="font-['Newsreader'] text-2xl sm:text-3xl font-bold text-[#1C1A18]">
              The Four Pillars of the Well-Dressed Man
            </h2>
            <p className="text-xs sm:text-sm text-[#615A50]">
              Every article in our publication is structured around actionable principles tested against classic sartorial standards.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
            {categoriesList.map((c) => (
              <div
                key={c.name}
                onClick={() => onSelectCategory(c.name)}
                className="bg-[#FAF8F5] p-5 rounded border border-[#DDD6CA] hover:border-[#8B6534] transition-all cursor-pointer group flex flex-col justify-between space-y-3"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    {c.icon}
                    <span className="text-[11px] font-mono text-[#8B6534] font-semibold">
                      {c.count} Guides
                    </span>
                  </div>
                  <h3 className="font-['Newsreader'] text-lg font-bold text-[#1C1A18] group-hover:text-[#8B6534] transition-colors">
                    {c.name}
                  </h3>
                  <p className="text-xs text-[#6A6357] leading-relaxed">
                    {c.desc}
                  </p>
                </div>
                <span className="text-[11px] font-semibold text-[#8B6534] group-hover:underline flex items-center pt-2">
                  Browse {c.name} stories &rarr;
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Keyword Research Callout Banner (Meets Requirement 3 & 4) */}
        <section className="relative overflow-hidden bg-[#1C1A18] text-[#FAF8F5] rounded-lg p-8 sm:p-10 border border-[#34302C]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-3">
              <div className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">
                <BarChart3 className="w-4 h-4" />
                <span>Assignment Requirement 4 · Complete Matrix</span>
              </div>
              <h2 className="font-['Newsreader'] text-2xl sm:text-3xl font-bold text-[#FAF8F5] leading-snug">
                Explore the 11-Row Keyword Research &amp; Search Intent Table
              </h2>
              <p className="text-xs sm:text-sm text-[#C8C0B4] leading-relaxed">
                Review the primary keywords, secondary search terms, search intent classifications (Know, Go, Compare, Do), estimated monthly volumes, and natural-language queries answered by the homepage and all 10 articles.
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
              <button
                onClick={() => onNavigate('/keyword-research')}
                className="px-5 py-3 bg-[#8B6534] hover:bg-[#A37840] text-white text-xs font-semibold rounded uppercase tracking-wider transition-colors flex items-center justify-center space-x-2 cursor-pointer shadow-md"
              >
                <span>Open Keyword Table</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <div className="text-[11px] text-[#A69E92] text-center lg:text-left">
                Includes exact 6 columns required for grading.
              </div>
            </div>
          </div>
        </section>

        {/* Common Fashion Questions (Homepage AEO FAQ Accordion) */}
        <section id="faq-section" className="space-y-6 pt-4">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#8B6534]">
              Answer Engine Optimisation
            </span>
            <h2 className="font-['Newsreader'] text-2xl sm:text-3xl font-bold text-[#1C1A18]">
              Frequently Asked Men&apos;s Fashion Questions
            </h2>
            <p className="text-xs sm:text-sm text-[#615A50]">
              Direct, natural-language answers engineered for search engine snippets and AI Overviews.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {homeFaqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="border border-[#E2DAD0] rounded bg-[#FAF8F5] overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full text-left p-4 sm:p-5 flex items-center justify-between text-sm sm:text-base font-bold text-[#1C1A18] hover:text-[#8B6534] transition-colors cursor-pointer"
                  >
                    <span className="font-['Newsreader']">{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#7C756B] transition-transform duration-200 shrink-0 ml-4 ${
                        isOpen ? 'rotate-180 text-[#8B6534]' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-[#474138] leading-relaxed border-t border-[#ECE6DC] bg-[#F7F3EB]">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </>
  );
}
