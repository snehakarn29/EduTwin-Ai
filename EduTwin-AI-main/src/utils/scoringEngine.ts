import { 
  StudentProfile, 
  CampusOpportunity, 
  ScoredOpportunity, 
  MatchBreakdown, 
  ScoringWeights, 
  DomainCategory, 
  CampusPathway, 
  ProficiencyLevel 
} from '../types';

export const DEFAULT_WEIGHTS: ScoringWeights = {
  skillWeight: 0.30,
  interestWeight: 0.25,
  careerWeight: 0.20,
  academicWeight: 0.10,
  experienceWeight: 0.10,
  learningWeight: 0.05
};

const PROFICIENCY_MULTIPLIER: Record<ProficiencyLevel, number> = {
  Beginner: 0.65,
  Intermediate: 0.85,
  Advanced: 1.0
};

export function scoreOpportunity(
  student: StudentProfile,
  opp: CampusOpportunity,
  weights: ScoringWeights = DEFAULT_WEIGHTS
): MatchBreakdown {
  const whyMatched: string[] = [];

  // 1. Skill Match (30%)
  let skillPoints = 0;
  const matchedSkills: string[] = [];

  const studentSkillMap = new Map(student.skills.map(s => [s.name.toLowerCase(), s]));

  opp.relevantSkills.forEach(reqSkill => {
    const studentSkill = studentSkillMap.get(reqSkill.toLowerCase());
    if (studentSkill) {
      const mult = PROFICIENCY_MULTIPLIER[studentSkill.level];
      skillPoints += mult * 100;
      matchedSkills.push(`${studentSkill.name} (${studentSkill.level})`);
    } else {
      // Partial credit for adjacent skills
      const hasAdjacent = student.skills.some(s => 
        s.name.toLowerCase().includes(reqSkill.toLowerCase()) || 
        reqSkill.toLowerCase().includes(s.name.toLowerCase())
      );
      if (hasAdjacent) {
        skillPoints += 50;
      }
    }
  });

  const skillMatch = opp.relevantSkills.length > 0
    ? Math.min(99, Math.max(35, Math.round(skillPoints / opp.relevantSkills.length)))
    : 75;

  if (matchedSkills.length > 0) {
    whyMatched.push(`Leverages your ${matchedSkills.slice(0, 2).join(' & ')} proficiency`);
  }

  // 2. Interest Match (25%)
  const allStudentInterests = [
    ...student.campusInterests.map(i => i.toLowerCase()),
    ...student.careerInterests.map(i => i.toLowerCase())
  ];

  let interestOverlapCount = 0;
  const matchedInterests: string[] = [];

  opp.relevantInterests.forEach(oppInt => {
    if (allStudentInterests.some(si => si.includes(oppInt.toLowerCase()) || oppInt.toLowerCase().includes(si))) {
      interestOverlapCount++;
      matchedInterests.push(oppInt);
    }
  });

  const interestRatio = opp.relevantInterests.length > 0 
    ? interestOverlapCount / opp.relevantInterests.length 
    : 0.5;
  const interestMatch = Math.min(99, Math.max(40, Math.round(interestRatio * 60 + 38)));

  if (matchedInterests.length > 0) {
    whyMatched.push(`Matches your interest in ${matchedInterests.slice(0, 2).join(' & ')}`);
  }

  // 3. Career Goal Match (20%)
  let careerMatch = 50;
  if (opp.targetCareerGoals.includes(student.careerGoal)) {
    careerMatch = 96;
    whyMatched.push(`Directly advances your ${student.careerGoal} objective`);
  } else if (student.careerGoal === 'Still Exploring') {
    careerMatch = 82;
    whyMatched.push(`Provides structured exploration for your career direction`);
  } else {
    // Secondary alignment
    const isAdjacent = (student.careerGoal === 'Higher Studies' && opp.targetCareerGoals.includes('Research')) ||
                       (student.careerGoal === 'Research' && opp.targetCareerGoals.includes('Higher Studies')) ||
                       (student.careerGoal === 'Internship' && opp.targetCareerGoals.includes('Placement')) ||
                       (student.careerGoal === 'Startup' && opp.relevantInterests.includes('Product Development'));
    careerMatch = isAdjacent ? 85 : 55;
    if (isAdjacent) {
      whyMatched.push(`Complements your focus on ${student.careerGoal}`);
    }
  }

  // 4. Academic Relevance (10%)
  let academicScore = 65;
  const deptLower = student.academic.department.toLowerCase();
  const acadInterestsLower = student.academic.academicInterests.map(i => i.toLowerCase());

  const deptMatch = opp.academicDisciplines.some(d => 
    d === 'All Disciplines' || 
    d === 'All Engineering Disciplines' || 
    d === 'All Departments' || 
    deptLower.includes(d.toLowerCase()) || 
    d.toLowerCase().includes('computer science')
  );

  const interestSubjMatch = acadInterestsLower.some(ai => 
    opp.relevantInterests.some(oi => oi.toLowerCase().includes(ai) || ai.includes(oi.toLowerCase())) ||
    opp.shortDescription.toLowerCase().includes(ai)
  );

  if (deptMatch && interestSubjMatch) {
    academicScore = 95;
    whyMatched.push(`Reinforces your coursework in ${student.academic.academicInterests[0] || 'core subjects'}`);
  } else if (deptMatch || interestSubjMatch) {
    academicScore = 86;
  }

  // 5. Experience / Level Fit (10%)
  let experienceFit = 85;
  if (opp.requiredExperienceLevel === 'Any') {
    experienceFit = 92;
  } else if (opp.requiredExperienceLevel === 'Beginner') {
    experienceFit = 95;
  } else if (opp.requiredExperienceLevel === 'Intermediate') {
    const hasIntermediate = student.skills.some(s => s.level === 'Intermediate' || s.level === 'Advanced');
    experienceFit = hasIntermediate ? 94 : 70;
  } else if (opp.requiredExperienceLevel === 'Advanced') {
    const hasAdvanced = student.skills.some(s => s.level === 'Advanced');
    experienceFit = hasAdvanced ? 96 : 60;
  }

  // 6. Learning Preference Fit (5%)
  let learningPreferenceFit = 70;
  const prefOverlap = opp.supportedLearningModes.filter(m => student.learningPreferences.includes(m));
  if (prefOverlap.length >= 2) {
    learningPreferenceFit = 95;
    whyMatched.push(`Fits your ${prefOverlap.join(' & ')} learning style`);
  } else if (prefOverlap.length === 1) {
    learningPreferenceFit = 85;
    whyMatched.push(`Engages your preference for ${prefOverlap[0]}`);
  }

  // Calculate Weighted Overall
  let rawScore = 
    (skillMatch * weights.skillWeight) +
    (interestMatch * weights.interestWeight) +
    (careerMatch * weights.careerWeight) +
    (academicScore * weights.academicWeight) +
    (experienceFit * weights.experienceWeight) +
    (learningPreferenceFit * weights.learningWeight);

  // Apply feedback adjustments
  if (student.feedback.notInterestedItemIds.includes(opp.id)) {
    rawScore = Math.max(30, rawScore - 25);
  }
  if (student.feedback.interestedItemIds.includes(opp.id)) {
    rawScore = Math.min(99, rawScore + 3);
  }
  if (student.feedback.savedItemIds.includes(opp.id)) {
    rawScore = Math.min(99, rawScore + 2);
  }

  const overallScore = Math.min(99, Math.max(35, Math.round(rawScore)));

  // Determine skills gained
  const skillsGained = opp.type === 'club' 
    ? (opp as any).skillsDeveloped.slice(0, 3)
    : opp.type === 'event'
    ? (opp as any).skillsDeveloped.slice(0, 3)
    : opp.relevantSkills.slice(0, 3);

  // Determine next action
  let recommendedAction = 'Explore Opportunity';
  if (opp.type === 'club') recommendedAction = 'Explore Club & Meet Lead';
  else if (opp.type === 'event') recommendedAction = 'Register for Event';
  else if (opp.type === 'research') recommendedAction = 'View Call for Papers';
  else if (opp.type === 'mentor') recommendedAction = 'Request Mentorship Guidance';
  else if (opp.type === 'facility') recommendedAction = 'Reserve Lab Induction Pass';
  else if (opp.type === 'peerGroup') recommendedAction = 'Request to Join Group';
  else if (opp.type === 'teammate') recommendedAction = 'Connect with Team Lead';

  // Ensure whyMatched has at least 3 strong points
  if (whyMatched.length < 3) {
    whyMatched.push(`Curated specifically for ${student.academic.yearSemester} trajectory`);
  }

  return {
    overallScore,
    skillMatch,
    interestMatch,
    careerMatch,
    academicRelevance: academicScore,
    experienceFit,
    learningPreferenceFit,
    whyMatched: whyMatched.slice(0, 4),
    skillsGained,
    recommendedAction
  };
}

