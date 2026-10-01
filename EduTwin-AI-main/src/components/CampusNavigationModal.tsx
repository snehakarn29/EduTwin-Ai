import React, { useState } from 'react';
import { CampusOpportunity, NavigationGuide } from '../types';
import { 
  X, 
  MapPin, 
  Navigation, 
  Clock, 
  User, 
  Building2, 
  Footprints, 
  Compass, 
  Copy, 
  Check, 
  ExternalLink,
  Layers
} from 'lucide-react';

interface CampusNavigationModalProps {
  opportunity: CampusOpportunity | null;
  onClose: () => void;
  allOpportunities?: CampusOpportunity[];
  onSelectAnotherOpportunity?: (opp: CampusOpportunity) => void;
}

export const CampusNavigationModal: React.FC<CampusNavigationModalProps> = ({
  opportunity,
  onClose,
  allOpportunities = [],
  onSelectAnotherOpportunity
}) => {
  const [copied, setCopied] = useState(false);

  if (!opportunity) return null;

  const nav: NavigationGuide = opportunity.navigation || {
    building: opportunity.location.split(',')[0] || 'Main Campus Hub',
    floor: 'Main Level',
    room: opportunity.location.split(',')[1] || 'Room 101',
    landmark: 'Central Quadrangle Area',
    directionsSteps: [
      'Enter through Campus Main Gate.',
      `Proceed towards ${opportunity.location.split(',')[0] || 'the main complex'}.`,
      'Check in at the lobby directory and follow room signs.'
    ],
    coordinates: { x: 50, y: 50 },
    visitingHours: 'Standard Campus Hours (8:00 AM – 8:00 PM)'
  };

  const handleCopyDirections = () => {
    const text = `Campus Directions to ${opportunity.title}:\n` +
      `Building: ${nav.building} (${nav.floor}, ${nav.room})\n` +
      `Landmark: ${nav.landmark}\n` +
      `Walking Route:\n` +
      nav.directionsSteps.map((step, i) => `${i + 1}. ${step}`).join('\n') +
      (nav.visitingHours ? `\nHours: ${nav.visitingHours}` : '');
    
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Building coordinates on our interactive 2D Campus Grid
  const campusBuildings = [
    { name: 'Tech Hub Complex', code: 'TH', x: 28, y: 32, desc: 'AI Labs, Robotics & Hardware Rigs' },
    { name: 'Alan Turing Center', code: 'TC', x: 70, y: 30, desc: 'Competitive Coding & Systems Cluster' },
    { name: 'Venture & Incubation Hub', code: 'VH', x: 22, y: 72, desc: 'E-Cell, Startups & Prototyping' },
    { name: 'Central Auditorium', code: 'CA', x: 50, y: 50, desc: 'Hackathons & Grand Research Hall' },
    { name: 'Academic Block B', code: 'AB', x: 75, y: 70, desc: 'Faculty Towers & Research Cabins' },
    { name: 'Central Library', code: 'CL', x: 48, y: 22, desc: 'Peer Study Pods & Reading Suites' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white w-full max-w-4xl rounded-2xl border border-slate-200 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150 flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/80">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center shadow-xs">
              <Navigation className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-wider text-indigo-700">
                Live Campus Navigator & Wayfinding
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 line-clamp-1">
                Where to Go: {opportunity.title}
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="grid grid-cols-1 lg:grid-cols-12 overflow-hidden flex-1">
          {/* Left: Interactive Campus Map Visualizer (lg:col-span-7) */}
          <div className="lg:col-span-7 p-5 bg-slate-900 text-white flex flex-col justify-between relative overflow-hidden select-none">
            {/* Map Top Kicker */}
            <div className="flex items-center justify-between z-10 text-xs">
              <div className="flex items-center gap-1.5 font-mono text-slate-300">
                <Compass className="w-3.5 h-3.5 text-indigo-400" />
                <span>APEX UNIVERSITY MAIN CAMPUS MAP</span>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/80 border border-emerald-800 px-2 py-0.5 rounded">
                LIVE DESTINATION PIN ACTIVE
              </span>
            </div>

            {/* 2D Interactive Map Canvas */}
            <div className="relative my-4 aspect-[4/3] w-full rounded-xl bg-slate-950/80 border border-slate-800 p-4 overflow-hidden">
              {/* Grid Lines */}
              <div 
                className="absolute inset-0 opacity-15"
                style={{
                  backgroundImage: 'radial-gradient(#6366f1 1px, transparent 1px)',
                  backgroundSize: '20px 20px'
                }}
              />

              {/* Campus Roads / Walkways */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-slate-800" strokeWidth="6" strokeLinecap="round">
                {/* Main Avenue */}
                <line x1="50%" y1="10%" x2="50%" y2="90%" />
                <line x1="15%" y1="50%" x2="85%" y2="50%" />
                <line x1="25%" y1="30%" x2="75%" y2="70%" strokeWidth="3" strokeDasharray="4 4" stroke="#4f46e5" opacity="0.4" />
              </svg>

              {/* Central Gate Entry Marker */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex flex-col items-center z-10">
                <div className="text-[9px] font-mono uppercase bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded border border-slate-700">
                  Campus Main Gate
                </div>
                <div className="w-2 h-2 bg-slate-400 rotate-45 mt-0.5" />
              </div>

              {/* Campus Buildings */}
              {campusBuildings.map((b) => {
                const isTarget = Math.abs(b.x - nav.coordinates.x) < 15 && Math.abs(b.y - nav.coordinates.y) < 15;

                return (
                  <div
                    key={b.name}
                    className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-pointer transition-all duration-300"
                    style={{ left: `${b.x}%`, top: `${b.y}%` }}
                  >
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center font-bold font-mono text-xs transition-transform shadow-md ${
                        isTarget
                          ? 'bg-indigo-600 text-white ring-4 ring-indigo-400/40 scale-110 z-20'
                          : 'bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700'
                      }`}
                    >
                      {b.code}
                    </div>
                    <span className="text-[10px] font-semibold text-slate-300 whitespace-nowrap mt-1 drop-shadow-md">
                      {b.name}
                    </span>
                  </div>
                );
              })}

              {/* Pulsing Target Pin */}
              <div
                className="absolute -translate-x-1/2 -translate-y-full pointer-events-none z-30 flex flex-col items-center animate-bounce duration-1000"
                style={{ left: `${nav.coordinates.x}%`, top: `${nav.coordinates.y}%` }}
              >
                <div className="bg-rose-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-lg whitespace-nowrap flex items-center gap-1 border border-white/40">
                  <MapPin className="w-3 h-3" />
                  <span>{nav.room}</span>
                </div>
                <div className="w-2 h-2 bg-rose-500 rotate-45 -mt-1" />
              </div>
            </div>

            {/* Real Image of the Location / Facility */}
            {opportunity.imageUrl && (
              <div className="relative rounded-lg overflow-hidden border border-slate-800 h-28 shrink-0 mt-1">
                <img
                  src={opportunity.imageUrl}
                  alt={opportunity.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent flex items-end p-2.5">
                  <div className="text-[11px] font-medium text-slate-200">
                    Verified Location Photo: <strong className="text-white">{nav.building}</strong>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right: Step-by-Step Directions & Exact Logistics (lg:col-span-5) */}
          <div className="lg:col-span-5 p-6 overflow-y-auto space-y-6 flex flex-col justify-between">
            <div className="space-y-5">
              {/* Location Badge Card */}
              <div className="p-4 rounded-xl bg-indigo-50/70 border border-indigo-100 space-y-2">
                <div className="text-[11px] font-bold uppercase tracking-wider text-indigo-700 flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5" />
                  <span>Building & Room Destination</span>
                </div>
                <div className="text-base font-bold text-slate-900 leading-snug">
                  {nav.building}
                </div>
                <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-700">
                  <span className="bg-white px-2 py-0.5 rounded border border-slate-200 font-mono">
                    {nav.floor}
                  </span>
                  <span>·</span>
                  <span className="bg-white px-2 py-0.5 rounded border border-slate-200 font-mono text-indigo-700">
                    {nav.room}
                  </span>
                  {nav.wing && (
                    <>
                      <span>·</span>
                      <span className="text-slate-500">{nav.wing}</span>
                    </>
                  )}
                </div>
                <div className="text-xs text-slate-600 pt-1 border-t border-indigo-100/60 leading-snug">
                  <strong className="text-slate-800">Landmark: </strong>
                  {nav.landmark}
                </div>
              </div>

              {/* Walking Steps */}
              <div className="space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Footprints className="w-3.5 h-3.5 text-indigo-600" />
                    Step-by-Step Walking Route
                  </span>
                  <button
                    onClick={handleCopyDirections}
                    className="text-[11px] text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-1"
                  >
                    {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                    <span>{copied ? 'Copied!' : 'Copy Route'}</span>
                  </button>
                </div>

                <ol className="space-y-2.5">
                  {nav.directionsSteps.map((step, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                      <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-700 font-bold font-mono text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span className="leading-snug">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Hours & Contact */}
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-2">
                {nav.visitingHours && (
                  <div className="flex items-start gap-2 text-slate-700">
                    <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-slate-800">When to Visit: </span>
                      <span>{nav.visitingHours}</span>
                    </div>
                  </div>
                )}
                {nav.contactPerson && (
                  <div className="flex items-start gap-2 text-slate-700 pt-1.5 border-t border-slate-200/60">
                    <User className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-slate-800">On-Site Contact: </span>
                      <span>{nav.contactPerson}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Close / Switcher */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
              >
                Close Navigator
              </button>

              <button
                onClick={handleCopyDirections}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-xs transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Directions Saved!' : 'Save Directions'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
