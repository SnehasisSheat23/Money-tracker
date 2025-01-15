import React, { useState, useRef, useEffect } from 'react';
import { Search, Bell, Settings, X } from 'lucide-react';

interface HeaderProps {
  children?: React.ReactNode;
}

export function Header({ children }: HeaderProps) {
  const [isTyping, setIsTyping] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [searchHistory] = useState(['Budget analysis', 'Monthly expenses', 'Savings goals']);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setIsTyping(e.target.value.length > 0);
  };

  useEffect(() => {
    // Prevent zoom on input focus
    const metaViewport = document.querySelector('meta[name=viewport]');
    const originalContent = metaViewport?.getAttribute('content');
    
    if (isMobileSearchOpen) {
      metaViewport?.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1');
    }

    return () => {
      if (originalContent) {
        metaViewport?.setAttribute('content', originalContent);
      }
    };
  }, [isMobileSearchOpen]);

  return (
    <>
      <header className="h-[60px] backdrop-blur-xl bg-white/80 flex items-center justify-between px-4 md:px-6 py-3 border-b border-gray-200/50 sticky top-0 z-40">
        <div className="flex-1 flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            {children}
          </div>
        </div>
        
        <div className="flex items-center space-x-2 md:space-x-4">
          {/* Mobile Search Button */}
          <button 
            className="p-2 hover:bg-gray-100/50 rounded-full md:hidden transition-colors"
            onClick={() => setIsMobileSearchOpen(true)}
          >
            <Search className="w-5 h-5 text-gray-600" />
          </button>

          {/* Desktop Search */}
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search or ask anything..."
              value={inputValue}
              onChange={handleInputChange}
              className="pl-9 pr-4 py-2 bg-gray-100/50 backdrop-blur-lg rounded-full w-72 
                focus:outline-none focus:ring-2 focus:ring-gray-200/50 
                text-sm transition-all duration-200 ease-in-out
                placeholder:text-gray-400"
            />
          </div>
          
          <button className="p-2 hover:bg-gray-100/50 rounded-full transition-colors">
            <Settings className="w-5 h-5 text-gray-600" />
          </button>
          
          <button className="p-2 hover:bg-gray-100/50 rounded-full transition-colors relative">
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
          </button>
          
          <button className="group relative">
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&q=80"
              alt="Profile"
              className="w-8 h-8 rounded-full ring-2 ring-gray-200 transition-all duration-200 group-hover:ring-gray-300"
            />
          </button>
        </div>
      </header>

      {/* Mobile Search Overlay */}
      {isMobileSearchOpen && (
        <div className="fixed inset-0 bg-white/95 backdrop-blur-xl z-50 md:hidden flex flex-col">
          <div className="flex items-center p-4 border-b border-gray-200/50 bg-white/80 backdrop-blur-xl sticky top-0">
            <button 
              onClick={() => {
                setIsMobileSearchOpen(false);
                setIsTyping(false);
                setInputValue('');
              }}
              className="p-2 hover:bg-gray-100/50 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
            <div className="flex-1 mx-2 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search or ask anything..."
                value={inputValue}
                onChange={handleInputChange}
                className="w-full pl-9 pr-4 py-2.5 bg-gray-100/50 backdrop-blur-lg rounded-full 
                  focus:outline-none focus:ring-2 focus:ring-gray-200/50 
                  text-base transition-all duration-200 ease-in-out"
                autoFocus
                style={{ fontSize: '16px' }}
              />
            </div>
          </div>

          {/* Search Content */}
          <div className="flex-1 overflow-y-auto">
            {!isTyping ? (
              <div className="p-4 space-y-4">
                <h3 className="text-sm font-medium text-gray-500 px-2">Recent Searches</h3>
                {searchHistory.map((item, index) => (
                  <button
                    key={index}
                    className="flex items-center space-x-3 w-full p-3 hover:bg-gray-50/50 rounded-xl transition-colors"
                    onClick={() => setInputValue(item)}
                  >
                    <Search className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-700">{item}</span>
                  </button>
                ))}
              </div>
            ) : (
              <div className="p-4 space-y-4">
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-sm">AI</span>
                    </div>
                    <div className="flex-1">
                      <div className="animate-pulse space-y-2">
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input Footer */}
          {isTyping && (
            <div className="p-4 border-t border-gray-200/50 bg-white/80 backdrop-blur-xl sticky bottom-0">
              <div className="flex items-center space-x-2 max-w-2xl mx-auto">
                <input
                  type="text"
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2.5 bg-gray-100/50 backdrop-blur-lg rounded-full 
                    focus:outline-none focus:ring-2 focus:ring-gray-200/50 
                    text-base transition-all duration-200 ease-in-out"
                  style={{ fontSize: '16px' }}
                />
                <button className="p-2.5 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}