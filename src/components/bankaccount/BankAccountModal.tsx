import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Building2, Wallet, CreditCard } from 'lucide-react';
import { moneySign } from '../../utils/formatters';
/**
 * Interface for the bank account form data
 */
interface BankAccountData {
  bankName: string;
  accountType: 'savings' | 'checking' | 'credit';
  balance: string;
}

/**
 * Props for the BankAccountModal component
 */
interface BankAccountModalProps {
  /** Controls the visibility of the modal */
  isOpen: boolean;
  /** Callback function to close the modal */
  onClose: () => void;
  /** Callback function to handle form submission */
  onSave: (data: BankAccountData) => void;
  /** Initial data for editing an existing account */
  initialData?: BankAccountData;
}

/**
 * Modal component for adding or editing bank account details
 */
export function BankAccountModal({ isOpen, onClose, onSave, initialData }: BankAccountModalProps) {
  // State for form data management
  const [formData, setFormData] = useState<BankAccountData>({
    bankName: '',
    accountType: 'savings',
    balance: '0'
  });

  // Effect to handle form data initialization
  useEffect(() => {
    if (isOpen) {
      setFormData(initialData ? {
        bankName: initialData.bankName,
        accountType: initialData.accountType || 'savings',
        balance: initialData.balance || '0'
      } : {
        bankName: '',
        accountType: 'savings',
        balance: '0'
      });
    }
  }, [isOpen, initialData]);

  const accountTypes = [
    { value: 'savings', label: 'Savings Account', icon: Building2 },
    { value: 'checking', label: 'Checking Account', icon: Wallet },
    { value: 'credit', label: 'Credit Card', icon: CreditCard }
  ];

  /**
   * Handles form submission
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Modal Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-[60]"
            onClick={onClose}
          />
          
          {/* Modal Container */}
          <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", duration: 0.3, bounce: 0.2 }}
              className="w-full max-w-md mx-auto"
              style={{ maxHeight: 'calc(100vh - 32px)' }}
            >
              {/* Modal Content */}
              <div className="bg-white rounded-2xl shadow-[0_0_50px_-12px_rgb(0,0,0,0.25)] overflow-hidden">
                {/* Modal Header */}
                <div className="flex items-center justify-between p-3 sm:p-4 border-b">
                  <h2 className="text-lg sm:text-xl font-semibold">
                    {initialData ? 'Edit Account Details' : 'Add Account Details'}
                  </h2>
                  <button 
                    onClick={onClose} 
                    className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-lg"
                    aria-label="Close modal"
                  >
                    <X className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>

                {/* Modal Form */}
                <form onSubmit={handleSubmit} className="p-3 sm:p-4 space-y-4">
                  {/* Bank Name Input */}
                  <div>
                    <label className="block text-sm font-medium mb-1">Bank Name</label>
                    <input
                      type="text"
                      value={formData.bankName}
                      onChange={e => setFormData({ ...formData, bankName: e.target.value })}
                      placeholder="Enter bank name"
                      className="w-full p-2 border rounded-lg"
                      required
                    />
                  </div>

                  {/* Account Type Selection */}
                  <div>
                    <label className="block text-sm font-medium mb-2 sm:mb-3">Account Type</label>
                    <div className="grid grid-cols-3 gap-2 sm:gap-3">
                      {accountTypes.map((type) => {
                        const Icon = type.icon;
                        const isSelected = formData.accountType === type.value;
                        return (
                          <button
                            key={type.value}
                            type="button"
                            onClick={() => setFormData({ ...formData, accountType: type.value as any })}
                            className={`flex flex-col items-center p-2 sm:p-3 rounded-lg border-2 transition-all
                              ${isSelected 
                                ? 'border-blue-500 bg-blue-50 text-blue-600' 
                                : 'border-gray-200 hover:border-blue-200 hover:bg-blue-50/50'
                              }`}
                          >
                            <Icon className={`w-5 h-5 sm:w-6 sm:h-6 mb-1 sm:mb-2 ${isSelected ? 'text-blue-500' : 'text-gray-500'}`} />
                            <span className="text-[10px] sm:text-xs font-medium text-center">{type.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Balance Input */}
                  <div>
                    <label className="block text-sm font-medium mb-1">Balance</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">{moneySign()}</span>
                      <input
                        type="text"
                        value={formData.balance}
                        onChange={e => setFormData({ ...formData, balance: e.target.value })}
                        className="w-full p-2 pl-7 border rounded-lg"
                        placeholder="0.00"
                        required
                      />
                    </div>
                  </div>

                  {/* Form Actions */}
                  <div className="flex justify-end gap-2 pt-4">
                    <button
                      type="button"
                      onClick={onClose}
                      className="px-3 sm:px-4 py-1.5 sm:py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-3 sm:px-4 py-1.5 sm:py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
