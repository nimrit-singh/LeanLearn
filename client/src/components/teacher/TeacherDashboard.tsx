import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import leanLearnLogo from '../../assets/images/Logo.png';

interface Quiz {
  id: number;
  title: string;
  duration: string;
  questions: number;
  attempts: number;
  createdOn: string;
}

const TeacherDashboard: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedClass, setSelectedClass] = useState('Class 6');
  const [activeMenu, setActiveMenu] = useState<number | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const [expandDraft, setExpandDraft] = useState(true);
  const [expandOngoing, setExpandOngoing] = useState(true);
  const [expandCompleted, setExpandCompleted] = useState(true);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingQuiz, setEditingQuiz] = useState<Quiz | null>(null);
  
  const [draftQuizzes, setDraftQuizzes] = useState<Quiz[]>([
    { id: 1, title: 'Draft Quiz', duration: '30min', questions: 20, attempts: 1, createdOn: '04/11/2024' },
    { id: 2, title: 'Draft Quiz', duration: '30min', questions: 20, attempts: 1, createdOn: '04/11/2024' },
  ]);

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

  const handleMenuClick = (e: React.MouseEvent, quizId: number) => {
    e.stopPropagation();
    setActiveMenu(activeMenu === quizId ? null : quizId);
  };

  const handleEditClick = (e: React.MouseEvent, quiz: Quiz) => {
    e.stopPropagation();
    setEditingQuiz(quiz);
    setIsEditModalOpen(true);
    setActiveMenu(null);
  };

  const handlePreviewClick = (e: React.MouseEvent, quiz: Quiz) => {
    e.stopPropagation();
    navigate(`/preview-quiz/${quiz.id}`);
    setActiveMenu(null);
  };

  const handleShareClick = (e: React.MouseEvent, quiz: Quiz) => {
    e.stopPropagation();
    const shareLink = `${window.location.origin}/quiz/${quiz.id}`;
    navigator.clipboard.writeText(shareLink);
    alert('Share link copied to clipboard!');
    setActiveMenu(null);
  };

  const handleDeleteClick = (e: React.MouseEvent, quizId: number) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this quiz?')) {
      setDraftQuizzes(prevQuizzes => prevQuizzes.filter(quiz => quiz.id !== quizId));
    }
    setActiveMenu(null);
  };

  const handleEditSave = (updatedQuiz: Quiz) => {
    setDraftQuizzes(prevQuizzes =>
      prevQuizzes.map(quiz =>
        quiz.id === updatedQuiz.id ? { ...quiz, ...updatedQuiz } : quiz
      )
    );
    setIsEditModalOpen(false);
    setEditingQuiz(null);
  };

  return (
    <>
    
    <div className="md:hidden flex items-center absolute p-4 z-20">
        {!isSidebarOpen && ( // Only show the icon when the sidebar is closed
          <button 
            onClick={() => setIsSidebarOpen(true)} // Open sidebar on click
            className="text-white hover:text-gray-300 focus:outline-none"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          </button>
        )}
      </div>
    <div className="block md:flex min-h-screen bg-black ">
      {/* Sidebar */}
      <div className={`${
        isSidebarOpen ? 'w-64' : 'w-20'
      } bg-[#111111] transition-all duration-300 sidebar-main ease-in-out ${isSidebarOpen ? 'block' : 'hidden md:block'}`}>
        <div className={`p-4 flex side-bar-header ${isSidebarOpen ? 'gap-2' : 'justify-center'} items-center`}>
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-white hover:text-gray-300 focus:outline-none hidden md:block"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          </button>
          

          {isSidebarOpen && <img src={leanLearnLogo} alt="LeanLearn" className="h-8 pl-4 md:pl-12" onClick={() => navigate('/')} />}
          <button 
    onClick={() => setIsSidebarOpen(false)}
    className="text-white hover:text-gray-300 focus:outline-none block md:hidden"
>
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
    </svg>
</button>
        </div>

        <nav className="mt-8 flex flex-col gap-2 px-3 ">
          {navigationItems.map((item) => (
            <Link
              key={item.id}
              to={item.path}
              className={`flex items-center ${
                isSidebarOpen ? 'gap-3 px-4' : 'justify-center'
              } py-2 rounded-md transition-colors ${
                location.pathname === item.path
                  ? 'bg-[#21B6F8] text-white'
                  : 'text-gray-400 hover:text-white hover:bg-[#1A1A1A]'
              }`}
            >
              <span className="w-6 h-6">{item.icon}</span>
              {isSidebarOpen && <span>{item.label}</span>}
            </Link>
          ))}
        </nav>
      </div>

      <div className="flex-1 p-4 md:p-8 page-content-quiz">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div className="relative w-full md:w-auto">
            <select 
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="w-full md:w-auto bg-[#1A1A1A] text-white px-4 py-2 rounded-md focus:outline-none appearance-none pr-10"
            >
              {[...Array(12)].map((_, i) => (
                <option key={i + 1}>Class {i + 1}</option>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                <path d="M1 1L6 6L11 1" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
          </div>

          <button 
            onClick={() => navigate('/create-quiz')} 
            className="w-full md:w-auto"
          >
            <svg width="161" height="48" viewBox="0 0 161 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 8C0 3.58172 3.58172 0 8 0H153C157.418 0 161 3.58172 161 8V40C161 44.4183 157.418 48 153 48H8C3.58172 48 0 44.4183 0 40V8Z" fill="#21B6F8"/>
            <path d="M27.8834 15.0067L28 15C28.5128 15 28.9355 15.386 28.9933 15.8834L29 16V23H36C36.5128 23 36.9355 23.386 36.9933 23.8834L37 24C37 24.5128 36.614 24.9355 36.1166 24.9933L36 25H29V32C29 32.5128 28.614 32.9355 28.1166 32.9933L28 33C27.4872 33 27.0645 32.614 27.0067 32.1166L27 32V25H20C19.4872 25 19.0645 24.614 19.0067 24.1166L19 24C19 23.4872 19.386 23.0645 19.8834 23.0067L20 23H27V16C27 15.4872 27.386 15.0645 27.8834 15.0067L28 15L27.8834 15.0067Z" fill="#00131E"/>
            <path d="M62.272 29.144C61.1627 29.144 60.2133 28.9093 59.424 28.44C58.6347 27.9707 58.0267 27.304 57.6 26.44C57.184 25.576 56.976 24.5467 56.976 23.352C56.976 22.1573 57.184 21.1333 57.6 20.28C58.0267 19.416 58.6347 18.7493 59.424 18.28C60.2133 17.8107 61.1627 17.576 62.272 17.576C63.0507 17.576 63.7707 17.6987 64.432 17.944C65.0933 18.1893 65.648 18.5467 66.096 19.016L65.584 20.088C65.0933 19.6293 64.5813 19.2987 64.048 19.096C63.5253 18.8827 62.944 18.776 62.304 18.776C61.0347 18.776 60.064 19.176 59.392 19.976C58.72 20.776 58.384 21.9013 58.384 23.352C58.384 24.8027 58.72 25.9333 59.392 26.744C60.064 27.544 61.0347 27.944 62.304 27.944C62.944 27.944 63.5253 27.8427 64.048 27.64C64.5813 27.4267 65.0933 27.0907 65.584 26.632L66.096 27.704C65.648 28.1627 65.0933 28.52 64.432 28.776C63.7707 29.0213 63.0507 29.144 62.272 29.144ZM68.4816 29V21.224H69.7456V23.064H69.5856C69.767 22.4347 70.0816 21.96 70.5296 21.64C70.9776 21.3093 71.5696 21.1173 72.3056 21.064L72.7696 21.016L72.8656 22.136L72.0496 22.232C71.3243 22.296 70.7643 22.5307 70.3696 22.936C69.9856 23.3307 69.7936 23.8747 69.7936 24.568V29H68.4816ZM78.1263 29.144C77.3049 29.144 76.5956 28.984 75.9983 28.664C75.4116 28.3333 74.9529 27.8693 74.6223 27.272C74.3023 26.6747 74.1423 25.96 74.1423 25.128C74.1423 24.3173 74.3023 23.6133 74.6223 23.016C74.9423 22.408 75.3796 21.9333 75.9343 21.592C76.4996 21.2507 77.1503 21.08 77.8863 21.08C78.5903 21.08 79.1929 21.2347 79.6943 21.544C80.1956 21.8533 80.5796 22.2907 80.8463 22.856C81.1236 23.4213 81.2623 24.0987 81.2623 24.888V25.384H75.1343V24.536H80.3983L80.1423 24.744C80.1423 23.8907 79.9503 23.2293 79.5663 22.76C79.1929 22.28 78.6436 22.04 77.9183 22.04C77.3743 22.04 76.9103 22.168 76.5263 22.424C76.1529 22.6693 75.8703 23.016 75.6783 23.464C75.4863 23.9013 75.3903 24.4133 75.3903 25V25.096C75.3903 25.7467 75.4916 26.296 75.6943 26.744C75.9076 27.192 76.2223 27.5333 76.6383 27.768C77.0543 27.992 77.5503 28.104 78.1263 28.104C78.5849 28.104 79.0276 28.0347 79.4543 27.896C79.8916 27.7467 80.3023 27.5067 80.6863 27.176L81.1343 28.088C80.7823 28.408 80.3343 28.664 79.7903 28.856C79.2463 29.048 78.6916 29.144 78.1263 29.144ZM86.0859 29.144C85.5525 29.144 85.0725 29.0427 84.6459 28.84C84.2299 28.6267 83.8992 28.3387 83.6539 27.976C83.4085 27.6133 83.2859 27.208 83.2859 26.76C83.2859 26.184 83.4299 25.7307 83.7179 25.4C84.0165 25.0693 84.5019 24.8347 85.1739 24.696C85.8565 24.5573 86.7845 24.488 87.9579 24.488H88.6779V25.336H87.9739C87.3232 25.336 86.7792 25.3573 86.3419 25.4C85.9045 25.4427 85.5579 25.5173 85.3019 25.624C85.0459 25.7307 84.8645 25.8693 84.7579 26.04C84.6512 26.2107 84.5979 26.424 84.5979 26.68C84.5979 27.1173 84.7472 27.4747 85.0459 27.752C85.3552 28.0293 85.7712 28.168 86.2939 28.168C86.7205 28.168 87.0939 28.0667 87.4139 27.864C87.7445 27.6613 88.0005 27.384 88.1819 27.032C88.3739 26.68 88.4699 26.2747 88.4699 25.816V23.992C88.4699 23.3307 88.3365 22.856 88.0699 22.568C87.8032 22.2693 87.3659 22.12 86.7579 22.12C86.2885 22.12 85.8352 22.1893 85.3979 22.328C84.9605 22.456 84.5125 22.6693 84.0539 22.968L83.6059 22.024C83.8832 21.832 84.1979 21.6667 84.5499 21.528C84.9019 21.3787 85.2699 21.2667 85.6539 21.192C86.0379 21.1173 86.4059 21.08 86.7579 21.08C87.4299 21.08 87.9845 21.192 88.4219 21.416C88.8592 21.6293 89.1845 21.96 89.3979 22.408C89.6112 22.8453 89.7179 23.4107 89.7179 24.104V29H88.5019V27.192H88.6459C88.5605 27.5973 88.3952 27.944 88.1499 28.232C87.9152 28.52 87.6219 28.744 87.2699 28.904C86.9179 29.064 86.5232 29.144 86.0859 29.144ZM95.7423 29.144C94.8249 29.144 94.1369 28.8987 93.6783 28.408C93.2196 27.9173 92.9903 27.2187 92.9903 26.312V22.232H91.4703V21.224H92.9903V18.84H94.2863V21.224H96.7503V22.232H94.2863V26.184C94.2863 26.792 94.4143 27.256 94.6703 27.576C94.9263 27.8853 95.3423 28.04 95.9183 28.04C96.0889 28.04 96.2596 28.0187 96.4303 27.976C96.6009 27.9333 96.7556 27.8907 96.8943 27.848L97.1183 28.84C96.9796 28.9147 96.7769 28.984 96.5103 29.048C96.2436 29.112 95.9876 29.144 95.7423 29.144ZM102.142 29.144C101.321 29.144 100.611 28.984 100.014 28.664C99.4272 28.3333 98.9685 27.8693 98.6379 27.272C98.3179 26.6747 98.1579 25.96 98.1579 25.128C98.1579 24.3173 98.3179 23.6133 98.6379 23.016C98.9579 22.408 99.3952 21.9333 99.9499 21.592C100.515 21.2507 101.166 21.08 101.902 21.08C102.606 21.08 103.209 21.2347 103.71 21.544C104.211 21.8533 104.595 22.2907 104.862 22.856C105.139 23.4213 105.278 24.0987 105.278 24.888V25.384H99.1499V24.536H104.414L104.158 24.744C104.158 23.8907 103.966 23.2293 103.582 22.76C103.209 22.28 102.659 22.04 101.934 22.04C101.39 22.04 100.926 22.168 100.542 22.424C100.169 22.6693 99.8859 23.016 99.6939 23.464C99.5019 23.9013 99.4059 24.4133 99.4059 25V25.096C99.4059 25.7467 99.5072 26.296 99.7099 26.744C99.9232 27.192 100.238 27.5333 100.654 27.768C101.07 27.992 101.566 28.104 102.142 28.104C102.601 28.104 103.043 28.0347 103.47 27.896C103.907 27.7467 104.318 27.5067 104.702 27.176L105.15 28.088C104.798 28.408 104.35 28.664 103.806 28.856C103.262 29.048 102.707 29.144 102.142 29.144ZM120.295 32.216L118.951 30.056C118.78 29.7573 118.546 29.528 118.247 29.368C117.948 29.2187 117.591 29.144 117.175 29.144L118.263 28.68C118.594 28.68 118.876 28.7173 119.111 28.792C119.356 28.8667 119.575 28.9893 119.767 29.16C119.959 29.3413 120.146 29.592 120.327 29.912L121.399 31.64L120.295 32.216ZM117.175 29.144C116.396 29.144 115.687 29.0107 115.047 28.744C114.407 28.4667 113.863 28.0773 113.415 27.576C112.967 27.0747 112.62 26.4667 112.375 25.752C112.14 25.0373 112.023 24.2373 112.023 23.352C112.023 22.456 112.14 21.656 112.375 20.952C112.62 20.2373 112.967 19.6347 113.415 19.144C113.863 18.6427 114.402 18.2587 115.031 17.992C115.671 17.7147 116.386 17.576 117.175 17.576C117.975 17.576 118.69 17.7093 119.319 17.976C119.959 18.2427 120.503 18.6267 120.951 19.128C121.41 19.6293 121.756 20.2373 121.991 20.952C122.236 21.656 122.359 22.4507 122.359 23.336C122.359 24.232 122.236 25.0373 121.991 25.752C121.746 26.4667 121.399 27.0747 120.951 27.576C120.503 28.0773 119.959 28.4667 119.319 28.744C118.69 29.0107 117.975 29.144 117.175 29.144ZM117.175 27.976C117.986 27.976 118.668 27.7947 119.223 27.432C119.788 27.0693 120.22 26.5413 120.519 25.848C120.818 25.1547 120.967 24.3227 120.967 23.352C120.967 22.3707 120.818 21.5387 120.519 20.856C120.22 20.1733 119.788 19.6507 119.223 19.288C118.668 18.9253 117.986 18.744 117.175 18.744C116.386 18.744 115.708 18.9253 115.143 19.288C114.588 19.6507 114.162 20.1787 113.863 20.872C113.564 21.5547 113.415 22.3813 113.415 23.352C113.415 24.3227 113.564 25.1547 113.863 25.848C114.162 26.5307 114.588 27.0587 115.143 27.432C115.708 27.7947 116.386 27.976 117.175 27.976ZM127.781 29.144C127.151 29.144 126.629 29.032 126.213 28.808C125.807 28.5733 125.498 28.2267 125.285 27.768C125.082 27.3093 124.981 26.7387 124.981 26.056V21.224H126.277V26.04C126.277 26.4987 126.335 26.8827 126.453 27.192C126.581 27.4907 126.778 27.7147 127.045 27.864C127.311 28.0027 127.642 28.072 128.036 28.072C128.485 28.072 128.874 27.9707 129.205 27.768C129.535 27.5653 129.797 27.2827 129.989 26.92C130.181 26.5573 130.277 26.1307 130.277 25.64V21.224H131.573V29H130.309V27.208H130.517C130.303 27.8373 129.951 28.3173 129.461 28.648C128.981 28.9787 128.421 29.144 127.781 29.144ZM134.337 19.288V17.832H135.937V19.288H134.337ZM134.497 29V21.224H135.793V29H134.497ZM138.38 29V28.136L143.068 21.896V22.232H138.38V21.224H144.268V22.088L139.532 28.36V27.992H144.444V29H138.38Z" fill="#00131E"/>
            </svg>
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <div 
              className="flex items-center justify-between mb-4 cursor-pointer"
              onClick={() => setExpandDraft(!expandDraft)}
            >
              <h2 className="text-white text-xl">Draft Quiz</h2>
              <svg 
                width="12" height="8" viewBox="0 0 12 8" fill="none"
                className={`transform transition-transform ${expandDraft ? 'rotate-0' : '-rotate-90'}`}
              >
                <path d="M1 1L6 6L11 1" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            
            {expandDraft && (
              <div className="space-y-4">
                {draftQuizzes.map((quiz) => (
                  <div 
                    key={quiz.id}
                    className="bg-[#1A1A1A] p-4 rounded-lg flex flex-col md:flex-row items-start md:items-center justify-between text-white hover:bg-[#2A2A2A] transition-colors cursor-pointer relative group border border-transparent hover:border-gray-800"
                  >
                    <div className="flex items-center gap-4 w-full md:w-auto mb-4 md:mb-0">
                      <div className="hidden md:block">
                      <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="64" height="64" rx="32" fill="#21B6F8"/>
                        <path d="M21 23.75C21 22.2312 22.2312 21 23.75 21H40.25C41.7688 21 43 22.2312 43 23.75V32.4995C42.5384 32.1527 42.0355 31.858 41.5 31.6241V23.75C41.5 23.0596 40.9404 22.5 40.25 22.5H23.75C23.0596 22.5 22.5 23.0596 22.5 23.75V40.25C22.5 40.9404 23.0596 41.5 23.75 41.5H31.6241C31.858 42.0355 32.1527 42.5384 32.4995 43H23.75C22.2312 43 21 41.7688 21 40.25V23.75ZM24.75 33.9981L32.5009 33.9981C32.154 34.4596 31.8591 34.9625 31.6249 35.4981L24.75 35.4981C24.3358 35.4981 24 35.1623 24 34.7481C24 34.3339 24.3358 33.9981 24.75 33.9981ZM24 38.7511C24 38.3369 24.3358 38.0011 24.75 38.0011L30.2523 38.0011C30.6665 38.0011 31.0023 38.3369 31.0023 38.7511C31.0023 39.1653 30.6665 39.5011 30.2523 39.5011L24.75 39.5011C24.3358 39.5011 24 39.1653 24 38.7511ZM29.5017 23.9997C29.803 23.9997 30.075 24.1801 30.1924 24.4577L32.9408 30.9606C33.1021 31.3421 32.9235 31.7821 32.542 31.9434C32.1605 32.1046 31.7204 31.9261 31.5592 31.5445L31.1184 30.5017H27.8821L27.4407 31.5448C27.2793 31.9263 26.8392 32.1047 26.4578 31.9433C26.0763 31.7819 25.8979 31.3418 26.0593 30.9603L28.8108 24.4574C28.9282 24.1799 29.2003 23.9996 29.5017 23.9997ZM28.5168 29.0017H30.4844L29.5011 26.6752L28.5168 29.0017ZM35.75 23.9999C36.1642 23.9999 36.5 24.3357 36.5 24.7499V26H37.7501C38.1643 26 38.5001 26.3358 38.5001 26.75C38.5001 27.1642 38.1643 27.5 37.7501 27.5H36.5V28.7476C36.5 29.1618 36.1642 29.4976 35.75 29.4976C35.3358 29.4976 35 29.1618 35 28.7476V27.5H33.7524C33.3382 27.5 33.0024 27.1642 33.0024 26.75C33.0024 26.3358 33.3382 26 33.7524 26H35V24.7499C35 24.3357 35.3358 23.9999 35.75 23.9999ZM45 38.5C45 42.0899 42.0899 45 38.5 45C34.9101 45 32 42.0899 32 38.5C32 34.9101 34.9101 32 38.5 32C42.0899 32 45 34.9101 45 38.5ZM39 34.5C39 34.2239 38.7761 34 38.5 34C38.2239 34 38 34.2239 38 34.5V38H34.5C34.2239 38 34 38.2239 34 38.5C34 38.7761 34.2239 39 34.5 39H38V42.5C38 42.7761 38.2239 43 38.5 43C38.7761 43 39 42.7761 39 42.5V39H42.5C42.7761 39 43 38.7761 43 38.5C43 38.2239 42.7761 38 42.5 38H39V34.5Z" fill="#001E2D"/>
                    </svg>

                      </div>
                      <div className="flex flex-col">
                        <span>{quiz.title}</span>
                        <span className="text-sm text-gray-400">Created on {quiz.createdOn}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8 w-full md:w-auto">
                      <div className="flex justify-between w-full md:w-auto gap-4 md:gap-8">
                        <div className="flex flex-col">
                          <span>{quiz.duration}</span>
                          <span className="text-sm text-gray-400">Time Period</span>
                        </div>
                        <div className="flex flex-col">
                          <span>{quiz.questions}</span>
                          <span className="text-sm text-gray-400">Questions</span>
                        </div>
                      </div>
                      
                      <div className="relative ml-auto md:ml-0">
                        <button 
                          className="p-2 hover:bg-gray-700 rounded-full focus:outline-none"
                          onClick={(e) => handleMenuClick(e, quiz.id)}
                        >
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z" fill="white"/>
                            <path d="M12 20C12.5523 20 13 19.5523 13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20Z" fill="white"/>
                          </svg>
                        </button>
                        {activeMenu === quiz.id && (
                          <div className="absolute right-0 mt-2 w-48 bg-[#2A2A2A] rounded-md shadow-lg py-1 z-10">
                            <button 
                              onClick={(e) => handleEditClick(e, quiz)}
                              className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-700"
                            >
                              Edit
                            </button>
                            <button 
                              onClick={(e) => handlePreviewClick(e, quiz)}
                              className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-700"
                            >
                              Preview
                            </button>
                            <button 
                              onClick={(e) => handleShareClick(e, quiz)}
                              className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-700"
                            >
                              Share
                            </button>
                            <button 
                              onClick={(e) => handleDeleteClick(e, quiz.id)}
                              className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-700"
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <div 
              className="flex items-center justify-between mb-4 cursor-pointer"
              onClick={() => setExpandOngoing(!expandOngoing)}
            >
              <h2 className="text-white text-xl">On-going Quiz</h2>
              <svg 
                width="12" height="8" viewBox="0 0 12 8" fill="none"
                className={`transform transition-transform ${expandOngoing ? 'rotate-0' : '-rotate-90'}`}
              >
                <path d="M1 1L6 6L11 1" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            {expandOngoing && <div className="space-y-4"></div>}
          </div>

          <div>
            <div 
              className="flex items-center justify-between mb-4 cursor-pointer"
              onClick={() => setExpandCompleted(!expandCompleted)}
            >
              <h2 className="text-white text-xl">Completed Quiz</h2>
              <svg 
                width="12" height="8" viewBox="0 0 12 8" fill="none"
                className={`transform transition-transform ${expandCompleted ? 'rotate-0' : '-rotate-90'}`}
              >
                <path d="M1 1L6 6L11 1" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            {expandCompleted && <div className="space-y-4"></div>}
          </div>
        </div>

        {isEditModalOpen && editingQuiz && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-[#1A1A1A] rounded-lg p-6 w-full max-w-md">
              <h2 className="text-white text-xl font-medium mb-4">Edit Quiz</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-white text-sm mb-2">Time Period</label>
                  <input
                    type="text"
                    value={editingQuiz.duration}
                    onChange={(e) => setEditingQuiz({ ...editingQuiz, duration: e.target.value })}
                    className="w-full bg-[#2A2A2A] text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-white text-sm mb-2">Questions</label>
                  <input
                    type="number"
                    value={editingQuiz.questions}
                    onChange={(e) => setEditingQuiz({ ...editingQuiz, questions: parseInt(e.target.value) })}
                    className="w-full bg-[#2A2A2A] text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="flex justify-end gap-3 mt-6">
                  <button
                    onClick={() => setIsEditModalOpen(false)}
                    className="px-4 py-2 text-white bg-gray-600 rounded-md hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleEditSave(editingQuiz)}
                    className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
    </>
  );
};

export default TeacherDashboard;