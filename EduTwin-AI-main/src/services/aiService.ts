import { GoogleGenAI } from '@google/genai';
import { StudentProfile, CampusOpportunity } from '../types';

// Safely get API key in browser or node environments without throwing ReferenceErrors
function getApiKey(): string {
  try {
    if (typeof import.meta !== 'undefined' && (import.meta as any).env?.VITE_GEMINI_API_KEY) {
      return (import.meta as any).env.VITE_GEMINI_API_KEY;
    }
  } catch (e) {}

  try {
    if (typeof window !== 'undefined' && (window as any).GEMINI_API_KEY) {
      return (window as any).GEMINI_API_KEY;
    }
  } catch (e) {}

  try {
    if (typeof process !== 'undefined' && process.env && process.env.GEMINI_API_KEY) {
      return process.env.GEMINI_API_KEY;
    }
  } catch (e) {}

  return '';
}

function getAIClient(): GoogleGenAI | null {
  const key = getApiKey();
  if (!key || key === 'MY_GEMINI_API_KEY' || key.trim() === '') {
    return null;
  }
  try {
    return new GoogleGenAI({ apiKey: key });
  } catch (e) {
    console.warn('Failed to initialize GoogleGenAI client:', e);
    return null;
  }
}

export async function chatWithFutureSelf(
  student: StudentProfile,
  userMessage: string,
  targetYear: string = '2028'
): Promise<string> {
  const prompt = `You are ${student.name}'s Future Self in year ${targetYear}.
You are currently a Special Grade Sorcerer in engineering and technology (holding a top position at a leading AI/Tech lab or high-growth venture).
Current student background:
- Major: ${student.academic.department}
- University: ${student.academic.university}
- Year/Standing: ${student.academic.yearSemester}
- Current Career Goal: ${student.careerGoal}
- Current Skills: ${student.skills.map(s => `${s.name} (${s.level})`).join(', ')}

Respond in character as their wise, confident, encouraging future self.
Infuse subtle energetic Jujutsu Kaisen / Cursed Energy domain metaphors (like mastering your innate technique, channeling focus into output, expanding your domain of influence).
Keep the advice practical, specific, grounded in real software/AI engineering, and within 3-4 sentences.

Student asks: "${userMessage}"`;

  try {
    const ai = getAIClient();
    if (ai) {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt
      });
      if (response.text) return response.text.trim();
    }
  } catch (error) {
    console.warn('Gemini API call failed, using intelligent cursed fallback:', error);
  }

  // Intelligent, contextual fallback
  const lowerMsg = userMessage.toLowerCase();
  if (lowerMsg.includes('burnout') || lowerMsg.includes('stress') || lowerMsg.includes('tired')) {
    return `Looking back from 2028, I remember that exact slump in ${student.academic.yearSemester}. Remember: even Satoru Gojo paced his cursed energy consumption. Take 48 hours to sleep and reset, then refocus on 1 high-leverage project instead of five mediocre ones. Your domain expansion only works when your core energy is restored.`;
  }
  if (lowerMsg.includes('internship') || lowerMsg.includes('placement') || lowerMsg.includes('job')) {
    return `In 2028, what actually opened doors wasn't just solving 400 LeetCode problems—it was that custom ${student.skills[0]?.name || 'Python'} project we deployed live for real campus users. Double down on shipping verifiable code with Docker and gRPC, and the Tier-1 offers will seek you out.`;
  }
  if (lowerMsg.includes('cgpa') || lowerMsg.includes('grades') || lowerMsg.includes('attendance')) {
    return `Keep that attendance safely above the 75% barrier so the academic council doesn't hold you back from campus hackathons. Your GPA gets you past the initial automated screen, but your innate technical mastery is what closes the deal in the final round. Keep the balance!`;
  }
  return `Trust the trajectory we laid out back in ${student.academic.yearSemester}. The late nights you're putting into ${student.skills[0]?.name || 'your tech stack'} and participating in campus hackathons directly compounded into our 2028 breakthroughs. Keep channeling your cursed energy into production code!`;
}

export async function generateWhyAttendInsight(
  student: StudentProfile,
  opportunity: CampusOpportunity
): Promise<{
  headline: string;
  whyMatters: string;
  whatYouLearn: string;
  resumeAdd: string;
  nextSteps: string;
}> {
  const prompt = `Analyze why student ${student.name} should attend the campus opportunity "${opportunity.title}".
Student Profile:
- Skills: ${student.skills.map(s => `${s.name} (${s.level})`).join(', ')}
- Career Goal: ${student.careerGoal}
- Academic: ${student.academic.department}, ${student.academic.yearSemester}
Opportunity:
- Title: ${opportunity.title}
- Type: ${opportunity.type}
- Required Skills: ${opportunity.relevantSkills.join(', ')}
- Description: ${opportunity.shortDescription}

Return a valid JSON object strictly matching this schema:
{
  "headline": "Short impactful punchline",
  "whyMatters": "2 sentences on why this directly elevates their career",
  "whatYouLearn": "Specific technical and domain competencies they will unlock",
  "resumeAdd": "Exact bullet point format to put on resume",
  "nextSteps": "Actionable step to register or prepare right now"
}`;

  try {
    const ai = getAIClient();
    if (ai) {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt
      });
      const text = response.text?.trim() || '';
      const cleanJson = text.replace(/```json/g, '').replace(/```/g, '').trim();
      const parsed = JSON.parse(cleanJson);
      return parsed;
    }
  } catch (error) {
    console.warn('Gemini API call failed, generating procedural insight:', error);
  }

  // High-fidelity fallback
  return {
    headline: `Direct Catalyst for your ${student.careerGoal} Trajectory`,
    whyMatters: `This ${opportunity.type} directly bridges your current ${student.skills[0]?.name || 'core'} competencies with production-grade engineering challenges, creating verifiable proof of mastery for recruiters.`,
    whatYouLearn: `Hands-on implementation of ${opportunity.relevantSkills.slice(0, 3).join(', ')}, rapid collaborative debugging under tight constraints, and executive technical presentation.`,
    resumeAdd: `Engineered solutions for ${opportunity.title}, collaborating across multidisciplinary teams to deploy functional prototypes utilizing ${opportunity.relevantSkills.slice(0, 2).join(' & ')}.`,
    nextSteps: `Check eligibility requirements, connect with team leads in ${opportunity.location}, and submit your registration before deadlines.`
  };
}

