import React from "react";

import BackArrow from '../../assets/svg/Arrow Left.svg'; 
import mainLogo from '../../assets/images/Logo.png';
interface SidebarProps {
  items: string[];
}

const Sidebar: React.FC<SidebarProps> = ({ items }) => {
  return (
    <div className={`fixed top-0 left-0 h-full w-[400px] bg-[#101113]  text-white transition-transform duration-300`}>
      <div className="flex gap-10 items-center p-4">
        <button className="text-white hover:text-gray-400">
          <img src={BackArrow} alt="Back" className="w-6 h-6" /> 
        </button>
        <div className="text-lg font-bold "><img src={mainLogo} alt="" className="h-8 sm:h-10 md:h-12" /></div>
      </div>
      <ul className="p-4">
        {items?.map((item, index) => (
          <li key={index} className="py-2 hover:bg-gray-700">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

// Main content component
const MainContent: React.FC = () => {
  return (
    <div className={`flex-grow p-4 transition-all duration-300 ml-[400px]`}>
      <h1 className="text-2xl">Main Content Area</h1>
      <p>This is where the main content goes.</p>
    </div>
  );
};

// Example usage of Sidebar component
const QuizPage: React.FC = () => {
  const sidebarItems = ["Item 1", "Item 2", "Item 3", "Item 4"]; 

  return (
    <div className="flex">
      <Sidebar items={sidebarItems} />
      <MainContent />
    </div>
  );
};

export default QuizPage;