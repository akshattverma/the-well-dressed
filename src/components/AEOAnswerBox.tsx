import React from 'react';
import { Sparkles, CheckCircle2 } from 'lucide-react';

interface AEOAnswerBoxProps {
  question: string;
  directAnswer: string;
  keyPoints?: string[];
  targetKeyword?: string;
}

export function AEOAnswerBox({
  question,
  directAnswer,
  keyPoints,
  targetKeyword
}: AEOAnswerBoxProps) {
  return (
    <section
      aria-label="Direct Answer Summary"
      className="my-8 p-6 sm:p-7 bg-[#F4EFE6] border-l-4 border-[#8B6534] border-y border-r border-[#E2DAD0] rounded-r shadow-xs"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2 text-xs uppercase tracking-wider font-semibold text-[#8B6534]">
          <Sparkles className="w-4 h-4 text-[#8B6534]" />
          <span>AEO Direct Answer Summary · Key Takeaway</span>
        </div>
        {targetKeyword && (
          <span className="text-[11px] font-mono text-[#736B60] bg-[#EAE4D8] px-2 py-0.5 rounded">
            Target: &quot;{targetKeyword}&quot;
          </span>
        )}
      </div>

      <h3 className="font-['Newsreader'] text-xl sm:text-2xl font-bold text-[#1C1A18] mb-3 leading-snug">
        {question}
      </h3>

      <p className="text-sm sm:text-base text-[#2E2B27] leading-relaxed font-normal mb-4">
        {directAnswer}
      </p>

      {keyPoints && keyPoints.length > 0 && (
        <div className="pt-3 border-t border-[#E3DBD0] space-y-2">
          <p className="text-xs uppercase tracking-wider font-semibold text-[#5A544A]">
            Core Principles at a Glance:
          </p>
          <ul className="space-y-1.5 text-xs sm:text-sm text-[#474138]">
            {keyPoints.map((point, index) => (
              <li key={index} className="flex items-start space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#8B6534] shrink-0 mt-0.5" />
                <span className="leading-snug">{point}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
