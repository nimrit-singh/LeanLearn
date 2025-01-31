import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

import HeroSection from '../components/home/HeroSection';
import WhySection from '../components/home/WhySection';
import ComingSoon from '../components/home/ComingSoon';
import Login from '../components/auth/Login';
import SignUp from '../components/auth/SignUp';
import VerifyOTP from '../components/auth/VerifyOTP';
import AddQuestion from '../components/teacher/AddQuestion';

import TeacherDashboard from '../components/teacher/TeacherDashboard';
import CreateQuiz from '../components/teacher/CreateQuiz';
import QuestionSelection from '../components/teacher/QuestionSelection';
import QuestionBank from '../components/teacher/QuestionBank';
import ClassQuestions from '../components/teacher/ClassQuestions';
import SelectingMentors from '../components/home/selectingMentors';
import QuizPage from '../components/home/QuizPage';
import SelectedTopicPage from '../components/home/selectTopic';
import Summary from '../components/home/Summary';
import Feedback from '../components/home/Feedback';
import NotFound from '../components/layout/PageNotFound';
import DragnDrop from '@/components/ui/DragnDrop';

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
const HomePage = () => (
  <>
    <Navbar />
    <HeroSection />
    <WhySection />
    <ComingSoon />
    <Footer />
  </>
);

const AllRoutes = () => {
    return (
        <BrowserRouter>
            <div>
                <Routes>
                    <Route path="/" element={<HomePage />} />

                    <Route path="/login" element={<AuthLayout><Login /></AuthLayout>} />
                    <Route path="/signup" element={<AuthLayout><SignUp /></AuthLayout>} />
                    <Route path="/verify-otp" element={<AuthLayout><VerifyOTP /></AuthLayout>} />

                    <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
                    <Route path="/create-quiz" element={<CreateQuiz />} />
                    <Route path="/create-quiz/questions" element={<QuizLayout><QuestionSelection /></QuizLayout>} />

                    <Route path="/teacher/question-bank" element={<QuizLayout><QuestionBank /></QuizLayout>} />
                    <Route path="/teacher/question-bank/class/:classId" element={<QuizLayout><ClassQuestions /></QuizLayout>} />
                    <Route path="/teacher/question-bank/class/:classId/add-question" element={<QuizLayout><AddQuestion /></QuizLayout>} />

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
                    <Route path="/dragndrop"
                    element={<QuizLayout><DragnDrop/></QuizLayout>}
                    />
                    <Route
                        path="/summary"
                        element={<QuizLayout><Summary /></QuizLayout>}
                    />
                    <Route
                        path="/feedback"
                        element={<QuizLayout><Feedback /></QuizLayout>}
                    />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </div>
        </BrowserRouter>

    )
}

export default AllRoutes