import React from 'react';
import { TFQuestion } from '../../types/quiz';

interface TFQuestionProps {
  question: TFQuestion;
  onAnswer: (answer: string) => void;
  showFeedback: boolean;
  selectedAnswer: string | null;
  isCorrect: boolean | null;
}

const TFQuestionComponent: React.FC<TFQuestionProps> = ({
  question,
  onAnswer,
  showFeedback,
  selectedAnswer,
  isCorrect
}) => {
  return (
    <div className="space-y-6">
      <div className="text-white text-xl">
        {question.question}
      </div>

      <div className="flex gap-4 justify-center">
        {['True', 'False'].map((option) => (
          <button
            key={option}
            onClick={() => onAnswer(option)}
            disabled={showFeedback}
            className={`px-12 py-4 rounded-lg border ${
              selectedAnswer === option
                ? selectedAnswer === question.answer
                  ? 'bg-green-600 border-green-400'
                  : 'bg-red-600 border-red-400'
                : 'bg-[#101113] border-[#3A3B3D] hover:bg-[#1A1A1A]'
            } transition-all text-white font-semibold`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TFQuestionComponent;