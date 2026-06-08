// App.tsx: componente raiz do aplicativo
// Gerencia a navegação de páginas internas e o estado de seleção de vagas.
import { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { WelcomeScreen } from './components/WelcomeScreen';
import { CompanyHeroSection } from './components/CompanyHeroSection';
import { CompanyDashboard } from './components/CompanyDashboard';
import { CreateJob } from './components/CreateJob';
import { HeroSection } from './components/HeroSection';
import { Categories } from './components/Categories';
import { FeaturedJobs } from './components/FeaturedJobs';
import { HowItWorks } from './components/HowItWorks';
import { Testimonials } from './components/Testimonials';
import { Newsletter } from './components/Newsletter';
import { Footer } from './components/Footer';
import { SignUp } from './components/SignUp';
import { SignIn } from './components/SignIn';
import { JobDetails } from './components/JobDetails';
import { ApplicationProcess } from './components/ApplicationProcess';
import { Job, AuthState } from './types';
import { apiCall } from '../config/api';

export default function App() {
  // Estado de navegação das páginas internas do aplicativo.
  const [currentPage, setCurrentPage] = useState<'welcome' | 'company' | 'company-dashboard' | 'createjob' | 'home' | 'signup' | 'signin' | 'jobdetails' | 'application'>('welcome');
  const [authView, setAuthView] = useState<'candidate' | 'company'>('candidate');
  // Lista de vagas carregadas pelo backend.
  const [jobs, setJobs] = useState<Job[]>([]);
  // Vaga atualmente selecionada para visualizar detalhes ou aplicar.
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  // Estado de autenticação do usuário logado.
  const [auth, setAuth] = useState<AuthState | null>(null);

  const normalizeText = (text: string) =>
    text
      .normalize('NFD')
      .replace(/\p{Diacritic}/gu, '')
      .replace(/\s+/g, ' ')
      .trim()
      .toLowerCase();

  const genericSearchPrefixes = [
    'estagio em',
    'estágio em',
    'estagio no',
    'estágio no',
    'estagio de',
    'estágio de',
    'vaga de',
    'vaga em',
  ];

  const stripGenericPrefix = (query: string) => {
    for (const prefix of genericSearchPrefixes) {
      if (query === prefix) {
        return '';
      }
      if (query.startsWith(prefix + ' ')) {
        return query.slice(prefix.length).trim();
      }
    }

    return query;
  };

  const isOnlyGenericPrefixQuery = (query: string) =>
    genericSearchPrefixes.some(
      (prefix) => query === prefix || query === `${prefix} ` || query.startsWith(prefix + ' '),
    );

  // Carrega as vagas iniciais e mantém o usuário logado se o token estiver presente.
  useEffect(() => {
    loadJobs();
    const token = localStorage.getItem('token');
    if (token) {
      apiCall('/api/auth/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(({ data, error }) => {
          if (error || !data?.user) {
            throw new Error('Token inválido');
          }
          setAuth({ token, user: data.user });
        })
        .catch(() => {
          localStorage.removeItem('token');
          setAuth(null);
        });
    }
  }, []);

  // Faz requisição ao backend para buscar as vagas, com pesquisa opcional.
  const loadJobs = async (searchQuery?: string) => {
    const queryString = searchQuery ? `?search=${encodeURIComponent(searchQuery)}` : '';
    const { data, error } = await apiCall(`/api/jobs${queryString}`);
    if (error || !Array.isArray(data)) {
      return;
    }
    const jobsData = data as Job[];
    setJobs(jobsData);
    if (!selectedJob && jobsData.length > 0) {
      setSelectedJob(jobsData[0]);
    }
  };

  // Processa o termo de busca, elimina prefixos genéricos e retorna resultados.
  const handleSearch = async (query: string) => {
    const normalizedQuery = normalizeText(query);
    if (!normalizedQuery) {
      return;
    }

    const strippedQuery = stripGenericPrefix(normalizedQuery);
    if (isOnlyGenericPrefixQuery(normalizedQuery)) {
      window.alert('Digite um termo mais específico além de "estágio em" para buscar uma vaga.');
      return;
    }

    if (!strippedQuery) {
      window.alert(`Nenhum estágio encontrado para: ${query}`);
      return;
    }

    const { data, error } = await apiCall(`/api/jobs?search=${encodeURIComponent(strippedQuery)}`);
    if (error || !Array.isArray(data)) {
      window.alert('Não foi possível buscar vagas no momento.');
      return;
    }

    const searchResults = data as Job[];
    if (searchResults.length === 0) {
      window.alert(`Nenhum estágio encontrado para: ${query}`);
      return;
    }

    setJobs(searchResults);
    setSelectedJob(searchResults[0]);
    setCurrentPage('jobdetails');
  };

  // Seleciona uma vaga para exibir os detalhes. Busca do backend se necessário.
  const handleJobClick = async (jobId: number) => {
    const job = jobs.find((item) => item.id === jobId);
    if (job) {
      setSelectedJob(job);
      setCurrentPage('jobdetails');
      return;
    }

    const { data, error } = await apiCall(`/api/jobs/${jobId}`);
    if (error || !data) {
      window.alert('Não foi possível carregar a vaga.');
      return;
    }

    setSelectedJob(data as Job);
    setCurrentPage('jobdetails');
  };

  const handleApplyNow = () => {
    setCurrentPage('application');
  };

  // Salva o token JWT e configura o estado de autenticação quando o login ou cadastro são bem-sucedidos.
  const handleAuthSuccess = (token: string, user: AuthState['user']) => {
    localStorage.setItem('token', token);
    setAuth({ token, user });
    // Redirecionar empresa para o dashboard, candidato para home
    if (user.role === 'company') {
      setCurrentPage('company-dashboard');
    } else {
      setCurrentPage('home');
    }
  };

  const goToSignIn = (role: 'candidate' | 'company') => {
    setAuthView(role);
    setCurrentPage('signin');
  };

  const goToSignUp = (role: 'candidate' | 'company') => {
    setAuthView(role);
    setCurrentPage('signup');
  };

  const handleSignOut = () => {
    localStorage.removeItem('token');
    setAuth(null);
    setCurrentPage('home');
  };

  const handleJobCreated = (job: Job) => {
    setJobs((previous) => [job, ...previous]);
    setSelectedJob(job);
    setCurrentPage('jobdetails');
  };

  if (currentPage === 'signup') {
    return (
      <SignUp
        initialRole={authView}
        onBackToHome={() => setCurrentPage('home')}
        onSignIn={() => goToSignIn(authView)}
        onAuthSuccess={handleAuthSuccess}
      />
    );
  }

  if (currentPage === 'signin') {
    return (
      <SignIn
        initialRole={authView}
        onBackToHome={() => setCurrentPage('home')}
        onSignUp={() => goToSignUp(authView)}
        onAuthSuccess={handleAuthSuccess}
      />
    );
  }

  if (currentPage === 'welcome') {
    return (
      <WelcomeScreen
        onStartAsStudent={() => goToSignIn('candidate')}
        onCreateStudentAccount={() => goToSignUp('candidate')}
        onStartAsCompany={() => goToSignIn('company')}
        onCreateCompanyAccount={() => goToSignUp('company')}
      />
    );
  }

  if (currentPage === 'company') {
    return (
      <CompanyHeroSection
        onBackToWelcome={() => setCurrentPage('welcome')}
        onStartCreateJob={() => setCurrentPage('createjob')}
      />
    );
  }

  if (currentPage === 'company-dashboard') {
    return auth?.user.role === 'company' && auth.user ? (
      <CompanyDashboard
        user={auth.user}
        onBackToHome={() => setCurrentPage('home')}
        onCreateJob={() => setCurrentPage('createjob')}
        onLogout={handleSignOut}
      />
    ) : (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Redirecionando...</p>
      </div>
    );
  }

  if (currentPage === 'createjob') {
    return (
      <CreateJob
        onBackToCompany={() => {
          // Se veio do dashboard, volta para o dashboard
          if (auth?.user.role === 'company') {
            setCurrentPage('company-dashboard');
          } else {
            setCurrentPage('company');
          }
        }}
        token={auth?.token}
        onCreated={handleJobCreated}
      />
    );
  }

  if (currentPage === 'jobdetails') {
    return (
      <JobDetails
        job={selectedJob}
        jobs={jobs}
        onBackToHome={() => setCurrentPage('home')}
        onApplyNow={handleApplyNow}
      />
    );
  }

  if (currentPage === 'application') {
    return (
      <ApplicationProcess
        job={selectedJob}
        jobs={jobs}
        onBackToJob={() => setCurrentPage('jobdetails')}
      />
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header
        onSignUp={() => setCurrentPage('signup')}
        onSignIn={() => setCurrentPage('signin')}
        userName={auth?.user.name}
        onSignOut={handleSignOut}
      />
      <HeroSection onSearch={handleSearch} />
      <Categories />
      <FeaturedJobs jobs={jobs} onJobClick={handleJobClick} />
      <HowItWorks />
      <Testimonials />
      <Newsletter />
      <Footer />
    </div>
  );
}
