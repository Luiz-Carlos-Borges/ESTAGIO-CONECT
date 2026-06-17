// CompanyProfile.tsx: aba de perfil e configurações da empresa no painel
// Permite editar dados reais da empresa (persistidos no banco) e ver estatísticas consolidadas.

import { useState, useEffect } from 'react';
import {
  Building2,
  Globe,
  Phone,
  Mail,
  Users,
  Briefcase,
  TrendingUp,
  Eye,
  CheckCircle,
  Edit3,
  Save,
  X,
  AlertCircle,
  Loader,
  Link2,
  BarChart2,
} from 'lucide-react';
import type { User } from '../types';
import { apiCall } from '../../config/api';

interface CompanyProfileProps {
  user: User;
  onUserUpdate?: (updatedUser: User) => void;
}

interface CompanyStats {
  totalJobs: number;
  activeJobs: number;
  totalApplicants: number;
  totalViews: number;
}

interface EditableCompany {
  name: string;
  phone: string;
  about: string;
  website: string;
}

export function CompanyProfile({ user, onUserUpdate }: CompanyProfileProps) {
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [stats, setStats] = useState<CompanyStats | null>(null);
  const [loadingStats, setLoadingStats] = useState(true);

  const [form, setForm] = useState<EditableCompany>({
    name: user.company?.name ?? '',
    phone: user.company?.phone ?? '',
    about: user.company?.about ?? '',
    website: user.company?.website ?? '',
  });

  // Mantém o formulário sincronizado se o usuário (vindo de fora) mudar.
  useEffect(() => {
    setForm({
      name: user.company?.name ?? '',
      phone: user.company?.phone ?? '',
      about: user.company?.about ?? '',
      website: user.company?.website ?? '',
    });
  }, [user.company?.name, user.company?.phone, user.company?.about, user.company?.website]);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    setLoadingStats(true);
    const token = localStorage.getItem('token');
    const { data, error } = await apiCall<any[]>('/api/jobs/my-jobs', {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!error && Array.isArray(data)) {
      const jobs = data;
      const now = new Date();
      const active = jobs.filter((j) => new Date(j.stats.deadline) > now).length;
      const totalApplicants = jobs.reduce((acc: number, j: any) => acc + (j.stats.applicants ?? 0), 0);
      const totalViews = jobs.reduce((acc: number, j: any) => acc + (j.stats.views ?? 0), 0);

      setStats({
        totalJobs: jobs.length,
        activeJobs: active,
        totalApplicants,
        totalViews,
      });
    }
    setLoadingStats(false);
  };

  const startEdit = () => {
    setForm({
      name: user.company?.name ?? '',
      phone: user.company?.phone ?? '',
      about: user.company?.about ?? '',
      website: user.company?.website ?? '',
    });
    setSaveError(null);
    setSaveSuccess(false);
    setEditing(true);
  };

  const cancelEdit = () => {
    setEditing(false);
    setSaveError(null);
  };

  const handleSave = async () => {
    if (!form.name.trim()) {
      setSaveError('O nome da empresa é obrigatório.');
      return;
    }

    setSaving(true);
    setSaveError(null);

    const token = localStorage.getItem('token');
    const { data, error } = await apiCall('/api/auth/profile', {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        company: {
          name: form.name,
          phone: form.phone,
          about: form.about,
          website: form.website,
        },
      }),
    });

    setSaving(false);

    if (error || !data) {
      setSaveError(typeof error === 'string' ? error : 'Não foi possível salvar no servidor. Tente novamente.');
      return;
    }

    // O backend gera um novo token com os dados atualizados — precisa substituir o antigo,
    // senão o próximo recarregamento da página volta a mostrar os dados velhos.
    if (data.token) {
      localStorage.setItem('token', data.token);
    }

    setSaveSuccess(true);
    setEditing(false);
    if (onUserUpdate && data.user) {
      onUserUpdate(data.user);
    }
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const field = (key: keyof EditableCompany, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  // ───── Seção de estatísticas ─────
  const statCards = loadingStats
    ? []
    : [
        {
          label: 'Vagas publicadas',
          value: stats?.totalJobs ?? 0,
          icon: Briefcase,
          color: 'text-blue-600',
          bg: 'bg-blue-50',
        },
        {
          label: 'Vagas ativas',
          value: stats?.activeJobs ?? 0,
          icon: TrendingUp,
          color: 'text-green-600',
          bg: 'bg-green-50',
        },
        {
          label: 'Candidatos recebidos',
          value: stats?.totalApplicants ?? 0,
          icon: Users,
          color: 'text-purple-600',
          bg: 'bg-purple-50',
        },
        {
          label: 'Visualizações totais',
          value: stats?.totalViews ?? 0,
          icon: Eye,
          color: 'text-orange-600',
          bg: 'bg-orange-50',
        },
      ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">

      {/* ── Banner ── */}
      <div className="relative rounded-2xl overflow-hidden">
        <div className="h-36 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600" />

        <div className="absolute left-8 top-16 flex items-center gap-4">
          <div className="w-24 h-24 rounded-2xl bg-white border-4 border-white shadow-xl flex items-center justify-center">
            <Building2 className="w-12 h-12 text-blue-600" />
          </div>
        </div>

        <div className="absolute right-6 bottom-4">
          {!editing ? (
            <button
              onClick={startEdit}
              className="inline-flex items-center gap-2 rounded-lg bg-white border border-gray-200 px-5 py-2 text-sm font-semibold text-gray-700 shadow hover:bg-gray-50 transition"
            >
              <Edit3 className="w-4 h-4" />
              Editar perfil
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={cancelEdit}
                className="inline-flex items-center gap-2 rounded-lg bg-white border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 shadow hover:bg-gray-50 transition"
              >
                <X className="w-4 h-4" />
                Cancelar
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-2 text-sm font-semibold text-white shadow hover:shadow-md transition disabled:opacity-60"
              >
                {saving ? (
                  <Loader className="w-4 h-4 animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                Salvar
              </button>
            </div>
          )}
        </div>

        <div className="bg-white border border-gray-100 rounded-b-2xl px-8 pt-16 pb-6">
          <div className="flex items-end justify-between flex-wrap gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {user.company?.name || 'Nome da Empresa'}
              </h2>
              <p className="text-gray-500 flex items-center gap-1 mt-1">
                <Mail className="w-4 h-4" />
                {user.email}
              </p>
            </div>
            {saveSuccess && (
              <div className="inline-flex items-center gap-2 rounded-full bg-green-50 border border-green-200 px-4 py-2 text-sm font-semibold text-green-700">
                <CheckCircle className="w-4 h-4" />
                Perfil atualizado!
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Estatísticas rápidas ── */}
      <section>
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <BarChart2 className="w-5 h-5 text-blue-600" />
          Visão geral
        </h3>

        {loadingStats ? (
          <div className="flex items-center gap-3 text-gray-500 py-8 justify-center">
            <Loader className="w-6 h-6 animate-spin" />
            Carregando estatísticas...
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {statCards.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.label}
                  className="rounded-xl bg-white border border-gray-100 p-5 shadow-sm hover:shadow-md transition"
                >
                  <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl ${card.bg} mb-3`}>
                    <Icon className={`w-5 h-5 ${card.color}`} />
                  </div>
                  <p className="text-3xl font-bold text-gray-900">{card.value}</p>
                  <p className="text-sm text-gray-500 mt-1">{card.label}</p>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* ── Informações da empresa ── */}
      <section className="rounded-2xl bg-white border border-gray-100 shadow-sm p-8">
        <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
          <Building2 className="w-5 h-5 text-blue-600" />
          Informações da empresa
        </h3>

        {saveError && (
          <div className="mb-6 flex items-start gap-3 rounded-xl bg-red-50 border border-red-200 p-4 text-sm text-red-700">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            {saveError}
          </div>
        )}

        <div className="grid gap-6 md:grid-cols-2">
          {/* Nome */}
          <div className="md:col-span-2">
            <label htmlFor="company-name" className="block text-sm font-semibold text-gray-700 mb-1">
              Nome da empresa <span className="text-red-500">*</span>
            </label>
            {editing ? (
              <input
                id="company-name"
                type="text"
                value={form.name}
                onChange={(e) => field('name', e.target.value)}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Nome da empresa"
              />
            ) : (
              <p className="text-gray-900 font-medium py-1">{user.company?.name || '—'}</p>
            )}
          </div>

          {/* Telefone */}
          <div>
            <label htmlFor="company-phone" className="block text-sm font-semibold text-gray-700 mb-1">
              <span className="flex items-center gap-1">
                <Phone className="w-3.5 h-3.5" /> Telefone
              </span>
            </label>
            {editing ? (
              <input
                id="company-phone"
                type="tel"
                value={form.phone}
                onChange={(e) => field('phone', e.target.value)}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="(11) 99999-9999"
              />
            ) : (
              <p className="text-gray-900 py-1">{user.company?.phone || '—'}</p>
            )}
          </div>

          {/* Website */}
          <div>
            <label htmlFor="company-website" className="block text-sm font-semibold text-gray-700 mb-1">
              <span className="flex items-center gap-1">
                <Globe className="w-3.5 h-3.5" /> Site
              </span>
            </label>
            {editing ? (
              <input
                id="company-website"
                type="url"
                value={form.website}
                onChange={(e) => field('website', e.target.value)}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://suaempresa.com.br"
              />
            ) : user.company?.website ? (
              <a
                href={user.company.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-blue-600 hover:underline py-1"
              >
                <Link2 className="w-4 h-4" />
                {user.company.website}
              </a>
            ) : (
              <p className="text-gray-900 py-1">—</p>
            )}
          </div>

          {/* Sobre */}
          <div className="md:col-span-2">
            <label htmlFor="company-about" className="block text-sm font-semibold text-gray-700 mb-1">
              Sobre a empresa
            </label>
            {editing ? (
              <textarea
                id="company-about"
                value={form.about}
                onChange={(e) => field('about', e.target.value)}
                rows={5}
                maxLength={1000}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                placeholder="Descreva a empresa, sua missão, cultura e o que a torna um ótimo lugar para estagiar."
              />
            ) : (
              <p className="text-gray-700 leading-relaxed py-1 whitespace-pre-line">
                {user.company?.about || 'Nenhuma descrição adicionada ainda.'}
              </p>
            )}
            {editing && (
              <p className="text-xs text-gray-400 mt-1 text-right">{form.about.length}/1000</p>
            )}
          </div>
        </div>

        {/* Botões inline (visíveis apenas no modo edição em telas menores) */}
        {editing && (
          <div className="mt-6 flex gap-3 md:hidden">
            <button
              onClick={cancelEdit}
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl border border-gray-300 px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition"
            >
              <X className="w-4 h-4" /> Cancelar
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-3 text-sm font-semibold text-white hover:shadow-md transition disabled:opacity-60"
            >
              {saving ? <Loader className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              Salvar
            </button>
          </div>
        )}
      </section>

      {/* ── Conta ── */}
      <section className="rounded-2xl bg-white border border-gray-100 shadow-sm p-8">
        <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
          <Mail className="w-5 h-5 text-blue-600" />
          Dados da conta
        </h3>

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <p className="text-sm font-semibold text-gray-500 mb-1">Nome do responsável</p>
            <p className="text-gray-900 font-medium">{user.name}</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-500 mb-1">E-mail de acesso</p>
            <p className="text-gray-900">{user.email}</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-500 mb-1">Tipo de conta</p>
            <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700">
              <Building2 className="w-3.5 h-3.5" /> Empresa
            </span>
          </div>
        </div>
      </section>

    </div>
  );
}
