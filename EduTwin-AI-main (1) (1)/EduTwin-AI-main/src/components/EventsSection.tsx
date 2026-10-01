import React from 'react';
import { EventOpportunity, ScoredOpportunity } from '../types';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Award, 
  Users, 
  CheckCircle, 
  ArrowRight, 
  Bookmark, 
  Navigation,
  Compass,
  Plus,
  Edit3,
  Info
} from 'lucide-react';

interface EventsSectionProps {
  events: ScoredOpportunity[];
  savedItemIds: string[];
  interestedItemIds: string[];
  onToggleSave: (id: string) => void;
  onToggleInterested: (id: string) => void;
  onOpenBreakdown: (scored: ScoredOpportunity) => void;
  onRegisterEvent: (event: EventOpportunity) => void;
  onNavigate: (event: EventOpportunity) => void;
  onEditEvent?: (event: EventOpportunity) => void;
  onAddNewEvent?: () => void;
}

export const EventsSection: React.FC<EventsSectionProps> = ({
  events,
  savedItemIds,
  interestedItemIds,
  onToggleSave,
  onToggleInterested,
  onOpenBreakdown,
  onRegisterEvent,
  onNavigate,
  onEditEvent,
  onAddNewEvent
}) => {
  return (
    <section className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-slate-200 pb-3 gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
            <span>Events For Your Domain</span>
            <span className="text-xs font-normal text-slate-500">Experiences you should explore</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
            Hackathons, technical competitions, and workshops filtered by your technical stack and semester goals.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-xs text-slate-500 font-mono tabular-nums">
            {events.length} Events Recommended
          </div>

          {onAddNewEvent && (
            <button
              onClick={onAddNewEvent}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-xs transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Event</span>
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {events.map((scored) => {
          const evt = scored.opportunity as EventOpportunity;
          const { breakdown } = scored;
          const isSaved = savedItemIds.includes(evt.id);

          return (
            <div
              key={evt.id}
              className="bg-white rounded-xl border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all duration-200 flex flex-col justify-between overflow-hidden group"
            >
              <div>
                {/* Visual Image Header */}
                <div className="relative h-40 w-full overflow-hidden bg-slate-100">
                  {evt.imageUrl ? (
                    <img
                      src={evt.imageUrl}
                      alt={evt.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-indigo-50 text-indigo-400">
                      <Calendar className="w-10 h-10" />
                    </div>
                  )}

                  <div className="absolute top-2.5 inset-x-2.5 flex items-center justify-between pointer-events-none">
                    <span className="text-[11px] font-semibold text-white bg-slate-900/80 backdrop-blur-xs px-2.5 py-0.5 rounded-md pointer-events-auto">
                      {evt.eventType}
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
                    onClick={() => onNavigate(evt)}
                    className="absolute bottom-2.5 right-2.5 inline-flex items-center gap-1 text-[11px] font-semibold text-white bg-indigo-600/90 hover:bg-indigo-600 px-2 py-1 rounded-md backdrop-blur-xs shadow-xs transition-colors"
                  >
                    <Navigation className="w-3 h-3" />
                    <span>Where to Go</span>
                  </button>
                </div>

                <div className="p-5">
                  <div className="flex items-center justify-between text-xs text-slate-500 font-medium mb-1.5">
                    <div className="flex items-center gap-1.5">
                      <span className="font-semibold text-indigo-700">{evt.mode}</span>
                      <span aria-hidden="true">·</span>
                      <span>{evt.teamFormat}</span>
                    </div>

                    {onEditEvent && (
                      <button
                        onClick={() => onEditEvent(evt)}
                        className="text-slate-400 hover:text-indigo-600 flex items-center gap-1 text-[11px]"
                      >
                        <Edit3 className="w-3 h-3" />
                        <span>Edit Data</span>
                      </button>
                    )}
                  </div>

                  <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors leading-snug">
                    {evt.title}
                  </h3>

                  <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                    {evt.shortDescription}
                  </p>

                  {/* Date & Deadline */}
                  <div className="mt-3 py-2 px-3 bg-slate-50 rounded-lg text-xs space-y-1">
                    <div className="flex items-center justify-between text-slate-700">
                      <span className="font-medium flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-slate-500" />
                        Date:
                      </span>
                      <span className="font-semibold font-mono tabular-nums">{evt.eventDate}</span>
                    </div>
                    <div className="flex items-center justify-between text-slate-500">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-400" />
                        Deadline:
                      </span>
                      <span className="font-mono tabular-nums text-rose-600 font-medium">{evt.registrationDeadline}</span>
                    </div>
                  </div>

                  {/* Why matched */}
                  <div className="mt-3 text-xs text-slate-700 space-y-1">
                    <div className="text-[11px] font-semibold text-slate-500 uppercase">Match Signal</div>
                    <div className="flex items-start gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="leading-snug">{breakdown.whyMatched[0]}</span>
                    </div>
                  </div>

                  {/* Location quick link */}
                  <div 
                    onClick={() => onNavigate(evt)}
                    className="mt-3 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-xs text-indigo-700 hover:text-indigo-900 font-medium cursor-pointer"
                  >
                    <MapPin className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                    <span className="truncate">{evt.location}</span>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="px-5 pb-5 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                <button
                  onClick={() => onToggleSave(evt.id)}
                  className={`p-1.5 rounded-lg text-xs transition-colors ${
                    isSaved ? 'bg-indigo-100 text-indigo-700' : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100'
                  }`}
                  title={isSaved ? 'Saved' : 'Save for later'}
                >
                  <Bookmark className="w-3.5 h-3.5" />
                </button>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => onNavigate(evt)}
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors"
                  >
                    <Compass className="w-3 h-3" />
                    <span>Navigate</span>
                  </button>

                  <button
                    onClick={() => onRegisterEvent(evt)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors"
                  >
                    <span>Register</span>
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
