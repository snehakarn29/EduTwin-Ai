import React, { useState } from 'react';
import { StudentProfile, DomainCategory } from '../types';
import { 
  Sparkles, 
  BrainCircuit, 
  Code2, 
  Rocket, 
  Microscope, 
  BarChart3, 
  ShieldAlert, 
  Cloud, 
  Palette,
  CheckCircle2,
  RefreshCw,
  Compass,
  History,
  GraduationCap
} from 'lucide-react';

interface HeroDomainBannerProps {
  student: StudentProfile;
  domainInfo: {
    domain: DomainCategory;
    confidence: number;
    signals: string[];
    explanation: string;
  };
  onEditProfile: () => void;
  onExploreDomains: () => void;
  onViewEvolution: () => void;
  onRunDiscoveryAnimation: () => void;
  isAnalyzing: boolean;
}

const DOMAIN_THEMES: Record<DomainCategory, {
  accentBg: string;
  borderClass: string;
  badgeBg: string;
  badgeText: string;
  icon: React.ComponentType<{ className?: string }>;
  tagline: string;
}> = {
  'AI & Machine Learning': {
    accentBg: 'bg-indigo-50/60',
    borderClass: 'border-indigo-100',
    badgeBg: 'bg-indigo-600',
    badgeText: 'text-indigo-600',
    icon: BrainCircuit,
    tagline: 'Autonomous Systems, Neural Architecture & Machine Perception'
  },
  'Software Development': {
    accentBg: 'bg-emerald-50/60',
    borderClass: 'border-emerald-100',
    badgeBg: 'bg-emerald-600',
    badgeText: 'text-emerald-700',
    icon: Code2,
    tagline: 'Distributed Architecture, High-Concurrency Backend & Competitive Coding'
  },
  'Entrepreneurship & Innovation': {
    accentBg: 'bg-amber-50/60',
    borderClass: 'border-amber-100',
    badgeBg: 'bg-amber-600',
    badgeText: 'text-amber-700',
    icon: Rocket,
    tagline: 'Venture Incubation, Product-Market Discovery & Seed Pitch Strategy'
  },
  'Academic & Scientific Research': {
    accentBg: 'bg-blue-50/60',
    borderClass: 'border-blue-100',
    badgeBg: 'bg-blue-600',
    badgeText: 'text-blue-700',
    icon: Microscope,
    tagline: 'Peer-Reviewed Publishing, Mathematical Proofs & Graduate Fellowship'
  },
  'Data Science & Analytics': {
    accentBg: 'bg-cyan-50/60',
    borderClass: 'border-cyan-100',
    badgeBg: 'bg-cyan-600',
    badgeText: 'text-cyan-700',
    icon: BarChart3,
    tagline: 'Statistical Inference, Data Engineering & Predictive Modeling'
  },
  'Cybersecurity & Networks': {
    accentBg: 'bg-rose-50/60',
    borderClass: 'border-rose-100',
    badgeBg: 'bg-rose-600',
    badgeText: 'text-rose-700',
    icon: ShieldAlert,
    tagline: 'Security Auditing, Zero-Trust Architecture & Threat Intelligence'
  },
  'Cloud & Distributed Systems': {
    accentBg: 'bg-sky-50/60',
    borderClass: 'border-sky-100',
    badgeBg: 'bg-sky-600',
    badgeText: 'text-sky-700',
    icon: Cloud,
    tagline: 'Kubernetes Orchestration, Microservices & Infrastructure as Code'
  },
  'UI/UX & Product Design': {
    accentBg: 'bg-fuchsia-50/60',
    borderClass: 'border-fuchsia-100',
    badgeBg: 'bg-fuchsia-600',
    badgeText: 'text-fuchsia-700',
    icon: Palette,
    tagline: 'Design Systems, Human-Computer Interaction & Rapid Wireframing'
  }
};

