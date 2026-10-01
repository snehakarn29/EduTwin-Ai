import React, { useState, useRef } from 'react';
import { 
  CampusOpportunity, 
  StudentProfile, 
  OpportunityType, 
  DomainCategory, 
  ProficiencyLevel, 
  CareerGoal,
  ClubOpportunity,
  EventOpportunity,
  FacilityOpportunity,
  MentorOpportunity
} from '../types';
import { 
  Database, 
  Plus, 
  Edit3, 
  Trash2, 
  Image as ImageIcon, 
  Upload, 
  Search, 
  Save, 
  RotateCcw, 
  User, 
  Building2, 
  Compass, 
  Check, 
  ExternalLink,
  Sparkles,
  Link,
  Layers,
  ArrowRight
} from 'lucide-react';

interface DataManagerViewProps {
  opportunities: CampusOpportunity[];
  student: StudentProfile;
  onSaveOpportunity: (opp: CampusOpportunity) => void;
  onDeleteOpportunity: (id: string) => void;
  onSaveStudentProfile: (profile: StudentProfile) => void;
  onOpenAddModal: (type: OpportunityType) => void;
  onOpenEditModal: (opp: CampusOpportunity) => void;
  onResetAllData: () => void;
  onOpenCampusMap: (opp?: CampusOpportunity) => void;
}

