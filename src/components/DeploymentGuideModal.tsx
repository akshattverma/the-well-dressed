import React, { useState } from 'react';
import { X, Check, Copy, ExternalLink, Terminal, GitBranch, Cloud, Sparkles } from 'lucide-react';

interface DeploymentGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DeploymentGuideModal({ isOpen, onClose }: DeploymentGuideModalProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  if (!isOpen) return null;

  const copyCommand = (cmd: string, index: number) => {
    navigator.clipboard.writeText(cmd);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const steps = [
    {
      num: "1",
      title: "Download or Export Your Codebase",
      badge: "Local Setup",
      description: "Ensure all project files are saved on your computer in a folder named `the-well-dressed-magazine`.",
      details: [
        "Your project is a clean, production-ready Vite + React + TypeScript project.",
        "Verify your folder contains `package.json`, `index.html`, `vite.config.ts`, `src/`, and `public/`."
      ]
    },
    {
      num: "2",
      title: "Create a Free GitHub Account & Repository",
      badge: "GitHub",
      description: "Sign in at GitHub.com and create a new repository to host your project.",
      details: [
        "Go to github.com and sign up for a free account (if you don't have one).",
        "Click the '+' icon in the top right corner and choose 'New repository'.",
        "Name your repository: `the-well-dressed-magazine`.",
        "Set the visibility to 'Public' so your professor can view it, and leave 'Add README' unchecked.",
        "Click 'Create repository'."
      ]
    },
    {
      num: "3",
      title: "Push Your Code to GitHub (Simple 4-Step Terminal Commands)",
      badge: "Git Commands",
      description: "Open your terminal or command prompt in your project folder and run these 4 commands:",
      commands: [
        { label: "Initialize Git", cmd: "git init" },
        { label: "Stage all files", cmd: "git add ." },
        { label: "Create initial commit", cmd: 'git commit -m "feat: complete The Well-Dressed SEO and AEO magazine website"' },
        { label: "Push to main branch", cmd: "git branch -M main\ngit remote add origin https://github.com/YOUR_GITHUB_USERNAME/the-well-dressed-magazine.git\ngit push -u origin main" }
      ]
    },
    {
      num: "4",
      title: "Deploy on Vercel with 1-Click Zero Config",
      badge: "Vercel Hosting",
      description: "Vercel automatically detects Vite and builds your website with a free worldwide HTTPS link.",
      details: [
        "Go to vercel.com and click 'Sign Up' -> select 'Continue with GitHub'.",
        "On your Vercel Dashboard, click 'Add New...' -> 'Project'.",
        "Find `the-well-dressed-magazine` under 'Import Git Repository' and click 'Import'.",
        "Framework Preset will automatically say 'Vite' (no settings to change!).",
        "Click the blue 'Deploy' button.",
        "Within 45 seconds, your live production website will be online with a custom URL like `https://the-well-dressed-magazine.vercel.app`!"
      ]
    },
    {
      num: "5",
      title: "Submit for Your College Assignment",
      badge: "Final Submission",
      description: "Copy your two links for your submission:",
      details: [
        "1. Live Website URL: `https://your-app.vercel.app` (includes Keyword Research page and 10 articles).",
        "2. GitHub Code Repository: `https://github.com/your-username/the-well-dressed-magazine`.",
        "3. Live sitemap test: `https://your-app.vercel.app/sitemap.xml`.",
        "4. Live robots test: `https://your-app.vercel.app/robots.txt`."
      ]
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-[#FAF8F5] border border-[#DDD6CA] rounded-lg shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-[#E3DBD0] flex items-center justify-between bg-[#F2EDE4]">
          <div className="flex items-center space-x-2.5">
            <div className="p-1.5 bg-[#8B6534] text-white rounded">
              <Cloud className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#1C1A18] font-['Newsreader']">
                Beginner Deployment Guide: GitHub &amp; Vercel
              </h2>
              <p className="text-xs text-[#736B60]">
                Zero-Coding-Experience Step-by-Step Instructions for College Submission
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#736B60] hover:text-[#1C1A18] rounded hover:bg-[#E4DDCF] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-[#38332C]">
          <div className="p-4 bg-[#EFE9DE] border border-[#DDD5C7] rounded flex items-start space-x-3">
            <Sparkles className="w-5 h-5 text-[#8B6534] shrink-0 mt-0.5" />
            <div className="text-xs text-[#4E473D] space-y-1">
              <p className="font-semibold text-[#1C1A18]">
                Good news: Your project is already 100% compatible with Vercel and GitHub!
              </p>
              <p>
                There are no complex server configurations required. Vercel automatically runs <code className="bg-[#E4DDCF] px-1 py-0.5 rounded">npm run build</code> and serves your fast static bundle with global CDN caching.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {steps.map((step, idx) => (
              <div key={idx} className="border border-[#E2DAD0] rounded-lg p-4 bg-[#F8F5EF] space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2.5">
                    <span className="w-6 h-6 rounded-full bg-[#1C1A18] text-white text-xs font-bold flex items-center justify-center font-mono">
                      {step.num}
                    </span>
                    <h3 className="font-bold text-[#1C1A18] text-sm">{step.title}</h3>
                  </div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#8B6534] bg-[#EAE3D6] px-2 py-0.5 rounded">
                    {step.badge}
                  </span>
                </div>

                <p className="text-xs text-[#5A544A]">{step.description}</p>

                {step.details && (
                  <ul className="text-xs text-[#474138] space-y-1.5 pl-4 list-disc marker:text-[#8B6534]">
                    {step.details.map((d, dIdx) => (
                      <li key={dIdx} className="leading-relaxed">{d}</li>
                    ))}
                  </ul>
                )}

                {step.commands && (
                  <div className="space-y-2 pt-2">
                    {step.commands.map((c, cIdx) => (
                      <div key={cIdx} className="space-y-1">
                        <div className="flex items-center justify-between text-[11px] text-[#736B60]">
                          <span>{c.label}:</span>
                          <button
                            onClick={() => copyCommand(c.cmd, cIdx)}
                            className="text-[#8B6534] hover:text-[#5E421E] font-semibold flex items-center space-x-1 cursor-pointer"
                          >
                            {copiedIndex === cIdx ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                            <span>{copiedIndex === cIdx ? 'Copied' : 'Copy'}</span>
                          </button>
                        </div>
                        <pre className="p-2.5 bg-[#1C1A18] text-[#ECE5D8] rounded text-xs font-mono overflow-x-auto whitespace-pre-wrap">
                          {c.cmd}
                        </pre>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#E3DBD0] bg-[#F2EDE4] flex justify-between items-center text-xs">
          <span className="text-[#736B60]">Free hosting · HTTPS included · Auto CI/CD</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#1C1A18] hover:bg-[#34302C] text-[#FAF8F5] text-xs font-semibold rounded transition-colors cursor-pointer"
          >
            Got It, Close Guide
          </button>
        </div>
      </div>
    </div>
  );
}
