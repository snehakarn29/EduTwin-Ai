import React, { useState, useMemo, useEffect } from 'react';
import { 
  StudentProfile, 
  ScoredOpportunity, 
  DomainCategory, 
  CampusOpportunity, 
  ClubOpportunity, 
  EventOpportunity, 
  ResearchOpportunity, 
  MentorOpportunity, 
  FacilityOpportunity, 
  PeerGroupOpportunity, 
  TeamSynergyOpportunity,
  OpportunityType,
  QuestStep
} from './types';
import { DEMO_PERSONAS } from './data/demoPersonas';
import { CAMPUS_OPPORTUNITIES } from './data/campusData';
import { 
  scoreOpportunity, 
  rankOpportunities, 
  detectStudentDomain, 
  generateCampusPathway,
  DEFAULT_WEIGHTS
} from './utils/scoringEngine';

// Layout & Navigation
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';

// Views
import { DashboardView } from './views/DashboardView';
import { MyEduTwinView } from './views/MyEduTwinView';
import { QuestsView } from './views/QuestsView';
import { LearnView } from './views/LearnView';
import { FutureSelfView } from './views/FutureSelfView';
import { CampusMapView } from './views/CampusMapView';
import { DataManagerView } from './views/DataManagerView';
import { SyncHubView } from './views/SyncHubView';

// Part 2 Campus Domain Components
import { HeroDomainBanner } from './components/HeroDomainBanner';
import { RecommendedFeed } from './components/RecommendedFeed';
import { ClubsSection } from './components/ClubsSection';
import { EventsSection } from './components/EventsSection';
import { ResearchSection } from './components/ResearchSection';
import { MentorsSection } from './components/MentorsSection';
import { FacilitiesSection } from './components/FacilitiesSection';
import { PeerStudySection } from './components/PeerStudySection';
import { PathwaySection } from './components/PathwaySection';

// Modals
import { MatchBreakdownModal } from './components/MatchBreakdownModal';
import { EditProfileModal } from './components/EditProfileModal';
import { DomainExplorerModal } from './components/DomainExplorerModal';
import { DomainEvolutionModal } from './components/DomainEvolutionModal';
import { ActionFeedbackModal } from './components/ActionFeedbackModal';
import { CampusNavigationModal } from './components/CampusNavigationModal';
import { AddEditOpportunityModal } from './components/AddEditOpportunityModal';
import { DomainExpansionOverlay } from './components/DomainExpansionOverlay';
import { WhyAttendModal } from './components/WhyAttendModal';
import { AfterEventGrowthModal } from './components/AfterEventGrowthModal';

import { 
  Sparkles, 
  Compass, 
  GitMerge, 
  Users, 
  Calendar, 
  Microscope, 
  Cpu, 
  UserCheck, 
  UserPlus, 
  Layers,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Navigation,
  Plus,
  RotateCcw,
  Flame,
  Menu,
  Moon,
  Sun,
  Database,
  FolderSync
} from 'lucide-react';

const STORAGE_KEY_OPPORTUNITIES = 'edutwin_campus_opportunities_v2';
const STORAGE_KEY_PROFILE = 'edutwin_student_profile_v2';
const STORAGE_KEY_THEME = 'edutwin_theme_preference_v2';

