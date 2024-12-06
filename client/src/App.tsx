import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import HeroSection from './components/home/HeroSection';
import WhySection from './components/home/WhySection';
import ComingSoon from './components/home/ComingSoon';
import Footer from './components/layout/Footer';
import Login from './components/auth/Login';
import SignUp from './components/auth/SignUp';
import VerifyOTP from './components/auth/VerifyOTP';
import SelectingMentors from './components/home/selectingMentors';
import QuizPage from './components/home/QuizPage';
import SelectedTopicPage from './components/home/selectTopic';
import Summary from './components/home/Summary';


const HomePage = () => {
  return (
    <>
      <Navbar />
      <HeroSection />
      <WhySection />
      <ComingSoon />
      <Footer />
    </>
  );
};

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <div className="min-h-[calc(100vh-64px)]">
        {children}
      </div>
      <Footer />
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen">
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            
            <Route path="/select-mentor" element={<SelectingMentors />} />
            <Route path="/quiz-page" element={<QuizPage />} />
            <Route path="/topic/:topicId" element={<SelectedTopicPage />} />
            <Route path="/summary" element={<Summary />} />
            
            <Route 
              path="/login" 
              element={
                <AuthLayout>
                  <Login />
                </AuthLayout>
              } 
            />
            <Route 
              path="/signup" 
              element={
                <AuthLayout>
                  <SignUp />
                </AuthLayout>
              } 
            />
            <Route 
              path="/verify-otp" 
              element={
                <AuthLayout>
                  <VerifyOTP />
                </AuthLayout>
              } 
            />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;