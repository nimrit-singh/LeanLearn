import React, { useState } from 'react';
import { FillQuestion } from '../../types/quizInterface';

interface FillQuestionProps {
  question: FillQuestion;
  onAnswer: (answer: string) => void;
  showFeedback: boolean;
  selectedAnswer: string | null;
  isCorrect: boolean | null;
}

const FillQuestionComponent: React.FC<FillQuestionProps> = ({
  question,
  onAnswer,
  showFeedback,
  selectedAnswer,
  isCorrect
}) => {
  const [userInput, setUserInput] = useState('');

  const handleSubmit = () => {
    onAnswer(userInput);
  };

  return (
    <div className="space-y-6">
      <div className="text-white text-xl">
        {question.question}
      </div>

      <div className="flex gap-4">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          disabled={showFeedback}
          className="flex-1 p-4 rounded-lg bg-[#101113] border border-[#3A3B3D] text-white focus:outline-none focus:border-[#00A3FF]"
          placeholder="Type your answer..."
        />
        <button
          onClick={handleSubmit}
          disabled={!userInput || showFeedback}
          className="px-6 py-2 rounded-lg bg-[#00A3FF] text-white hover:bg-[#0086CC] transition-colors disabled:opacity-50"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default FillQuestionComponent;