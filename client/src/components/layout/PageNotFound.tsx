
import { Home } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <div className="space-y-4">
          <h1 className="text-9xl font-extrabold text-gray-800">404</h1>
          <h2 className="text-4xl font-bold text-gray-700">Page Not Found</h2>
          <p className="text-xl text-gray-600">Oops! The page you are looking for doesn't exist or has been moved.</p>
        </div>
        
        <div className="flex justify-center">
          <div className="w-64 h-64 relative overflow-hidden rounded-lg">
            <img
              src="https://media.giphy.com/media/6uGhT1O4sxpi8/giphy.gif"
              alt="Confused John Travolta"
              className='object-cover'
            />
          </div>
        </div>
        
        <div>
          <Link 
            to="/" 
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
          >
            <Home className="mr-2 h-5 w-5" aria-hidden="true" />
            Back to Homepage
          </Link>
        </div>
      </div>
    </div>
  )
}

