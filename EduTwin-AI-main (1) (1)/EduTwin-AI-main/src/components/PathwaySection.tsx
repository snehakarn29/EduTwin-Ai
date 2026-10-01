import React from 'react';
import { CampusPathway, PathwayStep } from '../types';
import { 
  GitMerge, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  Sparkles, 
  Compass, 
  ExternalLink,
  Milestone
} from 'lucide-react';

interface PathwaySectionProps {
  pathway: CampusPathway;
  onNavigateOpportunity?: (oppId: string) => void;
}

export const PathwaySection: React.FC<PathwaySectionProps> = ({
  pathway,
  onNavigateOpportunity
}) => {
  const getStatusBadge = (status: PathwayStep['status']) => {
    switch (status) {
      case 'Completed':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            Completed
          </span>
        );
      case 'In Progress':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-200">
            <Clock className="w-3 h-3 text-indigo-600 animate-spin" />
            In Progress
          </span>
        );
      case 'Next Up':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
            <Milestone className="w-3 h-3 text-amber-600" />
            Next Recommended Milestone
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
            Future Horizon
          </span>
        );
    }
  };

  return (
    <section className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-slate-200 pb-4 gap-2">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-700 uppercase tracking-wider mb-1">
            <GitMerge className="w-3.5 h-3.5" />
            <span>Curated Campus Trajectory</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
            {pathway.pathwayTitle}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-0.5 max-w-3xl leading-relaxed">
            {pathway.description}
          </p>
        </div>

        <div className="text-xs font-mono text-slate-500 bg-slate-100 px-3 py-1.5 rounded-lg shrink-0">
          Estimated Duration: <span className="font-semibold text-slate-800">{pathway.estimatedDuration}</span>
        </div>
      </div>

      {/* Pathway Timeline / Sequential Steps */}
      <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-3 sm:before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
        {pathway.steps.map((step) => {
          const isNextUp = step.status === 'Next Up';
          const isInProgress = step.status === 'In Progress';
          const isCompleted = step.status === 'Completed';

          return (
            <div
              key={step.stepNumber}
              className={`relative bg-white rounded-xl border p-5 transition-all duration-200 ${
                isNextUp
                  ? 'border-indigo-400 shadow-md ring-2 ring-indigo-100'
                  : 'border-slate-200 hover:border-slate-300 shadow-2xs'
              }`}
            >
              {/* Timeline Indicator Dot */}
              <div
                className={`absolute -left-[30px] sm:-left-[38px] top-6 w-5 h-5 rounded-full border-2 bg-white flex items-center justify-center text-[10px] font-bold font-mono ${
                  isCompleted
                    ? 'border-emerald-600 text-emerald-600'
                    : isInProgress
                    ? 'border-indigo-600 text-indigo-600 bg-indigo-50'
                    : isNextUp
                    ? 'border-amber-500 text-amber-600 bg-amber-50'
                    : 'border-slate-300 text-slate-400'
                }`}
              >
                {step.stepNumber}
              </div>

              {/* Step Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Stage {step.stepNumber}: {step.stageName}
                  </span>
                  <span aria-hidden="true" className="text-slate-300">·</span>
                  <span className="text-xs font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                    {step.category}
                  </span>
                </div>

                <div>{getStatusBadge(step.status)}</div>
              </div>

              {/* Step Title & Description */}
              <div className="mt-2">
                <h3 className="text-base font-bold text-slate-900 leading-snug">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Reinforced Skills & Opportunity Link */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500">
                  <span className="font-semibold text-slate-700">Skills Reinforced:</span>
                  {step.skillsReinforced.map((skill, sIdx) => (
                    <span key={sIdx} className="font-medium text-indigo-900 bg-indigo-50/80 px-2 py-0.5 rounded text-[11px]">
                      {skill}
                    </span>
                  ))}
                </div>

                {step.linkedOpportunityId && onNavigateOpportunity && (
                  <button
                    onClick={() => onNavigateOpportunity(step.linkedOpportunityId!)}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition-colors self-start sm:self-auto"
                  >
                    <span>View Connected Campus Node</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
