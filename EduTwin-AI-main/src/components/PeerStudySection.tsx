import React from 'react';
import { PeerGroupOpportunity, TeamSynergyOpportunity, ScoredOpportunity, StudentProfile } from '../types';
import { 
  Users, 
  UserPlus, 
  CheckCircle, 
  ArrowRight, 
  Clock, 
  Sparkles, 
  ShieldCheck, 
  Layers,
  Lock,
  Bookmark,
  MapPin,
  Navigation,
  Compass,
  Plus,
  Info
} from 'lucide-react';

interface PeerStudySectionProps {
  peerGroups: ScoredOpportunity[];
  teams: ScoredOpportunity[];
  student: StudentProfile;
  savedItemIds: string[];
  interestedItemIds: string[];
  onToggleSave: (id: string) => void;
  onToggleInterested: (id: string) => void;
  onOpenBreakdown: (scored: ScoredOpportunity) => void;
  onRequestJoinGroup: (group: PeerGroupOpportunity) => void;
  onConnectTeam: (team: TeamSynergyOpportunity) => void;
  onTogglePrivacy: (field: 'optInPeerMatching' | 'allowTeammateDiscovery') => void;
  onNavigate: (item: PeerGroupOpportunity | TeamSynergyOpportunity) => void;
  onAddNewPeerGroup?: () => void;
}

