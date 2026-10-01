import React, { useState } from 'react';
import { StudentProfile, ScoredOpportunity, CampusOpportunity } from '../types';
import { 
  Sparkles, 
  Flame, 
  Zap, 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  Compass, 
  BookOpen, 
  FileText,
  Navigation,
  Target,
  Shield,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Building2,
  Cpu,
  GraduationCap,
  Layers,
  SlidersHorizontal
} from 'lucide-react';

interface DashboardViewProps {
  student: StudentProfile;
  scoredOpportunities: ScoredOpportunity[];
  onTriggerDomainExpansion: () => void;
  onOpenLogExperience: () => void;
  onOpenWhyAttend: (opp: CampusOpportunity, score: number) => void;
  onNavigateToOpp: (opp: CampusOpportunity) => void;
  onSelectTab: (tabId: string) => void;
  onOpenCampusMap: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  student,
  scoredOpportunities,
  onTriggerDomainExpansion,
  onOpenLogExperience,
  onOpenWhyAttend,
  onNavigateToOpp,
  onSelectTab,
  onOpenCampusMap
}) => {
  // Mode selection: 'simple' (Default - Clean & Judge Friendly) vs 'detailed' (Full Grid)
  const [activeSubTab, setActiveSubTab] = useState<'overview' | 'skills' | 'recommendations' | 'quest'>('overview');
  const [isFullView, setIsFullView] = useState(false);

  // Focus tasks state (interactive checkboxes)
  const [tasks, setTasks] = useState([
    { id: 1, text: 'DSA Practice (30 mins)', done: true },
    { id: 2, text: 'DBMS Revision', done: true },
    { id: 3, text: 'Attend AI Hackathon Briefing', done: false },
    { id: 4, text: 'Update Resume with Project XP', done: false },
  ]);

  const toggleTask = (id: number) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  const completedCount = tasks.filter(t => t.done).length;

  // Key campus recommendations
  const missionOpp = scoredOpportunities.find(s => s.opportunity.id === 'event-cpl-round-3') || scoredOpportunities[0];
  const clubOpp = scoredOpportunities.find(s => s.opportunity.id === 'club-ai-deep-tech') || scoredOpportunities.find(s => s.opportunity.type === 'club') || scoredOpportunities[1];
  const mentorOpp = scoredOpportunities.find(s => s.opportunity.id === 'mentor-rajesh-verma') || scoredOpportunities.find(s => s.opportunity.type === 'mentor') || scoredOpportunities[2];
  const labOpp = scoredOpportunities.find(s => s.opportunity.id === 'facility-computer-vision') || scoredOpportunities.find(s => s.opportunity.type === 'facility') || scoredOpportunities[3];
  const currentMission = scoredOpportunities.find(s => s.opportunity.id === 'event-ai-innovation-hackathon') || scoredOpportunities[0];

  return (
    <div className="space-y-6 animate-in fade-in duration-300 font-sans pb-10">
      
      {/* ========================================================= */}
      {/* TOP VIEW SWITCHER (CLEAN & SIMPLE FOR JUDGES)              */}
      {/* ========================================================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#0A0718] p-2 rounded-2xl border border-purple-500/20">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {[
            { id: 'overview', label: '🌟 Simple Overview', desc: 'Judge Spotlight' },
            { id: 'recommendations', label: '🔮 Domain Recommendations (4)', desc: 'Match Matrix' },
            { id: 'skills', label: '📊 Technique Radar', desc: 'Skill Analytics' },
            { id: 'quest', label: '🗺️ Campus Quest', desc: 'Milestones' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveSubTab(tab.id as any);
                setIsFullView(false);
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                activeSubTab === tab.id && !isFullView
                  ? 'bg-gradient-to-r from-purple-700 to-indigo-600 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)] border border-purple-400/50'
                  : 'text-slate-400 hover:text-white hover:bg-purple-950/30'
              }`}
            >
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-2 self-end sm:self-auto pr-1">
          <button
            onClick={() => setIsFullView(!isFullView)}
            className={`text-xs font-mono px-3 py-1.5 rounded-xl border flex items-center gap-1.5 transition-all ${
              isFullView
                ? 'bg-cyan-950/60 border-cyan-400 text-cyan-300 font-bold shadow-[0_0_12px_rgba(34,211,238,0.3)]'
                : 'bg-purple-950/40 border-purple-500/30 text-purple-300 hover:text-white'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>{isFullView ? 'Showing All Widgets' : 'Simple Mode (Active)'}</span>
          </button>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 1. HERO BANNER WITH GOJO WATERMARK                        */}
      {/* ========================================================= */}
      <div className="relative rounded-3xl bg-gradient-to-r from-[#0E0922] via-[#090616] to-[#120B28] border border-purple-500/30 p-6 sm:p-8 shadow-2xl overflow-hidden group">
        
        {/* Jujutsu Kaisen Watermark Layer: Gojo Hollow Purple */}
        <div 
          className="absolute inset-0 bg-cover bg-center pointer-events-none opacity-15 mix-blend-screen filter contrast-125"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1200&q=80')` }}
        />
        {/* Japanese Calligraphy Kanji Watermark */}
        <div className="absolute right-4 bottom-2 text-7xl sm:text-9xl font-cinzel font-black text-purple-500/10 select-none pointer-events-none tracking-widest">
          無量空処
        </div>

        {/* Ambient energy glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-purple-600/15 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          
          {/* Left: Clear Welcome & Student Value Proposition */}
          <div className="space-y-3 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-mono font-bold text-cyan-300 bg-cyan-950/60 border border-cyan-500/40">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                <span>EduTwin AI Active</span>
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-mono font-extrabold text-white bg-rose-600 uppercase tracking-tight shadow-xs">
                {student.sorcererGrade || 'GRADE 2 SORCERER'}
              </span>
              <span className="text-xs text-slate-400 font-mono">
                {student.academic.department} • 3rd Year
              </span>
            </div>

            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold font-space text-white tracking-tight">
                Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-cyan-200 to-white">{student.name || 'Anmol Sharma'}</span>
              </h1>
              <p className="text-sm sm:text-base text-purple-200/80 mt-1 leading-relaxed">
                Your AI student digital twin has calibrated your academic mastery and matched <strong className="text-cyan-300">4 high-yield campus opportunities</strong> aligned with your <span className="text-white font-semibold">Software Development</span> trajectory.
              </p>
            </div>

            {/* Quick Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={onTriggerDomainExpansion}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white font-mono text-xs font-extrabold shadow-[0_0_20px_rgba(168,85,247,0.5)] transition-all flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-cyan-300" />
                <span>領域展開 Domain Expansion</span>
              </button>

              <button
                onClick={() => onSelectTab('campus')}
                className="px-4 py-2.5 rounded-xl bg-[#090616]/90 hover:bg-purple-950/60 border border-purple-500/40 text-purple-200 hover:text-white font-mono text-xs font-bold transition-colors flex items-center gap-2"
              >
                <Compass className="w-4 h-4 text-cyan-400" />
                <span>Explore Campus Domain (24 Items) →</span>
              </button>
            </div>
          </div>

          {/* Right: Gojo Character Visual Accent (Artistic & Clean) */}
          <div className="hidden lg:flex items-center justify-center shrink-0">
            <div className="relative w-44 h-44 rounded-2xl overflow-hidden border-2 border-purple-400/50 shadow-[0_0_25px_rgba(168,85,247,0.4)] bg-[#0C081A] group">
              <img
                src="https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=600&q=80"
                alt="Satoru Gojo Domain Expansion"
                className="w-full h-full object-cover object-top opacity-90 transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0C081A] via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-2 inset-x-2 text-center">
                <span className="text-[10px] font-mono text-purple-200 font-bold bg-black/70 px-2 py-0.5 rounded-full border border-purple-500/40">
                  Domain: Infinite Void
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>


      {/* ========================================================= */}
      {/* 2. VITAL HEALTH METRICS WITH JUJUTSU WATERMARKS           */}
      {/* ========================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Card 1: Academic Standing (Nanami 7:3 Ratio Watermark) */}
        <div className="relative overflow-hidden rounded-2xl bg-[#0C081A]/90 border border-purple-500/25 p-4 sm:p-5 shadow-lg flex items-center justify-between group">
          {/* Subtle Nanami / Ratio Watermark */}
          <div 
            className="absolute -right-4 -bottom-4 w-28 h-28 bg-cover bg-center pointer-events-none opacity-10 mix-blend-screen filter contrast-125 transition-opacity group-hover:opacity-20"
            style={{ backgroundImage: `url('https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=400&q=80')` }}
          />
          <div className="absolute top-2 right-3 text-2xl font-cinzel font-black text-purple-400/10 pointer-events-none select-none">
            7:3
          </div>

          <div className="space-y-1 relative z-10">
            <div className="text-xs font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4 text-purple-400" />
              <span>Academic Energy</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-extrabold font-space text-white">
                {student.academic.cgpa} <span className="text-xs text-slate-400 font-normal">/ 10 CGPA</span>
              </span>
              <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-500/40 px-2 py-0.5 rounded-full">
                82% Attendance
              </span>
            </div>
            <div className="text-[11px] text-slate-400 font-mono">
              Safe above 75% examination threshold
            </div>
          </div>

          <button
            onClick={() => onSelectTab('learn')}
            className="p-2 rounded-xl bg-purple-950/40 hover:bg-purple-900/60 border border-purple-500/30 text-purple-300 transition-colors relative z-10"
            title="View Course Attendance & Study Guides"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Card 2: Cursed Energy & Skill Mastery (Gojo Limitless Watermark) */}
        <div className="relative overflow-hidden rounded-2xl bg-[#0C081A]/90 border border-purple-500/25 p-4 sm:p-5 shadow-lg flex items-center justify-between group">
          {/* Subtle Gojo Limitless Cursed Energy Watermark */}
          <div 
            className="absolute -right-4 -bottom-4 w-28 h-28 bg-cover bg-center pointer-events-none opacity-10 mix-blend-screen filter contrast-125 transition-opacity group-hover:opacity-20"
            style={{ backgroundImage: `url('https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=400&q=80')` }}
          />
          <div className="absolute top-2 right-3 text-2xl font-cinzel font-black text-cyan-400/10 pointer-events-none select-none">
            無下限
          </div>

          <div className="space-y-1 relative z-10">
            <div className="text-xs font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-cyan-400" />
              <span>Technique Mastery</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-extrabold font-space text-white">
                Level {student.level || 14}
              </span>
              <span className="text-xs font-mono font-bold text-cyan-300">
                {student.xp} / {student.nextLevelXp} XP
              </span>
            </div>
            <div className="w-36 h-1.5 rounded-full bg-slate-800 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full"
                style={{ width: `${Math.round((student.xp / student.nextLevelXp) * 100)}%` }}
              />
            </div>
          </div>

          <button
            onClick={() => onSelectTab('edutwin')}
            className="p-2 rounded-xl bg-purple-950/40 hover:bg-purple-900/60 border border-purple-500/30 text-purple-300 transition-colors relative z-10"
            title="View Technique Radar & Skills"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Card 3: Career Goal Alignment (Megumi Ten Shadows Watermark) */}
        <div className="relative overflow-hidden rounded-2xl bg-[#0C081A]/90 border border-purple-500/25 p-4 sm:p-5 shadow-lg flex items-center justify-between group">
          {/* Subtle Megumi Fushiguro Ten Shadows Watermark */}
          <div 
            className="absolute -right-4 -bottom-4 w-28 h-28 bg-cover bg-center pointer-events-none opacity-10 mix-blend-screen filter contrast-125 transition-opacity group-hover:opacity-20"
            style={{ backgroundImage: `url('https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=400&q=80')` }}
          />
          <div className="absolute top-2 right-3 text-2xl font-cinzel font-black text-rose-400/10 pointer-events-none select-none">
            十種影
          </div>

          <div className="space-y-1 relative z-10">
            <div className="text-xs font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Target className="w-4 h-4 text-rose-400" />
              <span>Career Trajectory</span>
            </div>
            <div className="text-base font-extrabold font-space text-white truncate max-w-[180px]">
              {student.careerGoal || 'Software Development'}
            </div>
            <div className="text-[11px] text-cyan-300 font-mono font-bold">
              94% Domain Compatibility
            </div>
          </div>

          <button
            onClick={() => onSelectTab('quests')}
            className="p-2 rounded-xl bg-purple-950/40 hover:bg-purple-900/60 border border-purple-500/30 text-purple-300 transition-colors relative z-10"
            title="View Career Quests"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

      </div>


      {/* ========================================================= */}
      {/* 3. CORE CONTENT AREA WITH JUJUTSU WATERMARKS               */}
      {/* ========================================================= */}
      
      {/* OVERVIEW TAB: (Simple, Uncluttered 2-Column Layout) */}
      {(activeSubTab === 'overview' || isFullView) && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          
          {/* Left Column: #1 Highest-Yield Opportunity (Sukuna Malevolent Shrine Watermark) */}
          <div className="relative overflow-hidden lg:col-span-7 rounded-3xl bg-gradient-to-b from-[#180914] to-[#0A050E] border border-rose-500/30 p-6 shadow-xl flex flex-col justify-between space-y-4 group">
            
            {/* Sukuna Malevolent Shrine Flames Artwork Watermark */}
            <div 
              className="absolute inset-0 bg-cover bg-center pointer-events-none opacity-15 mix-blend-color-dodge filter contrast-150 transition-opacity group-hover:opacity-25"
              style={{ backgroundImage: `url('https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80')` }}
            />
            {/* Sukuna Kanji Stamp Watermark */}
            <div className="absolute right-3 top-3 text-5xl font-cinzel font-black text-rose-500/10 select-none pointer-events-none">
              両面宿儺
            </div>

            <div className="relative z-10">
              <div className="flex items-center justify-between border-b border-rose-500/20 pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
                  <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                    Today's Priority Mission
                  </span>
                </div>
                <span className="px-2.5 py-0.5 rounded text-[9px] font-mono font-extrabold bg-rose-600 text-white uppercase tracking-wider shadow-xs">
                  94% DOMAIN MATCH
                </span>
              </div>

              <div className="pt-4 space-y-2">
                <h3 className="text-xl sm:text-2xl font-extrabold font-space text-white">
                  AI INNOVATION HACKATHON
                </h3>
                
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  National 36-hour competitive hackathon. Bridges your <span className="text-cyan-300 font-bold">DSA & Python</span> skills with multi-modal LLM architecture to produce verifiable proof of mastery for recruiters.
                </p>

                {/* 4 Match Factors */}
                <div className="grid grid-cols-4 gap-2 pt-3 border-t border-rose-500/15">
                  <div className="bg-[#120712]/90 p-2 rounded-xl text-center border border-rose-500/20">
                    <div className="text-[10px] font-mono text-slate-400">Skill</div>
                    <div className="text-sm font-bold font-mono text-cyan-300">92%</div>
                  </div>
                  <div className="bg-[#120712]/90 p-2 rounded-xl text-center border border-rose-500/20">
                    <div className="text-[10px] font-mono text-slate-400">Career</div>
                    <div className="text-sm font-bold font-mono text-cyan-300">95%</div>
                  </div>
                  <div className="bg-[#120712]/90 p-2 rounded-xl text-center border border-rose-500/20">
                    <div className="text-[10px] font-mono text-slate-400">Interest</div>
                    <div className="text-sm font-bold font-mono text-cyan-300">93%</div>
                  </div>
                  <div className="bg-[#120712]/90 p-2 rounded-xl text-center border border-rose-500/20">
                    <div className="text-[10px] font-mono text-slate-400">Fit</div>
                    <div className="text-sm font-bold font-mono text-cyan-300">90%</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex flex-wrap items-center gap-3 pt-2 relative z-10">
              <button
                onClick={() => onOpenWhyAttend(currentMission.opportunity, 94)}
                className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-mono text-xs font-bold shadow-md shadow-rose-950 transition-all flex items-center justify-center gap-2"
              >
                <span>ENTER MISSION →</span>
              </button>

              <button
                onClick={() => onOpenWhyAttend(currentMission.opportunity, 94)}
                className="px-4 py-2.5 rounded-xl bg-[#0E0610] hover:bg-[#1A0B1E] border border-rose-500/30 text-slate-200 font-mono text-xs font-medium transition-colors"
              >
                Why Attend? (AI Analysis)
              </button>

              <button
                onClick={() => setActiveSubTab('recommendations')}
                className="text-xs font-mono text-cyan-300 hover:underline px-2"
              >
                View all 4 matches →
              </button>
            </div>
          </div>

          {/* Right Column: Today's Focus Checklist (Jujutsu High Training Watermark) */}
          <div className="relative overflow-hidden lg:col-span-5 rounded-3xl bg-[#0C081A]/95 border border-purple-500/25 p-6 shadow-xl flex flex-col justify-between space-y-4 group">
            
            {/* Tokyo Jujutsu High Training Watermark */}
            <div 
              className="absolute inset-0 bg-cover bg-center pointer-events-none opacity-10 mix-blend-screen filter contrast-125 transition-opacity group-hover:opacity-18"
              style={{ backgroundImage: `url('https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=600&q=80')` }}
            />
            {/* Training Kanji Stamp */}
            <div className="absolute right-3 top-3 text-4xl font-cinzel font-black text-amber-500/10 select-none pointer-events-none">
              呪力鍛錬
            </div>

            <div className="relative z-10">
              <div className="flex items-center justify-between border-b border-purple-500/20 pb-3">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-400" />
                  <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                    Today's Action Focus
                  </span>
                </div>
                <span className="text-xs font-mono text-amber-300 font-bold bg-amber-950/60 border border-amber-500/30 px-2 py-0.5 rounded-full">
                  {completedCount} / {tasks.length} Completed
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full h-1.5 bg-slate-900 rounded-full my-3 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-amber-500 to-emerald-400 transition-all duration-300"
                  style={{ width: `${(completedCount / tasks.length) * 100}%` }}
                />
              </div>

              {/* Checklist */}
              <div className="space-y-2 pt-1">
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    onClick={() => toggleTask(task.id)}
                    className="flex items-center gap-3 p-2.5 rounded-xl bg-[#080512]/90 border border-purple-500/15 hover:border-purple-400/40 cursor-pointer transition-colors group/item"
                  >
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                      task.done
                        ? 'bg-amber-400/20 border-amber-400 text-amber-300'
                        : 'border-slate-600 group-hover/item:border-amber-400/60'
                    }`}>
                      {task.done && <CheckCircle2 className="w-4 h-4 text-amber-300" />}
                    </div>

                    <span className={`text-xs font-mono transition-colors truncate ${
                      task.done ? 'text-slate-500 line-through' : 'text-slate-200 group-hover/item:text-amber-200'
                    }`}>
                      {task.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => onSelectTab('learn')}
              className="w-full py-2.5 rounded-xl bg-purple-950/60 hover:bg-purple-900 border border-purple-500/40 text-purple-200 font-mono text-xs font-bold transition-all text-center relative z-10"
            >
              View Full Study & Attendance Plan →
            </button>
          </div>

        </div>
      )}

      {/* RECOMMENDATIONS TAB WITH THEMED WATERMARKS */}
      {(activeSubTab === 'recommendations' || isFullView) && (
        <div className="space-y-4 pt-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400" />
              <h2 className="font-space font-extrabold text-base sm:text-lg text-white tracking-tight">
                TOP 4 DOMAIN RECOMMENDATIONS
              </h2>
            </div>
            <button
              onClick={() => onSelectTab('campus')}
              className="text-xs font-mono text-cyan-400 hover:underline flex items-center gap-1"
            >
              <span>Explore All 24 in Catalog</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Card 1: MISSION (Black Flash Watermark) */}
            <div className="relative overflow-hidden rounded-2xl bg-[#0C081A]/95 border border-purple-500/25 p-4 shadow-xl flex flex-col justify-between space-y-3 hover:border-purple-400/60 transition-all group">
              <div 
                className="absolute inset-0 bg-cover bg-center pointer-events-none opacity-10 mix-blend-screen filter contrast-125 transition-opacity group-hover:opacity-20"
                style={{ backgroundImage: `url('https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=400&q=80')` }}
              />
              <div className="absolute right-2 top-2 text-2xl font-cinzel font-black text-rose-500/15 select-none pointer-events-none">
                黒閃
              </div>

              <div className="space-y-2 relative z-10">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1 text-[10px] font-mono font-bold text-rose-400 uppercase">
                    <Flame className="w-3 h-3 text-rose-500" />
                    <span>MISSION</span>
                  </span>
                  <span className="font-mono text-xs font-extrabold text-cyan-400">92% Match</span>
                </div>
                <h4 className="font-space font-bold text-sm text-white line-clamp-2">
                  Competitive Programming League (CPL) Round 3
                </h4>
                <div className="flex flex-wrap gap-1">
                  <span className="px-2 py-0.5 rounded text-[9px] font-mono text-rose-300 bg-rose-950/60 border border-rose-500/30">DSA</span>
                  <span className="px-2 py-0.5 rounded text-[9px] font-mono text-purple-300 bg-purple-950/60 border border-purple-500/30">Coding</span>
                </div>
                <p className="text-[11px] text-slate-300/80 line-clamp-2">
                  Perfect for sharpening algorithmic efficiency and interview readiness.
                </p>
              </div>
              <button
                onClick={() => onOpenWhyAttend(missionOpp.opportunity, 92)}
                className="w-full py-1.5 rounded-lg bg-purple-950/80 hover:bg-purple-900 border border-purple-500/40 text-purple-200 font-mono text-[10px] font-bold transition-all text-center relative z-10"
              >
                View Details →
              </button>
            </div>

            {/* Card 2: CLUB (Jujutsu High Society Watermark) */}
            <div className="relative overflow-hidden rounded-2xl bg-[#0C081A]/95 border border-purple-500/25 p-4 shadow-xl flex flex-col justify-between space-y-3 hover:border-purple-400/60 transition-all group">
              <div 
                className="absolute inset-0 bg-cover bg-center pointer-events-none opacity-10 mix-blend-screen filter contrast-125 transition-opacity group-hover:opacity-20"
                style={{ backgroundImage: `url('https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=400&q=80')` }}
              />
              <div className="absolute right-2 top-2 text-2xl font-cinzel font-black text-cyan-500/15 select-none pointer-events-none">
                高専
              </div>

              <div className="space-y-2 relative z-10">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1 text-[10px] font-mono font-bold text-cyan-400 uppercase">
                    <Building2 className="w-3 h-3 text-cyan-400" />
                    <span>CLUB</span>
                  </span>
                  <span className="font-mono text-xs font-extrabold text-cyan-400">89% Match</span>
                </div>
                <h4 className="font-space font-bold text-sm text-white line-clamp-2">
                  AI & Deep Tech Society (Chandigarh University)
                </h4>
                <div className="flex flex-wrap gap-1">
                  <span className="px-2 py-0.5 rounded text-[9px] font-mono text-cyan-300 bg-cyan-950/60 border border-cyan-500/30">AI</span>
                  <span className="px-2 py-0.5 rounded text-[9px] font-mono text-indigo-300 bg-indigo-950/60 border border-indigo-500/30">ML</span>
                </div>
                <p className="text-[11px] text-slate-300/80 line-clamp-2">
                  Collaborative research papers and open-source project sprints.
                </p>
              </div>
              <button
                onClick={() => onOpenWhyAttend(clubOpp.opportunity, 89)}
                className="w-full py-1.5 rounded-lg bg-gradient-to-r from-purple-800 to-indigo-700 hover:from-purple-700 text-white font-mono text-[10px] font-bold shadow-md transition-all text-center relative z-10"
              >
                Join Club →
              </button>
            </div>

            {/* Card 3: MENTOR (Grade 1 Sorcerer Seal Watermark) */}
            <div className="relative overflow-hidden rounded-2xl bg-[#0C081A]/95 border border-purple-500/25 p-4 shadow-xl flex flex-col justify-between space-y-3 hover:border-purple-400/60 transition-all group">
              <div 
                className="absolute inset-0 bg-cover bg-center pointer-events-none opacity-10 mix-blend-screen filter contrast-125 transition-opacity group-hover:opacity-20"
                style={{ backgroundImage: `url('https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=400&q=80')` }}
              />
              <div className="absolute right-2 top-2 text-2xl font-cinzel font-black text-amber-500/15 select-none pointer-events-none">
                一級
              </div>

              <div className="space-y-2 relative z-10">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1 text-[10px] font-mono font-bold text-amber-400 uppercase">
                    <GraduationCap className="w-3.5 h-3.5 text-amber-400" />
                    <span>MENTOR</span>
                  </span>
                  <span className="font-mono text-xs font-extrabold text-cyan-400">96% Match</span>
                </div>
                <h4 className="font-space font-bold text-sm text-white line-clamp-2">
                  Dr. Rajesh Verma Dept. of CSE
                </h4>
                <div className="flex flex-wrap gap-1">
                  <span className="px-2 py-0.5 rounded text-[9px] font-mono text-amber-300 bg-amber-950/60 border border-amber-500/30">Research</span>
                  <span className="px-2 py-0.5 rounded text-[9px] font-mono text-cyan-300 bg-cyan-950/60 border border-cyan-500/30">Deep Tech</span>
                </div>
                <p className="text-[11px] text-slate-300/80 line-clamp-2">
                  Senior faculty mentor with active projects in computer vision.
                </p>
              </div>
              <button
                onClick={() => onOpenWhyAttend(mentorOpp.opportunity, 96)}
                className="w-full py-1.5 rounded-lg bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 text-white font-mono text-[10px] font-bold shadow-md transition-all text-center relative z-10"
              >
                Request Mentorship →
              </button>
            </div>

            {/* Card 4: LAB (Mechamaru Puppet Tech Watermark) */}
            <div className="relative overflow-hidden rounded-2xl bg-[#0C081A]/95 border border-purple-500/25 p-4 shadow-xl flex flex-col justify-between space-y-3 hover:border-purple-400/60 transition-all group">
              <div 
                className="absolute inset-0 bg-cover bg-center pointer-events-none opacity-10 mix-blend-screen filter contrast-125 transition-opacity group-hover:opacity-20"
                style={{ backgroundImage: `url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=400&q=80')` }}
              />
              <div className="absolute right-2 top-2 text-2xl font-cinzel font-black text-teal-500/15 select-none pointer-events-none">
                傀儡
              </div>

              <div className="space-y-2 relative z-10">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1 text-[10px] font-mono font-bold text-teal-400 uppercase">
                    <Cpu className="w-3.5 h-3.5 text-teal-400" />
                    <span>LAB</span>
                  </span>
                  <span className="font-mono text-xs font-extrabold text-cyan-400">88% Match</span>
                </div>
                <h4 className="font-space font-bold text-sm text-white line-clamp-2">
                  Computer Vision Lab
                </h4>
                <div className="flex flex-wrap gap-1">
                  <span className="px-2 py-0.5 rounded text-[9px] font-mono text-teal-300 bg-teal-950/60 border border-teal-500/30">RTX 4090s</span>
                  <span className="px-2 py-0.5 rounded text-[9px] font-mono text-cyan-300 bg-cyan-950/60 border border-cyan-500/30">Open Lab</span>
                </div>
                <p className="text-[11px] text-slate-300/80 line-clamp-2">
                  Hardware workstations for training deep perception models.
                </p>
              </div>
              <button
                onClick={() => onOpenWhyAttend(labOpp.opportunity, 88)}
                className="w-full py-1.5 rounded-lg bg-gradient-to-r from-teal-700 to-cyan-700 hover:from-teal-600 text-white font-mono text-[10px] font-bold shadow-md transition-all text-center relative z-10"
              >
                Explore Lab →
              </button>
            </div>

          </div>
        </div>
      )}

      {/* SKILLS & RADAR TAB (WITH CONCENTRIC DOMAIN SEAL WATERMARK) */}
      {(activeSubTab === 'skills' || isFullView) && (
        <div className="relative overflow-hidden rounded-3xl bg-[#0C081A]/95 border border-purple-500/25 p-6 shadow-xl space-y-4 group">
          
          {/* Subtle Domain Barrier Watermark */}
          <div 
            className="absolute inset-0 bg-cover bg-center pointer-events-none opacity-10 mix-blend-screen filter contrast-125"
            style={{ backgroundImage: `url('https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=80')` }}
          />
          <div className="absolute right-6 bottom-4 text-7xl font-cinzel font-black text-purple-500/10 select-none pointer-events-none">
            蒼赫茈
          </div>

          <div className="relative z-10">
            <div className="flex items-center justify-between border-b border-purple-500/20 pb-3">
              <div>
                <h3 className="font-space font-bold text-lg text-white">
                  CURSED TECHNIQUE PROFILE & INNATE RADAR
                </h3>
                <p className="text-xs text-slate-400 font-mono mt-0.5">
                  Multi-dimensional competence matrix derived from project commits, course exams, and hackathons.
                </p>
              </div>
              <button
                onClick={() => onSelectTab('edutwin')}
                className="text-xs font-mono text-cyan-400 hover:underline"
              >
                Edit DNA Matrix →
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center pt-4">
              {/* Radar chart */}
              <div className="relative aspect-square w-full max-w-[260px] mx-auto flex items-center justify-center">
                <svg viewBox="0 0 200 200" className="w-full h-full overflow-visible">
                  {[0.25, 0.5, 0.75, 1].map((scale, i) => (
                    <polygon
                      key={i}
                      points="100,20 169,60 169,140 100,180 31,140 31,60"
                      fill="none"
                      stroke="#7C3AED"
                      strokeWidth="0.8"
                      strokeOpacity={0.25 * (i + 1)}
                      transform={`scale(${scale}) translate(${100 * (1 - scale)}, ${100 * (1 - scale)})`}
                    />
                  ))}
                  <polygon
                    points="100,26 161,65 152,130 100,165 52,128 55,74"
                    fill="rgba(168, 85, 247, 0.25)"
                    stroke="#A855F7"
                    strokeWidth="2"
                  />
                  <circle cx="100" cy="26" r="3" fill="#22D3EE" />
                  <circle cx="161" cy="65" r="3" fill="#22D3EE" />
                  <circle cx="152" cy="130" r="3" fill="#22D3EE" />
                  <circle cx="100" cy="165" r="3" fill="#22D3EE" />
                  <circle cx="52" cy="128" r="3" fill="#22D3EE" />
                  <circle cx="55" cy="74" r="3" fill="#22D3EE" />

                  <text x="100" y="10" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontFamily="monospace" fontWeight="bold">Programming 92</text>
                  <text x="180" y="62" textAnchor="start" fill="#E2E8F0" fontSize="8" fontFamily="monospace">AI/ML 88</text>
                  <text x="175" y="145" textAnchor="start" fill="#E2E8F0" fontSize="8" fontFamily="monospace">Web Dev 76</text>
                  <text x="100" y="196" textAnchor="middle" fill="#E2E8F0" fontSize="8" fontFamily="monospace">Problem Solving 81</text>
                  <text x="24" y="145" textAnchor="end" fill="#E2E8F0" fontSize="8" fontFamily="monospace">Communication 70</text>
                  <text x="24" y="62" textAnchor="end" fill="#E2E8F0" fontSize="8" fontFamily="monospace">Leadership 65</text>
                </svg>
              </div>

              {/* Skill list */}
              <div className="space-y-3">
                {[
                  { name: 'Programming & System Design', level: '92%', tag: 'Advanced' },
                  { name: 'Artificial Intelligence & Deep Learning', level: '88%', tag: 'Advanced' },
                  { name: 'Algorithmic Problem Solving (DSA)', level: '81%', tag: 'Advanced' },
                  { name: 'Full-Stack Web Development', level: '76%', tag: 'Intermediate' }
                ].map((s, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-white font-bold">{s.name}</span>
                      <span className="text-cyan-300 font-bold">{s.level}</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full" style={{ width: s.level }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* QUEST TAB WITH JUJUTSU HIGH PATHWAY WATERMARK */}
      {(activeSubTab === 'quest' || isFullView) && (
        <div className="relative overflow-hidden rounded-3xl bg-[#0C081A]/95 border border-purple-500/25 p-6 shadow-xl space-y-4 group">
          
          {/* Subtle Torii Gate / Pathway Watermark */}
          <div 
            className="absolute inset-0 bg-cover bg-center pointer-events-none opacity-10 mix-blend-screen filter contrast-125"
            style={{ backgroundImage: `url('https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80')` }}
          />
          <div className="absolute right-4 bottom-2 text-6xl font-cinzel font-black text-purple-500/10 select-none pointer-events-none">
            呪術師道
          </div>

          <div className="relative z-10">
            <div className="flex items-center justify-between border-b border-purple-500/20 pb-3">
              <div>
                <h3 className="font-space font-bold text-lg text-white">
                  MY CAMPUS QUEST (PERSONALIZED PATHWAY)
                </h3>
                <p className="text-xs text-slate-400 font-mono mt-0.5">
                  Step-by-step progression route engineered to bridge from foundational projects to Tier-1 internship offers.
                </p>
              </div>
              <button
                onClick={() => onSelectTab('quests')}
                className="text-xs font-mono text-cyan-400 hover:underline"
              >
                View Quest Board →
              </button>
            </div>

            <div className="flex items-center justify-between gap-1 overflow-x-auto py-4 px-2">
              {[
                { num: 1, title: 'AI Workshop', status: 'Completed', color: 'emerald' },
                { num: 2, title: 'AI Club', status: 'Completed', color: 'emerald' },
                { num: 3, title: 'AI Hackathon', status: 'In Progress', color: 'purple', active: true },
                { num: 4, title: 'ML Project', status: 'Upcoming', color: 'cyan' },
                { num: 5, title: 'Research Lab', status: 'Planned', color: 'slate' },
                { num: 6, title: 'Internship', status: 'Goal', color: 'slate' }
              ].map((node, i) => (
                <React.Fragment key={node.num}>
                  <div className="flex flex-col items-center text-center shrink-0 min-w-[80px]">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-mono font-bold text-xs transition-all ${
                      node.color === 'emerald'
                        ? 'bg-emerald-950 border-2 border-emerald-400 text-emerald-300 shadow-[0_0_10px_rgba(16,185,129,0.5)]'
                        : node.active
                        ? 'bg-purple-600 border-2 border-cyan-400 text-white shadow-[0_0_15px_rgba(168,85,247,0.7)] animate-pulse'
                        : 'bg-slate-900 border border-slate-700 text-slate-400'
                    }`}>
                      {node.color === 'emerald' ? '✓' : node.active ? '⚡' : node.num}
                    </div>
                    <div className="text-xs font-bold text-white font-space mt-2 truncate max-w-[90px]">
                      {node.title}
                    </div>
                    <div className={`text-[10px] font-mono font-bold mt-0.5 ${
                      node.color === 'emerald' ? 'text-emerald-400' : node.active ? 'text-rose-400' : 'text-slate-500'
                    }`}>
                      {node.status}
                    </div>
                  </div>

                  {i < 5 && (
                    <div className="flex-1 flex items-center justify-center px-1 min-w-[20px]">
                      <div className={`h-0.5 w-full ${
                        i < 2 ? 'bg-emerald-400/80' : i === 2 ? 'bg-purple-500' : 'bg-slate-800'
                      }`} />
                      <span className="text-[10px] text-slate-500 -ml-1">›</span>
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      )}


      {/* ========================================================= */}
      {/* 4. FOUR CLEAN SHORTCUT PORTALS WITH WATERMARKS            */}
      {/* ========================================================= */}
      <div className="pt-2">
        <div className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-3">
          Explore Specialized EduTwin Modules
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              title: 'Campus Catalog (24)',
              desc: 'Clubs, hackathons, faculty mentors & labs with explainable match scores',
              icon: Compass,
              tab: 'campus',
              kanji: '結界',
              bgUrl: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=400&q=80'
            },
            {
              title: 'Academics & Study Guide',
              desc: 'Bunk & 75% attendance calculator + AI weak-topic exam guides',
              icon: BookOpen,
              tab: 'learn',
              kanji: '学修',
              bgUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=400&q=80'
            },
            {
              title: 'Future Self 2028',
              desc: 'Interactive chat with your graduated post-tier-1 engineer self',
              icon: Sparkles,
              tab: 'future',
              kanji: '無限',
              bgUrl: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=400&q=80'
            },
            {
              title: 'Campus GPS & Map',
              desc: 'Indoor radar & walking steps to labs, auditoriums and faculty cabins',
              icon: Navigation,
              tab: 'map',
              kanji: '座標',
              bgUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=400&q=80'
            }
          ].map((portal, idx) => {
            const Icon = portal.icon;
            return (
              <div
                key={idx}
                onClick={() => onSelectTab(portal.tab)}
                className="relative overflow-hidden p-4 rounded-2xl bg-[#090616] border border-purple-500/20 hover:border-purple-400/50 hover:bg-[#0E0A22] cursor-pointer transition-all group flex flex-col justify-between space-y-3"
              >
                {/* Anime Watermark Image Layer */}
                <div 
                  className="absolute inset-0 bg-cover bg-center pointer-events-none opacity-8 mix-blend-screen filter contrast-125 transition-opacity group-hover:opacity-18"
                  style={{ backgroundImage: `url('${portal.bgUrl}')` }}
                />
                {/* Kanji Seal Stamp */}
                <div className="absolute right-2 bottom-1 text-3xl font-cinzel font-black text-purple-400/10 pointer-events-none select-none">
                  {portal.kanji}
                </div>

                <div className="space-y-1.5 relative z-10">
                  <div className="flex items-center justify-between">
                    <div className="p-2 rounded-xl bg-purple-950/50 border border-purple-500/30 text-cyan-300 group-hover:scale-105 transition-transform">
                      <Icon className="w-4 h-4" />
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
                  </div>
                  <h4 className="font-space font-bold text-sm text-white group-hover:text-cyan-300 transition-colors">
                    {portal.title}
                  </h4>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    {portal.desc}
                  </p>
                </div>

                <div className="text-[10px] font-mono text-purple-300 font-bold flex items-center gap-1 relative z-10">
                  <span>Open module</span>
                  <span>→</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
