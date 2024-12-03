import React from "react";
import Sidebar from "./Sidebar";


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
  // const sidebarItems = ["Item 1", "Item 2", "Item 3", "Item 4"]; 

  return (
    <div className="flex">
      <Sidebar  />
      <MainContent />
    </div>
  );
};

export default QuizPage;