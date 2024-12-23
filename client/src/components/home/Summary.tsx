import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import logo from '../../assets/images/Logo.png';
import einstein from "../../assets/Einstein.gif";
import newton from "../../assets/Newton.gif";
import galileo from "../../assets/Galileo.gif";
import raman from "../../assets/CV Raman.gif";

const companionImages = {
  1: einstein,
  2: newton,
  3: galileo,
  4: raman,
};

const Summary: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedCompanion, topicId } = location.state || {};

  const handleRetryQuiz = () => {
    navigate('/quiz-page', { 
      state: { selectedCompanion, topicId } 
    });
  };

  const handleTakeAnotherQuiz = () => {
    navigate('/quiz-page', { 
      state: { selectedCompanion } 
    });
  };

  const handleChallengeClick = () => {
  };

  const handleGoBack = () => {
    navigate('/');
  };

  const handleExit = () => {
    navigate('/feedback', { 
      state: { selectedCompanion, topicId } 
    });
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-black">
      <div className="w-full md:w-[280px] bg-[#101010] p-5 flex flex-col relative order-2 md:order-1">
        <button onClick={handleGoBack} className="flex items-center mb-6">
          <img src={logo} alt="LeanLearn Logo" className="w-[120px]" />
        </button>

        <div className="bg-[#1A1A1A] rounded-lg p-4">
          <h3 className="text-white text-sm mb-3">Topics you have to improve on</h3>
          <ul className="text-gray-300 space-y-2 text-sm">
            {[
              'Topic 1',
              'Topic 2',
              'Topic 3',
              'Topic 4',
              'Topic 5',
              'Topic 6',
              'Topic 7',
            ].map((topic, index) => (
              <li key={index}>• {topic}</li>
            ))}
          </ul>
        </div>

        {selectedCompanion && (
          <div className="mt-auto hidden md:flex justify-center">
            <img
              src={companionImages[selectedCompanion as keyof typeof companionImages]}
              alt="Selected Companion"
              className="w-full object-contain max-h-[300px]"
            />
          </div>
        )}
      </div>

      <div className="flex-1 flex flex-col p-4 order-1 md:order-2 bg-black">
        <div className="md:absolute md:top-6 md:right-6 mb-6 md:mb-0">
          <button
            onClick={handleExit}
            className="w-full md:w-auto px-4 py-2 bg-[#00A3FF] text-white rounded-lg hover:bg-[#0086CC] transition-colors"
          >
            Exit
          </button>
        </div>

        <div className="flex flex-col items-center justify-center flex-grow max-w-md mx-auto w-full">
          {selectedCompanion && (
            <div className="md:hidden mb-6">
              <img
                src={companionImages[selectedCompanion as keyof typeof companionImages]}
                alt="Selected Companion"
                className="w-[200px] object-contain"
              />
            </div>
          )}

          <h1 className="text-2xl font-bold text-[#00A3FF] mb-2">Quiz Complete!</h1>
          <p className="text-[#00A3FF] text-sm mb-8">You're 70% closer to mastering this topic!</p>

          <div className="w-full space-y-2 mb-8 text-white text-sm">
            <div className="flex justify-between">
              <span>Total Quiz Questions:</span>
              <span>10</span>
            </div>
            <div className="flex justify-between">
              <span>Correctly Answered:</span>
              <span>7</span>
            </div>
            <div className="flex justify-between">
              <span>Incorrectly Answered:</span>
              <span>3</span>
            </div>
            <div className="flex justify-between border-t border-gray-700 pt-2 mt-2">
              <span>Total Score:</span>
              <span>7/10</span>
            </div>
          </div>

          <div className="flex flex-col w-full gap-3">
            <button 
              onClick={handleRetryQuiz}
              className="w-full py-3 px-4 bg-[#101113] text-white rounded-lg hover:bg-[#1A1A1A] transition-colors"
            >
              Retry Quiz
            </button>
            <button
              onClick={handleChallengeClick}
              className="w-full py-3 px-4 bg-[#101113] text-white rounded-lg hover:bg-[#1A1A1A] transition-colors"
            >
              Challenge Friends
            </button>
            <button
              onClick={handleTakeAnotherQuiz}
              className="w-full py-3 px-4 bg-[#00A3FF] text-white rounded-lg hover:bg-[#0086CC] transition-colors"
            >
              Take Another Quiz
            </button>
          </div>

          <p className="text-gray-400 italic text-sm text-center mt-6">
            Every attempt takes you closer to mastering physics!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Summary;