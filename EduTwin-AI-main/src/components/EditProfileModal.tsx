import React, { useState, useRef } from 'react';
import { StudentProfile, ProficiencyLevel, CareerGoal } from '../types';
import { X, Plus, Trash2, Check, ShieldCheck, User, Upload, Image as ImageIcon } from 'lucide-react';

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: StudentProfile;
  onSave: (updatedProfile: StudentProfile) => void;
}

const ALL_SKILLS = [
  'Python', 'C++', 'Java', 'JavaScript', 'AI/ML', 'Data Science', 
  'Cloud', 'Cybersecurity', 'IoT', 'UI/UX', 'Research', 'Public Speaking', 
  'Leadership', 'Data Structures'
];

const ALL_CAREER_GOALS: CareerGoal[] = [
  'Internship', 'Placement', 'Higher Studies', 'Research', 'Startup', 'Still Exploring'
];

const ALL_CAREER_INTERESTS = [
  'Software Development', 'AI/ML', 'Data Science', 'Cybersecurity', 
  'Cloud', 'Research', 'Entrepreneurship', 'Product Development', 'UI/UX'
];

const ALL_CAMPUS_INTERESTS = [
  'Hackathons', 'Coding Competitions', 'Technical Clubs', 'Research', 
  'Paper Presentations', 'Sports', 'Entrepreneurship', 'Design', 
  'Public Speaking', 'Networking', 'Workshops', 'Conferences', 'Volunteering'
];

const ALL_LEARNING_PREFERENCES = [
  'Video', 'Reading', 'Practical Coding', 'Projects', 
  'Quizzes', 'Group Study', 'Instructor-led Learning'
];

