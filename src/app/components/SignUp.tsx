import { Search, Mail, Lock, User, GraduationCap, Calendar, Phone, MapPin, ArrowRight, CheckCircle, Building } from 'lucide-react';
import { FormEvent, useState } from 'react';
import { apiCall } from '../../config/api';

// SignUp.tsx: fluxo de cadastro em duas etapas para criação de conta e informações acadêmicas
interface SignUpProps {
  initialRole?: 'candidate' | 'company';
  onBackToHome?: () => void;
  onSignIn?: () => void;
  onAuthSuccess?: (token: string, user: any) => void;
}

export function SignUp({ initialRole = 'candidate', onBackToHome, onSignIn, onAuthSuccess }: SignUpProps) {
  const [step, setStep] = useState(1);
  const [role, setRole] = useState<'candidate' | 'company'>(initialRole);
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [school, setSchool] = useState('');
  const [course, setCourse] = useState('');
  const [period, setPeriod] = useState('');
  const [graduationYear, setGraduationYear] = useState('');
  const [city, setCity] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [companyPhone, setCompanyPhone] = useState('');
  const [companyAbout, setCompanyAbout] = useState('');

  const handleRegister = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      window.alert('As senhas não coincidem.');
      return;
    }

    const nameToValidate = role === 'company' ? companyName : name;
    if (!nameToValidate || !email || !password) {
      window.alert(role === 'company' ? 'Preencha nome da empresa, email e senha.' : 'Preencha nome, email e senha.');
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await apiCall('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify({
          name: role === 'company' ? companyName : name,
          email,
          password,
          role,
          ...(role === 'company' && {
            companyName,
            companyPhone,
            companyAbout,
          }),
          ...(role === 'candidate' && {
            candidatePhone: phone,
            candidateCity: city,
            candidateCourse: course,
            candidatePeriod: period,
          }),
        }),
      });

      if (error) {
        window.alert(error);
        return;
      }

      onAuthSuccess?.(data.token, data.user);
    } catch (error) {
      window.alert('Erro inesperado ao cadastrar.');
    } finally {
      setLoading(false);
    }
  };

  const handleContinue = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!name || !email || !password || !confirmPassword) {
      window.alert('Preencha todos os campos obrigatórios.');
      return;
    }
    if (password !== confirmPassword) {
      window.alert('As senhas não coincidem.');
      return;
    }
    setStep(2);
  };

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
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onSignIn?.();
              }}
              className="text-gray-600 hover:text-blue-600 transition"
            >
              Já tem conta? <span className="font-semibold text-blue-600">Entrar</span>
            </a>
          </div>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Lado Esquerdo - Benefícios */}
            <div className="hidden lg:block space-y-8">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                  Comece sua jornada profissional hoje
                </h1>
                <p className="text-lg text-gray-600">
                  Junte-se a milhares de estudantes que já encontraram o estágio ideal
                </p>
              </div>

              <div className="space-y-4">
                {[
                  { icon: Search, title: 'Acesso a centenas de vagas', desc: 'Explore oportunidades exclusivas na sua área' },
                  { icon: CheckCircle, title: 'Processo simplificado', desc: 'Candidate-se com apenas alguns cliques' },
                  { icon: GraduationCap, title: 'Dicas de carreira', desc: 'Receba orientações para se destacar' },
                ].map((benefit) => (
                  <div key={benefit.title} className="flex gap-4 items-start">
                    <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <benefit.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{benefit.title}</h3>
                      <p className="text-gray-600 text-sm">{benefit.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src="https://images.unsplash.com/photo-1739298061740-5ed03045b280?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvZmZpY2UlMjB0ZWFtd29yayUyMGNvbGxhYm9yYXRpb258ZW58MXx8fHwxNzcyMDI2NDE5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Estudante"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">Ana Silva</div>
                    <div className="text-sm text-gray-600">Estudante de Computação</div>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "Consegui meu primeiro estágio em apenas 1 semana. Super recomendo!"
                </p>
              </div>
            </div>

            {/* Lado Direito - Formulário */}
            <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-10">
              {/* Seletor de papel */}
              <div className="flex items-center justify-center gap-3 mb-6">
                <button
                  onClick={() => { setRole('candidate'); setStep(1); }}
                  className={`px-4 py-2 rounded-full font-semibold transition ${role === 'candidate' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
                >
                  Candidato
                </button>
                <button
                  onClick={() => { setRole('company'); setStep(1); }}
                  className={`px-4 py-2 rounded-full font-semibold transition ${role === 'company' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
                >
                  Empresa
                </button>
              </div>

              {/* Etapas de progresso */}
              <div className="flex items-center justify-center gap-2 mb-8">
                {[1, 2].map((num) => (
                  <div key={num} className="flex items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition ${
                      step >= num ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
                    }`}>
                      {num}
                    </div>
                    {num < 2 && (
                      <div className={`w-12 h-1 mx-2 transition ${
                        step > num ? 'bg-blue-600' : 'bg-gray-200'
                      }`} />
                    )}
                  </div>
                ))}
              </div>

              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  {role === 'candidate' ? (step === 1 ? 'Crie sua conta' : 'Informações acadêmicas') : 'Crie a conta da sua empresa'}
                </h2>
                <p className="text-gray-600">
                  {role === 'candidate' ? (step === 1 ? 'Preencha seus dados pessoais' : 'Complete seu perfil de estudante') : 'Cadastre sua empresa para publicar vagas'}
                </p>
              </div>

              {role === 'candidate' ? (
                step === 1 ? (
                <form className="space-y-4" onSubmit={handleContinue}>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nome completo
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        placeholder="João da Silva"
                        className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
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
                        value={phone}
                        onChange={(event) => setPhone(event.target.value)}
                        placeholder="(11) 99999-9999"
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
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        placeholder="Mínimo 8 caracteres"
                        className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Confirmar senha
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="password"
                        value={confirmPassword}
                        onChange={(event) => setConfirmPassword(event.target.value)}
                        placeholder="Digite a senha novamente"
                        className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition"
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    Continuar
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </form>
                ) : (
                <form className="space-y-4" onSubmit={handleRegister}>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Instituição de ensino
                    </label>
                    <div className="relative">
                      <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        value={school}
                        onChange={(event) => setSchool(event.target.value)}
                        placeholder="Nome da universidade"
                        className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="course" className="block text-sm font-medium text-gray-700 mb-2">
                      Curso
                    </label>
                    <div className="relative">
                      <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <select
                        id="course"
                        value={course}
                        onChange={(event) => setCourse(event.target.value)}
                        className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition appearance-none bg-white"
                      >
                        <option value="">Selecione seu curso</option>
                        <option>Ciência da Computação</option>
                        <option>Engenharia</option>
                        <option>Administração</option>
                        <option>Design</option>
                        <option>Marketing</option>
                        <option>Recursos Humanos</option>
                        <option>Direito</option>
                        <option>Outro</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="period" className="block text-sm font-medium text-gray-700 mb-2">
                      Período/Semestre
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <select
                        id="period"
                        value={period}
                        onChange={(event) => setPeriod(event.target.value)}
                        className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition appearance-none bg-white"
                      >
                        <option value="">Selecione o período</option>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                          <option key={num}>{num}º Período</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="graduationYear" className="block text-sm font-medium text-gray-700 mb-2">
                      Previsão de formatura
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <select
                        id="graduationYear"
                        value={graduationYear}
                        onChange={(event) => setGraduationYear(event.target.value)}
                        className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition appearance-none bg-white"
                      >
                        <option value="">Ano de formatura</option>
                        <option>2025</option>
                        <option>2026</option>
                        <option>2027</option>
                        <option>2028</option>
                        <option>2029</option>
                        <option>2030</option>
                      </select>
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
                        value={city}
                        onChange={(event) => setCity(event.target.value)}
                        placeholder="Sua cidade"
                        className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex items-start gap-3 pt-2">
                    <input
                      type="checkbox"
                      id="terms"
                      className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-600"
                      required
                    />
                    <label htmlFor="terms" className="text-sm text-gray-600">
                      Concordo com os <a href="#" className="text-blue-600 hover:underline">Termos de Uso</a> e a <a href="#" className="text-blue-600 hover:underline">Política de Privacidade</a>
                    </label>
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-semibold"
                    >
                      Voltar
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex-1 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold disabled:opacity-50"
                    >
                      Criar conta
                    </button>
                  </div>
                </form>
                )
              ) : (
                // Formulário de cadastro da empresa (etapa única)
                <form className="space-y-4" onSubmit={handleRegister}>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nome da empresa</label>
                    <div className="relative">
                      <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        value={companyName}
                        onChange={(event) => setCompanyName(event.target.value)}
                        placeholder="Nome da empresa"
                        className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder="contato@empresa.com"
                        className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Telefone</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="tel"
                        value={companyPhone}
                        onChange={(event) => setCompanyPhone(event.target.value)}
                        placeholder="(11) 99999-9999"
                        className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Sobre a empresa</label>
                    <textarea
                      value={companyAbout}
                      onChange={(event) => setCompanyAbout(event.target.value)}
                      placeholder="Descreva sua empresa em poucas linhas"
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition resize-none"
                      rows={3}
                    />
                  </div>

        
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Senha</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        placeholder="Mínimo 8 caracteres"
                        className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Confirmar senha</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="password"
                        value={confirmPassword}
                        onChange={(event) => setConfirmPassword(event.target.value)}
                        placeholder="Digite a senha novamente"
                        className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex items-start gap-3 pt-2">
                    <input type="checkbox" id="terms_company" className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-600" required />
                    <label htmlFor="terms_company" className="text-sm text-gray-600">Concordo com os <a href="#" className="text-blue-600 hover:underline">Termos de Uso</a> e a <a href="#" className="text-blue-600 hover:underline">Política de Privacidade</a></label>
                  </div>

                  <button type="submit" disabled={loading} className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold disabled:opacity-50">Criar conta da empresa</button>
                </form>
              )}

              <div className="mt-6 text-center text-sm text-gray-600">
                Ao criar uma conta, você aceita nossos{' '}
                <a href="#" className="text-blue-600 hover:underline">Termos</a> e{' '}
                <a href="#" className="text-blue-600 hover:underline">Política de Privacidade</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}