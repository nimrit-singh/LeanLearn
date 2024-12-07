import React, { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import logo from "../../assets/images/Logo.png";
import einstein from "../../assets/images/einstein.png";
import newton from "../../assets/images/Newton.png";
import galileo from "../../assets/images/gae.png";
import raman from "../../assets/images/Raman.png";
import Slider from "../usable/Slider";

const companionImages = {
  1: einstein,
  2: newton,
  3: galileo,
  4: raman,
};

const SelectedTopicPage: React.FC = () => {
  const { topicId } = useParams<{ topicId: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const { selectedCompanion } = location.state || {};

  const topics = [
    { id: 1, name: "Topic 1", description: "Description for Topic 1" },
    { id: 2, name: "Topic 2", description: "Description for Topic 2" },
    { id: 3, name: "Topic 3", description: "Description for Topic 3" },
    { id: 4, name: "Topic 4", description: "Description for Topic 4" },
    { id: 5, name: "Topic 5", description: "Description for Topic 5" },
  ];

  useEffect(() => {
    setIsRunning(true);
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isRunning && time < 60) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
        setCountdown((prevCount) => prevCount + 1);
      }, 1000);
    } else if (time >= 60) {
      setIsRunning(false);
      navigate("/summary", {
        state: {
          topicId,
          selectedCompanion,
          timeSpent: time,
        },
      });
    }

    return () => clearInterval(timer);
  }, [isRunning, time, navigate, topicId, selectedCompanion]);

  const handleLogoClick = () => {
    navigate("/");
  };



  const topic = topics.find((t) => t.id === Number(topicId));

  if (!topic) {
    return <div>Topic not found</div>;
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Sidebar */}
      <div className="md:w-[280px] bg-[#101010] p-5 flex flex-col items-center md:items-start">
        <img
          src={logo}
          alt="LeanLearn Logo"
          className="w-[120px] cursor-pointer mb-6"
          onClick={handleLogoClick}
        />

        {selectedCompanion && (
          <div className="flex-1 flex items-end">
            <img
              src={
                companionImages[
                  selectedCompanion as keyof typeof companionImages
                ]
              }
              alt="Selected Companion"
              className="w-full object-contain max-h-[300px] mt-2"
            />
          </div>
        )}
      </div>

      {/* Content Area */}
      <div className="flex-1 p-4 md:p-8 bg-black">
        <div className="text-white mb-6">
          <h1 className="text-2xl md:text-3xl font-semibold mb-2">
            {topic.name}
          </h1>
          <p className="text-gray-400">{topic.description}</p>
        </div>

        {/* Timer and Slider */}
        <div className="w-full flex items-center gap-4">
          <span className="text-lg text-white">{countdown} Sec</span>
          <Slider value={time} onChange={setTime} />
          <span className="text-lg text-white">60 Sec</span>
        </div>
      </div>
    </div>
  );
};

export default SelectedTopicPage;
