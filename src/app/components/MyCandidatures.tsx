import { useState, useEffect } from 'react';
import { Search, Briefcase, Clock, CheckCircle, XCircle, ArrowLeft, Download, Loader } from 'lucide-react';
import { apiCall } from '../../config/api';

interface MyCandidaturesProps {
  onBack: () => void;
}

type Status = 'novo' | 'em-analise' | 'aceito' | 'rejeitado';

const STATUS_CONFIG: Record<Status, { label: string; color: string; icon: JSX.Element }> = {
  'novo': {
    label: 'Aguardando análise',
    color: 'bg-blue-100 text-blue-700 border-blue-200',
    icon: <Clock className="w-4 h-4" />,
  },
  'em-analise': {
    label: 'Em análise',
    color: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    icon: <Clock className="w-4 h-4" />,
  },
  'aceito': {
    label: 'Aprovado! 🎉',
    color: 'bg-green-100 text-green-700 border-green-200',
    icon: <CheckCircle className="w-4 h-4" />,
  },
  'rejeitado': {
    label: 'Não aprovado',
    color: 'bg-red-100 text-red-700 border-red-200',
    icon: <XCircle className="w-4 h-4" />,
  },
};

const STEPS: { key: Status; label: string }[] = [
  { key: 'novo', label: 'Candidatura enviada' },
  { key: 'em-analise', label: 'Em análise' },
  { key: 'aceito', label: 'Aprovado' },
];

export function MyCandidatures({ onBack }: MyCandidaturesProps) {
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = async () => {
    setLoading(true);
    const token = localStorage.getItem('token');
    const { data, error } = await apiCall('/api/applications/mine', {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (error) {
      setError('Não foi possível carregar suas candidaturas.');
    } else {
      setApplications(Array.isArray(data) ? data : []);
    }
    setLoading(false);
  };

  const getStepIndex = (status: Status) => {
    if (status === 'rejeitado') return -1;
    return STEPS.findIndex((s) => s.key === status);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Voltar</span>
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Search className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold text-gray-900">EstágioConnect</span>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-10 max-w-3xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-1">Minhas Candidaturas</h1>
          <p className="text-gray-500">Acompanhe o status de todas as suas candidaturas</p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader className="w-8 h-8 text-blue-600 animate-spin mr-3" />
            <span className="text-gray-600">Carregando candidaturas...</span>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center text-red-700">
            {error}
          </div>
        ) : applications.length === 0 ? (
          <div className="bg-white rounded-2xl border-2 border-dashed border-gray-200 p-16 text-center">
            <Briefcase className="w-14 h-14 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Nenhuma candidatura ainda</h3>
            <p className="text-gray-400 mb-6">Candidate-se a vagas para acompanhar o processo aqui.</p>
            <button
              onClick={onBack}
              className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition font-semibold"
            >
              Ver vagas disponíveis
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {applications.map((app) => {
              const status = (app.status || 'novo') as Status;
              const config = STATUS_CONFIG[status] || STATUS_CONFIG['novo'];
              const stepIndex = getStepIndex(status);
              const isRejected = status === 'rejeitado';

              return (
                <div key={app.id} className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                  {/* Topo do card */}
                  <div className="p-6">
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                          {app.job?.logo || '💼'}
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900 text-lg leading-tight">
                            {app.job?.title || 'Vaga'}
                          </h3>
                          <p className="text-gray-500 text-sm">{app.job?.company || ''}</p>
                        </div>
                      </div>
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border flex-shrink-0 ${config.color}`}>
                        {config.icon}
                        {config.label}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-5">
                      {app.job?.location && <span>📍 {app.job.location}</span>}
                      {app.job?.type && <span>🏢 {app.job.type}</span>}
                      <span>📅 Candidatura em {new Date(app.createdAt).toLocaleDateString('pt-BR')}</span>
                    </div>

                    {/* Linha de progresso */}
                    {!isRejected ? (
                      <div className="mt-2">
                        <div className="flex items-center justify-between mb-2">
                          {STEPS.map((step, i) => (
                            <div key={step.key} className="flex-1 flex flex-col items-center">
                              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold mb-1 transition ${
                                i <= stepIndex
                                  ? 'bg-blue-600 text-white'
                                  : 'bg-gray-200 text-gray-400'
                              }`}>
                                {i < stepIndex ? <CheckCircle className="w-4 h-4" /> : i + 1}
                              </div>
                              <span className={`text-xs text-center leading-tight ${i <= stepIndex ? 'text-blue-600 font-semibold' : 'text-gray-400'}`}>
                                {step.label}
                              </span>
                              {i < STEPS.length - 1 && (
                                <div className={`absolute mt-3.5 h-0.5 w-full ${i < stepIndex ? 'bg-blue-600' : 'bg-gray-200'}`} style={{ display: 'none' }} />
                              )}
                            </div>
                          ))}
                        </div>
                        {/* Barra de progresso */}
                        <div className="h-1.5 bg-gray-200 rounded-full mt-1">
                          <div
                            className="h-1.5 bg-blue-600 rounded-full transition-all"
                            style={{ width: `${((stepIndex + 1) / STEPS.length) * 100}%` }}
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="bg-red-50 border border-red-100 rounded-lg px-4 py-3 text-sm text-red-600">
                        Sua candidatura não avançou nesta seleção. Não desanime — continue se candidatando!
                      </div>
                    )}
                  </div>

                  {/* Rodapé do card */}
                  <div className="border-t border-gray-100 px-6 py-3 bg-gray-50 flex items-center justify-between">
                    <span className="text-xs text-gray-400">
                      {app.job?.location || ''}
                    </span>
                    <a
                      href={`/uploads/${app.resumePath}`}
                      download={(app as any).originalName || app.resumePath}
                      className="inline-flex items-center gap-1.5 text-xs text-blue-600 hover:text-blue-700 font-semibold"
                    >
                      <Download className="w-3.5 h-3.5" />
                      Ver currículo enviado
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
