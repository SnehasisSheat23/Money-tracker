// ============= Imports =============
// Core imports
import { useState, useRef, useEffect } from 'react';
import { Menu } from 'lucide-react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './styles/global.css';
import { LoadingAnimation } from './components/ui/LoadingAnimation';
import { motion, AnimatePresence } from 'framer-motion';

// Page imports
import { TransactionsPage } from './pages/TransactionsPage';
import { TransactionPage } from './Transactions/pages/FullTransactionPage';
import { LandingPage } from './pages/Landing/LandingPage';
import { PhoneAuth } from './pages/Landing/PhonAuth';
import { OTPVerification } from './pages/Landing/OTPVerification';

// Component imports
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Card } from './components/Card';
import { TransactionList } from './components/TransactionList';
import { WeeklyActivity } from './components/WeeklyActivity';
import { ExpenseStats } from './components/ExpenseStats';
import { BalanceHistory } from './components/BalanceHistory';
import { AddCard } from './components/AddCard';
import { BankAccountModal } from './components/BankAccountModal';
import { BalanceCard } from './components/BalanceCard';
import { ScrollButton } from './components/ScrollButton';

// Data imports
import { mockCategories } from './Transactions/data/mockCategories';

// ============= Types =============
interface BalanceCardData {
  type: 'balance';
  amount: string;
  title: string;
  variant: 'green' | 'blue' | 'red';
}


interface BankCardData {
  type: 'bank';
  bankName: string;
  accountType: 'savings' | 'checking' | 'credit';
  balance: string;
  variant: 'pastel-blue' | 'pastel-green' | 'pastel-purple';
}

type CardData = BalanceCardData | BankCardData;

