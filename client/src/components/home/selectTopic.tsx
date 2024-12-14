import React, { useState, useEffect } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa"; 
import logo from "../../assets/images/Logo.png";
import einstein from "../../assets/images/einstein.png";
import newton from "../../assets/images/Newton.png";
import galileo from "../../assets/images/gae.png";
import raman from "../../assets/images/Raman.png";
import { MCQQuestion, FillQuestion, TFQuestion } from "../../types/quiz";
import {
  mcqQuestionApi,
  fillQuestionApi,
  tfQuestionApi,
  aiApi
} from "../../lib/api/questions";

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
  const { selectedCompanion, questionType = "mcq" } = location.state || {};

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
          case "mcq": {
            const mcqData = await mcqQuestionApi.getAll();
            setQuestions(mcqData);
            break;
          }
          case "fill": {
            const fillData = await fillQuestionApi.getAll();
            setQuestions(fillData);
            break;
          }
          case "tf": {
            const tfData = await tfQuestionApi.getAll();
            setQuestions(tfData);
            break;
          }
          default: {
            setError("Invalid question type");
          }
        }
      } catch (err) {
        setError("Failed to load questions");
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [questionType]);

  const handleOptionSelect = (answer: string) => {
    setSelectedAnswer(answer);
  };

  const handleAnswerSubmit = async () => {
    if (!selectedAnswer) return;
  
    const currentQuestion = questions[currentQuestionIndex];
    let correct = false;
    let correctAnswer = '';
  
    switch (questionType) {
      case "mcq":
        correctAnswer = (currentQuestion as MCQQuestion).answers[0];
        correct = (currentQuestion as MCQQuestion).answers.includes(selectedAnswer);
        break;
      case "fill":
        correctAnswer = (currentQuestion as FillQuestion).answers[0];
        correct = (currentQuestion as FillQuestion).answers.includes(selectedAnswer);
        break;
      case "tf":
        correctAnswer = (currentQuestion as TFQuestion).answer;
        correct = (currentQuestion as TFQuestion).answer === selectedAnswer;
        break;
    }
  
    setIsCorrect(correct);
    setShowFeedback(true);
  
    try {
      const requestData = {
        question: currentQuestion.question,
        topic: currentQuestion.topic || "physics",
        answer: correctAnswer,
        chosen_answer: selectedAnswer
      };
  
      const explanation = await aiApi.explainAnswer(requestData);
      const formattedExplanation = formatExplanation(explanation, correct, correctAnswer);
      setCompanionMessage(formattedExplanation);
  
    } catch (error) {
      console.error('Failed to get AI explanation:', error);
      setCompanionMessage(correct 
        ? `Well done! You got it right.` 
        : `Not quite right. The correct answer was: ${correctAnswer}.`
      );
    }

    try {
      switch (questionType) {
        case "mcq":
          await mcqQuestionApi.update(currentQuestion.id, {
            ...(currentQuestion as MCQQuestion),
            used: true,
          });
          break;
        case "fill":
          await fillQuestionApi.update(currentQuestion.id, {
            ...(currentQuestion as FillQuestion),
            used: true,
          });
          break;
        case "tf":
          await tfQuestionApi.update(currentQuestion.id, {
            ...(currentQuestion as TFQuestion),
            used: true,
          });
          break;
      }
    } catch (error) {
      console.error("Failed to update question status:", error);
    }
  };

  const formatExplanation = (explanation: string, isCorrect: boolean, correctAnswer: string): string => {
    let cleanText = explanation.replace(/\n/g, ' ').replace(/\s+/g, ' ').trim();
    cleanText = cleanText.replace(/\d+\.\s*/g, '');
    cleanText = cleanText
      .replace('Correct Answer:', '')
      .replace('Evaluation:', '')
      .replace('Explanation:', '')
      .replace('Analysis:', '')
      .replace('Summary:', '');
  
    const points = cleanText
      .split('.')
      .map(point => point.trim())
      .filter(point => point.length > 0);
  
    if (isCorrect) {
      return `✓ ${points.join('.\n\n')}`;
    } else {
      return `✗ The correct answer is ${correctAnswer}.\n\n${points.join('.\n\n')}`;
    }
  };

  const handleSkip = () => {
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
      setCompanionMessage("");
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
      setCompanionMessage("");
    } else {
      navigate("/summary", {
        state: {
          topicId,
          selectedCompanion,
          questionType,
        },
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="flex gap-2">
            <div
              className="w-4 h-4 bg-[#00A3FF] rounded-full animate-bounce"
              style={{ animationDelay: "0s" }}
            />
            <div
              className="w-4 h-4 bg-[#00A3FF] rounded-full animate-bounce"
              style={{ animationDelay: "0.2s" }}
            />
            <div
              className="w-4 h-4 bg-[#00A3FF] rounded-full animate-bounce"
              style={{ animationDelay: "0.4s" }}
            />
          </div>
          <span className="text-[#00A3FF] text-xl font-medium">Loading...</span>
        </div>
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
      <div className="lg:w-[280px] w-full bg-[#101010] p-5 flex flex-col min-h-0 md:h-screen overflow-hidden">
        <div className="flex items-center justify-center gap-2 mb-4 md:mt-8">
          <button onClick={() => navigate("/")} className="flex items-center">
            <img src={logo} alt="LeanLearn Logo" className="w-[120px]" />
          </button>
        </div>

        <div className="flex flex-col min-h-0 md:flex-grow overflow-hidden md:justify-between">
          {companionMessage ? (
            <>
              <div 
                className="bg-[#141414] rounded-lg p-6 mb-4 overflow-y-auto max-h-[50vh] custom-scrollbar"
                style={{
                  '--scrollbar-width': '8px',
                  '--scrollbar-thumb-color': 'rgba(255, 255, 255, 0.2)',
                  '--scrollbar-track-color': 'rgba(0, 0, 0, 0.2)'
                } as React.CSSProperties}
              >
                <div className="space-y-4">
                  {companionMessage.split('.').map((sentence, index) => {
                    const trimmedSentence = sentence.trim();
                    if (trimmedSentence) {
                      return (
                        <p 
                          key={index} 
                          className="text-gray-300 leading-relaxed text-sm tracking-wide"
                        >
                          {trimmedSentence}.
                        </p>
                      );
                    }
                    return null;
                  })}
                </div>
              </div>

              {selectedCompanion && (
                <div className="mt-4 md:mt-0 flex-shrink-0 flex justify-center">
                  <img
                    src={companionImages[selectedCompanion as keyof typeof companionImages]}
                    alt="Selected Companion"
                    className="w-[180px] md:w-full h-auto object-contain md:max-h-[300px]"
                  />
                </div>
              )}
            </>
          ) : (
            selectedCompanion && (
              <div className="flex-shrink-0 flex justify-center md:mt-auto">
                <img
                  src={companionImages[selectedCompanion as keyof typeof companionImages]}
                  alt="Selected Companion"
                  className="w-[180px] md:w-full h-auto object-contain md:max-h-[300px]"
                />
              </div>
            )
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="h-screen flex items-center p-8">
          <div className="max-w-4xl mx-auto w-full">
            <div className="mb-8">
              <div className="text-white text-xl">
                {currentQuestion.question}
              </div>
            </div>

            <div className="mb-8">
              {questionType === "mcq" && (
                <div className="grid grid-cols-2 gap-6">
                  {(currentQuestion as MCQQuestion).options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleOptionSelect(option)}
                      className={`
                        p-6 rounded-lg border transition-all
                        ${
                          selectedAnswer === option
                            ? showFeedback
                              ? (currentQuestion as MCQQuestion).answers[0] === option
                                ? "border-green-400 bg-green-600/20"
                                : "border-red-400 bg-red-600/20"
                              : "border-[#00A3FF] bg-[#00A3FF]/20"
                            : "border-[#3A3B3D] bg-[#101113] hover:bg-[#1A1A1A]"
                        }
                      `}
                    >
                      <span className="text-white text-lg">{option}</span>
                    </button>
                  ))}
                </div>
              )}

              {questionType === "fill" && (
                <div className="grid grid-cols-2 gap-6">
                  {(currentQuestion as FillQuestion).choices.map((choice, index) => (
                    <button
                      key={index}
                      onClick={() => handleOptionSelect(choice)}
                      className={`
                        p-6 rounded-lg border transition-all
                        ${
                          selectedAnswer === choice
                            ? showFeedback
                              ? (currentQuestion as FillQuestion).answers[0] === choice
                                ? "border-green-400 bg-green-600/20"
                                : "border-red-400 bg-red-600/20"
                              : "border-[#00A3FF] bg-[#00A3FF]/20"
                            : "border-[#3A3B3D] bg-[#101113] hover:bg-[#1A1A1A]"
                        }
                      `}
                    >
                      <span className="text-white text-lg">{choice}</span>
                    </button>
                  ))}
                </div>
              )}

              {questionType === "tf" && (
                <div className="grid grid-cols-2 gap-6">
                  {["True", "False"].map((choice) => (
                    <button
                      key={choice}
                      onClick={() => handleOptionSelect(choice)}
                      className={`
                        p-6 rounded-lg border transition-all
                        ${
                          selectedAnswer === choice
                            ? showFeedback
                              ? (currentQuestion as TFQuestion).answer === choice
                                ? "border-green-400 bg-green-600/20"
                                : "border-red-400 bg-red-600/20"
                              : "border-[#00A3FF] bg-[#00A3FF]/20"
                            : "border-[#3A3B3D] bg-[#101113] hover:bg-[#1A1A1A]"
                        }
                      `}
                    >
                      <span className="text-white text-lg">{choice}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="flex justify-between items-center">
              <div>
                {showFeedback && (
                  <div className="flex items-center gap-2">
                    <span className={isCorrect ? "text-green-500" : "text-red-500"}>
                      {isCorrect ? (
                        <FaCheckCircle size={36} />
                      ) : (
                        <FaTimesCircle size={36} />
                      )}
                    </span>
                    <span className={isCorrect ? "text-green-500" : "text-red-500"}>
                        {isCorrect
                              ? "Correct!"
                              : `Incorrect. The correct answer was: ${
                                  questionType === "tf"
                                    ? (currentQuestion as TFQuestion).answer
                                    : questionType === "mcq"
                                      ? (currentQuestion as MCQQuestion).answers[0]
                                      : (currentQuestion as FillQuestion).answers[0]
                                }`}
                          </span>
                        </div>
                      )}
                    </div>
      
                    <div className="flex gap-3">
                      {!showFeedback && (
                        <button
                          onClick={handleSkip}
                          className="px-6 py-2 rounded-lg bg-[#101113] text-white hover:bg-[#1A1A1A] transition-colors"
                        >
                          Skip
                        </button>
                      )}
                      {!showFeedback ? (
                        <button
                          onClick={handleAnswerSubmit}
                          disabled={!selectedAnswer}
                          className="px-6 py-2 rounded-lg bg-[#00A3FF] text-white hover:bg-[#0086CC] transition-colors disabled:opacity-50"
                        >
                          Submit
                        </button>
                      ) : (
                        <button
                          onClick={handleNext}
                          className="px-6 py-2 rounded-lg bg-[#00A3FF] text-white hover:bg-[#0086CC] transition-colors"
                        >
                          Next
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      };
      
      export default SelectedTopicPage;