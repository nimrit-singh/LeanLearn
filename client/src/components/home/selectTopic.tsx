import React, { useState, useEffect } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import logo from "../../assets/images/Logo.png";
import einstein from "../../assets/images/einstein.png";
import newton from "../../assets/images/Newton.png";
import galileo from "../../assets/images/gae.png";
import raman from "../../assets/images/Raman.png";
import { MCQQuestion, FillQuestion, TFQuestion } from "../../types/quiz";
import { mcqQuestionApi, fillQuestionApi, tfQuestionApi } from "../../lib/api/questions";
import QuestionCard from "../quiz/QuestionCard";
import QuestionFeedback from "../quiz/QuestionFeedback";

const companionImages = {
  1: einstein,
  2: newton,
  3: galileo,
  4: raman,
};

type QuestionType = MCQQuestion | FillQuestion | TFQuestion;

const SelectedTopicPage: React.FC = () => {
  const { topicId } = useParams<{ topicId: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedCompanion, questionType = 'mcq' } = location.state || {};

  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [companionMessage, setCompanionMessage] = useState<string>("");

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        switch (questionType) {
          case 'mcq': {
            const mcqData = await mcqQuestionApi.getAll();
            setQuestions(mcqData);
            break;
          }
          case 'fill': {
            const fillData = await fillQuestionApi.getAll();
            setQuestions(fillData);
            break;
          }
          case 'tf': {
            const tfData = await tfQuestionApi.getAll();
            setQuestions(tfData);
            break;
          }
          default: {
            // Handle invalid question type
            setError('Invalid question type');
          }
        }
      } catch (err) {
        setError('Failed to load questions');
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [questionType]);

  const handleAnswerSubmit = async (answer: string) => {
    if (showFeedback) return;

    const currentQuestion = questions[currentQuestionIndex];
    let correct = false;

    switch (questionType) {
      case 'mcq':
        correct = (currentQuestion as MCQQuestion).answers.includes(answer);
        break;
      case 'fill':
        correct = (currentQuestion as FillQuestion).answers.includes(answer);
        break;
      case 'tf':
        correct = (currentQuestion as TFQuestion).answer === answer;
        break;
    }

    setSelectedAnswer(answer);
    setIsCorrect(correct);
    setShowFeedback(true);
    setCompanionMessage(correct ? 
      "Great job! You're understanding this well!" : 
      "Don't worry! Learning from mistakes helps us improve."
    );

    try {
      switch (questionType) {
        case 'mcq':
          await mcqQuestionApi.update(currentQuestion.id, {
            ...currentQuestion as MCQQuestion,
            used: true
          });
          break;
        case 'fill':
          await fillQuestionApi.update(currentQuestion.id, {
            ...currentQuestion as FillQuestion,
            used: true
          });
          break;
        case 'tf':
          await tfQuestionApi.update(currentQuestion.id, {
            ...currentQuestion as TFQuestion,
            used: true
          });
          break;
      }
    } catch (error) {
      console.error('Failed to update question status:', error);
    }
  };

  const handleSkip = () => {
    setShowFeedback(false);
    setSelectedAnswer(null);
    setCompanionMessage("");
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handleSubmit = () => {
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(prev => prev + 1);
      setShowFeedback(false);
      setSelectedAnswer(null);
      setCompanionMessage("");
    } else {
      navigate('/summary', {
        state: {
          topicId,
          selectedCompanion,
          questionType
        }
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        {error}
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  if (!currentQuestion) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        No questions available
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-black">
      <div className="w-[280px] bg-[#101010] p-5 flex flex-col relative">
        <div className="flex items-center gap-2 mb-4">
          <button onClick={() => navigate("/")} className="flex items-center">
            <span className="text-[#00A3FF] text-2xl">←</span>
            <img src={logo} alt="LeanLearn Logo" className="w-[120px]" />
          </button>
        </div>

        {companionMessage && (
          <div className="bg-[#141414] rounded-lg p-4 mb-4 text-gray-300 text-sm">
            {companionMessage}
          </div>
        )}

        {selectedCompanion && (
          <div className="mt-auto">
            <img
              src={companionImages[selectedCompanion as keyof typeof companionImages]}
              alt="Selected Companion"
              className="w-full object-contain max-h-[300px]"
            />
          </div>
        )}
      </div>

      <div className="flex-1 px-8 py-6">
        <QuestionCard
          question={currentQuestion}
          type={questionType}
          onAnswer={handleAnswerSubmit}
          showFeedback={showFeedback}
          selectedAnswer={selectedAnswer}
          isCorrect={isCorrect}
        />

        {showFeedback && (
          <QuestionFeedback
            isCorrect={isCorrect}
            correctAnswer={
              questionType === 'tf'
                ? (currentQuestion as TFQuestion).answer
                : (questionType === 'mcq' 
                    ? (currentQuestion as MCQQuestion).answers[0]
                    : (currentQuestion as FillQuestion).answers[0])
            }
            show={showFeedback}
          />
        )}

        <div className="max-w-3xl mx-auto flex justify-end gap-4 mt-8">
          <button
            onClick={handleSkip}
            className="px-6 py-2 rounded-lg bg-[#101113] text-white hover:bg-[#1A1A1A] transition-colors"
          >
            Skip
          </button>
          <button
            onClick={handleSubmit}
            className="px-6 py-2 rounded-lg bg-[#00A3FF] text-white hover:bg-[#0086CC] transition-colors"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectedTopicPage;