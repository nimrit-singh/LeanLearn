import React from 'react';
import RobotImage from '../../assets/images/robot1.png';




const ComingSoon: React.FC = () => {
  return (
    <section className="bg-black py-16 sm:py-20 lg:py-24">
      <div className="max-w-[1408px] mx-auto px-4 sm:px-6 lg:px-12">

        <div className="flex flex-row lg:flex-row items-center justify-between gap-6 lg:gap-16">
          <div className="w-2/5 lg:flex-1 flex justify-center lg:justify-end">
            <img 
              src={RobotImage}
              alt="AI Tutor Robot"
              className="w-full max-w-[180px] sm:max-w-[350px] lg:max-w-[400px] object-contain"
            />
          </div>

          <div className="w-3/5 lg:flex-1 lg:max-w-[594px] text-left lg:text-left">
            <h3 className="font-nunito font-bold text-[20px] sm:text-[32px] lg:text-[36px] leading-tight sm:leading-[44px] text-white mb-3 sm:mb-6">
              Personalized AI Tutoring
              <br className="hidden sm:block" />
              is Almost Here!
            </h3>
            
            <p className="font-nunito font-normal text-[14px] sm:text-[20px] lg:text-[24px] leading-[20px] sm:leading-[32px] text-white/90">
              Your learning companion, designed to make
              <br className="hidden lg:block" />
              assessments engaging and effective.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComingSoon;