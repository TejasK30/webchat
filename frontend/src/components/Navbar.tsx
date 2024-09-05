import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { logout } from "../client/apiClient"
import { useUserStore } from "../store/userStore"

const navLinks = ["Profile", "Settings", "Sign out"]

export default function Navbar() {
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
      console.log("sucess logout")
      setUser({
        userId: '',
        username: '',
        email: ''
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
    <nav className="bg-gray-300">
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
                  {navLinks.map((item) =>
                    item === "Sign out" ? (
                      <div
                        key={item}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-300 cursor-pointer"
                        onClick={handleClick}
                      >
                        {item}
                      </div>
                    ) : (
                      <Link
                        key={item}
                        to={`/${item.toLowerCase().replace(" ", "-")}`}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-300"
                      >
                        {item}
                      </Link>
                    )
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

