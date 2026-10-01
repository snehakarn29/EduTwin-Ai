import React from 'react';
import { ResearchOpportunity, ScoredOpportunity } from '../types';
import { 
  Microscope, 
  CheckCircle, 
  ArrowRight, 
  Bookmark, 
  GraduationCap, 
  MapPin, 
  Navigation, 
  Compass, 
  Plus, 
  Edit3, 
  Info 
} from 'lucide-react';

interface ResearchSectionProps {
  researchList: ScoredOpportunity[];
  savedItemIds: string[];
  interestedItemIds: string[];
  onToggleSave: (id: string) => void;
  onToggleInterested: (id: string) => void;
  onOpenBreakdown: (scored: ScoredOpportunity) => void;
  onExploreResearch: (item: ResearchOpportunity) => void;
  onNavigate: (item: ResearchOpportunity) => void;
  onEditResearch?: (item: ResearchOpportunity) => void;
  onAddNewResearch?: () => void;
}

export const ResearchSection: React.FC<ResearchSectionProps> = ({
  researchList,
  savedItemIds,
  interestedItemIds,
  onToggleSave,
  onToggleInterested,
  onOpenBreakdown,
  onExploreResearch,
  onNavigate,
  onEditResearch,
  onAddNewResearch
}) => {
  return (
    <section className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-slate-200 pb-3 gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
            <span>Research Opportunities For You</span>
            <span className="text-xs font-normal text-slate-500">Academic & scientific publishing</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
            Paper presentations, faculty-sponsored research fellowships, and symposiums tailored to graduate school aspirations.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-xs text-slate-500 font-mono tabular-nums">
            {researchList.length} Research Tracks
          </div>

          {onAddNewResearch && (
            <button
              onClick={onAddNewResearch}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-lg shadow-xs transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Research Call</span>
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {researchList.map((scored) => {
          const item = scored.opportunity as ResearchOpportunity;
          const { breakdown } = scored;
          const isSaved = savedItemIds.includes(item.id);

          return (
            <div
              key={item.id}
              className="bg-white rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all duration-200 flex flex-col justify-between overflow-hidden group"
            >
              <div>
                {/* Visual Image Header */}
                <div className="relative h-40 w-full overflow-hidden bg-slate-100">
                  {item.imageUrl ? (
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-blue-50 text-blue-400">
                      <Microscope className="w-10 h-10" />
                    </div>
                  )}

                  <div className="absolute top-2.5 inset-x-2.5 flex items-center justify-between pointer-events-none">
                    <span className="text-[11px] font-semibold text-white bg-slate-900/80 backdrop-blur-xs px-2.5 py-0.5 rounded-md pointer-events-auto">
                      {item.researchType}
                    </span>

                    <button
                      onClick={() => onOpenBreakdown(scored)}
                      className="px-2.5 py-0.5 rounded-full bg-white text-blue-800 font-bold font-mono text-xs tabular-nums shadow-xs hover:bg-slate-100 transition-colors pointer-events-auto flex items-center gap-1"
                    >
                      <span>{breakdown.overallScore}% Match</span>
                      <Info className="w-3 h-3 text-blue-500" />
                    </button>
                  </div>

                  <button
                    onClick={() => onNavigate(item)}
                    className="absolute bottom-2.5 right-2.5 inline-flex items-center gap-1 text-[11px] font-semibold text-white bg-blue-700/90 hover:bg-blue-700 px-2 py-1 rounded-md backdrop-blur-xs shadow-xs transition-colors"
                  >
                    <Navigation className="w-3 h-3" />
                    <span>Hall Location</span>
                  </button>
                </div>

                <div className="p-5">
                  <div className="flex items-center justify-between text-xs text-slate-500 font-medium mb-1">
                    <span>Lead: {item.facultyLead}</span>

                    {onEditResearch && (
                      <button
                        onClick={() => onEditResearch(item)}
                        className="text-slate-400 hover:text-blue-700 flex items-center gap-1 text-[11px]"
                      >
                        <Edit3 className="w-3 h-3" />
                        <span>Edit</span>
                      </button>
                    )}
                  </div>

                  <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-700 transition-colors leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                    {item.shortDescription}
                  </p>

                  {/* Venue & Deadlines */}
                  <div className="mt-3 p-2.5 bg-blue-50/50 rounded-lg border border-blue-100/80 space-y-1.5 text-xs">
                    {item.publicationVenue && (
                      <div className="text-slate-700">
                        <span className="text-slate-500">Venue: </span>
                        <span className="font-medium text-blue-900">{item.publicationVenue}</span>
                      </div>
                    )}
                    <div className="text-slate-500 flex items-center justify-between pt-1 border-t border-blue-100/60 font-mono text-[11px]">
                      <span>Deadline: {item.submissionDeadline}</span>
                      <span>Event: {item.eventDate}</span>
                    </div>
                  </div>

                  {/* Higher Studies Impact */}
                  <div className="mt-3 p-2 bg-slate-50 rounded text-xs text-slate-700 space-y-1">
                    <div className="text-[11px] font-semibold text-slate-500 uppercase flex items-center gap-1">
                      <GraduationCap className="w-3 h-3 text-blue-600" />
                      <span>Higher Studies Impact</span>
                    </div>
                    <p className="text-[11px] text-slate-600 leading-snug">
                      {item.higherStudiesRelevance}
                    </p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="px-5 pb-5 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                <button
                  onClick={() => onToggleSave(item.id)}
                  className={`p-1.5 rounded-lg text-xs transition-colors ${
                    isSaved ? 'bg-blue-100 text-blue-700' : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100'
                  }`}
                  title={isSaved ? 'Saved' : 'Save for later'}
                >
                  <Bookmark className="w-3.5 h-3.5" />
                </button>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => onNavigate(item)}
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                  >
                    <Compass className="w-3 h-3" />
                    <span>Navigate</span>
                  </button>

                  <button
                    onClick={() => onExploreResearch(item)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-lg transition-colors"
                  >
                    <span>Explore Call</span>
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
