import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from '../presentation/pages/HomePage';
import { ServicesPage } from '../presentation/pages/ServicesPage';
import { PricingPage } from '../presentation/pages/PricingPage';
import { HowItWorksPage } from '../presentation/pages/HowItWorksPage';
import { DocumentsPage } from '../presentation/pages/DocumentsPage';
import { FAQPage } from '../presentation/pages/FAQPage';
import { AboutUsPage } from '../presentation/pages/AboutUsPage';
import { ContactPage } from '../presentation/pages/ContactPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/how-it-works" element={<HowItWorksPage />} />
        <Route path="/documents" element={<DocumentsPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/about" element={<AboutUsPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </Router>
  );
}

export default App;
