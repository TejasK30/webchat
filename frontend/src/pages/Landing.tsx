import { Link, useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar"
import useUserContext from "../hooks/useUserContext"
import { useEffect } from "react"

const Landing = () => {
  const { isLoggedin } = useUserContext()
  const navigate = useNavigate()

  useEffect(() => {
    if(isLoggedin){
      navigate("/chat")
    }
  }, [isLoggedin])

  return (
    <>
      <Navbar />
      <div className="flex flex-col h-screen items-center justify-center bg-gradient-to-r from-gray-800 via-gray-900 to-black overflow-hidden">
        <div className="text-center space-y-6 animate-fade-in">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white">
            Welcome to <span className="text-yellow-400">Webchat</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-xl mx-auto">
            A modern web platform to chat with friends and connect instantly
            across the globe. Simple, secure, and fast messaging at your
            fingertips.
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              to={isLoggedin ? "/chat" : "/register"}
              className="bg-yellow-500 text-gray-900 hover:bg-yellow-600 transition-all duration-300 font-semibold py-2 px-4 rounded-lg shadow-lg"
            >
              Get Started
            </Link>
            <Link
              to="/landing"
              className="bg-transparent border border-gray-400 text-gray-300 hover:bg-gray-300 hover:text-black transition-all duration-300 font-semibold py-2 px-4 rounded-lg shadow-lg"
            >
              Learn More
            </Link>
          </div>
        </div>
        <div className="absolute top-10 right-10 w-40 h-40 bg-gray-500 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-10 left-10 w-40 h-40 bg-gray-700 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-40 w-20 h-20 bg-gray-600 rounded-full opacity-40 animate-ping"></div>
      </div>
    </>
  )
}

export default Landing
