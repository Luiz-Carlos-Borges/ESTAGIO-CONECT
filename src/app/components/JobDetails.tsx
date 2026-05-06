import {
  Search, ArrowLeft, MapPin, Clock, DollarSign, Bookmark, Share2,
  Building2, Users, Calendar, CheckCircle, AlertCircle, Briefcase,
  GraduationCap, Award, TrendingUp
} from 'lucide-react';

interface JobDetailsProps {
  onBackToHome?: () => void;
}

export function JobDetails({ onBackToHome }: JobDetailsProps) {
  // Dados da vaga (em produção viria de uma API ou props)
  const job = {
    id: 1,
    title: 'Estágio em Desenvolvimento Web',
    company: 'TechCorp Brasil',
    location: 'São Paulo, SP',
    type: 'Presencial',
    salary: 'R$ 1.500 - R$ 2.000',
    posted: 'Há 2 dias',
    logo: '💻',
    tags: ['React', 'JavaScript', 'HTML/CSS'],
    featured: true,
    description: 'Estamos procurando um estudante apaixonado por tecnologia para se juntar à nossa equipe de desenvolvimento web. Você terá a oportunidade de trabalhar em projetos reais, aprender com profissionais experientes e contribuir para soluções inovadoras.',
    responsibilities: [
      'Desenvolver interfaces web responsivas usando React',
      'Colaborar com a equipe de design para implementar UI/UX',
      'Participar de code reviews e reuniões de planejamento',
      'Aprender e aplicar melhores práticas de desenvolvimento',
      'Contribuir para a manutenção e evolução de aplicações existentes'
    ],
    requirements: [
      'Estar cursando Ciência da Computação, Sistemas de Informação ou áreas relacionadas',
      'Conhecimentos básicos em HTML, CSS e JavaScript',
      'Interesse em aprender React e frameworks modernos',
      'Boa comunicação e trabalho em equipe',
      'Disponibilidade para estágio de 6 horas diárias'
    ],
    benefits: [
      'Auxílio transporte',
      'Vale refeição',
      'Horário flexível',
      'Certificado de estágio',
      'Possibilidade de efetivação',
      'Treinamentos e workshops',
      'Ambiente colaborativo'
    ],
    companyInfo: {
      description: 'A TechCorp Brasil é uma empresa de tecnologia focada em soluções web inovadoras. Com mais de 50 colaboradores, trabalhamos com clientes de diversos setores, sempre buscando excelência e inovação.',
      size: '51-200 funcionários',
      founded: '2018',
      website: 'www.techcorp.com.br'
    },
    stats: {
      applicants: 47,
      deadline: '15 dias restantes',
      views: 234
    }
  };

  const relatedJobs = [
    {
      id: 2,
      title: 'Estágio em Design UI/UX',
      company: 'Creative Studio',
      location: 'Rio de Janeiro, RJ',
      salary: 'R$ 1.200 - R$ 1.800',
      logo: '🎨'
    },
    {
      id: 3,
      title: 'Estágio em Marketing Digital',
      company: 'Marketing Pro',
      location: 'Belo Horizonte, MG',
      salary: 'R$ 1.000 - R$ 1.500',
      logo: '📊'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header com navegação */}
      <header className="border-b bg-white sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Search className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">EstágioConnect</span>
            </div>
            <div className="flex items-center gap-4">
              <button className="hidden md:flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-blue-600 transition">
                <Users className="w-5 h-5" />
                <span>Entrar</span>
              </button>
              <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                Cadastrar
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <button
            onClick={onBackToHome}
            className="flex items-center gap-2 text-gray-600 hover:text-blue-600"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Voltar para vagas</span>
          </button>
        </div>
      </div>

      {/* Layout 2 colunas: Conteúdo + Sidebar */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Coluna principal com todas as informações */}
          <div className="lg:col-span-2">
            {/* Card da Vaga */}
            <div className="bg-white rounded-xl p-6 mb-6 shadow-sm">
              <div className="flex items-start justify-between mb-4">
                <div className="flex gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-3xl">
                    {job.logo}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <h1 className="text-2xl font-bold text-gray-900">{job.title}</h1>
                      {job.featured && (
                        <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-semibold rounded-full">
                          ⭐ Destaque
                        </span>
                      )}
                    </div>
                    <p className="text-lg text-gray-600 mb-2">{job.company}</p>
                    <div className="flex flex-wrap gap-2">
                      {job.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-blue-50 text-blue-600 text-sm rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition" aria-label="Salvar vaga">
                    <Bookmark className="w-5 h-5 text-gray-400" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition" aria-label="Compartilhar vaga">
                    <Share2 className="w-5 h-5 text-gray-400" />
                  </button>
                </div>
              </div>
            </div>

            {/* Informações Rápidas */}
            <div className="bg-white rounded-xl p-6 mb-6 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-blue-600" />
                Informações da Vaga
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="font-medium text-gray-900">{job.location}</p>
                    <p className="text-sm text-gray-600">{job.type}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <DollarSign className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="font-medium text-gray-900">{job.salary}</p>
                    <p className="text-sm text-gray-600">por mês</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="font-medium text-gray-900">30h semanais</p>
                    <p className="text-sm text-gray-600">Segunda a Sexta</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="font-medium text-gray-900">Publicado {job.posted}</p>
                    <p className="text-sm text-gray-600">Prazo: {job.stats.deadline}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sobre a Vaga */}
            <div className="bg-white rounded-xl p-6 mb-6 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                Sobre a Vaga
              </h2>
              <p className="text-gray-700 leading-relaxed">{job.description}</p>
            </div>

            {/* Responsabilidades */}
            <div className="bg-white rounded-xl p-6 mb-6 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-purple-600" />
                Responsabilidades
              </h2>
              <ul className="space-y-3">
                {job.responsibilities.map((responsibility, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{responsibility}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Requisitos */}
            <div className="bg-white rounded-xl p-6 mb-6 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-blue-600" />
                Requisitos
              </h2>
              <ul className="space-y-3">
                {job.requirements.map((requirement, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{requirement}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Benefícios */}
            <div className="bg-white rounded-xl p-6 mb-6 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-yellow-600" />
                Benefícios
              </h2>
              <div className="grid md:grid-cols-2 gap-3">
                {job.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Sobre a Empresa */}
            <div className="bg-white rounded-xl p-6 mb-6 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-indigo-600" />
                Sobre a Empresa
              </h2>
              <div className="space-y-4">
                <p className="text-gray-700">{job.companyInfo.description}</p>
                <div className="grid md:grid-cols-2 gap-4 pt-4 border-t">
                  <div>
                    <p className="text-sm text-gray-600">Tamanho da empresa</p>
                    <p className="font-medium text-gray-900">{job.companyInfo.size}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Fundada em</p>
                    <p className="font-medium text-gray-900">{job.companyInfo.founded}</p>
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-sm text-gray-600">Website</p>
                    <a href={`https://${job.companyInfo.website}`} className="font-medium text-blue-600 hover:underline">
                      {job.companyInfo.website}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar com botão de candidatura e vagas relacionadas */}
          <div className="lg:col-span-1">
            {/* Card de Candidatura Fixo */}
            <div className="bg-white rounded-xl p-6 shadow-lg sticky top-24 mb-6">
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-green-600 mb-2">{job.salary}</div>
                <p className="text-sm text-gray-600">por mês</p>
              </div>

              <button className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold mb-4">
                Candidatar-se Agora
              </button>

              <button className="w-full py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition mb-4 flex items-center justify-center gap-2">
                <Bookmark className="w-4 h-4" />
                Salvar Vaga
              </button>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Candidaturas:</span>
                  <span className="font-medium">{job.stats.applicants}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Visualizações:</span>
                  <span className="font-medium">{job.stats.views}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Prazo:</span>
                  <span className="font-medium text-orange-600">{job.stats.deadline}</span>
                </div>
              </div>
            </div>

            {/* Vagas Relacionadas */}
            <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Vagas Relacionadas</h3>
              <div className="space-y-4">
                {relatedJobs.map((relatedJob) => (
                  <div key={relatedJob.id} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition">
                    <div className="flex gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-lg">
                        {relatedJob.logo}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 text-sm mb-1">{relatedJob.title}</h4>
                        <p className="text-xs text-gray-600 mb-1">{relatedJob.company}</p>
                        <p className="text-xs text-gray-600 mb-2">{relatedJob.location}</p>
                        <p className="text-xs font-medium text-green-600">{relatedJob.salary}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Dica de Carreira */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-100">
              <div className="flex items-center gap-3 mb-4">
                <TrendingUp className="w-6 h-6 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900">Dica de Carreira</h3>
              </div>
              <p className="text-gray-700 text-sm mb-4">
                "Esteja sempre atualizado com as tecnologias mais recentes. Participe de comunidades online e contribua para projetos open source."
              </p>
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <Award className="w-4 h-4" />
                <span>Por EstágioConnect</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}