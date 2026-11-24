import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { LogOut, ArrowLeft, Shield } from 'lucide-react';
import StarField from '../../../components/StarField';
import { SmoothCursor } from '@/components/ui/smooth-cursor';
import { useAuth } from '../../auth/hooks/useAuth.hook';
import { PROJECTS as INITIAL_PROJECTS, type Project } from '../../projects/data/projects';

// Admin Components
import ProfileNameSection from '../components/ProfileNameSection';
import ProfileImageSection from '../components/ProfileImageSection';
import AboutEditor from '../components/AboutEditor';
import SkillsManager from '../components/SkillsManager';
import ResumeManager from '../components/ResumeManager';
import ProjectForm from '../components/ProjectForm';
import ProjectList from '../components/ProjectList';
import ConfirmDialog from '../components/ConfirmDialog';
import Toast, { type ToastMessage } from '../components/Toast';

export const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user, handleLogout } = useAuth();

  // Local dashboard states
  const [profileName, setProfileName] = useState('Ashish Tiwari');
  const [skills, setSkills] = useState<string[]>([
    'HTML',
    'CSS',
    'JS',
    'MERN',
    'TS',
    'TAILWIND',
    'NEXTJS',
  ]);
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);

  // Toast notification management
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    setToasts((prev) => [...prev, { id, message, type }]);

    // Auto-dismiss after 3.5s
    setTimeout(() => {
      removeToast(id);
    }, 3500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Confirm delete dialog state
  const [deleteTarget, setDeleteTarget] = useState<
    | { type: 'skill'; name: string }
    | { type: 'project'; project: Project }
    | null
  >(null);

  // Handlers for sections
  const handleUpdateName = async (newName: string) => {
    setProfileName(newName);
    addToast(`Profile name updated to "${newName}" locally (Ready for backend API).`, 'success');
  };

  const handleUpdatePfp = async (file: File) => {
    addToast(`PFP "${file.name}" selected and validated successfully.`, 'success');
  };

  const handleSaveAbout = async () => {
    addToast('About description saved successfully.', 'success');
  };

  const handleAddSkill = async (newSkill: string) => {
    setSkills((prev) => [...prev, newSkill]);
    addToast(`Skill "${newSkill}" added to portfolio.`, 'success');
  };

  const handleConfirmDelete = () => {
    if (!deleteTarget) return;

    if (deleteTarget.type === 'skill') {
      setSkills((prev) => prev.filter((s) => s !== deleteTarget.name));
      addToast(`Skill "${deleteTarget.name}" deleted.`, 'info');
    } else if (deleteTarget.type === 'project') {
      setProjects((prev) => prev.filter((p) => p.id !== deleteTarget.project.id));
      addToast(`Project "${deleteTarget.project.title}" deleted.`, 'info');
    }

    setDeleteTarget(null);
  };

  const handleUpdateResume = async (file: File) => {
    addToast(`Resume "${file.name}" validated and updated.`, 'success');
  };

  const handleAddProject = async (newProjData: Omit<Project, 'id'>) => {
    const newId = newProjData.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

    const newProject: Project = {
      ...newProjData,
      id: newId || `project-${Date.now()}`,
    };

    setProjects((prev) => [newProject, ...prev]);
    addToast(`Project "${newProject.title}" added to projects list.`, 'success');
  };

  const handleUserLogout = () => {
    if (handleLogout) {
      handleLogout();
    }
    navigate('/admin/login');
  };

  return (
    <main className="relative min-h-screen w-full bg-[#0a0a0a] text-white flex flex-col antialiased selection:bg-white selection:text-black select-none font-mono">
      <SmoothCursor />

      {/* Background StarField */}
      <StarField theme="dark" />

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 py-6 sm:px-6 sm:py-8 lg:px-8 space-y-6 flex-1 flex flex-col">
        {/* Top Header / Navigation Bar */}
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-white/10">
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="p-2 rounded-xl border border-white/20 hover:border-white text-neutral-300 hover:text-white transition-colors cursor-pointer"
              title="Return to portfolio"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>

            <div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-neutral-400" />
                <h1 className="text-sm sm:text-base font-semibold tracking-wider text-white uppercase">
                  ace.exe // admin
                </h1>
              </div>
              <p className="text-[11px] text-neutral-500 font-mono">
                {user?.email ? `Signed in as ${user.email}` : 'Authenticated Administrator'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 self-end sm:self-auto">
            <Link
              to="/"
              className="px-3.5 py-2 rounded-xl border border-white/20 hover:border-white/50 text-xs font-mono uppercase tracking-wider text-neutral-300 hover:text-white transition-colors"
            >
              Portfolio
            </Link>

            <button
              type="button"
              onClick={handleUserLogout}
              className="px-3.5 py-2 rounded-xl border border-rose-500/40 hover:border-rose-400 bg-rose-500/10 hover:bg-rose-500/20 text-xs font-mono uppercase tracking-wider text-rose-300 flex items-center gap-1.5 transition-colors cursor-pointer active:scale-95"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </header>

        {/* Dashboard Sections in wireframe order */}
        <div className="space-y-5 sm:space-y-6 flex-1">
          {/* Section A: Profile Name Management */}
          <ProfileNameSection
            currentName={profileName}
            onUpdate={handleUpdateName}
          />

          {/* Section B: Profile Picture Management */}
          <ProfileImageSection
            currentPfpUrl="/ace.png"
            onUpdate={handleUpdatePfp}
          />

          {/* Section C: About Section */}
          <AboutEditor onSave={handleSaveAbout} />

          {/* Section D: Skills Management */}
          <SkillsManager
            skills={skills}
            onAddSkill={handleAddSkill}
            onRequestDeleteSkill={(skill) =>
              setDeleteTarget({ type: 'skill', name: skill })
            }
          />

          {/* Section E: Resume Management */}
          <ResumeManager onUpdate={handleUpdateResume} />

          {/* Section F: Project Management (Add Form + All Projects List) */}
          <section
            aria-label="Project Management"
            className="w-full rounded-2xl sm:rounded-3xl border border-white/20 bg-black/60 p-5 sm:p-7 backdrop-blur-md transition-colors hover:border-white/30 space-y-6"
          >
            <ProjectForm onAddProject={handleAddProject} />
            <ProjectList
              projects={projects}
              onRequestDelete={(project) =>
                setDeleteTarget({ type: 'project', project })
              }
            />
          </section>
        </div>

        {/* Footer info */}
        <footer className="text-center py-4 border-t border-white/10 text-[11px] text-neutral-500 font-mono">
          ACE.EXE Admin Portal • Frontend interaction sandbox • No backend connected
        </footer>
      </div>

      {/* Global Confirmation Dialog */}
      <ConfirmDialog
        isOpen={deleteTarget !== null}
        title={
          deleteTarget?.type === 'skill'
            ? `Delete Skill: ${deleteTarget.name}`
            : deleteTarget?.type === 'project'
            ? `Delete Project: ${deleteTarget.project.title}`
            : 'Confirm Deletion'
        }
        message={
          deleteTarget?.type === 'skill'
            ? `Are you sure you want to remove "${deleteTarget.name}" from your skills list?`
            : deleteTarget?.type === 'project'
            ? `Are you sure you want to delete the project "${deleteTarget.project.title}"? This will remove it from the projects showcase.`
            : 'Are you sure you want to proceed with deletion?'
        }
        confirmLabel="Delete"
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />

      {/* Global Toast Notifications */}
      <Toast toasts={toasts} onDismiss={removeToast} />
    </main>
  );
};

export default AdminDashboard;
