import {
  Search, ArrowLeft, CheckCircle, Clock, FileText, Video, Users,
  Upload, Send, AlertCircle, Calendar, Mail, Phone,
  Github, Linkedin, Award, Briefcase, GraduationCap, MapPin
} from 'lucide-react';
import { FormEvent, useState } from 'react';
import { Job } from '../types';

interface ApplicationProcessProps {
  job?: Job | null;
  jobs: Job[];
  onBackToJob?: () => void;
}

// ApplicationProcess.tsx: página de candidatura e visualização das etapas do processo seletivo
export function ApplicationProcess({ job, jobs, onBackToJob }: ApplicationProcessProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    resume: null,
    coverLetter: '',
    portfolio: '',
    linkedin: '',
    github: '',
    name: '',
    email: '',
    phone: '',
    city: '',
  });

  const currentJob = job ?? jobs[0] ?? {
    id: 0,
    title: 'Estágio em Desenvolvimento Web',
    company: 'TechCorp Brasil',
    logo: '💻',
    location: 'São Paulo, SP',
    salary: 'R$ 1.500 - R$ 2.000',
    type: 'Remoto',
    posted: '---',
    tags: [],
    featured: false,
    description: '',
    responsibilities: [],
    requirements: [],
    benefits: [],
    companyInfo: { description: '', size: '', founded: '', website: '' },
    stats: { applicants: 0, deadline: '---', views: 0 },
  };

  // Etapas do processo seletivo exibidas no sidebar e na timeline
  const processSteps = [
    {
      id: 1,
      title: 'Candidatura',
      description: 'Envie seu currículo e informações',
      icon: Send,
      duration: 'Imediato',
      status: 'current',
      details: 'Preencha o formulário com suas informações e envie seu currículo atualizado.'
    },
    {
      id: 2,
      title: 'Triagem de Currículo',
      description: 'Análise do seu perfil pelo RH',
      icon: FileText,
      duration: '2-3 dias',
      status: 'pending',
      details: 'Nossa equipe de RH vai analisar seu currículo e verificar se seu perfil está alinhado com os requisitos da vaga.'
    },
    {
      id: 3,
      title: 'Teste Técnico',
      description: 'Desafio de programação online',
      icon: Award,
      duration: '3-5 dias',
      status: 'pending',
      details: 'Você receberá um desafio técnico para resolver em casa. Tempo estimado: 2-4 horas.'
    },
    {
      id: 4,
      title: 'Entrevista com RH',
      description: 'Conversa sobre fit cultural',
      icon: Users,
      duration: '1 semana',
      status: 'pending',
      details: 'Entrevista de 30-45 minutos para conhecer mais sobre você, suas expectativas e alinhamento cultural.'
    },
    {
      id: 5,
      title: 'Entrevista Técnica',
      description: 'Papo com o time de tecnologia',
      icon: Video,
      duration: '1-2 semanas',
      status: 'pending',
      details: 'Entrevista técnica com desenvolvedores da equipe para avaliar conhecimentos e discutir o teste técnico.'
    },
    {
      id: 6,
      title: 'Resultado Final',
      description: 'Feedback e proposta',
      icon: CheckCircle,
      duration: '3-5 dias',
      status: 'pending',
      details: 'Você receberá o feedback final e, se aprovado, a proposta formal de estágio.'
    }
  ];

  // Submete o formulário de candidatura e confirma o envio ao usuário
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert('Candidatura enviada com sucesso! Você receberá atualizações por email.');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Search className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900">EstágioConnect</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <button
            onClick={onBackToJob}
            className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Voltar para a vaga</span>
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Cabeçalho da Vaga */}
          <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-3xl">
                {currentJob.logo}
              </div>
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-gray-900 mb-1">{currentJob.title}</h1>
                <p className="text-gray-600">{currentJob.company}</p>
              </div>
              <div className="hidden md:flex flex-col items-end gap-1">
                <span className="text-2xl font-bold text-green-600">{currentJob.salary}</span>
                <span className="text-sm text-gray-500">{currentJob.location}</span>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Formulário de Candidatura */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl p-6 md:p-8 shadow-sm mb-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Briefcase className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Candidate-se para esta vaga</h2>
                    <p className="text-gray-600">Preencha as informações abaixo para se candidatar</p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Informações Pessoais */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <GraduationCap className="w-5 h-5 text-purple-600" />
                      Informações Pessoais
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Nome Completo
                        </label>
                        <input
                          type="text"
                          placeholder="João da Silva"
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="email"
                            placeholder="seu@email.com"
                            className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition"
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Telefone
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="tel"
                            placeholder="(11) 99999-9999"
                            className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition"
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Cidade
                        </label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="text"
                            placeholder="São Paulo, SP"
                            className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Currículo */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <FileText className="w-5 h-5 text-blue-600" />
                      Currículo e Documentos
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Currículo (PDF ou DOC) *
                        </label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-blue-600 transition cursor-pointer">
                          <div className="text-center">
                            <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                            <p className="text-sm text-gray-600 mb-1">
                              Clique para fazer upload ou arraste o arquivo
                            </p>
                            <p className="text-xs text-gray-500">PDF ou DOC até 5MB</p>
                          </div>
                          <input type="file" className="hidden" accept=".pdf,.doc,.docx" aria-label="Enviar currículo" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Carta de Apresentação (Opcional)
                        </label>
                        <textarea
                          rows={4}
                          placeholder="Conte um pouco sobre você e por que se interessa por esta vaga..."
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition resize-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Links Profissionais */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <Linkedin className="w-5 h-5 text-blue-600" />
                      Links Profissionais
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          LinkedIn
                        </label>
                        <div className="relative">
                          <Linkedin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="url"
                            placeholder="linkedin.com/in/seuperfil"
                            className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          GitHub (Recomendado)
                        </label>
                        <div className="relative">
                          <Github className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="url"
                            placeholder="github.com/seuperfil"
                            className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition"
                          />
                        </div>
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Portfólio (Opcional)
                        </label>
                        <input
                          type="url"
                          placeholder="https://seuportfolio.com"
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Termos */}
                  <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                    <input
                      type="checkbox"
                      id="terms"
                      className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-600"
                      required
                    />
                    <label htmlFor="terms" className="text-sm text-gray-700">
                      Declaro que as informações fornecidas são verdadeiras e autorizo o uso dos meus dados para fins de processo seletivo, de acordo com a{' '}
                      <a href="#" className="text-blue-600 hover:underline">LGPD</a>.
                    </label>
                  </div>

                  {/* Botões */}
                  <div className="flex gap-4 pt-4">
                    <button
                      type="button"
                      className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-semibold"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold flex items-center justify-center gap-2"
                    >
                      <Send className="w-5 h-5" />
                      Enviar Candidatura
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Sidebar - Processo Seletivo */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl p-6 shadow-sm sticky top-24">
                <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  Processo Seletivo
                </h3>
                <p className="text-sm text-gray-600 mb-6">
                  Acompanhe as etapas do processo após enviar sua candidatura
                </p>

                <div className="space-y-1">
                  {processSteps.map((step, index) => (
                    <div key={step.id} className="relative">
                      {/* Linha conectora */}
                      {index < processSteps.length - 1 && (
                        <div className="absolute left-4 top-10 w-0.5 h-12 bg-gray-200" />
                      )}

                      <div className={`flex gap-3 p-3 rounded-lg transition ${
                        step.status === 'current' ? 'bg-blue-50 border border-blue-200' : ''
                      }`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                          step.status === 'current'
                            ? 'bg-blue-600 text-white'
                            : step.status === 'completed'
                            ? 'bg-green-600 text-white'
                            : 'bg-gray-200 text-gray-500'
                        }`}>
                          {step.status === 'completed' ? (
                            <CheckCircle className="w-5 h-5" />
                          ) : (
                            <step.icon className="w-4 h-4" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <h4 className={`font-semibold text-sm ${
                              step.status === 'current' ? 'text-blue-900' : 'text-gray-900'
                            }`}>
                              {step.title}
                            </h4>
                            <span className="text-xs text-gray-500 whitespace-nowrap">
                              {step.duration}
                            </span>
                          </div>
                          <p className="text-xs text-gray-600 mt-0.5">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex gap-3">
                    <Clock className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-blue-900 text-sm mb-1">
                        Prazo Total
                      </h4>
                      <p className="text-xs text-blue-700">
                        O processo completo leva aproximadamente <strong>4-6 semanas</strong>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="flex gap-3">
                    <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-yellow-900 text-sm mb-1">
                        Dica Importante
                      </h4>
                      <p className="text-xs text-yellow-700">
                        Você receberá emails após cada etapa. Fique de olho na sua caixa de entrada!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Timeline Expandida (Desktop) */}
          <div className="hidden xl:block mt-12">
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                Detalhes do Processo Seletivo
              </h2>

              <div className="relative">
                {/* Linha do tempo */}
                <div className="absolute top-12 left-0 right-0 h-1 bg-gray-200" />

                <div className="grid grid-cols-6 gap-4">
                  {processSteps.map((step) => (
                    <div key={step.id} className="relative">
                      {/* Círculo */}
                      <div className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-4 relative z-10 ${
                        step.status === 'current'
                          ? 'bg-blue-600 text-white ring-4 ring-blue-200'
                          : step.status === 'completed'
                          ? 'bg-green-600 text-white'
                          : 'bg-gray-100 text-gray-400'
                      }`}>
                        <step.icon className="w-10 h-10" />
                      </div>

                      {/* Informações */}
                      <div className="text-center">
                        <div className="font-bold text-gray-900 mb-1">
                          {step.title}
                        </div>
                        <div className="text-sm text-gray-600 mb-2">
                          {step.description}
                        </div>
                        <div className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-full text-xs text-gray-600">
                          <Clock className="w-3 h-3" />
                          {step.duration}
                        </div>
                        <p className="text-xs text-gray-500 mt-3 leading-relaxed">
                          {step.details}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
