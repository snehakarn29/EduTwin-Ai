import React, { useState } from 'react';
import { CampusOpportunity, NavigationGuide } from '../types';
import { 
  MapPin, 
  Navigation, 
  Clock, 
  Building2, 
  Footprints, 
  Compass, 
  Copy, 
  Check, 
  Search,
  Layers,
  ArrowRight,
  ExternalLink,
  Sparkles,
  Info
} from 'lucide-react';

interface CampusMapViewProps {
  opportunities: CampusOpportunity[];
  onSelectOpportunityToNavigate?: (opp: CampusOpportunity) => void;
  onOpenAddLocation?: () => void;
}

export const CampusMapView: React.FC<CampusMapViewProps> = ({
  opportunities,
  onSelectOpportunityToNavigate,
  onOpenAddLocation
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBuilding, setSelectedBuilding] = useState<string>('All');
  const [activeOpp, setActiveOpp] = useState<CampusOpportunity>(opportunities[0]);
  const [copied, setCopied] = useState(false);

  const buildings = [
    { id: 'all', name: 'All Buildings', code: 'ALL' },
    { id: 'tech_hub', name: 'Tech Hub Complex', code: 'TH', x: 28, y: 32, desc: 'AI Labs, Robotics & Hardware Rigs', color: '#7C3AED' },
    { id: 'turing', name: 'Alan Turing Center', code: 'TC', x: 70, y: 30, desc: 'Competitive Coding & Systems Cluster', color: '#22D3EE' },
    { id: 'incubation', name: 'Venture & Incubation Hub', code: 'VH', x: 24, y: 72, desc: 'E-Cell, Startups & Prototyping', color: '#F43F5E' },
    { id: 'auditorium', name: 'Central Auditorium', code: 'CA', x: 50, y: 50, desc: 'Hackathons & Grand Research Hall', color: '#A855F7' },
    { id: 'block_b', name: 'Academic Block B', code: 'AB', x: 76, y: 70, desc: 'Faculty Towers & Research Cabins', color: '#3B82F6' },
    { id: 'library', name: 'Central Library', code: 'CL', x: 48, y: 22, desc: 'Peer Study Pods & Reading Suites', color: '#10B981' }
  ];

  const filteredOpps = opportunities.filter(opp => {
    const matchesSearch = 
      opp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (opp.navigation?.building || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (opp.navigation?.room || '').toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;
    if (selectedBuilding === 'All') return true;

    const bldName = opp.navigation?.building || opp.location;
    return bldName.toLowerCase().includes(selectedBuilding.toLowerCase());
  });

  const currentNav: NavigationGuide = activeOpp?.navigation || {
    building: activeOpp?.location.split(',')[0] || 'Tech Hub Innovation Complex',
    floor: '4th Floor',
    room: activeOpp?.location.split(',')[1] || 'Room 402',
    landmark: 'Central Quadrangle Area',
    directionsSteps: [
      'Enter through Campus Main Gate.',
      `Proceed towards ${activeOpp?.location.split(',')[0] || 'the main complex'}.`,
      'Check in at the lobby directory and follow room signs.'
    ],
    coordinates: { x: 28, y: 32 },
    visitingHours: 'Standard Campus Hours (8:00 AM – 8:00 PM)',
    contactPerson: activeOpp?.organizer || 'Chapter Lead Desk'
  };

  const handleCopyDirections = () => {
    if (!activeOpp) return;
    const text = `Campus Directions to ${activeOpp.title}:\n` +
      `Building: ${currentNav.building} (${currentNav.floor}, ${currentNav.room})\n` +
      `Landmark: ${currentNav.landmark}\n` +
      `Walking Route:\n` +
      currentNav.directionsSteps.map((step, i) => `${i + 1}. ${step}`).join('\n') +
      (currentNav.visitingHours ? `\nHours: ${currentNav.visitingHours}` : '');
    
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-purple-500/20 pb-4 gap-4">
        <div>
          <div className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5" />
            <span>Campus Spatial GPS & Navigation System</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-space text-white mt-0.5">
            Interactive Campus Navigator & Club Meetup Locator
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            Never get lost finding where a club meets, which floor a lab is on, or how to reach a faculty mentor's cabin.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleCopyDirections}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-purple-200 bg-purple-950/60 hover:bg-purple-900/60 border border-purple-500/40 rounded-xl transition-colors shadow-xs"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Directions Copied!' : 'Copy Walking Route'}</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Interactive Map + Route Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Side: Interactive 2D Campus Layout & Building Radar (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-[#0C081A] rounded-2xl border border-purple-500/30 p-5 shadow-2xl relative overflow-hidden glow-border-purple">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
                <span className="text-xs font-mono font-bold text-cyan-300 uppercase tracking-wider">
                  Live Campus Grid Overlay
                </span>
              </div>
              <span className="text-[11px] font-mono text-slate-400">
                Active Destination: <strong className="text-purple-300">{currentNav.building}</strong>
              </span>
            </div>

            {/* Interactive Campus SVG Map */}
            <div className="relative aspect-16/10 w-full rounded-xl bg-[#07070B] border border-purple-500/20 overflow-hidden shadow-inner flex items-center justify-center p-4">
              {/* Animated Grid Lines */}
              <div className="absolute inset-0 bg-domain-grid opacity-60" />
              
              {/* Radial Beacon Rings from active destination */}
              <div 
                className="absolute w-32 h-32 rounded-full border border-purple-500/30 animate-ping pointer-events-none"
                style={{
                  left: `${currentNav.coordinates?.x || 50}%`,
                  top: `${currentNav.coordinates?.y || 50}%`,
                  transform: 'translate(-50%, -50%)'
                }}
              />
              <div 
                className="absolute w-16 h-16 rounded-full bg-purple-500/20 blur-md pointer-events-none"
                style={{
                  left: `${currentNav.coordinates?.x || 50}%`,
                  top: `${currentNav.coordinates?.y || 50}%`,
                  transform: 'translate(-50%, -50%)'
                }}
              />

              {/* Campus Roads and Walkway paths */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40">
                <line x1="28%" y1="32%" x2="50%" y2="50%" stroke="#A855F7" strokeWidth="2" strokeDasharray="4 4" />
                <line x1="70%" y1="30%" x2="50%" y2="50%" stroke="#22D3EE" strokeWidth="2" strokeDasharray="4 4" />
                <line x1="24%" y1="72%" x2="50%" y2="50%" stroke="#F43F5E" strokeWidth="2" strokeDasharray="4 4" />
                <line x1="76%" y1="70%" x2="50%" y2="50%" stroke="#3B82F6" strokeWidth="2" strokeDasharray="4 4" />
                <line x1="48%" y1="22%" x2="50%" y2="50%" stroke="#10B981" strokeWidth="2" strokeDasharray="4 4" />
              </svg>

              {/* Building Nodes on Map */}
              {buildings.filter(b => b.id !== 'all').map((bld) => {
                const isActiveBuilding = currentNav.building.toLowerCase().includes(bld.name.toLowerCase()) || 
                  (bld.name === 'Tech Hub Complex' && currentNav.building.toLowerCase().includes('tech'));

                return (
                  <div
                    key={bld.id}
                    onClick={() => {
                      const matched = opportunities.find(o => 
                        (o.navigation?.building || o.location).toLowerCase().includes(bld.name.toLowerCase())
                      );
                      if (matched) setActiveOpp(matched);
                    }}
                    style={{ left: `${bld.x}%`, top: `${bld.y}%` }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 group z-10`}
                  >
                    <div className={`flex flex-col items-center gap-1`}>
                      <div 
                        className={`w-9 h-9 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center font-mono font-bold text-xs shadow-lg transition-transform duration-200 group-hover:scale-110 ${
                          isActiveBuilding
                            ? 'bg-purple-600 text-white ring-4 ring-cyan-400/50 glow-cursed scale-110'
                            : 'bg-slate-900/90 text-purple-200 border border-purple-500/40 hover:border-cyan-400'
                        }`}
                      >
                        <Building2 className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>
                      <div className="bg-[#07070B]/90 border border-purple-500/30 px-2 py-0.5 rounded text-[10px] font-mono text-slate-300 whitespace-nowrap shadow">
                        {bld.code} • {bld.name.split(' ')[0]}
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Active Target Beacon Pin */}
              <div 
                className="absolute z-20 pointer-events-none flex flex-col items-center"
                style={{
                  left: `${currentNav.coordinates?.x || 50}%`,
                  top: `${currentNav.coordinates?.y || 50}%`,
                  transform: 'translate(-50%, -100%)'
                }}
              >
                <div className="bg-cyan-400 text-slate-950 font-mono text-[9px] font-extrabold px-1.5 py-0.5 rounded shadow-lg uppercase tracking-tight animate-bounce">
                  TARGET
                </div>
                <div className="w-3 h-3 bg-cyan-400 rotate-45 -mt-1 shadow-md" />
              </div>
            </div>

            {/* Building Quick Filters */}
            <div className="mt-4 flex flex-wrap gap-2 pt-2 border-t border-purple-500/20">
              <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1 mr-1">
                <Layers className="w-3 h-3 text-cyan-400" />
                Filter:
              </span>
              {buildings.map((b) => (
                <button
                  key={b.id}
                  onClick={() => setSelectedBuilding(b.name === 'All Buildings' ? 'All' : b.name)}
                  className={`text-[11px] font-mono px-2.5 py-1 rounded-lg border transition-all ${
                    (selectedBuilding === 'All' && b.id === 'all') || selectedBuilding === b.name
                      ? 'bg-purple-600/30 border-purple-400 text-white font-semibold glow-border-purple'
                      : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-purple-500/40'
                  }`}
                >
                  {b.name}
                </button>
              ))}
            </div>
          </div>

          {/* Destination Detail Card */}
          <div className="bg-[#0C081A] rounded-2xl border border-purple-500/30 p-6 shadow-xl space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="font-mono text-xs text-cyan-400 uppercase tracking-wider font-bold">
                  {activeOpp.type.toUpperCase()} MEETUP VENUE
                </span>
                <h3 className="text-xl font-bold font-space text-white mt-0.5">
                  {activeOpp.title}
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Organized by: <strong className="text-slate-300">{activeOpp.organizer}</strong>
                </p>
              </div>

              {activeOpp.imageUrl && (
                <img
                  src={activeOpp.imageUrl}
                  alt={activeOpp.title}
                  className="w-16 h-16 rounded-xl object-cover border border-purple-500/40 shrink-0"
                />
              )}
            </div>

            {/* Location Specs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="p-3 bg-purple-950/30 border border-purple-500/20 rounded-xl">
                <div className="text-[10px] font-mono uppercase text-slate-400">Building</div>
                <div className="text-xs font-bold text-white mt-0.5 truncate">{currentNav.building}</div>
              </div>
              <div className="p-3 bg-purple-950/30 border border-purple-500/20 rounded-xl">
                <div className="text-[10px] font-mono uppercase text-slate-400">Floor & Wing</div>
                <div className="text-xs font-bold text-cyan-300 mt-0.5">{currentNav.floor}</div>
              </div>
              <div className="p-3 bg-purple-950/30 border border-purple-500/20 rounded-xl">
                <div className="text-[10px] font-mono uppercase text-slate-400">Room #</div>
                <div className="text-xs font-bold text-purple-300 mt-0.5">{currentNav.room}</div>
              </div>
              <div className="p-3 bg-purple-950/30 border border-purple-500/20 rounded-xl">
                <div className="text-[10px] font-mono uppercase text-slate-400">Access Hours</div>
                <div className="text-xs font-bold text-emerald-400 mt-0.5 truncate">{currentNav.visitingHours || '8am - 8pm'}</div>
              </div>
            </div>

            {/* Step-by-Step Walking Route */}
            <div className="pt-2 space-y-2">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <Footprints className="w-3.5 h-3.5 text-cyan-400" />
                Step-by-Step Walking Route from Campus Main Gate
              </h4>
              <div className="space-y-2">
                {currentNav.directionsSteps.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs text-slate-300 bg-slate-900/50 p-2.5 rounded-lg border border-purple-500/10">
                    <span className="w-5 h-5 rounded-full bg-purple-950 border border-purple-400/40 text-purple-300 font-mono font-bold text-[10px] flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <span className="pt-0.5">{step}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-purple-500/20">
              <span className="flex items-center gap-1">
                <Info className="w-3.5 h-3.5 text-purple-400" />
                Landmark: <strong className="text-slate-300">{currentNav.landmark}</strong>
              </span>
              <span className="text-cyan-400 font-mono text-[11px]">
                Desk: {currentNav.contactPerson || 'Reception desk'}
              </span>
            </div>
          </div>
        </div>

        {/* Right Side: Campus Destinations Catalog (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-[#0C081A] rounded-2xl border border-purple-500/30 p-5 shadow-2xl space-y-4 glow-border-purple">
            <div className="flex items-center justify-between">
              <h3 className="font-bold font-space text-white text-base flex items-center gap-2">
                <MapPin className="w-4 h-4 text-cyan-400" />
                <span>All Campus Destinations ({filteredOpps.length})</span>
              </h3>
            </div>

            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search club, lab room, building or floor..."
                className="w-full bg-[#07070B] border border-purple-500/30 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
              />
            </div>

            {/* Opportunity Cards List */}
            <div className="space-y-2.5 max-h-[640px] overflow-y-auto pr-1">
              {filteredOpps.map((opp) => {
                const isSelected = activeOpp?.id === opp.id;
                const oppNav = opp.navigation;

                return (
                  <div
                    key={opp.id}
                    onClick={() => setActiveOpp(opp)}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                      isSelected
                        ? 'bg-purple-950/60 border-cyan-400/80 shadow-md ring-1 ring-cyan-400/30'
                        : 'bg-slate-900/40 border-purple-500/20 hover:border-purple-500/50 hover:bg-purple-950/20'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-lg overflow-hidden bg-purple-950 border border-purple-500/40 shrink-0 flex items-center justify-center">
                        {opp.imageUrl ? (
                          <img
                            src={opp.imageUrl}
                            alt={opp.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <Building2 className="w-5 h-5 text-purple-300" />
                        )}
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="font-mono text-[9px] uppercase font-bold text-cyan-400 px-1.5 py-0.2 rounded bg-cyan-950/60 border border-cyan-500/30">
                            {opp.type}
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono truncate">
                            {oppNav?.room || opp.location.split(',')[1] || 'Room 101'}
                          </span>
                        </div>
                        <h4 className="text-xs font-bold text-white truncate mt-0.5">
                          {opp.title}
                        </h4>
                        <p className="text-[11px] text-purple-300/80 truncate">
                          {oppNav?.building || opp.location.split(',')[0]}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveOpp(opp);
                      }}
                      className={`p-1.5 rounded-lg text-xs transition-colors shrink-0 ${
                        isSelected
                          ? 'bg-cyan-400 text-slate-950 font-bold'
                          : 'text-slate-400 hover:text-white bg-slate-800/60'
                      }`}
                      title="Plot navigation route"
                    >
                      <Navigation className="w-3.5 h-3.5" />
                    </button>
                  </div>
                );
              })}

              {filteredOpps.length === 0 && (
                <div className="p-8 text-center text-slate-400 text-xs font-mono">
                  No campus destinations found matching "{searchQuery}".
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
