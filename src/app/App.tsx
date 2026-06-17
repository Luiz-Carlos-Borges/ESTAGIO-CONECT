// App.tsx: componente raiz do aplicativo
// Gerencia a navegação de páginas internas e o estado de seleção de vagas.
import { useEffect, useRef, useState } from 'react';
import { Header } from './components/Header';
import { WelcomeScreen } from './components/WelcomeScreen';
import { CompanyHeroSection } from './components/CompanyHeroSection';
import { CompanyDashboard } from './components/CompanyDashboard';
import { CreateJob } from './components/CreateJob';
import { HeroSection } from './components/HeroSection';
import { FeaturedJobs } from './components/FeaturedJobs';
import { HowItWorks } from './components/HowItWorks';
import { Testimonials } from './components/Testimonials';
import { Footer } from './components/Footer';
import { SignUp } from './components/SignUp';
import { SignIn } from './components/SignIn';
import { JobDetails } from './components/JobDetails';
import { ApplicationProcess } from './components/ApplicationProcess';
import { Job, AuthState } from './types';
import { apiCall } from '../config/api';

type Page = 'welcome' | 'company' | 'company-dashboard' | 'createjob' | 'home' | 'signup' | 'signin' | 'jobdetails' | 'application';

export default function App() {
  const getInitialPage = (): Page => {
    const validPages = new Set<Page>(['welcome', 'company', 'company-dashboard', 'createjob', 'home', 'signup', 'signin', 'jobdetails', 'application']);
    const hasToken = typeof window !== 'undefined' && Boolean(localStorage.getItem('token'));
    if (!hasToken) {
      return 'welcome';
    }

    const historyState = typeof window !== 'undefined' ? (window.history.state as { page?: Page } | null) : null;
    if (historyState?.page && validPages.has(historyState.page)) {
      return historyState.page;
    }

    const savedPage = typeof window !== 'undefined' ? localStorage.getItem('ESTAGIO_CONNECT_currentPage') : null;
    return savedPage && validPages.has(savedPage as Page) ? (savedPage as Page) : 'welcome';
  };

  const getInitialAuthView = (): 'candidate' | 'company' => {
    if (typeof window !== 'undefined') {
      const historyState = window.history.state as { authView?: 'candidate' | 'company' } | null;
      if (historyState?.authView) {
        return historyState.authView;
      }
    }

    const savedView = typeof window !== 'undefined' ? localStorage.getItem('ESTAGIO_CONNECT_authView') : null;
    return savedView === 'company' ? 'company' : 'candidate';
  };

  const getInitialSelectedJobId = () => {
    const savedJobId = localStorage.getItem('ESTAGIO_CONNECT_selectedJobId');
    const parsedId = savedJobId ? Number(savedJobId) : NaN;
    return Number.isInteger(parsedId) ? parsedId : null;
  };

  // Estado de navegação das páginas internas do aplicativo.
  const [currentPage, setCurrentPage] = useState<'welcome' | 'company' | 'company-dashboard' | 'createjob' | 'home' | 'signup' | 'signin' | 'jobdetails' | 'application'>(getInitialPage);
  const [authView, setAuthView] = useState<'candidate' | 'company'>(getInitialAuthView);
  const [selectedJobId, setSelectedJobId] = useState<number | null>(getInitialSelectedJobId);
  const pendingPageRef = useRef<Page | null>(null);
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
          if (currentPage === 'welcome' || currentPage === 'signup' || currentPage === 'signin') {
            setCurrentPage(data.user.role === 'company' ? 'company-dashboard' : 'home');
          }
        })
        .catch(() => {
          localStorage.removeItem('token');
          setAuth(null);
        });
    }
  }, []);

  useEffect(() => {
    const state = { page: currentPage, authView, selectedJobId };
    if (window.history.state?.page !== currentPage || window.history.state?.authView !== authView || window.history.state?.selectedJobId !== selectedJobId) {
      window.history.pushState(state, '', window.location.pathname);
    }

    localStorage.setItem('ESTAGIO_CONNECT_currentPage', currentPage);
    localStorage.setItem('ESTAGIO_CONNECT_authView', authView);
    if (selectedJobId !== null) {
      localStorage.setItem('ESTAGIO_CONNECT_selectedJobId', String(selectedJobId));
    } else {
      localStorage.removeItem('ESTAGIO_CONNECT_selectedJobId');
    }
  }, [currentPage, authView, selectedJobId]);

  useEffect(() => {
    const onPopState = (event: PopStateEvent) => {
      const state = event.state as { page?: Page; authView?: 'candidate' | 'company'; selectedJobId?: number } | null;
      if (state?.page) {
        pendingPageRef.current = state.page;
        setCurrentPage(state.page);
      }
      if (state?.authView) {
        setAuthView(state.authView);
      }
      if (typeof state?.selectedJobId === 'number') {
        setSelectedJobId(state.selectedJobId);
      }
    };

    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  // Scroll to footer on initial app load if present
  useEffect(() => {
    // Wait a tick to ensure DOM mounted
    setTimeout(() => {
      const footer = document.getElementById('site-footer');
      if (footer) {
        footer.scrollIntoView({ behavior: 'auto' });
      }
    }, 50);
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
    if (selectedJobId) {
      const savedJob = jobsData.find((job) => job.id === selectedJobId);
      if (savedJob) {
        setSelectedJob(savedJob);
        return;
      }
    }

    if (!selectedJob && jobsData.length > 0) {
      setSelectedJob(jobsData[0]);
      setSelectedJobId(jobsData[0].id);
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
    setSelectedJobId(searchResults[0].id);
    setCurrentPage('jobdetails');
  };

  // Seleciona uma vaga para exibir os detalhes. Busca do backend se necessário.
  const handleJobClick = async (jobId: number) => {
    const job = jobs.find((item) => item.id === jobId);
    if (job) {
      setSelectedJob(job);
      setSelectedJobId(job.id);
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
    const signOutRole = auth?.user.role === 'company' ? 'company' : 'candidate';
    localStorage.removeItem('token');
    setAuth(null);
    setAuthView(signOutRole);
    setSelectedJobId(null);
    setCurrentPage('signin');
  };

  const handleJobCreated = (job: Job) => {
    setJobs((previous) => [job, ...previous]);
    setSelectedJob(job);

    // Empresa/admin volta para o painel; candidato vê os detalhes da vaga
    if (auth?.user.role === 'company' || auth?.user.role === 'admin') {
      setCurrentPage('company-dashboard');
    } else {
      setCurrentPage('jobdetails');
    }
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
        onBackToCompany={() => setCurrentPage('company-dashboard')}
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
      <FeaturedJobs jobs={jobs} onJobClick={handleJobClick} />
      <HowItWorks />
      <Testimonials />
      <Footer />
    </div>
  );
}