export const PeerStudySection: React.FC<PeerStudySectionProps> = ({
  peerGroups,
  teams,
  student,
  savedItemIds,
  interestedItemIds,
  onToggleSave,
  onToggleInterested,
  onOpenBreakdown,
  onRequestJoinGroup,
  onConnectTeam,
  onTogglePrivacy,
  onNavigate,
  onAddNewPeerGroup
}) => {
  return (
    <section className="space-y-8">
      {/* Privacy & Opt-In Control Banner */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-2xs">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600 shrink-0">
            <Lock className="w-4 h-4" />
          </div>
          <div>
            <div className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <span>Peer Discovery & Privacy Controls</span>
              <span className="text-xs font-normal text-emerald-600 flex items-center gap-1 font-medium">
                <ShieldCheck className="w-3.5 h-3.5" />
                Zero Private Academic Data Shared
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Peer matching operates on an opt-in basis. Your GPA, grades, and private academic records are never revealed to other students.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 shrink-0">
          <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-700">
            <input
              type="checkbox"
              checked={student.privacy.optInPeerMatching}
              onChange={() => onTogglePrivacy('optInPeerMatching')}
              className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span>Study Circles</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-700">
            <input
              type="checkbox"
              checked={student.privacy.allowTeammateDiscovery}
              onChange={() => onTogglePrivacy('allowTeammateDiscovery')}
              className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span>Team Matching</span>
          </label>
        </div>
      </div>

      {/* Part 1: Peer Study Groups ("Find My Study Group") */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-slate-200 pb-3 gap-3">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
              <span>Find My Study Group</span>
              <span className="text-xs font-normal text-slate-500">People you can learn with</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
              Cohort-matched by subject focus, problem-solving tempo, and evening study preferences.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-xs text-slate-500 font-mono tabular-nums">
              {peerGroups.length} Groups
            </div>

            {onAddNewPeerGroup && (
              <button
                onClick={onAddNewPeerGroup}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-xs transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Create Group</span>
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {peerGroups.map((scored) => {
            const group = scored.opportunity as PeerGroupOpportunity;
            const { breakdown } = scored;
            const isSaved = savedItemIds.includes(group.id);

            return (
              <div
                key={group.id}
                className="bg-white rounded-xl border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all duration-200 flex flex-col justify-between overflow-hidden group"
              >
                <div>
                  {/* Image header if available */}
                  {group.imageUrl && (
                    <div className="relative h-36 w-full overflow-hidden bg-slate-100">
                      <img
                        src={group.imageUrl}
                        alt={group.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        referrerPolicy="no-referrer"
                      />
                      <button
                        onClick={() => onNavigate(group)}
                        className="absolute bottom-2.5 right-2.5 inline-flex items-center gap-1 text-[11px] font-semibold text-white bg-indigo-600/90 hover:bg-indigo-600 px-2 py-1 rounded-md backdrop-blur-xs shadow-xs transition-colors"
                      >
                        <Navigation className="w-3 h-3" />
                        <span>Room Location</span>
                      </button>
                    </div>
                  )}

                  <div className="p-5">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                        <UserPlus className="w-3.5 h-3.5 text-indigo-600" />
                        <span>{group.subject}</span>
                      </div>

                      <button
                        onClick={() => onOpenBreakdown(scored)}
                        className="px-2.5 py-0.5 rounded-full bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold font-mono text-xs tabular-nums transition-colors"
                      >
                        {breakdown.overallScore}% Match
                      </button>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                      {group.title}
                    </h3>

                    <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                      {group.shortDescription}
                    </p>

                    {/* Group Members & Timings */}
                    <div className="mt-3 p-2.5 bg-slate-50 rounded-lg text-xs space-y-1">
                      <div className="flex items-center justify-between text-slate-700 font-medium">
                        <span>Cohort Size:</span>
                        <span className="font-mono tabular-nums font-semibold">
                          {group.currentMembers} / {group.maxMembers} students
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-slate-600">
                        <span>Schedule:</span>
                        <span className="font-mono text-[11px]">{group.preferredStudyTime}</span>
                      </div>
                      <div className="pt-1 text-[11px] text-slate-500 border-t border-slate-200/60">
                        <span className="font-semibold text-slate-700">Target Goal: </span>
                        {group.studyGoal}
                      </div>
                    </div>

                    {/* Location */}
                    <div 
                      onClick={() => onNavigate(group)}
                      className="mt-3 text-xs text-indigo-700 hover:text-indigo-900 font-medium cursor-pointer flex items-center gap-1"
                    >
                      <MapPin className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                      <span className="truncate">{group.location}</span>
                    </div>
                  </div>
                </div>

                <div className="px-5 pb-5 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => onToggleSave(group.id)}
                    className={`p-1.5 rounded-lg text-xs transition-colors ${
                      isSaved ? 'bg-indigo-100 text-indigo-700' : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100'
                    }`}
                    title={isSaved ? 'Saved' : 'Save for later'}
                  >
                    <Bookmark className="w-3.5 h-3.5" />
                  </button>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => onNavigate(group)}
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors"
                    >
                      <Compass className="w-3 h-3" />
                      <span>Directions</span>
                    </button>

                    <button
                      onClick={() => onRequestJoinGroup(group)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors"
                    >
                      <span>Join Circle</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Part 2: Complementary Skill Matching ("Find Project Teammates") */}
      <div className="space-y-4 pt-4 border-t border-slate-200">
        <div className="flex items-end justify-between border-b border-slate-200 pb-3">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
              <span>Complementary Skill Matching</span>
              <span className="text-xs font-normal text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full font-semibold">
                Synergy Matchmaking
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
              Not just identical skills: EduTwin pairs complementary skill sets (AI + Frontend + UI/UX) for upcoming hackathons & startups.
            </p>
          </div>
          <div className="text-xs text-slate-500 font-mono tabular-nums">
            {teams.length} Synergy Teams
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {teams.map((scored) => {
            const team = scored.opportunity as TeamSynergyOpportunity;
            const { breakdown } = scored;

            return (
              <div
                key={team.id}
                className="bg-white rounded-xl border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all duration-200 p-5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="text-xs font-semibold text-indigo-700 flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5" />
                      <span>{team.targetHackathonOrProject}</span>
                    </div>

                    <button
                      onClick={() => onOpenBreakdown(scored)}
                      className="px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 font-bold font-mono text-xs tabular-nums"
                    >
                      {breakdown.overallScore}% Synergy
                    </button>
                  </div>

                  <h3 className="text-base font-bold text-slate-900">
                    {team.title}
                  </h3>

                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {team.shortDescription}
                  </p>

                  {/* Seeking Role Card */}
                  <div className="mt-3 p-3 bg-amber-50/70 border border-amber-200/80 rounded-lg text-xs space-y-1">
                    <div className="font-semibold text-amber-900 flex items-center justify-between">
                      <span>Currently Seeking:</span>
                      <span className="bg-amber-100 text-amber-800 px-2 py-0.5 rounded font-mono">
                        {team.seekingRole}
                      </span>
                    </div>
                    <div className="text-amber-800 text-[11px] pt-1">
                      <span className="font-medium">Desired Skills: </span>
                      {team.seekingSkills.join(', ')}
                    </div>
                  </div>

                  {/* WHY THIS TEAM WORKS - Synergy Breakdown */}
                  <div className="mt-3 p-3 bg-slate-50 border border-slate-100 rounded-lg space-y-2">
                    <div className="text-[11px] font-semibold text-slate-700 uppercase flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-indigo-600" />
                      <span>Why This Team Could Work (Synergy Map)</span>
                    </div>

                    <div className="space-y-1.5">
                      {team.synergyBreakdown.map((item, sIdx) => (
                        <div key={sIdx} className="text-xs flex items-start gap-1.5 text-slate-700">
                          <span className="font-semibold text-slate-900 shrink-0">
                            {item.domain} →
                          </span>
                          <span className="text-slate-600 leading-snug">{item.contribution}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div 
                    onClick={() => onNavigate(team)}
                    className="text-xs text-indigo-700 hover:text-indigo-900 font-medium cursor-pointer flex items-center gap-1"
                  >
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{team.location}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => onNavigate(team)}
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors"
                    >
                      <Compass className="w-3 h-3" />
                      <span>Directions</span>
                    </button>

                    <button
                      onClick={() => onConnectTeam(team)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors"
                    >
                      <span>Connect with Lead</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
