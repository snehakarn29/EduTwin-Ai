import React, { useState, useRef } from 'react';
import { 
  CampusOpportunity, 
  OpportunityType, 
  DomainCategory, 
  CareerGoal, 
  ClubOpportunity, 
  EventOpportunity, 
  FacilityOpportunity, 
  MentorOpportunity, 
  ResearchOpportunity, 
  PeerGroupOpportunity, 
  TeamSynergyOpportunity 
} from '../types';
import { 
  X, 
  Plus, 
  Upload, 
  Image as ImageIcon, 
  MapPin, 
  Building2, 
  Sparkles, 
  Trash2, 
  Check,
  Compass
} from 'lucide-react';

interface AddEditOpportunityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (opportunity: CampusOpportunity) => void;
  onDelete?: (id: string) => void;
  initialOpportunity?: CampusOpportunity | null;
  defaultType?: OpportunityType;
}

const DOMAINS: DomainCategory[] = [
  'AI & Machine Learning',
  'Software Development',
  'Entrepreneurship & Innovation',
  'Academic & Scientific Research',
  'Data Science & Analytics',
  'Cybersecurity & Networks',
  'Cloud & Distributed Systems',
  'UI/UX & Product Design'
];

const CAREER_GOALS: CareerGoal[] = [
  'Internship', 'Placement', 'Higher Studies', 'Research', 'Startup', 'Still Exploring'
];

