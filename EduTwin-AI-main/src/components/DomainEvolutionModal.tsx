import React from 'react';
import { StudentProfile } from '../types';
import { X, History, Sparkles, TrendingUp, ArrowRight, CheckCircle2 } from 'lucide-react';

interface DomainEvolutionModalProps {
  isOpen: boolean;
  onClose: () => void;
  student: StudentProfile;
  onSimulateEvolution: (eventType: 'ai_course' | 'startup_pitch' | 'dsa_sprint') => void;
}

export const DomainEvolutionModal: React.FC<DomainEvolutionModalProps> = ({
  isOpen,
  onClose,
  student,
  onSimulateEvolution
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white w-full max-w-2xl rounded-2xl border border-slate-200 shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-150 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/70">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-indigo-700 flex items-center gap-1.5">
              <History className="w-3.5 h-3.5" />
              <span>Adaptive Domain Engine</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 mt-0.5">
              Domain Evolution History
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Explanation Banner */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 leading-relaxed space-y-2">
            <div className="font-semibold text-slate-800 text-sm flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-indigo-600" />
              <span>How Your Domain Adapts Over Time</span>
            </div>
            <p>
              Your campus domain is dynamic. As you complete coursework, win hackathons, participate in clubs, or shift your career ambitions, EduTwin AI re-evaluates your trajectory and smoothly recalibrates your campus ecosystem recommendations.
            </p>
          </div>

          {/* Evolution Timeline */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Recorded Trajectory Milestones
            </h3>

            {student.evolutionHistory.length === 0 ? (
              <p className="text-xs text-slate-500 italic p-3 bg-slate-50 rounded-lg">
                No recent domain transitions recorded yet. Engage with opportunities or update skills to evolve your domain.
              </p>
            ) : (
              <div className="space-y-3">
                {student.evolutionHistory.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl border border-slate-200 bg-white space-y-2 shadow-2xs"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-mono text-slate-400">{item.timestamp}</span>
                      <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        Domain Recalibrated
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-800">
                      <span className="text-slate-500 line-through font-normal">{item.previousDomain}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-indigo-600" />
                      <span className="text-indigo-700 font-bold">{item.newDomain}</span>
                    </div>

                    <p className="text-xs text-slate-600 leading-snug">
                      "{item.reason}"
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Interactive Simulation Trigger for Judges */}
          <div className="space-y-3 pt-4 border-t border-slate-200">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center justify-between">
              <span>Simulate Student Activity Shift</span>
              <span className="text-[11px] text-indigo-600 font-normal">Test Live Adaptation</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <button
                onClick={() => onSimulateEvolution('ai_course')}
                className="p-2.5 rounded-lg border border-slate-200 hover:border-indigo-400 hover:bg-indigo-50/50 text-left transition-all"
              >
                <div className="font-semibold text-xs text-slate-900">+ Advanced AI Lab</div>
                <div className="text-[10px] text-slate-500 mt-0.5">Spikes deep learning signals</div>
              </button>

              <button
                onClick={() => onSimulateEvolution('startup_pitch')}
                className="p-2.5 rounded-lg border border-slate-200 hover:border-amber-400 hover:bg-amber-50/50 text-left transition-all"
              >
                <div className="font-semibold text-xs text-slate-900">+ Pitch Competition</div>
                <div className="text-[10px] text-slate-500 mt-0.5">Spikes venture & product signals</div>
              </button>

              <button
                onClick={() => onSimulateEvolution('dsa_sprint')}
                className="p-2.5 rounded-lg border border-slate-200 hover:border-emerald-400 hover:bg-emerald-50/50 text-left transition-all"
              >
                <div className="font-semibold text-xs text-slate-900">+ Algorithms Sprint</div>
                <div className="text-[10px] text-slate-500 mt-0.5">Spikes SWE & systems signals</div>
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 rounded-lg"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
