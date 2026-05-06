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

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'signup' | 'signin' | 'jobdetails'>('home');

  if (currentPage === 'signup') {
    return <SignUp onBackToHome={() => setCurrentPage('home')} />;
  }

  if (currentPage === 'signin') {
    return <SignIn onBackToHome={() => setCurrentPage('home')} />;
  }

  if (currentPage === 'jobdetails') {
    return <JobDetails onBackToHome={() => setCurrentPage('home')} />;
  }

  return (
    <div className="min-h-screen bg-white">
      <Header onSignUp={() => setCurrentPage('signup')} onSignIn={() => setCurrentPage('signin')} />
      <HeroSection />
      <Categories />
      <FeaturedJobs onJobClick={() => setCurrentPage('jobdetails')} />
      <HowItWorks />
      <Testimonials />
      <Newsletter />
      <Footer />
    </div>
  );
}
