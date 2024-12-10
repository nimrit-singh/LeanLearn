import React from 'react';
import { MCQQuestion, FillQuestion, TFQuestion } from '../../types/quiz';
import MCQQuestionComponent from './MCQQuestion';
import FillQuestionComponent from './FillBlankQuestion';
import TFQuestionComponent from './TrueFalseQuestion';

interface QuestionCardProps {
  question: MCQQuestion | FillQuestion | TFQuestion;
  type: 'mcq' | 'fill' | 'tf';
  onAnswer: (answer: string) => void;
  showFeedback: boolean;
  selectedAnswer: string | null;
  isCorrect: boolean | null;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  type,
  onAnswer,
  showFeedback,
  selectedAnswer,
  isCorrect
}) => {
  const renderQuestion = () => {
    switch (type) {
      case 'mcq':
        return (
          <MCQQuestionComponent
            question={question as MCQQuestion}
            onAnswer={onAnswer}
            showFeedback={showFeedback}
            selectedAnswer={selectedAnswer}
            isCorrect={isCorrect}
          />
        );
      case 'fill':
        return (
          <FillQuestionComponent
            question={question as FillQuestion}
            onAnswer={onAnswer}
            showFeedback={showFeedback}
            selectedAnswer={selectedAnswer}
            isCorrect={isCorrect}
          />
        );
      case 'tf':
        return (
          <TFQuestionComponent
            question={question as TFQuestion}
            onAnswer={onAnswer}
            showFeedback={showFeedback}
            selectedAnswer={selectedAnswer}
            isCorrect={isCorrect}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      {renderQuestion()}
    </div>
  );
};

export default QuestionCard;