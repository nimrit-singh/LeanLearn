import React from 'react';

interface QuestionFeedbackProps {
  isCorrect: boolean;
  correctAnswer: string;
  show: boolean;
}

const QuestionFeedback: React.FC<QuestionFeedbackProps> = ({
  isCorrect,
  correctAnswer,
  show
}) => {
  if (!show) return null;

  return (
    <div className={`max-w-3xl mx-auto flex items-center gap-2 mb-8 ${
      isCorrect ? 'text-green-500' : 'text-red-500'
    }`}>
      {isCorrect ? (
        <>
          <span>✓</span>
          <span>Nice!</span>
        </>
      ) : (
        <>
          <span>✕</span>
          <span>Incorrect. The correct answer was: {correctAnswer}</span>
        </>
      )}
    </div>
  );
};

export default QuestionFeedback;