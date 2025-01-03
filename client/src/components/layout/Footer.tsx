import React from "react";
import Logo from "../../assets/images/Logo.png";

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#101113] pt-16 pb-8">
      <div className="max-w-[1408px] mx-auto px-6 lg:px-12">
        <div className="flex flex-col gap-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <img src={Logo} alt="LeanLearn Logo" className="h-12" />

            <div className="flex items-center gap-6">
              <a
                href="tel:7889352121"
                className="text-white hover:text-gray-300 transition-colors"
              >
               Contact Us - 7889352121
              </a>
              <a
                href="https://www.instagram.com/lean_learn01/profilecard/?igsh=a25wNGVra28wZ2pi"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-gray-300 transition-colors"
              >
                <Instagram className="w-10 h-10" />
              </a>
            </div>
          </div>

          <div className="w-full h-px bg-[#3A3B3D]" />

          <div className="text-center text-white/60">
            © 2024 Leanlearn. All Rights Reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

const Instagram: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zm10.5 1.75a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5zM12 7.25a4.75 4.75 0 1 1 0 9.5 4.75 4.75 0 0 1 0-9.5zm0 1.5a3.25 3.25 0 1 0 0 6.5 3.25 3.25 0 0 0 0-6.5z" />
  </svg>
);

export default Footer;
