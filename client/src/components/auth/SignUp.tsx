import React from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import leanLearnLogo from '../../assets/images/Logo.png';

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const role = searchParams.get('role');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/verify-otp');
  };

  return (
    <div className="min-h-screen w-full bg-black flex flex-col">
      {/* Logo Container */}
      <div className="absolute top-8 left-8">
        <img 
          src={leanLearnLogo} 
          alt="LeanLearn" 
          className="h-6 w-auto object-contain"
        />
      </div>

      {/* Main Container */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="w-[400px] bg-[#111111] rounded-lg p-8">
          <h2 className="text-white text-2xl font-medium text-center mb-6">
            Sign Up as {role === 'teacher' ? 'Teacher' : 'Student'}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-white text-sm">Name</label>
              <input
                type="text"
                placeholder="Enter your Name"
                className="w-full bg-[#1A1A1A] text-white p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {role === 'teacher' && (
              <>
                <div className="space-y-2">
                  <label className="block text-white text-sm">School Name</label>
                  <input
                    type="text"
                    placeholder="Enter your School Name"
                    className="w-full bg-[#1A1A1A] text-white p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-white text-sm">Subject</label>
                  <input
                    type="text"
                    placeholder="Enter Subject you teach"
                    className="w-full bg-[#1A1A1A] text-white p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-white text-sm">City</label>
                  <input
                    type="text"
                    placeholder="Enter your City"
                    className="w-full bg-[#1A1A1A] text-white p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </>
            )}

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
              Submit
            </button>
          </form>
        </div>

        <Link 
          to="/login"
          className="text-white text-sm mt-4 hover:text-gray-300 transition-colors text-decoration-line: underline"
        >
          I ALREADY HAVE AN ACCOUNT
        </Link>
      </div>
    </div>
  );
};

export default SignUp;