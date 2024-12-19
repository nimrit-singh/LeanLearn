import React, { useState, useEffect, useRef } from 'react';
import leanLearnLogo from '../../assets/images/Logo.png';

const VerifyOTP: React.FC = () => {
  const [timer, setTimer] = useState<number>(60);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(true);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (isTimerRunning && timer > 0) {
      const interval = window.setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      
      timerRef.current = interval;
    } else if (timer === 0) {
      setIsTimerRunning(false);
    }

    return () => {
      if (timerRef.current) {
        window.clearInterval(timerRef.current);
      }
    };
  }, [timer, isTimerRunning]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add verification logic here
  };

  const handleResendOTP = () => {
    if (timer === 0) {
      setTimer(60);
      setIsTimerRunning(true);
    }
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
            Verify with OTP
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-white text-sm">OTP</label>
              <input
                type="text"
                placeholder="Enter your OTP"
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

        <button 
          onClick={handleResendOTP}
          disabled={timer > 0}
          className={`text-white text-sm mt-4 ${timer > 0 ? 'cursor-not-allowed' : 'hover:text-gray-300'}`}
        >
          {timer > 0 ? `Resend OTP - ${timer}Sec` : 'Resend OTP'}
        </button>
      </div>
    </div>
  );
};

export default VerifyOTP;