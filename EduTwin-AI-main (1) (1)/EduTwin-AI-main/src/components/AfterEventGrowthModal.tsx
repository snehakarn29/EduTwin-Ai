import React, { useState } from 'react';
import { StudentProfile, CampusOpportunity } from '../types';
import { generateExperienceResumeAndLinkedIn } from '../services/aiService';
import confetti from 'canvas-confetti';
import { 
  X, 
  Sparkles, 
  Award, 
  Copy, 
  Check, 
  FileText, 
  Share2, 
  ArrowRight,
  Plus
} from 'lucide-react';

interface AfterEventGrowthModalProps {
  isOpen: boolean;
  onClose: () => void;
  student: StudentProfile;
  opportunities: CampusOpportunity[];
  onLogExperienceSuccess: (xpGained: number, newSkills: string[]) => void;
}

export const AfterEventGrowthModal: React.FC<AfterEventGrowthModalProps> = ({
  isOpen,
  onClose,
  student,
  opportunities,
  onLogExperienceSuccess
}) => {
  const [eventName, setEventName] = useState(opportunities[0]?.title || 'Apex AI Innovation Hackathon');
  const [role, setRole] = useState('Lead ML Engineer');
  const [achievement, setAchievement] = useState('Finalist Top 5 & Built Live Vision Model');
  const [generating, setGenerating] = useState(false);
  
  const [result, setResult] = useState<{
    resumeBullet: string;
    linkedinPost: string;
    newSkillsSuggested: string[];
  } | null>(null);

  const [copiedResume, setCopiedResume] = useState(false);
  const [copiedLinkedIn, setCopiedLinkedIn] = useState(false);

  if (!isOpen) return null;

  const handleGenerateAndClaim = async () => {
    setGenerating(true);
    try {
      const generated = await generateExperienceResumeAndLinkedIn(
        student,
        eventName,
        role,
        [achievement]
      );
      setResult(generated);

      // Award XP & Confetti Celebration
      confetti({
        particleCount: 60,
        spread: 80,
        origin: { y: 0.7 },
        colors: ['#A855F7', '#22D3EE', '#F43F5E']
      });

      onLogExperienceSuccess(250, generated.newSkillsSuggested);
    } catch (e) {
      console.error(e);
    } finally {
      setGenerating(false);
    }
  };

  const copyToClipboard = (text: string, type: 'resume' | 'linkedin') => {
    navigator.clipboard.writeText(text);
    if (type === 'resume') {
      setCopiedResume(true);
      setTimeout(() => setCopiedResume(false), 2000);
    } else {
      setCopiedLinkedIn(true);
      setTimeout(() => setCopiedLinkedIn(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md select-none animate-in fade-in duration-200">
      <div className="bg-[#0C081A] border border-purple-500/30 glow-border-purple w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-purple-500/20 flex items-center justify-between bg-purple-950/20">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center text-white shadow-xs">
              <Award className="w-4 h-4 text-cyan-300" />
            </div>
            <div>
              <div className="text-[11px] font-mono uppercase tracking-wider text-purple-400 font-bold">
                Experience Transmutation Forge
              </div>
              <h2 className="text-lg font-bold text-white">
                Turn Campus Experience Into Career Growth
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-5">
          {!result ? (
            <div className="space-y-4">
              <p className="text-xs text-slate-400 leading-relaxed">
                Log a completed hackathon, workshop, club project, or research paper. Our Cursed Energy Forge will award you <strong>+250 XP</strong>, synthesize ATS-ready resume bullet points, and draft a high-converting LinkedIn post.
              </p>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Campus Opportunity Name
                </label>
                <input
                  type="text"
                  value={eventName}
                  onChange={(e) => setEventName(e.target.value)}
                  placeholder="e.g. Apex AI Innovation Hackathon"
                  className="w-full text-xs px-3 py-2 bg-slate-900 border border-purple-500/30 rounded-lg text-white focus:ring-1 focus:ring-purple-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Your Role / Contribution
                  </label>
                  <input
                    type="text"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="e.g. Lead ML Engineer / Backend Builder"
                    className="w-full text-xs px-3 py-2 bg-slate-900 border border-purple-500/30 rounded-lg text-white focus:ring-1 focus:ring-purple-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Key Outcome / Milestone
                  </label>
                  <input
                    type="text"
                    value={achievement}
                    onChange={(e) => setAchievement(e.target.value)}
                    placeholder="e.g. Built real-time vision classifier, 1st runner up"
                    className="w-full text-xs px-3 py-2 bg-slate-900 border border-purple-500/30 rounded-lg text-white focus:ring-1 focus:ring-purple-400"
                  />
                </div>
              </div>

              <div className="p-3 bg-purple-950/40 border border-purple-500/20 rounded-xl text-xs text-purple-300 flex items-center justify-between">
                <span>Reward upon claiming:</span>
                <span className="font-mono font-bold text-cyan-300">+250 Sorcerer XP & DNA Calibration</span>
              </div>
            </div>
          ) : (
            <div className="space-y-4 animate-in fade-in zoom-in-95 duration-200">
              <div className="p-3.5 bg-emerald-950/40 border border-emerald-500/30 rounded-xl text-xs text-emerald-300 flex items-center justify-between font-mono">
                <span>✨ Experience Transmuted (+250 XP Awarded!)</span>
                <span className="font-bold">Leveling Up</span>
              </div>

              {/* Resume Bullet */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-400">
                  <span className="flex items-center gap-1.5 text-purple-400">
                    <FileText className="w-3.5 h-3.5" />
                    ATS Resume Bullet Point (Google XYZ Format)
                  </span>
                  <button
                    onClick={() => copyToClipboard(result.resumeBullet, 'resume')}
                    className="text-[11px] text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-mono"
                  >
                    {copiedResume ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedResume ? 'Copied!' : 'Copy'}</span>
                  </button>
                </div>
                <div className="p-3 bg-slate-950 border border-purple-500/20 rounded-xl text-xs font-mono text-purple-200 leading-relaxed">
                  • {result.resumeBullet}
                </div>
              </div>

              {/* LinkedIn Announcement */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-400">
                  <span className="flex items-center gap-1.5 text-cyan-400">
                    <Share2 className="w-3.5 h-3.5" />
                    LinkedIn Post Draft
                  </span>
                  <button
                    onClick={() => copyToClipboard(result.linkedinPost, 'linkedin')}
                    className="text-[11px] text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-mono"
                  >
                    {copiedLinkedIn ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedLinkedIn ? 'Copied!' : 'Copy'}</span>
                  </button>
                </div>
                <textarea
                  readOnly
                  rows={4}
                  value={result.linkedinPost}
                  className="w-full p-3 bg-slate-950 border border-cyan-500/20 rounded-xl text-xs text-slate-300 leading-relaxed font-sans resize-none"
                />
              </div>

              {/* Unlocked Skills */}
              <div className="space-y-1.5 pt-2 border-t border-purple-500/20">
                <div className="text-xs font-semibold text-slate-400 uppercase">
                  Skills Permanently Integrated into Student DNA:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {result.newSkillsSuggested.map((skill, sIdx) => (
                    <span key={sIdx} className="text-xs font-mono font-medium text-emerald-300 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded-md">
                      + {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-purple-500/20 bg-purple-950/20 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white rounded-lg transition-colors"
          >
            {result ? 'Done' : 'Cancel'}
          </button>

          {!result ? (
            <button
              onClick={handleGenerateAndClaim}
              disabled={generating}
              className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 rounded-lg shadow-md glow-cursed transition-all disabled:opacity-50"
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
              <span>{generating ? 'Transmuting Experience...' : 'Transmute & Claim +250 XP'}</span>
            </button>
          ) : (
            <button
              onClick={onClose}
              className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg shadow-md transition-colors"
            >
              <span>Saved to EduTwin Profile</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
