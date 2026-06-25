import { useState, useEffect } from 'react';
import {
  ChevronDown, ChevronUp, CheckCircle, XCircle, Loader,
  ExternalLink, Github, Linkedin, Download, ArrowRight, RotateCcw
} from 'lucide-react';
import type { Job, User } from '../types';
import type { Application } from './CompanyDashboard';
import { apiCall } from '../../config/api';

interface ScreeningPanelProps {
  user: User;
  selectedJob: Job | null;
  onSelectJob: (job: Job) => void;
}

type Status = 'novo' | 'em-analise' | 'aceito' | 'rejeitado';

const STATUS_LABEL: Record<Status, string> = {
  'novo': 'Novo',
  'em-analise': 'Em Análise',
  'aceito': 'Aceito',
  'rejeitado': 'Rejeitado',
};

const STATUS_COLOR: Record<Status, string> = {
  'novo': 'bg-blue-100 text-blue-700 border-blue-200',
  'em-analise': 'bg-yellow-100 text-yellow-700 border-yellow-200',
  'aceito': 'bg-green-100 text-green-700 border-green-200',
  'rejeitado': 'bg-red-100 text-red-700 border-red-200',
};

export function ScreeningPanel({ user, selectedJob, onSelectJob }: ScreeningPanelProps) {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [expandedApp, setExpandedApp] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<Status | 'all'>('all');
  const [updating, setUpdating] = useState<number | null>(null);

  useEffect(() => { loadJobs(); }, []);
  useEffect(() => { if (selectedJob) loadApplications(selectedJob.id); }, [selectedJob]);

  const loadJobs = async () => {
    const token = localStorage.getItem('token');
    const { data, error } = await apiCall('/api/jobs/my-jobs', {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!error && Array.isArray(data)) {
      setJobs(data);
      if (data.length > 0 && !selectedJob) onSelectJob(data[0]);
    }
  };

  const loadApplications = async (jobId: number) => {
    setLoading(true);
    const token = localStorage.getItem('token');
    const { data, error } = await apiCall(`/api/jobs/${jobId}/applications`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!error && Array.isArray(data)) {
      const order: Record<string, number> = { 'novo': 0, 'em-analise': 1, 'aceito': 2, 'rejeitado': 3 };
      setApplications(data.sort((a, b) => (order[a.status] ?? 9) - (order[b.status] ?? 9)));
    }
    setLoading(false);
  };

  const updateStatus = async (appId: number, newStatus: Status) => {
    setUpdating(appId);
    const token = localStorage.getItem('token');
    await apiCall(`/api/applications/${appId}`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify({ status: newStatus }),
    });
    setApplications((prev) =>
      prev.map((app) => app.id === appId ? { ...app, status: newStatus } : app)
    );
    setUpdating(null);
  };

  const stats = {
    novo: applications.filter((a) => a.status === 'novo').length,
    'em-analise': applications.filter((a) => a.status === 'em-analise').length,
    aceito: applications.filter((a) => a.status === 'aceito').length,
    rejeitado: applications.filter((a) => a.status === 'rejeitado').length,
  };

  const visible = activeFilter === 'all'
    ? applications
    : applications.filter((a) => a.status === activeFilter);

  const nextAction = (status: Status) => {
    if (status === 'novo') return { label: 'Iniciar Análise', next: 'em-analise' as Status, color: 'bg-yellow-500 hover:bg-yellow-600 text-white' };
    if (status === 'em-analise') return { label: 'Aprovar', next: 'aceito' as Status, color: 'bg-green-600 hover:bg-green-700 text-white' };
    return null;
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <label htmlFor="job-select-screening" className="block text-sm font-semibold text-gray-700 mb-3">
          Selecionar Vaga
        </label>
        <select
          id="job-select-screening"
          value={selectedJob?.id || ''}
          onChange={(e) => {
            const job = jobs.find((j) => j.id === parseInt(e.target.value));
            if (job) onSelectJob(job);
          }}
          className="w-full md:w-96 px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-600"
        >
          <option value="">Escolha uma vaga...</option>
          {jobs.map((job) => (
            <option key={job.id} value={job.id}>{job.title} - {job.location}</option>
          ))}
        </select>
      </div>

      {selectedJob && (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {([
              { key: 'novo', label: 'Novos', icon: '🆕', from: 'from-blue-500', to: 'to-blue-600' },
              { key: 'em-analise', label: 'Em Análise', icon: '⏳', from: 'from-yellow-500', to: 'to-yellow-600' },
              { key: 'aceito', label: 'Aprovados', icon: '✅', from: 'from-green-500', to: 'to-green-600' },
              { key: 'rejeitado', label: 'Reprovados', icon: '❌', from: 'from-red-500', to: 'to-red-600' },
            ] as const).map((s) => (
              <button
                key={s.key}
                onClick={() => setActiveFilter(activeFilter === s.key ? 'all' : s.key)}
                className={`rounded-xl bg-gradient-to-br ${s.from} ${s.to} p-5 text-white shadow-md transition hover:scale-105 text-left ${activeFilter === s.key ? 'ring-4 ring-offset-2 ring-white' : ''}`}
              >
                <div className="text-2xl mb-1">{s.icon}</div>
                <p className="text-xs font-semibold text-white/80">{s.label}</p>
                <p className="text-3xl font-bold mt-1">{stats[s.key]}</p>
              </button>
            ))}
          </div>

          {activeFilter !== 'all' && (
            <div className="mb-4 flex items-center gap-2">
              <span className="text-sm text-gray-600">Filtrando por:</span>
              <span className={`px-3 py-1 rounded-full text-sm font-semibold border ${STATUS_COLOR[activeFilter]}`}>
                {STATUS_LABEL[activeFilter]}
              </span>
              <button onClick={() => setActiveFilter('all')} className="text-sm text-blue-600 hover:underline">
                Ver todos
              </button>
            </div>
          )}

          {loading ? (
            <div className="flex items-center justify-center py-16">
              <Loader className="w-8 h-8 text-blue-600 animate-spin mr-3" />
              <p className="text-gray-600">Carregando candidatos...</p>
            </div>
          ) : visible.length === 0 ? (
            <div className="rounded-2xl bg-gray-50 border-2 border-dashed border-gray-300 p-12 text-center">
              <CheckCircle className="w-14 h-14 text-gray-300 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-gray-500">Nenhum candidato nesta etapa</h3>
            </div>
          ) : (
            <div className="space-y-3">
              {visible.map((app) => {
                const action = nextAction(app.status as Status);
                const isExpanded = expandedApp === app.id;
                const isUpdating = updating === app.id;

                return (
                  <div key={app.id} className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
                    <button
                      onClick={() => setExpandedApp(isExpanded ? null : app.id)}
                      className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition text-left"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-700 text-lg flex-shrink-0">
                          {app.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-bold text-gray-900">{app.name}</p>
                          <p className="text-sm text-gray-500">{app.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`hidden md:inline-flex px-3 py-1 rounded-full text-xs font-semibold border ${STATUS_COLOR[app.status as Status] || 'bg-gray-100 text-gray-700'}`}>
                          {STATUS_LABEL[app.status as Status] || app.status}
                        </span>
                        <span className="text-xs text-gray-400 hidden md:block">
                          {new Date(app.createdAt).toLocaleDateString('pt-BR')}
                        </span>
                        {isExpanded ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
                      </div>
                    </button>

                    {isExpanded && (
                      <div className="border-t border-gray-100 px-6 py-6 bg-gray-50 space-y-5">
                        <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
                          <div>
                            <p className="font-semibold text-gray-500 text-xs uppercase mb-1">Telefone</p>
                            <p>{app.phone}</p>
                          </div>
                          {app.city && (
                            <div>
                              <p className="font-semibold text-gray-500 text-xs uppercase mb-1">Cidade</p>
                              <p>{app.city}</p>
                            </div>
                          )}
                        </div>

                        <div className="flex flex-wrap gap-2">
                          <a
                            href={`/uploads/${app.resumePath}`}
                            download={(app as any).originalName || app.resumePath}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition font-semibold text-sm"
                          >
                            <Download className="w-4 h-4" />
                            Baixar Currículo
                          </a>
                          {app.linkedin && (
                            <a href={app.linkedin} target="_blank" rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-100 text-blue-700 hover:bg-blue-200 transition font-semibold text-sm">
                              <Linkedin className="w-4 h-4" /> LinkedIn <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                          {app.github && (
                            <a href={app.github} target="_blank" rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800 text-white hover:bg-gray-900 transition font-semibold text-sm">
                              <Github className="w-4 h-4" /> GitHub <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                          {app.portfolio && (
                            <a href={app.portfolio} target="_blank" rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-100 text-purple-700 hover:bg-purple-200 transition font-semibold text-sm">
                              Portfólio <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                        </div>

                        {app.coverLetter && (
                          <div>
                            <p className="font-semibold text-gray-700 text-sm mb-2">Carta de Apresentação</p>
                            <div className="bg-white border border-gray-200 rounded-lg p-4 text-sm text-gray-700 whitespace-pre-wrap max-h-40 overflow-y-auto">
                              {app.coverLetter}
                            </div>
                          </div>
                        )}

                        <div className="pt-4 border-t border-gray-200">
                          <p className="text-xs text-gray-500 font-semibold uppercase mb-3">Ações</p>
                          <div className="flex flex-wrap gap-3">
                            {action && (
                              <button
                                onClick={() => updateStatus(app.id, action.next)}
                                disabled={isUpdating}
                                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm transition disabled:opacity-50 ${action.color}`}
                              >
                                <ArrowRight className="w-4 h-4" />
                                {isUpdating ? 'Salvando...' : action.label}
                              </button>
                            )}

                            {(app.status === 'novo' || app.status === 'em-analise') && (
                              <button
                                onClick={() => updateStatus(app.id, 'rejeitado')}
                                disabled={isUpdating}
                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold text-sm transition disabled:opacity-50"
                              >
                                <XCircle className="w-4 h-4" />
                                Reprovar
                              </button>
                            )}

                            {app.status === 'aceito' && (
                              <button
                                onClick={() => updateStatus(app.id, 'em-analise')}
                                disabled={isUpdating}
                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold text-sm transition disabled:opacity-50"
                              >
                                <RotateCcw className="w-4 h-4" />
                                Desfazer aprovação
                              </button>
                            )}

                            {app.status === 'rejeitado' && (
                              <button
                                onClick={() => updateStatus(app.id, 'novo')}
                                disabled={isUpdating}
                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold text-sm transition disabled:opacity-50"
                              >
                                <RotateCcw className="w-4 h-4" />
                                Recolocar na fila
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
}
