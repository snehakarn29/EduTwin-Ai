import React from 'react';
import { StudentProfile } from '../types';
import { 
  Sparkles, 
  SlidersHorizontal, 
  User, 
  ShieldCheck, 
  Plus, 
  Compass, 
  Navigation,
  MapPin
} from 'lucide-react';

interface HeaderProps {
  currentPersonaKey: 'personaA' | 'personaB' | 'personaC' | 'custom';
  onSelectPersona: (key: 'personaA' | 'personaB' | 'personaC') => void;
  activeProfile: StudentProfile;
  onOpenEditProfile: () => void;
  onOpenDomainExplorer: () => void;
  onOpenAddOpportunity: () => void;
  onOpenCampusMap: () => void;
  activeTab: string;
  onSelectTab: (tabId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPersonaKey,
  onSelectPersona,
  activeProfile,
  onOpenEditProfile,
  onOpenDomainExplorer,
  onOpenAddOpportunity,
  onOpenCampusMap,
  activeTab,
  onSelectTab
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Zone 1: Single text element wordmark */}
          <div className="flex items-center gap-3">
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); onSelectTab('overview'); }}
              className="flex items-center gap-2 group"
            >
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-sm group-hover:bg-indigo-700 transition-colors">
                ET
              </div>
              <span className="text-lg font-bold tracking-tight text-slate-900 group-hover:text-indigo-600 transition-colors">
                EduTwin AI
              </span>
            </a>
            <span className="hidden sm:inline-block text-xs font-medium text-slate-400 border-l border-slate-200 pl-3">
              Campus Domain Engine
            </span>
          </div>

          {/* Zone 2: Navigation Links (4-6 links, clean typography) */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600">
            <button
              onClick={() => onSelectTab('overview')}
              className={`hover:text-slate-900 transition-colors pb-0.5 ${
                activeTab === 'overview' ? 'text-indigo-600 font-semibold border-b-2 border-indigo-600' : ''
              }`}
            >
              My Domain
            </button>
            <button
              onClick={() => onSelectTab('clubs')}
              className={`hover:text-slate-900 transition-colors pb-0.5 ${
                activeTab === 'clubs' ? 'text-indigo-600 font-semibold border-b-2 border-indigo-600' : ''
              }`}
            >
              Clubs
            </button>
            <button
              onClick={() => onSelectTab('events')}
              className={`hover:text-slate-900 transition-colors pb-0.5 ${
                activeTab === 'events' ? 'text-indigo-600 font-semibold border-b-2 border-indigo-600' : ''
              }`}
            >
              Events
            </button>
            <button
              onClick={() => onSelectTab('research')}
              className={`hover:text-slate-900 transition-colors pb-0.5 ${
                activeTab === 'research' ? 'text-indigo-600 font-semibold border-b-2 border-indigo-600' : ''
              }`}
            >
              Research
            </button>
            <button
              onClick={() => onSelectTab('mentors')}
              className={`hover:text-slate-900 transition-colors pb-0.5 ${
                activeTab === 'mentors' ? 'text-indigo-600 font-semibold border-b-2 border-indigo-600' : ''
              }`}
            >
              Mentors
            </button>
            <button
              onClick={() => onSelectTab('facilities')}
              className={`hover:text-slate-900 transition-colors pb-0.5 ${
                activeTab === 'facilities' ? 'text-indigo-600 font-semibold border-b-2 border-indigo-600' : ''
              }`}
            >
              Facilities
            </button>
            <button
              onClick={() => onSelectTab('pathway')}
              className={`hover:text-slate-900 transition-colors pb-0.5 ${
                activeTab === 'pathway' ? 'text-indigo-600 font-semibold border-b-2 border-indigo-600' : ''
              }`}
            >
              Campus Pathway
            </button>
            <button
              onClick={() => onSelectTab('peers')}
              className={`hover:text-slate-900 transition-colors pb-0.5 ${
                activeTab === 'peers' ? 'text-indigo-600 font-semibold border-b-2 border-indigo-600' : ''
              }`}
            >
              Peers & Teams
            </button>
          </nav>

          {/* Zone 3: Primary Actions (Persona Switcher, Add Data, Map, Profile) */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Campus Map Navigator Button */}
            <button
              onClick={onOpenCampusMap}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors border border-indigo-200/60"
              title="Open Campus Navigator & Interactive Map"
            >
              <Navigation className="w-3.5 h-3.5 text-indigo-600" />
              <span className="hidden md:inline">Campus Map</span>
            </button>

            {/* Add New Opportunity Button */}
            <button
              onClick={onOpenAddOpportunity}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-xs transition-colors"
              title="Add a new Club, Event, Facility or Mentor to the campus ecosystem"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Data</span>
            </button>

            {/* Demo Persona Selector */}
            <div className="hidden xl:flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200">
              <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider px-1.5">
                Demo
              </span>
              <button
                onClick={() => onSelectPersona('personaA')}
                title="Persona A: AI Researcher"
                className={`px-2 py-1 text-xs font-medium rounded-md transition-all whitespace-nowrap ${
                  currentPersonaKey === 'personaA'
                    ? 'bg-white text-indigo-700 shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                AI
              </button>
              <button
                onClick={() => onSelectPersona('personaB')}
                title="Persona B: Software Developer"
                className={`px-2 py-1 text-xs font-medium rounded-md transition-all whitespace-nowrap ${
                  currentPersonaKey === 'personaB'
                    ? 'bg-white text-indigo-700 shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                SWE
              </button>
              <button
                onClick={() => onSelectPersona('personaC')}
                title="Persona C: Entrepreneur"
                className={`px-2 py-1 text-xs font-medium rounded-md transition-all whitespace-nowrap ${
                  currentPersonaKey === 'personaC'
                    ? 'bg-white text-indigo-700 shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Founder
              </button>
            </div>

            {/* Edit DNA / Profile Button */}
            <button
              onClick={onOpenEditProfile}
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors shadow-xs"
              title="Edit all student signals and credentials"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-slate-500" />
              <span className="hidden sm:inline">Edit DNA</span>
            </button>

            {/* Profile Avatar Trigger */}
            <button
              onClick={onOpenEditProfile}
              className="flex items-center gap-2 rounded-full hover:ring-2 hover:ring-indigo-300 transition-all"
              title={`${activeProfile.name} (${activeProfile.academic.department})`}
            >
              <div className="w-8 h-8 rounded-full bg-indigo-100 border border-indigo-200 text-indigo-700 flex items-center justify-center font-bold text-xs overflow-hidden">
                {activeProfile.avatarUrl ? (
                  <img
                    src={activeProfile.avatarUrl}
                    alt={activeProfile.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <span>{activeProfile.avatarInitials}</span>
                )}
              </div>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
