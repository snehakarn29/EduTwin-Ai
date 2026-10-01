import React, { useState, useMemo } from 'react';
import { StudentProfile, FutureSelfSimulationParams, FutureSelfProjection, ChatMessage } from '../types';
import { chatWithFutureSelf } from '../services/aiService';
import { 
  Sparkles, 
  Send, 
  Sliders, 
  TrendingUp, 
  Award, 
  GraduationCap, 
  Flame, 
  Bot, 
  User, 
  Zap,
  ArrowRight
} from 'lucide-react';

interface FutureSelfViewProps {
  student: StudentProfile;
  onTriggerDomainExpansion: () => void;
}

export const FutureSelfView: React.FC<FutureSelfViewProps> = ({
  student,
  onTriggerDomainExpansion
}) => {
  // Trajectory Sliders
  const [params, setParams] = useState<FutureSelfSimulationParams>({
    studyHoursPerWeek: 16,
    hackathonsPerYear: 3,
    targetCgpa: student.academic.cgpa || 9.1
  });

  // Chat with Future Self state
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      sender: 'future_self',
      text: `Greetings from 2028! I am your graduated Special Grade Sorcerer self working at the cutting edge of ${student.skills[0]?.name || 'AI & Distributed Systems'}. Every line of code, late-night hackathon sprint, and paper breakdown you do right now directly molded our career domain. What would you like to ask me about your future?`,
      timestamp: '2028 Special Grade'
    }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Compute real-time projections based on parameters
  const projection: FutureSelfProjection = useMemo(() => {
    const { studyHoursPerWeek, hackathonsPerYear, targetCgpa } = params;

    // CTC projection
    const baseMin = 14 + (targetCgpa - 7.0) * 3 + hackathonsPerYear * 2.5 + (studyHoursPerWeek - 10) * 0.4;
    const minCtc = Math.max(12, Math.round(baseMin));
    const maxCtc = Math.max(minCtc + 8, Math.round(minCtc * 1.65));

    // Tier 1 probability
    const prob = Math.min(98, Math.max(45, Math.round(
      (targetCgpa * 5.5) + (hackathonsPerYear * 6) + (studyHoursPerWeek * 1.2)
    )));

    // Masters / Research Index
    const resIndex = Math.min(99, Math.max(40, Math.round(
      (targetCgpa * 6.5) + (studyHoursPerWeek * 1.4) + (student.careerGoal === 'Higher Studies' ? 10 : 0)
    )));

    // Skill Readiness Score
    const readiness = Math.min(99, Math.max(50, Math.round(
      60 + (hackathonsPerYear * 5) + (studyHoursPerWeek * 0.8)
    )));

    let archetypeTitle = 'High Discipline Sorcerer';
    let quote = 'Balanced high-velocity engineering trajectory with guaranteed top-tier placement.';
    if (minCtc >= 35) {
      archetypeTitle = 'Special Grade Domain Bearer';
      quote = 'Pinnacle engineering capability with national research and Silicon Valley fellowship readiness.';
    } else if (hackathonsPerYear >= 5) {
      archetypeTitle = 'Battle-Hardened Hackathon Champion';
      quote = 'Rapid prototyping speed and high-stakes tournament execution mastery.';
    }

    return {
      minCtcLpa: minCtc,
      maxCtcLpa: maxCtc,
      tier1InternshipProbability: prob,
      mastersResearchIndex: resIndex,
      skillReadinessScore: readiness,
      archetypeTitle,
      recommendationQuote: quote
    };
  }, [params, student]);

  // Predefined Trajectory Scenarios
  const handleSelectScenario = (type: 'baseline' | 'discipline' | 'special_grade' | 'optimal') => {
    switch (type) {
      case 'baseline':
        setParams({ studyHoursPerWeek: 10, hackathonsPerYear: 1, targetCgpa: 8.2 });
        break;
      case 'discipline':
        setParams({ studyHoursPerWeek: 18, hackathonsPerYear: 3, targetCgpa: 8.9 });
        break;
      case 'special_grade':
        setParams({ studyHoursPerWeek: 26, hackathonsPerYear: 5, targetCgpa: 9.6 });
        break;
      case 'optimal':
        setParams({ studyHoursPerWeek: 22, hackathonsPerYear: 4, targetCgpa: 9.3 });
        break;
    }
  };

  const handleSendMessage = async () => {
    if (!chatInput.trim() || isTyping) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: chatInput.trim(),
      timestamp: 'Just now'
    };

    setChatMessages(prev => [...prev, userMsg]);
    setChatInput('');
    setIsTyping(true);

    try {
      const replyText = await chatWithFutureSelf(student, userMsg.text, '2028');
      const futureReply: ChatMessage = {
        id: `f-${Date.now()}`,
        sender: 'future_self',
        text: replyText,
        timestamp: '2028 Self'
      };
      setChatMessages(prev => [...prev, futureReply]);
    } catch (e) {
      console.error(e);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-purple-500/20 pb-4 gap-4">
        <div>
          <div className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Temporal Projection & What-If Engine</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-space text-white mt-0.5">
            Future Self Simulator (Class of 2028)
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            Simulate your post-graduation career package, Tier-1 internship probability, and chat in real-time with your graduated 2028 self.
          </p>
        </div>

        {/* Big Domain Expansion Action */}
        <button
          onClick={onTriggerDomainExpansion}
          className="inline-flex items-center gap-2 px-6 py-3 text-xs sm:text-sm font-extrabold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 rounded-xl shadow-xl glow-cursed transition-all shrink-0 active:scale-98"
        >
          <Sparkles className="w-4 h-4 text-cyan-300 animate-spin" />
          <span className="font-cinzel tracking-wider">領域展開 — EXPAND DOMAIN</span>
        </button>
      </div>

      {/* Simulator Parameters & Real-Time Projections Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: What-If Parameter Sliders (lg:col-span-5) */}
        <div className="lg:col-span-5 p-6 rounded-2xl bg-[#0C081A] border border-purple-500/30 space-y-6 glow-border-purple">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold font-space uppercase tracking-wider text-white flex items-center gap-2">
              <Sliders className="w-4 h-4 text-purple-400" />
              <span>Input Simulation Parameters</span>
            </h3>
          </div>

          {/* Quick Scenario Buttons */}
          <div className="space-y-1.5">
            <div className="text-[11px] font-mono text-slate-400 uppercase">Predefined Scenarios:</div>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handleSelectScenario('baseline')}
                className="px-2.5 py-1.5 text-xs font-mono rounded-lg bg-slate-950 border border-purple-500/20 hover:border-purple-400 text-slate-300 hover:text-white transition-colors"
              >
                Baseline Flow
              </button>
              <button
                onClick={() => handleSelectScenario('discipline')}
                className="px-2.5 py-1.5 text-xs font-mono rounded-lg bg-slate-950 border border-purple-500/20 hover:border-purple-400 text-slate-300 hover:text-white transition-colors"
              >
                High Discipline
              </button>
              <button
                onClick={() => handleSelectScenario('special_grade')}
                className="px-2.5 py-1.5 text-xs font-mono rounded-lg bg-purple-950/60 border border-purple-500/40 hover:border-purple-300 text-cyan-300 font-bold transition-colors"
              >
                Special Grade Build
              </button>
              <button
                onClick={() => handleSelectScenario('optimal')}
                className="px-2.5 py-1.5 text-xs font-mono rounded-lg bg-slate-950 border border-purple-500/20 hover:border-purple-400 text-slate-300 hover:text-white transition-colors"
              >
                The Master Domain
              </button>
            </div>
          </div>

          {/* Sliders */}
          <div className="space-y-5 pt-2">
            {/* Study Hours */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-300">Weekly Deep Study Hours:</span>
                <span className="font-bold text-cyan-300">{params.studyHoursPerWeek} hrs/week</span>
              </div>
              <input
                type="range"
                min="5"
                max="30"
                value={params.studyHoursPerWeek}
                onChange={(e) => setParams({ ...params, studyHoursPerWeek: parseInt(e.target.value) })}
                className="w-full accent-cyan-400 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>5 hrs</span>
                <span>30 hrs</span>
              </div>
            </div>

            {/* Hackathons Per Year */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-300">Campus Hackathons / Projects:</span>
                <span className="font-bold text-purple-300">{params.hackathonsPerYear} / year</span>
              </div>
              <input
                type="range"
                min="0"
                max="6"
                value={params.hackathonsPerYear}
                onChange={(e) => setParams({ ...params, hackathonsPerYear: parseInt(e.target.value) })}
                className="w-full accent-purple-400 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>0</span>
                <span>6 / year</span>
              </div>
            </div>

            {/* Target CGPA */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-300">Maintained Target CGPA:</span>
                <span className="font-bold text-emerald-400">{params.targetCgpa.toFixed(1)} / 10.0</span>
              </div>
              <input
                type="range"
                min="7.0"
                max="10.0"
                step="0.1"
                value={params.targetCgpa}
                onChange={(e) => setParams({ ...params, targetCgpa: parseFloat(e.target.value) })}
                className="w-full accent-emerald-400 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>7.0</span>
                <span>10.0</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Projected 2028 Career Outcome Metrics (lg:col-span-7) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Main Hero Card: CTC Projection */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-950/40 via-[#150F2E] to-purple-950/40 border border-purple-400/40 glow-border-purple space-y-3">
            <div className="flex items-center justify-between text-xs font-mono uppercase text-purple-300">
              <span>Projected 2028 Career Package</span>
              <span className="bg-purple-600/30 border border-purple-400 px-2 py-0.5 rounded text-cyan-300 font-bold">
                {projection.archetypeTitle}
              </span>
            </div>

            <div className="text-3xl sm:text-5xl font-extrabold font-mono text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-purple-300 glow-text-cyan">
              ₹{projection.minCtcLpa} – {projection.maxCtcLpa} LPA
            </div>

            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              "{projection.recommendationQuote}"
            </p>
          </div>

          {/* Sub Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-4 rounded-xl bg-[#0C081A] border border-purple-500/20 space-y-1">
              <div className="text-[11px] font-mono uppercase text-slate-400">Tier-1 Internship</div>
              <div className="text-2xl font-bold font-mono text-emerald-400">
                {projection.tier1InternshipProbability}%
              </div>
              <div className="text-[10px] text-slate-500">FAANG & Top AI Labs</div>
            </div>

            <div className="p-4 rounded-xl bg-[#0C081A] border border-purple-500/20 space-y-1">
              <div className="text-[11px] font-mono uppercase text-slate-400">Research Index</div>
              <div className="text-2xl font-bold font-mono text-cyan-300">
                {projection.mastersResearchIndex}%
              </div>
              <div className="text-[10px] text-slate-500">MS/PhD Admission Strength</div>
            </div>

            <div className="p-4 rounded-xl bg-[#0C081A] border border-purple-500/20 space-y-1">
              <div className="text-[11px] font-mono uppercase text-slate-400">Skill Readiness</div>
              <div className="text-2xl font-bold font-mono text-purple-300">
                {projection.skillReadinessScore}%
              </div>
              <div className="text-[10px] text-slate-500">Industry Architecture Index</div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Conversational AI: Chat with Future Self (2028) */}
      <div className="p-6 rounded-2xl bg-[#0C081A] border border-purple-500/20 space-y-4">
        <div className="flex items-center justify-between border-b border-purple-500/20 pb-3">
          <div className="flex items-center gap-2">
            <Bot className="w-5 h-5 text-cyan-300" />
            <div>
              <h3 className="text-base font-bold font-space text-white">
                Temporal Cursed Line: Chat with Future Self (2028)
              </h3>
              <p className="text-xs text-slate-400">
                Communicate directly with your future self to gain retrospective advice, sanity checks, and milestone encouragement.
              </p>
            </div>
          </div>
        </div>

        {/* Message Thread */}
        <div className="space-y-3 max-h-[300px] overflow-y-auto p-2">
          {chatMessages.map((msg) => {
            const isSelf = msg.sender === 'future_self';

            return (
              <div
                key={msg.id}
                className={`flex gap-3 text-xs leading-relaxed ${
                  isSelf ? 'justify-start' : 'justify-end'
                }`}
              >
                {isSelf && (
                  <div className="w-7 h-7 rounded-lg bg-purple-600 flex items-center justify-center text-white shrink-0 shadow">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
                  </div>
                )}

                <div
                  className={`max-w-lg p-3 rounded-2xl ${
                    isSelf
                      ? 'bg-[#150F2E] border border-purple-500/30 text-purple-100'
                      : 'bg-indigo-600 text-white'
                  }`}
                >
                  <p>{msg.text}</p>
                  <span className="block text-[9px] font-mono opacity-60 mt-1">
                    {msg.timestamp}
                  </span>
                </div>

                {!isSelf && (
                  <div className="w-7 h-7 rounded-lg bg-slate-800 flex items-center justify-center text-white shrink-0">
                    <User className="w-3.5 h-3.5 text-slate-300" />
                  </div>
                )}
              </div>
            );
          })}

          {isTyping && (
            <div className="flex gap-3 text-xs text-purple-300 animate-pulse">
              <div className="w-7 h-7 rounded-lg bg-purple-600 flex items-center justify-center text-white">
                <Sparkles className="w-3.5 h-3.5" />
              </div>
              <div className="p-3 bg-[#150F2E] rounded-xl border border-purple-500/30">
                Your 2028 Future Self is channeling retrospective advice...
              </div>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="flex gap-2 pt-2">
          <input
            type="text"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') handleSendMessage(); }}
            placeholder="Ask your 2028 self about internships, burnout, CGPA, or specific projects..."
            className="flex-1 text-xs px-4 py-2.5 bg-slate-950 border border-purple-500/30 rounded-xl text-white focus:ring-1 focus:ring-purple-400 font-sans"
          />
          <button
            onClick={handleSendMessage}
            disabled={!chatInput.trim() || isTyping}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold text-white bg-purple-600 hover:bg-purple-500 rounded-xl shadow-md glow-cursed transition-colors disabled:opacity-50"
          >
            <span>Transmit</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
