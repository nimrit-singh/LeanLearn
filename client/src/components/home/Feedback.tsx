import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface FeedbackProps {
  onSubmit?: (rating: number, feedback: string) => void;
  onSkip?: () => void;
}

const Feedback: React.FC<FeedbackProps> = ({ 
  onSubmit = () => {}, 
  onSkip = () => {} 
}) => {
  const [rating, setRating] = useState(3);
  const [feedback, setFeedback] = useState('');
  const navigate = useNavigate();

  const handleSubmit = () => {
    onSubmit?.(rating, feedback);
    navigate('/');
  };

  const handleSkip = () => {
    onSkip?.();
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-[512px] bg-[#1A1A1A] rounded-lg p-6 sm:p-8">
        <h2 className="text-white text-xl sm:text-2xl font-semibold text-center mb-2">
          We Value Your Feedback!
        </h2>
        <p className="text-gray-400 text-center mb-6">
          We're always striving to improve - share your thoughts with us!
        </p>

        {/* Star Rating */}
        <div className="flex justify-center gap-2 mb-6">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => setRating(star)}
              className="focus:outline-none"
            >
              {star <= rating ? (
                <svg
                  width="56"
                  height="56"
                  viewBox="0 0 72 72"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-10 h-10 sm:w-12 sm:h-12"
                >
                  <path
                    d="M32.7044 9.12853C34.0525 6.3971 37.9474 6.39709 39.2955 9.12853L46.574 23.8765L62.8493 26.2414C65.8637 26.6794 67.0673 30.3837 64.8861 32.5099L53.1091 43.9895L55.8893 60.1991C56.4042 63.2012 53.2531 65.4906 50.5571 64.0732L36 56.4201L21.4428 64.0732C18.7468 65.4906 15.5957 63.2012 16.1106 60.1991L18.8908 43.9895L7.11382 32.5099C4.93265 30.3837 6.13624 26.6794 9.15056 26.2414L25.4259 23.8765L32.7044 9.12853Z"
                    fill="#ECC236"
                  />
                </svg>
              ) : (
                <svg
                  width="56"
                  height="56"
                  viewBox="0 0 72 72"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-10 h-10 sm:w-12 sm:h-12"
                >
                  <path
                    d="M32.7044 9.12853C34.0525 6.3971 37.9474 6.39709 39.2955 9.12853L46.574 23.8765L62.8493 26.2414C65.8637 26.6794 67.0673 30.3837 64.8861 32.5099L53.1091 43.9895L55.8893 60.1991C56.4042 63.2012 53.2531 65.4906 50.5571 64.0732L36 56.4201L21.4428 64.0732C18.7468 65.4906 15.5957 63.2012 16.1106 60.1991L18.8908 43.9895L7.11382 32.5099C4.93265 30.3837 6.13624 26.6794 9.15056 26.2414L25.4259 23.8765L32.7044 9.12853Z"
                    fill="#3A3B3D"
                  />
                </svg>
              )}
            </button>
          ))}
        </div>

        <div className="mb-6">
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Any suggestions for improvement?"
            className="w-full h-[100px] sm:h-[120px] bg-[#101113] text-white rounded-lg p-4 resize-none focus:outline-none focus:ring-2 focus:ring-[#00A3FF]"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={handleSkip}
            className="flex-1 py-3 px-6 bg-[#101113] text-white rounded-lg hover:bg-[#1A1A1A] transition-colors"
          >
            Skip for later
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 py-3 px-6 bg-[#00A3FF] text-white rounded-lg hover:bg-[#0082CC] transition-colors"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Feedback;