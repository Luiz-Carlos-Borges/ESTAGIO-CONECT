import { useState, useEffect } from 'react';
import { Search, Download, MessageCircle, CheckCircle, XCircle, Clock, Loader } from 'lucide-react';
import type { Job, User } from '../types';
import type { Application } from './CompanyDashboard';
import { apiCall } from '../../config/api';

interface ApplicationsListProps {
  user: User;
  selectedJob: Job | null;
  onSelectJob: (job: Job) => void;
}

export function ApplicationsList({ user, selectedJob, onSelectJob }: ApplicationsListProps) {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [filteredApplications, setFilteredApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'novo' | 'em-analise' | 'aceito' | 'rejeitado'>('all');

  useEffect(() => {
    loadJobs();
  }, []);

  useEffect(() => {
    if (selectedJob) {
      loadApplications(selectedJob.id);
    }
  }, [selectedJob]);

  useEffect(() => {
    filterApplications();
  }, [applications, searchQuery, statusFilter]);

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
      setApplications(data);
    }
    setLoading(false);
  };

  const filterApplications = () => {
    let filtered = applications;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (app) =>
          app.name.toLowerCase().includes(query) ||
          app.email.toLowerCase().includes(query)
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter((app) => app.status === statusFilter);
    }

    setFilteredApplications(filtered);
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'novo':
        return 'bg-blue-100 text-blue-700';
      case 'em-analise':
        return 'bg-yellow-100 text-yellow-700';
      case 'aceito':
        return 'bg-green-100 text-green-700';
      case 'rejeitado':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status?: string) => {
    switch (status) {
      case 'aceito':
        return <CheckCircle className="w-4 h-4" />;
      case 'rejeitado':
        return <XCircle className="w-4 h-4" />;
      case 'em-analise':
        return <Clock className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
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

    // Atualizar estado local
    setApplications(
      applications.map((app) =>
        app.id === appId ? { ...app, status: newStatus } : app
      )
    );
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Job Selector */}
      <div className="mb-8">
        <label htmlFor="job-select" className="block text-sm font-semibold text-gray-700 mb-3">
          Selecionar Vaga
        </label>
        <select
          id="job-select"
          value={selectedJob?.id || ''}
          onChange={(e) => {
            const job = jobs.find((j) => j.id === parseInt(e.target.value));
            if (job) onSelectJob(job);
          }}
          className="w-full md:w-80 px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-600"
        >
          <option value="">Escolha uma vaga...</option>
          {jobs.map((job) => (
            <option key={job.id} value={job.id}>
              {job.title} - {job.location}
            </option>
          ))}
        </select>
      </div>

      {selectedJob && (
        <>
          {/* Filtros */}
          <div className="mb-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div className="flex-1">
                <label htmlFor="search-candidate" className="block text-sm font-semibold text-gray-700 mb-2">
                  Buscar Candidato
                </label>
                <div className="relative">
                  <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                  <input
                    id="search-candidate"
                    type="text"
                    placeholder="Nome ou email..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="status-filter-app" className="block text-sm font-semibold text-gray-700 mb-2">
                  Status
                </label>
                <select
                  id="status-filter-app"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as any)}
                  className="px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option value="all">Todos</option>
                  <option value="novo">Novo</option>
                  <option value="em-analise">Em análise</option>
                  <option value="aceito">Aceito</option>
                  <option value="rejeitado">Rejeitado</option>
                </select>
              </div>

              <button
                onClick={() => {
                  if (selectedJob) onSelectJob(selectedJob);
                }}
                className="px-6 py-3 rounded-lg bg-purple-600 text-white font-semibold hover:bg-purple-700 transition self-end"
              >
                ➜ Triagem
              </button>
            </div>
          </div>

          {/* Aplicações */}
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <div className="flex flex-col items-center gap-3">
                <Loader className="w-8 h-8 text-blue-600 animate-spin" />
                <p className="text-gray-600">Carregando candidaturas...</p>
              </div>
            </div>
          ) : filteredApplications.length === 0 ? (
            <div className="rounded-2xl bg-white border-2 border-dashed border-gray-300 p-12 text-center">
              <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Nenhuma candidatura encontrada
              </h3>
            </div>
          ) : (
            <div className="rounded-xl bg-white border border-gray-200 overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Candidato
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Contato
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Data
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredApplications.map((app) => (
                    <tr key={app.id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4">
                        <p className="font-semibold text-gray-900">{app.name}</p>
                        {app.linkedin && (
                          <p className="text-sm text-blue-600 cursor-pointer hover:underline">
                            LinkedIn
                          </p>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-gray-600">{app.email}</p>
                        <p className="text-sm text-gray-600">{app.phone}</p>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {new Date(app.createdAt).toLocaleDateString('pt-BR')}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(app.status)}`}>
                          {getStatusIcon(app.status)}
                          {app.status || 'Novo'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <a
                            href={`/uploads/${app.resumePath}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-sm px-3 py-1 rounded-lg bg-blue-100 text-blue-700 hover:bg-blue-200 transition"
                          >
                            <Download className="w-4 h-4" />
                            CV
                          </a>
                          <button
                            onClick={() => updateApplicationStatus(app.id, 'em-analise')}
                            className={`text-sm px-3 py-1 rounded-lg transition ${
                              app.status === 'em-analise'
                                ? 'bg-yellow-200 text-yellow-700'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                          >
                            Analisar
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
}
