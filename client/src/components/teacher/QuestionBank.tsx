import React, { useEffect, useState } from 'react';
  import { useNavigate } from 'react-router-dom';
  import leanLearnLogo from '../../assets/images/Logo.png';
  import { mcqQuestionApi, fillQuestionApi, tfQuestionApi } from '../../lib/api/questions';
  
  
  
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
        path: '/teacher/dashboard'
      },
      {
        id: 'question-bank',
        label: 'Question Bank',
        icon: (
          <svg width="33" height="32" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6.49951 5H8.48951C9.54333 5 10.4076 5.8164 10.484 6.85081L10.4895 7V25C10.4895 26.0538 9.67311 26.9181 8.6387 26.9945L8.48951 27H6.49951C5.44569 27 4.5814 26.1836 4.505 25.1492L4.49951 25V7C4.49951 5.94618 5.31591 5.08188 6.35032 5.00549L6.49951 5H8.48951H6.49951ZM13.4945 5H15.4895C16.5433 5 17.4076 5.8164 17.484 6.85081L17.4895 7V25C17.4895 26.0538 16.6731 26.9181 15.6387 26.9945L15.4895 27H13.4945C12.4397 27 11.5763 26.1836 11.5 25.1492L11.4945 25V7C11.4945 5.94618 12.31 5.08188 13.3452 5.00549L13.4945 5H15.4895H13.4945ZM22.6301 7.0264C23.4734 7.0264 24.2458 7.56409 24.523 8.38602L24.5691 8.5434L28.4291 24.0264C28.6849 25.0487 28.1025 26.0847 27.1166 26.4099L26.9731 26.4514L25.0101 26.9404C24.8481 26.9804 24.6851 27.0004 24.5251 27.0004C23.6809 27.0004 22.9093 26.4618 22.6322 25.6406L22.5861 25.4834L18.7251 10.0004C18.4702 8.97617 19.0527 7.94101 20.0386 7.6168L20.1821 7.5754L22.1451 7.0864C22.3071 7.0464 22.4701 7.0264 22.6301 7.0264ZM8.48951 6.5H6.49951C6.25507 6.5 6.05013 6.67778 6.0076 6.91043L5.99951 7V25C5.99951 25.2444 6.17729 25.4494 6.40994 25.4919L6.49951 25.5H8.48951C8.73484 25.5 8.93909 25.3222 8.98145 25.0896L8.98951 25V7C8.98951 6.75556 8.81252 6.55062 8.57935 6.50809L8.48951 6.5ZM15.4895 6.5H13.4945C13.2492 6.5 13.0449 6.67778 13.0026 6.91043L12.9945 7V25C12.9945 25.2444 13.1715 25.4494 13.4047 25.4919L13.4945 25.5H15.4895C15.7348 25.5 15.9391 25.3222 15.9815 25.0896L15.9895 25V7C15.9895 6.75556 15.8125 6.55062 15.5794 6.50809L15.4895 6.5ZM22.6301 8.5264L22.5686 8.53015L22.5071 8.5414L20.5451 9.0304C20.3069 9.08996 20.1516 9.31149 20.1671 9.5475L20.1811 9.6364L24.0411 25.1204C24.1061 25.3804 24.3381 25.5004 24.5251 25.5004L24.5865 25.4965L24.6471 25.4844L26.6101 24.9954C26.8483 24.9358 27.0036 24.7151 26.9881 24.4786L26.9741 24.3894L23.1131 8.9054C23.0481 8.6444 22.8171 8.5264 22.6301 8.5264Z" fill="white"/>
          </svg>
  
        ),
        path: '/teacher/question-bank'
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
  
    const classes = [
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
  
          const allQuestions = [...mcqQuestions, ...fillQuestions, ...tfQuestions];
  
          const counts = allQuestions.reduce((acc: { [key: string]: number }, question) => {
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
      localStorage.removeItem('imageUrls');
      navigate(`/teacher/question-bank/class/${classId}`);
    };
  
    return (
      <div className="flex min-h-screen bg-black">
  <div className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-[#111111] transition-all duration-300 ease-in-out`}>
    <div className={`p-4 flex ${isSidebarOpen ? 'gap-2' : 'justify-center'} items-center`}>
      <button 
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="text-white hover:text-gray-300 focus:outline-none"
      >
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