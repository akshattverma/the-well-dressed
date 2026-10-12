import React, { useState } from 'react';
import { Search, Menu, X, BarChart3, Rocket, Compass, BookOpen } from 'lucide-react';
import { Category } from '../types';

interface HeaderProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  selectedCategory: Category | 'All';
  onSelectCategory: (category: Category | 'All') => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onOpenAudit: () => void;
  onOpenDeploymentGuide: () => void;
}

export function Header({
  currentPath,
  onNavigate,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  onOpenAudit,
  onOpenDeploymentGuide
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const categories: (Category | 'All')[] = ['All', 'Style', 'Wardrobe', 'Grooming', 'Footwear'];

  const handleCategoryClick = (cat: Category | 'All') => {
    onSelectCategory(cat);
    if (currentPath !== '/') {
      onNavigate('/');
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="border-b border-[#E7E2D9] bg-[#FAF8F5]/95 backdrop-blur-md sticky top-0 z-40">
      {/* Top micro-bar: Editorial publication markers */}
      <div className="border-b border-[#ECE7DE] py-1.5 px-4 sm:px-8 text-xs tracking-widest text-[#7C756B] uppercase flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <span className="font-medium text-[#1C1A18]">The Well-Dressed</span>
          <span className="hidden sm:inline text-[#B5AEA4]">/</span>
          <span className="hidden sm:inline">Volume IV · Issue 10</span>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={onOpenDeploymentGuide}
            className="flex items-center space-x-1.5 text-[#8B6534] hover:text-[#654620] font-semibold transition-colors cursor-pointer"
            title="Deploy to GitHub & Vercel step-by-step guide"
          >
            <Rocket className="w-3.5 h-3.5" />
            <span className="text-[11px]">Deploy Guide</span>
          </button>
        </div>
      </div>

      {/* Main Masthead */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-5 sm:py-6 flex flex-col items-center justify-center relative">
        <div className="w-full flex items-center justify-between sm:justify-center relative">
          <button
            onClick={() => {
              onNavigate('/');
              onSelectCategory('All');
            }}
            className="text-center group cursor-pointer"
          >
            <h1 className="font-['Cinzel'] text-2xl sm:text-4xl md:text-5xl font-bold tracking-[0.18em] sm:tracking-[0.25em] text-[#1C1A18] transition-opacity group-hover:opacity-90">
              THE WELL-DRESSED
            </h1>
            <p className="font-['Newsreader'] italic text-xs sm:text-sm text-[#736B60] tracking-wide mt-1">
              Journal of Timeless Menswear, Grooming &amp; Sartorial Culture
            </p>
          </button>

          {/* Mobile hamburger */}
          <div className="sm:hidden flex items-center space-x-2">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 text-[#4A453E] hover:text-[#1C1A18]"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#4A453E] hover:text-[#1C1A18]"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Desktop Search Toggle in masthead corner */}
        <div className="hidden sm:flex absolute right-8 top-1/2 -translate-y-1/2 items-center space-x-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Search 10 articles..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-48 lg:w-60 pl-8 pr-3 py-1.5 text-xs bg-[#F2EDE4] border border-[#DDD6CA] rounded text-[#1C1A18] placeholder-[#8B8378] focus:outline-none focus:ring-1 focus:ring-[#8B6534] transition-all"
            />
            <Search className="w-3.5 h-3.5 text-[#8B8378] absolute left-2.5 top-1/2 -translate-y-1/2" />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-[#8B8378] hover:text-[#1C1A18]"
              >
                ×
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav className="border-t border-[#ECE7DE] hidden sm:block bg-[#FAF8F5]">
        <div className="max-w-7xl mx-auto px-8 flex items-center justify-between">
          <div className="flex items-center space-x-8 py-3 text-xs tracking-wider uppercase font-medium">
            {categories.map((cat) => {
              const isActive = currentPath === '/' && selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => handleCategoryClick(cat)}
                  className={`transition-colors pb-0.5 border-b-2 cursor-pointer ${
                    isActive
                      ? 'border-[#8B6534] text-[#1C1A18] font-semibold'
                      : 'border-transparent text-[#615A50] hover:text-[#1C1A18] hover:border-[#D0C7B8]'
                  }`}
                >
                  {cat === 'All' ? 'All Stories' : cat}
                </button>
              );
            })}

            <span className="text-[#DDD6CA]">|</span>

            {/* Keyword Research Nav Link */}
            <button
              onClick={() => onNavigate('/keyword-research')}
              className={`transition-colors pb-0.5 border-b-2 flex items-center space-x-1.5 cursor-pointer ${
                currentPath === '/keyword-research'
                  ? 'border-[#8B6534] text-[#8B6534] font-semibold'
                  : 'border-transparent text-[#7C756B] hover:text-[#1C1A18]'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5 text-[#8B6534]" />
              <span>Keyword Research (11 Rows)</span>
            </button>
          </div>

          <div className="flex items-center space-x-4 text-xs">
            <button
              onClick={() => onNavigate('/#faq-section')}
              className="text-[#7C756B] hover:text-[#1C1A18] flex items-center space-x-1 cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Fashion FAQ</span>
            </button>
            <button
              onClick={onOpenDeploymentGuide}
              className="px-2.5 py-1 text-[11px] bg-[#1C1A18] text-[#FAF8F5] rounded hover:bg-[#34302C] transition-colors flex items-center space-x-1.5 cursor-pointer"
            >
              <Rocket className="w-3 h-3 text-[#D4AF37]" />
              <span>Vercel / GitHub Setup</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-[#ECE7DE] bg-[#FAF8F5] px-4 py-4 space-y-4 shadow-lg animate-in fade-in duration-150">
          <div className="relative">
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-8 pr-3 py-2 text-sm bg-[#F2EDE4] border border-[#DDD6CA] rounded text-[#1C1A18]"
            />
            <Search className="w-4 h-4 text-[#8B8378] absolute left-2.5 top-1/2 -translate-y-1/2" />
          </div>

          <div className="flex flex-col space-y-2 text-sm uppercase tracking-wider font-medium text-[#4A453E]">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryClick(cat)}
                className={`text-left py-2 px-2 rounded ${
                  currentPath === '/' && selectedCategory === cat
                    ? 'bg-[#EAE4D8] text-[#1C1A18] font-bold'
                    : 'hover:bg-[#F2EDE4]'
                }`}
              >
                {cat === 'All' ? 'All Stories' : cat}
              </button>
            ))}
            <div className="pt-2 border-t border-[#ECE7DE] space-y-2">
              <button
                onClick={() => {
                  onNavigate('/keyword-research');
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left py-2 px-2 text-[#8B6534] font-semibold flex items-center space-x-2"
              >
                <BarChart3 className="w-4 h-4" />
                <span>Keyword Research Page</span>
              </button>
              <button
                onClick={() => {
                  onOpenDeploymentGuide();
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left py-2 px-2 text-[#1C1A18] font-medium flex items-center space-x-2"
              >
                <Rocket className="w-4 h-4 text-[#8B6534]" />
                <span>GitHub &amp; Vercel Deployment Guide</span>
              </button>
              <button
                onClick={() => {
                  onOpenAudit();
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left py-2 px-2 text-[#615A50] flex items-center space-x-2"
              >
                <Compass className="w-4 h-4" />
                <span>SEO &amp; AEO Architecture Inspector</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
