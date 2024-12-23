import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mcqQuestionApi, fillQuestionApi, tfQuestionApi } from '../../lib/api/questions';
import { MCQQuestion, FillQuestion, TFQuestion } from '../../types/quiz';
import leanLearnLogo from '../../assets/images/Logo.png';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <div 
        className="bg-[#111111] rounded-lg max-w-2xl w-full mx-4 overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

interface QuestionCardProps {
  question: MCQQuestion | FillQuestion | TFQuestion;
  isSelected: boolean;
  onSelect: () => void;
  onPreview: () => void;
  number: number;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  isSelected,
  onSelect,
  onPreview,
  number
}) => {
  return (
    <div className={`w-full rounded-lg p-4 transition-all duration-200 ${
      isSelected ? 'bg-[#21B6F8] bg-opacity-10 border border-[#21B6F8]' : 'bg-[#111111] hover:bg-opacity-80'
    }`}>
      <div className="flex flex-col space-y-3">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h3 className="text-base text-white mb-1">
              {number}. {question.question}
            </h3>
            <p className="text-sm text-[#8C8C8C]">{question.topic}</p>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onPreview();
              }}
              className="p-1 text-[#8C8C8C] hover:text-[#21B6F8] transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M2.5 10C3.875 6.25 6.8125 3.75 10 3.75C13.1875 3.75 16.125 6.25 17.5 10C16.125 13.75 13.1875 16.25 10 16.25C6.8125 16.25 3.875 13.75 2.5 10Z" stroke="currentColor"/>
                <path d="M10 12.5C11.3807 12.5 12.5 11.3807 12.5 10C12.5 8.61929 11.3807 7.5 10 7.5C8.61929 7.5 7.5 8.61929 7.5 10C7.5 11.3807 8.61929 12.5 10 12.5Z" stroke="currentColor"/>
              </svg>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onSelect();
              }}
              className={`w-5 h-5 rounded flex items-center justify-center transition-colors ${
                isSelected 
                  ? 'bg-[#21B6F8] text-white' 
                  : 'border border-[#8C8C8C] hover:border-[#21B6F8]'
              }`}
            >
              {isSelected && (
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const PreviewModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  question: MCQQuestion | FillQuestion | TFQuestion | null;
  onSelect: (questionId: string) => void;
  isSelected: boolean;
}> = ({ isOpen, onClose, question, onSelect, isSelected }) => {
  const [feedback, setFeedback] = useState<'up' | 'down' | null>(null);

  if (!question) return null;

  const handleAddToQuiz = () => {
    onSelect(question.id);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="bg-[#111111] w-full max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-[#1A1A1A]">
          <span className="text-white text-lg">Question</span>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="mb-6">
            <h2 className="text-white text-lg mb-4">
              {question.question}
            </h2>
            
            <div className="text-gray-400 mb-2">Options:</div>
            {'options' in question ? (
              <div className="space-y-2">
                {question.options.map((option, index) => (
                  <div key={index} className="p-3 bg-[#1A1A1A] rounded text-white">
                    {option}
                  </div>
                ))}
              </div>
            ) : 'choices' in question ? (
              <div className="space-y-2">
                {question.choices.map((choice, index) => (
                  <div key={index} className="p-3 bg-[#1A1A1A] rounded text-white">
                    {choice}
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex gap-4">
                <button className="px-4 py-2 bg-[#1A1A1A] rounded text-white hover:bg-[#2A2A2A]">
                  True
                </button>
                <button className="px-4 py-2 bg-[#1A1A1A] rounded text-white hover:bg-[#2A2A2A]">
                  False
                </button>
              </div>
            )}
          </div>

          <div className="flex justify-between items-center pt-4 border-t border-[#1A1A1A]">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setFeedback(feedback === 'up' ? null : 'up')}
                className={`flex items-center justify-center w-10 h-10 rounded-full transition-colors ${
                  feedback === 'up' 
                    ? 'bg-[#21B6F8] text-white' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
                </svg>
              </button>

              <button 
                onClick={() => setFeedback(feedback === 'down' ? null : 'down')}
                className={`flex items-center justify-center w-10 h-10 rounded-full transition-colors ${
                  feedback === 'down' 
                    ? 'bg-[#21B6F8] text-white' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h3a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-3"></path>
                </svg>
              </button>

              <span className="text-gray-400">Provide Feedback</span>
            </div>

            <button 
              onClick={handleAddToQuiz}
              className={`px-4 py-2 rounded transition-colors ${
                isSelected 
                  ? 'bg-gray-600 text-white cursor-not-allowed'
                  : 'bg-[#21B6F8] text-black hover:bg-[#1CA1E3]'
              }`}
              disabled={isSelected}
            >
              {isSelected ? 'Added to Quiz' : 'Add to Quiz'}
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

const QuestionSelection: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const [allQuestions, setAllQuestions] = useState<(MCQQuestion | FillQuestion | TFQuestion)[]>([]);
  const [selectedQuestions, setSelectedQuestions] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [previewQuestion, setPreviewQuestion] = useState<MCQQuestion | FillQuestion | TFQuestion | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const navigationItems = [
    { 
      id: 'home',
      label: 'Home',
      icon: (
        <svg width="29" height="28" viewBox="0 0 29 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13.0919 3.49605C13.9146 2.83595 15.0854 2.83595 15.9081 3.49605L23.6581 9.71438C24.1903 10.1414 24.5 10.7869 24.5 11.4693V22.7497C24.5 23.9923 23.4926 24.9997 22.25 24.9997H19.25C18.0074 24.9997 17 23.9923 17 22.7497V16.7497C17 16.3355 16.6642 15.9997 16.25 15.9997H12.75C12.3358 15.9997 12 16.3355 12 16.7497V22.7497C12 23.9923 10.9926 24.9997 9.75 24.9997H6.75C5.50736 24.9997 4.5 23.9923 4.5 22.7497V11.4693C4.5 10.7869 4.80967 10.1414 5.34191 9.71438L13.0919 3.49605ZM14.9694 4.666C14.6951 4.44597 14.3049 4.44597 14.0306 4.666L6.28064 10.8843C6.10322 11.0267 6 11.2418 6 11.4693V22.7497C6 23.1639 6.33579 23.4997 6.75 23.4997H9.75C10.1642 23.4997 10.5 23.1639 10.5 22.7497V16.7497C10.5 15.5071 11.5074 14.4997 12.75 14.4997H16.25C17.4926 14.4997 18.5 15.5071 18.5 16.7497V22.7497C18.5 23.1639 18.8358 23.4997 19.25 23.4997H22.25C22.6642 23.4997 23 23.1639 23 22.7497V11.4693C23 11.2418 22.8968 11.0267 22.7194 10.8843L14.9694 4.666Z" fill="white"/>
        </svg>
      ),
      path: '/teacher/home'
    },
    { 
      id: 'quiz',
      label: 'Quiz',
      icon: (
        <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0.5 2.75C0.5 1.23122 1.73122 0 3.25 0H19.75C21.2688 0 22.5 1.23122 22.5 2.75V11.4995C22.0384 11.1527 21.5355 10.858 21 10.6241V2.75C21 2.05964 20.4404 1.5 19.75 1.5H3.25C2.55964 1.5 2 2.05964 2 2.75V19.25C2 19.9404 2.55964 20.5 3.25 20.5H11.1241C11.358 21.0355 11.6527 21.5384 11.9995 22H3.25C1.73122 22 0.5 20.7688 0.5 19.25V2.75ZM4.25 12.9981L12.0009 12.9981C11.654 13.4596 11.3591 13.9625 11.1249 14.4981L4.25 14.4981C3.83579 14.4981 3.5 14.1623 3.5 13.7481C3.5 13.3339 3.83579 12.9981 4.25 12.9981ZM3.5 17.7511C3.5 17.3369 3.83579 17.0011 4.25 17.0011L9.75231 17.0011C10.1665 17.0011 10.5023 17.3369 10.5023 17.7511C10.5023 18.1653 10.1665 18.5011 9.75231 18.5011L4.25 18.5011C3.83578 18.5011 3.5 18.1653 3.5 17.7511ZM9.00167 2.99966C9.303 2.99972 9.57504 3.18012 9.69235 3.45768L12.4408 9.96057C12.6021 10.3421 12.4235 10.7821 12.042 10.9434C11.6605 11.1046 11.2204 10.9261 11.0592 10.5445L10.6184 9.50171H7.38208L6.94073 10.5448C6.77932 10.9263 6.33923 11.1047 5.95775 10.9433C5.57628 10.7819 5.39789 10.3418 5.5593 9.96029L8.31081 3.45741C8.42823 3.1799 8.70034 2.9996 9.00167 2.99966ZM8.01677 8.00171H9.98444L9.00114 5.67524L8.01677 8.00171ZM15.25 2.99991C15.6642 2.99991 16 3.33569 16 3.74991V5H17.2501C17.6643 5 18.0001 5.33579 18.0001 5.75C18.0001 6.16421 17.6643 6.5 17.2501 6.5H16V7.7476C16 8.16181 15.6642 8.4976 15.25 8.4976C14.8358 8.4976 14.5 8.16181 14.5 7.7476V6.5H13.2524C12.8382 6.5 12.5024 6.16421 12.5024 5.75C12.5024 5.33579 12.8382 5 13.2524 5H14.5V3.74991C14.5 3.33569 14.8358 2.99991 15.25 2.99991ZM24.5 17.5C24.5 21.0899 21.5899 24 18 24C14.4101 24 11.5 21.0899 11.5 17.5C11.5 13.9101 14.4101 11 18 11C21.5899 11 24.5 13.9101 24.5 17.5ZM18.5 13.5C18.5 13.2239 18.2761 13 18 13C17.7239 13 17.5 13.2239 17.5 13.5V17H14C13.7239 17 13.5 17.2239 13.5 17.5C13.5 17.7761 13.7239 18 14 18H17.5V21.5C17.5 21.7761 17.7239 22 18 22C18.2761 22 18.5 21.7761 18.5 21.5V18H22C22.2761 18 22.5 17.7761 22.5 17.5C22.5 17.2239 22.2761 17 22 17H18.5V13.5Z" fill="white"/>
        </svg>
      ),
      path: '/create-quiz'
    },
    { 
      id: 'reports',
      label: 'Reports',
      icon: (
        <svg width="23" height="24" viewBox="0 0 23 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0.5 3C0.5 1.34314 1.84315 0 3.5 0C5.15685 0 6.5 1.34315 6.5 3V21C6.5 22.6569 5.15685 24 3.5 24C1.84315 24 0.5 22.6569 0.5 21V3ZM3.5 2C2.94771 2 2.5 2.44772 2.5 3V21C2.5 21.5523 2.94772 22 3.5 22C4.05229 22 4.5 21.5523 4.5 21V3C4.5 2.44772 4.05228 2 3.5 2ZM8.5 9C8.5 7.34315 9.84315 6 11.5 6C13.1569 6 14.5 7.34315 14.5 9V21C14.5 22.6569 13.1569 24 11.5 24C9.84315 24 8.5 22.6569 8.5 21V9ZM11.5 8C10.9477 8 10.5 8.44772 10.5 9V21C10.5 21.5523 10.9477 22 11.5 22C12.0523 22 12.5 21.5523 12.5 21V9C12.5 8.44772 12.0523 8 11.5 8ZM19.5 12C17.8431 12 16.5 13.3431 16.5 15V21C16.5 22.6569 17.8431 24 19.5 24C21.1569 24 22.5 22.6569 22.5 21V15C22.5 13.3431 21.1569 12 19.5 12ZM18.5 15C18.5 14.4477 18.9477 14 19.5 14C20.0523 14 20.5 14.4477 20.5 15V21C20.5 21.5523 20.0523 22 19.5 22C18.9477 22 18.5 21.5523 18.5 21V15Z" fill="white"/>
        </svg>
      ),
      path: '/teacher/reports'
    }
  ];

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const [mcqQuestions, fillQuestions, tfQuestions] = await Promise.all([
          mcqQuestionApi.getAll(),
          fillQuestionApi.getAll(),
          tfQuestionApi.getAll()
        ]);
        setAllQuestions([...mcqQuestions, ...fillQuestions, ...tfQuestions]);
      } catch (error) {
        console.error('Error fetching questions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isPreviewOpen) {
        setIsPreviewOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isPreviewOpen]);

  const toggleQuestion = (questionId: string) => {
    const newSelected = new Set(selectedQuestions);
    if (newSelected.has(questionId)) {
      newSelected.delete(questionId);
    } else if (newSelected.size < 20) {
      newSelected.add(questionId);
    }
    setSelectedQuestions(newSelected);
  };

  const handlePreview = (question: MCQQuestion | FillQuestion | TFQuestion) => {
    setPreviewQuestion(question);
    setIsPreviewOpen(true);
  };

  const handleSaveDraft = async () => {
    try {
      navigate('/teacher/dashboard');
    } catch (error) {
      console.error('Error saving draft:', error);
    }
  };

  const handleFinalize = async () => {
    try {
    } catch (error) {
      console.error('Error finalizing quiz:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading questions...</div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-black">
      <div className={`${
        isSidebarOpen ? 'w-64' : 'w-20'
      } bg-[#111111] transition-all duration-300 ease-in-out`}>
        <div className={`p-4 flex ${isSidebarOpen ? 'gap-2' : 'justify-center'} items-center`}>
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-white hover:text-gray-300 focus:outline-none"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          </button>
          {isSidebarOpen && <img src={leanLearnLogo} alt="LeanLearn" className="h-8" />}
        </div>

        <nav className="mt-8 flex flex-col gap-2 px-3">
          {navigationItems.map((item) => (
            <a
              key={item.id}
              href={item.path}
              className={`flex items-center ${
                isSidebarOpen ? 'gap-3 px-4' : 'justify-center'
              } py-2 rounded-md ${
                item.id === 'quiz'
                  ? 'bg-[#21B6F8] text-black'
                  : 'text-gray-400 hover:text-white hover:bg-[#1A1A1A]'
              }`}
            >
              <span className="w-6 h-6">{item.icon}</span>
              {isSidebarOpen && <span>{item.label}</span>}
            </a>
          ))}
        </nav>
      </div>

      <div className="flex-1">
        <div className="bg-[#111111] p-4 flex items-center gap-2 text-white">
          <span>Create Quiz</span>
          <span>›</span>
          <span className="text-[#21B6F8]">Select Questions</span>
        </div>

        <div className="p-6 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
          {allQuestions.map((question, index) => (
            <QuestionCard
              key={question.id}
              question={question}
              isSelected={selectedQuestions.has(question.id)}
              onSelect={() => toggleQuestion(question.id)}
              onPreview={() => handlePreview(question)}
              number={index + 1}
            />
          ))}
        </div>
      </div>

        <div className="fixed bottom-0 left-0 right-0 bg-[#111111] border-t border-[#1A1A1A] p-4">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <span className="text-white">
              {selectedQuestions.size} / {allQuestions.length} Questions
            </span>
            <div className="flex gap-4">
              <button
                onClick={handleSaveDraft}
                className="px-6 py-2 rounded-lg border border-[#21B6F8] text-[#21B6F8] hover:bg-[#21B6F8] hover:text-black transition-colors"
              >
                Save as Draft
              </button>
              <button
                onClick={handleFinalize}
                className="px-6 py-2 rounded-lg bg-[#21B6F8] text-black hover:bg-[#1CA1E3] transition-colors"
              >
                Finalize Quiz
              </button>
            </div>
          </div>
        </div>

        <PreviewModal
          isOpen={isPreviewOpen}
          onClose={() => setIsPreviewOpen(false)}
          question={previewQuestion}
          onSelect={toggleQuestion}
          isSelected={previewQuestion ? selectedQuestions.has(previewQuestion.id) : false}
        />
      </div>
    </div>
  );
};

export default QuestionSelection;