import { Home, Receipt, Users, TrendingUp, CreditCard } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export function MobileNav() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
      <div 
        className="backdrop-blur-xl bg-white/60 border-t border-gray-100"
        style={{ 
          paddingBottom: 'max(env(safe-area-inset-bottom), 0.5rem)',
          boxShadow: '0 -1px 0 rgba(0, 0, 0, 0.05)'
        }}
      >
        <div className="flex justify-around items-center h-14 px-2 max-w-md mx-auto">
          {[
            { icon: <Home strokeWidth={1.5} />, label: 'Home', path: '/dashboard' },
            { icon: <Receipt strokeWidth={1.5} />, label: 'Transaction', path: '/transactions' },
            { icon: <Users strokeWidth={1.5} />, label: 'Accounts', path: '/accounts' },
            { icon: <TrendingUp strokeWidth={1.5} />, label: 'Invest', path: '/invest' },
            { icon: <CreditCard strokeWidth={1.5} />, label: 'Cards', path: '/cards' },
          ].map((item, index) => (
            <NavButton
              key={item.path}
              {...item}
              active={location.pathname === item.path}
              onClick={() => navigate(item.path)}
              delay={index * 0.03}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

interface NavButtonProps {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick?: () => void;
  delay?: number;
}

function NavButton({ icon, label, active, onClick, delay = 0 }: NavButtonProps) {
  return (
    <motion.button
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        type: 'spring',
        stiffness: 400,
        damping: 25,
        delay: delay,
      }}
      onClick={onClick}
      className="relative group flex flex-col items-center justify-center w-16 py-1"
    >
      {active && (
        <motion.div
          layoutId="activeTab"
          className="absolute inset-0 bg-blue-50/30 rounded-2xl"
          transition={{ 
            type: 'spring', 
            stiffness: 400, 
            damping: 30,
            bounce: 0.1
          }}
        />
      )}

      <div className={`relative z-10 transition-all duration-200 ease-out ${
        active 
          ? 'scale-105 text-blue-500' 
          : 'text-gray-500 group-hover:text-gray-700 group-hover:scale-102'
      }`}>
        {icon}
      </div>

      <span className={`text-[10px] mt-1 transition-colors duration-200 ${
        active 
          ? 'text-blue-500 font-medium' 
          : 'text-gray-500 group-hover:text-gray-700'
      }`}>
        {label}
      </span>
    </motion.button>
  );
}
