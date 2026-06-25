import { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, CheckCircle, XCircle, Loader, ExternalLink, Github, Linkedin } from 'lucide-react';
import type { Job, User } from '../types';
import type { Application } from './CompanyDashboard';
import { apiCall } from '../../config/api';

interface ScreeningPanelProps {
  user: User;
  selectedJob: Job | null;
  onSelectJob: (job: Job) => void;
}

export function ScreeningPanel({ user, selectedJob, onSelectJob }: ScreeningPanelProps) {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [expandedApp, setExpandedApp] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    novo: 0,
    emAnalise: 0,
    aceito: 0,
    rejeitado: 0,
  });

  useEffect(() => {
    loadJobs();
  }, []);

  useEffect(() => {
    if (selectedJob) {
      loadApplications(selectedJob.id);
    }
  }, [selectedJob]);

  useEffect(() => {
    calculateStats();
  }, [applications]);

  const loadJobs = async () => {
    const token = localStorage.getItem('token');
    const { data, error } = await apiCall('/api/jobs/my-jobs', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!error && Array.isArray(data)) {
      setJobs(data);
      if (data.length > 0 && !selectedJob) {
        onSelectJob(data[0]);
      }
    }
  };

  const loadApplications = async (jobId: number) => {
    setLoading(true);
    const token = localStorage.getItem('token');
    const { data, error } = await apiCall(`/api/jobs/${jobId}/applications`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!error && Array.isArray(data)) {
      // Ordenar por "novo" primeiro, depois por data decrescente
      const sorted = data.sort((a, b) => {
        if (a.status === 'novo' && b.status !== 'novo') return -1;
        if (a.status !== 'novo' && b.status === 'novo') return 1;
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
      setApplications(sorted);
    }
    setLoading(false);
  };

  const calculateStats = () => {
    const newStats = {
      novo: 0,
      emAnalise: 0,
      aceito: 0,
      rejeitado: 0,
    };

    applications.forEach((app) => {
      if (app.status === 'novo') newStats.novo++;
      else if (app.status === 'em-analise') newStats.emAnalise++;
      else if (app.status === 'aceito') newStats.aceito++;
      else if (app.status === 'rejeitado') newStats.rejeitado++;
    });

    setStats(newStats);
  };

  const updateApplicationStatus = async (
    appId: number,
    newStatus: 'novo' | 'em-analise' | 'aceito' | 'rejeitado'
  ) => {
    const token = localStorage.getItem('token');
    await apiCall(`/api/applications/${appId}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status: newStatus }),
    });

    setApplications(
      applications.map((app) =>
        app.id === appId ? { ...app, status: newStatus } : app
      )
    );
  };

  const pendingApplications = applications.filter((app) => app.status === 'novo');

  return (
    <div className="max-w-6xl mx-auto">
      {/* Seletor de vaga e navegação */}
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:gap-4">
        <div className="flex-1">
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
            className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            <option value="">Escolha uma vaga...</option>
            {jobs.map((job) => (
              <option key={job.id} value={job.id}>
                {job.title} - {job.location}
              </option>
            ))}
          </select>
        </div>
      </div>

      {selectedJob && (
        <>
          {/* Estatísticas */}
          <div className="grid gap-4 md:grid-cols-4 mb-8">
            {[
              { label: 'Novo', value: stats.novo, color: 'from-blue-600 to-blue-700', icon: '🆕' },
              { label: 'Em Análise', value: stats.emAnalise, color: 'from-yellow-600 to-yellow-700', icon: '⏳' },
              { label: 'Aceito', value: stats.aceito, color: 'from-green-600 to-green-700', icon: '✅' },
              { label: 'Rejeitado', value: stats.rejeitado, color: 'from-red-600 to-red-700', icon: '❌' },
            ].map((stat) => (
              <div key={stat.label} className={`rounded-lg bg-gradient-to-br ${stat.color} p-6 text-white shadow-lg`}>
                <div className="text-3xl mb-2">{stat.icon}</div>
                <p className="text-sm font-semibold text-white/80">{stat.label}</p>
                <p className="text-3xl font-bold mt-1">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Candidatos Pendentes */}
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <div className="flex flex-col items-center gap-3">
                <Loader className="w-8 h-8 text-blue-600 animate-spin" />
                <p className="text-gray-600">Carregando candidatos...</p>
              </div>
            </div>
          ) : pendingApplications.length === 0 ? (
            <div className="rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 p-12 text-center">
              <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-green-900 mb-2">Ótimo trabalho!</h3>
              <p className="text-green-700">
                Todos os candidatos foram analisados. Verifique outras vagas ou aguarde novos candidatos.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                {pendingApplications.length} Candidato{pendingApplications.length !== 1 ? 's' : ''} Pendente{pendingApplications.length !== 1 ? 's' : ''}
              </h3>

              {pendingApplications.map((app) => (
                <div
                  key={app.id}
                  className="rounded-lg border border-gray-200 bg-white overflow-hidden shadow-sm hover:shadow-md transition"
                >
                  {/* Header */}
                  <button
                    onClick={() => setExpandedApp(expandedApp === app.id ? null : app.id)}
                    className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition"
                  >
                    <div className="text-left">
                      <h4 className="font-bold text-gray-900 text-lg">{app.name}</h4>
                      <p className="text-sm text-gray-600 mt-1">{app.email}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <p className="text-xs text-gray-500">
                          Candidatou-se em
                        </p>
                        <p className="font-semibold text-gray-900">
                          {new Date(app.createdAt).toLocaleDateString('pt-BR')}
                        </p>
                      </div>
                      {expandedApp === app.id ? (
                        <ChevronUp className="w-5 h-5 text-gray-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                  </button>

                  {/* Conteúdo Expandido */}
                  {expandedApp === app.id && (
                    <div className="border-t border-gray-200 px-6 py-6 bg-gray-50 space-y-6">
                      {/* Informações de Contato */}
                      <div>
                        <h5 className="font-semibold text-gray-900 mb-3">Informações de Contato</h5>
                        <div className="space-y-2 text-sm text-gray-700">
                          <p>
                            <span className="font-semibold">Telefone:</span> {app.phone}
                          </p>
                          {app.city && (
                            <p>
                              <span className="font-semibold">Cidade:</span> {app.city}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Redes Sociais e Portfólio */}
                      <div>
                        <h5 className="font-semibold text-gray-900 mb-3">Links</h5>
                        <div className="flex flex-wrap gap-3">
                          {app.linkedin && (
                            <a
                              href={app.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-100 text-blue-700 hover:bg-blue-200 transition font-semibold"
                            >
                              <Linkedin className="w-4 h-4" />
                              LinkedIn
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          )}
                          {app.github && (
                            <a
                              href={app.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800 text-white hover:bg-gray-900 transition font-semibold"
                            >
                              <Github className="w-4 h-4" />
                              GitHub
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          )}
                          {app.portfolio && (
                            <a
                              href={app.portfolio}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-100 text-purple-700 hover:bg-purple-200 transition font-semibold"
                            >
                              Portfólio
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          )}
                          <a
                            href={`/uploads/${app.resumePath}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-red-100 text-red-700 hover:bg-red-200 transition font-semibold"
                          >
                            📄 Currículo
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </div>
                      </div>

                      {/* Carta de Apresentação */}
                      {app.coverLetter && (
                        <div>
                          <h5 className="font-semibold text-gray-900 mb-3">Carta de Apresentação</h5>
                          <div className="bg-white p-4 rounded-lg border border-gray-300 text-sm text-gray-700 whitespace-pre-wrap">
                            {app.coverLetter}
                          </div>
                        </div>
                      )}

                      {/* Ações */}
                      <div className="pt-4 border-t border-gray-200 flex gap-3">
                        <button
                          onClick={() => updateApplicationStatus(app.id, 'aceito')}
                          className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-green-600 px-4 py-3 text-white font-semibold hover:bg-green-700 transition"
                        >
                          <CheckCircle className="w-5 h-5" />
                          Aceitar
                        </button>
                        <button
                          onClick={() => updateApplicationStatus(app.id, 'rejeitado')}
                          className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-3 text-white font-semibold hover:bg-red-700 transition"
                        >
                          <XCircle className="w-5 h-5" />
                          Rejeitar
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
