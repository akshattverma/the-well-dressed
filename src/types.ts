export type Category = 'Style' | 'Wardrobe' | 'Grooming' | 'Footwear';

export interface Author {
  name: string;
  role: string;
  avatar: string;
  bio: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface TableRow {
  [key: string]: string;
}

export interface ContentSection {
  id: string;
  heading: string;
  level: 2 | 3;
  leadParagraph?: string;
  paragraphs: string[];
  keyTakeaways?: string[];
  listItems?: { title: string; description: string }[];
  quote?: { text: string; author: string };
  comparisonTable?: {
    headers: string[];
    rows: string[][];
  };
  proTip?: string;
  internalLinkPrompt?: {
    text: string;
    targetSlug: string;
    anchorText: string;
  };
}

export interface Article {
  id: number;
  slug: string;
  title: string;
  seoTitle: string;
  metaDescription: string;
  category: Category;
  author: Author;
  publishDate: string;
  updatedDate: string;
  readTime: string;
  wordCount: number;
  heroImage: string;
  heroImageAlt: string;
  summary: string;
  aeoQuickAnswer: {
    question: string;
    directAnswer: string;
    keyPoints: string[];
  };
  tableOfContents: { id: string; title: string }[];
  sections: ContentSection[];
  conclusion: {
    heading: string;
    summary: string;
    actionableChecklist: string[];
  };
  faqs: FAQItem[];
  relatedArticleSlugs: string[];
  targetKeywords: {
    primary: string;
    secondary: [string, string];
    searchIntent: 'Know' | 'Go' | 'Compare' | 'Do';
    monthlyVolumeEstimate: string;
    targetQuestion: string;
  };
}

export interface KeywordResearchRow {
  pageName: string;
  pageUrl: string;
  mainKeyword: string;
  relatedKeywords: [string, string];
  intent: 'Know' | 'Go' | 'Compare' | 'Do';
  volume: string;
  questionAnswered: string;
  rationale: string;
}
