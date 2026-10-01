import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Zap, Flame, Compass, ArrowRight, X } from 'lucide-react';

interface DomainExpansionOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onCompleteExpansion: () => void;
}

export const DomainExpansionOverlay: React.FC<DomainExpansionOverlayProps> = ({
  isOpen,
  onClose,
  onCompleteExpansion
}) => {
  const [phase, setPhase] = useState<'charging' | 'expanding' | 'manifested'>('charging');

  useEffect(() => {
    if (!isOpen) {
      setPhase('charging');
      return;
    }

    // Step 1: Charging (0 - 1.2s)
    const t1 = setTimeout(() => {
      setPhase('expanding');
    }, 1200);

    // Step 2: Expanding -> Manifested (1.2s - 2.8s)
    const t2 = setTimeout(() => {
      setPhase('manifested');
      // Fire Cursed Energy Confetti burst
      try {
        confetti({
          particleCount: 80,
          spread: 100,
          origin: { y: 0.6 },
          colors: ['#A855F7', '#7C3AED', '#22D3EE', '#F43F5E', '#FFFFFF']
        });
      } catch (e) {
        console.log(e);
      }
    }, 2800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#07070B]/95 backdrop-blur-md overflow-hidden select-none animate-in fade-in duration-300">
      {/* Cursed Energy Background Glow */}
      <div className="absolute inset-0 bg-radial from-purple-900/30 via-slate-950/80 to-[#07070B] pointer-events-none" />

      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 p-2 rounded-xl text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors z-30"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Rotating Concentric Domain Seals (SVG) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {/* Outer Ring */}
        <div className={`w-[600px] h-[600px] sm:w-[750px] sm:h-[750px] rounded-full border border-purple-500/20 animate-spin-slow flex items-center justify-center transition-all duration-1000 ${
          phase === 'manifested' ? 'scale-110 opacity-70 border-purple-500/40' : 'scale-90 opacity-40'
        }`}>
          {/* Middle Counter-Rotating Ring */}
          <div className="w-[450px] h-[450px] sm:w-[550px] sm:h-[550px] rounded-full border border-dashed border-cyan-400/30 animate-spin-slow-reverse flex items-center justify-center">
            {/* Inner Sacred Geometric Ring */}
            <div className="w-[300px] h-[300px] sm:w-[380px] sm:h-[380px] rounded-full border-2 border-purple-400/40 animate-spin-slow flex items-center justify-center">
              <div className="w-[180px] h-[180px] rounded-full border border-rose-500/30 animate-pulse-energy" />
            </div>
          </div>
        </div>
      </div>

      {/* Central Domain Expansion Typography & Content */}
      <div className="relative z-20 max-w-xl text-center space-y-6">
        {/* Kanji Seal */}
        <div className="space-y-1">
          <div className="text-[11px] font-mono uppercase tracking-[0.3em] text-cyan-400 font-bold glow-text-cyan flex items-center justify-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>SPECIAL GRADE INNATE TECHNIQUE</span>
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          </div>

          <h1 className="font-cinzel text-5xl sm:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-purple-200 via-purple-400 to-indigo-600 tracking-wider glow-text-purple py-2">
            領域展開
          </h1>

          <div className="font-space text-lg sm:text-xl font-bold uppercase tracking-widest text-slate-200">
            DOMAIN EXPANSION: INFINITE HORIZON
          </div>
        </div>

        {/* Phase Indicator / Narrative */}
        <div className="min-h-[70px] flex items-center justify-center">
          {phase === 'charging' && (
            <p className="text-sm font-mono text-purple-300 animate-pulse">
              [Phase 1] Channeling cursed energy into career trajectory nodes...
            </p>
          )}

          {phase === 'expanding' && (
            <p className="text-sm font-mono text-cyan-300 animate-pulse">
              [Phase 2] Expanding boundary barrier: Synthesizing hackathons, CGPA, and Tier-1 market indices...
            </p>
          )}

          {phase === 'manifested' && (
            <div className="space-y-1 animate-in zoom-in-95 duration-500">
              <p className="text-sm sm:text-base font-semibold text-emerald-300">
                ✨ Domain Successfully Manifested: 100% Guaranteed Hit Career Reality!
              </p>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                Your parameters and profile have successfully unlocked the 2028 Future Self trajectory simulator.
              </p>
            </div>
          )}
        </div>

        {/* Action Button once Manifested */}
        {phase === 'manifested' && (
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <button
              onClick={() => {
                onCompleteExpansion();
                onClose();
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 rounded-xl shadow-lg glow-cursed transition-all active:scale-98"
            >
              <span>Enter Future Self Simulator (2028)</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onClose}
              className="w-full sm:w-auto px-5 py-3 text-xs font-semibold text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 transition-colors"
            >
              Return to Campus
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
