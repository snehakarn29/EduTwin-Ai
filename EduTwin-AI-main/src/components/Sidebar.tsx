import React from 'react';
import { StudentProfile } from '../types';
import { 
  LayoutDashboard, 
  User, 
  Compass, 
  BookOpen, 
  Users, 
  TrendingUp, 
  Clock, 
  LogOut, 
  X, 
  Flame,
  ChevronDown
} from 'lucide-react';

interface SidebarProps {
  activeView: string;
  onSelectView: (viewId: string) => void;
  student: StudentProfile;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
  onTriggerDomainExpansion: () => void;
  currentPersonaKey: 'personaA' | 'personaB' | 'personaC' | 'custom';
  onSelectPersona: (key: 'personaA' | 'personaB' | 'personaC') => void;
  onOpenEditProfile: () => void;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeView,
  onSelectView,
  student,
  isOpenMobile,
  onCloseMobile,
  onTriggerDomainExpansion,
  currentPersonaKey,
  onSelectPersona,
  onOpenEditProfile
}) => {
  const navItems = [
    {
      id: 'dashboard',
      title: 'DASHBOARD',
      subtitle: 'Your Domain Overview',
      icon: LayoutDashboard,
      badge: null
    },
    {
      id: 'edutwin',
      title: 'MY SORCERER PROFILE',
      subtitle: 'Know Your Technique',
      icon: User,
      badge: null
    },
    {
      id: 'learn',
      title: 'LEARNING & PERFORMANCE',
      subtitle: 'Train Your Mind',
      icon: BookOpen,
      badge: null
    },
    {
      id: 'campus',
      title: 'MY CAMPUS DOMAIN',
      subtitle: 'Missions & Opportunities',
      icon: Compass,
      badge: '5'
    },
    {
      id: 'peers',
      title: 'SORCERER ALLIANCE',
      subtitle: 'Peers & Mentors',
      icon: Users,
      badge: null
    },
    {
      id: 'quests',
      title: 'SORCERER PROGRESSION',
      subtitle: 'Career & Resume',
      icon: TrendingUp,
      badge: null
    },
    {
      id: 'future',
      title: 'FUTURE SELF',
      subtitle: 'Domain Simulation',
      icon: Clock,
      badge: null
    }
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full bg-[#05050C] border-r border-purple-500/20 text-slate-100 select-none overflow-hidden font-sans">
      {/* 1. Top Logo Header */}
      <div className="p-4 sm:p-5 border-b border-purple-500/15">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Glowing Sigil Logo */}
            <div className="relative w-10 h-10 rounded-2xl bg-gradient-to-br from-purple-700 via-indigo-600 to-cyan-500 p-0.5 shadow-[0_0_20px_rgba(168,85,247,0.5)] flex items-center justify-center shrink-0">
              <div className="w-full h-full bg-[#080614] rounded-2xl flex items-center justify-center">
                <div className="relative">
                  <Flame className="w-5 h-5 text-cyan-300 animate-pulse" />
                  <div className="absolute inset-0 blur-sm bg-purple-500/50 -z-10" />
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold tracking-tight font-space text-base text-white">
                  EDUTWIN <span className="text-cyan-400">AI</span>
                </span>
                <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded-full border border-purple-500/40 text-purple-300 bg-purple-950/60 uppercase tracking-tight">
                  DOMAIN V3
                </span>
              </div>
              <p className="text-[9px] text-slate-400 font-mono tracking-wider uppercase mt-0.5">
                PERSONALIZED DOMAIN INTERFACE
              </p>
            </div>
          </div>

          <button
            onClick={onCloseMobile}
            className="lg:hidden p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* 2. Navigation Items List */}
      <nav className="flex-1 px-3 py-4 space-y-1.5 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;

          return (
            <button
              key={item.id}
              onClick={() => {
                onSelectView(item.id);
                onCloseMobile();
              }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left transition-all duration-200 group ${
                isActive
                  ? 'bg-gradient-to-r from-purple-900/90 via-purple-700/70 to-purple-600/50 border border-purple-400 text-white font-bold shadow-[0_0_20px_rgba(168,85,247,0.35)]'
                  : 'text-slate-400 hover:text-white hover:bg-purple-950/20 border border-transparent'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className={`p-1.5 rounded-lg shrink-0 ${
                  isActive ? 'text-cyan-300' : 'text-purple-400 group-hover:text-cyan-300'
                }`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className={`text-xs font-bold tracking-tight font-space uppercase ${
                    isActive ? 'text-white' : 'text-slate-300 group-hover:text-white'
                  }`}>
                    {item.title}
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono truncate">
                    {item.subtitle}
                  </div>
                </div>
              </div>

              {item.badge && (
                <span className="w-4 h-4 rounded-full bg-rose-500 text-white font-mono text-[9px] font-extrabold flex items-center justify-center shrink-0 shadow-[0_0_10px_rgba(244,63,94,0.6)]">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* 3. Bottom Persona / Gojo Quote / Log Out */}
      <div className="p-3 border-t border-purple-500/15 bg-[#070612]/70 space-y-3">
        {/* Gojo Quote */}
        <div className="px-2 text-center">
          <p className="text-[10px] text-slate-300 italic font-serif leading-tight">
            "Your potential is limitless, keep evolving."
          </p>
          <span className="text-[9px] text-purple-400 font-mono block mt-0.5">
            — Satoru Gojo
          </span>
        </div>

        {/* Explore as Demo Card */}
        <div className="bg-[#0A0718] p-2.5 rounded-xl border border-purple-500/25 space-y-2">
          <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-400">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
            <span>Explore as Demo</span>
          </div>

          <div className="relative">
            <select
              value={currentPersonaKey}
              onChange={(e) => onSelectPersona(e.target.value as any)}
              className="w-full bg-[#05050C] border border-purple-500/30 rounded-lg px-2.5 py-1 text-xs text-white appearance-none cursor-pointer focus:outline-none focus:border-cyan-400 font-space font-medium"
            >
              <option value="personaA">Anmol Sharma (CSE 3rd Year)</option>
              <option value="personaB">Priya Sharma (SWE Placement)</option>
              <option value="personaC">Rohan Kapoor (Founder)</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          <button
            onClick={() => onSelectPersona(currentPersonaKey === 'personaA' ? 'personaB' : 'personaA')}
            className="w-full py-1.5 rounded-lg bg-gradient-to-r from-purple-700 to-indigo-600 hover:from-purple-600 hover:to-indigo-500 text-white font-mono text-[10px] font-bold shadow-md transition-all flex items-center justify-center gap-1"
          >
            <span>Switch Profile</span>
          </button>
        </div>

        {/* Log Out Button */}
        <button
          onClick={() => {
            if (confirm('Log out of EduTwin Domain Session?')) {
              localStorage.clear();
              window.location.reload();
            }
          }}
          className="w-full py-1.5 px-3 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-950/20 text-xs font-mono transition-colors flex items-center justify-center gap-1.5"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Log Out</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Fixed Left Sidebar */}
      <aside className="hidden lg:block w-64 xl:w-68 shrink-0 h-screen sticky top-0 z-30">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer */}
      {isOpenMobile && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div 
            onClick={onCloseMobile}
            className="fixed inset-0 bg-black/85 backdrop-blur-xs transition-opacity animate-in fade-in"
          />
          <div className="relative w-68 max-w-[85vw] h-full z-10 animate-in slide-in-from-left duration-200 shadow-2xl">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};
