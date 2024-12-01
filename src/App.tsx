import Navbar from './components/layout/Navbar';
import HeroSection from './components/home/HeroSection';
import WhySection from './components/home/WhySection';
import ComingSoon from './components/home/ComingSoon';
import Footer from './components/layout/Footer';
import Sidebar from './components/home/QuizPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen">
      
        <main>
          <Routes>
            {/* here default home page Routes */}
            <Route
              path="/"
              element={
                <>
                  <Navbar />
                  <HeroSection />
                  <WhySection />
                  <ComingSoon />
                  <Footer />
                </>
              }
            />
          
            <Route path="/quiz-page" element={<Sidebar />} />
          </Routes>
        </main>
      
      </div>
    </BrowserRouter>
  );
}

export default App;