export const EditProfileModal: React.FC<EditProfileModalProps> = ({
  isOpen,
  onClose,
  profile,
  onSave
}) => {
  const [formData, setFormData] = useState<StudentProfile>({ ...profile });
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleAvatarFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setFormData({ ...formData, avatarUrl: reader.result });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSkillLevelChange = (skillName: string, level: ProficiencyLevel) => {
    const existing = formData.skills.find(s => s.name === skillName);
    if (existing) {
      setFormData({
        ...formData,
        skills: formData.skills.map(s => s.name === skillName ? { ...s, level } : s)
      });
    } else {
      setFormData({
        ...formData,
        skills: [...formData.skills, { name: skillName, level }]
      });
    }
  };

  const handleRemoveSkill = (skillName: string) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter(s => s.name !== skillName)
    });
  };

  const handleToggleArrayItem = (field: 'careerInterests' | 'campusInterests' | 'learningPreferences', item: string) => {
    const current = formData[field];
    if (current.includes(item)) {
      setFormData({
        ...formData,
        [field]: current.filter(i => i !== item)
      });
    } else {
      setFormData({
        ...formData,
        [field]: [...current, item]
      });
    }
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white w-full max-w-3xl rounded-2xl border border-slate-200 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150 flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/70">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-indigo-700">
              Pair A — Student Profile Signals
            </div>
            <h2 className="text-xl font-bold text-slate-900 mt-0.5">
              Edit Your Student DNA & Real-Time Profile
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Section 0: Student Photo / Avatar Upload */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col sm:flex-row items-center gap-4">
            <div className="relative w-20 h-20 rounded-full overflow-hidden bg-indigo-100 border-2 border-indigo-200 shrink-0 flex items-center justify-center text-indigo-700 font-bold text-xl">
              {formData.avatarUrl ? (
                <img
                  src={formData.avatarUrl}
                  alt={formData.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <span>{formData.avatarInitials}</span>
              )}
            </div>

            <div className="flex-1 text-center sm:text-left space-y-1">
              <div className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Student Profile Photo / Avatar
              </div>
              <p className="text-xs text-slate-500">
                Upload a real photo from your device or paste a public image URL.
              </p>
              
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleAvatarFileChange}
                  accept="image/*"
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-lg shadow-2xs"
                >
                  <Upload className="w-3.5 h-3.5 text-slate-500" />
                  <span>Upload Photo</span>
                </button>

                {formData.avatarUrl && (
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, avatarUrl: undefined })}
                    className="text-xs text-rose-600 hover:underline px-2 py-1"
                  >
                    Remove Photo
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Section 1: Academic Identity */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              1. Academic Baseline & Credentials
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Student Full Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">University / Institute</label>
                <input
                  type="text"
                  value={formData.academic.university}
                  onChange={(e) => setFormData({
                    ...formData,
                    academic: { ...formData.academic, university: e.target.value }
                  })}
                  className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Department / Branch</label>
                <input
                  type="text"
                  value={formData.academic.department}
                  onChange={(e) => setFormData({
                    ...formData,
                    academic: { ...formData.academic, department: e.target.value }
                  })}
                  className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Year & Semester</label>
                  <input
                    type="text"
                    value={formData.academic.yearSemester}
                    onChange={(e) => setFormData({
                      ...formData,
                      academic: { ...formData.academic, yearSemester: e.target.value }
                    })}
                    className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Cumulative CGPA</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    max="10"
                    value={formData.academic.cgpa || ''}
                    onChange={(e) => setFormData({
                      ...formData,
                      academic: { ...formData.academic, cgpa: parseFloat(e.target.value) || undefined }
                    })}
                    placeholder="e.g. 9.15"
                    className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-1 focus:ring-indigo-500 font-mono"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Skills & Proficiency */}
          <div className="space-y-3 pt-4 border-t border-slate-200">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                2. Skills & Proficiency Levels
              </h3>
              <span className="text-[11px] text-slate-400">Click to adjust level (B / I / A)</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {ALL_SKILLS.map((skillName) => {
                const activeSkill = formData.skills.find(s => s.name === skillName);
                const currentLevel = activeSkill?.level;

                return (
                  <div
                    key={skillName}
                    className={`flex items-center justify-between p-2 rounded-lg border text-xs transition-colors ${
                      activeSkill 
                        ? 'border-indigo-200 bg-indigo-50/50' 
                        : 'border-slate-200 bg-white hover:bg-slate-50'
                    }`}
                  >
                    <span className="font-medium text-slate-800">{skillName}</span>

                    <div className="flex items-center gap-1">
                      {(['Beginner', 'Intermediate', 'Advanced'] as ProficiencyLevel[]).map((level) => (
                        <button
                          key={level}
                          type="button"
                          onClick={() => handleSkillLevelChange(skillName, level)}
                          className={`px-2 py-0.5 rounded text-[10px] font-semibold transition-all ${
                            currentLevel === level
                              ? 'bg-indigo-600 text-white shadow-2xs'
                              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          }`}
                        >
                          {level[0]}
                        </button>
                      ))}

                      {activeSkill && (
                        <button
                          type="button"
                          onClick={() => handleRemoveSkill(skillName)}
                          className="p-1 text-slate-400 hover:text-rose-600 ml-1"
                          title="Remove skill"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section 3: Career Goal */}
          <div className="space-y-3 pt-4 border-t border-slate-200">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              3. Primary Career Goal
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {ALL_CAREER_GOALS.map((goal) => (
                <button
                  key={goal}
                  type="button"
                  onClick={() => setFormData({ ...formData, careerGoal: goal })}
                  className={`p-2.5 rounded-lg border text-xs font-medium text-center transition-all ${
                    formData.careerGoal === goal
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-700 font-bold shadow-2xs'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                  }`}
                >
                  {goal}
                </button>
              ))}
            </div>
          </div>

          {/* Section 4: Campus Interests */}
          <div className="space-y-3 pt-4 border-t border-slate-200">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              4. Campus Extracurricular Interests
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {ALL_CAMPUS_INTERESTS.map((interest) => {
                const selected = formData.campusInterests.includes(interest);
                return (
                  <button
                    key={interest}
                    type="button"
                    onClick={() => handleToggleArrayItem('campusInterests', interest)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      selected
                        ? 'bg-slate-900 text-white shadow-2xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {selected ? '✓ ' : ''}{interest}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 5: Learning Preferences */}
          <div className="space-y-3 pt-4 border-t border-slate-200">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              5. Learning Preferences
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {ALL_LEARNING_PREFERENCES.map((pref) => {
                const selected = formData.learningPreferences.includes(pref);
                return (
                  <button
                    key={pref}
                    type="button"
                    onClick={() => handleToggleArrayItem('learningPreferences', pref)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      selected
                        ? 'bg-indigo-600 text-white shadow-2xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {selected ? '✓ ' : ''}{pref}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 6: Privacy */}
          <div className="space-y-3 pt-4 border-t border-slate-200">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              6. Privacy & Discovery Preferences
            </h3>
            <div className="p-3 bg-slate-50 rounded-xl space-y-2 text-xs">
              <label className="flex items-center gap-2 text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.privacy.optInPeerMatching}
                  onChange={(e) => setFormData({
                    ...formData,
                    privacy: { ...formData.privacy, optInPeerMatching: e.target.checked }
                  })}
                  className="rounded border-slate-300 text-indigo-600"
                />
                <span>Allow participation in student study circles</span>
              </label>

              <label className="flex items-center gap-2 text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.privacy.allowTeammateDiscovery}
                  onChange={(e) => setFormData({
                    ...formData,
                    privacy: { ...formData.privacy, allowTeammateDiscovery: e.target.checked }
                  })}
                  className="rounded border-slate-300 text-indigo-600"
                />
                <span>Allow complementary skill team discovery for hackathons</span>
              </label>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-700 hover:text-slate-900 rounded-lg"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="px-5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-xs transition-colors"
          >
            Save & Recalculate Recommendations
          </button>
        </div>
      </div>
    </div>
  );
};
