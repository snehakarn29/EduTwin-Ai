import React from 'react';
import { CampusOpportunity, ScoredOpportunity } from '../types';
import { X, CheckCircle2, Calendar, MapPin, ExternalLink, Bookmark, Clock, ArrowRight } from 'lucide-react';

interface ActionFeedbackModalProps {
  opportunity: CampusOpportunity | null;
  onClose: () => void;
  onConfirmAction: (oppId: string, actionType: string) => void;
  isSaved: boolean;
  onToggleSave: (oppId: string) => void;
}

export const ActionFeedbackModal: React.FC<ActionFeedbackModalProps> = ({
  opportunity,
  onClose,
  onConfirmAction,
  isSaved,
  onToggleSave
}) => {
  if (!opportunity) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white w-full max-w-lg rounded-2xl border border-slate-200 shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-150 flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/70">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-indigo-700">
              Campus Action Center
            </span>
            <h2 className="text-lg font-bold text-slate-900 mt-0.5">
              Next Step: {opportunity.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {opportunity.fullDescription}
          </p>

          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-xs">
            <div className="flex items-center gap-2 text-slate-700">
              <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
              <span>Location: <strong className="text-slate-900">{opportunity.location}</strong></span>
            </div>
            <div className="flex items-center gap-2 text-slate-700">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Organizer: <strong className="text-slate-900">{opportunity.organizer}</strong></span>
            </div>
          </div>

          <div className="p-3 bg-indigo-50/70 border border-indigo-100 rounded-xl text-xs text-indigo-900 space-y-1">
            <div className="font-semibold">Recommended Preparation:</div>
            <div className="text-indigo-800 leading-snug">
              Review your Pair A DNA skills ({opportunity.relevantSkills.slice(0, 3).join(', ')}) before engaging to maximize your application strength.
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between gap-3">
          <button
            onClick={() => onToggleSave(opportunity.id)}
            className={`px-3 py-2 text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5 ${
              isSaved
                ? 'bg-indigo-100 text-indigo-700'
                : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>{isSaved ? 'Saved in DNA' : 'Save for Later'}</span>
          </button>

          <button
            onClick={() => {
              onConfirmAction(opportunity.id, 'enrolled');
              onClose();
            }}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-xs transition-colors"
          >
            <span>Confirm Campus Action</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
