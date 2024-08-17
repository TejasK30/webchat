import { useState } from "react"
import { useUserStore } from "../store/userStore"
import { Link } from "react-router-dom"

const navLinks = ["Profile", "Settings", "Sign out"]

export default function Example() {
  const { username } = useUserStore()

  const [profileOpen, setProfileOpen] = useState(false)

  return (
    <nav className="bg-gray-100">
      <div className="max-w-7xl px-2 sm:px-6 lg:px-4">
        <div className="relative flex items-center justify-between">
          <div className="flex items-center">
            <h3 className="text-black font-bold">Webchat</h3>
          </div>
          <div className="flex items-center space-x-4 pr-2">
            <div className="relative">
              <button
                className="flex text-sm focus:outline-none "
                onClick={() => setProfileOpen(!profileOpen)}
              >
                <span className="sr-only">Open user menu</span>
                <div className="flex items-center justify-center h-8 w-8 rounded-[50%] bg-red-700 text-gray-100 m-2 py-2">
                  {username.charAt(0).toUpperCase() || ""}
                </div>{" "}
              </button>
              {profileOpen && (
                <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  {navLinks.map((item) => (
                    <Link to={`/${item.toLocaleLowerCase()}`}>
                    <div
                      key={item}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-300"
                    >
                      {item}
                    </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
