import React from 'react';
import { 
  Home, 
  Receipt, 
  Users, 
  TrendingUp, 
  CreditCard, 
  Wallet, 
  Settings,
  Gift,
  Wrench,
  X
} from 'lucide-react';
import { Link } from './Link';
import { useNavigate, useLocation } from 'react-router-dom';

interface SidebarProps {
  onClose?: () => void;
}

export function Sidebar({ onClose }: SidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="w-64 bg-white h-screen overflow-y-auto">
      <div className="p-6">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-blue-600 flex items-center">
            <CreditCard className="mr-2" />
            Moneytrack.
          </h1>
          <button 
            onClick={onClose}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <nav className="space-y-2">
          <Link 
            icon={<Home />} 
            label="Dashboard" 
            active={location.pathname === '/'} 
            onClick={() => navigate('/')}
          />
          <Link 
            icon={<Receipt />} 
            label="Transactions" 
            active={location.pathname === '/transactions'} 
            onClick={() => navigate('/transactions')}
          />
          <Link icon={<Users />} label="Accounts" />
          <Link icon={<TrendingUp />} label="Investments" />
          <Link icon={<CreditCard />} label="Credit Cards" />
          <Link icon={<Wallet />} label="Loans" />
          <Link icon={<Wrench />} label="Services" />
          <Link icon={<Gift />} label="My Privileges" />
          <Link icon={<Settings />} label="Setting" />
        </nav>
      </div>
    </div>
  );
}