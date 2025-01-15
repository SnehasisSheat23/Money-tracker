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
    <div className="w-64 bg-[#f8faff] h-screen overflow-y-auto border-r border-[#e5e9f2]">
      <div className="p-6">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-semibold text-[#1a73e8] flex items-center">
            <CreditCard className="mr-2 text-[#1a73e8]" />
            Moneytrack
          </h1>
          <button 
            onClick={onClose}
            className="md:hidden p-2 rounded-lg hover:bg-[#eef3ff] transition-colors"
          >
            <X className="w-5 h-5 text-[#5f6368]" />
          </button>
        </div>
        
        <nav className="space-y-1">
          {[
            { icon: <Home className="w-5 h-5" />, label: "Dashboard", path: '/dashboard' },
            { icon: <Receipt className="w-5 h-5" />, label: "Transactions", path: '/transactions' },
            { icon: <Users className="w-5 h-5" />, label: "Accounts", path: '/accounts' },
            { icon: <TrendingUp className="w-5 h-5" />, label: "Investments", path: '/investments' },
            { icon: <CreditCard className="w-5 h-5" />, label: "Credit Cards", path: '/cards' },
            { icon: <Wallet className="w-5 h-5" />, label: "Loans", path: '/loans' },
            { icon: <Wrench className="w-5 h-5" />, label: "Services", path: '/services' },
            { icon: <Gift className="w-5 h-5" />, label: "My Privileges", path: '/privileges' },
          ].map((item) => (
            <button
              key={item.label}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group
                ${location.pathname === item.path 
                  ? 'bg-[#1a73e8] text-white shadow-sm' 
                  : 'text-[#3c4043] hover:bg-[#eef3ff]'}`}
            >
              <span className={`${location.pathname === item.path 
                ? 'text-white' 
                : 'text-[#5f6368] group-hover:text-[#1a73e8]'}`}
              >
                {item.icon}
              </span>
              <span className="ml-3">{item.label}</span>
            </button>
          ))}

          <div className="pt-6">
            <button
              onClick={() => navigate('/settings')}
              className="w-full flex items-center px-4 py-2.5 rounded-lg text-sm font-medium text-[#3c4043] hover:bg-[#eef3ff] transition-all duration-200"
            >
              <Settings className="w-5 h-5 text-[#5f6368] group-hover:text-[#1a73e8]" />
              <span className="ml-3">Settings</span>
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
}