import React, { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import {
  FaRegUserCircle,
  FaCog,
  FaSignOutAlt,
  FaUserPlus,
} from "react-icons/fa"
import { Link, useNavigate } from "react-router-dom"
import { logout } from "../client/apiClient"
import { useUserStore } from "../store/userStore"
import useUserContext from "../hooks/useUserContext"
import { motion, AnimatePresence } from "framer-motion"

const navLinks = [
  { name: "Profile", icon: FaRegUserCircle },
  { name: "Settings", icon: FaCog },
  { name: "Sign out", icon: FaSignOutAlt },
]
const newLinks = ["register", "login"]

export default function Navbar() {
  const { isLoggedin } = useUserContext()
  const { username } = useUserStore()
  const { setUser } = useUserStore()

  const [profileOpen, setProfileOpen] = useState(false)

  const navigate = useNavigate()

  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationKey: ["logout"],
    mutationFn: logout,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["validateUser"] })
      console.log("success logout")
      setUser({
        userId: "",
        username: "",
        email: "",
      })
      navigate("/login")
    },
    onError: () => {
      console.log("error in logout")
    },
  })

  const handleClick = async () => {
    mutation.mutate()
  }

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <h3 className="text-indigo-600 font-bold text-xl">Webchat</h3>
            </Link>
          </div>
          <div className="flex items-center">
            <button
              onClick={() => navigate("/add-friends")}
              className="bg-indigo-600 text-white px-2 py-2 rounded-md mr-4 hover:bg-indigo-700 transition-colors duration-200 flex items-center"
            >
              <FaUserPlus className="mr-2" />
              Add Friends
            </button>
            <div className="relative">
              <button
                className="flex text-sm focus:outline-none"
                onClick={() => setProfileOpen(!profileOpen)}
              >
                <span className="sr-only">Open user menu</span>
                <div
                  className={`${isLoggedin ? "bg-indigo-600" : "bg-gray-600"} text-white flex items-center justify-center h-10 w-10 rounded-full`}
                >
                  {isLoggedin ? (
                    username.charAt(0).toUpperCase()
                  ) : (
                    <FaRegUserCircle />
                  )}
                </div>
              </button>
              <AnimatePresence>
                {profileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                  >
                    {isLoggedin
                      ? navLinks.map((item) => (
                          <motion.div
                            key={item.name}
                            whileHover={{ backgroundColor: "#F3F4F6" }}
                            className="block px-4 py-2 text-sm text-gray-700 cursor-pointer"
                            onClick={
                              item.name === "Sign out"
                                ? handleClick
                                : () =>
                                    navigate(
                                      `/${item.name.toLowerCase().replace(" ", "-")}`,
                                    )
                            }
                          >
                            <div className="flex items-center">
                              <item.icon className="mr-2" />
                              {item.name}
                            </div>
                          </motion.div>
                        ))
                      : newLinks.map((item) => (
                          <Link
                            key={item}
                            to={`/${item.toLowerCase()}`}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            {item.charAt(0).toUpperCase() + item.slice(1)}
                          </Link>
                        ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