export const AddEditOpportunityModal: React.FC<AddEditOpportunityModalProps> = ({
  isOpen,
  onClose,
  onSave,
  onDelete,
  initialOpportunity,
  defaultType = 'club'
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isEditing = !!initialOpportunity;

  const [type, setType] = useState<OpportunityType>(initialOpportunity?.type || defaultType);
  const [title, setTitle] = useState(initialOpportunity?.title || '');
  const [primaryDomain, setPrimaryDomain] = useState<DomainCategory>(initialOpportunity?.primaryDomain || 'AI & Machine Learning');
  const [categoryTag, setCategoryTag] = useState(initialOpportunity?.categoryTag || 'Technical Society');
  const [shortDescription, setShortDescription] = useState(initialOpportunity?.shortDescription || '');
  const [fullDescription, setFullDescription] = useState(initialOpportunity?.fullDescription || '');
  const [location, setLocation] = useState(initialOpportunity?.location || 'Tech Hub Building, Room 402');
  const [organizer, setOrganizer] = useState(initialOpportunity?.organizer || 'Student Affairs & Department Chapter');
  const [imageUrl, setImageUrl] = useState(initialOpportunity?.imageUrl || '');
  
  // Skills & Interests
  const [skillsInput, setSkillsInput] = useState('');
  const [relevantSkills, setRelevantSkills] = useState<string[]>(initialOpportunity?.relevantSkills || ['Python', 'AI/ML']);
  const [relevantInterests, setRelevantInterests] = useState<string[]>(initialOpportunity?.relevantInterests || ['AI/ML', 'Technical Clubs']);
  const [targetGoals, setTargetGoals] = useState<CareerGoal[]>(initialOpportunity?.targetCareerGoals || ['Higher Studies', 'Internship']);
  
  // Navigation details
  const [building, setBuilding] = useState(initialOpportunity?.navigation?.building || 'Tech Hub Innovation Complex');
  const [floor, setFloor] = useState(initialOpportunity?.navigation?.floor || '4th Floor');
  const [room, setRoom] = useState(initialOpportunity?.navigation?.room || 'Room 402');
  const [landmark, setLandmark] = useState(initialOpportunity?.navigation?.landmark || 'Opposite Server Room 410');
  const [step1, setStep1] = useState(initialOpportunity?.navigation?.directionsSteps[0] || 'Enter through Campus Main Gate.');
  const [step2, setStep2] = useState(initialOpportunity?.navigation?.directionsSteps[1] || 'Take Central Elevator to target floor.');
  const [step3, setStep3] = useState(initialOpportunity?.navigation?.directionsSteps[2] || 'Follow corridor signs to the destination room.');
  const [visitingHours, setVisitingHours] = useState(initialOpportunity?.navigation?.visitingHours || 'Mon-Fri 4:00 PM – 7:00 PM');
  const [contactPerson, setContactPerson] = useState(initialOpportunity?.navigation?.contactPerson || 'Office Bearers Desk');
  const [coordPreset, setCoordPreset] = useState<'tech_hub' | 'turing' | 'incubation' | 'auditorium' | 'library' | 'block_b'>('tech_hub');

  // Type-specific states
  const [memberCount, setMemberCount] = useState<number>((initialOpportunity as ClubOpportunity)?.memberCount || 100);
  const [meetingSchedule, setMeetingSchedule] = useState((initialOpportunity as ClubOpportunity)?.meetingSchedule || 'Wednesdays @ 5:30 PM');
  const [eventDate, setEventDate] = useState((initialOpportunity as EventOpportunity)?.eventDate || 'Nov 15-16, 2026');
  const [eventDeadline, setEventDeadline] = useState((initialOpportunity as EventOpportunity)?.registrationDeadline || 'Nov 10, 2026');

  if (!isOpen) return null;

  // Handle local image upload via FileReader
  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setImageUrl(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddSkill = () => {
    if (skillsInput.trim() && !relevantSkills.includes(skillsInput.trim())) {
      setRelevantSkills([...relevantSkills, skillsInput.trim()]);
      setSkillsInput('');
    }
  };

  const handleRemoveSkill = (skill: string) => {
    setRelevantSkills(relevantSkills.filter(s => s !== skill));
  };

  const handleToggleGoal = (goal: CareerGoal) => {
    if (targetGoals.includes(goal)) {
      setTargetGoals(targetGoals.filter(g => g !== goal));
    } else {
      setTargetGoals([...targetGoals, goal]);
    }
  };

  const getCoordinates = () => {
    switch (coordPreset) {
      case 'tech_hub': return { x: 28, y: 32 };
      case 'turing': return { x: 70, y: 30 };
      case 'incubation': return { x: 22, y: 72 };
      case 'auditorium': return { x: 50, y: 50 };
      case 'library': return { x: 48, y: 22 };
      case 'block_b': return { x: 75, y: 70 };
      default: return { x: 50, y: 50 };
    }
  };

  const handleSave = () => {
    if (!title.trim()) return;

    const baseId = initialOpportunity?.id || `custom-${type}-${Date.now()}`;
    const coords = getCoordinates();

    const navigation = {
      building,
      floor,
      room,
      landmark,
      directionsSteps: [step1, step2, step3].filter(Boolean),
      coordinates: coords,
      visitingHours,
      contactPerson
    };

    let fullOpp: CampusOpportunity;

    if (type === 'club') {
      fullOpp = {
        id: baseId,
        type: 'club',
        title,
        primaryDomain,
        categoryTag: categoryTag || 'Technical Society',
        shortDescription: shortDescription || `${title} active campus student organization.`,
        fullDescription: fullDescription || `${title} provides structured skill workshops, guest lectures, and collaborative peer projects for enrolled students.`,
        location: `${building}, ${room}`,
        organizer,
        imageUrl: imageUrl || 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
        relevantSkills,
        relevantInterests,
        targetCareerGoals: targetGoals.length > 0 ? targetGoals : ['Internship', 'Placement'],
        academicDisciplines: ['All Disciplines', 'Computer Science'],
        requiredExperienceLevel: 'Any',
        supportedLearningModes: ['Practical Coding', 'Projects', 'Group Study'],
        memberCount: Number(memberCount) || 50,
        meetingSchedule,
        skillsDeveloped: relevantSkills,
        keyActivities: ['Weekly Tech Meetups', 'Hands-on Coding Sprints', 'Annual Showcase'],
        experienceValue: 'Practical hands-on exposure and direct student team leadership.',
        navigation
      };
    } else if (type === 'event') {
      fullOpp = {
        id: baseId,
        type: 'event',
        title,
        primaryDomain,
        categoryTag: categoryTag || 'Hackathon',
        shortDescription: shortDescription || `${title} campus competitive technology challenge.`,
        fullDescription: fullDescription || `${title} brings students together to rapidly architect and ship innovative solutions.`,
        location: `${building}, ${room}`,
        organizer,
        imageUrl: imageUrl || 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80',
        relevantSkills,
        relevantInterests,
        targetCareerGoals: targetGoals.length > 0 ? targetGoals : ['Internship'],
        academicDisciplines: ['Engineering', 'All Disciplines'],
        requiredExperienceLevel: 'Intermediate',
        supportedLearningModes: ['Practical Coding', 'Projects'],
        eventType: 'Hackathon',
        eventDate,
        registrationDeadline: eventDeadline,
        eligibility: 'All Enrolled Students',
        skillsRequired: relevantSkills.slice(0, 2),
        skillsDeveloped: relevantSkills,
        teamFormat: 'Team of 2-4',
        mode: 'In-Person',
        certificateAvailable: true,
        registrationUrl: 'https://campus.edu/register',
        navigation
      };
    } else {
      // General facility / opportunity fallback
      fullOpp = {
        id: baseId,
        type: 'facility',
        title,
        primaryDomain,
        categoryTag: categoryTag || 'Specialized Facility',
        shortDescription: shortDescription || `${title} campus facility and computational lab.`,
        fullDescription: fullDescription || `${title} provides verified resources and equipment for student research and capstones.`,
        location: `${building}, ${room}`,
        organizer,
        imageUrl: imageUrl || 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
        relevantSkills,
        relevantInterests,
        targetCareerGoals: targetGoals,
        academicDisciplines: ['Computer Science', 'All Disciplines'],
        requiredExperienceLevel: 'Intermediate',
        supportedLearningModes: ['Practical Coding', 'Projects'],
        facilityType: 'Specialized AI Lab',
        purpose: 'Advanced project development and research exploration.',
        availableResources: ['Workstations', 'High-Speed Networking', 'Specialized Tooling'],
        relevantTechnologies: relevantSkills,
        accessRules: 'Open to enrolled students with badge clearance.',
        timings: visitingHours,
        roomNumber: room,
        coordinator: contactPerson,
        navigation
      };
    }

    onSave(fullOpp);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white w-full max-w-3xl rounded-2xl border border-slate-200 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150 flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/80">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-wider text-indigo-700">
              Campus Ecosystem Data Hub
            </div>
            <h2 className="text-xl font-bold text-slate-900 mt-0.5">
              {isEditing ? `Edit: ${initialOpportunity.title}` : 'Add New Campus Opportunity'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Opportunity Type & Domain Selection */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Opportunity Category
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as OpportunityType)}
                className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg bg-white focus:ring-1 focus:ring-indigo-500"
              >
                <option value="club">Campus Club / Student Society</option>
                <option value="event">Hackathon / Technical Competition</option>
                <option value="research">Paper Presentation / Research</option>
                <option value="mentor">Faculty Mentor</option>
                <option value="facility">Specialized Lab / Center</option>
                <option value="peerGroup">Peer Study Group</option>
                <option value="teammate">Project Teammate Squad</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Associated Domain
              </label>
              <select
                value={primaryDomain}
                onChange={(e) => setPrimaryDomain(e.target.value as DomainCategory)}
                className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg bg-white focus:ring-1 focus:ring-indigo-500"
              >
                {DOMAINS.map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Title & Tag */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Name / Title <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Quantum Computing Society, VisionAI Hackathon"
                className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-1 focus:ring-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Category Tag / Subtitle
              </label>
              <input
                type="text"
                value={categoryTag}
                onChange={(e) => setCategoryTag(e.target.value)}
                placeholder="e.g., Technical Society, Flagship Hackathon"
                className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-1 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Real-time Image Support (URL + Device Upload) */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-semibold text-slate-800">
                Real-Time Campus Photo / Image
              </label>
              <span className="text-[11px] text-slate-500">Paste URL or upload image file</span>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <div className="flex-1 w-full">
                <input
                  type="url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/... or paste image URL"
                  className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg bg-white focus:ring-1 focus:ring-indigo-500 font-mono"
                />
              </div>

              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageFileChange}
                accept="image/*"
                className="hidden"
              />

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-lg shrink-0 shadow-2xs"
              >
                <Upload className="w-3.5 h-3.5 text-slate-500" />
                <span>Upload From Device</span>
              </button>
            </div>

            {/* Preview */}
            {imageUrl && (
              <div className="relative rounded-lg overflow-hidden border border-slate-200 h-28 w-full sm:w-64 bg-slate-100">
                <img
                  src={imageUrl}
                  alt="Preview"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <button
                  type="button"
                  onClick={() => setImageUrl('')}
                  className="absolute top-1 right-1 p-1 bg-slate-900/70 text-white rounded hover:bg-rose-600 transition-colors"
                  title="Remove image"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>

          {/* Descriptions */}
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Short Description (1-2 sentences)
              </label>
              <input
                type="text"
                value={shortDescription}
                onChange={(e) => setShortDescription(e.target.value)}
                placeholder="Brief summary shown on recommendation cards"
                className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Full Overview & Value Proposition
              </label>
              <textarea
                rows={2}
                value={fullDescription}
                onChange={(e) => setFullDescription(e.target.value)}
                placeholder="Detailed explanation of activities, prerequisites, and what students gain"
                className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-1 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Skills Required / Gained */}
          <div className="space-y-2 pt-2 border-t border-slate-200">
            <label className="block text-xs font-semibold text-slate-700">
              Technical Skills Associated (Used for Matchmaking)
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={skillsInput}
                onChange={(e) => setSkillsInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddSkill(); }}}
                placeholder="e.g. Python, PyTorch, React, Java"
                className="flex-1 text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-1 focus:ring-indigo-500"
              />
              <button
                type="button"
                onClick={handleAddSkill}
                className="px-3 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shrink-0"
              >
                Add Skill
              </button>
            </div>

            <div className="flex flex-wrap gap-1.5 pt-1">
              {relevantSkills.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center gap-1 text-xs font-medium text-slate-800 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(skill)}
                    className="text-slate-400 hover:text-rose-600"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Target Career Goals */}
          <div className="space-y-2 pt-2 border-t border-slate-200">
            <label className="block text-xs font-semibold text-slate-700">
              Target Career Goals Supported
            </label>
            <div className="flex flex-wrap gap-2">
              {CAREER_GOALS.map((goal) => {
                const active = targetGoals.includes(goal);
                return (
                  <button
                    key={goal}
                    type="button"
                    onClick={() => handleToggleGoal(goal)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      active
                        ? 'bg-indigo-600 text-white shadow-2xs font-semibold'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {active ? '✓ ' : ''}{goal}
                  </button>
                );
              })}
            </div>
          </div>

          {/* CAMPUS NAVIGATION DETAILS ("WHERE TO GO") */}
          <div className="p-4 bg-indigo-50/50 border border-indigo-100 rounded-xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="text-xs font-bold uppercase tracking-wider text-indigo-900 flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-indigo-600" />
                <span>Campus Location & Wayfinding Guide (Where to Go)</span>
              </div>
              <span className="text-[11px] text-indigo-700 font-medium">Interactive Route Steps</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Building</label>
                <input
                  type="text"
                  value={building}
                  onChange={(e) => setBuilding(e.target.value)}
                  placeholder="e.g. Tech Hub Innovation Complex"
                  className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Floor & Level</label>
                <input
                  type="text"
                  value={floor}
                  onChange={(e) => setFloor(e.target.value)}
                  placeholder="e.g. 4th Floor"
                  className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Room Number / Bay</label>
                <input
                  type="text"
                  value={room}
                  onChange={(e) => setRoom(e.target.value)}
                  placeholder="e.g. Room 402"
                  className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Key Landmark Near Room</label>
              <input
                type="text"
                value={landmark}
                onChange={(e) => setLandmark(e.target.value)}
                placeholder="e.g. Directly opposite the GPU Supercluster Server Vault"
                className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg bg-white"
              />
            </div>

            {/* Walking Steps */}
            <div className="space-y-2">
              <label className="block text-xs font-medium text-slate-700">
                Step-by-Step Walking Route From Main Gate
              </label>
              <input
                type="text"
                value={step1}
                onChange={(e) => setStep1(e.target.value)}
                placeholder="Step 1: Enter through Campus Main Gate"
                className="w-full text-xs px-3 py-1.5 border border-slate-300 rounded-lg bg-white text-slate-700"
              />
              <input
                type="text"
                value={step2}
                onChange={(e) => setStep2(e.target.value)}
                placeholder="Step 2: Take North Elevator to target floor"
                className="w-full text-xs px-3 py-1.5 border border-slate-300 rounded-lg bg-white text-slate-700"
              />
              <input
                type="text"
                value={step3}
                onChange={(e) => setStep3(e.target.value)}
                placeholder="Step 3: Turn right into corridor; sign is visible"
                className="w-full text-xs px-3 py-1.5 border border-slate-300 rounded-lg bg-white text-slate-700"
              />
            </div>

            {/* Map Pin Preset */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Campus Map Zone / Building
                </label>
                <select
                  value={coordPreset}
                  onChange={(e) => setCoordPreset(e.target.value as any)}
                  className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg bg-white"
                >
                  <option value="tech_hub">Tech Hub Complex (AI & Robotics)</option>
                  <option value="turing">Alan Turing Center (Systems & Coding)</option>
                  <option value="incubation">Venture & Incubation Hub (E-Cell)</option>
                  <option value="auditorium">Central Campus Auditorium (Hackathons)</option>
                  <option value="library">Central Library (Study Circles)</option>
                  <option value="block_b">Academic Block B (Faculty Towers)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Visiting / Walk-in Hours
                </label>
                <input
                  type="text"
                  value={visitingHours}
                  onChange={(e) => setVisitingHours(e.target.value)}
                  placeholder="e.g. Daily 3:00 PM – 7:00 PM"
                  className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg bg-white"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <div>
            {isEditing && onDelete && (
              <button
                type="button"
                onClick={() => {
                  if (confirm(`Are you sure you want to remove "${title}" from the campus directory?`)) {
                    onDelete(initialOpportunity.id);
                    onClose();
                  }
                }}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete Opportunity</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-700 hover:text-slate-900 rounded-lg"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleSave}
              className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-xs transition-colors"
            >
              <Check className="w-3.5 h-3.5" />
              <span>{isEditing ? 'Save Changes' : 'Publish Opportunity to Campus'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
