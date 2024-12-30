import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import einstein from "../../assets/Einstein.gif";
import newton from "../../assets/Newton.gif";
import galileo from "../../assets/Galileo.gif";
import raman from "../../assets/CV Raman.gif";
import logo from "../../assets/images/Logo.png";
import choiceCloud from "../../assets/images/choose.png";
import choiceCloud1 from "../../assets/Frame 193.svg";
import selectsound from '../../assets/sound/sound1.aac'

const classes = [
  { value: "8", label: "Class 8" },
  { value: "9", label: "Class 9" },
  { value: "10", label: "Class 10" },
  { value: "11", label: "Class 11" },
  { value: "12", label: "Class 12" },
];

const topics = [
  { id: 1, name: "Gravitation", enabled: true },
  { id: 2, name: "Topic 2", enabled: true },
  { id: 3, name: "Topic 3", enabled: true },
  { id: 4, name: "Topic 4", enabled: true },
  { id: 5, name: "Topic 5", enabled: true },
];

const companionImages = {
  1: einstein,
  2: newton,
  3: galileo,
  4: raman,
};
const playCommonSound = () => {
  const audio = new Audio(selectsound);
  audio.play();
};

const QuizPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCompanion, setSelectedCompanion] = useState<number>(1);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");

  useEffect(() => {
    const companion = localStorage.getItem("selectedCompanion");
    if (companion) {
      setSelectedCompanion(Number(companion));
    }
  }, []);

  const handleChangeMentor = () => {
    navigate("/select-mentor");
  };

  const handleContinue = () => {
    if (selectedClass && selectedTopic) {
      localStorage.removeItem("currentQuestionIndex");
      playCommonSound();
      navigate(`/topic/${selectedTopic}`, {
        state: {
          selectedCompanion,
          selectedClass,
        },
      });
    }
  };

  return (
    <>
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-[#181818] flex items-center justify-center px-4 z-50">
        <img src={logo} alt="LeanLearn Logo" className="h-8" />
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
        <div className="w-full md:w-[280px] bg-[#101010] pb-0 p-5 lg:flex flex-col">
          <div className="flex justify-center w-full mb-6">
            <img
              src={logo}
              alt="LeanLearn Logo"
              className="w-[120px] cursor-pointer fade-in"
              onClick={() => navigate("/")}
            />
          </div>

          <button
            onClick={handleChangeMentor}
            className="hidden md:flex  items-center gap-2 w-full bg-[#181818] hover:bg-[#232323] md text-white rounded-xl py-3 px-4 mb-8 transition-colors"
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

          <div className="relative hidden md:block">
            <img src={choiceCloud} alt="Choice Cloud" className="w-full" />
          </div>
          <div className="flex flex-row-reverse  h-full">
            <div className="relative block md:hidden">
              <img src={choiceCloud1} alt="Choice Cloud" className="w-full" />
            </div>

            <div className="flex-1 flex items-end relative ">
              <img
                src={
                  companionImages[
                    selectedCompanion as keyof typeof companionImages
                  ]
                }
                alt="Selected Companion"
                className="w-full object-contain max-h-[200px] md:max-h-[300px]"
              />
            </div>
          </div>
        </div>

        <div className="flex-1 bg-black p-4 pt-20 lg:pt-8">
          <div className="max-w-[600px] mx-auto space-y-8">
            <h2 className="text-white text-2xl mb-6">Let's start quiz</h2>

            <div className="space-y-6">
              <div>
                <label className="block text-white mb-2">
                  Choose the class you're in
                </label>
                <select
                  value={selectedClass}
                  onChange={(e) => {
                    setSelectedClass(e.target.value);
                    playCommonSound(); 
                  }}
                  className="w-full bg-[#111111] text-white px-4 py-3 rounded-lg border border-[#3A3B3D] focus:border-[#21B6F8] focus:outline-none"
                >
                  <option value="">Select Class</option>
                  {classes.map((cls) => (
                    <option key={cls.value} value={cls.value}>
                      {cls.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-white mb-2">
                  Choose a Topic to Start the Quiz
                </label>
                <select
                  value={selectedTopic}
                  onChange={(e) => {
                    setSelectedTopic(e.target.value);
                    playCommonSound(); // Play common sound on topic selection
                  }}
                  className="w-full bg-[#111111] text-white px-4 py-3 rounded-lg border border-[#3A3B3D] focus:border-[#21B6F8] focus:outline-none"
                >
                  <option value="">Select Topic</option>
                  {topics
                    .filter((t) => t.enabled)
                    .map((topic) => (
                      <option key={topic.id} value={topic.id}>
                        {topic.name}
                      </option>
                    ))}
                </select>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={handleContinue}
                disabled={!selectedClass || !selectedTopic}
                className="px-6 py-2 bg-[#21B6F8] text-white rounded-lg hover:bg-opacity-90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuizPage;