export async function generateStudyGuideForWeakTopic(
  courseName: string,
  topicName: string,
  studentLevel: string = 'Intermediate'
): Promise<{
  conceptualExplanation: string;
  intuitiveAnalogy: string;
  practiceProblems: string[];
  examTips: string;
}> {
  const prompt = `Generate a high-yield study guide for an engineering student struggling with the topic "${topicName}" in course "${courseName}".
Student Level: ${studentLevel}.

Return a valid JSON object strictly matching this schema:
{
  "conceptualExplanation": "Clear, concise 2-3 paragraph breakdown of the concept without fluff",
  "intuitiveAnalogy": "A brilliant intuitive analogy that makes the concept click permanently",
  "practiceProblems": ["Problem 1 with answer hint", "Problem 2 with answer hint", "Problem 3 with answer hint"],
  "examTips": "Crucial edge cases and common pitfalls professors test on"
}`;

  try {
    const ai = getAIClient();
    if (ai) {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt
      });
      const text = response.text?.trim() || '';
      const cleanJson = text.replace(/```json/g, '').replace(/```/g, '').trim();
      return JSON.parse(cleanJson);
    }
  } catch (error) {
    console.warn('Gemini API call failed, providing curated academic diagnostic:', error);
  }

  // Fallback study guide
  return {
    conceptualExplanation: `${topicName} is foundational to ${courseName}. Focus on the mathematical invariants and the flow of state transitions. When analyzing efficiency, trace the best, average, and worst-case bounds.`,
    intuitiveAnalogy: `Think of ${topicName} like a high-speed airport baggage conveyor belt: bottlenecks only occur if baggage handlers (worker threads) hold shared locks at the same terminal gate simultaneously.`,
    practiceProblems: [
      `Derive the state recurrence relation for ${topicName} given an array of length N (Hint: examine subproblem overlap).`,
      `Design an edge-case test suite where memory consumption exceeds O(1) space complexity.`,
      `Analyze why greedy choice fails when negative edge weights or dependencies are introduced.`
    ],
    examTips: `Professors love testing edge cases such as null inputs, cycle detection, and off-by-one boundary indices. Always state your base cases first before expanding recurrences!`
  };
}

export async function generateExperienceResumeAndLinkedIn(
  student: StudentProfile,
  opportunityName: string,
  role: string,
  achievements: string[]
): Promise<{
  resumeBullet: string;
  linkedinPost: string;
  newSkillsSuggested: string[];
}> {
  const prompt = `Student ${student.name} just completed participation in "${opportunityName}" as "${role}".
Key Achievements: ${achievements.join(', ')}.
Generate:
1. An ATS-compliant, high-impact resume bullet point following Google XYZ formula (Accomplished [X] as measured by [Y] by doing [Z]).
2. A professional, engaging LinkedIn announcement post with clean linebreaks and hashtags.
3. 3 suggested technical/soft skills to add to their profile.

Return valid JSON:
{
  "resumeBullet": "string",
  "linkedinPost": "string",
  "newSkillsSuggested": ["skill1", "skill2", "skill3"]
}`;

  try {
    const ai = getAIClient();
    if (ai) {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt
      });
      const text = response.text?.trim() || '';
      const cleanJson = text.replace(/```json/g, '').replace(/```/g, '').trim();
      return JSON.parse(cleanJson);
    }
  } catch (error) {
    console.warn('Gemini API call failed, generating structured career logs:', error);
  }

  return {
    resumeBullet: `Spearheaded technical development as ${role} for ${opportunityName}, deploying high-throughput modules and achieving ${achievements[0] || '1st place finalist honors'} across 120+ participants.`,
    linkedinPost: `Excited to share that I recently competed in ${opportunityName} as ${role}! 🚀\n\nOur team tackled complex engineering constraints, building prototypes that solved key campus bottlenecks. Grateful to mentors and fellow sorcerer builders for the collaboration.\n\n#EduTwin #Engineering #Innovation #StudentBuilder #TechCommunity`,
    newSkillsSuggested: ['Rapid Prototyping', 'Collaborative Git Workflow', 'Technical Pitching']
  };
}
