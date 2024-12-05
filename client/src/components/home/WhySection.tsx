import React from 'react';
import TableImage from '../../assets/images/table.png';

const WhySection: React.FC = () => {
  return (
    <section className="bg-[#101113] py-24">
      <div className="max-w-[1408px] mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <h2 className="font-nunito font-bold text-[36px] leading-[44px] text-white mb-4">
            Why LeanLearn is Perfect for You!
          </h2>
          <p className="font-nunito font-normal text-[24px] leading-[32px] text-white/90 max-w-[780px] mx-auto">
            Interactive quizzes that combine fun and education for students like you.
          </p>
        </div>

        <div className="relative">
          <img 
            src={TableImage}
            alt="Features comparison"
            className="w-full"
          />
        </div>
      </div>
    </section>
  );
};

export default WhySection;