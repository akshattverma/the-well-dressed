import React from 'react';
import { articles } from '../data/articles';
import { Category } from '../types';
import { BarChart3, FileText, ShieldCheck, Rocket, ExternalLink } from 'lucide-react';

interface FooterProps {
  onNavigate: (path: string) => void;
  onSelectCategory: (category: Category | 'All') => void;
  onOpenAudit: () => void;
  onOpenDeploymentGuide: () => void;
}

export function Footer({
  onNavigate,
  onSelectCategory,
  onOpenAudit,
  onOpenDeploymentGuide
}: FooterProps) {
  return (
    <footer className="bg-[#1C1A18] text-[#E7E2D9] border-t border-[#34302C] mt-24">
      {/* Upper editorial masthead strip */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 border-b border-[#34302C] pb-12">
          {/* Col 1: Publication Statement */}
          <div className="md:col-span-4 space-y-4">
            <h3 className="font-['Cinzel'] text-xl font-bold tracking-[0.2em] text-[#FAF8F5]">
              THE WELL-DRESSED
            </h3>
            <p className="font-['Newsreader'] italic text-sm text-[#BDB5A8] leading-relaxed">
              An independent digital journal dedicated to masculine aesthetics, fabric integrity, purposeful grooming, and practical wardrobe engineering.
            </p>
            <div className="pt-2 text-xs text-[#9B9386] space-y-1">
              <p>Curated for College SEO &amp; AEO Architecture Evaluation.</p>
              <p>Built with semantic HTML5, Schema.org JSON-LD, and responsive design.</p>
            </div>
            <div className="pt-3 flex flex-wrap gap-2">
              <button
                onClick={onOpenDeploymentGuide}
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-[#8B6534] hover:bg-[#A37840] text-white text-xs font-semibold rounded transition-colors cursor-pointer"
              >
                <Rocket className="w-3.5 h-3.5" />
                <span>Vercel &amp; GitHub Guide</span>
              </button>
              <button
                onClick={onOpenAudit}
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-[#2B2824] hover:bg-[#3E3A35] text-[#FAF8F5] text-xs font-medium rounded border border-[#443F39] transition-colors cursor-pointer"
              >
                <BarChart3 className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Inspect Schema / SEO</span>
              </button>
            </div>
          </div>

          {/* Col 2: All 10 Articles Directory (SEO internal link powerhouse) */}
          <div className="md:col-span-5 space-y-3">
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#8B6534]">
              Complete Article Index (10 Guides)
            </h4>
            <ul className="space-y-1.5 text-xs text-[#CAC1B3]">
              {articles.map((art) => (
                <li key={art.id}>
                  <button
                    onClick={() => onNavigate(`/article/${art.slug}`)}
                    className="hover:text-white hover:underline transition-colors text-left flex items-start space-x-1.5 group cursor-pointer"
                  >
                    <span className="text-[#8B6534] group-hover:text-[#D4AF37] font-mono text-[11px] pt-0.5">
                      {String(art.id).padStart(2, '0')}.
                    </span>
                    <span className="leading-snug">{art.title}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Sections & Technical SEO Artifacts */}
          <div className="md:col-span-3 space-y-6">
            <div>
              <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#8B6534] mb-3">
                Editorial Desks
              </h4>
              <div className="flex flex-col space-y-1.5 text-xs text-[#CAC1B3]">
                {(['Style', 'Wardrobe', 'Grooming', 'Footwear'] as Category[]).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      onSelectCategory(cat);
                      onNavigate('/');
                    }}
                    className="hover:text-white text-left transition-colors cursor-pointer"
                  >
                    {cat} Desk
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#8B6534] mb-3">
                SEO &amp; Assignment Artifacts
              </h4>
              <div className="flex flex-col space-y-2 text-xs text-[#CAC1B3]">
                <button
                  onClick={() => onNavigate('/keyword-research')}
                  className="hover:text-white text-left transition-colors flex items-center space-x-1.5 text-[#D4AF37] font-semibold cursor-pointer"
                >
                  <BarChart3 className="w-3.5 h-3.5" />
                  <span>Keyword Research Matrix (11 Rows)</span>
                </button>
                <a
                  href="/sitemap.xml"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center space-x-1.5"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>sitemap.xml</span>
                  <ExternalLink className="w-2.5 h-2.5 ml-1 opacity-70" />
                </a>
                <a
                  href="/robots.txt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center space-x-1.5"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>robots.txt</span>
                  <ExternalLink className="w-2.5 h-2.5 ml-1 opacity-70" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Lower Legal & Disclaimer Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#8B8378] space-y-3 sm:space-y-0">
          <p>
            &copy; {new Date().getFullYear()} The Well-Dressed Magazine. All rights reserved. Created for educational and collegiate evaluation.
          </p>
          <div className="flex items-center space-x-4">
            <span>Canonical URLs Active</span>
            <span>·</span>
            <span>Schema.org JSON-LD Validated</span>
            <span>·</span>
            <span>AEO Optimized</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
