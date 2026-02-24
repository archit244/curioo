import './index.css';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import BodySections from './components/BodySections';
import CompoundSection from './components/CompoundSection';

import TestimonialsSection from './components/TestimonialsSection';
import CTASection from './components/CTASection';
import Footer from './components/Footer';

export default function App() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <BodySections />
      <TestimonialsSection />
      <CompoundSection />
      <CTASection />
      <Footer />
    </>
  );
}