export default function App() {
  // 1. Campus Opportunities State (Persistent across reloads, editable in real time)
  const [campusOpportunities, setCampusOpportunities] = useState<CampusOpportunity[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_OPPORTUNITIES);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load opportunities from localStorage', e);
    }
    return CAMPUS_OPPORTUNITIES;
  });

  // Save to localStorage when opportunities change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_OPPORTUNITIES, JSON.stringify(campusOpportunities));
    } catch (e) {
      console.error('Failed to save opportunities to localStorage', e);
    }
  }, [campusOpportunities]);

  // 2. Student Profile State (Persistent across reloads, editable in real time)
  const [currentPersonaKey, setCurrentPersonaKey] = useState<'personaA' | 'personaB' | 'personaC' | 'custom'>('personaA');
  const [studentProfile, setStudentProfile] = useState<StudentProfile>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PROFILE);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load profile from localStorage', e);
    }
    return DEMO_PERSONAS.personaA;
  });

  // Save student profile to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_PROFILE, JSON.stringify(studentProfile));
    } catch (e) {
      console.error('Failed to save profile to localStorage', e);
    }
  }, [studentProfile]);

  // 3. Theme State ('dark' = Cursed Sorcerer Theme, 'light' = Tech Light)
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  // 4. Primary View Navigation ('dashboard' | 'edutwin' | 'campus' | 'quests' | 'learn' | 'future' | 'map' | 'manager' | 'sync')
  const [activeMainView, setActiveMainView] = useState<string>('dashboard');

  // 5. Campus Domain Sub-tab State ('overview' | 'clubs' | 'events' | 'research' | 'mentors' | 'facilities' | 'pathway' | 'peers')
  const [activeDomainTab, setActiveDomainTab] = useState<string>('overview');

  // Mobile drawer state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Discovery animation state
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);

  // Modals state
  const [selectedScoredOpp, setSelectedScoredOpp] = useState<ScoredOpportunity | null>(null);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState<boolean>(false);
  const [isDomainExplorerOpen, setIsDomainExplorerOpen] = useState<boolean>(false);
  const [isDomainEvolutionOpen, setIsDomainEvolutionOpen] = useState<boolean>(false);
  const [activeActionOpp, setActiveActionOpp] = useState<CampusOpportunity | null>(null);

  // Cinematic Domain Expansion Overlay (領域展開)
  const [isDomainExpansionOpen, setIsDomainExpansionOpen] = useState<boolean>(false);

  // Why Attend Modal State
  const [whyAttendOpp, setWhyAttendOpp] = useState<CampusOpportunity | null>(null);
  const [whyAttendScore, setWhyAttendScore] = useState<number>(94);

  // After Event Growth Modal State
  const [isLogExperienceOpen, setIsLogExperienceOpen] = useState<boolean>(false);

  // Campus Navigation / Map Modal state
  const [isCampusMapOpen, setIsCampusMapOpen] = useState<boolean>(false);
  const [navigatingOpp, setNavigatingOpp] = useState<CampusOpportunity | null>(null);

  // Add / Edit Opportunity Modal state
  const [isAddEditOppOpen, setIsAddEditOppOpen] = useState<boolean>(false);
  const [editingOpp, setEditingOpp] = useState<CampusOpportunity | null>(null);
  const [defaultAddType, setDefaultAddType] = useState<OpportunityType>('club');

  // Manual pathway domain override (if user selected another domain in explorer)
  const [overrideDomain, setOverrideDomain] = useState<DomainCategory | null>(null);

  // Detect Student Domain from Profile Signals
  const detectedDomainInfo = useMemo(() => {
    return detectStudentDomain(studentProfile);
  }, [studentProfile]);

  const activeDomain = overrideDomain || detectedDomainInfo.domain;

  // Rank all Campus Opportunities using the 6-factor Matchmaking Engine
  const scoredOpportunities = useMemo(() => {
    return rankOpportunities(studentProfile, campusOpportunities, DEFAULT_WEIGHTS);
  }, [studentProfile, campusOpportunities]);

  // Split into categorized scored lists
  const scoredClubs = useMemo(() => {
    return scoredOpportunities.filter(o => o.opportunity.type === 'club');
  }, [scoredOpportunities]);

  const scoredEvents = useMemo(() => {
    return scoredOpportunities.filter(o => o.opportunity.type === 'event');
  }, [scoredOpportunities]);

  const scoredResearch = useMemo(() => {
    return scoredOpportunities.filter(o => o.opportunity.type === 'research');
  }, [scoredOpportunities]);

  const scoredMentors = useMemo(() => {
    return scoredOpportunities.filter(o => o.opportunity.type === 'mentor');
  }, [scoredOpportunities]);

  const scoredFacilities = useMemo(() => {
    return scoredOpportunities.filter(o => o.opportunity.type === 'facility');
  }, [scoredOpportunities]);

  const scoredPeerGroups = useMemo(() => {
    return scoredOpportunities.filter(o => o.opportunity.type === 'peerGroup');
  }, [scoredOpportunities]);

  const scoredTeams = useMemo(() => {
    return scoredOpportunities.filter(o => o.opportunity.type === 'teammate');
  }, [scoredOpportunities]);

  // Generate Curated Campus Pathway
  const campusPathway = useMemo(() => {
    return generateCampusPathway(studentProfile, activeDomain);
  }, [studentProfile, activeDomain]);

  // Handler: Switch Demo Persona
  const handleSelectPersona = (key: 'personaA' | 'personaB' | 'personaC') => {
    setCurrentPersonaKey(key);
    setStudentProfile(DEMO_PERSONAS[key]);
    setOverrideDomain(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handler: Save Edited Profile
  const handleSaveProfile = (updated: StudentProfile) => {
    setStudentProfile(updated);
    setCurrentPersonaKey('custom');
    setOverrideDomain(null);
  };

  // Handler: Run Discovery Animation (Primary Wow Moment)
  const handleRunDiscoveryAnimation = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
    }, 1200);
  };

  // Handler: Add / Save Opportunity
  const handleSaveOpportunity = (opp: CampusOpportunity) => {
    const existingIndex = campusOpportunities.findIndex(o => o.id === opp.id);
    if (existingIndex >= 0) {
      const updated = [...campusOpportunities];
      updated[existingIndex] = opp;
      setCampusOpportunities(updated);
    } else {
      setCampusOpportunities([opp, ...campusOpportunities]);
    }
  };

  // Handler: Delete Opportunity
  const handleDeleteOpportunity = (id: string) => {
    setCampusOpportunities(campusOpportunities.filter(o => o.id !== id));
  };

  // Handler: Open Add Modal
  const handleOpenAddModal = (type: OpportunityType = 'club') => {
    setEditingOpp(null);
    setDefaultAddType(type);
    setIsAddEditOppOpen(true);
  };

  // Handler: Open Edit Modal
  const handleOpenEditModal = (opp: CampusOpportunity) => {
    setEditingOpp(opp);
    setDefaultAddType(opp.type);
    setIsAddEditOppOpen(true);
  };

  // Handler: Navigate to Campus Place
  const handleNavigateTo = (opp: CampusOpportunity) => {
    setNavigatingOpp(opp);
    setIsCampusMapOpen(true);
  };

  // Handler: Reset Campus Data to Defaults
  const handleResetData = () => {
    if (confirm('Reset all campus opportunities and student profile to demo defaults?')) {
      setCampusOpportunities(CAMPUS_OPPORTUNITIES);
      setStudentProfile(DEMO_PERSONAS.personaA);
      setCurrentPersonaKey('personaA');
      setOverrideDomain(null);
      localStorage.removeItem(STORAGE_KEY_OPPORTUNITIES);
      localStorage.removeItem(STORAGE_KEY_PROFILE);
    }
  };

  // Feedback Handlers
  const handleToggleSave = (id: string) => {
    const isSaved = studentProfile.feedback.savedItemIds.includes(id);
    const newSaved = isSaved
      ? studentProfile.feedback.savedItemIds.filter(i => i !== id)
      : [...studentProfile.feedback.savedItemIds, id];

    setStudentProfile({
      ...studentProfile,
      feedback: {
        ...studentProfile.feedback,
        savedItemIds: newSaved
      }
    });
  };

  const handleToggleInterested = (id: string) => {
    const isInterested = studentProfile.feedback.interestedItemIds.includes(id);
    const newInterested = isInterested
      ? studentProfile.feedback.interestedItemIds.filter(i => i !== id)
      : [...studentProfile.feedback.interestedItemIds, id];

    setStudentProfile({
      ...studentProfile,
      feedback: {
        ...studentProfile.feedback,
        interestedItemIds: newInterested
      }
    });
  };

  const handleToggleParticipated = (id: string) => {
    const isPart = studentProfile.feedback.participatedItemIds.includes(id);
    const newPart = isPart
      ? studentProfile.feedback.participatedItemIds.filter(i => i !== id)
      : [...studentProfile.feedback.participatedItemIds, id];

    setStudentProfile({
      ...studentProfile,
      feedback: {
        ...studentProfile.feedback,
        participatedItemIds: newPart
      }
    });
  };

  const handleToggleNotInterested = (id: string) => {
    const isNot = studentProfile.feedback.notInterestedItemIds.includes(id);
    const newNot = isNot
      ? studentProfile.feedback.notInterestedItemIds.filter(i => i !== id)
      : [...studentProfile.feedback.notInterestedItemIds, id];

    setStudentProfile({
      ...studentProfile,
      feedback: {
        ...studentProfile.feedback,
        notInterestedItemIds: newNot
      }
    });
  };

  // Privacy Toggle Handler
  const handleTogglePrivacy = (field: 'optInPeerMatching' | 'allowTeammateDiscovery') => {
    setStudentProfile({
      ...studentProfile,
      privacy: {
        ...studentProfile.privacy,
        [field]: !studentProfile.privacy[field]
      }
    });
  };

  // Action Click Handler
  const handleOpenAction = (opp: CampusOpportunity) => {
    setActiveActionOpp(opp);
  };

  // Complete Quest Step Handler
  const handleCompleteQuestStep = (questId: string, xpReward: number) => {
    const updatedQuests = studentProfile.quests.map(q => 
      q.id === questId ? { ...q, status: 'completed' as const } : q
    );
    const newXp = studentProfile.xp + xpReward;
    let newLevel = studentProfile.level;
    let newGrade = studentProfile.sorcererGrade;
    if (newXp >= studentProfile.nextLevelXp) {
      newLevel += 1;
      if (newLevel >= 20) newGrade = 'Special Grade Sorcerer';
      else if (newLevel >= 16) newGrade = 'Grade 1 Sorcerer';
      else if (newLevel >= 12) newGrade = 'Grade 2 Sorcerer';
    }
    setStudentProfile({
      ...studentProfile,
      xp: newXp,
      level: newLevel,
      sorcererGrade: newGrade,
      quests: updatedQuests
    });
  };

  // Log Experience Growth Handler
  const handleLogExperienceSuccess = (xpGained: number, newSkills: string[]) => {
    const updatedSkills = [...studentProfile.skills];
    newSkills.forEach(ns => {
      if (!updatedSkills.some(s => s.name.toLowerCase() === ns.toLowerCase())) {
        updatedSkills.push({ name: ns, level: 'Beginner', category: 'Emerging Tech' });
      }
    });
    setStudentProfile({
      ...studentProfile,
      xp: studentProfile.xp + xpGained,
      skills: updatedSkills
    });
  };

  // Import Full State Handler (Multi-Laptop Sync)
  const handleImportFullState = (data: { student: StudentProfile; opportunities: CampusOpportunity[] }) => {
    if (data.student) setStudentProfile(data.student);
    if (data.opportunities) setCampusOpportunities(data.opportunities);
    setCurrentPersonaKey('custom');
  };

  // Open "Why Attend?" Modal
  const handleOpenWhyAttendModal = (opp: CampusOpportunity, score: number = 94) => {
    setWhyAttendOpp(opp);
    setWhyAttendScore(score);
  };

  return (
    <div className={`min-h-screen flex ${theme === 'dark' ? 'bg-[#07070B] text-slate-100 bg-domain-grid' : 'bg-slate-50 text-slate-900'} font-sans antialiased selection:bg-purple-500/30 selection:text-purple-200 transition-colors duration-200`}>
      {/* 1. Sidebar Navigation (Desktop & Mobile Drawer) */}
      <Sidebar
        activeView={activeMainView}
        onSelectView={(v) => {
          setActiveMainView(v);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        student={studentProfile}
        isOpenMobile={isMobileMenuOpen}
        onCloseMobile={() => setIsMobileMenuOpen(false)}
        onTriggerDomainExpansion={() => setIsDomainExpansionOpen(true)}
        currentPersonaKey={currentPersonaKey}
        onSelectPersona={handleSelectPersona}
        onOpenEditProfile={() => setIsEditProfileOpen(true)}
        theme={theme}
        onToggleTheme={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      />

      {/* 2. Main Content Column */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header Bar */}
        {/* Top Header Bar matching Reference Screenshot */}
        <header className="sticky top-0 z-30 bg-[#070512]/95 border-b border-purple-500/20 backdrop-blur-md px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4 font-sans select-none">
          {/* Left: Mobile Toggle & Search Bar */}
          <div className="flex items-center gap-3 flex-1 max-w-xl">
            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 text-slate-400 hover:text-white rounded-lg hover:bg-purple-950/40"
              title="Open Navigation Menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Reference Search Bar */}
            <div className="relative w-full max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search missions, clubs, mentors..."
                className="w-full bg-[#0E0A22] border border-purple-500/30 rounded-full pl-9 pr-16 py-1.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 transition-colors font-mono"
              />
              <div className="absolute inset-y-0 right-0 pr-2.5 flex items-center pointer-events-none">
                <span className="px-1.5 py-0.5 rounded text-[10px] font-mono text-slate-400 bg-[#070512] border border-purple-500/30">
                  Ctrl + K
                </span>
              </div>
            </div>
          </div>

          {/* Right: Notifications, Theme, User Badge, Slogan, and Japanese Kanji */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            {/* Notification Bell with Badge '3' */}
            <button
              onClick={() => setActiveMainView('quests')}
              className="relative p-2 rounded-full hover:bg-purple-950/40 text-slate-300 hover:text-white transition-colors"
              title="3 Active Domain Notifications"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-rose-600 text-white font-mono text-[9px] font-extrabold flex items-center justify-center shadow-[0_0_8px_rgba(244,63,94,0.7)]">
                3
              </span>
            </button>

            {/* Theme Toggle Icon */}
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-full hover:bg-purple-950/40 text-slate-300 hover:text-white transition-colors"
              title="Toggle Theme"
            >
              <Sun className="w-4 h-4 text-amber-400" />
            </button>

            {/* Student Profile Pill */}
            <div 
              onClick={() => setIsEditProfileOpen(true)}
              className="flex items-center gap-2 cursor-pointer hover:opacity-90 transition-opacity"
            >
              <div className="relative w-8 h-8 rounded-full overflow-hidden border border-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.5)] shrink-0 bg-purple-950">
                <img
                  src={studentProfile.avatarUrl || 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=400&q=80'}
                  alt={studentProfile.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="hidden sm:block text-left">
                <div className="flex items-center gap-1 text-xs font-bold text-white font-space leading-tight">
                  <span>{studentProfile.name || 'Anmol Sharma'}</span>
                  <span className="text-[10px] text-slate-400">⌵</span>
                </div>
                <div className="inline-block px-1.5 py-0.2 rounded-full text-[8px] font-mono font-extrabold text-white bg-rose-600 uppercase tracking-tight shadow-xs">
                  {studentProfile.sorcererGrade || 'GRADE 2 SORCERER'}
                </div>
              </div>
            </div>

            {/* Far Right: Quote & Vertical Japanese Kanji Calligraphy */}
            <div className="hidden xl:flex items-center gap-3 pl-3 border-l border-purple-500/20">
              <div className="text-right leading-tight">
                <div className="text-[10px] text-cyan-300 italic font-mono">
                  "Better Skills.
                </div>
                <div className="text-[10px] text-white font-bold font-mono">
                  Stronger Domain."
                </div>
              </div>

              {/* Vertical Neon Japanese Kanji: 呪術廻戦 */}
              <div className="flex flex-col text-[11px] font-black text-rose-500 font-cinzel leading-none select-none drop-shadow-[0_0_8px_rgba(244,63,94,0.8)]">
                <span>呪</span>
                <span>術</span>
                <span>廻</span>
                <span>戦</span>
              </div>
            </div>
          </div>
        </header>

        {/* 3. Main Views Router */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8">
          
          {/* VIEW 1: SORCERER DASHBOARD */}
          {activeMainView === 'dashboard' && (
            <DashboardView
              student={studentProfile}
              scoredOpportunities={scoredOpportunities}
              onTriggerDomainExpansion={() => setIsDomainExpansionOpen(true)}
              onOpenLogExperience={() => setIsLogExperienceOpen(true)}
              onOpenWhyAttend={(opp, score) => handleOpenWhyAttendModal(opp, score)}
              onNavigateToOpp={(opp) => handleNavigateTo(opp)}
              onSelectTab={(tabId) => {
                if (['clubs', 'events', 'research', 'mentors', 'facilities', 'pathway', 'peers'].includes(tabId)) {
                  setActiveMainView('campus');
                  setActiveDomainTab(tabId);
                } else {
                  setActiveMainView(tabId);
                }
              }}
              onOpenCampusMap={() => {
                setNavigatingOpp(scoredOpportunities[0]?.opportunity || campusOpportunities[0]);
                setIsCampusMapOpen(true);
              }}
            />
          )}

          {/* VIEW 2: MY EDUTWIN DNA PROFILE */}
          {activeMainView === 'edutwin' && (
            <MyEduTwinView
              student={studentProfile}
              onOpenEditProfile={() => setIsEditProfileOpen(true)}
              onTriggerDomainExpansion={() => setIsDomainExpansionOpen(true)}
            />
          )}

          {/* VIEW 3: MY CAMPUS DOMAIN (RECOMMENDATION ENGINE - PART 2) */}
          {activeMainView === 'campus' && (
            <div className="space-y-8 animate-in fade-in duration-300">
              {/* Hero Domain Banner with Confidence & Explainability */}
              <HeroDomainBanner
                student={studentProfile}
                domainInfo={detectedDomainInfo}
                onEditProfile={() => setIsEditProfileOpen(true)}
                onExploreDomains={() => setIsDomainExplorerOpen(true)}
                onViewEvolution={() => setIsDomainEvolutionOpen(true)}
                onRunDiscoveryAnimation={handleRunDiscoveryAnimation}
                isAnalyzing={isAnalyzing}
              />

              {/* Sub-navigation for Domain Ecosystem Categories */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-purple-500/20 text-xs font-mono">
                {[
                  { id: 'overview', label: 'Recommended Spotlight', icon: Sparkles },
                  { id: 'clubs', label: `Clubs (${scoredClubs.length})`, icon: Users },
                  { id: 'events', label: `Events & Hackathons (${scoredEvents.length})`, icon: Calendar },
                  { id: 'research', label: `Research Opportunities (${scoredResearch.length})`, icon: Microscope },
                  { id: 'mentors', label: `Faculty Mentors (${scoredMentors.length})`, icon: UserCheck },
                  { id: 'facilities', label: `Facilities & Labs (${scoredFacilities.length})`, icon: Cpu },
                  { id: 'pathway', label: 'Campus Pathway', icon: GitMerge },
                  { id: 'peers', label: 'Peer Study & Teams', icon: UserPlus }
                ].map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeDomainTab === tab.id;

                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveDomainTab(tab.id)}
                      className={`flex items-center gap-2 px-3.5 py-2 rounded-xl whitespace-nowrap transition-all ${
                        isActive
                          ? 'bg-purple-600 text-white font-bold shadow-md glow-cursed'
                          : 'text-slate-400 hover:text-white bg-[#0C081A] border border-purple-500/20'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Campus Domain Sub-tab: Overview */}
              {activeDomainTab === 'overview' && (
                <div className="space-y-12">
                  {/* Hero Spotlight: Recommended For Your Domain */}
                  <RecommendedFeed
                    scoredOpportunities={scoredOpportunities}
                    savedItemIds={studentProfile.feedback.savedItemIds}
                    interestedItemIds={studentProfile.feedback.interestedItemIds}
                    participatedItemIds={studentProfile.feedback.participatedItemIds}
                    notInterestedItemIds={studentProfile.feedback.notInterestedItemIds}
                    onToggleSave={handleToggleSave}
                    onToggleInterested={handleToggleInterested}
                    onToggleParticipated={handleToggleParticipated}
                    onToggleNotInterested={handleToggleNotInterested}
                    onOpenBreakdown={(scored) => setSelectedScoredOpp(scored)}
                    onActionClick={handleOpenAction}
                    onNavigate={handleNavigateTo}
                    onEditOpp={handleOpenEditModal}
                  />

                  {/* Curated Campus Pathway Preview */}
                  <div className={`${theme === 'dark' ? 'bg-[#0C081A] border-purple-500/30' : 'bg-white border-slate-200'} rounded-2xl border p-6 sm:p-8 shadow-xl space-y-6 glow-border-purple`}>
                    <div className="flex items-center justify-between border-b border-purple-500/20 pb-4">
                      <div>
                        <div className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
                          Milestone Progression Arc
                        </div>
                        <h3 className="text-xl font-bold font-space text-white mt-0.5">
                          Your Personalized Campus Sorcerer Journey
                        </h3>
                      </div>
                      <button
                        onClick={() => setActiveDomainTab('pathway')}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-300 hover:text-cyan-100 transition-colors font-mono"
                      >
                        <span>Explore Full Pathway</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <PathwaySection
                      pathway={campusPathway}
                      onNavigateOpportunity={(oppId) => {
                        const target = scoredOpportunities.find(s => s.opportunity.id === oppId);
                        if (target) setSelectedScoredOpp(target);
                      }}
                    />
                  </div>

                  {/* High-Priority Clubs & Events Quick Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-bold font-space text-white flex items-center gap-2">
                          <Users className="w-4 h-4 text-cyan-400" />
                          <span>Top Matched Clubs For You</span>
                        </h3>
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => handleOpenAddModal('club')}
                            className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                          >
                            <Plus className="w-3 h-3" />
                            <span>Add Club</span>
                          </button>
                          <button
                            onClick={() => setActiveDomainTab('clubs')}
                            className="text-xs font-mono text-slate-400 hover:text-white"
                          >
                            View All ({scoredClubs.length})
                          </button>
                        </div>
                      </div>
                      <ClubsSection
                        clubs={scoredClubs.slice(0, 2)}
                        savedItemIds={studentProfile.feedback.savedItemIds}
                        interestedItemIds={studentProfile.feedback.interestedItemIds}
                        onToggleSave={handleToggleSave}
                        onToggleInterested={handleToggleInterested}
                        onOpenBreakdown={(scored) => setSelectedScoredOpp(scored)}
                        onJoinClub={(c) => handleOpenAction(c)}
                        onNavigate={handleNavigateTo}
                        onEditClub={handleOpenEditModal}
                        onAddNewClub={() => handleOpenAddModal('club')}
                      />
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-bold font-space text-white flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-cyan-400" />
                          <span>Upcoming Key Tournaments & Events</span>
                        </h3>
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => handleOpenAddModal('event')}
                            className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                          >
                            <Plus className="w-3 h-3" />
                            <span>Add Event</span>
                          </button>
                          <button
                            onClick={() => setActiveDomainTab('events')}
                            className="text-xs font-mono text-slate-400 hover:text-white"
                          >
                            View All ({scoredEvents.length})
                          </button>
                        </div>
                      </div>
                      <EventsSection
                        events={scoredEvents.slice(0, 2)}
                        savedItemIds={studentProfile.feedback.savedItemIds}
                        interestedItemIds={studentProfile.feedback.interestedItemIds}
                        onToggleSave={handleToggleSave}
                        onToggleInterested={handleToggleInterested}
                        onOpenBreakdown={(scored) => setSelectedScoredOpp(scored)}
                        onRegisterEvent={(e) => handleOpenAction(e)}
                        onNavigate={handleNavigateTo}
                        onEditEvent={handleOpenEditModal}
                        onAddNewEvent={() => handleOpenAddModal('event')}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Sub-tab: Clubs */}
              {activeDomainTab === 'clubs' && (
                <ClubsSection
                  clubs={scoredClubs}
                  savedItemIds={studentProfile.feedback.savedItemIds}
                  interestedItemIds={studentProfile.feedback.interestedItemIds}
                  onToggleSave={handleToggleSave}
                  onToggleInterested={handleToggleInterested}
                  onOpenBreakdown={(scored) => setSelectedScoredOpp(scored)}
                  onJoinClub={(c) => handleOpenAction(c)}
                  onNavigate={handleNavigateTo}
                  onEditClub={handleOpenEditModal}
                  onAddNewClub={() => handleOpenAddModal('club')}
                />
              )}

              {/* Sub-tab: Events & Hackathons */}
              {activeDomainTab === 'events' && (
                <EventsSection
                  events={scoredEvents}
                  savedItemIds={studentProfile.feedback.savedItemIds}
                  interestedItemIds={studentProfile.feedback.interestedItemIds}
                  onToggleSave={handleToggleSave}
                  onToggleInterested={handleToggleInterested}
                  onOpenBreakdown={(scored) => setSelectedScoredOpp(scored)}
                  onRegisterEvent={(e) => handleOpenAction(e)}
                  onNavigate={handleNavigateTo}
                  onEditEvent={handleOpenEditModal}
                  onAddNewEvent={() => handleOpenAddModal('event')}
                />
              )}

              {/* Sub-tab: Research */}
              {activeDomainTab === 'research' && (
                <ResearchSection
                  researchList={scoredResearch}
                  savedItemIds={studentProfile.feedback.savedItemIds}
                  interestedItemIds={studentProfile.feedback.interestedItemIds}
                  onToggleSave={handleToggleSave}
                  onToggleInterested={handleToggleInterested}
                  onOpenBreakdown={(scored) => setSelectedScoredOpp(scored)}
                  onExploreResearch={(r) => handleOpenAction(r)}
                  onNavigate={handleNavigateTo}
                  onEditResearch={handleOpenEditModal}
                  onAddNewResearch={() => handleOpenAddModal('research')}
                />
              )}

              {/* Sub-tab: Mentors */}
              {activeDomainTab === 'mentors' && (
                <MentorsSection
                  mentors={scoredMentors}
                  savedItemIds={studentProfile.feedback.savedItemIds}
                  interestedItemIds={studentProfile.feedback.interestedItemIds}
                  onToggleSave={handleToggleSave}
                  onToggleInterested={handleToggleInterested}
                  onOpenBreakdown={(scored) => setSelectedScoredOpp(scored)}
                  onRequestMentorship={(m) => handleOpenAction(m)}
                  onNavigate={handleNavigateTo}
                  onEditMentor={handleOpenEditModal}
                  onAddNewMentor={() => handleOpenAddModal('mentor')}
                />
              )}

              {/* Sub-tab: Facilities & Labs */}
              {activeDomainTab === 'facilities' && (
                <FacilitiesSection
                  facilities={scoredFacilities}
                  savedItemIds={studentProfile.feedback.savedItemIds}
                  interestedItemIds={studentProfile.feedback.interestedItemIds}
                  onToggleSave={handleToggleSave}
                  onToggleInterested={handleToggleInterested}
                  onOpenBreakdown={(scored) => setSelectedScoredOpp(scored)}
                  onReserveFacility={(f) => handleOpenAction(f)}
                  onNavigate={handleNavigateTo}
                  onEditFacility={handleOpenEditModal}
                  onAddNewFacility={() => handleOpenAddModal('facility')}
                />
              )}

              {/* Sub-tab: Campus Pathway */}
              {activeDomainTab === 'pathway' && (
                <div className={`${theme === 'dark' ? 'bg-[#0C081A] border-purple-500/30' : 'bg-white border-slate-200'} rounded-2xl border p-6 sm:p-8 shadow-xl glow-border-purple`}>
                  <PathwaySection
                    pathway={campusPathway}
                    onNavigateOpportunity={(oppId) => {
                      const target = scoredOpportunities.find(s => s.opportunity.id === oppId);
                      if (target) setSelectedScoredOpp(target);
                    }}
                  />
                </div>
              )}

              {/* Sub-tab: Peers & Teams */}
              {activeDomainTab === 'peers' && (
                <PeerStudySection
                  peerGroups={scoredPeerGroups}
                  teams={scoredTeams}
                  student={studentProfile}
                  savedItemIds={studentProfile.feedback.savedItemIds}
                  interestedItemIds={studentProfile.feedback.interestedItemIds}
                  onToggleSave={handleToggleSave}
                  onToggleInterested={handleToggleInterested}
                  onOpenBreakdown={(scored) => setSelectedScoredOpp(scored)}
                  onRequestJoinGroup={(g) => handleOpenAction(g)}
                  onConnectTeam={(t) => handleOpenAction(t)}
                  onTogglePrivacy={handleTogglePrivacy}
                  onNavigate={handleNavigateTo}
                  onAddNewPeerGroup={() => handleOpenAddModal('peerGroup')}
                />
              )}
            </div>
          )}

          {/* VIEW: SORCERER ALLIANCE (PEERS & MENTORS) */}
          {activeMainView === 'peers' && (
            <div className="space-y-6">
              <div className="border-b border-purple-500/20 pb-4">
                <h2 className="text-2xl font-bold font-space text-white">
                  Sorcerer Alliance & Team Synergy
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Connect with complementary sorcerers for hackathons, research labs, and study circles.
                </p>
              </div>

              <PeerStudySection
                peerGroups={scoredPeerGroups}
                teams={scoredTeams}
                student={studentProfile}
                savedItemIds={studentProfile.feedback.savedItemIds}
                interestedItemIds={studentProfile.feedback.interestedItemIds}
                onToggleSave={handleToggleSave}
                onToggleInterested={handleToggleInterested}
                onOpenBreakdown={(scored) => setSelectedScoredOpp(scored)}
                onRequestJoinGroup={(g) => handleOpenAction(g)}
                onConnectTeam={(t) => handleOpenAction(t)}
                onTogglePrivacy={handleTogglePrivacy}
                onNavigate={handleNavigateTo}
                onAddNewPeerGroup={() => handleOpenAddModal('peerGroup')}
              />
            </div>
          )}

          {/* VIEW 4: CAMPUS QUESTS */}
          {activeMainView === 'quests' && (
            <QuestsView
              student={studentProfile}
              onCompleteQuestStep={handleCompleteQuestStep}
              onTriggerDomainExpansion={() => setIsDomainExpansionOpen(true)}
            />
          )}

          {/* VIEW 5: ACADEMICS & STUDY GUIDE */}
          {activeMainView === 'learn' && (
            <LearnView
              student={studentProfile}
            />
          )}

          {/* VIEW 6: FUTURE SELF SIMULATION 2028 */}
          {activeMainView === 'future' && (
            <FutureSelfView
              student={studentProfile}
              onTriggerDomainExpansion={() => setIsDomainExpansionOpen(true)}
            />
          )}

          {/* VIEW 7: CAMPUS MAP & GPS */}
          {activeMainView === 'map' && (
            <CampusMapView
              opportunities={campusOpportunities}
              onSelectOpportunityToNavigate={(opp) => handleNavigateTo(opp)}
              onOpenAddLocation={() => handleOpenAddModal('club')}
            />
          )}

          {/* VIEW 8: REAL-TIME DATA & IMAGE REPLACER */}
          {activeMainView === 'manager' && (
            <DataManagerView
              opportunities={campusOpportunities}
              student={studentProfile}
              onSaveOpportunity={handleSaveOpportunity}
              onDeleteOpportunity={handleDeleteOpportunity}
              onSaveStudentProfile={handleSaveProfile}
              onOpenAddModal={handleOpenAddModal}
              onOpenEditModal={handleOpenEditModal}
              onResetAllData={handleResetData}
              onOpenCampusMap={(opp) => {
                if (opp) setNavigatingOpp(opp);
                setIsCampusMapOpen(true);
              }}
            />
          )}

          {/* VIEW 9: PROJECT SYNC & TRANSFER HUB */}
          {activeMainView === 'sync' && (
            <SyncHubView
              student={studentProfile}
              opportunities={campusOpportunities}
              onImportFullState={handleImportFullState}
            />
          )}

        </main>

        {/* Global Footer */}
        <footer className={`border-t ${theme === 'dark' ? 'border-purple-500/20 bg-[#0C081A]' : 'border-slate-200 bg-white'} py-6 mt-12`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <span className="font-bold text-white font-space">EduTwin AI</span>
              <span>·</span>
              <span className="font-cinzel text-purple-300">呪術領域</span>
              <span>·</span>
              <span>Personalized Campus Sorcerer Mentor</span>
              <span>·</span>
              <span className="text-cyan-400 font-mono">
                {campusOpportunities.length} Active Nodes Loaded
              </span>
            </div>

            <div className="flex items-center gap-4 text-slate-400">
              <button
                onClick={() => handleOpenAddModal('club')}
                className="text-cyan-400 hover:text-cyan-300 font-mono font-semibold"
              >
                + Add Data
              </button>
              <span>·</span>
              <button
                onClick={() => setActiveMainView('sync')}
                className="text-purple-300 hover:text-purple-100 font-mono"
              >
                Multi-Laptop Sync
              </button>
              <span>·</span>
              <button
                onClick={handleResetData}
                className="text-slate-500 hover:text-rose-400 flex items-center gap-1 transition-colors font-mono"
                title="Reset all campus data to original defaults"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset Defaults</span>
              </button>
            </div>
          </div>
        </footer>
      </div>

      {/* 4. Global Modals & Interactive Overlays */}
      
      {/* 領域展開 Domain Expansion Overlay */}
      <DomainExpansionOverlay
        isOpen={isDomainExpansionOpen}
        onClose={() => setIsDomainExpansionOpen(false)}
        onCompleteExpansion={() => {
          setIsDomainExpansionOpen(false);
          // Recalibrate recommendations
          handleRunDiscoveryAnimation();
        }}
      />

      {/* Why Attend Modal */}
      <WhyAttendModal
        opportunity={whyAttendOpp}
        student={studentProfile}
        onClose={() => setWhyAttendOpp(null)}
        onActionClick={() => {
          if (whyAttendOpp) {
            handleOpenAction(whyAttendOpp);
            setWhyAttendOpp(null);
          }
        }}
        score={whyAttendScore}
      />

      {/* After Event Growth Logger Modal */}
      <AfterEventGrowthModal
        isOpen={isLogExperienceOpen}
        onClose={() => setIsLogExperienceOpen(false)}
        student={studentProfile}
        opportunities={campusOpportunities}
        onLogExperienceSuccess={handleLogExperienceSuccess}
      />

      {/* Campus GPS Map Navigation Modal */}
      <CampusNavigationModal
        opportunity={navigatingOpp}
        onClose={() => {
          setIsCampusMapOpen(false);
          setNavigatingOpp(null);
        }}
        allOpportunities={campusOpportunities}
        onSelectAnotherOpportunity={(opp) => setNavigatingOpp(opp)}
      />

      {/* Add / Edit Campus Opportunity Modal */}
      <AddEditOpportunityModal
        isOpen={isAddEditOppOpen}
        onClose={() => {
          setIsAddEditOppOpen(false);
          setEditingOpp(null);
        }}
        onSave={handleSaveOpportunity}
        onDelete={handleDeleteOpportunity}
        initialOpportunity={editingOpp}
        defaultType={defaultAddType}
      />

      {/* Match Breakdown Modal */}
      <MatchBreakdownModal
        scored={selectedScoredOpp}
        onClose={() => setSelectedScoredOpp(null)}
        onActionClick={() => {
          if (selectedScoredOpp) handleOpenAction(selectedScoredOpp.opportunity);
        }}
      />

      {/* Student DNA Editor Modal */}
      <EditProfileModal
        isOpen={isEditProfileOpen}
        onClose={() => setIsEditProfileOpen(false)}
        profile={studentProfile}
        onSave={handleSaveProfile}
      />

      {/* Domain Explorer Modal */}
      <DomainExplorerModal
        isOpen={isDomainExplorerOpen}
        onClose={() => setIsDomainExplorerOpen(false)}
        currentDomain={detectedDomainInfo.domain}
        onSelectDomainForPathway={(domain) => {
          setOverrideDomain(domain);
          setActiveMainView('campus');
          setActiveDomainTab('pathway');
        }}
      />

      {/* Domain Evolution Modal */}
      <DomainEvolutionModal
        isOpen={isDomainEvolutionOpen}
        onClose={() => setIsDomainEvolutionOpen(false)}
        student={studentProfile}
        onSimulateEvolution={(eventType) => {
          if (eventType === 'ai_course') {
            const updatedSkills = [...studentProfile.skills];
            const existing = updatedSkills.find(s => s.name === 'AI/ML');
            if (existing) existing.level = 'Advanced';
            else updatedSkills.push({ name: 'AI/ML', level: 'Advanced' });

            setStudentProfile({
              ...studentProfile,
              skills: updatedSkills,
              careerGoal: 'Research',
              campusInterests: Array.from(new Set([...studentProfile.campusInterests, 'Research', 'Paper Presentations'])),
              evolutionHistory: [
                {
                  timestamp: 'Just now',
                  previousDomain: detectedDomainInfo.domain,
                  newDomain: 'AI & Machine Learning',
                  reason: 'Completed Advanced Deep Learning Lab and shifted focus to academic research'
                },
                ...studentProfile.evolutionHistory
              ]
            });
          } else if (eventType === 'startup_pitch') {
            const updatedSkills = [...studentProfile.skills];
            const existingLead = updatedSkills.find(s => s.name === 'Leadership');
            if (existingLead) existingLead.level = 'Advanced';
            else updatedSkills.push({ name: 'Leadership', level: 'Advanced' });

            setStudentProfile({
              ...studentProfile,
              skills: updatedSkills,
              careerGoal: 'Startup',
              campusInterests: Array.from(new Set([...studentProfile.campusInterests, 'Entrepreneurship', 'Networking'])),
              evolutionHistory: [
                {
                  timestamp: 'Just now',
                  previousDomain: detectedDomainInfo.domain,
                  newDomain: 'Entrepreneurship & Innovation',
                  reason: 'Pitched early-stage prototype at Campus Incubator and committed to student venture track'
                },
                ...studentProfile.evolutionHistory
              ]
            });
          } else if (eventType === 'dsa_sprint') {
            const updatedSkills = [...studentProfile.skills];
            const existingJava = updatedSkills.find(s => s.name === 'Java');
            if (existingJava) existingJava.level = 'Advanced';
            else updatedSkills.push({ name: 'Java', level: 'Advanced' });

            setStudentProfile({
              ...studentProfile,
              skills: updatedSkills,
              careerGoal: 'Internship',
              campusInterests: Array.from(new Set([...studentProfile.campusInterests, 'Coding Competitions', 'Technical Clubs'])),
              evolutionHistory: [
                {
                  timestamp: 'Just now',
                  previousDomain: detectedDomainInfo.domain,
                  newDomain: 'Software Development',
                  reason: 'Achieved 200+ problem milestone in competitive programming sprints'
                },
                ...studentProfile.evolutionHistory
              ]
            });
          }
          setIsDomainEvolutionOpen(false);
        }}
      />

      {/* Action Feedback Modal */}
      <ActionFeedbackModal
        opportunity={activeActionOpp}
        onClose={() => setActiveActionOpp(null)}
        isSaved={activeActionOpp ? studentProfile.feedback.savedItemIds.includes(activeActionOpp.id) : false}
        onToggleSave={handleToggleSave}
        onConfirmAction={(oppId) => {
          handleToggleInterested(oppId);
        }}
      />
    </div>
  );
}
