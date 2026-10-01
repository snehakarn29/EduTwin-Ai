import React, { useState } from 'react';
import { DomainCategory, CampusOpportunity } from '../types';
import { CAMPUS_OPPORTUNITIES } from '../data/campusData';
import { 
  X, 
  BrainCircuit, 
  Code2, 
  Rocket, 
  Microscope, 
  BarChart3, 
  ShieldAlert, 
  Cloud, 
  Palette,
  ArrowRight,
  CheckCircle,
  Users,
  Calendar,
  Building
} from 'lucide-react';

interface DomainExplorerModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentDomain: DomainCategory;
  onSelectDomainForPathway: (domain: DomainCategory) => void;
}

const DOMAINS: {
  category: DomainCategory;
  tagline: string;
  skills: string[];
  icon: React.ComponentType<{ className?: string }>;
}[] = [
  {
    category: 'AI & Machine Learning',
    tagline: 'Autonomous Systems, Neural Architecture & Machine Perception',
    skills: ['Python', 'PyTorch', 'Computer Vision', 'Deep Learning', 'Mathematical Optimization'],
    icon: BrainCircuit
  },
  {
    category: 'Software Development',
    tagline: 'Distributed Architecture, High-Concurrency Backend & Competitive Coding',
    skills: ['Java', 'C++', 'Data Structures', 'REST/gRPC', 'PostgreSQL'],
    icon: Code2
  },
  {
    category: 'Entrepreneurship & Innovation',
    tagline: 'Venture Incubation, Product-Market Discovery & Seed Pitch Strategy',
    skills: ['Leadership', 'Product Development', 'UI/UX', 'Public Speaking', 'Cap Tables'],
    icon: Rocket
  },
  {
    category: 'Academic & Scientific Research',
    tagline: 'Peer-Reviewed Publishing, Mathematical Proofs & Graduate Fellowship',
    skills: ['Research Methodology', 'LaTeX', 'Scientific Writing', 'Statistical Inference'],
    icon: Microscope
  },
  {
    category: 'Data Science & Analytics',
    tagline: 'Statistical Inference, Data Engineering & Predictive Modeling',
    skills: ['Python', 'SQL', 'Pandas', 'Data Pipelines', 'Tableau'],
    icon: BarChart3
  },
  {
    category: 'Cybersecurity & Networks',
    tagline: 'Security Auditing, Zero-Trust Architecture & Threat Intelligence',
    skills: ['Network Protocols', 'Penetration Testing', 'Cryptography', 'Linux Kernel'],
    icon: ShieldAlert
  },
  {
    category: 'Cloud & Distributed Systems',
    tagline: 'Kubernetes Orchestration, Microservices & Infrastructure as Code',
    skills: ['Docker', 'Kubernetes', 'AWS/GCP', 'CI/CD Pipelines', 'Distributed Consensus'],
    icon: Cloud
  },
  {
    category: 'UI/UX & Product Design',
    tagline: 'Design Systems, Human-Computer Interaction & Rapid Wireframing',
    skills: ['Figma', 'User Research', 'Design Systems', 'Interactive Prototyping', 'Accessibility'],
    icon: Palette
  }
];

export const DomainExplorerModal: React.FC<DomainExplorerModalProps> = ({
  isOpen,
  onClose,
  currentDomain,
  onSelectDomainForPathway
}) => {
  const [selectedDomain, setSelectedDomain] = useState<DomainCategory>(currentDomain);

  if (!isOpen) return null;

  const activeDomainMeta = DOMAINS.find(d => d.category === selectedDomain) || DOMAINS[0];
  const DomainIcon = activeDomainMeta.icon;

  // Filter campus opportunities by selected domain
  const relevantOpportunities = CAMPUS_OPPORTUNITIES.filter(
    opp => opp.primaryDomain === selectedDomain
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white w-full max-w-4xl rounded-2xl border border-slate-200 shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-150 flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/70">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-indigo-700">
              Campus Ecosystem Architecture
            </div>
            <h2 className="text-xl font-bold text-slate-900 mt-0.5">
              Explore University Domains
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 overflow-hidden flex-1">
          {/* Left Column: Domain List (md:col-span-4) */}
          <div className="md:col-span-4 border-r border-slate-200 p-4 space-y-1.5 overflow-y-auto bg-slate-50/50">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 px-2">
              All University Domains
            </div>
            {DOMAINS.map((dom) => {
              const Icon = dom.icon;
              const isCurrent = dom.category === currentDomain;
              const isSelected = dom.category === selectedDomain;

              return (
                <button
                  key={dom.category}
                  onClick={() => setSelectedDomain(dom.category)}
                  className={`w-full text-left p-2.5 rounded-xl text-xs font-medium transition-all flex items-center gap-2.5 ${
                    isSelected
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'hover:bg-slate-200/60 text-slate-700'
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isSelected ? 'text-white' : 'text-slate-500'}`} />
                  <div className="flex-1 truncate">
                    <div className="font-semibold truncate">{dom.category}</div>
                    {isCurrent && (
                      <span className={`text-[10px] ${isSelected ? 'text-indigo-200' : 'text-indigo-600 font-bold'}`}>
                        Current Match
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Domain Detail View (md:col-span-8) */}
          <div className="md:col-span-8 p-6 overflow-y-auto space-y-6">
            {/* Domain Overview */}
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700">
                <DomainIcon className="w-3.5 h-3.5" />
                <span>Domain Profile</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-900">
                {activeDomainMeta.category}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {activeDomainMeta.tagline}
              </p>
            </div>

            {/* Core Competencies */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Core Competencies & Skills Required
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {activeDomainMeta.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="text-xs font-medium text-slate-800 bg-slate-100 px-2.5 py-1 rounded-md"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Campus Nodes in this domain */}
            <div className="space-y-3 pt-4 border-t border-slate-200">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center justify-between">
                <span>Associated Campus Nodes</span>
                <span className="font-mono text-slate-400 font-normal">
                  {relevantOpportunities.length} opportunities
                </span>
              </h4>

              {relevantOpportunities.length === 0 ? (
                <p className="text-xs text-slate-500 italic">
                  Additional campus nodes for this discipline are updated dynamically each semester.
                </p>
              ) : (
                <div className="space-y-2">
                  {relevantOpportunities.map((opp) => (
                    <div
                      key={opp.id}
                      className="p-3 rounded-lg border border-slate-200 hover:border-slate-300 bg-white flex items-center justify-between gap-3 text-xs"
                    >
                      <div>
                        <div className="font-semibold text-slate-900">{opp.title}</div>
                        <div className="text-[11px] text-slate-500 flex items-center gap-1.5 mt-0.5">
                          <span>{opp.categoryTag}</span>
                          <span aria-hidden="true">·</span>
                          <span>{opp.location}</span>
                        </div>
                      </div>

                      <span className="text-[11px] font-medium text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded shrink-0">
                        {opp.type}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-700 hover:text-slate-900 rounded-lg"
          >
            Close Explorer
          </button>

          <button
            onClick={() => {
              onSelectDomainForPathway(selectedDomain);
              onClose();
            }}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-xs transition-colors"
          >
            <span>View Pathway for {selectedDomain}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
