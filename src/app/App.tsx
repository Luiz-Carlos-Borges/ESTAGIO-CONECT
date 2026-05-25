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
import { jobs } from './data/jobs';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'signup' | 'signin' | 'jobdetails' | 'application'>('home');
  const [selectedJobId, setSelectedJobId] = useState<number>(jobs[0].id);

  const handleSearch = (query: string) => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) {
      return;
    }

    const foundJob = jobs.find((job) =>
      job.title.toLowerCase().includes(normalizedQuery) ||
      job.tags.some((tag) => tag.toLowerCase().includes(normalizedQuery))
    );

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

  const handleApplyNow = () => {
    setCurrentPage('application');
  };

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
