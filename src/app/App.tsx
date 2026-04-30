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

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'signup'>('home');

  if (currentPage === 'signup') {
    return <SignUp onBackToHome={() => setCurrentPage('home')} />;
  }

  return (
    <div className="min-h-screen bg-white">
      <Header onSignUp={() => setCurrentPage('signup')} />
      <HeroSection />
      <Categories />
      <FeaturedJobs />
      <HowItWorks />
      <Testimonials />
      <Newsletter />
      <Footer />
    </div>
  );
}
