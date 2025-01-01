// Core imports
import { useState } from 'react';
import { Menu } from 'lucide-react';
import './styles/global.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { TransactionsPage } from './pages/TransactionsPage';
import { TransactionPage } from './Transactions/pages/TransactionPage';
// Component imports
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Card } from './components/Card';
import { TransactionList } from './components/TransactionList';
import { WeeklyActivity } from './components/WeeklyActivity';
import { ExpenseStats } from './components/ExpenseStats';
import { BalanceHistory } from './components/BalanceHistory';
import { AddCard } from './components/AddCard';
import { mockCategories } from './Transactions/data/mockCategories';
import { BankAccountModal } from './components/BankAccountModal';

// Updated Card Data types
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

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
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
      title: "Remaining Balance",
      variant: "blue"
    },
    {
      type: 'balance',
      amount: "890",
      title: "Due Amount",
      variant: "red"
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

  const [selectedBank, setSelectedBank] = useState<BankCardData | null>(null);

  const handleAddBankCard = () => {
    // Instead of directly adding a card, we'll set selectedBank to a new empty card
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
      // Editing existing card
      setBankCards(cards => cards.map(card =>
        card === selectedBank ? updatedCard : card
      ));
    } else {
      // Adding new card
      setBankCards(prev => [...prev, updatedCard]);
    }
    setSelectedBank(null);
  };

  return (
    <BrowserRouter>
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
        <div className="flex-1 flex flex-col h-screen overflow-hidden">
          <Header>
            <button 
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <Menu className="w-6 h-6" />
            </button>
          </Header>
          
          {/* Main Content */}
          <main className="flex-1 overflow-y-auto">
            <Routes>
              <Route path="/" element={
                <div className="p-4 md:p-6 lg:p-8">
                  <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 md:gap-6">
                      {/* Left Section */}
                      <div className="xl:col-span-2 space-y-4 md:space-y-6">
                        {/* Cards Section */}
                        <div className="bg-transparent rounded-2xl">
                          <div className="flex justify-between items-center mb-4 md:mb-6 px-2">
                            
                          </div>
                          
                          <div className="bg-transparent rounded-2xl">
                            {/* Balance Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                              {balanceCards.map((card, index) => (
                                <Card key={`balance-${index}`} {...card} />
                              ))}
                            </div>

                            {/* Bank Account Cards */}
                            <div className="mb-4">
                              <div className="flex items-center justify-between mb-4">
                                <h2 className="text-lg font-semibold text-gray-800">Bank Accounts</h2>
                                <select className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 bg-white">
                                  <option>All Accounts</option>
                                  <option>Savings</option>
                                  <option>Checking</option>
                                  <option>Credit Cards</option>
                                </select>
                              </div>
                              <div className="relative">
                                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                                  {bankCards.map((card, index) => (
                                    <Card key={`bank-${index}`} {...card} onClick={() => setSelectedBank(card)} />
                                  ))}
                                  <AddCard onClick={handleAddBankCard} />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Charts Section */}
                        <div className="grid grid-cols-1 lg:grid-cols-7 gap-4 md:gap-6">
                          <div className="lg:col-span-4">
                            <WeeklyActivity />
                          </div>
                          <div className="lg:col-span-3">
                            <ExpenseStats />
                          </div>
                        </div>
                      </div>
                      
                      {/* Right Section */}
                      <div className="space-y-4 md:space-y-6">
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
      <BankAccountModal
        isOpen={selectedBank !== null}
        onClose={() => setSelectedBank(null)}
        onSave={handleSaveBank}
        initialData={selectedBank || undefined}
      />
    </BrowserRouter>
  );
}

export default App;