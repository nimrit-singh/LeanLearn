import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import leanLearnLogo from '../../assets/images/Logo.png';
import { mcqQuestionApi, fillQuestionApi, tfQuestionApi } from '../../lib/api/questions';
import { MCQQuestion, FillQuestion, TFQuestion } from '../../types/quiz';

interface ClassData {
  id: number;
  name: string;
  questionCount: number;
}

const QuestionBank: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);
  const [classQuestionCounts, setClassQuestionCounts] = useState<{ [key: string]: number }>({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const navigationItems = [
    { 
      id: 'home',
      label: 'Home',
      icon: (
        <svg width="29" height="28" viewBox="0 0 29 28" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M13.0919 3.49605C13.9146 2.83595 15.0854 2.83595 15.9081 3.49605L23.6581 9.71438C24.1903 10.1414 24.5 10.7869 24.5 11.4693V22.7497C24.5 23.9923 23.4926 24.9997 22.25 24.9997H19.25C18.0074 24.9997 17 23.9923 17 22.7497V16.7497C17 16.3355 16.6642 15.9997 16.25 15.9997H12.75C12.3358 15.9997 12 16.3355 12 16.7497V22.7497C12 23.9923 10.9926 24.9997 9.75 24.9997H6.75C5.50736 24.9997 4.5 23.9923 4.5 22.7497V11.4693C4.5 10.7869 4.80967 10.1414 5.34191 9.71438L13.0919 3.49605Z" fill="white"/>
        </svg>
      ),
      path: '/teacher/home'
    },
    { 
      id: 'quiz',
      label: 'Quiz',
      icon: (
        <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0.5 2.75C0.5 1.23122 1.73122 0 3.25 0H19.75C21.2688 0 22.5 1.23122 22.5 2.75V11.4995C22.0384 11.1527 21.5355 10.858 21 10.6241V2.75C21 2.05964 20.4404 1.5 19.75 1.5H3.25C2.55964 1.5 2 2.05964 2 2.75V19.25C2 19.9404 2.55964 20.5 3.25 20.5H11.1241C11.358 21.0355 11.6527 21.5384 11.9995 22H3.25C1.73122 22 0.5 20.7688 0.5 19.25V2.75Z" fill="white"/>
        </svg>
      ),
      path: '/teacher/dashboard'
    },
    {
      id: 'question-bank',
      label: 'Question Bank',
      icon: (
        <svg width="33" height="32" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6.49951 5H8.48951C9.54333 5 10.4076 5.8164 10.484 6.85081L10.4895 7V25C10.4895 26.0538 9.67311 26.9181 8.6387 26.9945L8.48951 27H6.49951C5.44569 27 4.5814 26.1836 4.505 25.1492L4.49951 25V7C4.49951 5.94618 5.31591 5.08188 6.35032 5.00549L6.49951 5ZM13.4945 5H15.4895C16.5433 5 17.4076 5.8164 17.484 6.85081L17.4895 7V25C17.4895 26.0538 16.6731 26.9181 15.6387 26.9945L15.4895 27H13.4945C12.4397 27 11.5763 26.1836 11.5 25.1492L11.4945 25V7C11.4945 5.94618 12.31 5.08188 13.3452 5.00549L13.4945 5Z" fill="white"/>
        </svg>
      ),
      path: '/teacher/question-bank'
    },
    { 
      id: 'reports',
      label: 'Reports',
      icon: (
        <svg width="23" height="24" viewBox="0 0 23 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0.5 3C0.5 1.34314 1.84315 0 3.5 0C5.15685 0 6.5 1.34315 6.5 3V21C6.5 22.6569 5.15685 24 3.5 24C1.84315 24 0.5 22.6569 0.5 21V3Z" fill="white"/>
        </svg>
      ),
      path: '/teacher/reports'
    }
  ];

  const classes: ClassData[] = [
    { id: 8, name: 'Class 8', questionCount: 0 },
    { id: 9, name: 'Class 9', questionCount: 0 },
    { id: 10, name: 'Class 10', questionCount: 0 },
    { id: 11, name: 'Class 11', questionCount: 0 },
    { id: 12, name: 'Class 12', questionCount: 0 },
  ];

  useEffect(() => {
    const fetchQuestionCounts = async () => {
      try {
        const [mcqQuestions, fillQuestions, tfQuestions] = await Promise.all([
          mcqQuestionApi.getAll(),
          fillQuestionApi.getAll(),
          tfQuestionApi.getAll()
        ]);

        // Combine all questions
        const allQuestions = [...mcqQuestions, ...fillQuestions, ...tfQuestions];

        // Count questions by class
        const counts = allQuestions.reduce((acc: { [key: string]: number }, question: MCQQuestion | FillQuestion | TFQuestion) => {
          if (question.class_) {
            const classNumber = question.class_.toString();
            acc[classNumber] = (acc[classNumber] || 0) + 1;
          }
          return acc;
        }, {});

        setClassQuestionCounts(counts);
      } catch (error) {
        console.error('Error fetching questions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestionCounts();
  }, []);

  const handleClassSelect = (classId: number) => {
    navigate(`/teacher/question-bank/${classId}`);
  };

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
                  ? 'bg-[#21B6F8] text-white'
                  : 'text-gray-400 hover:text-white hover:bg-[#1A1A1A]'
              }`}
            >
              <span className="w-6 h-6">{item.icon}</span>
              {isSidebarOpen && <span>{item.label}</span>}
            </a>
          ))}
        </nav>
      </div>

      <div className="flex-1 p-8">
        <h1 className="text-white text-2xl font-normal mb-6 max-w-2xl mx-auto">Select Class</h1>
        
        <div className="space-y-2 max-w-2xl mx-auto">
          {loading ? (
            <div className="text-white text-center">Loading...</div>
          ) : (
            classes.map((classData) => (
              <div
                key={classData.id}
                onClick={() => handleClassSelect(classData.id)}
                className="bg-[#111111] rounded-lg p-4 flex items-center justify-between cursor-pointer hover:bg-opacity-70 group"
              >
                <div className="flex items-center gap-3">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 4h16M2 10h16M2 16h16" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                  <span className="text-white">Class {classData.id}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <span className="text-white text-sm">
                    {classQuestionCounts[classData.id.toString()] || 0} questions
                  </span>
                  <svg 
                    width="20" 
                    height="20" 
                    viewBox="0 0 20 20" 
                    fill="none" 
                    className="text-gray-400 group-hover:text-[#21B6F8] transition-colors"
                  >
                    <path 
                      d="M7.5 15L12.5 10L7.5 5" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default QuestionBank;