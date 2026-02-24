import './index.css';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import BodySections from './components/BodySections';

import FourthPage from './components/FourthPage';
import QuestionsSection from './components/QuestionsSection';
import TestimonialsSection from './components/TestimonialsSection';
import CTASection from './components/CTASection';
import Footer from './components/Footer';

export default function App() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <BodySections />
      <FourthPage />
      <QuestionsSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </>
  );
}
