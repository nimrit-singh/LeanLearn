import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import einstein from '../../assets/Einstein.gif';
import newton from '../../assets/Newton.gif';
import galileo from '../../assets/Galileo.gif';
import raman from '../../assets/CV Raman.gif';
import logo from '../../assets/images/Logo.png';
import choiceCloud from '../../assets/images/choose.png';

const topics = [
  { id: 1, name: 'Topic 1' },
  { id: 2, name: 'Topic 2' },
  { id: 3, name: 'Topic 3' },
  { id: 4, name: 'Topic 4' },
  { id: 5, name: 'Topic 5' }
];

const companionImages = {
  1: einstein,
  2: newton,
  3: galileo,
  4: raman
};

const QuizPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCompanion, setSelectedCompanion] = useState<number>(1);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  useEffect(() => {
    const companion = localStorage.getItem('selectedCompanion');
    if (companion) {
      setSelectedCompanion(Number(companion));
    }
  }, []);

  const handleChangeMentor = () => {
    navigate('/select-mentor');
  };

  const handleTopicClick = (topicId: number) => {
    navigate(`/topic/${topicId}`, { state: { selectedCompanion } });
  };

  return (
    <>
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-[#181818] flex items-center justify-between px-4 z-50">
        <img
          src={logo}
          alt="LeanLearn Logo"
          className="h-8 absolute left-1/2 -translate-x-1/2"
        />
        <button 
          className="absolute right-4 p-2"
          onClick={() => setShowMobileMenu(!showMobileMenu)}
        >
          <div className="space-y-1.5">
            <div className="w-6 h-0.5 bg-white"></div>
            <div className="w-6 h-0.5 bg-white"></div>
            <div className="w-6 h-0.5 bg-white"></div>
          </div>
        </button>
      </div>

      {showMobileMenu && (
        <div className="lg:hidden fixed top-16 right-0 bg-[#181818] p-4 z-50 rounded-bl-lg">
          <button onClick={handleChangeMentor} className="text-white text-sm">
            Change Mentor
          </button>
        </div>
      )}

      <div className="flex flex-col lg:flex-row min-h-screen">
        <div className="w-[280px] bg-[#101010] p-5 hidden lg:flex flex-col">
          <img
            src={logo}
            alt="LeanLearn Logo"
            className="w-[120px] cursor-pointer ml-10 mx-auto lg:mx-0 fade-in"
            onClick={() => navigate('/')}
          />
          
          <button
            onClick={handleChangeMentor}
            className="flex items-center gap-2 w-full bg-[#181818] hover:bg-[#232323] text-white rounded-xl py-3 px-4 mb-8 transition-colors"
          >
            <svg 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M15 19l-7-7 7-7" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
            Change Mentor
          </button>

          <div className="relative">
            <img src={choiceCloud} alt="Choice Cloud" className="w-full"/>
          </div>

          <div className="flex-1 flex items-end relative">
            <img
              src={companionImages[selectedCompanion as keyof typeof companionImages]}
              alt="Selected Companion"
              className="w-full object-contain max-h-[300px]"
            />
          </div>
        </div>

        <div className="flex-1 bg-black p-4 pt-20 lg:pt-8">
          <div className="space-y-4 max-w-[600px] pb-64 lg:pb-8">
            {topics.map((topic) => (
              <button
                key={topic.id}
                onClick={() => handleTopicClick(topic.id)} 
                className="w-full lg:w-[590px] lg:h-[72px] h-auto rounded-[16px] border-2 border-solid border-[#3A3B3D] border-t-2 border-r-2 border-b-8 border-l-2 py-[8px] px-[32px] bg-[#101010] text-white text-left hover:bg-[#181818] transition-colors"
              >
                {topic.name}
              </button>
            ))}
          </div>

          <div className="lg:hidden fixed bottom-0 left-0 right-0 pb-4 bg-black">
            <div className="relative">
              <img 
                src={choiceCloud}
                alt="Choice Cloud"
                className="w-60 mx-auto absolute -top-24 left-[55%] -translate-x-1/2"
              />
            </div>
            <img
              src={companionImages[selectedCompanion as keyof typeof companionImages]}
              alt="Selected Companion"
              className="h-[200px] mx-auto object-contain"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default QuizPage;