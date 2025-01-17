import { useState, useRef, useEffect } from 'react';
import { CreditCard, Menu } from 'lucide-react';
import { Routes, Route } from 'react-router-dom';

// Component imports
import { Sidebar } from '../components/Sidebar';
import { Header } from '../components/Header';
import { Card } from '../components/bankaccount/Card';
import { TransactionList } from '../components/TransactionList/TransactionList';
import { WeeklyActivity } from '../components/WeeklyActivity';
import { ExpenseStats } from '../components/ExpenseStats';
import { BalanceHistory } from '../components/BalanceHistory';
import { AddCard } from '../components/bankaccount/AddCard';
import { BankAccountModal } from '../components/bankaccount/BankAccountModal';
import { BalanceCard } from '../components/BalanceCard';
import { ScrollButton } from '../components/ScrollButton';
import { TransactionsPage } from './TransactionsPage';
import { TransactionPage } from '../Transactions/pages/FullTransactionPage';
import { mockCategories } from '../data/mockCategories';
import { MobileNav } from '../components/MobileNav';

/**
 * Types for managing financial data cards
 * @interface BalanceCardData - Structure for balance information cards 
 * @interface BankCardData - Structure for bank account cards
 */
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

/**
 * Dashboard Component
 * 
 * Main dashboard view for the financial management application.
 * Features:
 * - Balance overview cards
 * - Bank account management
 * - Transaction history
 * - Financial analytics charts
 * 
 * @component
 */
