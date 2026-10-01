import React from 'react';
import { ScoredOpportunity } from '../types';
import { X, CheckCircle, Percent, ArrowRight, Sparkles, Brain, Award, GraduationCap, Target, BookOpen } from 'lucide-react';

interface MatchBreakdownModalProps {
  scored: ScoredOpportunity | null;
  onClose: () => void;
  onActionClick: () => void;
}

export const MatchBreakdownModal: React.FC<MatchBreakdownModalProps> = ({
  scored,
  onClose,
  onActionClick
}) => {
  if (!scored) return null;

  const { opportunity: opp, breakdown } = scored;

  const scoreFactors = [
    {
      name: 'Skill Match',
      weight: '30%',
      score: breakdown.skillMatch,
      description: 'Overlap between student skill proficiencies and required technical competencies.',
      icon: Award
    },
    {
      name: 'Interest Match',
      weight: '25%',
      score: breakdown.interestMatch,
      description: 'Alignment with student campus extracurriculars and stated career domains.',
      icon: Target
    },
    {
      name: 'Career Goal Fit',
      weight: '20%',
      score: breakdown.careerMatch,
      description: 'Direct support for student career objectives (Internship, Placement, Higher Studies, Startup).',
      icon: Brain
    },
    {
      name: 'Academic Relevance',
      weight: '10%',
      score: breakdown.academicRelevance,
      description: 'Connection to enrolled department, coursework syllabus, and subject mastery areas.',
      icon: GraduationCap
    },
    {
      name: 'Experience / Level Fit',
      weight: '10%',
      score: breakdown.experienceFit,
      description: 'Calibrated for current academic year standing and prerequisite technical maturity.',
      icon: Percent
    },
    {
      name: 'Learning Preference',
      weight: '5%',
      score: breakdown.learningPreferenceFit,
      description: 'Harmony with preferred learning formats (practical projects, reading, workshops).',
      icon: BookOpen
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div 
        className="bg-white w-full max-w-2xl rounded-2xl border border-slate-200 shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-150 flex flex-col max-h-[90vh]"
      >
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/70">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-indigo-700">
              Transparent Matchmaking Engine
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 mt-0.5 line-clamp-1">
              Why this matches: {opp.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Hero Score Gauge */}
          <div className="flex items-center gap-5 p-4 rounded-xl bg-indigo-50/60 border border-indigo-100">
            <div className="w-16 h-16 rounded-full bg-indigo-600 text-white flex flex-col items-center justify-center shrink-0 shadow-sm font-mono">
              <span className="text-xl font-extrabold tabular-nums leading-none">
                {breakdown.overallScore}%
              </span>
              <span className="text-[10px] uppercase font-semibold text-indigo-200 mt-0.5">Match</span>
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Multi-Signal Compatibility Result
              </h3>
              <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                This is not a black-box AI number. It is calculated directly by comparing your verified Pair A profile signals against this campus node using our 6-factor university scoring model.
              </p>
            </div>
          </div>

          {/* Matched Verified Signals */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Verified Profile Signals Matched
            </h4>
            <div className="space-y-1.5">
              {breakdown.whyMatched.map((reason, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-slate-700 bg-slate-50 p-2 rounded-lg border border-slate-100">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="leading-snug">{reason}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Mathematical Weight Breakdown */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Scoring Factor Breakdown
              </h4>
              <span className="text-xs text-slate-400 font-mono">Weighted Total: 100%</span>
            </div>

            <div className="space-y-2.5">
              {scoreFactors.map((factor, idx) => (
                <div key={idx} className="p-2.5 rounded-lg border border-slate-100 hover:border-slate-200 bg-white">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-semibold text-slate-800 flex items-center gap-1.5">
                      <factor.icon className="w-3.5 h-3.5 text-indigo-600" />
                      {factor.name}
                      <span className="text-slate-400 font-normal">({factor.weight} weight)</span>
                    </span>
                    <span className="font-bold font-mono tabular-nums text-slate-900">
                      {factor.score}%
                    </span>
                  </div>

                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-indigo-600 rounded-full transition-all duration-500"
                      style={{ width: `${factor.score}%` }}
                    />
                  </div>

                  <p className="text-[11px] text-slate-500 mt-1 leading-tight">
                    {factor.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-200 rounded-lg transition-colors"
          >
            Close
          </button>

          <button
            onClick={() => {
              onClose();
              onActionClick();
            }}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors shadow-xs"
          >
            <span>{breakdown.recommendedAction}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
