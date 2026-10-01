import React, { useState } from 'react';
import { StudentProfile, CampusOpportunity } from '../types';
import { 
  FolderSync, 
  Download, 
  Upload, 
  Copy, 
  Check, 
  Terminal, 
  Laptop, 
  GitBranch, 
  FileCode, 
  AlertCircle, 
  Sparkles, 
  ArrowRight,
  Database,
  ExternalLink,
  ShieldCheck,
  Share2
} from 'lucide-react';

interface SyncHubViewProps {
  student: StudentProfile;
  opportunities: CampusOpportunity[];
  onImportFullState: (importedData: { student: StudentProfile; opportunities: CampusOpportunity[] }) => void;
}

export const SyncHubView: React.FC<SyncHubViewProps> = ({
  student,
  opportunities,
  onImportFullState
}) => {
  const [copiedExport, setCopiedExport] = useState(false);
  const [importJsonText, setImportJsonText] = useState('');
  const [importStatus, setImportStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [importErrorMsg, setImportErrorMsg] = useState('');
  const [activeGuideTab, setActiveGuideTab] = useState<'export_import' | 'git_workflow' | 'zip_transfer'>('export_import');

  // Generate full state export JSON
  const fullState = {
    appName: 'EduTwin AI',
    version: '2.0.0-cursed',
    exportedAt: new Date().toISOString(),
    studentProfile: student,
    campusOpportunities: opportunities
  };

  const jsonString = JSON.stringify(fullState, null, 2);

  // Download JSON file
  const handleDownloadJson = () => {
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `edutwin-complete-state-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Copy JSON to clipboard
  const handleCopyJson = () => {
    navigator.clipboard.writeText(jsonString);
    setCopiedExport(true);
    setTimeout(() => setCopiedExport(false), 2000);
  };

  // Handle Import JSON
  const handleProcessImport = () => {
    try {
      const parsed = JSON.parse(importJsonText);
      if (!parsed.studentProfile && !parsed.campusOpportunities) {
        throw new Error('Invalid JSON format: Must contain studentProfile or campusOpportunities.');
      }
      
      onImportFullState({
        student: parsed.studentProfile || student,
        opportunities: parsed.campusOpportunities || opportunities
      });

      setImportStatus('success');
      setTimeout(() => {
        setImportStatus('idle');
        setImportJsonText('');
      }, 2500);
    } catch (err: any) {
      setImportStatus('error');
      setImportErrorMsg(err.message || 'Malformed JSON. Please paste a valid export file.');
    }
  };

  // Handle JSON file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      setImportJsonText(text);
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-purple-500/20 pb-4 gap-4">
        <div>
          <div className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold flex items-center gap-1.5">
            <FolderSync className="w-3.5 h-3.5" />
            <span>Dual-Laptop Portability & Integration Terminal</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-space text-white mt-0.5">
            Project Sync & Multi-Laptop Transfer Hub
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            Carry all your code, custom added clubs, student DNA, and images seamlessly between laptops or integrate your parallel project into this one.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleDownloadJson}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-white bg-purple-600 hover:bg-purple-700 rounded-xl shadow-lg glow-cursed transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export State File (.json)</span>
          </button>
        </div>
      </div>

      {/* Mode Switcher */}
      <div className="flex items-center gap-2 border-b border-purple-500/20 pb-3">
        <button
          onClick={() => setActiveGuideTab('export_import')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
            activeGuideTab === 'export_import'
              ? 'bg-purple-600 text-white shadow-md glow-cursed'
              : 'text-slate-400 hover:text-white bg-slate-900/50 border border-purple-500/20'
          }`}
        >
          <Database className="w-4 h-4" />
          <span>1. Instant Data Export & Import</span>
        </button>

        <button
          onClick={() => setActiveGuideTab('git_workflow')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
            activeGuideTab === 'git_workflow'
              ? 'bg-purple-600 text-white shadow-md glow-cursed'
              : 'text-slate-400 hover:text-white bg-slate-900/50 border border-purple-500/20'
          }`}
        >
          <GitBranch className="w-4 h-4" />
          <span>2. Git Codebase Sync (Recommended)</span>
        </button>

        <button
          onClick={() => setActiveGuideTab('zip_transfer')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
            activeGuideTab === 'zip_transfer'
              ? 'bg-purple-600 text-white shadow-md glow-cursed'
              : 'text-slate-400 hover:text-white bg-slate-900/50 border border-purple-500/20'
          }`}
        >
          <Laptop className="w-4 h-4" />
          <span>3. USB / Zip Transfer Guide</span>
        </button>
      </div>

      {/* SECTION 1: INSTANT EXPORT & IMPORT */}
      {activeGuideTab === 'export_import' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Export Box */}
          <div className="bg-[#0C081A] rounded-2xl border border-purple-500/30 p-6 shadow-2xl space-y-4 glow-border-purple flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-purple-950 border border-purple-500/40 flex items-center justify-center text-purple-300">
                    <Download className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold font-space text-white text-base">Export Current Application State</h3>
                    <p className="text-xs text-slate-400">Contains student profile, custom clubs, uploaded images & settings</p>
                  </div>
                </div>

                <button
                  onClick={handleCopyJson}
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-mono text-purple-200 bg-purple-950/60 hover:bg-purple-900/80 border border-purple-500/30 rounded-lg transition-colors"
                >
                  {copiedExport ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedExport ? 'Copied!' : 'Copy JSON'}</span>
                </button>
              </div>

              {/* JSON Code Preview */}
              <div className="relative">
                <pre className="bg-[#07070B] border border-purple-500/20 rounded-xl p-3 text-[11px] font-mono text-cyan-300/90 max-h-56 overflow-y-auto">
                  {jsonString}
                </pre>
              </div>

              <div className="p-3 bg-purple-950/30 border border-purple-500/20 rounded-xl text-xs text-slate-300 space-y-1">
                <div className="font-bold text-white flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  <span>How to transfer to laptop 2:</span>
                </div>
                <p className="text-slate-400 text-[11px]">
                  1. Click <strong>"Export State File (.json)"</strong> to save the file.
                  <br />
                  2. Send this file via Email, Google Drive, or USB drive to your second laptop.
                  <br />
                  3. Open the app on your second laptop and upload it in the box on the right.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-purple-500/20">
              <button
                onClick={handleDownloadJson}
                className="w-full py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-mono font-bold text-xs rounded-xl shadow-lg glow-cursed flex items-center justify-center gap-2 transition-all"
              >
                <Download className="w-4 h-4" />
                <span>Download edutwin-state-export.json</span>
              </button>
            </div>
          </div>

          {/* Import Box */}
          <div className="bg-[#0C081A] rounded-2xl border border-purple-500/30 p-6 shadow-2xl space-y-4 glow-border-purple flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-cyan-950 border border-cyan-500/40 flex items-center justify-center text-cyan-300">
                    <Upload className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold font-space text-white text-base">Import State from Other Laptop</h3>
                    <p className="text-xs text-slate-400">Restore or sync data exported from your first machine</p>
                  </div>
                </div>

                <label className="cursor-pointer inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-mono text-cyan-300 bg-cyan-950/60 hover:bg-cyan-900/80 border border-cyan-500/30 rounded-lg transition-colors">
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload .json</span>
                  <input
                    type="file"
                    accept=".json"
                    className="hidden"
                    onChange={handleFileUpload}
                  />
                </label>
              </div>

              {/* Paste Textarea */}
              <div className="space-y-1">
                <label className="text-[11px] font-mono text-slate-400 block">
                  Or paste exported JSON text here:
                </label>
                <textarea
                  rows={8}
                  value={importJsonText}
                  onChange={(e) => setImportJsonText(e.target.value)}
                  placeholder="Paste JSON text exported from your other machine here..."
                  className="w-full bg-[#07070B] border border-purple-500/30 rounded-xl p-3 text-xs font-mono text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400"
                />
              </div>

              {importStatus === 'success' && (
                <div className="p-3 bg-emerald-950/50 border border-emerald-500/40 rounded-xl text-xs text-emerald-300 flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>State successfully synced and restored! Live results recalculated.</span>
                </div>
              )}

              {importStatus === 'error' && (
                <div className="p-3 bg-rose-950/50 border border-rose-500/40 rounded-xl text-xs text-rose-300 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-400" />
                  <span>{importErrorMsg}</span>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-purple-500/20">
              <button
                disabled={!importJsonText.trim()}
                onClick={handleProcessImport}
                className="w-full py-2.5 bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed text-slate-950 font-mono font-bold text-xs rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <Check className="w-4 h-4" />
                <span>Apply & Merge State Now</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 2: GIT WORKFLOW INSTRUCTIONS */}
      {activeGuideTab === 'git_workflow' && (
        <div className="bg-[#0C081A] rounded-2xl border border-purple-500/30 p-6 sm:p-8 shadow-2xl space-y-6 glow-border-purple">
          <div>
            <h3 className="text-xl font-bold font-space text-white flex items-center gap-2">
              <GitBranch className="w-5 h-5 text-cyan-400" />
              <span>Git Workflow: Synchronizing Both Projects via Remote Repository</span>
            </h3>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl">
              This is the industry-standard way to maintain both projects in parallel without losing code or manual copying.
            </p>
          </div>

          <div className="space-y-6">
            {/* Step 1 */}
            <div className="bg-[#07070B] p-5 rounded-2xl border border-purple-500/30 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-cyan-300 uppercase tracking-wider">
                  Step 1: Push Project from Laptop 1 (Current Project) to GitHub
                </span>
                <span className="text-[10px] font-mono bg-purple-950 px-2 py-0.5 rounded text-purple-300 border border-purple-500/30">
                  On Laptop 1
                </span>
              </div>
              <p className="text-xs text-slate-300">
                In your terminal on Laptop 1, commit and push your project to a remote Git repository (e.g. GitHub or GitLab):
              </p>
              <pre className="bg-[#0C081A] p-3 rounded-xl border border-purple-500/20 text-xs font-mono text-purple-200 overflow-x-auto">
{`git init
git add .
git commit -m "feat: complete edutwin ai with campus domain engine and cursed sorcerer theme"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/edutwin-ai.git
git push -u origin main`}
              </pre>
            </div>

            {/* Step 2 */}
            <div className="bg-[#07070B] p-5 rounded-2xl border border-purple-500/30 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-cyan-300 uppercase tracking-wider">
                  Step 2: Pull or Merge into Laptop 2
                </span>
                <span className="text-[10px] font-mono bg-purple-950 px-2 py-0.5 rounded text-purple-300 border border-purple-500/30">
                  On Laptop 2
                </span>
              </div>
              <p className="text-xs text-slate-300">
                On Laptop 2, you can either clone freshly or link it as a remote to merge the two codebases together:
              </p>
              <div className="space-y-3">
                <div className="text-xs font-bold text-white">Option A: Fresh Clone (Cleanest)</div>
                <pre className="bg-[#0C081A] p-3 rounded-xl border border-purple-500/20 text-xs font-mono text-cyan-300 overflow-x-auto">
{`git clone https://github.com/YOUR_USERNAME/edutwin-ai.git
cd edutwin-ai
npm install
npm run dev`}
                </pre>

                <div className="text-xs font-bold text-white pt-2">Option B: Merge into an existing repository on Laptop 2</div>
                <pre className="bg-[#0C081A] p-3 rounded-xl border border-purple-500/20 text-xs font-mono text-purple-200 overflow-x-auto">
{`# In your Laptop 2 repository:
git remote add upstream https://github.com/YOUR_USERNAME/edutwin-ai.git
git fetch upstream
git merge upstream/main --allow-unrelated-histories`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 3: ZIP / FOLDER TRANSFER */}
      {activeGuideTab === 'zip_transfer' && (
        <div className="bg-[#0C081A] rounded-2xl border border-purple-500/30 p-6 sm:p-8 shadow-2xl space-y-6 glow-border-purple">
          <div>
            <h3 className="text-xl font-bold font-space text-white flex items-center gap-2">
              <Laptop className="w-5 h-5 text-cyan-400" />
              <span>Offline / USB Drive Transfer Guide</span>
            </h3>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl">
              If you prefer not using Git or are working offline, follow this checklist to safely transfer all code and assets.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#07070B] p-5 rounded-2xl border border-emerald-500/30 space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-mono font-bold text-xs">
                <Check className="w-4 h-4" />
                <span>WHAT TO COPY (Must Include):</span>
              </div>
              <ul className="text-xs font-mono text-slate-300 space-y-1.5 list-disc pl-4">
                <li><code className="text-purple-300">/src/</code> (all components, views, data, services, types)</li>
                <li><code className="text-purple-300">package.json</code> & <code className="text-purple-300">package-lock.json</code></li>
                <li><code className="text-purple-300">index.html</code> (includes fonts and layout)</li>
                <li><code className="text-purple-300">vite.config.ts</code></li>
                <li><code className="text-purple-300">tsconfig.json</code></li>
                <li><code className="text-purple-300">metadata.json</code></li>
                <li><code className="text-purple-300">.env.example</code> (remember to copy your API keys!)</li>
              </ul>
            </div>

            <div className="bg-[#07070B] p-5 rounded-2xl border border-rose-500/30 space-y-3">
              <div className="flex items-center gap-2 text-rose-400 font-mono font-bold text-xs">
                <AlertCircle className="w-4 h-4" />
                <span>WHAT NOT TO COPY (Do NOT Include in Zip):</span>
              </div>
              <ul className="text-xs font-mono text-slate-300 space-y-1.5 list-disc pl-4">
                <li><code className="text-rose-300">node_modules/</code> (very large, re-install on new laptop)</li>
                <li><code className="text-rose-300">dist/</code> (build output)</li>
                <li><code className="text-rose-300">.git/</code> (if starting fresh repo)</li>
              </ul>
              <div className="mt-3 p-3 bg-purple-950/40 border border-purple-500/20 rounded-xl text-slate-300 text-[11px]">
                Once copied to Laptop 2, just open a terminal and run:
                <code className="block mt-1 bg-black p-2 rounded text-cyan-300 font-mono">npm install && npm run dev</code>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
