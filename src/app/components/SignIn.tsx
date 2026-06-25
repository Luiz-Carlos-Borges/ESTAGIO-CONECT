import { Search, Mail, Lock, ArrowRight, Briefcase, TrendingUp } from 'lucide-react';
import { useState } from 'react';
import { User } from '../types';
import { apiCall } from '../../config/api';
import { PolicyModal, PolicyType } from './PolicyModal';

interface SignInProps {
  initialRole?: 'candidate' | 'company';
  onBackToHome?: () => void;
  onSignUp?: () => void;
  onAuthSuccess?: (token: string, user: User) => void;
}

export function SignIn({ initialRole = 'candidate', onBackToHome, onSignUp, onAuthSuccess }: SignInProps) {
  const [role, setRole] = useState<'candidate' | 'company'>(initialRole);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [policyModal, setPolicyModal] = useState<PolicyType | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    try {
      const { data, error } = await apiCall('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password, role }),
      });
      if (error) { window.alert(error); return; }
      const user = data.user;
      if (user.role === 'admin') { onAuthSuccess?.(data.token, { ...user, role }); return; }
      if (user.role !== role) {
        window.alert(role === 'company' ? 'Esta conta não é de empresa. Use o acesso de Candidato.' : 'Esta conta é de candidato. Use o acesso de Empresa.');
        return;
      }
      onAuthSuccess?.(data.token, user);
    } catch { window.alert('Erro inesperado ao fazer login.'); }
    finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Search className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">EstágioConnect</span>
            </div>
            <a href="#" onClick={(e) => { e.preventDefault(); onSignUp?.(); }} className="text-gray-600 hover:text-blue-600 transition">
              Não tem conta? <span className="font-semibold text-blue-600">Cadastre-se</span>
            </a>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Lado Esquerdo */}
            <div className="hidden lg:block space-y-8">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-4">Bem-vindo(a)!</h1>
                <p className="text-lg text-gray-600">Continue sua busca pelo estágio ideal e impulsione sua carreira</p>
              </div>
              <div className="space-y-4">
                {[
                  { icon: Briefcase, title: 'Suas candidaturas', desc: 'Acompanhe o status de todas as vagas que você aplicou', color: 'bg-blue-100 text-blue-600' },
                  { icon: Search, title: 'Vagas personalizadas', desc: 'Receba sugestões baseadas no seu perfil e interesses', color: 'bg-purple-100 text-purple-600' },
                  { icon: TrendingUp, title: 'Destaque-se', desc: 'Aprimore seu perfil e seja encontrado por empresas', color: 'bg-pink-100 text-pink-600' },
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
            </div>

            {/* Formulário */}
            <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-10">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Lock className="w-8 h-8 text-blue-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  {role === 'candidate' ? 'Entrar na sua conta' : 'Acessar painel da empresa'}
                </h2>
                <p className="text-gray-600">
                  {role === 'candidate' ? 'Acesse seu painel e encontre o estágio perfeito' : 'Acesse o painel para publicar e gerenciar vagas'}
                </p>
              </div>

              <div className="flex items-center justify-center gap-3 mb-6">
                <button onClick={() => setRole('candidate')} className={`px-4 py-2 rounded-full font-semibold transition ${role === 'candidate' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}>Candidato</button>
                <button onClick={() => setRole('company')} className={`px-4 py-2 rounded-full font-semibold transition ${role === 'company' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}>Empresa</button>
              </div>

              <form className="space-y-5" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{role === 'candidate' ? 'Email' : 'Email da empresa'}</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="seu@email.com"
                      className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition" required />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Senha</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Digite sua senha"
                      className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition" required />
                  </div>
                </div>
                <div className="flex justify-end">
                  <a href="#" className="text-sm text-blue-600 hover:underline">Esqueceu a senha?</a>
                </div>
                <button type="submit" disabled={loading} className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold flex items-center justify-center gap-2 disabled:opacity-50">
                  {loading ? 'Entrando...' : 'Entrar'}
                  <ArrowRight className="w-5 h-5" />
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  Não tem uma conta?{' '}
                  <button type="button" onClick={() => onSignUp?.()} className="text-blue-600 font-semibold hover:underline">Cadastre-se gratuitamente</button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="border-t bg-white/80 backdrop-blur-sm py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-600">
            <p>© 2026 EstágioConnect. Todos os direitos reservados.</p>
            <div className="flex gap-6">
              <a href="#" onClick={(e) => { e.preventDefault(); setPolicyModal('termos'); }} className="hover:text-blue-600 transition">Termos de Uso</a>
              <a href="#" onClick={(e) => { e.preventDefault(); setPolicyModal('privacidade'); }} className="hover:text-blue-600 transition">Política de Privacidade</a>
              <a href="#" onClick={(e) => { e.preventDefault(); setPolicyModal('ajuda'); }} className="hover:text-blue-600 transition">Ajuda</a>
            </div>
          </div>
        </div>
      </footer>
      {policyModal && <PolicyModal type={policyModal} onClose={() => setPolicyModal(null)} />}
    </div>
  );
}
