// App.tsx: componente raiz do aplicativo
// Gerencia a navegação de páginas internas e o estado de seleção de vagas.
import { useState } from 'react';
import { Header } from './components/Header';
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
import { jobs } from './bd/jobs';

export default function App() {
  // Estado de navegação do app: controla qual tela está visível
  const [currentPage, setCurrentPage] = useState<'home' | 'signup' | 'signin' | 'jobdetails' | 'application'>('home');
  // Armazena a vaga selecionada para detalhe/candidatura
  const [selectedJobId, setSelectedJobId] = useState<number>(jobs[0].id);

  // Funções de normalização e extração de busca para deixar a pesquisa mais inteligente
  // Comentário aplicado às modificações recentes e aos próximos ajustes.
  const normalizeText = (text: string) =>
    text
      .normalize('NFD')
      .replace(/\p{Diacritic}/gu, '')
      .replace(/\s+/g, ' ')
      .trim()
      .toLowerCase();

  // Prefixos genéricos que não devem retornar um resultado sozinho
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

  // Remove prefixos como "estágio em" para que a pesquisa foque no conteúdo real
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

  // Detecta se a consulta é apenas o prefixo genérico sem um termo adicional válido
  const isOnlyGenericPrefixQuery = (query: string) =>
    genericSearchPrefixes.some(
      (prefix) => query === prefix || query === `${prefix} ` || query.startsWith(prefix + ' '),
    );

  // Busca de vagas: aceita termos, tags e IDs, mas evita abrir vaga se o usuário digitar apenas o prefixo.
  const handleSearch = (query: string) => {
    const normalizedQuery = normalizeText(query);
    if (!normalizedQuery) {
      return;
    }

    // Remove prefixos genéricos antes de procurar a vaga
    const strippedQuery = stripGenericPrefix(normalizedQuery);

    // Se o usuário digitar apenas o prefixo, não busca e informa para ser mais específico
    if (isOnlyGenericPrefixQuery(normalizedQuery)) {
      window.alert('Digite um termo mais específico além de "estágio em" para buscar uma vaga.');
      return;
    }

    // Se não houver um termo útil após remover o prefixo, não há vaga correspondente
    if (!strippedQuery) {
      window.alert(`Nenhum estágio encontrado para: ${query}`);
      return;
    }

    // Permite busca por número de ID quando um número aparece na consulta
    const queryIdMatch = normalizedQuery.match(/\b(\d+)\b/);
    const foundJob = jobs.find((job) => {
      const title = normalizeText(job.title);
      const titleWithoutPrefix = stripGenericPrefix(title);
      const tagsMatch = job.tags.some((tag) => normalizeText(tag).includes(strippedQuery));
      const idMatch = queryIdMatch ? job.id === Number(queryIdMatch[1]) : false;

      return (
        idMatch ||
        title.includes(strippedQuery) ||
        titleWithoutPrefix.includes(strippedQuery) ||
        tagsMatch
      );
    });

    if (foundJob) {
      setSelectedJobId(foundJob.id);
      setCurrentPage('jobdetails');
      return;
    }

    window.alert(`Nenhum estágio encontrado para: ${query}`);
  };

  const handleJobClick = (jobId: number) => {
    setSelectedJobId(jobId);
    setCurrentPage('jobdetails');
  };

  // Navega para a página de candidatura quando o usuário clica no botão de aplicar
  const handleApplyNow = () => {
    setCurrentPage('application');
  };

  // Renderiza páginas de fluxo separadas antes da página inicial
  if (currentPage === 'signup') {
    return <SignUp onBackToHome={() => setCurrentPage('home')} />;
  }

  if (currentPage === 'signin') {
    return <SignIn onBackToHome={() => setCurrentPage('home')} />;
  }

  if (currentPage === 'jobdetails') {
    return (
      <JobDetails
        jobId={selectedJobId}
        onBackToHome={() => setCurrentPage('home')}
        onApplyNow={handleApplyNow}
      />
    );
  }

  if (currentPage === 'application') {
    return (
      <ApplicationProcess
        jobId={selectedJobId}
        onBackToJob={() => setCurrentPage('jobdetails')}
      />
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header onSignUp={() => setCurrentPage('signup')} onSignIn={() => setCurrentPage('signin')} />
      <HeroSection onSearch={handleSearch} />
      <Categories />
      <FeaturedJobs onJobClick={handleJobClick} />
      <HowItWorks />
      <Testimonials />
      <Newsletter />
      <Footer />
    </div>
  );
}
