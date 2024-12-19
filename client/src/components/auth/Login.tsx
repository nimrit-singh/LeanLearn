import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import leanLearnLogo from '../../assets/images/Logo.png';

const Login: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/verify-otp');
  };

  return (
    <div className="min-h-screen w-full bg-black flex flex-col">
      <div className="absolute top-8 left-8">
        <img 
          src={leanLearnLogo} 
          alt="LeanLearn" 
          className="h-6 w-auto object-contain"
        />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="w-[400px] bg-[#111111] rounded-lg p-8">
          <h2 className="text-white text-2xl font-medium text-center mb-6">
            Login
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-white text-sm">Phone No.</label>
              <input
                type="tel"
                placeholder="Enter your Phone No."
                className="w-full bg-[#1A1A1A] text-white p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#00A3FF] text-black py-3 rounded-md hover:bg-[#0088D4] transition-colors"
            >
              Send OTP
            </button>
          </form>
        </div>

        <Link 
          to="/"
          className="text-white text-sm mt-4 hover:text-gray-300 transition-colors text-decoration-line: underline"
        >
          CREATE AN ACCOUNT
        </Link>
      </div>
    </div>
  );
};

export default Login;