// ============= Component =============
function App() {
  // ===== State Hooks =====
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedBank, setSelectedBank] = useState<BankCardData | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  const [balanceCards] = useState<BalanceCardData[]>([
    {
      type: 'balance',
      amount: "5,756",
      title: "Available Balance",
      variant: "green"
    },
    {
      type: 'balance',
      amount: "3,450",
      title: "Total Expenses",
      variant: "red"
    },
    {
      type: 'balance',
      amount: "890",
      title: "Total Income",
      variant: "blue"
    }
  ]);

  const [bankCards, setBankCards] = useState<BankCardData[]>([
    {
      type: 'bank',
      bankName: "Primary Account",
      balance: "5,756",
      variant: "pastel-blue",
      accountType: 'savings'
    }
  ]);

  // Add new state to track scroll possibility
  const [canScroll, setCanScroll] = useState(false);

  // Add loading state
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  // Add scroll check effect
  useEffect(() => {
    const checkScroll = () => {
      if (scrollContainerRef.current) {
        const { scrollWidth, clientWidth } = scrollContainerRef.current;
        setCanScroll(scrollWidth > clientWidth);
      }
    };

    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, [bankCards]);

  // ===== Event Handlers =====
  const handleAddBankCard = () => {
    setSelectedBank({
      type: 'bank',
      bankName: '',
      balance: '0',
      accountType: 'savings',
      variant: "pastel-" + ['blue', 'green', 'purple'][bankCards.length % 3] as BankCardData['variant']
    });
  };

  const handleSaveBank = (data: any) => {
    const updatedCard: BankCardData = {
      type: 'bank',
      bankName: data.bankName,
      accountType: data.accountType,
      balance: data.balance,
      variant: selectedBank?.variant || 
        ("pastel-" + ['blue', 'green', 'purple'][bankCards.length % 3] as BankCardData['variant'])
    };

    if (selectedBank?.bankName) {
      setBankCards(cards => cards.map(card =>
        card === selectedBank ? updatedCard : card
      ));
    } else {
      setBankCards(prev => [...prev, updatedCard]);
    }
    setSelectedBank(null);
  };

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -200 : 200;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Add before the main render
  if (isLoading) {
    return <LoadingAnimation />;
  }

  // ===== Render =====
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
            <Route path="/dashboard" element={
              <div className="flex h-screen bg-gray-50">
                {/* Sidebar with overlay */}
                <div 
                  className={`fixed inset-0 bg-black bg-opacity-50 z-20 transition-opacity md:hidden ${
                    sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                  }`}
                  onClick={() => setSidebarOpen(false)}
                />
                <div className={`fixed md:relative md:block z-30 transition-transform duration-300 ease-in-out ${
                  sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
                }`}>
                  <Sidebar onClose={() => setSidebarOpen(false)} />
                </div>
                
                {/* Main Layout */}
                <div className="flex-1 flex flex-col h-screen w-full overflow-hidden">
                  {/* Fixed Header */}
                  <div className="fixed top-0 left-0 right-0 md:relative z-50 bg-white border-b border-gray-200 shadow-sm">
                    <div className="safe-area-top" />
                    <Header>
                      <button 
                        className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                      >
                        <Menu className="w-6 h-6" />
                      </button>
                    </Header>
                  </div>
                  
                  {/* Main Content with adjusted padding */}
                  <main className="flex-1 overflow-y-auto scroll-smooth overscroll-y-contain pt-[calc(60px+env(safe-area-inset-top,0px))] md:pt-0">
                    <Routes>
                      <Route path="/" element={
                        <div className="p-3 md:p-6 lg:p-8 mt-4 md:mt-0">
                          <div className="max-w-7xl mx-auto">
                            <div className="grid grid-cols-1 xl:grid-cols-3 gap-3 md:gap-6">
                              {/* Left Section */}
                              <div className="xl:col-span-2 space-y-3 md:space-y-6">
                                {/* Cards Section */}
                                <div className="bg-transparent rounded-2xl">
                                  {/* Balance Cards */}
                                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 mb-4 md:mb-6">
                                    {balanceCards.map((card, index) => (
                                      <BalanceCard 
                                        key={`balance-${index}`}
                                        amount={card.amount}
                                        title={card.title}
                                        variant={card.variant}
                                      />
                                    ))}
                                  </div>

                                  {/* Bank Account Cards - Updated with scroll buttons */}
                                  <div className="mb-3 md:mb-4 ">
                                    <div className="flex items-center justify-between mb-3 md:mb-4">
                                      <h2 className="text-base md:text-lg font-semibold text-gray-800 pl-3">
                                        Bank Accounts
                                      </h2>
                                      <select className="text-xs md:text-sm border border-gray-200 rounded-lg px-2 py-1 md:px-3 md:py-1.5 bg-white">
                                        <option>All Accounts</option>
                                        <option>Savings</option>
                                        <option>Checking</option>
                                        <option>Credit Cards</option>
                                      </select>
                                    </div>
                                    {/* Scroll container with buttons */}
                                    <div className="relative">
                                      <div 
                                        ref={scrollContainerRef}
                                        className="overflow-x-auto scrollbar-hide scroll-smooth overscroll-x-contain touch-pan-x"
                                        style={{
                                          WebkitOverflowScrolling: 'touch',
                                          scrollSnapType: 'x mandatory',
                                          padding: '0.5rem', // Consistent padding
                                          margin: '-0.5rem', // Offset padding to maintain alignment
                                        }}
                                      >
                                        <div className="flex gap-3 md:gap-4">
                                          {bankCards.map((card, index) => (
                                            <div 
                                              key={`bank-${index}`} 
                                              className="flex-none w-[160px] sm:w-[200px] md:w-[300px] scroll-snap-align-start"
                                              style={{ padding: '0.5rem' }} // Add padding to prevent hover cut-off
                                            >
                                              <Card 
                                                {...card} 
                                                onClick={() => setSelectedBank(card)} 
                                              />
                                            </div>
                                          ))}
                                          <div className="flex-none w-[160px] sm:w-[200px] md:w-[300px]" style={{ padding: '0.5rem' }}>
                                            <AddCard onClick={handleAddBankCard} />
                                          </div>
                                        </div>
                                      </div>
                                      {/* Only show scroll buttons when content overflows */}
                                      {canScroll && (
                                        <>
                                          <ScrollButton 
                                            direction="left" 
                                            onClick={() => handleScroll('left')} 
                                          />
                                          <ScrollButton 
                                            direction="right" 
                                            onClick={() => handleScroll('right')} 
                                          />
                                        </>
                                      )}
                                    </div>
                                  </div>
                                </div>
                                
                                {/* Charts Section */}
                                <div className="grid grid-cols-1 lg:grid-cols-8 gap-3 md:gap-6 overflow-hidden">
                                  <div className="lg:col-span-4">
                                    <WeeklyActivity />
                                  </div>
                                  <div className="lg:col-span-4">
                                    <ExpenseStats />
                                  </div>
                                </div>
                              </div>
                              
                              {/* Right Section */}
                              <div className="space-y-3 md:space-y-6">
                                <TransactionList />
                                <BalanceHistory />
                              </div>
                            </div>
                          </div>
                        </div>
                      } />
                      <Route path="/transactions" element={<TransactionsPage />} />
                      <Route 
                        path="/transactions/category/:categoryId" 
                        element={<TransactionPage categories={mockCategories} />} 
                      />
                    </Routes>
                  </main>
                </div>
              </div>
            } />
            <Route path="/transactions" element={<TransactionsPage />} />
            <Route 
              path="/transactions/category/:categoryId" 
              element={<TransactionPage categories={mockCategories} />} 
            />
          </Routes>
          <BankAccountModal
            isOpen={selectedBank !== null}
            onClose={() => setSelectedBank(null)}
            onSave={handleSaveBank}
            initialData={selectedBank || undefined}
          />
        </BrowserRouter>
      </motion.div>
    </AnimatePresence>
  );
}
export default App;