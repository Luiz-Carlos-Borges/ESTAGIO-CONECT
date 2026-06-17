import { useState, useEffect } from 'react';
import { Eye, Edit, Trash2, ToggleRight, ToggleLeft, MapPin, Users, Loader, Briefcase, X, Save } from 'lucide-react';
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
  const [actionLoadingId, setActionLoadingId] = useState<number | null>(null);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [editForm, setEditForm] = useState({ title: '', location: '', type: '', salary: '' });
  const [savingEdit, setSavingEdit] = useState(false);

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

  // Exclui a vaga após confirmação do usuário.
  const handleDelete = async (job: Job) => {
    const confirmed = window.confirm(
      `Tem certeza que deseja excluir a vaga "${job.title}"? Essa ação também removerá todas as candidaturas associadas e não pode ser desfeita.`,
    );
    if (!confirmed) return;

    setActionLoadingId(job.id);
    const token = localStorage.getItem('token');
    const { error } = await apiCall(`/api/jobs/${job.id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });

    if (error) {
      window.alert('Não foi possível excluir a vaga. Tente novamente.');
    } else {
      setJobs((prev) => prev.filter((j) => j.id !== job.id));
    }
    setActionLoadingId(null);
  };

  // Ativa ou desativa a vaga (expira ou reabre o prazo).
  const handleToggleActive = async (job: Job) => {
    const isExpired = new Date(job.stats.deadline) <= new Date();
    setActionLoadingId(job.id);

    const token = localStorage.getItem('token');
    const { data, error } = await apiCall(`/api/jobs/${job.id}`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify({ toggleActive: isExpired }),
    });

    if (!error && data) {
      setJobs((prev) => prev.map((j) => (j.id === job.id ? (data as Job) : j)));
    } else {
      window.alert('Não foi possível atualizar o status da vaga.');
    }
    setActionLoadingId(null);
  };

  const startEdit = (job: Job) => {
    setEditingJob(job);
    setEditForm({
      title: job.title,
      location: job.location,
      type: job.type,
      salary: job.salary,
    });
  };

  const cancelEdit = () => {
    setEditingJob(null);
  };

  const saveEdit = async () => {
    if (!editingJob) return;
    if (!editForm.title.trim() || !editForm.location.trim()) {
      window.alert('Título e localização são obrigatórios.');
      return;
    }

    setSavingEdit(true);
    const token = localStorage.getItem('token');
    const { data, error } = await apiCall(`/api/jobs/${editingJob.id}`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify(editForm),
    });

    setSavingEdit(false);

    if (error) {
      window.alert('Não foi possível salvar as alterações. Tente novamente.');
      return;
    }

    setJobs((prev) => prev.map((j) => (j.id === editingJob.id ? (data as Job) : j)));
    setEditingJob(null);
  };

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
            const isActing = actionLoadingId === job.id;
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
                    onClick={() => startEdit(job)}
                    disabled={isActing}
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-gray-200 px-4 py-3 text-gray-700 font-semibold hover:bg-gray-300 transition disabled:opacity-50"
                    title="Editar vaga"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleToggleActive(job)}
                    disabled={isActing}
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-gray-200 px-4 py-3 text-gray-700 font-semibold hover:bg-gray-300 transition disabled:opacity-50"
                    title={isExpired ? 'Reativar vaga' : 'Desativar vaga'}
                  >
                    {isActing ? (
                      <Loader className="w-4 h-4 animate-spin" />
                    ) : isExpired ? (
                      <ToggleLeft className="w-4 h-4" />
                    ) : (
                      <ToggleRight className="w-4 h-4" />
                    )}
                  </button>
                  <button
                    onClick={() => handleDelete(job)}
                    disabled={isActing}
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-red-100 px-4 py-3 text-red-700 font-semibold hover:bg-red-200 transition disabled:opacity-50"
                    title="Excluir vaga"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal de edição rápida */}
      {editingJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-900">Editar vaga</h3>
              <button onClick={cancelEdit} className="p-1 rounded-lg hover:bg-gray-100 transition">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label htmlFor="edit-title" className="block text-sm font-semibold text-gray-700 mb-1">
                  Título da vaga
                </label>
                <input
                  id="edit-title"
                  type="text"
                  value={editForm.title}
                  onChange={(e) => setEditForm((f) => ({ ...f, title: e.target.value }))}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="edit-location" className="block text-sm font-semibold text-gray-700 mb-1">
                  Localização
                </label>
                <input
                  id="edit-location"
                  type="text"
                  value={editForm.location}
                  onChange={(e) => setEditForm((f) => ({ ...f, location: e.target.value }))}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="edit-type" className="block text-sm font-semibold text-gray-700 mb-1">
                    Tipo
                  </label>
                  <input
                    id="edit-type"
                    type="text"
                    value={editForm.type}
                    onChange={(e) => setEditForm((f) => ({ ...f, type: e.target.value }))}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="edit-salary" className="block text-sm font-semibold text-gray-700 mb-1">
                    Bolsa/Salário
                  </label>
                  <input
                    id="edit-salary"
                    type="text"
                    value={editForm.salary}
                    onChange={(e) => setEditForm((f) => ({ ...f, salary: e.target.value }))}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                onClick={cancelEdit}
                className="flex-1 rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition"
              >
                Cancelar
              </button>
              <button
                onClick={saveEdit}
                disabled={savingEdit}
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2.5 text-sm font-semibold text-white hover:shadow-md transition disabled:opacity-60"
              >
                {savingEdit ? <Loader className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
