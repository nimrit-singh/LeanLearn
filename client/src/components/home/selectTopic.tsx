import React, { useState, useEffect } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import logo from "../../assets/images/Logo.png";
import einstein from "../../assets/Einstein.gif";
import newton from "../../assets/Newton.gif";
import galileo from "../../assets/Galileo.gif";
import raman from "../../assets/CV Raman.gif";
import { MCQQuestion, FillQuestion, TFQuestion } from "../../types/quiz";
import {
  mcqQuestionApi,
  fillQuestionApi,
  tfQuestionApi,
  aiApi,
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
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loadingCompanionMessage, setLoadingCompanionMessage] = useState(false); 
  const [companionMessage, setCompanionMessage] = useState<string>("");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(() => {
    const storedIndex = localStorage.getItem("currentQuestionIndex");
    return storedIndex ? parseInt(storedIndex, 10) : 0;
  });

  const borderColor = isCorrect ? 'border-green-500' : 'border-red-500';

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        const [mcqData, fillData] = await Promise.all([
          mcqQuestionApi.getAll(),
          fillQuestionApi.getAll()
        ]);
  
        console.log('MCQ Questions:', mcqData.length);
        console.log('Fill Questions:', fillData.length);
  
        const combinedQuestions: QuestionType[] = [...mcqData, ...fillData];
        
        console.log('Before filter - Combined Questions:', combinedQuestions.length);
  
        console.log('Current topicId:', topicId);
        
        const filteredQuestions = topicId 
          ? combinedQuestions.filter(q => {
              console.log('Question topic:', q.topic, 'Comparing with:', topicId);
              return q.topic?.toLowerCase() === topicId?.toLowerCase();
            })
          : combinedQuestions;
  
        console.log('After filter - Filtered Questions:', filteredQuestions.length);
  
        if (filteredQuestions.length > 0) {
          const shuffledQuestions = filteredQuestions.sort(() => Math.random() - 0.5);
          setQuestions(shuffledQuestions);
        } else {
          const shuffledAll = combinedQuestions.sort(() => Math.random() - 0.5);
          setQuestions(shuffledAll);
        }
  
      } catch (err) {
        console.error('Error in fetchQuestions:', err);
        setError("Failed to load questions");
      } finally {
        setLoading(false);
      }
    };
  
    fetchQuestions();
  }, [topicId]);

  const handleOptionSelect = (answer: string) => {
    setSelectedAnswers((prev) => {
      if (prev.includes(answer)) {
        return prev.filter((a) => a !== answer);
      } else if (prev.length < 2) {
        return [...prev, answer];
      }
      return prev;
    });
  };
  useEffect(() => {
    localStorage.setItem(
      "currentQuestionIndex",
      currentQuestionIndex.toString()
    );
  }, [currentQuestionIndex]);

  const handleAnswerSubmit = async () => {
    if (selectedAnswers.length === 0) return;

    const currentQuestion = questions[currentQuestionIndex];
    let correct = false;
    let correctAnswers: string[] = [];

    switch (questionType) {
      case "mcq":
        correctAnswers = (currentQuestion as MCQQuestion).answers;
        correct =
          selectedAnswers.every((answer) => correctAnswers.includes(answer)) &&
          correctAnswers.every((answer) => selectedAnswers.includes(answer));
        break;
      case "fill":
        correctAnswers = (currentQuestion as FillQuestion).answers;
        correct =
          selectedAnswers.every((answer) => correctAnswers.includes(answer)) &&
          correctAnswers.every((answer) => selectedAnswers.includes(answer));
        break;
      case "tf":
        correctAnswers = [(currentQuestion as TFQuestion).answer];
        correct = selectedAnswers[0] === (currentQuestion as TFQuestion).answer;
        break;
    }

    setIsCorrect(correct);
    setShowFeedback(true);
    setLoadingCompanionMessage(true);

    try {
      const requestData = {
        question: currentQuestion.question,
        topic: currentQuestion.topic || "physics",
        answer: correctAnswers.join(", "),
        chosen_answer: selectedAnswers.join(", "),
      };

      const explanation = await aiApi.explainAnswer(requestData);
      const formattedExplanation = formatExplanation(
        explanation,
        correct,
        correctAnswers.join(", ")
      );
      setCompanionMessage(formattedExplanation);
    } catch (error) {
      console.error("Failed to get AI explanation:", error);
      setCompanionMessage(
        correct
          ? `Well done! You got it right.`
          : `Not quite right. The correct answer(s) were: ${correctAnswers.join(
              ", "
            )}.`
      );
    } finally {
      setLoadingCompanionMessage(false);
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

  const formatExplanation = (
    explanation: string,
    isCorrect: boolean,
    correctAnswer: string
  ): string => {
    let cleanText = explanation.replace(/\n/g, " ").replace(/\s+/g, " ").trim();
    cleanText = cleanText.replace(/\d+\.\s*/g, "");
    cleanText = cleanText
      .replace("Correct Answer:", "")
      .replace("Evaluation:", "")
      .replace("Explanation:", "")
      .replace("Analysis:", "")
      .replace("Summary:", "");

    const points = cleanText
      .split(".")
      .map((point) => point.trim())
      .filter((point) => point.length > 0);

    if (isCorrect) {
      return `✓ ${points.join(".\n\n")}`;
    } else {
      return `✗ The correct answer is ${correctAnswer}.\n\n${points.join(
        ".\n\n"
      )}`;
    }
  };

  const handleSkip = () => {
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedAnswers([]);
      setShowFeedback(false);
      setCompanionMessage("");
    }
  };
  useEffect(() => {
    // Reset companion message when the current question index changes
    setCompanionMessage("");
  }, [currentQuestionIndex]);

  const handleNext = () => {
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedAnswers([]);
      setShowFeedback(false);
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
        <div className="flex items-center justify-start lg:justify-center gap-2 mb-4 md:mt-8">
          <button onClick={() => navigate("/")} className="flex  items-start ">
            <img src={logo} alt="LeanLearn Logo" className="w-[120px]" />
          </button>
        </div>

        {loadingCompanionMessage && (
          <p className="text-gray-300 leading-relaxed text-sm tracking-wide loading text-center mt-11">
            Loading Solution...
          </p>
        )}

        <div
          className={`flex ${
            companionMessage && "flex-row-reverse"
          } lg:flex-col min-h-0 md:flex-grow overflow-hidden md:justify-between`}
        >
          {companionMessage ? (
            <>
              <div
                className={ `bg-[#141414] border-2 ${borderColor}  rounded-lg p-2 lg:p-6 mb-4 overflow-y-auto max-h-[20vh] lg:max-h-[50vh] custom-scrollbar`}
                style={
                  {
                    "--scrollbar-width": "1px",
                    "--scrollbar-thumb-color": "rgba(255, 255, 255, 0.2)",
                    "--scrollbar-track-color": "rgba(0, 0, 0, 0.2)",
                  } as React.CSSProperties
                }
              >
                <div className="space-y-4">
                  {companionMessage.split(".").map((sentence, index) => {
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
                <div className="mt-4 md:mt-0 flex-shrink-0 flex items-end lg:justify-center">
                  <img
                    src={
                      companionImages[
                        selectedCompanion as keyof typeof companionImages
                      ]
                    }
                    alt="Selected Companion"
                    className="md:w-full h-[180px] lg:h-auto object-contain md:max-h-[300px]"
                  />
                </div>
              )}
            </>
          ) : (
            selectedCompanion && (
              <div className="flex-shrink-0 flex lg:justify-center md:mt-auto">
                <img
                  src={
                    companionImages[
                      selectedCompanion as keyof typeof companionImages
                    ]
                  }
                  alt="Selected Companion"
                  className=" md:w-full h-[180px] object-contain  lg:h-auto md:max-h-[300px]"
                />
              </div>
            )
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className=" h-auto lg:h-screen flex items-start lg:items-center p-3 lg:p-8">
          <div className="max-w-4xl mx-auto w-full">
            <div className="mb-8">
              <div className="text-white text-xl ">
                {currentQuestion.question}
              </div>
            </div>

            <div className="mb-8">
              {(questionType === "mcq" || questionType === "fill") && (
                <div className="grid grid-cols-2 gap-6">
                  {questionType === "mcq"
                    ? (currentQuestion as MCQQuestion).options.map(
                        (option, index) => (
                          <button
                            key={index}
                            onClick={() => handleOptionSelect(option)}
                            className={`
                           p-3 lg:p-6 rounded-lg border-2 transition-all
                            ${
                              selectedAnswers.includes(option)
                                ? showFeedback
                                  ? (
                                      currentQuestion as MCQQuestion
                                    ).answers.includes(option)
                                    ? "border-green-400 bg-green-600/20"
                                    : "border-red-400 bg-red-600/20"
                                  : "border-[#00A3FF] bg-[#00A3FF]/20"
                                : "border-[#3A3B3D] bg-[#101113] hover:bg-[#1A1A1A]"
                            }
                          `}
                          >
                            <span className="text-white text-sm lg:text-lg">
                              {option}
                            </span>
                          </button>
                        )
                      )
                    : (currentQuestion as FillQuestion).choices.map(
                        (choice, index) => (
                          <button
                            key={index}
                            onClick={() => handleOptionSelect(choice)}
                            className={`
                            p-6 rounded-lg border-2 transition-all
                            ${
                              selectedAnswers.includes(choice)
                                ? showFeedback
                                  ? (
                                      currentQuestion as FillQuestion
                                    ).answers.includes(choice)
                                    ? "border-green-400 bg-green-600/20"
                                    : "border-red-400 bg-red-600/20"
                                  : "border-[#00A3FF] bg-[#00A3FF]/20"
                                : "border-[#3A3B3D] bg-[#101113] hover:bg-[#1A1A1A]"
                            }
                          `}
                          >
                            <span className="text-white text-sm lg:text-lg">
                              {choice}
                            </span>
                          </button>
                        )
                      )}
                </div>
              )}

              {questionType === "tf" && (
                <div className="grid grid-cols-2 gap-6">
                  {["True", "False"].map((choice) => (
                    <button
                      key={choice}
                      onClick={() => handleOptionSelect(choice)}
                      className={`
                        p-6 rounded-lg border-2 transition-all
                        ${
                          selectedAnswers.includes(choice)
                            ? showFeedback
                              ? (currentQuestion as TFQuestion).answer ===
                                choice
                                ? "border-green-400 bg-green-600/20"
                                : "border-red-400 bg-red-600/20"
                              : "border-[#00A3FF] bg-[#00A3FF]/20"
                            : "border-[#3A3B3D] bg-[#101113] hover:bg-[#1A1A1A]"
                        }
                      `}
                    >
                      <span
                        className="text-white lg:text-lg"
                        style={{ fontSize: "14px" }}
                      >
                        {choice}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="flex justify-between items-center">
              <div>
                {showFeedback && (
                  <div className="flex items-center gap-2">
                    <span
                      className={isCorrect ? "text-green-500" : "text-red-500"}
                    >
                      {isCorrect ? (
                        <FaCheckCircle size={36} />
                      ) : (
                        <FaTimesCircle size={36} />
                      )}
                    </span>
                    <span
                      className={isCorrect ? "text-green-500" : "text-red-500"}
                    >
                      {isCorrect
                        ? "Correct!"
                        : `Incorrect. The correct answer(s) were: ${
                            questionType === "tf"
                              ? (currentQuestion as TFQuestion).answer
                              : (
                                  currentQuestion as MCQQuestion | FillQuestion
                                ).answers.join(", ")
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
                    disabled={selectedAnswers.length === 0}
                    className="px-6 py-2 rounded-lg bg-[#00A3FF] text-white hover:bg-[#0086CC] transition-colors disabled:opacity-50"
                  >
                    Submit
                  </button>
                ) : (
                  <button
                    disabled={loadingCompanionMessage}
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
