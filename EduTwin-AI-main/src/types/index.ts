export type ProficiencyLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export type CareerGoal = 
  | 'Internship' 
  | 'Placement' 
  | 'Higher Studies' 
  | 'Research' 
  | 'Startup' 
  | 'Still Exploring';

export type DomainCategory = 
  | 'AI & Machine Learning'
  | 'Software Development'
  | 'Entrepreneurship & Innovation'
  | 'Academic & Scientific Research'
  | 'Data Science & Analytics'
  | 'Cybersecurity & Networks'
  | 'Cloud & Distributed Systems'
  | 'UI/UX & Product Design';

export type SorcererGrade = 
  | 'Grade 4 Sorcerer' 
  | 'Grade 3 Sorcerer' 
  | 'Grade 2 Sorcerer' 
  | 'Grade 1 Sorcerer' 
  | 'Special Grade Sorcerer';

export interface StudentSkill {
  name: string;
  level: ProficiencyLevel;
  category?: 'Programming' | 'Development' | 'Emerging Tech' | 'Core';
}

export interface AcademicCourse {
  id: string;
  code: string;
  name: string;
  instructor: string;
  credits: number;
  currentAttendance: number; // percentage e.g. 78
  attendedClasses: number;
  totalClasses: number;
  weakTopics: string[];
}

export interface AcademicDeadline {
  id: string;
  title: string;
  courseCode: string;
  dueDate: string;
  type: 'Assignment' | 'Lab' | 'MidTerm' | 'Project Submission';
  priority: 'High' | 'Medium' | 'Low';
  status: 'pending' | 'submitted';
}

export interface QuestStep {
  id: string;
  gradeTier: SorcererGrade;
  title: string;
  subtitle: string;
  xpReward: number;
  badgeName: string;
  status: 'completed' | 'in_progress' | 'locked';
  description: string;
  requirements: string[];
}

export interface StudentProfile {
  id: string;
  name: string;
  avatarInitials: string;
  avatarUrl?: string;
  tagline: string;
  sorcererGrade: SorcererGrade;
  level: number;
  xp: number;
  nextLevelXp: number;
  attendanceOverall: number;
  academic: {
    university: string;
    department: string;
    yearSemester: string;
    cgpa?: number;
    academicInterests: string[];
    subjectsStrength: string[];
    subjectsImprovement: string[];
  };
  skills: StudentSkill[];
  careerGoal: CareerGoal;
  careerInterests: string[];
  learningPreferences: string[];
  campusInterests: string[];
  courses: AcademicCourse[];
  deadlines: AcademicDeadline[];
  quests: QuestStep[];
  privacy: {
    optInPeerMatching: boolean;
    allowTeammateDiscovery: boolean;
    shareAcademicStats: boolean;
  };
  feedback: {
    savedItemIds: string[];
    interestedItemIds: string[];
    notInterestedItemIds: string[];
    participatedItemIds: string[];
  };
  evolutionHistory: {
    timestamp: string;
    previousDomain: DomainCategory;
    newDomain: DomainCategory;
    reason: string;
  }[];
}

export interface NavigationGuide {
  building: string;
  floor: string;
  room: string;
  wing?: string;
  landmark: string;
  directionsSteps: string[];
  coordinates: { x: number; y: number }; // Percentage on campus map [0-100]
  visitingHours?: string;
  contactPerson?: string;
}

export type OpportunityType = 
  | 'club' 
  | 'event' 
  | 'research' 
  | 'mentor' 
  | 'facility' 
  | 'peerGroup' 
  | 'teammate';

export interface MatchBreakdown {
  overallScore: number;
  skillMatch: number;
  interestMatch: number;
  careerMatch: number;
  academicRelevance: number;
  experienceFit: number;
  learningPreferenceFit: number;
  whyMatched: string[];
  skillsGained: string[];
  recommendedAction: string;
  resumeValueScore?: number; // 1-10
  networkingScore?: number; // 1-10
}

export interface BaseOpportunity {
  id: string;
  title: string;
  type: OpportunityType;
  primaryDomain: DomainCategory;
  categoryTag: string;
  shortDescription: string;
  fullDescription: string;
  location: string;
  organizer: string;
  relevantSkills: string[];
  relevantInterests: string[];
  targetCareerGoals: CareerGoal[];
  academicDisciplines: string[];
  requiredExperienceLevel: 'Any' | 'Beginner' | 'Intermediate' | 'Advanced';
  supportedLearningModes: string[];
  imageUrl?: string;
  navigation?: NavigationGuide;
  resumeValueScore?: number;
  networkingScore?: number;
}

