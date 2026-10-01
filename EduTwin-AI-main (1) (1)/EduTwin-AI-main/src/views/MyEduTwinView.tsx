import React, { useState } from 'react';
import { StudentProfile, ProficiencyLevel } from '../types';
import { 
  Sparkles, 
  User, 
  BrainCircuit, 
  CheckCircle2, 
  AlertCircle, 
  SlidersHorizontal, 
  Target, 
  BookOpen, 
  Award, 
  Flame,
  ArrowRight
} from 'lucide-react';

interface MyEduTwinViewProps {
  student: StudentProfile;
  onOpenEditProfile: () => void;
  onTriggerDomainExpansion: () => void;
}

export const MyEduTwinView: React.FC<MyEduTwinViewProps> = ({
  student,
  onOpenEditProfile,
  onTriggerDomainExpansion
}) => {
  const [skillCategory, setSkillCategory] = useState<'All' | 'Programming' | 'Development' | 'Emerging Tech' | 'Core'>('All');

  const filteredSkills = student.skills.filter(s => {
    if (skillCategory === 'All') return true;
    return s.category === skillCategory;
  });

  const getProficiencyBadge = (level: ProficiencyLevel) => {
    switch (level) {
      case 'Advanced':
        return <span className="font-mono text-[10px] font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-500/40 px-2 py-0.5 rounded">Advanced</span>;
      case 'Intermediate':
        return <span className="font-mono text-[10px] font-bold text-cyan-300 bg-cyan-950/60 border border-cyan-500/40 px-2 py-0.5 rounded">Intermediate</span>;
      default:
        return <span className="font-mono text-[10px] font-bold text-purple-300 bg-purple-950/60 border border-purple-500/40 px-2 py-0.5 rounded">Beginner</span>;
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-purple-500/20 pb-4 gap-4">
        <div>
          <div className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold flex items-center gap-1.5">
            <BrainCircuit className="w-3.5 h-3.5" />
            <span>AI Student Digital Twin Model</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-space text-white mt-0.5">
            Student DNA & Innate Technique Matrix
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            A real-time vector representation of your academic mastery, technical proficiencies, learning ergonomics, and career trajectory.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenEditProfile}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-purple-600 hover:bg-purple-500 rounded-xl shadow-md glow-cursed transition-colors"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Recalibrate Twin DNA</span>
          </button>
        </div>
      </div>

      {/* Grid: Twin Profile Card & DNA Core */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Twin Identity & Status (lg:col-span-4) */}
        <div className="lg:col-span-4 p-6 rounded-2xl bg-[#0C081A] border border-purple-500/30 space-y-5 glow-border-purple">
          <div className="flex flex-col items-center text-center space-y-3">
            <div className="relative w-24 h-24 rounded-2xl overflow-hidden bg-purple-950 border-2 border-purple-400/60 shadow-xl glow-cursed">
              {student.avatarUrl ? (
                <img
                  src={student.avatarUrl}
                  alt={student.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center font-bold text-3xl text-purple-200">
                  {student.avatarInitials}
                </div>
              )}
            </div>

            <div>
              <div className="text-xs font-mono font-bold text-cyan-300 uppercase tracking-widest">
                {student.sorcererGrade}
              </div>
              <h3 className="text-xl font-bold font-space text-white">
                {student.name}
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                {student.academic.department} · {student.academic.yearSemester}
              </p>
            </div>
          </div>

          <div className="p-3.5 bg-slate-950/70 rounded-xl border border-purple-500/20 text-xs space-y-2">
            <div className="flex items-center justify-between text-slate-300">
              <span className="text-slate-400">University:</span>
              <span className="font-semibold text-white">{student.academic.university}</span>
            </div>
            <div className="flex items-center justify-between text-slate-300">
              <span className="text-slate-400">Cumulative CGPA:</span>
              <span className="font-mono font-bold text-cyan-300">{student.academic.cgpa?.toFixed(2) || '9.15'}</span>
            </div>
            <div className="flex items-center justify-between text-slate-300">
              <span className="text-slate-400">Primary Career Goal:</span>
              <span className="font-semibold text-purple-300">{student.careerGoal}</span>
            </div>
            <div className="flex items-center justify-between text-slate-300">
              <span className="text-slate-400">Overall Attendance:</span>
              <span className="font-mono text-emerald-400">{student.attendanceOverall}%</span>
            </div>
          </div>

          <button
            onClick={onTriggerDomainExpansion}
            className="w-full py-2.5 px-4 text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 rounded-xl shadow-md glow-cursed transition-all"
          >
            Initiate Domain Expansion
          </button>
        </div>

        {/* Right: Detailed DNA Signals & Learning Ergonomics (lg:col-span-8) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Strengths & Weaknesses Breakdown */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Strengths */}
            <div className="p-5 rounded-xl bg-[#0C081A] border border-emerald-500/30 space-y-2">
              <div className="text-xs font-mono uppercase text-emerald-400 font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Verified Subject Strengths</span>
              </div>
              <ul className="text-xs text-slate-300 space-y-1.5 pt-1">
                {student.academic.subjectsStrength.map((s, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Areas for Improvement */}
            <div className="p-5 rounded-xl bg-[#0C081A] border border-rose-500/30 space-y-2">
              <div className="text-xs font-mono uppercase text-rose-400 font-bold flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-rose-400" />
                <span>Diagnostic Areas for Improvement</span>
              </div>
              <ul className="text-xs text-slate-300 space-y-1.5 pt-1">
                {student.academic.subjectsImprovement.map((s, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Learning Preferences & Campus Interests */}
          <div className="p-5 rounded-xl bg-[#0C081A] border border-purple-500/20 space-y-3">
            <div className="text-xs font-mono uppercase text-purple-400 font-bold flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-cyan-400" />
              <span>Learning Preferences & Ergonomics</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {student.learningPreferences.map((pref, idx) => (
                <span key={idx} className="text-xs font-mono font-medium text-slate-300 bg-slate-900 border border-purple-500/30 px-3 py-1 rounded-lg">
                  ✓ {pref}
                </span>
              ))}
            </div>

            <div className="pt-2 border-t border-purple-500/10 flex flex-wrap items-center gap-1.5 text-xs text-slate-400">
              <span className="font-semibold text-slate-300">Campus Extracurricular Interests: </span>
              {student.campusInterests.map((interest, i) => (
                <span key={i} className="text-purple-300 bg-purple-950/40 px-2 py-0.5 rounded text-[11px]">
                  {interest}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 3. Interactive Skills Matrix with Category Filters */}
      <div className="p-6 rounded-2xl bg-[#0C081A] border border-purple-500/20 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-purple-500/20 pb-4">
          <div>
            <h3 className="text-lg font-bold font-space text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-purple-400" />
              <span>Innate Technique Skills Matrix</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Technical proficiencies evaluated against university curriculum and industry benchmark curves.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-purple-500/20 text-xs">
            {(['All', 'Programming', 'Development', 'Emerging Tech', 'Core'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setSkillCategory(cat)}
                className={`px-3 py-1 rounded-md font-medium transition-colors ${
                  skillCategory === cat
                    ? 'bg-purple-600 text-white font-bold shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filteredSkills.map((skill) => (
            <div
              key={skill.name}
              className="p-3.5 rounded-xl bg-slate-950/60 border border-purple-500/20 hover:border-purple-400/40 transition-colors flex items-center justify-between"
            >
              <div>
                <div className="font-semibold text-sm text-slate-200">{skill.name}</div>
                <div className="text-[11px] text-slate-500">{skill.category || 'Core Skill'}</div>
              </div>
              <div>{getProficiencyBadge(skill.level)}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
