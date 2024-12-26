import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mcqQuestionApi, fillQuestionApi, tfQuestionApi } from '../../lib/api/questions';
import { MCQQuestion, FillQuestion, TFQuestion } from '../../types/quiz';
import leanLearnLogo from '../../assets/images/Logo.png';

// Modal Component
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

// Question Card Component
interface QuestionCardProps {
  question: MCQQuestion | FillQuestion | TFQuestion;
  index: number;
  isSelected: boolean;
  onSelect: () => void;
  onPreview: () => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  index,
  isSelected,
  onSelect,
  onPreview
}) => {
  const isMCQ = 'options' in question;
  const isFillBlank = 'choices' in question;

  return (
    <div 
      className={`bg-[#111111] rounded-lg p-4 ${
        isSelected ? 'border border-[#21B6F8] bg-opacity-90' : 'hover:bg-opacity-80'
      } transition-colors`}
    >
      <div className="flex flex-col h-full">
        <div className="flex-grow">
          <p className="text-white text-sm mb-2">
            {index + 1}. {question.question}
          </p>
          <p className="text-[#8C8C8C] text-xs">{question.topic || 'gravitation'}</p>
          <div className="mt-2 text-xs text-[#8C8C8C]">
            {isMCQ && 'Multiple Choice'}
            {isFillBlank && 'Fill in the Blanks'}
          </div>
        </div>
        <div className="flex justify-between items-center mt-4">
          <button 
            onClick={onPreview}
            className="text-[#8C8C8C] hover:text-[#21B6F8] text-sm transition-colors"
          >
            Preview
          </button>
          <button
            onClick={onSelect}
            className={`w-6 h-6 rounded flex items-center justify-center ${
              isSelected 
                ? 'bg-[#21B6F8] text-white' 
                : 'border border-[#8C8C8C] hover:border-[#21B6F8]'
            }`}
          >
            {isSelected && (
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M11.6667 3.5L5.25 9.91667L2.33333 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
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
  const [questions, setQuestions] = useState<(MCQQuestion | FillQuestion | TFQuestion)[]>([]);
  const [selectedQuestions, setSelectedQuestions] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [previewQuestion, setPreviewQuestion] = useState<MCQQuestion | FillQuestion | TFQuestion | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState('all');
  const [feedback, setFeedback] = useState<'up' | 'down' | null>(null);

  const navigationItems = [
    { 
      id: 'home',
      label: 'Home',
      path: '/teacher/home'
    },
    { 
      id: 'quiz',
      label: 'Quiz',
      path: '/teacher/dashboard'
    },
    {
      id: 'question-bank',
      label: 'Question Bank',
      path: '/teacher/question-bank'
    },
    { 
      id: 'reports',
      label: 'Reports',
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

        const classQuestions = [...mcqQuestions, ...fillQuestions, ...tfQuestions]
          .filter(q => q.class_.toString() === classId);
        
        setQuestions(classQuestions);
      } catch (error) {
        console.error('Error fetching questions:', error);
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

  const handlePreview = (question: MCQQuestion | FillQuestion | TFQuestion) => {
    setPreviewQuestion(question);
    setIsPreviewOpen(true);
    setFeedback(null);
  };

  const filteredQuestions = selectedTopic === 'all'
    ? questions
    : questions.filter(q => q.topic === selectedTopic);

  return (
    <div className="flex min-h-screen bg-black">
      {/* Sidebar */}
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
          {isSidebarOpen && <img src={leanLearnLogo} alt="LeanLearn" className="h-8 pl-4 md:pl-12" onClick={() => navigate('/')} />}
        </div>

        <nav className="mt-8 flex flex-col gap-2 px-3">
          {navigationItems.map((item) => (
            <a
              key={item.id}
              href={item.path}
              className={`flex items-center ${
                isSidebarOpen ? 'gap-3 px-4' : 'justify-center'
              } py-2 rounded-md ${
                item.id === 'question-bank'
                  ? 'bg-[#21B6F8] text-black'
                  : 'text-gray-400 hover:text-white hover:bg-[#1A1A1A]'
              }`}
            >
              {isSidebarOpen && <span>{item.label}</span>}
            </a>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <button 
              onClick={() => navigate('/teacher/question-bank')}
              className="p-2 hover:bg-[#1A1A1A] rounded-lg transition-colors"
            >
              <svg 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h1 className="text-2xl text-white font-normal">Class {classId} Questions</h1>
          </div>

          {/* Filters */}
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
              <button onClick={() => navigate('/teacher/question-bank/add')}
                className="px-6 py-2 bg-[#21B6F8] text-white rounded-lg hover:bg-opacity-90 transition-colors"
              >
                Add New
              </button>
            </div>
          </div>

          {/* Questions Grid */}
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

        {/* Preview Modal */}
        {isPreviewOpen && previewQuestion && (
          <Modal isOpen={isPreviewOpen} onClose={() => setIsPreviewOpen(false)}>
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-white text-lg">Question</h3>
                  <p className="text-sm text-[#8C8C8C] mt-1">
                    {'options' in previewQuestion ? 'Multiple Choice' : 'Fill in the Blanks'}
                  </p>
                </div>
                <button 
                  onClick={() => setIsPreviewOpen(false)}
                  className="text-[#8C8C8C] hover:text-white"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>

              <div className="mb-8">
                <p className="text-white text-lg mb-4">{previewQuestion.question}</p>
                
                {'options' in previewQuestion && (
                  <div className="space-y-3">
                    <p className="text-[#8C8C8C]">Options:</p>
                    {previewQuestion.options.map((option, idx) => (
                      <div key={idx} className={`p-3 rounded-lg ${
                        previewQuestion.answers.includes(option)
                          ? 'bg-[#21B6F8] bg-opacity-10 text-[#21B6F8] border border-[#21B6F8]'
                          : 'bg-[#111111] text-white'
                      }`}>
                        {option}
                      </div>
                    ))}
                  </div>
                )}

                {'choices' in previewQuestion && (
                  <div className="space-y-3">
                    <p className="text-[#8C8C8C]">Options:</p>
                    {previewQuestion.choices.map((choice, idx) => (
                      <div key={idx} className={`p-3 rounded-lg ${
                        previewQuestion.answers.includes(choice)
                          ? 'bg-[#21B6F8] bg-opacity-10 text-[#21B6F8] border border-[#21B6F8]'
                          : 'bg-[#111111] text-white'
                      }`}>
                        {choice}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => setFeedback(feedback === 'up' ? null : 'up')}
                    className={`p-2 rounded-full ${
                      feedback === 'up' 
                        ? 'bg-[#21B6F8] text-white' 
                        : 'text-[#8C8C8C] hover:text-white'
                    }`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  <button 
                    onClick={() => setFeedback(feedback === 'down' ? null : 'down')}
                    className={`p-2 rounded-full ${
                      feedback === 'down' 
                        ? 'bg-[#21B6F8] text-white' 
                        : 'text-[#8C8C8C] hover:text-white'
                    }`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h3a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-3" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  <span className="text-[#8C8C8C]">Provide Feedback</span>
                </div>

                <button
                  onClick={() => toggleQuestion(previewQuestion.id)}
                  className={`px-4 py-2 rounded ${
                    selectedQuestions.has(previewQuestion.id)
                      ? 'bg-gray-600 text-white cursor-not-allowed'
                      : 'bg-[#21B6F8] text-white hover:bg-opacity-90'
                  }`}
                  disabled={selectedQuestions.has(previewQuestion.id)}
                >
                  {selectedQuestions.has(previewQuestion.id) ? 'Added to Quiz' : 'Add to Quiz'}
                </button>
              </div>
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default ClassQuestions;