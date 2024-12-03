import Sidebar from './Sidebar';

const MentorsPage: React.FC = () => {
    return (
      <div className={`flex-grow p-4 transition-all duration-300 ml-[400px]`}>
        <h1 className="text-2xl">Main Content Area</h1>
        <p>This is where the main content goes.</p>
      </div>
    );
  };
  

const SelectingMentors = () => {
  return (
    <div className='flex'>
        <Sidebar />
        <MentorsPage />
    
    </div>
  );
};

export default SelectingMentors;