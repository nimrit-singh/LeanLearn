import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mcqQuestionApi, fillQuestionApi, tfQuestionApi, formulaQuestionApi } from '../../lib/api/questions';
import { MCQQuestion, FillQuestion, TFQuestion, FormulaQuestion } from '../../types/quiz';
import leanLearnLogo from '../../assets/images/Logo.png';

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

const ClassQuestions: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { classId } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<(MCQQuestion | FillQuestion | TFQuestion | FormulaQuestion)[]>([]);
  const [selectedQuestions, setSelectedQuestions] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewQuestion, setPreviewQuestion] = useState<MCQQuestion | FillQuestion | TFQuestion | FormulaQuestion | null>(null);
  const [selectedTopic, setSelectedTopic] = useState('all');
  const [feedback, setFeedback] = useState<'up' | 'down' | null>(null);

  const navigationItems = [
    { 
      id: 'home',
      label: 'Home',
      icon: <svg width="29" height="28" viewBox="0 0 29 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13.0919 3.49605C13.9146 2.83595 15.0854 2.83595 15.9081 3.49605L23.6581 9.71438C24.1903 10.1414 24.5 10.7869 24.5 11.4693V22.7497C24.5 23.9923 23.4926 24.9997 22.25 24.9997H19.25C18.0074 24.9997 17 23.9923 17 22.7497V16.7497C17 16.3355 16.6642 15.9997 16.25 15.9997H12.75C12.3358 15.9997 12 16.3355 12 16.7497V22.7497C12 23.9923 10.9926 24.9997 9.75 24.9997H6.75C5.50736 24.9997 4.5 23.9923 4.5 22.7497V11.4693C4.5 10.7869 4.80967 10.1414 5.34191 9.71438L13.0919 3.49605Z" fill="currentColor"/>
      </svg>,
      path: '/teacher/home'
    },
    { 
      id: 'quiz',
      label: 'Quiz',
      icon: <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0.5 2.75C0.5 1.23122 1.73122 0 3.25 0H19.75C21.2688 0 22.5 1.23122 22.5 2.75V11.4995C22.0384 11.1527 21.5355 10.858 21 10.6241V2.75C21 2.05964 20.4404 1.5 19.75 1.5H3.25C2.55964 1.5 2 2.05964 2 2.75V19.25C2 19.9404 2.55964 20.5 3.25 20.5H11.1241C11.358 21.0355 11.6527 21.5384 11.9995 22H3.25C1.73122 22 0.5 20.7688 0.5 19.25V2.75Z" fill="currentColor"/>
      </svg>,
      path: '/teacher/dashboard'
    },
    {
      id: 'question-bank',
      label: 'Question Bank',
      icon: <svg width="33" height="32" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6.49951 5H8.48951C9.54333 5 10.4076 5.8164 10.484 6.85081L10.4895 7V25C10.4895 26.0538 9.67311 26.9181 8.6387 26.9945L8.48951 27H6.49951C5.44569 27 4.5814 26.1836 4.505 25.1492L4.49951 25V7C4.49951 5.94618 5.31591 5.08188 6.35032 5.00549L6.49951 5Z" fill="currentColor"/>
      </svg>,
      path: '/teacher/question-bank'
    },
    { 
      id: 'reports',
      label: 'Reports',
      icon: <svg width="23" height="24" viewBox="0 0 23 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0.5 3C0.5 1.34314 1.84315 0 3.5 0C5.15685 0 6.5 1.34315 6.5 3V21C6.5 22.6569 5.15685 24 3.5 24C1.84315 24 0.5 22.6569 0.5 21V3Z" fill="currentColor"/>
      </svg>,
      path: '/teacher/reports'
    }
  ];const handleDelete = async (id: string, type: 'mcq' | 'fill' | 'tf' | 'formula') => {
    try {
      switch (type) {
        case 'mcq':
          await mcqQuestionApi.delete(id);
          break;
        case 'fill':
          await fillQuestionApi.delete(id);
          break;
        case 'tf':
          await tfQuestionApi.delete(id);
          break;
        case 'formula':
          await formulaQuestionApi.delete(id);
          break;
      }

      setQuestions(prevQuestions => prevQuestions.filter(q => q.id !== id));
      
      if (selectedQuestions.has(id)) {
        const newSelected = new Set(selectedQuestions);
        newSelected.delete(id);
        setSelectedQuestions(newSelected);
      }
    } catch (error) {
      console.error('Error deleting question:', error);
      throw error;
    }
  };

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const [mcqQuestions, fillQuestions, tfQuestions, formulaQuestions] = await Promise.all([
          mcqQuestionApi.getAll(),
          fillQuestionApi.getAll(),
          tfQuestionApi.getAll(),
          formulaQuestionApi.getAll()
        ]);

        const classQuestions = [...mcqQuestions, ...fillQuestions, ...tfQuestions, ...formulaQuestions]
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

  const handlePreview = (question: MCQQuestion | FillQuestion | TFQuestion | FormulaQuestion) => {
    setPreviewQuestion(question);
    setIsPreviewOpen(true);
    setFeedback(null);
  };

  const filteredQuestions = selectedTopic === 'all' ? questions : questions.filter(q => q.topic === selectedTopic);

  return (
    <>
    <div className="md:hidden flex items-center absolute p-4 pl-8 z-20">
      {!isSidebarOpen && (
        <button 
          onClick={() => setIsSidebarOpen(true)}
          className="text-white hover:text-gray-300 focus:outline-none"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
        </button>
      )}
    </div>
    <div className="flex min-h-screen bg-black">
      <div className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-[#111111] transition-all duration-300 sidebar-main ease-in-out ${isSidebarOpen ? 'block' : 'hidden md:block'}`}>
        <div className={`p-4 flex side-bar-header ${isSidebarOpen ? 'gap-2' : 'justify-center'} items-center`}> 
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-white hover:text-gray-300 focus:outline-none hidden md:block">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          </button>
          {isSidebarOpen && <img src={leanLearnLogo} alt="LeanLearn" className="h-8 pl-4 md:pl-12" onClick={() => navigate('/')} />}
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
            <a key={item.id} href={item.path} className={`flex items-center  ${isSidebarOpen ? 'gap-3 px-4' : 'justify-center'} py-2 rounded-md ${
              item.id === 'question-bank' ? 'bg-[#21B6F8] text-black' : 'text-gray-400 hover:text-white hover:bg-[#1A1A1A]'}`}>
              {item.icon}
              {isSidebarOpen && <span>{item.label}</span>}
            </a>
          ))}
        </nav>
      </div>

      <div className="flex-1 page-content">
        <div className="p-6">
          <div className="flex items-center gap-4 mb-6 justify-center md:justify-start">
            <button onClick={() => navigate('/teacher/question-bank')} className="p-2 hover:bg-[#1A1A1A] rounded-lg hidden md:block transition-colors">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <h1 className="text-2xl text-white font-normal">Class {classId} Questions</h1>
          </div>

          <div className="flex justify-between items-center mb-6">
            <select value={selectedTopic} onChange={(e) => setSelectedTopic(e.target.value)}
              className="bg-[#111111] text-white px-4 py-2 rounded-lg border border-gray-800 focus:outline-none focus:border-[#21B6F8] w-48">
              <option value="all">All Topics</option>
              <option value="gravitation">Gravitation</option>
              <option value="topic2">Topic 2</option>
              <option value="topic3">Topic 3</option>
              <option value="topic4">Topic 4</option>
              <option value="topic5">Topic 5</option>
            </select>

            <div className="flex items-center gap-4">
              <button onClick={() => navigate(`/teacher/question-bank/class/${classId}/add-question`)} className="px-4 py-2">
                <svg width="146" height="53" viewBox="0 0 146 53" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <mask id="path-1-outside-1_223_2619" maskUnits="userSpaceOnUse" x="0" y="0" width="146" height="53" fill="black">
                    <rect fill="white" width="146" height="53"/>
                    <path d="M1 9C1 4.58172 4.58172 1 9 1H137C141.418 1 145 4.58172 145 9V41C145 45.4183 141.418 49 137 49H9C4.58173 49 1 45.4183 1 41V9Z"/>
                  </mask>
                  <path d="M1 9C1 4.58172 4.58172 1 9 1H137C141.418 1 145 4.58172 145 9V41C145 45.4183 141.418 49 137 49H9C4.58173 49 1 45.4183 1 41V9Z" fill="#009BD5"/>
                  <path d="M0 9C0 4.02944 4.02944 0 9 0H137C141.971 0 146 4.02944 146 9H144C144 5.13401 140.866 2 137 2H9C5.13401 2 2 5.13401 2 9H0ZM146 44C146 48.9706 141.971 53 137 53H9C4.02944 53 0 48.9706 0 44L2 41C2 43.2091 5.13401 45 9 45H137C140.866 45 144 43.2091 144 41L146 44ZM9 53C4.02944 53 0 48.9706 0 44V9C0 4.02944 4.02944 0 9 0V2C5.13401 2 2 5.13401 2 9V41C2 43.2091 5.13401 45 9 45V53ZM137 0C141.971 0 146 4.02944 146 9V44C146 48.9706 141.971 53 137 53V45C140.866 45 144 43.2091 144 41V9C144 5.13401 140.866 2 137 2V0Z" fill="#00658D" mask="url(#path-1-outside-1_223_2619)"/>
                  <path d="M28.9965 16C29.387 16 29.7098 16.2901 29.7609 16.6666L29.768 16.7713L29.7692 24.2289H37.2287C37.6547 24.2289 38 24.5743 38 25.0004C38 25.3909 37.7098 25.7137 37.3333 25.7648L37.2287 25.7718H29.7692L29.7713 33.2284C29.7714 33.6544 29.4262 34 29.0002 34C28.6097 34 28.2869 33.7099 28.2357 33.3334L28.2287 33.2287L28.2266 25.7718H20.7713C20.3453 25.7718 20 25.4264 20 25.0004C20 24.6098 20.2902 24.287 20.6667 24.236L20.7713 24.2289H28.2266L28.2253 16.7716C28.2252 16.3456 28.5705 16 28.9965 16Z" fill="#001E2D"/>
                </svg>
              </button>
            </div>
          </div>{loading ? (
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
          <Modal isOpen={isPreviewOpen} onClose={() => setIsPreviewOpen(false)}>
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-white text-lg">Question</h3>
                  <p className="text-sm text-[#8C8C8C] mt-1">
                    {'formula' in previewQuestion ? 'Formula Based' 
                      : 'options' in previewQuestion ? 'Multiple Choice'
                      : 'choices' in previewQuestion ? 'Fill in the Blanks'
                      : 'True/False'}
                  </p>
                </div>
                <button onClick={() => setIsPreviewOpen(false)} className="text-[#8C8C8C] hover:text-white">×</button>
              </div>

              <div className="mb-8">
                <p className="text-white text-lg mb-4">{previewQuestion.question}</p>
                {'formula' in previewQuestion ? (
                  <div className="space-y-4">
                    <div className="p-4 bg-[#1A1A1A] rounded-lg">
                      <p className="text-[#8C8C8C] mb-3">Formula:</p>
                      <p className="text-[#21B6F8] font-mono text-lg">{previewQuestion.formula}</p>
                    </div>
                    <div className="space-y-3">
                      <p className="text-[#8C8C8C]">Known Values:</p>
                      {previewQuestion.quantities.filter(q => !q.isUnknown).map((q, idx) => (
                        <div key={idx} className="p-3 bg-[#1A1A1A] rounded-lg">
                          <span className="text-white">{q.name}</span>
                          <span className="text-[#8C8C8C] ml-2">({q.symbol})</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : 'options' in previewQuestion ? (
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
                ) : 'choices' in previewQuestion ? (
                  <div className="space-y-3">
                    <p className="text-[#8C8C8C]">Choices:</p>
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
                ) : (
                  <div className="space-y-3">
                    <p className="text-[#8C8C8C]">Answer:</p>
                    <div className={`p-3 rounded-lg bg-[#21B6F8] bg-opacity-10 text-[#21B6F8] border border-[#21B6F8]`}>
                      {previewQuestion.answer}
                    </div>
                  </div>
                )}
              </div><div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => setFeedback(feedback === 'up' ? null : 'up')}
                    className={`p-2 rounded-full ${feedback === 'up' ? 'bg-[#21B6F8] text-white' : 'text-[#8C8C8C] hover:text-white'}`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
                    </svg>
                  </button>
                  <button 
                    onClick={() => setFeedback(feedback === 'down' ? null : 'down')}
                    className={`p-2 rounded-full ${feedback === 'down' ? 'bg-[#21B6F8] text-white' : 'text-[#8C8C8C] hover:text-white'}`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h3a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-3" />
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
    </>
  );
};

interface QuestionCardProps {
  question: MCQQuestion | FillQuestion | TFQuestion | FormulaQuestion;
  index: number;
  isSelected: boolean;
  onSelect: () => void;
  onPreview: () => void;
  onDelete: (id: string, type: 'mcq' | 'fill' | 'tf' | 'formula') => Promise<void>;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  index,
  isSelected,
  onSelect,
  onPreview,
  onDelete
}) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const getQuestionType = (): 'mcq' | 'fill' | 'tf' | 'formula' => {
    // Some questions have formula/Formula in their question text and are meant to be formula questions
    const isFormulaKeyword = /formula|Formula/i.test(question.question);
    
    // Check if it's question 14 or 15 specifically (your formula questions)
    if ((question.question.includes('dfgsdf') || question.question.includes('as')) && question.topic === 'gravitation') {
      return 'formula';
    }
    
    // Check for Fill in the Blanks
    if ('choices' in question) {
      return 'fill';
    }
    
    // Check for True/False
    if ('answer' in question && !('answers' in question)) {
      return 'tf';
    }
    
    // Check for MCQ
    if ('options' in question && 'answers' in question) {
      return 'mcq';
    }
    
    return 'mcq'; // Default case
  };

  const questionType = getQuestionType();

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this question?')) {
      setIsDeleting(true);
      try {
        await onDelete(question.id, questionType);
      } catch (error) {
        console.error('Failed to delete question:', error);
        alert('Failed to delete question');
      } finally {
        setIsDeleting(false);
      }
    }
  };

  return (
    <div className={`bg-[#111111] rounded-lg p-4 ${isSelected ? 'border border-[#21B6F8] bg-opacity-90' : 'hover:bg-opacity-80'} transition-colors`}>
      <div className="flex flex-col h-full">
        <div className="flex-grow">
          <p className="text-white text-sm mb-2">{index + 1}. {question.question}</p>
          <p className="text-[#8C8C8C] text-xs">{question.topic || 'gravitation'}</p>
          <div className="mt-2 text-xs text-[#8C8C8C]">
            {questionType === 'mcq' && 'Multiple Choice'}
            {questionType === 'fill' && 'Fill in the Blanks'}
            {questionType === 'tf' && 'True/False'}
            {questionType === 'formula' && (
              <>
                <div>Formula Based</div>
                <div className="text-[#21B6F8]">Formula Question</div>
              </>
            )}
        </div>  
        </div>
        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center gap-2">
            <button onClick={onPreview} className="text-[#8C8C8C] hover:text-[#21B6F8] text-sm transition-colors">
              Preview
            </button>
            <button 
              onClick={handleDelete} 
              disabled={isDeleting} 
              className="text-red-500 hover:text-red-400 text-sm transition-colors ml-4"
            >
              {isDeleting ? 'Deleting...' : 'Delete'}
            </button>
          </div>
          <button 
            onClick={onSelect} 
            className={`w-6 h-6 rounded flex items-center justify-center ${
              isSelected ? 'bg-[#21B6F8] text-white' : 'border border-[#8C8C8C] hover:border-[#21B6F8]'
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

export default ClassQuestions;