export const HeroDomainBanner: React.FC<HeroDomainBannerProps> = ({
  student,
  domainInfo,
  onEditProfile,
  onExploreDomains,
  onViewEvolution,
  onRunDiscoveryAnimation,
  isAnalyzing
}) => {
  const theme = DOMAIN_THEMES[domainInfo.domain] || DOMAIN_THEMES['AI & Machine Learning'];
  const DomainIcon = theme.icon;

  return (
    <section className={`relative overflow-hidden rounded-2xl border ${theme.borderClass} ${theme.accentBg} p-6 sm:p-8 transition-colors duration-300`}>
      {/* Background Subtle Gradient Mesh */}
      <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 rounded-full bg-white/40 blur-3xl pointer-events-none" />
      
      <div className="relative z-10 max-w-5xl">
        {/* Top Kicker - Unboxed Metadata */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-500 mb-3">
          <span className="font-semibold text-slate-800 tracking-wide uppercase">My Campus Domain</span>
          <span aria-hidden="true">·</span>
          <span>{student.academic.university}</span>
          <span aria-hidden="true">·</span>
          <span>{student.academic.department}</span>
          <span aria-hidden="true">·</span>
          <span>{student.academic.yearSemester}</span>
        </div>

        {/* Main Headline & Domain Identifier */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-semibold px-2.5 py-1 rounded-md bg-white/90 border border-slate-200/80 text-slate-700 shadow-2xs">
              <DomainIcon className={`w-4 h-4 ${theme.badgeText}`} />
              <span>Current Personalized Domain</span>
            </div>
            
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 text-balance">
              {domainInfo.domain}
            </h1>
            
            <p className="text-sm sm:text-base text-slate-600 max-w-2xl font-normal leading-relaxed">
              {theme.tagline}
            </p>
          </div>

          {/* Domain Confidence Card */}
          <div className="flex items-center gap-4 bg-white/90 backdrop-blur-xs border border-slate-200/80 rounded-xl p-4 sm:p-5 shadow-xs shrink-0 min-w-[240px]">
            {/* Circular Progress Ring */}
            <div className="relative w-16 h-16 flex items-center justify-center shrink-0">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-slate-100"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className={`${theme.badgeText} transition-all duration-1000 ease-out`}
                  strokeDasharray={`${domainInfo.confidence}, 100`}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute text-center">
                <span className="text-base font-extrabold text-slate-900 font-mono tabular-nums">
                  {domainInfo.confidence}%
                </span>
              </div>
            </div>

            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Match Confidence
              </div>
              <div className="text-xs text-slate-600 mt-0.5 leading-snug">
                {domainInfo.confidence}% of active student DNA signals point directly to this domain.
              </div>
            </div>
          </div>
        </div>

        {/* Student DNA Signal Ribbon */}
        <div className="mt-6 pt-5 border-t border-slate-200/60">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-y-1 gap-x-2 text-xs text-slate-600">
              <span className="font-semibold text-slate-700">Matched DNA Signals:</span>
              {domainInfo.signals.map((signal, idx) => (
                <React.Fragment key={idx}>
                  <span className="inline-flex items-center gap-1 font-medium text-slate-800 bg-white/70 px-2 py-0.5 rounded border border-slate-200/60">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    {signal}
                  </span>
                  {idx < domainInfo.signals.length - 1 && <span className="text-slate-300">·</span>}
                </React.Fragment>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={onRunDiscoveryAnimation}
                disabled={isAnalyzing}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-xs transition-all active:scale-98 disabled:opacity-75"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isAnalyzing ? 'animate-spin' : ''}`} />
                <span>{isAnalyzing ? 'Analyzing DNA...' : 'Rediscover Domain'}</span>
              </button>

              <button
                onClick={onExploreDomains}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg shadow-2xs transition-colors"
              >
                <Compass className="w-3.5 h-3.5 text-slate-500" />
                <span>Explore Other Domains</span>
              </button>

              <button
                onClick={onViewEvolution}
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-white/60 rounded-lg transition-colors"
                title="View Domain Evolution Log"
              >
                <History className="w-3.5 h-3.5 text-slate-500" />
                <span className="hidden sm:inline">Evolution</span>
              </button>
            </div>
          </div>
        </div>

        {/* Discovery Animation Banner (When triggered) */}
        {isAnalyzing && (
          <div className="mt-4 p-3 bg-white/95 rounded-xl border border-indigo-200 shadow-xs flex items-center gap-3 animate-pulse">
            <Sparkles className="w-4 h-4 text-indigo-600 animate-spin" />
            <div className="text-xs font-medium text-slate-700">
              Synthesizing Student DNA: Analyzing course performance, skill proficiencies, career aspirations, and extracurricular signals against 30+ campus nodes...
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