export interface ClubOpportunity extends BaseOpportunity {
  type: 'club';
  memberCount: number;
  meetingSchedule: string;
  skillsDeveloped: string[];
  keyActivities: string[];
  experienceValue: string;
}

export interface EventOpportunity extends BaseOpportunity {
  type: 'event';
  eventType: 'Hackathon' | 'Technical Competition' | 'Workshop' | 'Seminar' | 'Conference' | 'Coding Competition' | 'Entrepreneurship Summit';
  eventDate: string;
  registrationDeadline: string;
  eligibility: string;
  skillsRequired: string[];
  skillsDeveloped: string[];
  teamFormat: 'Individual' | 'Team of 2-4' | 'Team of 3-5';
  mode: 'In-Person' | 'Virtual' | 'Hybrid';
  certificateAvailable: boolean;
  registrationUrl: string;
}

export interface ResearchOpportunity extends BaseOpportunity {
  type: 'research';
  researchType: 'Paper Presentation' | 'Research Conference' | 'Faculty Project' | 'Technical Symposium' | 'Research Fellowship';
  facultyLead: string;
  labAssociated: string;
  publicationVenue?: string;
  submissionDeadline: string;
  eventDate: string;
  higherStudiesRelevance: string;
}

export interface MentorOpportunity extends BaseOpportunity {
  type: 'mentor';
  facultyName: string;
  facultyTitle: string;
  department: string;
  labAssociated: string;
  researchInterests: string[];
  areasOfExpertise: string[];
  officeLocation: string;
  officialEmailMasked: string;
  currentOpenProjects: string[];
}

export interface FacilityOpportunity extends BaseOpportunity {
  type: 'facility';
  facilityType: 'Specialized AI Lab' | 'Robotics Lab' | 'Incubation Center' | 'IoT Research Lab' | 'HPC Computing Lab' | 'Design Studio';
  purpose: string;
  availableResources: string[];
  relevantTechnologies: string[];
  accessRules: string;
  timings: string;
  roomNumber: string;
  coordinator: string;
}

export interface PeerGroupOpportunity extends BaseOpportunity {
  type: 'peerGroup';
  subject: string;
  currentMembers: number;
  maxMembers: number;
  targetSkillLevel: ProficiencyLevel;
  studyGoal: string;
  preferredStudyTime: string;
  meetingFrequency: string;
  focusTopics: string[];
}

export interface TeamSynergyOpportunity extends BaseOpportunity {
  type: 'teammate';
  targetHackathonOrProject: string;
  existingMembers: {
    name: string;
    role: string;
    skills: string[];
  }[];
  seekingRole: string;
  seekingSkills: string[];
  synergyReason: string;
  synergyBreakdown: {
    domain: string;
    contribution: string;
  }[];
}

export type CampusOpportunity = 
  | ClubOpportunity 
  | EventOpportunity 
  | ResearchOpportunity 
  | MentorOpportunity 
  | FacilityOpportunity 
  | PeerGroupOpportunity 
  | TeamSynergyOpportunity;

export interface ScoredOpportunity {
  opportunity: CampusOpportunity;
  breakdown: MatchBreakdown;
}

export interface PathwayStep {
  stepNumber: number;
  stageName: string;
  title: string;
  category: 'Foundation' | 'Community' | 'Mentorship' | 'Project' | 'Competition' | 'Research' | 'Career';
  description: string;
  linkedOpportunityId?: string;
  skillsReinforced: string[];
  status: 'Completed' | 'In Progress' | 'Next Up' | 'Upcoming';
}

export interface CampusPathway {
  domain: DomainCategory;
  pathwayTitle: string;
  description: string;
  estimatedDuration: string;
  steps: PathwayStep[];
}

export interface ScoringWeights {
  skillWeight: number; // 0.30
  interestWeight: number; // 0.25
  careerWeight: number; // 0.20
  academicWeight: number; // 0.10
  experienceWeight: number; // 0.10
  learningWeight: number; // 0.05
}

export interface FutureSelfSimulationParams {
  studyHoursPerWeek: number; // 5 - 30
  hackathonsPerYear: number; // 0 - 6
  targetCgpa: number; // 7.0 - 10.0
}

export interface FutureSelfProjection {
  minCtcLpa: number;
  maxCtcLpa: number;
  tier1InternshipProbability: number; // percentage e.g. 88
  mastersResearchIndex: number; // percentage e.g. 74
  skillReadinessScore: number; // percentage e.g. 91
  archetypeTitle: string;
  recommendationQuote: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'future_self';
  text: string;
  timestamp: string;
}

export interface AttendedExperienceLog {
  id: string;
  opportunityName: string;
  role: string;
  achievements: string[];
  resumeBullet: string;
  linkedinPost: string;
  skillsGained: string[];
  date: string;
}
