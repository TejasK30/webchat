import { useMutation } from "@tanstack/react-query"
import Navbar from "../components/Navbar"
import { useUserStore } from "../store/userStore"
import { updateUserDetails } from "../client/apiClient"
import { useForm } from "react-hook-form"
import { updateUserType } from "../utils/types"
import { useState } from "react"
import { FaEye, FaEyeSlash } from "react-icons/fa"
import { Link } from "react-router-dom"

export interface updateUser {
  userId: string
  details: updateUserType
}
const Profile = () => {
  const { username, email } = useUserStore()
  const [showPassword, setShowPassword] = useState(false)

  const togglePasswordVisibility = () => setShowPassword(!showPassword)

  const mutation = useMutation({
    mutationKey: ["updateUserDetails"],
    mutationFn: updateUserDetails,
  })

  const {
    //formState: { errors },
    handleSubmit,
  } = useForm<updateUserType>()

  const onSubmit = handleSubmit((data: updateUser) => {
    mutation.mutateAsync(data)
  })

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center flex-col h-screen">
        <form
          className="flex flex-col justify-center max-w-md w-full p-4 rounded-lg border-2 border-gray-500"
          onSubmit={onSubmit}
        >
          <h2 className="text-3xl font-bold mb-5">Update User Profile</h2>

          <div className="mb-2">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Username
              <input
                id="email"
                value={username}
                className="border-2 border-gray-500 rounded w-full text-gray-800 py-2 px-3 outline-none"
              />
            </label>
          </div>

          <div className="mb-2">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
              <input
                id="email"
                type="email"
                value={email}
                className="border-2 border-gray-500 rounded w-full text-gray-800 py-2 px-3 outline-none"
              />
            </label>
          </div>

          {/*
<div className="mb-2">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  className="border-2 border-gray-500 rounded w-full text-gray-800 py-2 px-3 outline-none"
                  {...register("password", {
                    required: "This field is required!",
                    minLength: {
                      value: 6,
                      message: "Password must be 6 or more characters!",
                    },
                  })}
                />
                <span
                  className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-gray-500"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </span>
              </div>
              {errors.password && (
                <p className="text-red-600 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
            </label>
          </div>
            */}
          <button
            type="submit"
            className="bg-blue-500 text-white font-semibold rounded py-2 px-4 hover:bg-blue-600"
          >
            Submit
          </button>

      </form>
      </div>{" "}
    </>
  )
}

export default Profile
