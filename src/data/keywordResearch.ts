import { KeywordResearchRow } from '../types';

export const keywordResearchData: KeywordResearchRow[] = [
  // Row 1: Homepage
  {
    pageName: "Homepage",
    pageUrl: "/",
    mainKeyword: "mens fashion magazine",
    relatedKeywords: ["mens style tips", "lifestyle magazine for men"],
    intent: "Know",
    volume: "74,000/mo (Est.)",
    questionAnswered: "What are the foundational principles of modern men's fashion and lifestyle?",
    rationale: "Broad informational query targeting men seeking authoritative, curated guidance across style, grooming, wardrobe architecture, and footwear."
  },

  // Row 2: Article 1
  {
    pageName: "Men's Style Guide: How to Dress Better",
    pageUrl: "/article/mens-style-guide-how-to-dress-better",
    mainKeyword: "mens style guide",
    relatedKeywords: ["how to dress better men", "mens fashion tips"],
    intent: "Know",
    volume: "49,500/mo (Est.)",
    questionAnswered: "How do I learn to dress better as a man?",
    rationale: "High-volume informational search query where users seek a complete beginner-to-intermediate blueprint covering fit, color matching, and repeatable outfits."
  },

  // Row 3: Article 2
  {
    pageName: "Men's Capsule Wardrobe: A Beginner's Guide",
    pageUrl: "/article/mens-capsule-wardrobe-beginners-guide",
    mainKeyword: "mens capsule wardrobe",
    relatedKeywords: ["capsule wardrobe for men", "minimalist mens wardrobe"],
    intent: "Know",
    volume: "33,100/mo (Est.)",
    questionAnswered: "How do I build a minimalist capsule wardrobe for men?",
    rationale: "Focused informational query with strong intent to simplify closet clutter into interchangeable essentials and reduce decision fatigue."
  },

  // Row 4: Article 3
  {
    pageName: "Men's Grooming and Skincare Routine for Beginners",
    pageUrl: "/article/mens-grooming-skincare-routine-beginners",
    mainKeyword: "mens grooming routine",
    relatedKeywords: ["mens skincare routine beginners", "skincare tips for men"],
    intent: "Do",
    volume: "27,200/mo (Est.)",
    questionAnswered: "What is an effective beginner grooming and skincare routine for men?",
    rationale: "Action-oriented transactional/practical intent ('Do') seeking an actionable step-by-step daily skincare and beard care protocol."
  },

  // Row 5: Article 4
  {
    pageName: "How to Dress Smart-Casual as a College Student",
    pageUrl: "/article/how-to-dress-smart-casual-college-student",
    mainKeyword: "smart casual college student",
    relatedKeywords: ["college student outfit men", "how to dress well in college"],
    intent: "Do",
    volume: "18,400/mo (Est.)",
    questionAnswered: "How do I dress smart-casual as a male college student without looking overdressed?",
    rationale: "High-relevance demographic query from university students seeking practical outfit formulas to upgrade from sweatpants to mature campus wear."
  },

  // Row 6: Article 5
  {
    pageName: "How to Build a Timeless Men's Wardrobe on a Budget",
    pageUrl: "/article/build-timeless-mens-wardrobe-on-a-budget",
    mainKeyword: "mens wardrobe on a budget",
    relatedKeywords: ["affordable mens fashion", "budget stylish mens clothes"],
    intent: "Know",
    volume: "22,100/mo (Est.)",
    questionAnswered: "How do I build a stylish, long-lasting men's wardrobe on a budget?",
    rationale: "Value-seeking informational query addressing the economic realities of younger men, focusing on cost-per-wear and secondhand sourcing."
  },

  // Row 7: Article 6
  {
    pageName: "How to Find the Right Fit for Men's Clothes",
    pageUrl: "/article/how-to-find-right-fit-mens-clothes",
    mainKeyword: "right fit for mens clothes",
    relatedKeywords: ["how should mens clothes fit", "mens clothing fit guide"],
    intent: "Know",
    volume: "24,800/mo (Est.)",
    questionAnswered: "How should men's clothes fit properly across shirts, trousers, and blazers?",
    rationale: "Educational search intent targeting the single biggest pain point in men's style: understanding shoulder seams, torso drape, and pant breaks."
  },

  // Row 8: Article 7
  {
    pageName: "Best Men's Shoes for Every Occasion: A Style Guide",
    pageUrl: "/article/best-mens-shoes-every-occasion-style-guide",
    mainKeyword: "best mens shoes",
    relatedKeywords: ["mens footwear style guide", "essential shoes for men"],
    intent: "Compare",
    volume: "31,000/mo (Est.)",
    questionAnswered: "What are the essential shoes every man should own for different occasions?",
    rationale: "Commercial investigation and comparison intent ('Compare') evaluating the 5 foundational shoe categories, leather construction, and dress codes."
  },

  // Row 9: Article 8
  {
    pageName: "How to Style Men's Outfits for Winter",
    pageUrl: "/article/how-to-style-mens-outfits-for-winter",
    mainKeyword: "mens outfits for winter",
    relatedKeywords: ["winter fashion for men", "how to layer clothes men"],
    intent: "Know",
    volume: "38,200/mo (Est.)",
    questionAnswered: "How do I style men's outfits for winter weather using proper layering?",
    rationale: "Seasonal spike query seeking practical layering architecture (3-tier system), knitwear fabric selection, and overcoat styling."
  },

  // Row 10: Article 9
  {
    pageName: "Men's Hairstyle Guide: How to Choose a Style for Your Face Shape",
    pageUrl: "/article/mens-hairstyle-guide-face-shape",
    mainKeyword: "mens hairstyle guide face shape",
    relatedKeywords: ["haircuts for men face shape", "best hairstyles for men"],
    intent: "Know",
    volume: "40,500/mo (Est.)",
    questionAnswered: "How do I choose the best haircut for my specific face shape?",
    rationale: "High-volume visual query where men seek to measure facial geometry (oval, square, round, etc.) and identify complementary haircuts."
  },

  // Row 11: Article 10
  {
    pageName: "How to Build a Versatile Men's Wardrobe for College",
    pageUrl: "/article/versatile-mens-wardrobe-for-college",
    mainKeyword: "versatile mens wardrobe college",
    relatedKeywords: ["college wardrobe essentials men", "how to dress well in university"],
    intent: "Do",
    volume: "16,700/mo (Est.)",
    questionAnswered: "How do I build a versatile, low-maintenance men's wardrobe for university dorm life?",
    rationale: "Specific student-focused query solving small dorm storage limits, laundry wear-and-tear, and 7-day class outfit rotations."
  }
];

export const seoAssignmentSummary = {
  totalKeywordsTracked: 33,
  primaryKeywordsCount: 11,
  totalSearchVolumeSum: "374,500/mo (Aggregated Est.)",
  intentBreakdown: {
    Know: "7 pages (64%)",
    Do: "3 pages (27%)",
    Compare: "1 page (9%)",
    Go: "0 pages (Navigational queries directed off-site are avoided for internal educational content)"
  },
  aeoOptimizationStrategy: "Every page features a machine-readable Direct Answer Snippet (TL;DR block) placed within the first 250 words to capture Google AI Overviews and Perplexity search answers, supported by structured FAQPage JSON-LD and clean H2/H3 question hierarchies."
};
