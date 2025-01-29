import React, { JSXElementConstructor } from 'react'

import { useState } from 'react';
import leanLearnLogo from "../../assets/images/Logo.png";
import { useNavigate } from 'react-router-dom';
export interface SideBarprops {
    id:string;
    label:string;
    icon:JSX.Element;
    path:string;
}
const SideBar: React.FC<{ navigationItems: Array<SideBarprops> }> = ({ navigationItems }) => { 
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();


  return (
    <div> 
          {!isSidebarOpen && ( // Only show the icon when the sidebar is closed
          <button
            onClick={() => setIsSidebarOpen(true)} // Open sidebar on click
            className="text-white hover:text-gray-300 focus:outline-none"
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
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        )}
        <div
    className={`h-full ${
      isSidebarOpen ? "w-64" : "w-20"
    } bg-[#111111] transition-all duration-300  sidebar-main ease-in-out ${
      isSidebarOpen ? "block" : "hidden md:block"
    }`}
  >
    <div
      className={`p-4 flex side-bar-header ${
        isSidebarOpen ? "gap-2" : "justify-center"
      } items-center`}
    >
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="text-white hover:text-gray-300 focus:outline-none hidden md:block"
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
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
      {isSidebarOpen && (
        <img
          src={leanLearnLogo}
          alt="LeanLearn"
          className="h-8 pl-4 md:pl-12"
          onClick={() => navigate("/")}
        />
      )}
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
        <a
          key={item.id}
          href={item.path}
          className={`flex items-center ${
            isSidebarOpen ? "gap-3 px-4" : "justify-center"
          } py-2 rounded-md ${
            item.id === "quiz"
              ? "bg-[#21B6F8] text-black"
              : "text-gray-400 hover:text-white hover:bg-[#1A1A1A]"
          }`}
        >
          <span className="w-6 h-6">{item.icon}</span>
          {isSidebarOpen && <span>{item.label}</span>}
        </a>
      ))}
    </nav>
  </div>
</div>
  )
}

export default SideBar