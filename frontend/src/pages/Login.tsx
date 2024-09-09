import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { FaEye, FaEyeSlash } from "react-icons/fa"
import { Link, useNavigate } from "react-router-dom"
import { loginuser } from "../client/apiClient"
import { useUserStore } from "../store/userStore"
import { LoginFormData, userInfo } from "../utils/types"

const Login = () => {
  const [showPassword, setShowPassword] = useState(false)
  const { setUser } = useUserStore()
  const navigate = useNavigate()

  const togglePasswordVisibility = () => setShowPassword(!showPassword)

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginFormData>()

  const mutation = useMutation({
    mutationFn: loginuser,
    onSuccess: (userData: userInfo) => {
      console.log("login success")
      setUser({
        userId: userData.userId,
        username: userData.username,
        email: userData.email
      })
      navigate('/chat')
    },
    onError: () => {
      console.log("error")
    },
  })

  const onSubmit = handleSubmit((data: LoginFormData) => {
    mutation.mutate(data)
  })

  return (
    <div className="flex justify-center items-center flex-col h-screen">
      <form
        className="flex flex-col justify-center max-w-md w-full p-4 rounded-lg border-2 border-gray-500"
        onSubmit={onSubmit}
      >
        <h2 className="text-3xl font-bold mb-5">User Login</h2>

        <div className="mb-2">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
            <input
              id="email"
              type="email"
              className="border-2 border-gray-500 rounded w-full text-gray-800 py-2 px-3 outline-none"
              {...register("email", { required: "Email is required!" })}
            />
          </label>
        </div>

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

        <button
          type="submit"
          className="bg-blue-500 text-white font-semibold rounded py-2 px-4 hover:bg-blue-600"
        >
          Submit
        </button>

        <div className="mt-4 text-sm">
          Already have an account?{" "}
          <Link className="text-blue-600" to={"/register"}>
            Register here
          </Link>
        </div>
      </form>
    </div>
  )
}

export default Login
