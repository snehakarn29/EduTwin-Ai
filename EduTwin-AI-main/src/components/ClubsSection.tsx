import React from 'react';
import { ClubOpportunity, ScoredOpportunity } from '../types';
import { 
  Users, 
  CheckCircle, 
  ArrowRight, 
  Bookmark, 
  Info, 
  MapPin, 
  Calendar, 
  Navigation, 
  Edit3, 
  Plus,
  Compass
} from 'lucide-react';

interface ClubsSectionProps {
  clubs: ScoredOpportunity[];
  savedItemIds: string[];
  interestedItemIds: string[];
  onToggleSave: (id: string) => void;
  onToggleInterested: (id: string) => void;
  onOpenBreakdown: (scored: ScoredOpportunity) => void;
  onJoinClub: (club: ClubOpportunity) => void;
  onNavigate: (club: ClubOpportunity) => void;
  onEditClub?: (club: ClubOpportunity) => void;
  onAddNewClub?: () => void;
}

export const ClubsSection: React.FC<ClubsSectionProps> = ({
  clubs,
  savedItemIds,
  interestedItemIds,
  onToggleSave,
  onToggleInterested,
  onOpenBreakdown,
  onJoinClub,
  onNavigate,
  onEditClub,
  onAddNewClub
}) => {
  return (
    <section className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-slate-200 pb-3 gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
            <span>Clubs For You</span>
            <span className="text-xs font-normal text-slate-500">Communities where you belong</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
            Ranked by skill development potential, career trajectory fit, and campus meeting logistics.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-xs text-slate-500 font-mono tabular-nums">
            {clubs.length} Clubs Matched
          </div>

          {onAddNewClub && (
            <button
              onClick={onAddNewClub}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-xs transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Club</span>
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {clubs.map((scored) => {
          const club = scored.opportunity as ClubOpportunity;
          const { breakdown } = scored;
          const isSaved = savedItemIds.includes(club.id);

          return (
            <div
              key={club.id}
              className="bg-white rounded-xl border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all duration-200 flex flex-col justify-between overflow-hidden group"
            >
              <div>
                {/* Visual Image Header */}
                <div className="relative h-40 w-full overflow-hidden bg-slate-100">
                  {club.imageUrl ? (
                    <img
                      src={club.imageUrl}
                      alt={club.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-indigo-50 text-indigo-400">
                      <Users className="w-10 h-10" />
                    </div>
                  )}

                  {/* Top Overlay Badges */}
                  <div className="absolute top-2.5 inset-x-2.5 flex items-center justify-between pointer-events-none">
                    <span className="text-[11px] font-semibold text-white bg-slate-900/80 backdrop-blur-xs px-2.5 py-0.5 rounded-md pointer-events-auto">
                      {club.categoryTag}
                    </span>

                    <button
                      onClick={() => onOpenBreakdown(scored)}
                      className="px-2.5 py-0.5 rounded-full bg-white/95 text-indigo-700 font-bold font-mono text-xs tabular-nums shadow-xs hover:bg-white transition-colors pointer-events-auto flex items-center gap-1"
                      title="View match breakdown"
                    >
                      <span>{breakdown.overallScore}% Match</span>
                      <Info className="w-3 h-3 text-indigo-500" />
                    </button>
                  </div>

                  {/* Navigation Shortcut Badge on Image */}
                  <button
                    onClick={() => onNavigate(club)}
                    className="absolute bottom-2.5 right-2.5 inline-flex items-center gap-1 text-[11px] font-semibold text-white bg-indigo-600/90 hover:bg-indigo-600 px-2 py-1 rounded-md backdrop-blur-xs shadow-xs transition-colors"
                    title="Where to go for joining this club"
                  >
                    <Navigation className="w-3 h-3" />
                    <span>Where to Go</span>
                  </button>
                </div>

                <div className="p-5">
                  {/* Meta header */}
                  <div className="flex items-center justify-between gap-2 text-xs text-slate-500 font-medium mb-1.5">
                    <div className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-indigo-600" />
                      <span className="font-mono tabular-nums">{club.memberCount} members</span>
                    </div>

                    {onEditClub && (
                      <button
                        onClick={() => onEditClub(club)}
                        className="text-slate-400 hover:text-indigo-600 flex items-center gap-1 text-[11px]"
                        title="Edit club details"
                      >
                        <Edit3 className="w-3 h-3" />
                        <span>Edit Data</span>
                      </button>
                    )}
                  </div>

                  {/* Club Title */}
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors leading-snug">
                    {club.title}
                  </h3>

                  <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                    {club.shortDescription}
                  </p>

                  {/* Why Recommended */}
                  <div className="mt-3 p-2.5 rounded-lg bg-slate-50 border border-slate-100 space-y-1">
                    <div className="text-[11px] font-semibold uppercase text-slate-500">Why Recommended</div>
                    <div className="text-xs text-slate-700 flex items-start gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="leading-snug">{breakdown.whyMatched[0] || 'Matches your core academic interests'}</span>
                    </div>
                  </div>

                  {/* Skills Developed */}
                  <div className="mt-3 space-y-1">
                    <div className="text-[11px] font-semibold text-slate-500 uppercase">You Can Develop</div>
                    <div className="flex flex-wrap gap-1">
                      {club.skillsDeveloped.map((s, idx) => (
                        <span key={idx} className="text-[11px] font-medium text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Schedule & Location */}
                  <div className="mt-3 pt-3 border-t border-slate-100 space-y-1.5 text-xs text-slate-500">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">{club.meetingSchedule}</span>
                    </div>
                    <div 
                      onClick={() => onNavigate(club)}
                      className="flex items-center gap-1.5 text-indigo-700 hover:text-indigo-900 font-medium cursor-pointer"
                      title="Click for step-by-step room navigation"
                    >
                      <MapPin className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                      <span className="truncate">{club.location}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="px-5 pb-5 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                <button
                  onClick={() => onToggleSave(club.id)}
                  className={`p-1.5 rounded-lg text-xs transition-colors ${
                    isSaved ? 'bg-indigo-100 text-indigo-700' : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100'
                  }`}
                  title={isSaved ? 'Saved' : 'Save for later'}
                >
                  <Bookmark className="w-3.5 h-3.5" />
                </button>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => onNavigate(club)}
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors"
                  >
                    <Compass className="w-3 h-3" />
                    <span>Navigate</span>
                  </button>

                  <button
                    onClick={() => onJoinClub(club)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors"
                  >
                    <span>Explore Club</span>
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
