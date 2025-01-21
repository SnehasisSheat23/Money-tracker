import { useState, useRef, useEffect } from 'react';
import { CreditCard, Menu } from 'lucide-react';
import { Routes, Route } from 'react-router-dom';
import { CardTitle } from '../components/Subscription/ui/card';
// Component imports
import { Sidebar } from '../components/Sidebar';
import { Header } from '../components/Header';
import { Card } from '../components/bankaccount/Card';
import { TransactionList } from '../components/TransactionList/TransactionList';
import { WeeklyActivity } from '../components/WeeklyActivity';
import { ExpenseStats } from '../components/expenseStats/ExpenseStats';
import { BalanceHistory } from '../components/balancehistory/BalanceHistory';
import { AddCard } from '../components/bankaccount/AddCard';
import { BankAccountModal } from '../components/bankaccount/BankAccountModal';
import { BalanceCard } from '..//components/balancecard/BalanceCard';
import { ScrollButton } from '../components/ScrollButton';
import { TransactionsPage } from './TransactionsPage';
import { TransactionPage } from '../Transactions/pages/FullTransactionPage';
import { mockCategories } from '../data/mockCategories';
import { MobileNav } from '../components/MobileNav';
import { SubscriptionManager } from '../components/Subscription/SubscriptionManager';

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
    <div className="flex h-[100dvh] bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-white
        transition-transform duration-300 border-r border-gray-200
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0 md:relative
      `}>
        <Sidebar onClose={() => setSidebarOpen(false)} />
      </aside>

      {/* Main Content Container */}
      <div className="flex-1 flex flex-col w-full md:w-[calc(100%-16rem)] relative">
        {/* Header */}
        <header className="h-14 flex items-center bg-white border-b border-gray-200 px-4 sticky top-0 z-30">
          <Header>
            <div className="md:hidden flex items-center">
              <CreditCard className="w-5 h-5 text-primary" />
              <span className="ml-2 font-bold text-primary">Moneytrack.</span>
            </div>
          </Header>
        </header>

        {/* Scrollable Content Area */}
        <main className="flex-1 overflow-y-auto overscroll-y-contain relative bg-gray-50">
          <Routes>
            <Route path="/" element={
              <div className="pb-20 md:pb-6"> {/* Added padding for mobile nav */}
                <div className="p-4 md:p-6 max-w-[1920px] mx-auto">
                  <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 md:gap-6">
                    {/* Left Column - Main Content */}
                    <div className="xl:col-span-8 space-y-4 md:space-y-6">
                      {/* Balance Cards Row */}
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4">
                        {balanceCards.map((card, index) => (
                          <BalanceCard 
                            key={`balance-${index}`}
                            amount={card.amount}
                            title={card.title}
                            variant={card.variant}
                          />
                        ))}
                      </div>

                      {/* Bank Account Section */}
                      <div className="">
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
                              <div className="flex-none -item-centre w-[160px] sm:w-[200px] md:w-[250px] xl:w-[300px]" style={{ padding: '0.5rem' }}>
                                
                                <AddCard  onClick={handleAddBankCard} />
                                
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

                      {/* Charts Section */}
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <SubscriptionManager />
                        <ExpenseStats />
                      </div>
                    </div>

                    {/* Right Column - Transactions */}
                    <div className="xl:col-span-4 space-y-6">
                      <TransactionList />
                      <WeeklyActivity />
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
        </main>

        {/* Mobile Navigation - Fixed at bottom */}
        <div className="fixed bottom-0 left-0 right-0 md:hidden bg-white border-t border-gray-200">
          <MobileNav />
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Bank Account Modal */}
      <BankAccountModal
        isOpen={selectedBank !== null}
        onClose={() => setSelectedBank(null)}
        onSave={handleSaveBank}
        initialData={selectedBank || undefined}
      />
    </div>
  );
}
