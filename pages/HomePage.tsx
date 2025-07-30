import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import ServicesSection from '../components/ServicesSection';
import ProcessSection from '../components/ProcessSection';
import SuccessStoriesSection from '../components/SuccessStoriesSection';
import TestimonialsSection from '../components/TestimonialsSection';
import LocationSection from '../components/LocationSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';

import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

function HomePage() {
  const location = useLocation();
  useEffect(() => {
    if (location.state && location.state.scrollTo) {
      const href = location.state.scrollTo;
      const targetId = href.startsWith('#') ? href.substring(1) : '';
      setTimeout(() => {
        const targetElement = targetId ? document.getElementById(targetId) : null;
        if (targetElement) {
          const headerElement = document.querySelector('header');
          const headerOffset = headerElement ? headerElement.offsetHeight : 70;
          const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
          const offsetPosition = elementPosition - headerOffset;
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 100); // Wait for DOM to render
    }
  }, [location]);
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <ProcessSection />
        <SuccessStoriesSection />
        <TestimonialsSection />
        <LocationSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}

export default HomePage;
