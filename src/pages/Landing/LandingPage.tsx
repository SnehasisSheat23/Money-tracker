import { useNavigate } from 'react-router-dom';

export const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative bg-[#fafafa] overflow-hidden">
      {/* Dot pattern background */}
      <div className="absolute inset-0" style={{
        backgroundImage: `radial-gradient(#e1e1e1 1px, transparent 1px)`,
        backgroundSize: '30px 30px'
      }} />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/80 via-purple-50/80 to-white/80" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4">
        <div className="text-center max-w-3xl px-4">
          {/* Logo or icon */}
          <div className="mb-8">
            <div className="inline-block p-4 bg-blue-100 rounded-2xl">
              <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 tracking-tight">
            Track Your Money <br/>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              With Ease
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            Your personal finance companion. Track expenses, manage budgets, 
            and take control of your financial future with our intuitive tools.
          </p>

          <div className="space-y-4">
            <button
              onClick={() => navigate('/auth/phone')}
              className="px-8 py-4 bg-gray-900 text-white rounded-xl text-lg font-medium
                         transform transition-all duration-300 ease-in-out
                         hover:scale-105 hover:shadow-xl active:scale-95"
            >
              Get Started
            </button>
            
            <p className="text-sm text-gray-500">
              No credit card required • Free to get started
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
