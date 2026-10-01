import React, { useEffect, useState } from 'react';
import { CampusOpportunity, StudentProfile, ScoredOpportunity } from '../types';
import { generateWhyAttendInsight } from '../services/aiService';
import { 
  X, 
  Sparkles, 
  CheckCircle2, 
  Award, 
  FileText, 
  ArrowRight, 
  Compass, 
  Flame, 
  Users,
  Target
} from 'lucide-react';

interface WhyAttendModalProps {
  opportunity: CampusOpportunity | null;
  student: StudentProfile;
  onClose: () => void;
  onActionClick: () => void;
  score?: number;
}

export const WhyAttendModal: React.FC<WhyAttendModalProps> = ({
  opportunity,
  student,
  onClose,
  onActionClick,
  score = 92
}) => {
  const [loading, setLoading] = useState(true);
  const [insight, setInsight] = useState<{
    headline: string;
    whyMatters: string;
    whatYouLearn: string;
    resumeAdd: string;
    nextSteps: string;
  } | null>(null);

  useEffect(() => {
    if (!opportunity) return;
    setLoading(true);
    generateWhyAttendInsight(student, opportunity).then((res) => {
      setInsight(res);
      setLoading(false);
    });
  }, [opportunity, student]);

  if (!opportunity) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md select-none animate-in fade-in duration-200">
      <div className="bg-[#0C081A] border border-purple-500/30 glow-border-purple w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-purple-500/20 flex items-center justify-between bg-purple-950/20">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center text-white shadow-xs">
              <Sparkles className="w-4 h-4 text-cyan-300" />
            </div>
            <div>
              <div className="text-[11px] font-mono uppercase tracking-wider text-purple-400 font-bold">
                Cursed Technique Opportunity Diagnostic
              </div>
              <h2 className="text-lg font-bold text-white line-clamp-1">
                Why Attend: {opportunity.title}
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Top Score Banner */}
          <div className="p-4 rounded-xl bg-purple-900/20 border border-purple-500/30 flex items-center justify-between gap-4">
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-purple-400">
                Personalized Synergy Index
              </div>
              <div className="text-xl sm:text-2xl font-bold font-space text-white mt-0.5">
                {score}% Match to Your Student DNA
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Calibrated against {student.skills.slice(0, 2).map(s => s.name).join(' & ')} proficiency and your {student.careerGoal} goal.
              </p>
            </div>

            <div className="w-14 h-14 rounded-full bg-purple-600/30 border border-purple-400 flex items-center justify-center text-cyan-300 font-bold font-mono text-lg shrink-0 glow-cyan">
              {score}%
            </div>
          </div>

          {loading ? (
            <div className="py-12 flex flex-col items-center justify-center space-y-3">
              <Sparkles className="w-6 h-6 text-purple-400 animate-spin" />
              <p className="text-xs font-mono text-slate-400">
                Synthesizing student trajectory alignment with Gemini AI...
              </p>
            </div>
          ) : insight ? (
            <div className="space-y-4">
              {/* Headline */}
              <div className="p-3 bg-white/5 border border-purple-500/20 rounded-xl">
                <div className="text-xs font-mono uppercase text-cyan-400 font-bold flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-rose-400" />
                  <span>Strategic Advantage</span>
                </div>
                <div className="text-sm font-semibold text-slate-100 mt-1 leading-snug">
                  {insight.headline}
                </div>
              </div>

              {/* 1. Why It Matters */}
              <div className="space-y-1">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Target className="w-3.5 h-3.5 text-purple-400" />
                  <span>Why It Matters for Your Specific Profile</span>
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 bg-[#120D24] p-3 rounded-xl border border-white/5 leading-relaxed">
                  {insight.whyMatters}
                </p>
              </div>

              {/* 2. What You Will Learn */}
              <div className="space-y-1">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Skills & Cursed Techniques You Will Unlock</span>
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 bg-[#120D24] p-3 rounded-xl border border-white/5 leading-relaxed">
                  {insight.whatYouLearn}
                </p>
              </div>

              {/* 3. Resume Bullet Point */}
              <div className="space-y-1">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Verified Resume Bullet Point to Copy</span>
                </h4>
                <div className="p-3 bg-slate-950 rounded-xl border border-emerald-500/20 font-mono text-xs text-emerald-300 leading-relaxed">
                  • {insight.resumeAdd}
                </div>
              </div>
            </div>
          ) : null}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-purple-500/20 bg-purple-950/20 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white rounded-lg transition-colors"
          >
            Close
          </button>

          <button
            onClick={() => {
              onClose();
              onActionClick();
            }}
            className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 rounded-lg shadow-md glow-cursed transition-all"
          >
            <span>Confirm Campus Action</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