export function rankOpportunities(
  student: StudentProfile,
  opportunities: CampusOpportunity[],
  weights: ScoringWeights = DEFAULT_WEIGHTS
): ScoredOpportunity[] {
  return opportunities
    .map(opp => ({
      opportunity: opp,
      breakdown: scoreOpportunity(student, opp, weights)
    }))
    .sort((a, b) => b.breakdown.overallScore - a.breakdown.overallScore);
}

export function detectStudentDomain(student: StudentProfile): {
  domain: DomainCategory;
  confidence: number;
  signals: string[];
  explanation: string;
} {
  const scores: Record<DomainCategory, number> = {
    'AI & Machine Learning': 0,
    'Software Development': 0,
    'Entrepreneurship & Innovation': 0,
    'Academic & Scientific Research': 0,
    'Data Science & Analytics': 0,
    'Cybersecurity & Networks': 0,
    'Cloud & Distributed Systems': 0,
    'UI/UX & Product Design': 0
  };

  const signalsMatched: Record<DomainCategory, string[]> = {
    'AI & Machine Learning': [],
    'Software Development': [],
    'Entrepreneurship & Innovation': [],
    'Academic & Scientific Research': [],
    'Data Science & Analytics': [],
    'Cybersecurity & Networks': [],
    'Cloud & Distributed Systems': [],
    'UI/UX & Product Design': []
  };

  // Evaluate Skills
  student.skills.forEach(skill => {
    const sName = skill.name.toLowerCase();
    const mult = PROFICIENCY_MULTIPLIER[skill.level];

    if (sName.includes('python')) {
      scores['AI & Machine Learning'] += 20 * mult;
      scores['Data Science & Analytics'] += 20 * mult;
      signalsMatched['AI & Machine Learning'].push(`Python (${skill.level})`);
    }
    if (sName.includes('ai') || sName.includes('ml') || sName.includes('deep learning')) {
      scores['AI & Machine Learning'] += 35 * mult;
      signalsMatched['AI & Machine Learning'].push(`AI/ML (${skill.level})`);
    }
    if (sName.includes('java') || sName.includes('c++') || sName.includes('data structures') || sName.includes('dsa')) {
      scores['Software Development'] += 30 * mult;
      signalsMatched['Software Development'].push(`${skill.name} (${skill.level})`);
    }
    if (sName.includes('leadership') || sName.includes('public speaking')) {
      scores['Entrepreneurship & Innovation'] += 25 * mult;
      signalsMatched['Entrepreneurship & Innovation'].push(`${skill.name} (${skill.level})`);
    }
    if (sName.includes('product') || sName.includes('management')) {
      scores['Entrepreneurship & Innovation'] += 30 * mult;
      signalsMatched['Entrepreneurship & Innovation'].push(`${skill.name} (${skill.level})`);
    }
    if (sName.includes('ui') || sName.includes('ux') || sName.includes('design')) {
      scores['UI/UX & Product Design'] += 35 * mult;
      signalsMatched['UI/UX & Product Design'].push(`${skill.name} (${skill.level})`);
    }
    if (sName.includes('research')) {
      scores['Academic & Scientific Research'] += 30 * mult;
      scores['AI & Machine Learning'] += 15 * mult;
      signalsMatched['Academic & Scientific Research'].push(`Research (${skill.level})`);
    }
    if (sName.includes('cloud') || sName.includes('devops')) {
      scores['Cloud & Distributed Systems'] += 35 * mult;
      signalsMatched['Cloud & Distributed Systems'].push(`${skill.name} (${skill.level})`);
    }
  });

  // Evaluate Career Goal
  if (student.careerGoal === 'Startup') {
    scores['Entrepreneurship & Innovation'] += 35;
    signalsMatched['Entrepreneurship & Innovation'].push('Startup Career Goal');
  } else if (student.careerGoal === 'Higher Studies' || student.careerGoal === 'Research') {
    scores['Academic & Scientific Research'] += 30;
    scores['AI & Machine Learning'] += 20;
    signalsMatched['Academic & Scientific Research'].push(`${student.careerGoal} Goal`);
  } else if (student.careerGoal === 'Internship' || student.careerGoal === 'Placement') {
    scores['Software Development'] += 25;
    signalsMatched['Software Development'].push(`${student.careerGoal} Focus`);
  }

  // Evaluate Campus & Career Interests
  const allInterests = [...student.campusInterests, ...student.careerInterests];
  allInterests.forEach(item => {
    const itemLower = item.toLowerCase();
    if (itemLower.includes('ai') || itemLower.includes('machine learning')) {
      scores['AI & Machine Learning'] += 20;
      signalsMatched['AI & Machine Learning'].push('AI/ML Interest');
    }
    if (itemLower.includes('research') || itemLower.includes('paper presentations')) {
      scores['Academic & Scientific Research'] += 25;
      signalsMatched['Academic & Scientific Research'].push(item);
    }
    if (itemLower.includes('hackathons')) {
      scores['Software Development'] += 12;
      scores['AI & Machine Learning'] += 12;
      signalsMatched['Software Development'].push('Hackathons Interest');
    }
    if (itemLower.includes('coding competitions')) {
      scores['Software Development'] += 20;
      signalsMatched['Software Development'].push('Coding Competitions');
    }
    if (itemLower.includes('startups') || itemLower.includes('entrepreneurship') || itemLower.includes('networking')) {
      scores['Entrepreneurship & Innovation'] += 25;
      signalsMatched['Entrepreneurship & Innovation'].push(item);
    }
  });

  // Determine top domain
  let topDomain: DomainCategory = 'AI & Machine Learning';
  let maxScore = -1;

  (Object.keys(scores) as DomainCategory[]).forEach(domain => {
    if (scores[domain] > maxScore) {
      maxScore = scores[domain];
      topDomain = domain;
    }
  });

  // Calculate confidence percentage
  const totalScore = Object.values(scores).reduce((a, b) => a + b, 0);
  const confidence = totalScore > 0 
    ? Math.min(97, Math.max(78, Math.round((maxScore / totalScore) * 100 * 2.2)))
    : 85;

  const topSignals = Array.from(new Set(signalsMatched[topDomain])).slice(0, 5);

  const explanation = `${confidence}% of your current profile signals (skills, career ambition, and extracurricular selections) strongly align with ${topDomain}.`;

  return {
    domain: topDomain,
    confidence,
    signals: topSignals.length > 0 ? topSignals : ['Core Technical Skills', 'Campus Engagement', 'Career Trajectory'],
    explanation
  };
}

