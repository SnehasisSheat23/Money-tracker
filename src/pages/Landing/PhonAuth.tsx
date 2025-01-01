import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export const PhoneAuth = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/auth/otp');
  };

  return (
    <div className="min-h-screen relative bg-[#fafafa]">
      {/* Dot pattern background */}
      <div className="absolute inset-0" style={{
        backgroundImage: `radial-gradient(#e1e1e1 1px, transparent 1px)`,
        backgroundSize: '30px 30px'
      }} />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/80 via-purple-50/80 to-white/80" />

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md">
          {/* Back button */}
          <button 
            onClick={() => navigate('/')}
            className="mb-8 flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to home
          </button>

          <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900">Welcome!</h2>
              <p className="text-gray-600 mt-2">Enter your phone number to continue</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="Enter your phone number"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 
                           focus:ring-2 focus:ring-blue-500 focus:border-transparent
                           transition-all duration-200 bg-white/50"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gray-900 text-white py-3 rounded-xl font-medium
                         transform transition-all duration-300 ease-in-out
                         hover:bg-gray-800 hover:shadow-lg active:scale-95"
              >
                Continue
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-gray-500">
              By continuing, you agree to our{' '}
              <a href="#" className="text-blue-600 hover:underline">Terms of Service</a>
              {' '}and{' '}
              <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
