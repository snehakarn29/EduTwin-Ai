import { StudentProfile } from '../types';

export const DEMO_PERSONAS: Record<'personaA' | 'personaB' | 'personaC', StudentProfile> = {
  personaA: {
    id: 'anmol-sharma-cse',
    name: 'Anmol Sharma',
    avatarInitials: 'AS',
    avatarUrl: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=400&q=80',
    tagline: 'Grade 2 Sorcerer • CSE 3rd Year • Software Development',
    sorcererGrade: 'Grade 2 Sorcerer',
    level: 14,
    xp: 3850,
    nextLevelXp: 4500,
    attendanceOverall: 82,
    academic: {
      university: 'Chandigarh University',
      department: 'Computer Science & Engineering (CSE)',
      yearSemester: '3rd Year, Semester 5',
      cgpa: 7.8,
      academicInterests: ['Algorithms', 'Deep Learning', 'Computer Vision', 'Competitive Programming'],
      subjectsStrength: ['Data Structures & Algorithms', 'Database Management', 'Object-Oriented Programming'],
      subjectsImprovement: ['Distributed Systems', 'Computer Networks']
    },
    skills: [
      { name: 'Programming', level: 'Advanced', category: 'Programming' },
      { name: 'AI/ML', level: 'Advanced', category: 'Emerging Tech' },
      { name: 'Web Dev', level: 'Intermediate', category: 'Development' },
      { name: 'Problem Solving', level: 'Advanced', category: 'Core' },
      { name: 'Communication', level: 'Intermediate', category: 'Core' },
      { name: 'Leadership', level: 'Intermediate', category: 'Core' },
      { name: 'Python', level: 'Advanced', category: 'Programming' },
      { name: 'C++', level: 'Advanced', category: 'Programming' }
    ],
    careerGoal: 'Internship',
    careerInterests: ['Software Development', 'AI/ML', 'Data Science', 'Competitive Programming'],
    learningPreferences: ['Practical Coding', 'Projects', 'Reading', 'Group Study'],
    campusInterests: ['Hackathons', 'Coding Competitions', 'Technical Clubs', 'Research', 'Conferences'],
    courses: [
      {
        id: 'c1',
        code: 'CS501',
        name: 'Deep Learning & Neural Architectures',
        instructor: 'Dr. Alok Sharma',
        credits: 4,
        currentAttendance: 88,
        attendedClasses: 22,
        totalClasses: 25,
        weakTopics: ['Backpropagation through Time in RNNs', 'Attention Map Visualization']
      },
      {
        id: 'c2',
        code: 'CS502',
        name: 'Distributed Systems & Cloud Computing',
        instructor: 'Prof. Rajesh Patel',
        credits: 4,
        currentAttendance: 74, // Below 75% warning!
        attendedClasses: 17,
        totalClasses: 23,
        weakTopics: ['Byzantine Agreement Protocols', 'Raft Consensus Leadership Election']
      },
      {
        id: 'c3',
        code: 'CS503',
        name: 'Computer Vision & Multi-Sensor Fusion',
        instructor: 'Dr. Meera Nambiar',
        credits: 3,
        currentAttendance: 92,
        attendedClasses: 23,
        totalClasses: 25,
        weakTopics: ['Stereo Disparity Epipolar Geometry', 'Kalman Filter State Estimation']
      },
      {
        id: 'c4',
        code: 'MATH501',
        name: 'Optimization Techniques & Convex Analysis',
        instructor: 'Dr. K. Raman',
        credits: 3,
        currentAttendance: 84,
        attendedClasses: 21,
        totalClasses: 25,
        weakTopics: ['Lagrange Dual Multipliers', 'KKT Optimality Conditions']
      }
    ],
    deadlines: [
      {
        id: 'd1',
        title: 'Neural Style Transfer Lab Milestone 3',
        courseCode: 'CS501',
        dueDate: 'Oct 8, 2026',
        type: 'Lab',
        priority: 'High',
        status: 'pending'
      },
      {
        id: 'd2',
        title: 'Raft Consensus Simulation Implementation',
        courseCode: 'CS502',
        dueDate: 'Oct 14, 2026',
        type: 'Assignment',
        priority: 'High',
        status: 'pending'
      },
      {
        id: 'd3',
        title: 'Mid-Term Exam: Convex Optimization',
        courseCode: 'MATH501',
        dueDate: 'Oct 22, 2026',
        type: 'MidTerm',
        priority: 'Medium',
        status: 'pending'
      }
    ],
    quests: [
      {
        id: 'q1',
        gradeTier: 'Grade 4 Sorcerer',
        title: 'Awakening: Campus Orientation & Git Setup',
        subtitle: 'Foundational Cursed Energy Control',
        xpReward: 150,
        badgeName: 'Neophyte Sorcerer',
        status: 'completed',
        description: 'Complete student twin profiling, configure SSH keys, and commit first repository.',
        requirements: ['Verify student credentials', 'Setup GitHub workspace', 'Complete Twin DNA calibration']
      },
      {
        id: 'q2',
        gradeTier: 'Grade 3 Sorcerer',
        title: 'First Curse Exorcism: Join Technical Society',
        subtitle: 'Community Integration',
        xpReward: 300,
        badgeName: 'Clan Initiate',
        status: 'completed',
        description: 'Enlist in a verified campus technical club and attend the introductory seminar.',
        requirements: ['Join AI & Robotics Innovation Club', 'Attend 2 coding sprint nights']
      },
      {
        id: 'q3',
        gradeTier: 'Grade 2 Sorcerer',
        title: 'Domain Synthesis: Deploy Capstone ML Project',
        subtitle: 'Specialized Model Deployment',
        xpReward: 500,
        badgeName: 'Neural Weaver',
        status: 'in_progress',
        description: 'Deploy a functioning computer vision or LLM prototype tested on campus servers.',
        requirements: ['Train custom PyTorch model', 'Deploy on FastAPI / Docker', 'Demonstrate to faculty lead']
      },
      {
        id: 'q4',
        gradeTier: 'Grade 1 Sorcerer',
        title: 'Grand Tournament: Compete in 48-Hour Hackathon',
        subtitle: 'High-Stakes Combat',
        xpReward: 750,
        badgeName: 'Battle Veteran',
        status: 'locked',
        description: 'Lead or participate in a multidisciplinary team at the Apex AI Innovation Hackathon.',
        requirements: ['Assemble complementary team', 'Submit working prototype before deadline', 'Pass judges screening']
      },
      {
        id: 'q5',
        gradeTier: 'Special Grade Sorcerer',
        title: '領域展開: Infinite Horizon Domain Expansion',
        subtitle: 'Ultimate Career Mastery',
        xpReward: 1500,
        badgeName: 'Special Grade Domain Bearer',
        status: 'locked',
        description: 'Publish original research or secure a Tier-1 industrial research fellowship.',
        requirements: ['IEEE / Scopus Paper Submission', 'Maintain >8.5 CGPA', 'Tier-1 Fellowship Offer']
      }
    ],
    privacy: {
      optInPeerMatching: true,
      allowTeammateDiscovery: true,
      shareAcademicStats: false
    },
    feedback: {
      savedItemIds: ['fac-ai-cv-lab'],
      interestedItemIds: ['club-ai-robotics', 'evt-hack-ai-innov'],
      notInterestedItemIds: ['evt-cultural-dance-fest'],
      participatedItemIds: []
    },
    evolutionHistory: [
      {
        timestamp: '1 month ago',
        previousDomain: 'Software Development',
        newDomain: 'AI & Machine Learning',
        reason: 'Completed Deep Learning Specialization and submitted abstract to Campus Vision Lab'
      }
    ]
  },

  personaB: {
    id: 'priya-sharma-swe',
    name: 'Priya Sharma',
    avatarInitials: 'PS',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    tagline: 'Grade 1 Sorcerer • High-Concurrency Backend & Competitive Coding Champion',
    sorcererGrade: 'Grade 1 Sorcerer',
    level: 18,
    xp: 5200,
    nextLevelXp: 6000,
    attendanceOverall: 89.2,
    academic: {
      university: 'Apex Institute of Technology',
      department: 'Computer Science & Engineering',
      yearSemester: 'Year 3, Semester 6',
      cgpa: 8.78,
      academicInterests: ['Distributed Systems', 'Compiler Design', 'System Architecture', 'Algorithmic Optimization'],
      subjectsStrength: ['Data Structures & Algorithms', 'Operating Systems', 'Database Systems'],
      subjectsImprovement: ['UI/UX Wireframing', 'AI Model Fine-tuning']
    },
    skills: [
      { name: 'Java', level: 'Advanced', category: 'Programming' },
      { name: 'C++', level: 'Intermediate', category: 'Programming' },
      { name: 'JavaScript', level: 'Intermediate', category: 'Development' },
      { name: 'Data Structures', level: 'Advanced', category: 'Core' },
      { name: 'Cloud', level: 'Intermediate', category: 'Development' },
      { name: 'Leadership', level: 'Beginner', category: 'Core' }
    ],
    careerGoal: 'Internship',
    careerInterests: ['Software Development', 'Cloud', 'Data Science'],
    learningPreferences: ['Practical Coding', 'Projects', 'Quizzes', 'Instructor-led Learning'],
    campusInterests: ['Coding Competitions', 'Hackathons', 'Technical Clubs', 'Workshops'],
    courses: [
      {
        id: 'c1',
        code: 'CS601',
        name: 'Advanced Operating Systems & Kernel Internals',
        instructor: 'Prof. Rajesh Patel',
        credits: 4,
        currentAttendance: 91,
        attendedClasses: 20,
        totalClasses: 22,
        weakTopics: ['Virtual Memory Page Replacement Algorithms', 'Deadlock Detection in Distributed Systems']
      },
      {
        id: 'c2',
        code: 'CS602',
        name: 'Database Storage Engine Design',
        instructor: 'Dr. Sunita Vance',
        credits: 4,
        currentAttendance: 88,
        attendedClasses: 22,
        totalClasses: 25,
        weakTopics: ['B+ Tree Split Invariants', 'Write-Ahead Logging Recovery']
      }
    ],
    deadlines: [
      {
        id: 'd1',
        title: 'Custom Kernel Module Lab Submission',
        courseCode: 'CS601',
        dueDate: 'Oct 12, 2026',
        type: 'Lab',
        priority: 'High',
        status: 'pending'
      }
    ],
    quests: [
      {
        id: 'q1',
        gradeTier: 'Grade 4 Sorcerer',
        title: 'Awakening: Campus Orientation',
        subtitle: 'Foundational Cursed Energy Control',
        xpReward: 150,
        badgeName: 'Neophyte Sorcerer',
        status: 'completed',
        description: 'Complete student twin profiling.',
        requirements: ['Verify student credentials']
      },
      {
        id: 'q2',
        gradeTier: 'Grade 3 Sorcerer',
        title: 'First Curse Exorcism: Join CodeCrafters',
        subtitle: 'Community Integration',
        xpReward: 300,
        badgeName: 'CodeCrafter Initiate',
        status: 'completed',
        description: 'Participate in weekly LeetCode sprints.',
        requirements: ['Solve 50+ medium problems']
      },
      {
        id: 'q3',
        gradeTier: 'Grade 2 Sorcerer',
        title: '36hr Hackathon Victory',
        subtitle: 'Battle-Tested Systems',
        xpReward: 500,
        badgeName: 'System Architect',
        status: 'completed',
        description: 'Ship a high-throughput microservices architecture.',
        requirements: ['Deploy with Docker & PostgreSQL']
      },
      {
        id: 'q4',
        gradeTier: 'Grade 1 Sorcerer',
        title: 'FAANG Technical Screening Sprint',
        subtitle: 'Top Tier Mock Gauntlet',
        xpReward: 750,
        badgeName: 'Competitive Sorcerer',
        status: 'in_progress',
        description: 'Complete mock technical interviews with alumni.',
        requirements: ['Clear Dynamic Programming round']
      }
    ],
    privacy: {
      optInPeerMatching: true,
      allowTeammateDiscovery: true,
      shareAcademicStats: false
    },
    feedback: {
      savedItemIds: ['peer-dsa-circle'],
      interestedItemIds: ['club-codecrafters', 'evt-hack-campus-code'],
      notInterestedItemIds: [],
      participatedItemIds: []
    },
    evolutionHistory: [
      {
        timestamp: '2 weeks ago',
        previousDomain: 'Software Development',
        newDomain: 'Software Development',
        reason: 'Consistently engaged in Algorithm Sprint Contests and Web Dev Labs'
      }
    ]
  },

  personaC: {
    id: 'rohan-kapoor-startup',
    name: 'Rohan Kapoor',
    avatarInitials: 'RK',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    tagline: 'Grade 1 Sorcerer • Student Founder, Venture Lead & Product Architect',
    sorcererGrade: 'Grade 1 Sorcerer',
    level: 19,
    xp: 5600,
    nextLevelXp: 6500,
    attendanceOverall: 82.0,
    academic: {
      university: 'Apex Institute of Technology',
      department: 'Information Technology & Venture Management',
      yearSemester: 'Year 4, Semester 7',
      cgpa: 8.24,
      academicInterests: ['Venture Capital', 'Product Analytics', 'User Research', 'Technology Commercialization'],
      subjectsStrength: ['Product Management', 'Organizational Leadership', 'Software Engineering'],
      subjectsImprovement: ['Low-level Embedded C', 'Kernel Programming']
    },
    skills: [
      { name: 'Leadership', level: 'Advanced', category: 'Core' },
      { name: 'Product Development', level: 'Advanced', category: 'Development' },
      { name: 'UI/UX', level: 'Intermediate', category: 'Development' },
      { name: 'Public Speaking', level: 'Advanced', category: 'Core' },
      { name: 'JavaScript', level: 'Beginner', category: 'Programming' },
      { name: 'IoT', level: 'Beginner', category: 'Emerging Tech' }
    ],
    careerGoal: 'Startup',
    careerInterests: ['Entrepreneurship', 'Product Development', 'UI/UX'],
    learningPreferences: ['Projects', 'Group Study', 'Video', 'Instructor-led Learning'],
    campusInterests: ['Entrepreneurship', 'Networking', 'Hackathons', 'Public Speaking', 'Conferences'],
    courses: [
      {
        id: 'c1',
        code: 'ENT701',
        name: 'Venture Capital & Early-Stage Scaling',
        instructor: 'Dr. Sunita Vance',
        credits: 3,
        currentAttendance: 85,
        attendedClasses: 17,
        totalClasses: 20,
        weakTopics: ['Convertible Notes vs SAFE Equity Agreements', 'Unit Economics Cohort Retention']
      }
    ],
    deadlines: [
      {
        id: 'd1',
        title: 'Investor Deck Clinic Submission',
        courseCode: 'ENT701',
        dueDate: 'Oct 15, 2026',
        type: 'Project Submission',
        priority: 'High',
        status: 'pending'
      }
    ],
    quests: [
      {
        id: 'q1',
        gradeTier: 'Grade 4 Sorcerer',
        title: 'Awakening: Campus Orientation',
        subtitle: 'Foundational Cursed Energy Control',
        xpReward: 150,
        badgeName: 'Neophyte Sorcerer',
        status: 'completed',
        description: 'Complete student twin profiling.',
        requirements: ['Verify student credentials']
      },
      {
        id: 'q2',
        gradeTier: 'Grade 3 Sorcerer',
        title: 'Join E-Cell Founder Syndicate',
        subtitle: 'Venture Incubation',
        xpReward: 300,
        badgeName: 'Syndicate Founder',
        status: 'completed',
        description: 'Connect with co-founders.',
        requirements: ['Join incubation pod']
      },
      {
        id: 'q3',
        gradeTier: 'Grade 2 Sorcerer',
        title: 'Launch Campus MVP',
        subtitle: 'First 100 Users',
        xpReward: 500,
        badgeName: 'Venture Builder',
        status: 'completed',
        description: 'Acquire first 100 organic campus users.',
        requirements: ['Launch MVP on campus portal']
      },
      {
        id: 'q4',
        gradeTier: 'Grade 1 Sorcerer',
        title: 'Apex Angel Pitch Summit',
        subtitle: 'Live Investor Pitch Arena',
        xpReward: 750,
        badgeName: 'Master Pitcher',
        status: 'in_progress',
        description: 'Pitch to regional angel syndicates on the main stage.',
        requirements: ['Finalist pitch at Angel Summit']
      }
    ],
    privacy: {
      optInPeerMatching: true,
      allowTeammateDiscovery: true,
      shareAcademicStats: false
    },
    feedback: {
      savedItemIds: ['fac-incubation-center'],
      interestedItemIds: ['club-ecell-syndicate', 'evt-angel-pitch-summit'],
      notInterestedItemIds: [],
      participatedItemIds: []
    },
    evolutionHistory: [
      {
        timestamp: '3 weeks ago',
        previousDomain: 'UI/UX & Product Design',
        newDomain: 'Entrepreneurship & Innovation',
        reason: 'Selected as Venture Lead for Campus Innovation Seed Fund Cohort'
      }
    ]
  }
};
