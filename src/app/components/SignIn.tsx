import { Search, Mail, Lock, ArrowRight, CheckCircle, Briefcase, TrendingUp } from 'lucide-react';

// SignIn.tsx: página de login com layout responsivo e opções de acesso social
interface SignInProps {
  onBackToHome?: () => void;
}

export function SignIn({ onBackToHome }: SignInProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header Simplificado */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Search className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">EstágioConnect</span>
            </div>

            
            <a href="#" className="text-gray-600 hover:text-blue-600 transition">
              Não tem conta? <span className="font-semibold text-blue-600">Cadastre-se</span>  
            </a>
          </div>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Lado Esquerdo - Benefícios */}
            <div className="hidden lg:block space-y-8">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                  Bem-vindo de volta!
                </h1>
                <p className="text-lg text-gray-600">
                  Continue sua busca pelo estágio ideal e impulsione sua carreira
                </p>
              </div>

              <div className="space-y-4">
                {[
                  {
                    icon: Briefcase,
                    title: 'Suas candidaturas',
                    desc: 'Acompanhe o status de todas as vagas que você aplicou',
                    color: 'bg-blue-100 text-blue-600'
                  },
                  {
                    icon: Search,
                    title: 'Vagas personalizadas',
                    desc: 'Receba sugestões baseadas no seu perfil e interesses',
                    color: 'bg-purple-100 text-purple-600'
                  },
                  {
                    icon: TrendingUp,
                    title: 'Destaque-se',
                    desc: 'Aprimore seu perfil e seja encontrado por empresas',
                    color: 'bg-pink-100 text-pink-600'
                  },
                ].map((benefit) => (
                  <div key={benefit.title} className="flex gap-4 items-start">
                    <div className={`w-12 h-12 ${benefit.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                      <benefit.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{benefit.title}</h3>
                      <p className="text-gray-600 text-sm">{benefit.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Estatísticas */}
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-3xl font-bold text-blue-600 mb-1">1.5k+</div>
                    <div className="text-sm text-gray-600">Vagas ativas</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-purple-600 mb-1">850+</div>
                    <div className="text-sm text-gray-600">Empresas</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-pink-600 mb-1">12k+</div>
                    <div className="text-sm text-gray-600">Estudantes</div>
                  </div>
                </div>
              </div>

              {/* Depoimento */}
              <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl p-6 text-white">
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 fill-yellow-300" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
                <p className="text-white/90 mb-4 italic">
                  "Através da plataforma consegui 3 entrevistas na primeira semana!"
                </p>
                <div className="flex items-center gap-3">
                  <img
                    src="https://images.unsplash.com/photo-1766371900950-929959f2bb67?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB0ZWNobm9sb2d5JTIwY29tcGFueXxlbnwxfHx8fDE3NzIwNjYwNTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Carlos"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold">Carlos Mendes</div>
                    <div className="text-sm text-white/80">Estudante de Design</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Lado Direito - Formulário de Login */}
            <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-10">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Lock className="w-8 h-8 text-blue-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  Entrar na sua conta
                </h2>
                <p className="text-gray-600">
                  Acesse seu painel e encontre o estágio perfeito
                </p>
              </div>

              <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); onBackToHome?.(); }}>
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
                    Senha
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="password"
                      placeholder="Digite sua senha"
                      className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition"
                      required
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="remember"
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-600"
                    />
                    <label htmlFor="remember" className="text-sm text-gray-600">
                      Lembrar-me
                    </label>
                  </div>
                  <a href="#" className="text-sm text-blue-600 hover:underline">
                    Esqueceu a senha?
                  </a>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold flex items-center justify-center gap-2"
                >
                  Entrar
                  <ArrowRight className="w-5 h-5" />
                </button>
              </form>

              {/* Divisor */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">Ou continue com</span>
                </div>
              </div>

 

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  Não tem uma conta?{' '}
                  <a href="#" className="text-blue-600 font-semibold hover:underline">
                    Cadastre-se gratuitamente
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Simplificado */}
      <footer className="border-t bg-white/80 backdrop-blur-sm py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-600">
            <p>© 2026 EstágioConnect. Todos os direitos reservados.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-blue-600 transition">Termos de Uso</a>
              <a href="#" className="hover:text-blue-600 transition">Política de Privacidade</a>
              <a href="#" className="hover:text-blue-600 transition">Ajuda</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}