export function generateCampusPathway(
  student: StudentProfile,
  domain: DomainCategory
): CampusPathway {
  if (domain === 'AI & Machine Learning') {
    return {
      domain,
      pathwayTitle: 'AI Engineering & Research Specialization Pathway',
      description: 'A curated journey transforming foundational Python proficiency into published conference research and competitive AI prototypes.',
      estimatedDuration: 'Semester 5 – Semester 8 (18 Months)',
      steps: [
        {
          stepNumber: 1,
          stageName: 'Theory & Foundations',
          title: 'Deep Learning with PyTorch Workshop',
          category: 'Foundation',
          description: 'Solidify gradient descent, backpropagation, and transformer attention mechanisms in a structured 2-day hands-on cohort.',
          linkedOpportunityId: 'evt-cv-workshop',
          skillsReinforced: ['Python', 'PyTorch', 'Tensor Math'],
          status: 'Completed'
        },
        {
          stepNumber: 2,
          stageName: 'Campus Society',
          title: 'Active Member — AI & Robotics Innovation Club',
          category: 'Community',
          description: 'Participate in weekly paper reading circles and join a student sub-team working on edge vision sensor fusion.',
          linkedOpportunityId: 'club-ai-robotics',
          skillsReinforced: ['Computer Vision', 'Collaborative Git', 'OpenCV'],
          status: 'In Progress'
        },
        {
          stepNumber: 3,
          stageName: 'Lab Induction',
          title: 'Lab Desk Access at Computer Vision Facility',
          category: 'Mentorship',
          description: 'Complete the lab safety and GPU cluster induction test under Dr. Alok Sharma to run high-epoch model trainings.',
          linkedOpportunityId: 'fac-ai-cv-lab',
          skillsReinforced: ['CUDA', 'RTX A6000 Workstations', 'Experiment Tracking'],
          status: 'Next Up'
        },
        {
          stepNumber: 4,
          stageName: 'Practical Build',
          title: 'Mini-Project: Ultrasound Denoising or Drone Vision',
          category: 'Project',
          description: 'Synthesize custom dataset and benchmark vision transformer against baseline CNN models with verifiable metrics.',
          skillsReinforced: ['Model Fine-Tuning', 'Metrics Evaluation', 'FastAPI'],
          status: 'Upcoming'
        },
        {
          stepNumber: 5,
          stageName: 'High-Stakes Hackathon',
          title: 'Apex AI Innovation 48-Hour Hackathon',
          category: 'Competition',
          description: 'Collaborate with complementary teammates to deploy a functioning live AI application in front of industry judges.',
          linkedOpportunityId: 'evt-hack-ai-innov',
          skillsReinforced: ['Rapid Prototyping', 'Product Pitch', 'Agentic Workflows'],
          status: 'Upcoming'
        },
        {
          stepNumber: 6,
          stageName: 'Academic Publication',
          title: 'Submit Paper to Annual AI Research Symposium',
          category: 'Research',
          description: 'Format findings according to IEEE standards, undergo faculty peer review, and present poster defense.',
          linkedOpportunityId: 'res-ai-symposium',
          skillsReinforced: ['Scientific Writing', 'Oral Defense', 'Literature Review'],
          status: 'Upcoming'
        },
        {
          stepNumber: 7,
          stageName: 'Career Culmination',
          title: 'Graduate Admissions Portfolio / Tier-1 Research Fellowship',
          category: 'Career',
          description: 'Consolidate published papers, open-source repositories, and faculty recommendation letters into an undeniable profile.',
          skillsReinforced: ['Research Dossier', 'Statement of Purpose', 'Faculty Endorsement'],
          status: 'Upcoming'
        }
      ]
    };
  }

  if (domain === 'Software Development') {
    return {
      domain,
      pathwayTitle: 'High-Concurrency Software Engineer Pathway',
      description: 'A focused track mastering algorithmic complexity, resilient distributed architectures, and competitive interview execution.',
      estimatedDuration: 'Semester 5 – Semester 7 (12 Months)',
      steps: [
        {
          stepNumber: 1,
          stageName: 'Core Algorithms',
          title: 'Daily LeetCode & Advanced DSA Circle',
          category: 'Foundation',
          description: 'Daily discipline solving 2 medium/hard dynamic programming and graph problems with peer code walkthroughs.',
          linkedOpportunityId: 'peer-dsa-circle',
          skillsReinforced: ['Dynamic Programming', 'Graph Theory', 'Time Complexity'],
          status: 'In Progress'
        },
        {
          stepNumber: 2,
          stageName: 'Campus Society',
          title: 'CodeCrafters Competitive Programming Wing',
          category: 'Community',
          description: 'Represent campus in ICPC regionals and Codeforces contests with weekly coached problem-solving sessions.',
          linkedOpportunityId: 'club-codecrafters',
          skillsReinforced: ['Competitive C++/Java', 'Speed Debugging', 'Memory Optimization'],
          status: 'Next Up'
        },
        {
          stepNumber: 3,
          stageName: 'Systems Mentorship',
          title: 'Systems Lab Project with Prof. Rajesh Patel',
          category: 'Mentorship',
          description: 'Architect a fault-tolerant RPC framework or asynchronous key-value store in the Systems Lab.',
          linkedOpportunityId: 'fac-mentor-patel',
          skillsReinforced: ['Concurrency', 'Network Sockets', 'Distributed Consensus'],
          status: 'Upcoming'
        },
        {
          stepNumber: 4,
          stageName: 'Hackathon Crucible',
          title: 'Tri-Campus 36hr Full-Stack & Systems Hackathon',
          category: 'Competition',
          description: 'Ship a high-throughput microservices architecture with real-time metrics in an intense 36-hour sprint.',
          linkedOpportunityId: 'evt-hack-campus-code',
          skillsReinforced: ['Docker', 'REST/gRPC', 'PostgreSQL Internals'],
          status: 'Upcoming'
        },
        {
          stepNumber: 5,
          stageName: 'Mock Screening',
          title: '48-Hour Algorithmic Mastery & Mock Coding Sprint',
          category: 'Competition',
          description: 'Undergo simulated FAANG technical rounds and receive line-by-line alumni code reviews.',
          linkedOpportunityId: 'evt-dsa-interview-sprint',
          skillsReinforced: ['Technical Communication', 'Live Whiteboarding', 'Edge Cases'],
          status: 'Upcoming'
        },
        {
          stepNumber: 6,
          stageName: 'Career Culmination',
          title: 'Top-Tier Software Engineering Internship Placement',
          category: 'Career',
          description: 'Convert competitive programming pedigree and systems project portfolio into Tier-1 SWE offers.',
          skillsReinforced: ['System Design', 'Interview Execution', 'Offer Negotiation'],
          status: 'Upcoming'
        }
      ]
    };
  }

  // Entrepreneurship & Innovation Pathway
  return {
    domain,
    pathwayTitle: 'Student Founder & Venture Builder Pathway',
    description: 'A venture acceleration sequence taking student concepts through customer discovery, rapid prototyping, and angel investor funding.',
    estimatedDuration: 'Semester 6 – Semester 8 (12 Months)',
    steps: [
      {
        stepNumber: 1,
        stageName: 'Ecosystem Discovery',
        title: 'Join Campus E-Cell & Founder Syndicate',
        category: 'Community',
        description: 'Engage with fellow student builders, attend founder fireside chats, and identify validated campus pain points.',
        linkedOpportunityId: 'club-ecell-syndicate',
        skillsReinforced: ['Customer Discovery', 'Team Building', 'Market Sizing'],
        status: 'In Progress'
      },
      {
        stepNumber: 2,
        stageName: 'Incubation Space',
        title: 'Apply for Team Pod at Incubation Center',
        category: 'Foundation',
        description: 'Secure 24/7 dedicated working space, 3D prototyping tools, and cloud infrastructure credits under Dr. Sunita Vance.',
        linkedOpportunityId: 'fac-incubation-center',
        skillsReinforced: ['Lean Canvas', 'Prototyping', 'Resource Allocation'],
        status: 'Next Up'
      },
      {
        stepNumber: 3,
        stageName: 'Complementary Team',
        title: 'Recruit Technical Co-Founders via Teammate Matching',
        category: 'Mentorship',
        description: 'Pair business & product leadership with full-stack systems and machine learning engineers to build your MVP.',
        linkedOpportunityId: 'team-fintech-saas',
        skillsReinforced: ['Technical Direction', 'Equity Structuring', 'Cross-Disciplinary Leadership'],
        status: 'Upcoming'
      },
      {
        stepNumber: 4,
        stageName: 'Product Validation',
        title: 'Student Founders & Product Builders Mastermind',
        category: 'Project',
        description: 'Weekly sprint tracking to launch interactive MVP and acquire the first 100 active campus users.',
        linkedOpportunityId: 'peer-founder-mastermind',
        skillsReinforced: ['User Interviews', 'Retention Analytics', 'Figma Prototyping'],
        status: 'Upcoming'
      },
      {
        stepNumber: 5,
        stageName: 'Venture Pitch',
        title: 'Apex Angel Pitch & Venture Summit 2026',
        category: 'Competition',
        description: 'Pitch to regional angel syndicates on the main stage to secure non-dilutive seed grants.',
        linkedOpportunityId: 'evt-angel-pitch-summit',
        skillsReinforced: ['Investor Pitching', 'Unit Economics', 'Executive Presence'],
        status: 'Upcoming'
      },
      {
        stepNumber: 6,
        stageName: 'Venture Incorporation',
        title: 'Legal Incorporation & Seed Fund Close',
        category: 'Career',
        description: 'Incorporate legal entity through campus IP advisory and graduate with an operational, venture-backed startup.',
        skillsReinforced: ['Cap Table Management', 'IP Protection', 'Early Scaling'],
        status: 'Upcoming'
      }
    ]
  };
}
