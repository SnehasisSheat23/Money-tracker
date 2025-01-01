import React, { useState, useRef } from 'react';
import { Search, Bell, Settings, X } from 'lucide-react';

interface HeaderProps {
  children?: React.ReactNode;
}

export function Header({ children }: HeaderProps) {
  const [isTyping, setIsTyping] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setIsTyping(e.target.value.length > 0);
  };

  return (
    <>
      <header className="sticky top-0 z-20 flex items-center justify-between p-6 bg-white border-b">
        <div className="flex items-center space-x-4">
          {children}
          <h1 className="text-2xl font-semibold text-gray-800">Overview</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Ask any thing"
              value={inputValue}
              onChange={handleInputChange}
              className="pl-10 pr-4 py-2 bg-gray-50 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            
            {/* Dropdown Chat Interface */}
            {isTyping && (
              <div className="absolute mt-2 w-96 bg-white rounded-lg shadow-lg border overflow-hidden transform origin-top transition-all duration-200 ease-out animate-slide-up">
                <div className="p-3 border-b flex justify-between items-center">
                  <h2 className="text-sm font-semibold text-gray-700">AI Assistant</h2>
                  <button 
                    onClick={() => {setIsTyping(false); setInputValue('')}}
                    className="p-1 hover:bg-gray-100 rounded-full"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="p-4 h-64 overflow-y-auto">
                  <div className="flex items-start space-x-3 animate-pulse">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex-shrink-0"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </div>
                </div>
                <div className="p-3 border-t bg-gray-50">
                  <input
                    type="text"
                    placeholder="Type your message..."
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            )}
          </div>
          
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <Settings className="w-6 h-6 text-gray-600" />
          </button>
          
          <button className="p-2 hover:bg-gray-100 rounded-full relative">
            <Bell className="w-6 h-6 text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          
          <img
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&q=80"
            alt="Profile"
            className="w-10 h-10 rounded-full"
          />
        </div>
      </header>
    </>
  );
}