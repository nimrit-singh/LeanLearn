import Navbar from './components/layout/Navbar'
import HeroSection from './components/home/HeroSection'
import WhySection from './components/home/WhySection'
import ComingSoon from './components/home/ComingSoon'
import Footer from './components/layout/Footer'

function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
      <HeroSection />
      <WhySection />
      <ComingSoon />
      </main>
      <Footer />
    </div>
  )
}

export default App