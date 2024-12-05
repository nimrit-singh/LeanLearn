import BackArrow from '../../assets/svg/Arrow Left.svg'; 
import mainLogo from '../../assets/images/Logo.png';



interface PageProps {
    className?: string; // Define className as an optional prop
}
  
  const Sidebar: React.FC<PageProps>= ({className}) => {
    return (
      <div className={`fixed top-0 left-0 h-full w-[400px] bg-[#101113]  text-white transition-transform duration-300  ${className}`}>
        <div className="flex gap-10 items-center p-4">
          <button className="text-white hover:text-gray-400">
            <img src={BackArrow} alt="Back" className="w-6 h-6" /> 
          </button>
          <div className="text-lg font-bold "><img src={mainLogo} alt="" className="h-8 sm:h-10 md:h-12" /></div>
        </div>
       
      </div>
    );
  };

export default Sidebar