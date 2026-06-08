import { useState, useEffect } from 'react';
import { Eye, Edit, Trash2, ToggleRight, Calendar, MapPin, Users, Loader, Briefcase } from 'lucide-react';
import type { Job, User } from '../types';
import { apiCall } from '../../config/api';

interface PublishedJobsProps {
  user: User;
  onSelectJob: (job: Job) => void;
}

export function PublishedJobs({ user, onSelectJob }: PublishedJobsProps) {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'active' | 'expired'>('all');

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    setLoading(true);
    const token = localStorage.getItem('token');
    const { data, error } = await apiCall('/api/jobs/my-jobs', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!error && Array.isArray(data)) {
      setJobs(data);
    }
    setLoading(false);
  };

  const filteredJobs = jobs.filter((job) => {
    if (filter === 'active') {
      return new Date(job.stats.deadline) > new Date();
    }
    if (filter === 'expired') {
      return new Date(job.stats.deadline) <= new Date();
    }
    return true;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="flex flex-col items-center gap-3">
          <Loader className="w-8 h-8 text-blue-600 animate-spin" />
          <p className="text-gray-600">Carregando vagas...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Filtros */}
      <div className="mb-8 flex gap-3 flex-wrap">
        {(['all', 'active', 'expired'] as const).map((filterType) => (
          <button
            key={filterType}
            onClick={() => setFilter(filterType)}
            className={`px-6 py-2 rounded-full font-semibold transition ${
              filter === filterType
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                : 'bg-white border border-gray-300 text-gray-700 hover:border-gray-400'
            }`}
          >
            {filterType === 'all' && `Todas (${jobs.length})`}
            {filterType === 'active' &&
              `Ativas (${jobs.filter((j) => new Date(j.stats.deadline) > new Date()).length})`}
            {filterType === 'expired' &&
              `Expiradas (${jobs.filter((j) => new Date(j.stats.deadline) <= new Date()).length})`}
          </button>
        ))}
      </div>

      {/* Grid de Vagas */}
      {filteredJobs.length === 0 ? (
        <div className="rounded-2xl bg-white border-2 border-dashed border-gray-300 p-16 text-center">
          <Briefcase className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {filter === 'all' && 'Nenhuma vaga publicada'}
            {filter === 'active' && 'Nenhuma vaga ativa'}
            {filter === 'expired' && 'Nenhuma vaga expirada'}
          </h3>
          <p className="text-gray-600 mb-6">
            Comece publicando sua primeira vaga clicando em "Nova Vaga"
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1">
          {filteredJobs.map((job) => {
            const isExpired = new Date(job.stats.deadline) <= new Date();
            return (
              <div
                key={job.id}
                className="rounded-xl bg-white border border-gray-200 p-6 hover:shadow-lg transition"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="text-3xl">{job.logo}</div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{job.title}</h3>
                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {job.location}
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {job.stats.applicants} candidatos
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    isExpired
                      ? 'bg-red-100 text-red-700'
                      : 'bg-green-100 text-green-700'
                  }`}>
                    {isExpired ? 'Expirada' : 'Ativa'}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6 py-4 border-t border-b border-gray-200">
                  <div>
                    <p className="text-sm text-gray-500">Visualizações</p>
                    <p className="text-2xl font-bold text-gray-900">{job.stats.views}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Data de encerramento</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {new Date(job.stats.deadline).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => onSelectJob(job)}
                    className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-3 text-white font-semibold hover:bg-blue-700 transition"
                  >
                    <Eye className="w-4 h-4" />
                    Ver Candidatos
                  </button>
                  <button
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-gray-200 px-4 py-3 text-gray-700 font-semibold hover:bg-gray-300 transition"
                    title="Editar vaga"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-gray-200 px-4 py-3 text-gray-700 font-semibold hover:bg-gray-300 transition"
                    title="Ativar ou desativar vaga"
                  >
                    <ToggleRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
