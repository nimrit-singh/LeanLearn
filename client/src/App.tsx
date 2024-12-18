import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

import HeroSection from './components/home/HeroSection';
import WhySection from './components/home/WhySection';
import ComingSoon from './components/home/ComingSoon';

import Login from './components/auth/Login';
import SignUp from './components/auth/SignUp';
import VerifyOTP from './components/auth/VerifyOTP';

import TeacherDashboard from './components/teacher/TeacherDashboard';
import CreateQuiz from './components/teacher/CreateQuiz'

import SelectingMentors from './components/home/selectingMentors';
import QuizPage from './components/home/QuizPage';
import SelectedTopicPage from './components/home/selectTopic';
import Summary from './components/home/Summary';
import Feedback from './components/home/Feedback';

const HomePage = () => (
  <>
    <Navbar />
    <HeroSection />
    <WhySection />
    <ComingSoon />
    <Footer />
  </>
);

const AuthLayout = ({ children }: { children: React.ReactNode }) => (
  <>
    <Navbar />
    <div className="min-h-[calc(100vh-64px)]">{children}</div>
    <Footer />
  </>
);

const QuizLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen bg-black">{children}</div>
);

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen">
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />

            <Route path="/login" element={<AuthLayout><Login /></AuthLayout>} />
            <Route path="/signup" element={<AuthLayout><SignUp /></AuthLayout>} />
            <Route path="/verify-otp" element={<AuthLayout><VerifyOTP /></AuthLayout>} />

            <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
            <Route path="/create-quiz" element={<CreateQuiz />} />
            <Route
              path="/select-mentor"
              element={<QuizLayout><SelectingMentors /></QuizLayout>}
            />
            <Route
              path="/quiz-page"
              element={<QuizLayout><QuizPage /></QuizLayout>}
            />
            <Route
              path="/topic/:topicId"
              element={<QuizLayout><SelectedTopicPage /></QuizLayout>}
            />
            <Route
              path="/summary"
              element={<QuizLayout><Summary /></QuizLayout>}
            />
            <Route
              path="/feedback"
              element={<QuizLayout><Feedback /></QuizLayout>}
            />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;