import React from 'react';
import { FacilityOpportunity, ScoredOpportunity } from '../types';
import { 
  Cpu, 
  CheckCircle, 
  ArrowRight, 
  Bookmark, 
  Clock, 
  MapPin, 
  ShieldCheck, 
  Wrench,
  Navigation,
  Compass,
  Edit3,
  Plus,
  Info
} from 'lucide-react';

interface FacilitiesSectionProps {
  facilities: ScoredOpportunity[];
  savedItemIds: string[];
  interestedItemIds: string[];
  onToggleSave: (id: string) => void;
  onToggleInterested: (id: string) => void;
  onOpenBreakdown: (scored: ScoredOpportunity) => void;
  onReserveFacility: (facility: FacilityOpportunity) => void;
  onNavigate: (facility: FacilityOpportunity) => void;
  onEditFacility?: (facility: FacilityOpportunity) => void;
  onAddNewFacility?: () => void;
}

export const FacilitiesSection: React.FC<FacilitiesSectionProps> = ({
  facilities,
  savedItemIds,
  interestedItemIds,
  onToggleSave,
  onToggleInterested,
  onOpenBreakdown,
  onReserveFacility,
  onNavigate,
  onEditFacility,
  onAddNewFacility
}) => {
  return (
    <section className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-slate-200 pb-3 gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
            <span>Facilities For Your Domain</span>
            <span className="text-xs font-normal text-slate-500">Resources you can use</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
            GPU computing clusters, rapid prototyping suites, and specialized hardware facilities aligned with your stack.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-xs text-slate-500 font-mono tabular-nums">
            {facilities.length} Facilities Available
          </div>

          {onAddNewFacility && (
            <button
              onClick={onAddNewFacility}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-xs transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Facility</span>
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {facilities.map((scored) => {
          const fac = scored.opportunity as FacilityOpportunity;
          const { breakdown } = scored;
          const isSaved = savedItemIds.includes(fac.id);

          return (
            <div
              key={fac.id}
              className="bg-white rounded-xl border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all duration-200 flex flex-col justify-between overflow-hidden group"
            >
              <div>
                {/* Visual Image Header */}
                <div className="relative h-44 w-full overflow-hidden bg-slate-100">
                  {fac.imageUrl ? (
                    <img
                      src={fac.imageUrl}
                      alt={fac.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-indigo-50 text-indigo-400">
                      <Cpu className="w-12 h-12" />
                    </div>
                  )}

                  <div className="absolute top-2.5 inset-x-2.5 flex items-center justify-between pointer-events-none">
                    <span className="text-[11px] font-semibold text-white bg-slate-900/80 backdrop-blur-xs px-2.5 py-0.5 rounded-md pointer-events-auto">
                      {fac.facilityType}
                    </span>

                    <button
                      onClick={() => onOpenBreakdown(scored)}
                      className="px-2.5 py-0.5 rounded-full bg-white text-indigo-700 font-bold font-mono text-xs tabular-nums shadow-xs hover:bg-slate-100 transition-colors pointer-events-auto flex items-center gap-1"
                    >
                      <span>{breakdown.overallScore}% Relevant</span>
                      <Info className="w-3 h-3 text-indigo-500" />
                    </button>
                  </div>

                  <button
                    onClick={() => onNavigate(fac)}
                    className="absolute bottom-2.5 right-2.5 inline-flex items-center gap-1 text-[11px] font-semibold text-white bg-indigo-600/90 hover:bg-indigo-600 px-2 py-1 rounded-md backdrop-blur-xs shadow-xs transition-colors"
                  >
                    <Navigation className="w-3 h-3" />
                    <span>Lab Location</span>
                  </button>
                </div>

                <div className="p-5">
                  <div className="flex items-center justify-between text-xs text-slate-500 font-medium mb-1">
                    <span>{fac.roomNumber}</span>

                    {onEditFacility && (
                      <button
                        onClick={() => onEditFacility(fac)}
                        className="text-slate-400 hover:text-indigo-600 flex items-center gap-1 text-[11px]"
                      >
                        <Edit3 className="w-3 h-3" />
                        <span>Edit</span>
                      </button>
                    )}
                  </div>

                  <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                    {fac.title}
                  </h3>

                  <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                    {fac.shortDescription}
                  </p>

                  {/* Available Equipment / Resources */}
                  <div className="mt-3 p-2.5 bg-slate-50 rounded-lg text-xs space-y-1.5">
                    <div className="text-[11px] font-semibold text-slate-500 uppercase flex items-center gap-1">
                      <Wrench className="w-3 h-3 text-slate-500" />
                      <span>Hardware & Tooling</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {fac.availableResources.slice(0, 3).map((res, rIdx) => (
                        <span key={rIdx} className="text-[11px] font-medium text-slate-700 bg-white px-2 py-0.5 rounded border border-slate-200">
                          {res}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Access & Hours */}
                  <div className="mt-3 space-y-1 text-xs text-slate-500">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">{fac.timings}</span>
                    </div>
                    <div 
                      onClick={() => onNavigate(fac)}
                      className="flex items-center gap-1.5 text-indigo-700 hover:text-indigo-900 font-medium cursor-pointer"
                    >
                      <MapPin className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                      <span>{fac.roomNumber} ({fac.location})</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-5 pb-5 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                <button
                  onClick={() => onToggleSave(fac.id)}
                  className={`p-1.5 rounded-lg text-xs transition-colors ${
                    isSaved ? 'bg-indigo-100 text-indigo-700' : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100'
                  }`}
                  title={isSaved ? 'Saved' : 'Save for later'}
                >
                  <Bookmark className="w-3.5 h-3.5" />
                </button>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => onNavigate(fac)}
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors"
                  >
                    <Compass className="w-3 h-3" />
                    <span>Navigate</span>
                  </button>

                  <button
                    onClick={() => onReserveFacility(fac)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors"
                  >
                    <span>Book Pass</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
