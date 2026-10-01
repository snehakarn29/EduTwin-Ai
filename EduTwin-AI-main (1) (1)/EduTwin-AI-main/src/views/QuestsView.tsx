import React from 'react';
import { QuestStep, StudentProfile } from '../types';
import confetti from 'canvas-confetti';
import { 
  Award, 
  CheckCircle2, 
  Clock, 
  Lock, 
  Sparkles, 
  Flame, 
  Zap, 
  ArrowRight,
  ShieldAlert
} from 'lucide-react';

interface QuestsViewProps {
  student: StudentProfile;
  onCompleteQuestStep: (questId: string, xpReward: number) => void;
  onTriggerDomainExpansion: () => void;
}

export const QuestsView: React.FC<QuestsViewProps> = ({
  student,
  onCompleteQuestStep,
  onTriggerDomainExpansion
}) => {
  const handleClaim = (quest: QuestStep) => {
    confetti({
      particleCount: 70,
      spread: 90,
      origin: { y: 0.65 },
      colors: ['#A855F7', '#22D3EE', '#F43F5E', '#10B981']
    });
    onCompleteQuestStep(quest.id, quest.xpReward);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-purple-500/20 pb-4 gap-4">
        <div>
          <div className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5" />
            <span>Sorcerer Grade Progression Arc</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-space text-white mt-0.5">
            Campus Quests & Milestone Tree
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            Advance from Grade 4 Sorcerer to Special Grade through real-world software milestones, hackathon tournaments, and research publications.
          </p>
        </div>

        {/* Current Grade Badge */}
        <div className="p-3 bg-purple-950/60 border border-purple-500/40 rounded-xl flex items-center gap-3 shrink-0 glow-border-purple">
          <div className="w-10 h-10 rounded-lg bg-purple-600 flex items-center justify-center text-white font-bold font-mono text-sm glow-cursed">
            Lv.{student.level}
          </div>
          <div>
            <div className="text-[11px] font-mono text-slate-400 uppercase">Current Standing</div>
            <div className="text-sm font-bold font-space text-cyan-300">{student.sorcererGrade}</div>
          </div>
        </div>
      </div>

      {/* Quest Tree */}
      <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-3 sm:before:left-4 before:top-4 before:bottom-4 before:w-0.5 before:bg-purple-900/50">
        {student.quests.map((quest, idx) => {
          const isCompleted = quest.status === 'completed';
          const isInProgress = quest.status === 'in_progress';
          const isLocked = quest.status === 'locked';

          return (
            <div
              key={quest.id}
              className={`relative rounded-2xl border p-6 transition-all duration-300 ${
                isCompleted
                  ? 'bg-[#0C081A]/80 border-emerald-500/30'
                  : isInProgress
                  ? 'bg-gradient-to-r from-[#0C081A] via-[#150F2E] to-[#0C081A] border-purple-400/50 glow-border-purple shadow-xl'
                  : 'bg-slate-950/40 border-slate-800/80 opacity-70'
              }`}
            >
              {/* Dot on Timeline */}
              <div
                className={`absolute -left-[30px] sm:-left-[38px] top-6 w-5 h-5 rounded-full border-2 flex items-center justify-center font-mono text-[10px] font-bold ${
                  isCompleted
                    ? 'border-emerald-400 bg-emerald-950 text-emerald-300'
                    : isInProgress
                    ? 'border-cyan-400 bg-cyan-950 text-cyan-300 animate-pulse'
                    : 'border-slate-700 bg-slate-900 text-slate-500'
                }`}
              >
                {idx + 1}
              </div>

              {/* Quest Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-purple-400 uppercase tracking-wider">
                    {quest.gradeTier}
                  </span>
                  <span aria-hidden="true" className="text-slate-600">·</span>
                  <span className="text-xs font-mono text-cyan-300 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/30">
                    Badge: {quest.badgeName}
                  </span>
                </div>

                <div className="flex items-center gap-2 font-mono text-xs">
                  <span className="text-purple-300 bg-purple-950/60 px-2.5 py-0.5 rounded border border-purple-500/30 font-bold">
                    +{quest.xpReward} XP
                  </span>

                  {isCompleted && (
                    <span className="text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      Completed
                    </span>
                  )}
                  {isInProgress && (
                    <span className="text-cyan-300 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/30 font-semibold flex items-center gap-1">
                      <Clock className="w-3 h-3 animate-spin" />
                      In Progress
                    </span>
                  )}
                  {isLocked && (
                    <span className="text-slate-500 bg-slate-900 px-2 py-0.5 rounded flex items-center gap-1">
                      <Lock className="w-3 h-3" />
                      Locked
                    </span>
                  )}
                </div>
              </div>

              {/* Title & Description */}
              <div className="mt-2.5 space-y-1">
                <h3 className="text-lg font-bold font-space text-white leading-snug">
                  {quest.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {quest.description}
                </p>
              </div>

              {/* Requirements */}
              <div className="mt-4 pt-3 border-t border-purple-500/10 space-y-2">
                <div className="text-[11px] font-mono uppercase text-slate-400 font-semibold">
                  Required Criteria:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {quest.requirements.map((req, rIdx) => (
                    <div key={rIdx} className="text-xs text-slate-300 bg-slate-950/60 p-2 rounded-lg border border-purple-500/10 flex items-center gap-2">
                      <span className={`w-1.5 h-1.5 rounded-full ${isCompleted ? 'bg-emerald-400' : 'bg-cyan-400'}`} />
                      <span className="line-clamp-1">{req}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              {isInProgress && (
                <div className="mt-4 pt-3 border-t border-purple-500/10 flex items-center justify-between">
                  <span className="text-xs text-slate-400">
                    Finished this quest? Claim your reward to rank up.
                  </span>

                  <button
                    onClick={() => handleClaim(quest)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 rounded-xl shadow-md transition-all active:scale-98"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Complete Step & Claim +{quest.xpReward} XP</span>
                  </button>
                </div>
              )}

              {/* Special Grade Quest trigger */}
              {idx === student.quests.length - 1 && isCompleted && (
                <div className="mt-4 pt-3 border-t border-purple-500/10 flex justify-end">
                  <button
                    onClick={onTriggerDomainExpansion}
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-extrabold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 rounded-xl shadow-lg glow-cursed"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>領域展開 — Initiate Final Domain Expansion</span>
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