export function Dashboard() {
  // State management for sidebar
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Bank account management
  const [selectedBank, setSelectedBank] = useState<BankCardData | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  // Balance cards data
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

  // Bank cards data
  const [bankCards, setBankCards] = useState<BankCardData[]>([
    {
      type: 'bank',
      bankName: "Primary Account",
      balance: "5,756",
      variant: "pastel-blue",
      accountType: 'savings'
    }
  ]);

  // Scroll state management
  const [canScroll, setCanScroll] = useState(false);

  // Scroll detection effect
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

  /**
   * Handles the addition of a new bank card
   * Initializes a new bank card with default values
   */
  const handleAddBankCard = () => {
    setSelectedBank({
      type: 'bank',
      bankName: '',
      balance: '0',
      accountType: 'savings',
      variant: "pastel-" + ['blue', 'green', 'purple'][bankCards.length % 3] as BankCardData['variant']
    });
  };

  /**
   * Saves or updates bank card information
   * @param data - Bank card form data
   */
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

  /**
   * Handles horizontal scrolling for bank cards
   * @param direction - Scroll direction ('left' | 'right')
   */
  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -200 : 200;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="flex h-[100dvh] bg-[#f5f5f7] overflow-hidden">
      {/* Sidebar with overlay */}
      <div 
        className={`fixed inset-0 bg-black/20 backdrop-blur-sm z-20 transition-opacity md:hidden ${
          sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setSidebarOpen(false)}
      />
      
      {/* Sidebar */}
      <div className={`fixed md:relative md:block z-50 transition-transform duration-300 ease-in-out ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      }`}>
        <Sidebar onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Main Content Wrapper */}
      <div className="flex-1 flex flex-col w-full relative">
        {/* Fixed Header */}
        <div 
          className="fixed inset-x-0 top-0 z-40 bg-white/70 backdrop-blur-xl border-b border-gray-200/50"
          style={{ 
            paddingTop: 'max(env(safe-area-inset-top), 8px)',
            height: 'calc(max(env(safe-area-inset-top), 8px) + 48px)',
            boxShadow: '0 1px 3px 0 rgba(0,0,0,0.05)'
          }}
        >
          <div className="h-12">
            <Header>
              <div className="md:hidden flex items-center">
                <CreditCard className="w-6 h-6 text-[#0b84ff]-600" />
                <span className="ml-2 font-bold text-[#0b84ff]">Moneytrack.</span>
              </div>
              <button 
                className="hidden md:block p-2 rounded-lg hover:bg-gray-100 transition-colors"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                <Menu className="w-6 h-6" />
              </button>
            </Header>
          </div>
        </div>

        {/* Scrollable Content Area */}
        <main 
          className="flex-1 overflow-y-auto overscroll-y-contain md:pb-0 bg-gradient-to-b from-slate-50/80 to-white/90"
          style={{
            paddingTop: 'calc(max(env(safe-area-inset-top), 26px) + 48px)',
            minHeight: '100%',
            height: '100dvh',
            WebkitOverflowScrolling: 'touch',
            paddingBottom: window.innerWidth <= 768 ? 'calc(env(safe-area-inset-bottom) + 80px)' : '0px',
          }}
        >
          <div className="min-h-full">
            <Routes>
              <Route path="/" element={
                <div className="p-3 md:p-6 lg:p-8">
                  {/* Dashboard Grid Layout */}
                  <div className="max-w-[1920px] mx-auto md:pb-0">
                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-3 md:gap-6 xl:gap-8">
                      {/* Left Column - Financial Overview */}
                      <div className="xl:col-span-2 space-y-3 md:space-y-4 xl:space-y-6">
                        {/* Balance Cards Grid */}
                        <div className="bg-transparent rounded-2xl">
                          {/* Balance Cards */}
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 xl:gap-6 mb-4 md:mb-6">
                            {balanceCards.map((card, index) => (
                              <BalanceCard 
                                key={`balance-${index}`}
                                amount={card.amount}
                                title={card.title}
                                variant={card.variant}
                              />
                            ))}
                          </div>

                          {/* Bank Account Cards Section */}
                          <div className="mb-3 md:mb-4 xl:mb-6">
                            <div className="flex items-center justify-between mb-3 md:mb-4 xl:mb-5">
                              <h2 className="text-base md:text-lg xl:text-xl font-semibold text-gray-800 pl-3">
                                Bank Accounts
                              </h2>
                              <select className="text-xs md:text-sm xl:text-base border border-gray-200 rounded-lg px-2 py-1 md:px-3 md:py-1.5 bg-white">
                                <option>All Accounts</option>
                                <option>Savings</option>
                                <option>Checking</option>
                                <option>Credit Cards</option>
                              </select>
                            </div>
                            <div className="relative">
                              <div 
                                ref={scrollContainerRef}
                                className="overflow-x-auto scrollbar-hide scroll-smooth overscroll-x-contain touch-pan-x"
                                style={{
                                  WebkitOverflowScrolling: 'touch',
                                  scrollSnapType: 'x mandatory',
                                  padding: '0.5rem',
                                  margin: '-0.5rem',
                                }}
                              >
                                <div className="flex gap-3 md:gap-4 xl:gap-6">
                                  {bankCards.map((card, index) => (
                                    <div 
                                      key={`bank-${index}`} 
                                      className="flex-none w-[160px] sm:w-[200px] md:w-[250px] xl:w-[300px] scroll-snap-align-start"
                                      style={{ padding: '0.5rem' }}
                                    >
                                      <Card 
                                        {...card} 
                                        onClick={() => setSelectedBank(card)} 
                                      />
                                    </div>
                                  ))}
                                  <div className="flex-none w-[160px] sm:w-[200px] md:w-[250px] xl:w-[300px]" style={{ padding: '0.5rem' }}>
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
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-4 xl:gap-6 overflow-hidden">
                          <div className="lg:col-span-1">
                            <WeeklyActivity />
                          </div>
                          <div className="lg:col-span-1">
                            <ExpenseStats />
                          </div>
                        </div>
                      </div>
                      
                      {/* Right Column - Transactions */}
                      <div className="space-y-3 md:space-y-4 xl:space-y-6">
                        <TransactionList />
                        <BalanceHistory />
                      </div>
                    </div>
                  </div>
                </div>
              } />

              {/* Additional Routes */}
              <Route path="/transactions" element={<TransactionsPage />} />
              <Route 
                path="/transactions/category/:categoryId" 
                element={<TransactionPage categories={mockCategories} />} 
              />
            </Routes>
          </div>
        </main>
        
        {/* Add Mobile Navigation */}
        <MobileNav />
      </div>

      {/* Modals */}
      <BankAccountModal
        isOpen={selectedBank !== null}
        onClose={() => setSelectedBank(null)}
        onSave={handleSaveBank}
        initialData={selectedBank || undefined}
      />
    </div>
  );
}
