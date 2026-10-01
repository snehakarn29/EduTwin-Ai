import React, { useState } from 'react';
import { StudentProfile, AcademicCourse } from '../types';
import { generateStudyGuideForWeakTopic } from '../services/aiService';
import { 
  BookOpen, 
  AlertTriangle, 
  CheckCircle2, 
  Sparkles, 
  Calculator, 
  FileText, 
  Clock, 
  BrainCircuit, 
  ArrowRight,
  X,
  Flame
} from 'lucide-react';

interface LearnViewProps {
  student: StudentProfile;
}

export const LearnView: React.FC<LearnViewProps> = ({ student }) => {
  // Attendance simulator states
  const [selectedCourseId, setSelectedCourseId] = useState<string>(student.courses[0]?.id || 'c1');
  const [futureAttendCount, setFutureAttendCount] = useState<number>(5);
  const [futureMissCount, setFutureMissCount] = useState<number>(0);

  // Study guide modal state
  const [activeStudyGuide, setActiveStudyGuide] = useState<{
    courseName: string;
    topicName: string;
    data: {
      conceptualExplanation: string;
      intuitiveAnalogy: string;
      practiceProblems: string[];
      examTips: string;
    };
  } | null>(null);
  const [generatingGuide, setGeneratingGuide] = useState<boolean>(false);

  const selectedCourse = student.courses.find(c => c.id === selectedCourseId) || student.courses[0];

  // Calculate projected attendance
  const simulatedTotal = (selectedCourse?.totalClasses || 25) + futureAttendCount + futureMissCount;
  const simulatedAttended = (selectedCourse?.attendedClasses || 20) + futureAttendCount;
  const simulatedPercent = simulatedTotal > 0 
    ? Math.round((simulatedAttended / simulatedTotal) * 100) 
    : 100;
  const isDanger = simulatedPercent < 75;

  const handleGenerateStudyGuide = async (courseName: string, topicName: string) => {
    setGeneratingGuide(true);
    try {
      const guideData = await generateStudyGuideForWeakTopic(courseName, topicName, 'Intermediate');
      setActiveStudyGuide({
        courseName,
        topicName,
        data: guideData
      });
    } catch (e) {
      console.error(e);
    } finally {
      setGeneratingGuide(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-purple-500/20 pb-4 gap-4">
        <div>
          <div className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Academic Guardian & Diagnostic Defense</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-space text-white mt-0.5">
            Semester Courses & Attendance Invariants
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            Monitor lecture attendance against the 75% threshold, diagnose curriculum weak points, and generate AI-grounded deep-dive study briefs.
          </p>
        </div>

        <div className="p-3 bg-purple-950/60 border border-purple-500/30 rounded-xl flex items-center gap-3 shrink-0">
          <div className="text-right">
            <div className="text-[11px] font-mono text-slate-400 uppercase">Overall Attendance</div>
            <div className={`text-base font-bold font-mono ${
              student.attendanceOverall < 75 ? 'text-rose-400' : 'text-emerald-400'
            }`}>
              {student.attendanceOverall}% Average
            </div>
          </div>
        </div>
      </div>

      {/* Course List & Attendance Simulator Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Enrolled Courses List (lg:col-span-7) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold font-space text-white">
              Enrolled Academic Courses ({student.courses.length})
            </h3>
            <span className="text-xs text-slate-400 font-mono">75% Cutoff Required</span>
          </div>

          <div className="space-y-3">
            {student.courses.map((course) => {
              const warning = course.currentAttendance < 75;
              const isSelected = course.id === selectedCourseId;

              return (
                <div
                  key={course.id}
                  onClick={() => setSelectedCourseId(course.id)}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#150F2E] border-purple-400/60 glow-border-purple'
                      : 'bg-[#0C081A] border-purple-500/20 hover:border-purple-500/40'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-purple-300 bg-purple-950/80 px-2 py-0.5 rounded border border-purple-500/30">
                          {course.code}
                        </span>
                        <span className="text-xs text-slate-400">{course.credits} Credits</span>
                      </div>
                      <h4 className="text-base font-bold text-white mt-1 leading-snug">
                        {course.name}
                      </h4>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Instructor: {course.instructor}
                      </p>
                    </div>

                    {/* Attendance Score */}
                    <div className="text-right shrink-0">
                      <div className={`text-xl font-bold font-mono ${
                        warning ? 'text-rose-400' : 'text-emerald-400'
                      }`}>
                        {course.currentAttendance}%
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono">
                        {course.attendedClasses} / {course.totalClasses} Classes
                      </div>
                    </div>
                  </div>

                  {/* Weak Topics Diagnostic */}
                  {course.weakTopics.length > 0 && (
                    <div className="mt-4 pt-3 border-t border-purple-500/10 space-y-2">
                      <div className="text-[11px] font-mono uppercase text-slate-400 flex items-center justify-between">
                        <span>Diagnostic Weak Topics:</span>
                        <span className="text-[10px] text-cyan-300">Click to study</span>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {course.weakTopics.map((topic, tIdx) => (
                          <button
                            key={tIdx}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleGenerateStudyGuide(course.name, topic);
                            }}
                            disabled={generatingGuide}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-slate-300 bg-slate-950/80 hover:bg-purple-950 border border-purple-500/20 hover:border-purple-400/50 rounded-lg transition-colors"
                          >
                            <Sparkles className="w-3 h-3 text-cyan-300" />
                            <span>{topic}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Interactive Attendance What-If Calculator (lg:col-span-5) */}
        <div className="lg:col-span-5 space-y-5">
          <div className="p-6 rounded-2xl bg-[#0C081A] border border-purple-500/30 space-y-5 glow-border-purple">
            <div className="flex items-center gap-2 text-sm font-bold font-space text-white uppercase tracking-wider">
              <Calculator className="w-4 h-4 text-cyan-300" />
              <span>Interactive Attendance What-If Calculator</span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Testing trajectory for: <strong className="text-purple-300">{selectedCourse?.name} ({selectedCourse?.code})</strong>
            </p>

            {/* Projected Gauge */}
            <div className={`p-4 rounded-xl border text-center space-y-1 ${
              isDanger 
                ? 'bg-rose-950/20 border-rose-500/40 glow-red' 
                : 'bg-emerald-950/20 border-emerald-500/40'
            }`}>
              <div className="text-[11px] font-mono uppercase text-slate-400">
                Projected Attendance Percentage
              </div>
              <div className={`text-4xl font-extrabold font-mono ${
                isDanger ? 'text-rose-400' : 'text-emerald-400'
              }`}>
                {simulatedPercent}%
              </div>
              <div className="text-xs font-medium text-slate-300">
                {isDanger 
                  ? '⚠️ Debarment Alert: Drops below 75% minimum!' 
                  : '✅ Safe Standing: Complies with university regulations'}
              </div>
            </div>

            {/* Sliders */}
            <div className="space-y-4 pt-2">
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono text-slate-300">
                  <span>If I attend next classes:</span>
                  <span className="font-bold text-emerald-400">+{futureAttendCount} classes</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="15"
                  value={futureAttendCount}
                  onChange={(e) => setFutureAttendCount(parseInt(e.target.value))}
                  className="w-full accent-emerald-400 cursor-pointer"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono text-slate-300">
                  <span>If I miss next classes:</span>
                  <span className="font-bold text-rose-400">-{futureMissCount} classes</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="10"
                  value={futureMissCount}
                  onChange={(e) => setFutureMissCount(parseInt(e.target.value))}
                  className="w-full accent-rose-400 cursor-pointer"
                />
              </div>
            </div>

            <div className="p-3 bg-slate-950/60 rounded-xl border border-purple-500/20 text-xs text-slate-400 space-y-1 font-mono">
              <div>Current: {selectedCourse?.attendedClasses} / {selectedCourse?.totalClasses} ({selectedCourse?.currentAttendance}%)</div>
              <div>Simulated: {simulatedAttended} / {simulatedTotal} ({simulatedPercent}%)</div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Study Guide Modal */}
      {activeStudyGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md select-none animate-in fade-in duration-200">
          <div className="bg-[#0C081A] border border-purple-500/30 glow-border-purple w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
            <div className="px-6 py-4 border-b border-purple-500/20 flex items-center justify-between bg-purple-950/20">
              <div className="flex items-center gap-2">
                <BrainCircuit className="w-5 h-5 text-cyan-300" />
                <div>
                  <div className="text-[11px] font-mono text-purple-400 uppercase">
                    AI Diagnostic Study Brief: {activeStudyGuide.courseName}
                  </div>
                  <h3 className="text-lg font-bold text-white">
                    Mastering {activeStudyGuide.topicName}
                  </h3>
                </div>
              </div>
              <button
                onClick={() => setActiveStudyGuide(null)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-5 text-xs text-slate-300 leading-relaxed">
              <div className="space-y-1.5">
                <h4 className="font-bold text-purple-300 uppercase tracking-wider text-[11px]">
                  Conceptual Breakdown
                </h4>
                <p className="p-3 bg-[#120D24] rounded-xl border border-purple-500/20 text-slate-200">
                  {activeStudyGuide.data.conceptualExplanation}
                </p>
              </div>

              <div className="space-y-1.5">
                <h4 className="font-bold text-cyan-300 uppercase tracking-wider text-[11px] flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-cyan-300" />
                  Intuitive Mental Model & Analogy
                </h4>
                <p className="p-3 bg-cyan-950/30 rounded-xl border border-cyan-500/20 text-cyan-100">
                  {activeStudyGuide.data.intuitiveAnalogy}
                </p>
              </div>

              <div className="space-y-1.5">
                <h4 className="font-bold text-emerald-400 uppercase tracking-wider text-[11px]">
                  High-Yield Practice Problems
                </h4>
                <ul className="space-y-2">
                  {activeStudyGuide.data.practiceProblems.map((prob, pIdx) => (
                    <li key={pIdx} className="p-2.5 bg-slate-950 rounded-lg border border-purple-500/10 font-mono text-[11px] text-slate-300">
                      {pIdx + 1}. {prob}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-3 bg-amber-950/30 rounded-xl border border-amber-500/20 text-amber-200">
                <strong className="text-amber-400">Exam Pitfalls & Tips: </strong>
                {activeStudyGuide.data.examTips}
              </div>
            </div>

            <div className="px-6 py-4 border-t border-purple-500/20 bg-purple-950/20 flex justify-end">
              <button
                onClick={() => setActiveStudyGuide(null)}
                className="px-5 py-2 text-xs font-bold text-white bg-purple-600 hover:bg-purple-500 rounded-lg shadow-md"
              >
                Understood & Close Brief
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
