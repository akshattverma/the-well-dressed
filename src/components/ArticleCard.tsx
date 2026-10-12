import React from 'react';
import { Article } from '../types';
import { ArrowUpRight } from 'lucide-react';

interface ArticleCardProps {
  article: Article;
  onSelect: (slug: string) => void;
  featured?: boolean;
}

export function ArticleCard({ article, onSelect, featured = false }: ArticleCardProps) {
  if (featured) {
    return (
      <article
        onClick={() => onSelect(article.slug)}
        className="group cursor-pointer grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#F4EFE6] border border-[#E3DBD0] p-6 sm:p-8 rounded-lg transition-all duration-300 hover:border-[#8B6534] hover:shadow-md"
      >
        <div className="lg:col-span-7 overflow-hidden rounded relative aspect-[16/10] bg-[#E3DBD0]">
          <img
            src={article.heroImage}
            alt={article.heroImageAlt}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute top-4 left-4 bg-[#1C1A18]/85 text-[#FAF8F5] text-[11px] uppercase tracking-widest px-2.5 py-1 font-medium backdrop-blur-xs">
            Featured Lead Story
          </div>
        </div>

        <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            {/* Zero-pill unboxed metadata discipline */}
            <div className="text-xs uppercase tracking-[0.2em] font-semibold text-[#8B6534] flex items-center space-x-2">
              <span>{article.category}</span>
              <span className="text-[#B5AEA4]">·</span>
              <span>{article.readTime}</span>
              <span className="text-[#B5AEA4]">·</span>
              <span>{article.wordCount} words</span>
            </div>

            <h2 className="font-['Newsreader'] text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1C1A18] leading-tight group-hover:text-[#8B6534] transition-colors">
              {article.title}
            </h2>

            <p className="text-sm text-[#5C564C] leading-relaxed line-clamp-3">
              {article.summary}
            </p>
          </div>

          <div className="pt-4 border-t border-[#E3DBD0] flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img
                src={article.author.avatar}
                alt={article.author.name}
                className="w-9 h-9 rounded-full object-cover border border-[#DDD6CA]"
              />
              <div className="text-xs">
                <p className="font-medium text-[#1C1A18]">{article.author.name}</p>
                <p className="text-[#7C756B]">{article.publishDate}</p>
              </div>
            </div>

            <span className="inline-flex items-center text-xs font-semibold uppercase tracking-wider text-[#8B6534] group-hover:translate-x-0.5 transition-transform">
              Read Story
              <ArrowUpRight className="w-4 h-4 ml-1" />
            </span>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article
      onClick={() => onSelect(article.slug)}
      className="group cursor-pointer flex flex-col justify-between bg-[#F8F5EE] border border-[#E7E2D8] rounded p-5 transition-all duration-300 hover:border-[#8B6534] hover:shadow-md"
    >
      <div className="space-y-4">
        {/* Card Image */}
        <div className="overflow-hidden rounded aspect-[16/10] bg-[#E7E2D8] relative">
          <img
            src={article.heroImage}
            alt={article.heroImageAlt}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute bottom-2.5 left-2.5 bg-[#1C1A18]/80 text-[#FAF8F5] text-[10px] uppercase tracking-wider px-2 py-0.5 backdrop-blur-xs font-medium">
            {article.category}
          </div>
        </div>

        {/* Metadata */}
        <div className="text-[11px] uppercase tracking-widest text-[#7C756B] flex items-center space-x-2">
          <span>{article.readTime}</span>
          <span className="text-[#C4BCB0]">·</span>
          <span>{article.publishDate}</span>
        </div>

        {/* Title */}
        <h3 className="font-['Newsreader'] text-xl font-bold text-[#1C1A18] leading-snug group-hover:text-[#8B6534] transition-colors line-clamp-2">
          {article.title}
        </h3>

        {/* Summary */}
        <p className="text-xs text-[#5C564C] leading-relaxed line-clamp-2">
          {article.summary}
        </p>
      </div>

      {/* Author and Read action */}
      <div className="pt-4 mt-4 border-t border-[#EAE4D8] flex items-center justify-between text-xs">
        <span className="text-[#736B60] font-medium">{article.author.name}</span>
        <span className="inline-flex items-center text-[11px] font-semibold uppercase tracking-wider text-[#8B6534] group-hover:translate-x-0.5 transition-transform">
          Read Guide
          <ArrowUpRight className="w-3.5 h-3.5 ml-0.5" />
        </span>
      </div>
    </article>
  );
}
