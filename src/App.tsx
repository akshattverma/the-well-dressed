/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { articles } from './data/articles';
import { Category, Article } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ArticlePage } from './pages/ArticlePage';
import { KeywordResearchPage } from './pages/KeywordResearchPage';
import { SeoAuditModal } from './components/SeoAuditModal';
import { DeploymentGuideModal } from './components/DeploymentGuideModal';

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname || '/';
  });
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isAuditOpen, setIsAuditOpen] = useState(false);
  const [isDeploymentGuideOpen, setIsDeploymentGuideOpen] = useState(false);

  // Sync with browser popstate (back/forward buttons)
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (path: string) => {
    if (path.startsWith('/#')) {
      const elementId = path.replace('/#', '');
      if (currentPath !== '/') {
        window.history.pushState({}, '', '/');
        setCurrentPath('/');
      }
      setTimeout(() => {
        const el = document.getElementById(elementId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return;
    }

    if (window.location.pathname !== path) {
      window.history.pushState({}, '', path);
    }
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectArticle = (slug: string) => {
    navigateTo(`/article/${slug}`);
  };

  // Determine current route view
  let activeArticle: Article | undefined = undefined;
  let isArticleView = false;
  let isKeywordResearchView = false;

  if (currentPath.startsWith('/article/')) {
    const slug = currentPath.replace('/article/', '').replace(/\/$/, '');
    activeArticle = articles.find((a) => a.slug === slug);
    if (activeArticle) {
      isArticleView = true;
    }
  } else if (currentPath === '/keyword-research' || currentPath === '/keyword-research/') {
    isKeywordResearchView = true;
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#1C1A18] font-['Plus_Jakarta_Sans'] selection:bg-[#8B6534] selection:text-white">
      {/* Editorial Masthead & Navigation */}
      <Header
        currentPath={currentPath}
        onNavigate={navigateTo}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenAudit={() => setIsAuditOpen(true)}
        onOpenDeploymentGuide={() => setIsDeploymentGuideOpen(true)}
      />

      {/* Main Page Content Router */}
      <main className="flex-1">
        {isArticleView && activeArticle ? (
          <ArticlePage
            article={activeArticle}
            onNavigate={navigateTo}
            onSelectArticle={handleSelectArticle}
          />
        ) : isKeywordResearchView ? (
          <KeywordResearchPage
            onNavigate={navigateTo}
            onSelectArticle={handleSelectArticle}
          />
        ) : (
          <HomePage
            onSelectArticle={handleSelectArticle}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            onNavigate={navigateTo}
            searchQuery={searchQuery}
          />
        )}
      </main>

      {/* Editorial Footer */}
      <Footer
        onNavigate={navigateTo}
        onSelectCategory={setSelectedCategory}
        onOpenAudit={() => setIsAuditOpen(true)}
        onOpenDeploymentGuide={() => setIsDeploymentGuideOpen(true)}
      />

      {/* Assignment Inspector Modals */}
      <SeoAuditModal
        isOpen={isAuditOpen}
        onClose={() => setIsAuditOpen(false)}
        currentArticle={activeArticle}
        currentPath={currentPath}
      />

      <DeploymentGuideModal
        isOpen={isDeploymentGuideOpen}
        onClose={() => setIsDeploymentGuideOpen(false)}
      />
    </div>
  );
}
