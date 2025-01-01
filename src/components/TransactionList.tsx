import React from 'react';
import { CreditCard, User } from 'lucide-react';
import '../styles/global.css'

interface Transaction {
  id: number;
  title: string;
  date: string;
  amount: string;
  type: 'deposit' | 'withdrawal';
  icon: 'card' | 'paypal' | 'user';
}

const transactions: Transaction[] = [
  {
    id: 1,
    title: 'Deposit from my Card',
    date: '28 January 2021',
    amount: '-$850',
    type: 'withdrawal',
    icon: 'card'
  },
  {
    id: 2,
    title: 'Deposit Paypal',
    date: '25 January 2021',
    amount: '+$2,500',
    type: 'deposit',
    icon: 'paypal'
  },
  {
    id: 3,
    title: 'Jemi Wilson',
    date: '21 January 2021',
    amount: '+$5,400',
    type: 'deposit',
    icon: 'user'
  },
  {
    id: 4,
    title: 'Deposit Paypal',
    date: '30 January 2021',
    amount: '+$1,200',
    type: 'deposit',
    icon: 'paypal'
  },
  {
    id: 5,
    title: 'Jemi Wilson',
    date: '21 January 2021',
    amount: '+$5,400',
    type: 'deposit',
    icon: 'user'
  },
  {
    id: 6,
    title: 'Jemi Wilson',
    date: '21 January 2021',
    amount: '+$5,400',
    type: 'deposit',
    icon: 'user'
  },
  {
    id: 7,
    title: 'Jemi Wilson',
    date: '21 January 2021',
    amount: '+$5,400',
    type: 'deposit',
    icon: 'user'
  }
];

function getIcon(icon: 'card' | 'paypal' | 'user') {
  switch (icon) {
    case 'card':
      return <CreditCard className="w-6 h-6 text-grey-600" />;
    case 'paypal':
      return <CreditCard className="w-6 h-6 text-grey-600" />;
    case 'user':
      return <User className="w-6 h-6 text-grey-600" />;
    default:
      return null;
  }
}

export function TransactionList() {
  return (
    <div className="bg-white p-6 rounded-xl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Recent Transaction</h2>
        <button className="text-blue-600 font-medium">See All</button>
      </div>
      
      <div className="space-y-4 h-64 overflow-y-auto custom-scrollbar pr-3 ">
        {transactions.map((transaction) => (
          <div key={transaction.id} className="flex items-center justify-between">
            <div className="flex items-center">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                transaction.type === 'deposit' ? 'bg-green-100' : 'bg-red-100'
              }`}>
                {getIcon(transaction.icon)}
              </div>
              <div className="ml-4">
                <p className="font-medium">{transaction.title}</p>
                <p className="text-sm text-gray-500">{transaction.date}</p>
              </div>
            </div>
            <p className={`font-medium  ${
              transaction.type === 'deposit' ? 'text-green-500' : 'text-red-500'
            }`}>
              {transaction.amount}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}