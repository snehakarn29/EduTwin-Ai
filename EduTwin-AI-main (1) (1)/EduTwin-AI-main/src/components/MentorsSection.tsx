import React from 'react';
import { MentorOpportunity, ScoredOpportunity } from '../types';
import { 
  UserCheck, 
  CheckCircle, 
  ArrowRight, 
  Bookmark, 
  Building, 
  MapPin, 
  Navigation,
  Compass,
  Edit3,
  Plus,
  FolderGit2,
  Info
} from 'lucide-react';

interface MentorsSectionProps {
  mentors: ScoredOpportunity[];
  savedItemIds: string[];
  interestedItemIds: string[];
  onToggleSave: (id: string) => void;
  onToggleInterested: (id: string) => void;
  onOpenBreakdown: (scored: ScoredOpportunity) => void;
  onRequestMentorship: (mentor: MentorOpportunity) => void;
  onNavigate: (mentor: MentorOpportunity) => void;
  onEditMentor?: (mentor: MentorOpportunity) => void;
  onAddNewMentor?: () => void;
}

export const MentorsSection: React.FC<MentorsSectionProps> = ({
  mentors,
  savedItemIds,
  interestedItemIds,
  onToggleSave,
  onToggleInterested,
  onOpenBreakdown,
  onRequestMentorship,
  onNavigate,
  onEditMentor,
  onAddNewMentor
}) => {
  return (
    <section className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-slate-200 pb-3 gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
            <span>Find My Mentor</span>
            <span className="text-xs font-normal text-slate-500">People who can guide your growth</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
            Faculty advisers and lab directors matched on research overlap, thesis domain, and open undergraduate projects.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-xs text-slate-500 font-mono tabular-nums">
            {mentors.length} Faculty Matches
          </div>

          {onAddNewMentor && (
            <button
              onClick={onAddNewMentor}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-xs transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Mentor</span>
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {mentors.map((scored) => {
          const mentor = scored.opportunity as MentorOpportunity;
          const { breakdown } = scored;
          const isSaved = savedItemIds.includes(mentor.id);

          return (
            <div
              key={mentor.id}
              className="bg-white rounded-xl border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all duration-200 flex flex-col justify-between overflow-hidden group"
            >
              <div>
                {/* Visual Image Header */}
                <div className="relative h-44 w-full overflow-hidden bg-slate-100">
                  {mentor.imageUrl ? (
                    <img
                      src={mentor.imageUrl}
                      alt={mentor.facultyName}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-indigo-50 text-indigo-400">
                      <UserCheck className="w-12 h-12" />
                    </div>
                  )}

                  <div className="absolute top-2.5 inset-x-2.5 flex items-center justify-between pointer-events-none">
                    <span className="text-[11px] font-semibold text-white bg-slate-900/80 backdrop-blur-xs px-2.5 py-0.5 rounded-md pointer-events-auto">
                      {mentor.facultyTitle}
                    </span>

                    <button
                      onClick={() => onOpenBreakdown(scored)}
                      className="px-2.5 py-0.5 rounded-full bg-white text-indigo-700 font-bold font-mono text-xs tabular-nums shadow-xs hover:bg-slate-100 transition-colors pointer-events-auto flex items-center gap-1"
                    >
                      <span>{breakdown.overallScore}% Match</span>
                      <Info className="w-3 h-3 text-indigo-500" />
                    </button>
                  </div>

                  <button
                    onClick={() => onNavigate(mentor)}
                    className="absolute bottom-2.5 right-2.5 inline-flex items-center gap-1 text-[11px] font-semibold text-white bg-indigo-600/90 hover:bg-indigo-600 px-2 py-1 rounded-md backdrop-blur-xs shadow-xs transition-colors"
                  >
                    <Navigation className="w-3 h-3" />
                    <span>Cabin Location</span>
                  </button>
                </div>

                <div className="p-5">
                  <div className="flex items-center justify-between text-xs text-slate-500 font-medium mb-1">
                    <span>{mentor.department}</span>

                    {onEditMentor && (
                      <button
                        onClick={() => onEditMentor(mentor)}
                        className="text-slate-400 hover:text-indigo-600 flex items-center gap-1 text-[11px]"
                      >
                        <Edit3 className="w-3 h-3" />
                        <span>Edit</span>
                      </button>
                    )}
                  </div>

                  <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                    {mentor.facultyName}
                  </h3>

                  {/* Lab & Office */}
                  <div className="mt-2 text-xs text-slate-600 space-y-1">
                    <div className="flex items-center gap-1.5 font-medium text-slate-800">
                      <Building className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{mentor.labAssociated}</span>
                    </div>
                    <div 
                      onClick={() => onNavigate(mentor)}
                      className="flex items-center gap-1.5 text-indigo-700 hover:text-indigo-900 cursor-pointer text-[11px] font-medium"
                    >
                      <MapPin className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                      <span>{mentor.officeLocation}</span>
                    </div>
                  </div>

                  {/* Why matched */}
                  <div className="mt-3 p-2.5 bg-slate-50 rounded-lg text-xs space-y-1">
                    <div className="text-[11px] font-semibold text-slate-500 uppercase">Match Intelligence</div>
                    <div className="flex items-start gap-1.5 text-slate-700">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="leading-snug">{breakdown.whyMatched[0]}</span>
                    </div>
                  </div>

                  {/* Open Student Projects */}
                  {mentor.currentOpenProjects.length > 0 && (
                    <div className="mt-3 space-y-1">
                      <div className="text-[11px] font-semibold text-slate-500 uppercase flex items-center gap-1">
                        <FolderGit2 className="w-3 h-3 text-indigo-500" />
                        <span>Active Research Projects</span>
                      </div>
                      <ul className="text-xs text-slate-700 space-y-1 pl-1">
                        {mentor.currentOpenProjects.slice(0, 2).map((p, pIdx) => (
                          <li key={pIdx} className="line-clamp-1 text-[11px] text-slate-600">
                            • {p}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="px-5 pb-5 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                <button
                  onClick={() => onToggleSave(mentor.id)}
                  className={`p-1.5 rounded-lg text-xs transition-colors ${
                    isSaved ? 'bg-indigo-100 text-indigo-700' : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100'
                  }`}
                  title={isSaved ? 'Saved' : 'Save for later'}
                >
                  <Bookmark className="w-3.5 h-3.5" />
                </button>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => onNavigate(mentor)}
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors"
                  >
                    <Compass className="w-3 h-3" />
                    <span>Directions</span>
                  </button>

                  <button
                    onClick={() => onRequestMentorship(mentor)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors"
                  >
                    <span>Request Mentorship</span>
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
