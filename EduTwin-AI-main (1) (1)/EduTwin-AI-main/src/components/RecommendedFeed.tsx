import React from 'react';
import { ScoredOpportunity, CampusOpportunity } from '../types';
import { 
  Users, 
  Calendar, 
  Microscope, 
  UserCheck, 
  Cpu, 
  UserPlus, 
  Sparkles, 
  ArrowRight, 
  Bookmark, 
  CheckCircle, 
  ThumbsUp, 
  ThumbsDown,
  Info,
  MapPin,
  Clock,
  Navigation,
  Compass,
  Edit3
} from 'lucide-react';

interface RecommendedFeedProps {
  scoredOpportunities: ScoredOpportunity[];
  savedItemIds: string[];
  interestedItemIds: string[];
  participatedItemIds: string[];
  notInterestedItemIds: string[];
  onToggleSave: (id: string) => void;
  onToggleInterested: (id: string) => void;
  onToggleParticipated: (id: string) => void;
  onToggleNotInterested: (id: string) => void;
  onOpenBreakdown: (scored: ScoredOpportunity) => void;
  onActionClick: (opp: CampusOpportunity) => void;
  onNavigate: (opp: CampusOpportunity) => void;
  onEditOpp?: (opp: CampusOpportunity) => void;
}

export const RecommendedFeed: React.FC<RecommendedFeedProps> = ({
  scoredOpportunities,
  savedItemIds,
  interestedItemIds,
  participatedItemIds,
  notInterestedItemIds,
  onToggleSave,
  onToggleInterested,
  onToggleParticipated,
  onToggleNotInterested,
  onOpenBreakdown,
  onActionClick,
  onNavigate,
  onEditOpp
}) => {
  // Take top 4 most compatible recommendations representing diverse categories
  const topRecommendations = React.useMemo(() => {
    const chosen: ScoredOpportunity[] = [];
    const usedTypes = new Set<string>();

    for (const item of scoredOpportunities) {
      if (notInterestedItemIds.includes(item.opportunity.id)) continue;
      if (!usedTypes.has(item.opportunity.type)) {
        chosen.push(item);
        usedTypes.add(item.opportunity.type);
      }
      if (chosen.length >= 4) break;
    }

    if (chosen.length < 4) {
      for (const item of scoredOpportunities) {
        if (!chosen.includes(item) && !notInterestedItemIds.includes(item.opportunity.id)) {
          chosen.push(item);
          if (chosen.length >= 4) break;
        }
      }
    }

    return chosen;
  }, [scoredOpportunities, notInterestedItemIds]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'club': return Users;
      case 'event': return Calendar;
      case 'research': return Microscope;
      case 'mentor': return UserCheck;
      case 'facility': return Cpu;
      case 'peerGroup': return UserPlus;
      case 'teammate': return Users;
      default: return Sparkles;
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'club': return 'Campus Club';
      case 'event': return 'Hackathon / Event';
      case 'research': return 'Research Paper / Symposium';
      case 'mentor': return 'Faculty Mentor';
      case 'facility': return 'Specialized Facility';
      case 'peerGroup': return 'Peer Study Group';
      case 'teammate': return 'Project Teammate';
      default: return 'Opportunity';
    }
  };

  return (
    <section className="space-y-4">
      {/* Section Header */}
      <div className="flex items-end justify-between border-b border-slate-200 pb-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
            <span>Recommended For Your Domain</span>
            <span className="text-xs font-normal text-slate-500 hidden sm:inline">
              (Ranked by Multi-Signal Compatibility Engine)
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
            Cross-matched against your skills, career goals, academic trajectory, and learning preferences.
          </p>
        </div>

        <div className="text-xs text-slate-500 hidden md:block">
          Showing <span className="font-semibold text-slate-900 font-mono tabular-nums">4</span> high-affinity campus matches
        </div>
      </div>

      {/* Grid of Recommended Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {topRecommendations.map((scored) => {
          const { opportunity: opp, breakdown } = scored;
          const TypeIcon = getTypeIcon(opp.type);
          const isSaved = savedItemIds.includes(opp.id);
          const isInterested = interestedItemIds.includes(opp.id);
          const isParticipated = participatedItemIds.includes(opp.id);

          return (
            <div
              key={opp.id}
              className="group bg-white rounded-xl border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all duration-200 flex flex-col justify-between overflow-hidden"
            >
              <div>
                {/* Visual Image Header */}
                <div className="relative h-44 w-full bg-slate-100 overflow-hidden">
                  {opp.imageUrl ? (
                    <img
                      src={opp.imageUrl}
                      alt={opp.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-indigo-50 text-indigo-400">
                      <TypeIcon className="w-12 h-12" />
                    </div>
                  )}

                  {/* Scrim Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />

                  {/* Top Bar on Image: Category Badge + Match Score */}
                  <div className="absolute top-3 inset-x-3 flex items-center justify-between pointer-events-none">
                    <span className="text-[11px] font-semibold text-white bg-slate-900/80 backdrop-blur-xs px-2.5 py-0.5 rounded-md pointer-events-auto flex items-center gap-1.5">
                      <TypeIcon className="w-3 h-3 text-indigo-300" />
                      <span>{getTypeBadge(opp.type)}</span>
                    </span>

                    <button
                      onClick={() => onOpenBreakdown(scored)}
                      className="px-2.5 py-0.5 rounded-full bg-white text-indigo-700 font-bold font-mono text-xs tabular-nums shadow-xs hover:bg-slate-100 transition-colors pointer-events-auto flex items-center gap-1"
                      title="Click to view full mathematical scoring breakdown"
                    >
                      <span>{breakdown.overallScore}% Match</span>
                      <Info className="w-3 h-3 text-indigo-500" />
                    </button>
                  </div>

                  {/* Where to Go Floating Quick Action on Image */}
                  <div className="absolute bottom-2.5 inset-x-3 flex items-center justify-between pointer-events-none">
                    <span className="text-xs text-white/90 font-medium truncate flex items-center gap-1 drop-shadow-md">
                      <MapPin className="w-3.5 h-3.5 text-indigo-300 shrink-0" />
                      <span className="truncate">{opp.location}</span>
                    </span>

                    <button
                      onClick={() => onNavigate(opp)}
                      className="inline-flex items-center gap-1 text-[11px] font-semibold text-white bg-indigo-600 hover:bg-indigo-700 px-2.5 py-1 rounded-md shadow-xs pointer-events-auto transition-colors"
                      title="View step-by-step directions on campus map"
                    >
                      <Navigation className="w-3 h-3" />
                      <span>Where to Go</span>
                    </button>
                  </div>
                </div>

                {/* Card Content Body */}
                <div className="p-5">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                      {opp.organizer}
                    </div>

                    {onEditOpp && (
                      <button
                        onClick={() => onEditOpp(opp)}
                        className="text-slate-400 hover:text-indigo-600 flex items-center gap-1 text-[11px]"
                        title="Edit data for this opportunity"
                      >
                        <Edit3 className="w-3 h-3" />
                        <span>Edit</span>
                      </button>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors leading-snug">
                    {opp.title}
                  </h3>

                  {/* Short Description */}
                  <p className="text-xs sm:text-sm text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                    {opp.shortDescription}
                  </p>

                  {/* WHY THIS MATCHES YOU - Explainable Breakdown */}
                  <div className="mt-4 pt-3 border-t border-slate-100 bg-slate-50/70 -mx-5 px-5 py-3">
                    <div className="text-[11px] font-semibold tracking-wider uppercase text-slate-500 mb-1.5 flex items-center justify-between">
                      <span>Why This Matches You</span>
                      <span className="text-[10px] text-slate-400 font-normal">Student DNA Match</span>
                    </div>

                    <ul className="space-y-1">
                      {breakdown.whyMatched.slice(0, 3).map((reason, idx) => (
                        <li key={idx} className="flex items-start gap-1.5 text-xs text-slate-700">
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span className="leading-tight">{reason}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Skills You Can Gain */}
                    {breakdown.skillsGained.length > 0 && (
                      <div className="mt-2.5 pt-2 border-t border-slate-200/60 flex flex-wrap items-center gap-1 text-[11px] text-slate-500">
                        <span className="font-semibold text-slate-700">You could gain:</span>
                        {breakdown.skillsGained.map((skill, sIdx) => (
                          <span key={sIdx} className="font-medium text-indigo-900 bg-indigo-50 px-1.5 py-0.5 rounded">
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Card Footer: Action Buttons + Feedback loop */}
              <div className="px-5 pb-5 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
                {/* Feedback Controls */}
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => onToggleInterested(opp.id)}
                    className={`p-1.5 rounded-md text-xs transition-colors ${
                      isInterested
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100'
                    }`}
                    title={isInterested ? 'Marked as Interested' : 'Express Interest'}
                  >
                    <ThumbsUp className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => onToggleSave(opp.id)}
                    className={`p-1.5 rounded-md text-xs transition-colors ${
                      isSaved
                        ? 'bg-indigo-100 text-indigo-800'
                        : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100'
                    }`}
                    title={isSaved ? 'Saved to Your List' : 'Save for Later'}
                  >
                    <Bookmark className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => onToggleParticipated(opp.id)}
                    className={`px-2 py-1 rounded-md text-[11px] font-medium transition-colors ${
                      isParticipated
                        ? 'bg-purple-100 text-purple-800'
                        : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100'
                    }`}
                    title="Mark if you have already attended or joined"
                  >
                    {isParticipated ? 'Participated' : 'Mark Done'}
                  </button>

                  <button
                    onClick={() => onToggleNotInterested(opp.id)}
                    className="p-1.5 rounded-md text-xs text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                    title="Not Interested"
                  >
                    <ThumbsDown className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Primary Action Buttons */}
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => onNavigate(opp)}
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                  >
                    <Compass className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Navigate</span>
                  </button>

                  <button
                    onClick={() => onActionClick(opp)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-xs transition-colors"
                  >
                    <span>{breakdown.recommendedAction}</span>
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
