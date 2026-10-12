import React, { useState } from 'react';
import { keywordResearchData, seoAssignmentSummary } from '../data/keywordResearch';
import { SEOHead } from '../components/SEOHead';
import {
  BarChart3,
  Search,
  Download,
  Copy,
  Check,
  ArrowRight,
  ExternalLink,
  Info,
  CheckCircle2,
  FileSpreadsheet,
  Compass
} from 'lucide-react';

interface KeywordResearchPageProps {
  onNavigate: (path: string) => void;
  onSelectArticle: (slug: string) => void;
}

export function KeywordResearchPage({
  onNavigate,
  onSelectArticle
}: KeywordResearchPageProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIntent, setSelectedIntent] = useState<string>('All');
  const [copied, setCopied] = useState(false);

  // Filtered rows
  const filteredRows = keywordResearchData.filter((row) => {
    const matchesIntent = selectedIntent === 'All' || row.intent === selectedIntent;
    const matchesSearch =
      !searchTerm ||
      row.pageName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.mainKeyword.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.relatedKeywords.some((k) => k.toLowerCase().includes(searchTerm.toLowerCase())) ||
      row.questionAnswered.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesIntent && matchesSearch;
  });

  const handleRowClick = (url: string) => {
    if (url === '/') {
      onNavigate('/');
    } else {
      const slug = url.replace('/article/', '');
      onSelectArticle(slug);
    }
  };

  const handleCopyTable = () => {
    const headers = ["Page", "Main keyword", "2 related keywords", "Intent", "Volume", "Question it answers"];
    const rows = keywordResearchData.map((r) => [
      r.pageName,
      r.mainKeyword,
      r.relatedKeywords.join('; '),
      r.intent,
      r.volume,
      r.questionAnswered
    ]);

    const tsvContent = [
      headers.join('\t'),
      ...rows.map((row) => row.join('\t'))
    ].join('\n');

    navigator.clipboard.writeText(tsvContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadCSV = () => {
    const headers = ["Page", "Main keyword", "Related Keyword 1", "Related Keyword 2", "Intent", "Volume", "Question it answers"];
    const rows = keywordResearchData.map((r) => [
      `"${r.pageName.replace(/"/g, '""')}"`,
      `"${r.mainKeyword.replace(/"/g, '""')}"`,
      `"${r.relatedKeywords[0].replace(/"/g, '""')}"`,
      `"${r.relatedKeywords[1].replace(/"/g, '""')}"`,
      `"${r.intent}"`,
      `"${r.volume.replace(/"/g, '""')}"`,
      `"${r.questionAnswered.replace(/"/g, '""')}"`
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "the_well_dressed_keyword_research.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <SEOHead
        title="Keyword Research Matrix & Search Intent | The Well-Dressed"
        description="Comprehensive 11-row keyword research table detailing primary keywords, secondary keywords, search intent, estimated search volumes, and answered queries."
        canonicalUrl="https://thewelldressed.magazine/keyword-research"
        ogType="website"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 sm:py-12 space-y-10">
        {/* Header & Assignment Banner */}
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest font-semibold text-[#8B6534]">
            <BarChart3 className="w-4 h-4" />
            <span>College SEO &amp; AEO Assignment · Requirement 4</span>
          </div>
          <h1 className="font-['Newsreader'] text-3xl sm:text-5xl font-bold text-[#1C1A18] tracking-tight leading-tight">
            Keyword Research &amp; Search Intent Architecture
          </h1>
          <p className="text-sm sm:text-base text-[#524B40] leading-relaxed">
            This matrix establishes the strategic SEO and Answer Engine Optimisation (AEO) foundation for <strong className="text-[#1C1A18]">The Well-Dressed</strong>. Each page targets a distinct primary keyword, two relevant long-tail secondary keywords, an explicit search intent classification, an estimated monthly search volume, and a natural-language question.
          </p>
        </div>

        {/* Methodology & Assignment Stats Card */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-5 bg-[#F2EDE4] rounded-lg border border-[#DDD5C7] text-xs">
          <div className="space-y-1">
            <span className="text-[#736B60] uppercase tracking-wider font-semibold text-[10px]">Total Pages Tracked</span>
            <p className="font-['Newsreader'] text-2xl font-bold text-[#1C1A18]">11 Pages</p>
            <p className="text-[#665F53]">Homepage + 10 Complete Articles</p>
          </div>
          <div className="space-y-1">
            <span className="text-[#736B60] uppercase tracking-wider font-semibold text-[10px]">Unique Keywords</span>
            <p className="font-['Newsreader'] text-2xl font-bold text-[#8B6534]">33 Terms</p>
            <p className="text-[#665F53]">11 Primary + 22 Secondary</p>
          </div>
          <div className="space-y-1">
            <span className="text-[#736B60] uppercase tracking-wider font-semibold text-[10px]">Total Search Demand</span>
            <p className="font-['Newsreader'] text-2xl font-bold text-[#1C1A18]">374,500/mo</p>
            <p className="text-[#665F53]">Aggregated Monthly Estimate</p>
          </div>
          <div className="space-y-1">
            <span className="text-[#736B60] uppercase tracking-wider font-semibold text-[10px]">Intent Alignment</span>
            <p className="font-['Newsreader'] text-2xl font-bold text-emerald-800">Know &amp; Do</p>
            <p className="text-[#665F53]">Google Quality Rater Framework</p>
          </div>
        </div>

        {/* Controls: Search, Intent Filter, and Export Tools */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 pt-2">
          {/* Intent Filters */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <span className="text-[#736B60] font-semibold uppercase tracking-wider mr-1 text-[11px]">Intent:</span>
            {['All', 'Know', 'Do', 'Compare', 'Go'].map((intent) => (
              <button
                key={intent}
                onClick={() => setSelectedIntent(intent)}
                className={`px-3 py-1.5 rounded font-medium transition-colors cursor-pointer ${
                  selectedIntent === intent
                    ? 'bg-[#1C1A18] text-[#FAF8F5]'
                    : 'bg-[#EDE7DC] text-[#4E473D] hover:bg-[#E2DBCF]'
                }`}
              >
                {intent}
              </button>
            ))}
          </div>

          {/* Search bar & Copy/Export buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative flex-1 sm:w-64">
              <input
                type="text"
                placeholder="Filter keywords, pages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-[#F5F0E6] border border-[#DDD5C7] rounded text-[#1C1A18] placeholder-[#8B8378] focus:outline-none focus:ring-1 focus:ring-[#8B6534]"
              />
              <Search className="w-3.5 h-3.5 text-[#8B8378] absolute left-2.5 top-1/2 -translate-y-1/2" />
            </div>

            <button
              onClick={handleCopyTable}
              className="px-3 py-1.5 bg-[#F0EBE0] hover:bg-[#E5DFD3] border border-[#DDD5C7] text-[#1C1A18] text-xs font-semibold rounded flex items-center space-x-1.5 cursor-pointer transition-colors"
              title="Copy table data as TSV for spreadsheet paste"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-700" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy Table'}</span>
            </button>

            <button
              onClick={handleDownloadCSV}
              className="px-3 py-1.5 bg-[#8B6534] hover:bg-[#725227] text-white text-xs font-semibold rounded flex items-center space-x-1.5 cursor-pointer transition-colors shadow-2xs"
              title="Download CSV for assignment submission"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* The Exact 6-Column Assignment Table */}
        <div className="overflow-x-auto rounded-lg border border-[#DDD6CA] bg-[#FAF8F5] shadow-xs">
          <table className="w-full text-left border-collapse text-xs">
            {/* Exactly: Page | Main keyword | 2 related keywords | Intent | Volume | Question it answers */}
            <thead className="bg-[#EFEAE0] text-[#1C1A18] uppercase tracking-wider text-[11px] font-bold border-b border-[#DDD6CA]">
              <tr>
                <th className="p-3.5 sm:p-4 min-w-[200px]">Page</th>
                <th className="p-3.5 sm:p-4 min-w-[170px]">Main keyword</th>
                <th className="p-3.5 sm:p-4 min-w-[200px]">2 related keywords</th>
                <th className="p-3.5 sm:p-4 min-w-[100px]">Intent</th>
                <th className="p-3.5 sm:p-4 min-w-[140px]">Volume</th>
                <th className="p-3.5 sm:p-4 min-w-[280px]">Question it answers</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAE4D8]">
              {filteredRows.map((row, idx) => {
                const isHome = row.pageUrl === '/';
                return (
                  <tr
                    key={idx}
                    onClick={() => handleRowClick(row.pageUrl)}
                    className="hover:bg-[#F2ECE1] transition-colors cursor-pointer group"
                  >
                    {/* Column 1: Page */}
                    <td className="p-3.5 sm:p-4 font-medium text-[#1C1A18] leading-snug">
                      <div className="flex items-start space-x-1.5">
                        <span className="text-[#8B6534] font-mono text-[11px] font-semibold shrink-0">
                          {idx === 0 && isHome ? 'HM' : String(idx).padStart(2, '0')}.
                        </span>
                        <div>
                          <span className="group-hover:text-[#8B6534] transition-colors font-semibold">
                            {row.pageName}
                          </span>
                          <span className="block text-[11px] font-mono text-[#7C756B] mt-0.5">
                            {row.pageUrl}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Column 2: Main keyword */}
                    <td className="p-3.5 sm:p-4 font-mono font-semibold text-[#8B6534] leading-snug">
                      &quot;{row.mainKeyword}&quot;
                    </td>

                    {/* Column 3: 2 related keywords */}
                    <td className="p-3.5 sm:p-4 text-[#474138] leading-snug">
                      <div className="space-y-1 font-mono text-[11px]">
                        <div>&bull; &quot;{row.relatedKeywords[0]}&quot;</div>
                        <div>&bull; &quot;{row.relatedKeywords[1]}&quot;</div>
                      </div>
                    </td>

                    {/* Column 4: Intent */}
                    <td className="p-3.5 sm:p-4">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-[11px] font-semibold uppercase tracking-wider ${
                          row.intent === 'Know'
                            ? 'bg-[#E0EBF7] text-[#1D4E89]'
                            : row.intent === 'Do'
                            ? 'bg-[#E3F2E6] text-[#226738]'
                            : row.intent === 'Compare'
                            ? 'bg-[#FDF0DB] text-[#8C5209]'
                            : 'bg-[#F4E3E3] text-[#932323]'
                        }`}
                      >
                        {row.intent}
                      </span>
                    </td>

                    {/* Column 5: Volume */}
                    <td className="p-3.5 sm:p-4 text-[#3D372F] font-medium font-mono text-[11px]">
                      {row.volume}
                    </td>

                    {/* Column 6: Question it answers */}
                    <td className="p-3.5 sm:p-4 text-[#3E382F] leading-snug italic font-['Newsreader'] text-sm">
                      &ldquo;{row.questionAnswered}&rdquo;
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Explanatory Assignment Notes (College Evaluation Defense) */}
        <section className="p-6 bg-[#F5F0E6] rounded-lg border border-[#DDD5C7] space-y-4">
          <div className="flex items-center space-x-2 text-xs uppercase tracking-wider font-bold text-[#8B6534]">
            <Info className="w-4 h-4" />
            <span>SEO &amp; AEO Methodology Rationale (Assignment Defense)</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-[#4F483E] leading-relaxed">
            <div className="space-y-2">
              <h3 className="font-bold text-[#1C1A18] text-sm">1. Search Intent Classification</h3>
              <p>
                Search intent is categorized according to Google&apos;s Search Quality Rater Guidelines:
              </p>
              <ul className="space-y-1 pl-4 list-disc marker:text-[#8B6534]">
                <li><strong>Know (Informational):</strong> Users seeking broad knowledge, philosophy, and principles (e.g., Capsule Wardrobe, Fit rules).</li>
                <li><strong>Do (Actionable / Practical):</strong> Users seeking an immediate step-by-step protocol (e.g., Morning skincare routine, college dressing swaps).</li>
                <li><strong>Compare (Commercial Investigation):</strong> Evaluating options across categories before deciding (e.g., Oxford vs. Derby vs. Chelsea shoes).</li>
                <li><strong>Go (Navigational):</strong> Directed toward specific websites (intentionally avoided for organic content pages).</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h3 className="font-bold text-[#1C1A18] text-sm">2. Search Volume Estimation &amp; AEO Alignment</h3>
              <p>
                All volumes are labeled as <em>estimates</em> based on aggregated historical keyword tools (Google Keyword Planner, Ahrefs, Semrush averages for global English queries).
              </p>
              <p>
                For Answer Engine Optimisation (AEO), each article features a <strong>Direct Answer Snippet</strong> located within the first 250 words that answers the exact natural-language query stated in Column 6, enabling AI Overviews to cite the content verbatim.
              </p>
            </div>
          </div>
        </section>

        {/* Direct Link to Homepage */}
        <div className="text-center pt-2">
          <button
            onClick={() => onNavigate('/')}
            className="inline-flex items-center space-x-2 px-6 py-2.5 bg-[#1C1A18] hover:bg-[#34302C] text-white text-xs font-semibold rounded transition-colors cursor-pointer"
          >
            <span>Explore All 10 Written Articles</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </>
  );
}