export const DataManagerView: React.FC<DataManagerViewProps> = ({
  opportunities,
  student,
  onSaveOpportunity,
  onDeleteOpportunity,
  onSaveStudentProfile,
  onOpenAddModal,
  onOpenEditModal,
  onResetAllData,
  onOpenCampusMap
}) => {
  const [activeTab, setActiveTab] = useState<'opportunities' | 'student_profile'>('opportunities');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Quick image replacement inline state
  const [quickImageOppId, setQuickImageOppId] = useState<string | null>(null);
  const [pastedImageUrl, setPastedImageUrl] = useState('');
  const [quickImageSuccess, setQuickImageSuccess] = useState(false);
  const quickFileInputRef = useRef<HTMLInputElement>(null);

  // Student Profile Quick Edit States
  const [studentName, setStudentName] = useState(student.name);
  const [studentTagline, setStudentTagline] = useState(student.tagline);
  const [studentAvatarUrl, setStudentAvatarUrl] = useState(student.avatarUrl || '');
  const [studentUniv, setStudentUniv] = useState(student.academic.university);
  const [studentDept, setStudentDept] = useState(student.academic.department);
  const [studentSemester, setStudentSemester] = useState(student.academic.yearSemester);
  const [studentCgpa, setStudentCgpa] = useState<number>(student.academic.cgpa || 9.1);
  const [studentAttendance, setStudentAttendance] = useState<number>(student.attendanceOverall || 85);
  const [studentXp, setStudentXp] = useState<number>(student.xp);
  const [studentLevel, setStudentLevel] = useState<number>(student.level);
  const [studentGoal, setStudentGoal] = useState<CareerGoal>(student.careerGoal);
  const [profileSaved, setProfileSaved] = useState(false);
  const studentAvatarFileInputRef = useRef<HTMLInputElement>(null);

  const filteredOpps = opportunities.filter(opp => {
    const matchesSearch = 
      opp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.organizer.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (!matchesSearch) return false;
    if (typeFilter === 'all') return true;
    return opp.type === typeFilter;
  });

  // Handle Quick Image Replacement for any Opportunity
  const handleApplyPastedImage = (opp: CampusOpportunity) => {
    if (!pastedImageUrl.trim()) return;
    const updatedOpp = {
      ...opp,
      imageUrl: pastedImageUrl.trim()
    };
    onSaveOpportunity(updatedOpp);
    setQuickImageSuccess(true);
    setTimeout(() => {
      setQuickImageSuccess(false);
      setQuickImageOppId(null);
      setPastedImageUrl('');
    }, 1200);
  };

  // Handle Local File Upload to replace opportunity image
  const handleOpportunityFileUpload = (opp: CampusOpportunity, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Data = reader.result as string;
        const updatedOpp = {
          ...opp,
          imageUrl: base64Data
        };
        onSaveOpportunity(updatedOpp);
        setQuickImageSuccess(true);
        setTimeout(() => {
          setQuickImageSuccess(false);
          setQuickImageOppId(null);
        }, 1200);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle Local File Upload for Student Avatar
  const handleStudentAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setStudentAvatarUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Save Student Profile changes
  const handleSaveStudentChanges = () => {
    const updatedProfile: StudentProfile = {
      ...student,
      name: studentName,
      tagline: studentTagline,
      avatarUrl: studentAvatarUrl,
      attendanceOverall: studentAttendance,
      xp: studentXp,
      level: studentLevel,
      careerGoal: studentGoal,
      academic: {
        ...student.academic,
        university: studentUniv,
        department: studentDept,
        yearSemester: studentSemester,
        cgpa: studentCgpa
      }
    };
    onSaveStudentProfile(updatedProfile);
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 2000);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-purple-500/20 pb-4 gap-4">
        <div>
          <div className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold flex items-center gap-1.5">
            <Database className="w-3.5 h-3.5" />
            <span>Real-Time Data Engine & Image Replacement Studio</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-space text-white mt-0.5">
            Campus Ecosystem & Student Data Manager
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            Add or alter any club, hackathon, lab, mentor, or student profile in real time. Paste custom image URLs or upload local images to instantly replace defaults.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onResetAllData}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-rose-300 bg-rose-950/40 hover:bg-rose-900/50 border border-rose-500/40 rounded-xl transition-colors shadow-xs"
            title="Reset data back to factory demo defaults"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>

          <button
            onClick={() => onOpenAddModal('club')}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-white bg-purple-600 hover:bg-purple-700 rounded-xl shadow-lg glow-cursed transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add New Item</span>
          </button>
        </div>
      </div>

      {/* Primary Section Switcher Tabs */}
      <div className="flex items-center gap-2 border-b border-purple-500/20 pb-3">
        <button
          onClick={() => setActiveTab('opportunities')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
            activeTab === 'opportunities'
              ? 'bg-purple-600 text-white shadow-md glow-cursed'
              : 'text-slate-400 hover:text-white bg-slate-900/50 border border-purple-500/20'
          }`}
        >
          <Building2 className="w-4 h-4" />
          <span>Clubs, Events & Facilities ({opportunities.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('student_profile')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
            activeTab === 'student_profile'
              ? 'bg-purple-600 text-white shadow-md glow-cursed'
              : 'text-slate-400 hover:text-white bg-slate-900/50 border border-purple-500/20'
          }`}
        >
          <User className="w-4 h-4" />
          <span>Student DNA & Sorcerer Profile</span>
        </button>
      </div>

      {/* TAB 1: CAMPUS OPPORTUNITIES & IMAGE REPLACER */}
      {activeTab === 'opportunities' && (
        <div className="space-y-6">
          {/* Filter Bar & Search */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#0C081A] p-4 rounded-2xl border border-purple-500/30 shadow-md">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by title, location or organizer..."
                className="w-full bg-[#07070B] border border-purple-500/30 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
              />
            </div>

            {/* Type Filter Buttons */}
            <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
              {['all', 'club', 'event', 'mentor', 'facility', 'research', 'peerGroup'].map((t) => (
                <button
                  key={t}
                  onClick={() => setTypeFilter(t)}
                  className={`text-[11px] font-mono px-3 py-1.5 rounded-lg border uppercase transition-all ${
                    typeFilter === t
                      ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 font-bold'
                      : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Grid of Opportunities with In-Place Image Replacer */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredOpps.map((opp) => {
              const isReplacingImage = quickImageOppId === opp.id;

              return (
                <div 
                  key={opp.id}
                  className="bg-[#0C081A] rounded-2xl border border-purple-500/30 p-5 shadow-xl flex flex-col justify-between hover:border-purple-500/60 transition-all group"
                >
                  <div className="space-y-4">
                    {/* Image Preview & Replace Header */}
                    <div className="relative aspect-16/9 rounded-xl overflow-hidden bg-[#07070B] border border-purple-500/30 group/img">
                      {opp.imageUrl ? (
                        <img
                          src={opp.imageUrl}
                          alt={opp.title}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover/img:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-slate-500 text-xs font-mono">
                          <ImageIcon className="w-8 h-8 text-purple-400/50 mb-1" />
                          <span>No Image Set</span>
                        </div>
                      )}

                      {/* Replace Image Button Overlay */}
                      <button
                        onClick={() => {
                          setQuickImageOppId(isReplacingImage ? null : opp.id);
                          setPastedImageUrl(opp.imageUrl || '');
                        }}
                        className="absolute bottom-2 right-2 bg-slate-950/80 hover:bg-purple-600 text-white px-2.5 py-1 rounded-lg text-[11px] font-mono font-semibold border border-purple-500/40 backdrop-blur-xs flex items-center gap-1 shadow-md transition-all"
                        title="Click to replace this image with your own"
                      >
                        <ImageIcon className="w-3.5 h-3.5 text-cyan-300" />
                        <span>Replace Image</span>
                      </button>

                      {/* Type Badge */}
                      <div className="absolute top-2 left-2 bg-[#07070B]/80 backdrop-blur-xs border border-purple-500/40 px-2 py-0.5 rounded text-[10px] font-mono font-bold text-cyan-300 uppercase">
                        {opp.type}
                      </div>
                    </div>

                    {/* Inline Image Replacer Box */}
                    {isReplacingImage && (
                      <div className="p-3 bg-purple-950/50 border border-cyan-400/40 rounded-xl space-y-2 animate-in fade-in duration-200">
                        <div className="text-[11px] font-mono font-bold text-cyan-300 flex items-center justify-between">
                          <span>Replace Image for this item:</span>
                          <button
                            onClick={() => setQuickImageOppId(null)}
                            className="text-slate-400 hover:text-white text-xs"
                          >
                            ✕
                          </button>
                        </div>

                        {/* Paste URL */}
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={pastedImageUrl}
                            onChange={(e) => setPastedImageUrl(e.target.value)}
                            placeholder="Paste image link (https://...)"
                            className="flex-1 bg-[#07070B] border border-purple-500/40 rounded-lg px-2.5 py-1 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-mono"
                          />
                          <button
                            onClick={() => handleApplyPastedImage(opp)}
                            className="px-2.5 py-1 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded-lg transition-colors shrink-0"
                          >
                            Save
                          </button>
                        </div>

                        {/* OR Upload file */}
                        <div className="flex items-center justify-between pt-1">
                          <span className="text-[10px] text-slate-400">or upload from device:</span>
                          <label className="cursor-pointer inline-flex items-center gap-1 text-[11px] text-purple-300 hover:text-purple-100 font-mono">
                            <Upload className="w-3 h-3" />
                            <span>Browse File</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => handleOpportunityFileUpload(opp, e)}
                            />
                          </label>
                        </div>

                        {quickImageSuccess && (
                          <div className="text-[11px] text-emerald-400 font-mono flex items-center gap-1">
                            <Check className="w-3.5 h-3.5" />
                            <span>Image replaced successfully!</span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Opportunity Info */}
                    <div className="space-y-1">
                      <h4 className="text-base font-bold font-space text-white line-clamp-1 group-hover:text-purple-300 transition-colors">
                        {opp.title}
                      </h4>
                      <p className="text-xs text-slate-400 line-clamp-2">
                        {opp.shortDescription}
                      </p>
                    </div>

                    {/* Location Specs */}
                    <div className="text-[11px] font-mono text-purple-300/90 flex items-center gap-1.5 pt-1">
                      <Building2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span className="truncate">{opp.location}</span>
                    </div>

                    {/* Navigation Route Indicator */}
                    {opp.navigation && (
                      <div className="bg-slate-900/60 p-2 rounded-lg border border-purple-500/20 text-[11px] font-mono text-slate-400 flex items-center justify-between">
                        <span className="truncate">
                          Floor: <strong className="text-cyan-300">{opp.navigation.floor}</strong> • {opp.navigation.room}
                        </span>
                        <button
                          onClick={() => onOpenCampusMap(opp)}
                          className="text-cyan-400 hover:text-cyan-300 flex items-center gap-0.5 text-[10px]"
                          title="View on Campus Map"
                        >
                          <Compass className="w-3 h-3" />
                          <span>Map</span>
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Actions Bar */}
                  <div className="flex items-center justify-between pt-4 mt-4 border-t border-purple-500/20">
                    <button
                      onClick={() => onOpenEditModal(opp)}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-cyan-400 hover:text-cyan-300 font-mono transition-colors"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Edit All Details</span>
                    </button>

                    <button
                      onClick={() => {
                        if (confirm(`Delete "${opp.title}"?`)) {
                          onDeleteOpportunity(opp.id);
                        }
                      }}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-950/30 transition-colors"
                      title="Delete this opportunity"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: STUDENT DNA & PROFILE REAL-TIME MANAGER */}
      {activeTab === 'student_profile' && (
        <div className="bg-[#0C081A] rounded-2xl border border-purple-500/30 p-6 sm:p-8 shadow-2xl space-y-6 glow-border-purple">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-purple-500/20 pb-4">
            <div>
              <h3 className="text-xl font-bold font-space text-white">
                Live Student Profile & Innate Technique DNA
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Every modification here instantly recalibrates domain classification, match percentages, and learning pathways.
              </p>
            </div>

            <button
              onClick={handleSaveStudentChanges}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-mono font-bold text-xs rounded-xl shadow-lg glow-cursed transition-all"
            >
              {profileSaved ? <Check className="w-4 h-4 text-emerald-400" /> : <Save className="w-4 h-4" />}
              <span>{profileSaved ? 'Profile Updated Live!' : 'Save Student DNA'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Left Column: Avatar & Sorcerer Badges (4 cols) */}
            <div className="md:col-span-4 space-y-6">
              <div className="bg-[#07070B] p-5 rounded-2xl border border-purple-500/30 flex flex-col items-center text-center space-y-4">
                <div className="relative w-28 h-28 rounded-2xl overflow-hidden bg-purple-950 border-2 border-purple-400/50 shadow-xl glow-cursed">
                  {studentAvatarUrl ? (
                    <img
                      src={studentAvatarUrl}
                      alt={studentName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center font-bold text-3xl text-purple-200">
                      {student.avatarInitials}
                    </div>
                  )}
                </div>

                <div className="w-full space-y-2">
                  <label className="text-[11px] font-mono text-slate-400 block text-left">
                    Avatar Image URL (or upload below):
                  </label>
                  <input
                    type="text"
                    value={studentAvatarUrl}
                    onChange={(e) => setStudentAvatarUrl(e.target.value)}
                    placeholder="https://..."
                    className="w-full bg-[#0C081A] border border-purple-500/30 rounded-xl px-3 py-1.5 text-xs text-white font-mono placeholder-slate-600 focus:outline-none focus:border-cyan-400"
                  />

                  <label className="cursor-pointer w-full py-2 bg-purple-950/60 hover:bg-purple-900/60 border border-purple-500/40 rounded-xl text-xs font-mono text-purple-200 flex items-center justify-center gap-1.5 transition-colors">
                    <Upload className="w-3.5 h-3.5 text-cyan-300" />
                    <span>Upload Local Photo</span>
                    <input
                      ref={studentAvatarFileInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleStudentAvatarUpload}
                    />
                  </label>
                </div>

                <div className="w-full pt-3 border-t border-purple-500/20 text-left space-y-2">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-400">Sorcerer Grade:</span>
                    <span className="text-cyan-300 font-bold">{student.sorcererGrade}</span>
                  </div>
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-400">Level:</span>
                    <span className="text-purple-300 font-bold">Lv.{studentLevel}</span>
                  </div>
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-400">Total XP:</span>
                    <span className="text-emerald-400 font-bold">{studentXp} XP</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Profile Fields (8 cols) */}
            <div className="md:col-span-8 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-mono text-slate-300 block mb-1">Full Student Name</label>
                  <input
                    type="text"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    className="w-full bg-[#07070B] border border-purple-500/30 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400 font-space"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono text-slate-300 block mb-1">Career Goal Focus</label>
                  <select
                    value={studentGoal}
                    onChange={(e) => setStudentGoal(e.target.value as CareerGoal)}
                    className="w-full bg-[#07070B] border border-purple-500/30 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400 font-mono"
                  >
                    {['Internship', 'Placement', 'Higher Studies', 'Research', 'Startup', 'Still Exploring'].map(g => (
                      <option key={g} value={g}>{g}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-mono text-slate-300 block mb-1">Sorcerer Tagline / Headline</label>
                <input
                  type="text"
                  value={studentTagline}
                  onChange={(e) => setStudentTagline(e.target.value)}
                  className="w-full bg-[#07070B] border border-purple-500/30 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-mono text-slate-300 block mb-1">University / Institute</label>
                  <input
                    type="text"
                    value={studentUniv}
                    onChange={(e) => setStudentUniv(e.target.value)}
                    className="w-full bg-[#07070B] border border-purple-500/30 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono text-slate-300 block mb-1">Department / Branch</label>
                  <input
                    type="text"
                    value={studentDept}
                    onChange={(e) => setStudentDept(e.target.value)}
                    className="w-full bg-[#07070B] border border-purple-500/30 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono text-slate-300 block mb-1">Year & Semester</label>
                  <input
                    type="text"
                    value={studentSemester}
                    onChange={(e) => setStudentSemester(e.target.value)}
                    className="w-full bg-[#07070B] border border-purple-500/30 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-mono text-slate-300 block mb-1">Cumulative CGPA (0-10)</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    max="10"
                    value={studentCgpa}
                    onChange={(e) => setStudentCgpa(parseFloat(e.target.value) || 0)}
                    className="w-full bg-[#07070B] border border-purple-500/30 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400 font-mono"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono text-slate-300 block mb-1">Overall Attendance %</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={studentAttendance}
                    onChange={(e) => setStudentAttendance(parseFloat(e.target.value) || 0)}
                    className="w-full bg-[#07070B] border border-purple-500/30 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400 font-mono"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono text-slate-300 block mb-1">Sorcerer Level</label>
                  <input
                    type="number"
                    min="1"
                    max="50"
                    value={studentLevel}
                    onChange={(e) => setStudentLevel(parseInt(e.target.value) || 1)}
                    className="w-full bg-[#07070B] border border-purple-500/30 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400 font-mono"
                  />
                </div>
              </div>

              {/* Skills Tags Preview */}
              <div className="pt-2">
                <label className="text-xs font-mono text-slate-300 block mb-1.5">
                  Current Skills Matrix ({student.skills.length} skills):
                </label>
                <div className="flex flex-wrap gap-2">
                  {student.skills.map((s, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-purple-950/60 border border-purple-500/30 text-xs font-mono text-purple-200 flex items-center gap-1.5"
                    >
                      <span>{s.name}</span>
                      <span className="text-[10px] text-cyan-300 font-bold bg-[#07070B] px-1 rounded">
                        {s.level}
                      </span>
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  onClick={handleSaveStudentChanges}
                  className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-mono font-bold text-xs rounded-xl shadow-lg glow-cursed flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  <span>Update Student DNA in Real Time</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
