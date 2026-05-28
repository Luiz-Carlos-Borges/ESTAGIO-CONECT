import { Search, Users, Briefcase, ArrowRight, CheckCircle, Building2, GraduationCap, TrendingUp, Award } from 'lucide-react';

// WelcomeScreen.tsx: página de boas-vindas que permite escolher entre estudante ou empresa
interface WelcomeScreenProps {
  onStartAsStudent: () => void;
  onStartAsCompany: () => void;
}

export function WelcomeScreen({ onStartAsStudent, onStartAsCompany }: WelcomeScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Search className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">EstágioConnect</span>
            </div>
            <a href="#" className="text-gray-600 hover:text-blue-600 transition text-sm">
              Precisa de ajuda?
            </a>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-6xl mx-auto">
          {/* Título Principal */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Como você quer continuar?
            </h1>
            <p className="text-lg md:text-xl text-gray-600">
              Escolha o tipo de conta para começar sua jornada
            </p>
          </div>

          {/* Cards de Escolha */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Card Candidato/Estudante */}
            <div className="group bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-transparent hover:border-blue-600">
              <div className="relative h-48 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <div className="absolute inset-0 bg-black/10"></div>
                <GraduationCap className="w-24 h-24 text-white relative z-10" />
                <div className="absolute top-4 right-4 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-semibold">
                  Popular
                </div>
              </div>

              <div className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Sou Estudante</h2>
                </div>

                <p className="text-gray-600 mb-6">
                  Encontre o estágio ideal para dar o primeiro passo na sua carreira profissional
                </p>

                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Acesso a milhares de vagas de estágio</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Candidate-se com apenas um clique</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Receba recomendações personalizadas</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Acompanhe suas candidaturas em tempo real</span>
                  </li>
                </ul>

                <div className="space-y-3">
                  <button
                    type="button"
                    onClick={onStartAsStudent}
                    className="w-full py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition font-semibold text-lg flex items-center justify-center gap-2 group-hover:scale-105 transition-transform"
                  >
                    Entrar como Estudante
                    <ArrowRight className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    className="w-full py-3 border-2 border-gray-200 text-gray-700 rounded-xl hover:border-blue-600 hover:text-blue-600 transition font-semibold"
                  >
                    Criar Conta Grátis
                  </button>
                </div>

                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-500">
                    <span className="font-semibold text-blue-600">12.500+</span> estudantes já cadastrados
                  </p>
                </div>
              </div>
            </div>

            {/* Card Empresa */}
            <div className="group bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-transparent hover:border-purple-600">
              <div className="relative h-48 bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
                <div className="absolute inset-0 bg-black/10"></div>
                <Building2 className="w-24 h-24 text-white relative z-10" />
                <div className="absolute top-4 right-4 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-semibold">
                  Premium
                </div>
              </div>

              <div className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <Briefcase className="w-6 h-6 text-purple-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Sou Empresa</h2>
                </div>

                <p className="text-gray-600 mb-6">
                  Encontre os melhores talentos universitários para fortalecer sua equipe
                </p>

                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Publique vagas de estágio ilimitadas</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Acesso a banco de talentos qualificados</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Ferramentas de triagem automática</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Gestão completa do processo seletivo</span>
                  </li>
                </ul>

                <div className="space-y-3">
                  <button
                  type="button"
                  onClick={onStartAsCompany}
                  className="w-full py-4 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition font-semibold text-lg flex items-center justify-center gap-2 group-hover:scale-105 transition-transform"
                >
                  Entrar como Empresa
                  <ArrowRight className="w-5 h-5" />
                </button>
                  <button className="w-full py-3 border-2 border-gray-200 text-gray-700 rounded-xl hover:border-purple-600 hover:text-purple-600 transition font-semibold" type="button">
                    Cadastrar Empresa
                  </button>
                </div>

                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-500">
                    <span className="font-semibold text-purple-600">850+</span> empresas parceiras
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Seção de Benefícios */}
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-8">
              Por que escolher o EstágioConnect?
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Conexão Rápida</h3>
                <p className="text-gray-600 text-sm">
                  Conectamos estudantes e empresas de forma eficiente e transparente
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Qualidade Garantida</h3>
                <p className="text-gray-600 text-sm">
                  Todas as vagas e perfis são verificados pela nossa equipe
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">100% Gratuito</h3>
                <p className="text-gray-600 text-sm">
                  Para estudantes é totalmente grátis, sempre
                </p>
              </div>
            </div>
          </div>

          {/* Estatísticas */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl p-6 text-center shadow-sm">
              <div className="text-3xl font-bold text-blue-600 mb-1">1.500+</div>
              <div className="text-sm text-gray-600">Vagas Ativas</div>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-sm">
              <div className="text-3xl font-bold text-purple-600 mb-1">850+</div>
              <div className="text-sm text-gray-600">Empresas</div>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-sm">
              <div className="text-3xl font-bold text-green-600 mb-1">12.5k+</div>
              <div className="text-sm text-gray-600">Estudantes</div>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-sm">
              <div className="text-3xl font-bold text-orange-600 mb-1">95%</div>
              <div className="text-sm text-gray-600">Satisfação</div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Simplificado */}
      <footer className="border-t bg-white/80 backdrop-blur-sm py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-600">
            <p>© 2026 EstágioConnect. Todos os direitos reservados.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-blue-600 transition">Sobre</a>
              <a href="#" className="hover:text-blue-600 transition">Ajuda</a>
              <a href="#" className="hover:text-blue-600 transition">Termos</a>
              <a href="#" className="hover:text-blue-600 transition">Privacidade</a>
              <a href="#" className="hover:text-blue-600 transition">Contato</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
