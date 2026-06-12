// CompanyDashboard.tsx — inclui a nova aba "Perfil da Empresa"
import { useState } from 'react';
import { ArrowLeft, Briefcase, Users, Filter, Plus, LogOut, Building2 } from 'lucide-react';
import type { Job, User } from '../types';
import { PublishedJobs } from './PublishedJobs';
import { ApplicationsList } from './ApplicationsList';
import { ScreeningPanel } from './ScreeningPanel';
import { CompanyProfile } from './CompanyProfile';

export interface Application {
  id: number;
  jobId: number;
  userId?: number;
  name: string;
  email: string;
  phone: string;
  city?: string;
  portfolio?: string;
  linkedin?: string;
  github?: string;
  coverLetter?: string;
  resumePath: string;
  createdAt: string;
  status?: 'novo' | 'em-analise' | 'aceito' | 'rejeitado';
}

interface CompanyDashboardProps {
  user: User;
  onBackToHome: () => void;
  onCreateJob: () => void;
  onLogout: () => void;
}

export function CompanyDashboard({
  user,
  onBackToHome,
  onCreateJob,
  onLogout,
}: CompanyDashboardProps) {
  const [activeTab, setActiveTab] = useState<'jobs' | 'applications' | 'screening' | 'profile'>('jobs');
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [currentUser, setCurrentUser] = useState<User>(user);

  const handleSelectJobForApplications = (job: Job) => {
    setSelectedJob(job);
    setActiveTab('applications');
  };

  const handleSelectJobForScreening = (job: Job) => {
    setSelectedJob(job);
    setActiveTab('screening');
  };

  const tabs = [
    { id: 'jobs', label: 'Vagas Publicadas', icon: Briefcase },
    { id: 'applications', label: 'Candidaturas', icon: Users },
    { id: 'screening', label: 'Triagem', icon: Filter },
    { id: 'profile', label: 'Perfil da Empresa', icon: Building2 },
  ] as const;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/80 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={onBackToHome}
                className="inline-flex items-center justify-center p-2 rounded-lg hover:bg-gray-100 transition"
                title="Voltar para home"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Painel da Empresa
                </h1>
                <p className="text-sm text-gray-500">{currentUser.company?.name || 'Sua Empresa'}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={onCreateJob}
                className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-2 text-white font-semibold hover:shadow-lg transition"
                title="Criar nova vaga"
              >
                <Plus className="w-5 h-5" />
                Nova Vaga
              </button>
              <button
                onClick={onLogout}
                className="inline-flex items-center justify-center p-2 rounded-lg hover:bg-gray-100 transition"
                title="Fazer logout"
              >
                <LogOut className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Tabs Navigation */}
      <div className="border-b border-gray-200 bg-white">
        <div className="container mx-auto px-4">
          <nav className="flex gap-2 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-4 font-semibold transition border-b-2 whitespace-nowrap ${
                    isActive
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Content */}
      <main className="container mx-auto px-4 py-8">
        {activeTab === 'jobs' && (
          <PublishedJobs user={currentUser} onSelectJob={handleSelectJobForApplications} />
        )}
        {activeTab === 'applications' && (
          <ApplicationsList user={currentUser} selectedJob={selectedJob} onSelectJob={handleSelectJobForScreening} />
        )}
        {activeTab === 'screening' && (
          <ScreeningPanel user={currentUser} selectedJob={selectedJob} onSelectJob={handleSelectJobForApplications} />
        )}
        {activeTab === 'profile' && (
          <CompanyProfile user={currentUser} onUserUpdate={setCurrentUser} />
        )}
      </main>
    </div>
  );
}
