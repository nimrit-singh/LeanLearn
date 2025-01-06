import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  mcqQuestionApi,
  fillQuestionApi,
  tfQuestionApi,
  formulaQuestionApi,
} from "../../lib/api/questions";
import {
  MCQQuestion,
  FillQuestion,
  TFQuestion,
  FormulaQuestion,
} from "../../types/quiz";
import leanLearnLogo from "../../assets/images/Logo.png";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center">
      <div className="bg-[#1A1A1A] rounded-lg w-full max-w-2xl mx-4">
        {children}
      </div>
    </div>
  );
};

interface QuestionCardProps {
  question: MCQQuestion | FillQuestion | TFQuestion | FormulaQuestion;
  index: number;
  isSelected: boolean;
  onSelect: () => void;
  onPreview: () => void;
  onDelete: (
    id: string,
    type: "mcq" | "fill" | "tf" | "formula"
  ) => Promise<void>;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  index,
  isSelected,
  onSelect,
  onPreview,
  onDelete,
}) => {
  const isMCQ = "options" in question && !("quantities" in question);
  const isFillBlank = "choices" in question;
  const isTrueFalse = !("options" in question) && !("choices" in question);
  const isFormula = "quantities" in question;
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this question?")) {
      setIsDeleting(true);
      try {
        let type: "mcq" | "fill" | "tf" | "formula";
        if (isMCQ) type = "mcq";
        else if (isFillBlank) type = "fill";
        else if (isTrueFalse) type = "tf";
        else type = "formula";

        await onDelete(question.id, type);
      } catch (error) {
        console.error("Failed to delete question:", error);
        alert("Failed to delete question");
      } finally {
        setIsDeleting(false);
      }
    }
  };

  return (
    <div
      className={`bg-[#111111] rounded-lg p-4 ${
        isSelected
          ? "border border-[#21B6F8] bg-opacity-90"
          : "hover:bg-opacity-80"
      } transition-colors`}
    >
      <div className="flex flex-col h-full">
        <div className="flex-grow">
          <p className="text-white text-sm mb-2">
            {index + 1}. {question.question}
          </p>
          <p className="text-[#8C8C8C] text-xs">
            {question.topic || "gravitation"}
          </p>
          <div className="mt-2 text-xs text-[#8C8C8C]">
            {isMCQ && "Multiple Choice"}
            {isFillBlank && "Fill in the Blanks"}
            {isTrueFalse && "True/False"}
            {isFormula && "Formula Based"}
          </div>
          {isFormula && (
            <div className="mt-2 text-xs text-[#21B6F8]">
              Formula: {question.formula}
            </div>
          )}
        </div>
        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center gap-2">
            <button
              onClick={onPreview}
              className="text-[#8C8C8C] hover:text-[#21B6F8] text-sm transition-colors"
            >
              Preview
            </button>
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="text-red-500 hover:text-red-400 text-sm transition-colors ml-4"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </button>
          </div>
          <button
            onClick={onSelect}
            className={`w-6 h-6 rounded flex items-center justify-center ${
              isSelected
                ? "bg-[#21B6F8] text-white"
                : "border border-[#8C8C8C] hover:border-[#21B6F8]"
            }`}
          >
            {isSelected && (
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M11.6667 3.5L5.25 9.91667L2.33333 7"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

const ClassQuestions: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { classId } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<
    (MCQQuestion | FillQuestion | TFQuestion | FormulaQuestion)[]
  >([]);
  const [selectedQuestions, setSelectedQuestions] = useState<Set<string>>(
    new Set()
  );
  const [loading, setLoading] = useState(true);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewQuestion, setPreviewQuestion] = useState<
    MCQQuestion | FillQuestion | TFQuestion | FormulaQuestion | null
  >(null);
  const [selectedTopic, setSelectedTopic] = useState("all");
  const [feedback, setFeedback] = useState<"up" | "down" | null>(null);

  const navigationItems = [
    {
      id: "home",
      label: "Home",
      icon: (
        <svg
          width="29"
          height="28"
          viewBox="0 0 29 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13.0919 3.49605C13.9146 2.83595 15.0854 2.83595 15.9081 3.49605L23.6581 9.71438C24.1903 10.1414 24.5 10.7869 24.5 11.4693V22.7497C24.5 23.9923 23.4926 24.9997 22.25 24.9997H19.25C18.0074 24.9997 17 23.9923 17 22.7497V16.7497C17 16.3355 16.6642 15.9997 16.25 15.9997H12.75C12.3358 15.9997 12 16.3355 12 16.7497V22.7497C12 23.9923 10.9926 24.9997 9.75 24.9997H6.75C5.50736 24.9997 4.5 23.9923 4.5 22.7497V11.4693C4.5 10.7869 4.80967 10.1414 5.34191 9.71438L13.0919 3.49605ZM14.9694 4.666C14.6951 4.44597 14.3049 4.44597 14.0306 4.666L6.28064 10.8843C6.10322 11.0267 6 11.2418 6 11.4693V22.7497C6 23.1639 6.33579 23.4997 6.75 23.4997H9.75C10.1642 23.4997 10.5 23.1639 10.5 22.7497V16.7497C10.5 15.5071 11.5074 14.4997 12.75 14.4997H16.25C17.4926 14.4997 18.5 15.5071 18.5 16.7497V22.7497C18.5 23.1639 18.8358 23.4997 19.25 23.4997H22.25C22.6642 23.4997 23 23.1639 23 22.7497V11.4693C23 11.2418 22.8968 11.0267 22.7194 10.8843L14.9694 4.666Z"
            fill="white"
          />
        </svg>
      ),
      path: "/teacher/home",
    },
    {
      id: "quiz",
      label: "Quiz",
      icon: (
        <svg
          width="25"
          height="24"
          viewBox="0 0 25 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0.5 2.75C0.5 1.23122 1.73122 0 3.25 0H19.75C21.2688 0 22.5 1.23122 22.5 2.75V11.4995C22.0384 11.1527 21.5355 10.858 21 10.6241V2.75C21 2.05964 20.4404 1.5 19.75 1.5H3.25C2.55964 1.5 2 2.05964 2 2.75V19.25C2 19.9404 2.55964 20.5 3.25 20.5H11.1241C11.358 21.0355 11.6527 21.5384 11.9995 22H3.25C1.73122 22 0.5 20.7688 0.5 19.25V2.75ZM4.25 12.9981L12.0009 12.9981C11.654 13.4596 11.3591 13.9625 11.1249 14.4981L4.25 14.4981C3.83579 14.4981 3.5 14.1623 3.5 13.7481C3.5 13.3339 3.83579 12.9981 4.25 12.9981ZM3.5 17.7511C3.5 17.3369 3.83579 17.0011 4.25 17.0011L9.75231 17.0011C10.1665 17.0011 10.5023 17.3369 10.5023 17.7511C10.5023 18.1653 10.1665 18.5011 9.75231 18.5011L4.25 18.5011C3.83578 18.5011 3.5 18.1653 3.5 17.7511ZM9.00167 2.99966C9.303 2.99972 9.57504 3.18012 9.69235 3.45768L12.4408 9.96057C12.6021 10.3421 12.4235 10.7821 12.042 10.9434C11.6605 11.1046 11.2204 10.9261 11.0592 10.5445L10.6184 9.50171H7.38208L6.94073 10.5448C6.77932 10.9263 6.33923 11.1047 5.95775 10.9433C5.57628 10.7819 5.39789 10.3418 5.5593 9.96029L8.31081 3.45741C8.42823 3.1799 8.70034 2.9996 9.00167 2.99966ZM8.01677 8.00171H9.98444L9.00114 5.67524L8.01677 8.00171ZM15.25 2.99991C15.6642 2.99991 16 3.33569 16 3.74991V5H17.2501C17.6643 5 18.0001 5.33579 18.0001 5.75C18.0001 6.16421 17.6643 6.5 17.2501 6.5H16V7.7476C16 8.16181 15.6642 8.4976 15.25 8.4976C14.8358 8.4976 14.5 8.16181 14.5 7.7476V6.5H13.2524C12.8382 6.5 12.5024 6.16421 12.5024 5.75C12.5024 5.33579 12.8382 5 13.2524 5H14.5V3.74991C14.5 3.33569 14.8358 2.99991 15.25 2.99991ZM24.5 17.5C24.5 21.0899 21.5899 24 18 24C14.4101 24 11.5 21.0899 11.5 17.5C11.5 13.9101 14.4101 11 18 11C21.5899 11 24.5 13.9101 24.5 17.5ZM18.5 13.5C18.5 13.2239 18.2761 13 18 13C17.7239 13 17.5 13.2239 17.5 13.5V17H14C13.7239 17 13.5 17.2239 13.5 17.5C13.5 17.7761 13.7239 18 14 18H17.5V21.5C17.5 21.7761 17.7239 22 18 22C18.2761 22 18.5 21.7761 18.5 21.5V18H22C22.2761 18 22.5 17.7761 22.5 17.5C22.5 17.2239 22.2761 17 22 17H18.5V13.5Z"
            fill="white"
          />
        </svg>
      ),
      path: "/teacher/dashboard",
    },
    {
      id: "question-bank",
      label: "Question Bank",
      icon: (
        <svg
          width="33"
          height="32"
          viewBox="0 0 33 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.49951 5H8.48951C9.54333 5 10.4076 5.8164 10.484 6.85081L10.4895 7V25C10.4895 26.0538 9.67311 26.9181 8.6387 26.9945L8.48951 27H6.49951C5.44569 27 4.5814 26.1836 4.505 25.1492L4.49951 25V7C4.49951 5.94618 5.31591 5.08188 6.35032 5.00549L6.49951 5H8.48951H6.49951ZM13.4945 5H15.4895C16.5433 5 17.4076 5.8164 17.484 6.85081L17.4895 7V25C17.4895 26.0538 16.6731 26.9181 15.6387 26.9945L15.4895 27H13.4945C12.4397 27 11.5763 26.1836 11.5 25.1492L11.4945 25V7C11.4945 5.94618 12.31 5.08188 13.3452 5.00549L13.4945 5H15.4895H13.4945ZM22.6301 7.0264C23.4734 7.0264 24.2458 7.56409 24.523 8.38602L24.5691 8.5434L28.4291 24.0264C28.6849 25.0487 28.1025 26.0847 27.1166 26.4099L26.9731 26.4514L25.0101 26.9404C24.8481 26.9804 24.6851 27.0004 24.5251 27.0004C23.6809 27.0004 22.9093 26.4618 22.6322 25.6406L22.5861 25.4834L18.7251 10.0004C18.4702 8.97617 19.0527 7.94101 20.0386 7.6168L20.1821 7.5754L22.1451 7.0864C22.3071 7.0464 22.4701 7.0264 22.6301 7.0264ZM8.48951 6.5H6.49951C6.25507 6.5 6.05013 6.67778 6.0076 6.91043L5.99951 7V25C5.99951 25.2444 6.17729 25.4494 6.40994 25.4919L6.49951 25.5H8.48951C8.73484 25.5 8.93909 25.3222 8.98145 25.0896L8.98951 25V7C8.98951 6.75556 8.81252 6.55062 8.57935 6.50809L8.48951 6.5ZM15.4895 6.5H13.4945C13.2492 6.5 13.0449 6.67778 13.0026 6.91043L12.9945 7V25C12.9945 25.2444 13.1715 25.4494 13.4047 25.4919L13.4945 25.5H15.4895C15.7348 25.5 15.9391 25.3222 15.9815 25.0896L15.9895 25V7C15.9895 6.75556 15.8125 6.55062 15.5794 6.50809L15.4895 6.5ZM22.6301 8.5264L22.5686 8.53015L22.5071 8.5414L20.5451 9.0304C20.3069 9.08996 20.1516 9.31149 20.1671 9.5475L20.1811 9.6364L24.0411 25.1204C24.1061 25.3804 24.3381 25.5004 24.5251 25.5004L24.5865 25.4965L24.6471 25.4844L26.6101 24.9954C26.8483 24.9358 27.0036 24.7151 26.9881 24.4786L26.9741 24.3894L23.1131 8.9054C23.0481 8.6444 22.8171 8.5264 22.6301 8.5264Z"
            fill="white"
          />
        </svg>
      ),
      path: "/teacher/question-bank",
    },
    {
      id: "reports",
      label: "Reports",
      icon: (
        <svg
          width="23"
          height="24"
          viewBox="0 0 23 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0.5 3C0.5 1.34314 1.84315 0 3.5 0C5.15685 0 6.5 1.34315 6.5 3V21C6.5 22.6569 5.15685 24 3.5 24C1.84315 24 0.5 22.6569 0.5 21V3ZM3.5 2C2.94771 2 2.5 2.44772 2.5 3V21C2.5 21.5523 2.94772 22 3.5 22C4.05229 22 4.5 21.5523 4.5 21V3C4.5 2.44772 4.05228 2 3.5 2ZM8.5 9C8.5 7.34315 9.84315 6 11.5 6C13.1569 6 14.5 7.34315 14.5 9V21C14.5 22.6569 13.1569 24 11.5 24C9.84315 24 8.5 22.6569 8.5 21V9ZM11.5 8C10.9477 8 10.5 8.44772 10.5 9V21C10.5 21.5523 10.9477 22 11.5 22C12.0523 22 12.5 21.5523 12.5 21V9C12.5 8.44772 12.0523 8 11.5 8ZM19.5 12C17.8431 12 16.5 13.3431 16.5 15V21C16.5 22.6569 17.8431 24 19.5 24C21.1569 24 22.5 22.6569 22.5 21V15C22.5 13.3431 21.1569 12 19.5 12ZM18.5 15C18.5 14.4477 18.9477 14 19.5 14C20.0523 14 20.5 14.4477 20.5 15V21C20.5 21.5523 20.0523 22 19.5 22C18.9477 22 18.5 21.5523 18.5 21V15Z"
            fill="white"
          />
        </svg>
      ),
      path: "/teacher/reports",
    },
  ];

  const handleDelete = async (
    id: string,
    type: "mcq" | "fill" | "tf" | "formula"
  ) => {
    try {
      switch (type) {
        case "mcq":
          await mcqQuestionApi.delete(id);
          break;
        case "fill":
          await fillQuestionApi.delete(id);
          break;
        case "tf":
          await tfQuestionApi.delete(id);
          break;
        case "formula":
          await formulaQuestionApi.delete(id);
          break;
      }

      setQuestions((prevQuestions) => prevQuestions.filter((q) => q.id !== id));

      if (selectedQuestions.has(id)) {
        const newSelected = new Set(selectedQuestions);
        newSelected.delete(id);
        setSelectedQuestions(newSelected);
      }
    } catch (error) {
      console.error("Error deleting question:", error);
      throw error;
    }
  };

  console.log(previewQuestion?.resource);
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const [mcqQuestions, fillQuestions, tfQuestions, formulaQuestions] =
          await Promise.all([
            mcqQuestionApi.getAll(),
            fillQuestionApi.getAll(),
            tfQuestionApi.getAll(),
            formulaQuestionApi.getAll(),
          ]);

        const classQuestions = [
          ...mcqQuestions,
          ...fillQuestions,
          ...tfQuestions,
          ...formulaQuestions,
        ].filter((q) => q.class_.toString() === classId);

        setQuestions(classQuestions);
      } catch (error) {
        console.error("Error fetching questions:", error);
      } finally {
        setLoading(false);
      }
    };

    if (classId) {
      fetchQuestions();
    }
  }, [classId]);

  const toggleQuestion = (questionId: string) => {
    const newSelected = new Set(selectedQuestions);
    if (newSelected.has(questionId)) {
      newSelected.delete(questionId);
    } else {
      newSelected.add(questionId);
    }
    setSelectedQuestions(newSelected);
  };

  const handlePreview = (
    question: MCQQuestion | FillQuestion | TFQuestion | FormulaQuestion
  ) => {
    setPreviewQuestion(question);
    setIsPreviewOpen(true);
    setFeedback(null);
  };

  const filteredQuestions =
    selectedTopic === "all"
      ? questions
      : questions.filter((q) => q.topic === selectedTopic);

  return (
    <>
      {" "}
      <div className="md:hidden flex items-center absolute p-4 pl-8 z-20">
        {!isSidebarOpen && ( // Only show the icon when the sidebar is closed
          <button
            onClick={() => setIsSidebarOpen(true)} // Open sidebar on click
            className="text-white hover:text-gray-300 focus:outline-none"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        )}
      </div>
      <div className="flex min-h-screen bg-black">
        <div
          className={`${
            isSidebarOpen ? "w-64" : "w-20"
          } bg-[#111111] transition-all duration-300 sidebar-main ease-in-out ${
            isSidebarOpen ? "block" : "hidden md:block"
          }`}
        >
          <div
            className={`p-4 flex side-bar-header ${
              isSidebarOpen ? "gap-2" : "justify-center"
            } items-center`}
          >
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="text-white hover:text-gray-300 focus:outline-none hidden md:block"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            {isSidebarOpen && (
              <img
                src={leanLearnLogo}
                alt="LeanLearn"
                className="h-8 pl-4 md:pl-12"
                onClick={() => navigate("/")}
              />
            )}
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="text-white hover:text-gray-300 focus:outline-none block md:hidden"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <nav className="mt-8 flex flex-col gap-2 px-3">
            {navigationItems.map((item) => (
              <a
                key={item.id}
                href={item.path}
                className={`flex items-center  ${
                  isSidebarOpen ? "gap-3 px-4" : "justify-center"
                } py-2 rounded-md ${
                  item.id === "question-bank"
                    ? "bg-[#21B6F8] text-black"
                    : "text-gray-400 hover:text-white hover:bg-[#1A1A1A]"
                }`}
              >
                {item.icon}
                {isSidebarOpen && <span>{item.label}</span>}
              </a>
            ))}
          </nav>
        </div>

        <div className="flex-1 page-content">
          <div className="p-6">
            <div className="flex items-center gap-4 mb-6 justify-center md:justify-start">
              <button
                onClick={() => navigate("/teacher/question-bank")}
                className="p-2 hover:bg-[#1A1A1A] rounded-lg hidden md:block transition-colors"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    d="M15 19l-7-7 7-7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <h1 className="text-2xl text-white font-normal">
                Class {classId} Questions
              </h1>
            </div>

            <div className="flex justify-between items-center mb-6">
              <select
                value={selectedTopic}
                onChange={(e) => setSelectedTopic(e.target.value)}
                className="bg-[#111111] text-white px-4 py-2 rounded-lg border border-gray-800 focus:outline-none focus:border-[#21B6F8] w-48"
              >
                <option value="all">All Topics</option>
                <option value="gravitation">Gravitation</option>
                <option value="topic2">Topic 2</option>
                <option value="topic3">Topic 3</option>
                <option value="topic4">Topic 4</option>
                <option value="topic5">Topic 5</option>
              </select>

              <div className="flex items-center gap-4">
                <button
                  onClick={() => {
                    // Remove the item from localStorage
                    console.log(
                      "brforr removal:",
                      localStorage.getItem("imageUrl")
                    );
                    localStorage.removeItem("imageUrl");
                    console.log(
                      "After removal:",
                      localStorage.getItem("imageUrl")
                    ); // Debugging
                    // Navigate to the specified route
                    navigate(
                      `/teacher/question-bank/class/${classId}/add-question`
                    );
                  }}
                  className=" px-4 py-2 "
                >
                  <svg
                    width="146"
                    height="53"
                    viewBox="0 0 146 53"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <mask
                      id="path-1-outside-1_223_2619"
                      maskUnits="userSpaceOnUse"
                      x="0"
                      y="0"
                      width="146"
                      height="53"
                      fill="black"
                    >
                      <rect fill="white" width="146" height="53" />
                      <path d="M1 9C1 4.58172 4.58172 1 9 1H137C141.418 1 145 4.58172 145 9V41C145 45.4183 141.418 49 137 49H9C4.58173 49 1 45.4183 1 41V9Z" />
                    </mask>
                    <path
                      d="M1 9C1 4.58172 4.58172 1 9 1H137C141.418 1 145 4.58172 145 9V41C145 45.4183 141.418 49 137 49H9C4.58173 49 1 45.4183 1 41V9Z"
                      fill="#009BD5"
                    />
                    <path
                      d="M0 9C0 4.02944 4.02944 0 9 0H137C141.971 0 146 4.02944 146 9H144C144 5.13401 140.866 2 137 2H9C5.13401 2 2 5.13401 2 9H0ZM146 44C146 48.9706 141.971 53 137 53H9C4.02944 53 0 48.9706 0 44L2 41C2 43.2091 5.13401 45 9 45H137C140.866 45 144 43.2091 144 41L146 44ZM9 53C4.02944 53 0 48.9706 0 44V9C0 4.02944 4.02944 0 9 0V2C5.13401 2 2 5.13401 2 9V41C2 43.2091 5.13401 45 9 45V53ZM137 0C141.971 0 146 4.02944 146 9V44C146 48.9706 141.971 53 137 53V45C140.866 45 144 43.2091 144 41V9C144 5.13401 140.866 2 137 2V0Z"
                      fill="#00658D"
                      mask="url(#path-1-outside-1_223_2619)"
                    />
                    <path
                      d="M28.9965 16C29.387 16 29.7098 16.2901 29.7609 16.6666L29.768 16.7713L29.7692 24.2289H37.2287C37.6547 24.2289 38 24.5743 38 25.0004C38 25.3909 37.7098 25.7137 37.3333 25.7648L37.2287 25.7718H29.7692L29.7713 33.2284C29.7714 33.6544 29.4262 34 29.0002 34C28.6097 34 28.2869 33.7099 28.2357 33.3334L28.2287 33.2287L28.2266 25.7718H20.7713C20.3453 25.7718 20 25.4264 20 25.0004C20 24.6098 20.2902 24.287 20.6667 24.236L20.7713 24.2289H28.2266L28.2253 16.7716C28.2252 16.3456 28.5705 16 28.9965 16Z"
                      fill="#001E2D"
                    />
                    <path
                      d="M57.304 31L62.28 19.72H63.4L68.376 31H67.016L65.624 27.784L66.264 28.12H59.384L60.04 27.784L58.664 31H57.304ZM62.824 21.256L60.248 27.32L59.864 27.016H65.784L65.432 27.32L62.856 21.256H62.824ZM73.2541 31.144C72.5608 31.144 71.9528 30.9787 71.4301 30.648C70.9181 30.3173 70.5181 29.8533 70.2301 29.256C69.9528 28.648 69.8141 27.9333 69.8141 27.112C69.8141 26.28 69.9528 25.5653 70.2301 24.968C70.5181 24.36 70.9181 23.896 71.4301 23.576C71.9528 23.2453 72.5608 23.08 73.2541 23.08C73.9581 23.08 74.5608 23.256 75.0621 23.608C75.5635 23.96 75.8995 24.4347 76.0701 25.032H75.8941V19.72H77.1901V31H75.9261V29.144H76.0861C75.9155 29.752 75.5741 30.2373 75.0621 30.6C74.5608 30.9627 73.9581 31.144 73.2541 31.144ZM73.5261 30.104C74.2621 30.104 74.8435 29.848 75.2701 29.336C75.7075 28.8133 75.9261 28.072 75.9261 27.112C75.9261 26.1413 75.7075 25.4 75.2701 24.888C74.8435 24.376 74.2621 24.12 73.5261 24.12C72.8008 24.12 72.2195 24.376 71.7821 24.888C71.3448 25.4 71.1261 26.1413 71.1261 27.112C71.1261 28.072 71.3448 28.8133 71.7821 29.336C72.2195 29.848 72.8008 30.104 73.5261 30.104ZM83.0823 31.144C82.3889 31.144 81.7809 30.9787 81.2582 30.648C80.7463 30.3173 80.3463 29.8533 80.0583 29.256C79.7809 28.648 79.6423 27.9333 79.6423 27.112C79.6423 26.28 79.7809 25.5653 80.0583 24.968C80.3463 24.36 80.7463 23.896 81.2582 23.576C81.7809 23.2453 82.3889 23.08 83.0823 23.08C83.7863 23.08 84.3889 23.256 84.8903 23.608C85.3916 23.96 85.7276 24.4347 85.8983 25.032H85.7223V19.72H87.0183V31H85.7543V29.144H85.9143C85.7436 29.752 85.4023 30.2373 84.8903 30.6C84.3889 30.9627 83.7863 31.144 83.0823 31.144ZM83.3543 30.104C84.0903 30.104 84.6716 29.848 85.0983 29.336C85.5356 28.8133 85.7543 28.072 85.7543 27.112C85.7543 26.1413 85.5356 25.4 85.0983 24.888C84.6716 24.376 84.0903 24.12 83.3543 24.12C82.6289 24.12 82.0476 24.376 81.6103 24.888C81.1729 25.4 80.9543 26.1413 80.9543 27.112C80.9543 28.072 81.1729 28.8133 81.6103 29.336C82.0476 29.848 82.6289 30.104 83.3543 30.104ZM94.7358 31V19.72H95.7598L102.944 29.304H102.56V19.72H103.776V31H102.784L95.5998 21.416H95.9678V31H94.7358ZM110.408 31.144C109.586 31.144 108.877 30.984 108.28 30.664C107.693 30.3333 107.234 29.8693 106.904 29.272C106.584 28.6747 106.424 27.96 106.424 27.128C106.424 26.3173 106.584 25.6133 106.904 25.016C107.224 24.408 107.661 23.9333 108.216 23.592C108.781 23.2507 109.432 23.08 110.168 23.08C110.872 23.08 111.474 23.2347 111.976 23.544C112.477 23.8533 112.861 24.2907 113.128 24.856C113.405 25.4213 113.544 26.0987 113.544 26.888V27.384H107.416V26.536H112.68L112.424 26.744C112.424 25.8907 112.232 25.2293 111.848 24.76C111.474 24.28 110.925 24.04 110.2 24.04C109.656 24.04 109.192 24.168 108.808 24.424C108.434 24.6693 108.152 25.016 107.96 25.464C107.768 25.9013 107.672 26.4133 107.672 27V27.096C107.672 27.7467 107.773 28.296 107.976 28.744C108.189 29.192 108.504 29.5333 108.92 29.768C109.336 29.992 109.832 30.104 110.408 30.104C110.866 30.104 111.309 30.0347 111.736 29.896C112.173 29.7467 112.584 29.5067 112.968 29.176L113.416 30.088C113.064 30.408 112.616 30.664 112.072 30.856C111.528 31.048 110.973 31.144 110.408 31.144ZM117.889 31L114.993 23.224H116.353L118.737 30.04H118.353L120.817 23.224H121.921L124.337 30.04H123.969L126.385 23.224H127.681L124.769 31H123.537L120.993 24.008H121.681L119.137 31H117.889Z"
                      fill="#00293C"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {loading ? (
              <div className="text-center py-8 text-white">Loading...</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredQuestions.map((question, index) => (
                  <QuestionCard
                    key={question.id}
                    question={question}
                    index={index}
                    isSelected={selectedQuestions.has(question.id)}
                    onSelect={() => toggleQuestion(question.id)}
                    onPreview={() => handlePreview(question)}
                    onDelete={handleDelete}
                  />
                ))}
                {filteredQuestions.length === 0 && (
                  <div className="col-span-full text-center py-8 text-gray-400">
                    No questions found for this topic
                  </div>
                )}
              </div>
            )}
          </div>

          {isPreviewOpen && previewQuestion && (
            <Modal
              isOpen={isPreviewOpen}
              onClose={() => setIsPreviewOpen(false)}
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-white text-lg">Question</h3>
                    <p className="text-sm text-[#8C8C8C] mt-1">
                      {"quantities" in previewQuestion
                        ? "Formula Based"
                        : "options" in previewQuestion
                        ? "Multiple Choice"
                        : "choices" in previewQuestion
                        ? "Fill in the Blanks"
                        : "True/False"}
                    </p>
                  </div>
                  <button
                    onClick={() => setIsPreviewOpen(false)}
                    className="text-[#8C8C8C] hover:text-white"
                  >
                    ×
                  </button>
                </div>

                <div className="mb-8">
                  <p className="text-white text-lg mb-4">
                    {previewQuestion.question}
                  </p>
                  {"quantities" in previewQuestion ? (
                    <div className="space-y-4">
                      <div className="p-4 bg-[#1A1A1A] rounded-lg">
                        <p className="text-[#8C8C8C] mb-3">Formula:</p>
                        <p className="text-[#21B6F8] font-mono text-lg">
                          {previewQuestion.formula}
                        </p>
                      </div>
                      <div className="space-y-3">
                        <p className="text-[#8C8C8C]">Known Values:</p>
                        {previewQuestion.quantities
                          .filter((q) => !q.isUnknown)
                          .map((q, idx) => (
                            <div
                              key={idx}
                              className="p-3 bg-[#1A1A1A] rounded-lg"
                            >
                              <span className="text-white">{q.name}</span>
                              <span className="text-[#8C8C8C] ml-2">
                                ({q.symbol})
                              </span>
                            </div>
                          ))}
                      </div>
                    </div>
                  ) : "options" in previewQuestion ? (
                    <div className="space-y-3">
                      <p className="text-[#8C8C8C]">Options:</p>
                      {previewQuestion.options.map((option, idx) => (
                        <div
                          key={idx}
                          className={`p-3 rounded-lg flex items-center justify-between ${
                            previewQuestion.answers.includes(option)
                              ? "bg-[#21B6F8] bg-opacity-10 text-[#21B6F8] border border-[#21B6F8]"
                              : "bg-[#111111] text-white"
                          }`}
                        >
                          {!previewQuestion.resource && <div>{option}</div>}
                          {previewQuestion.resource &&
                            previewQuestion.options[idx] && (
                              <div>
                                {previewQuestion.resource[idx] ? (
                                  <img
                                    src={
                                      previewQuestion.resource[idx] ||
                                      "https://via.placeholder.com/150"
                                    }
                                    alt={`Option ${idx + 1}`}
                                    className="mt-2 w-[50px] h-[50px] rounded-lg"
                                  />
                                ) : (
                                  <div>{option}</div>
                                )}
                              </div>
                            )}
                        </div>
                      ))}
                    </div>
                  ) : "choices" in previewQuestion ? (
                    <div className="space-y-3">
                      <p className="text-[#8C8C8C]">Options:</p>
                      {previewQuestion.choices.map((choice, idx) => (
                        <div
                          key={idx}
                          className={`p-3 rounded-lg flex items-center justify-between  ${
                            previewQuestion.answers.includes(choice)
                              ? "bg-[#21B6F8] bg-opacity-10 text-[#21B6F8] border border-[#21B6F8]"
                              : "bg-[#111111] text-white"
                          }`}
                        >
                          {choice}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <p className="text-[#8C8C8C]">Options:</p>
                      {["True", "False"].map((option, idx) => (
                        <div
                          key={idx}
                          className={`p-3 rounded-lg flex items-center justify-between  ${
                            option === previewQuestion.answer
                              ? "bg-[#21B6F8] bg-opacity-10 text-[#21B6F8] border border-[#21B6F8]"
                              : "bg-[#111111] text-white"
                          }`}
                        >
                          {option}
                          {previewQuestion.resource &&
                            previewQuestion.resource[idx] && (
                              <img
                                src={
                                  previewQuestion.resource[idx] ||
                                  "https://via.placeholder.com/150"
                                }
                                alt={`Option ${idx + 1}`}
                                className="mt-2 w-[50px] h-[50px] rounded-lg"
                              />
                            )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() =>
                        setFeedback(feedback === "up" ? null : "up")
                      }
                      className={`p-2 rounded-full ${
                        feedback === "up"
                          ? "bg-[#21B6F8] text-white"
                          : "text-[#8C8C8C] hover:text-white"
                      }`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
                      </svg>
                    </button>
                    <button
                      onClick={() =>
                        setFeedback(feedback === "down" ? null : "down")
                      }
                      className={`p-2 rounded-full ${
                        feedback === "down"
                          ? "bg-[#21B6F8] text-white"
                          : "text-[#8C8C8C] hover:text-white"
                      }`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h3a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-3" />
                      </svg>
                    </button>
                    <span className="text-[#8C8C8C]">Provide Feedback</span>
                  </div>

                  <button
                    onClick={() => toggleQuestion(previewQuestion.id)}
                    className={`px-4 py-2 rounded ${
                      selectedQuestions.has(previewQuestion.id)
                        ? "bg-gray-600 text-white cursor-not-allowed"
                        : "bg-[#21B6F8] text-white hover:bg-opacity-90"
                    }`}
                    disabled={selectedQuestions.has(previewQuestion.id)}
                  >
                    {selectedQuestions.has(previewQuestion.id)
                      ? "Added to Quiz"
                      : "Add to Quiz"}
                  </button>
                </div>
              </div>
            </Modal>
          )}
        </div>
      </div>
    </>
  );
};

export default ClassQuestions;
