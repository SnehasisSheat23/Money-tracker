import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './styles/global.css';

// Components
import { LoadingAnimation } from './components/ui/LoadingAnimation';
import { Dashboard } from './pages/dashboard';
import { TransactionsPage } from './pages/TransactionsPage';
import { TransactionPage } from './Transactions/pages/FullTransactionPage';
import { LandingPage } from './pages/Landing/LandingPage';
import { PhoneAuth } from './pages/Landing/PhonAuth';
import { OTPVerification } from './pages/Landing/OTPVerification';

// Data
import { mockCategories } from './data/mockCategories';

/**
 * App Component
 * Root component handling routing and initial loading state
 */
function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingAnimation />;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/auth/phone" element={<PhoneAuth />} />
            <Route path="/auth/otp" element={<OTPVerification />} />
            <Route path="/dashboard/*" element={<Dashboard />} />
            <Route path="/transactions" element={<TransactionsPage />} />
            <Route 
              path="/transactions/category/:categoryId" 
              element={<TransactionPage categories={mockCategories} />} 
            />
          </Routes>
        </BrowserRouter>
      </motion.div>
    </AnimatePresence>
  );
}

export default App;