import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import { registeruser } from "../client/apiClient"
import { useEffect, useState } from "react"
import { FaEye, FaEyeSlash } from "react-icons/fa"
import { RegisterFormData } from "../utils/types"
import { useUserStore } from "../store/userStore"

const Register = () => {
  const [username, setUsername] = useState<string>("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const { isLoggedin } = useUserStore()
  const navigate = useNavigate()

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword)
  }

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>()

  const registerMutation = useMutation({
    mutationFn: registeruser,
    onSuccess: () => {
      console.log("Registration successful")
      navigate("/login")
    },
    onError: (error: Error) => {
      console.log("Registration error", error)
    },
  })

  useEffect(() => {
    if (isLoggedin) {
      navigate("/chat")
    }
  }, [isLoggedin, navigate])

  const onSubmit = handleSubmit((data) => {
    registerMutation.mutate(data)
  })

  return (
    <div className="flex justify-center items-center flex-col h-screen">
      <form
        className="flex flex-col justify-center max-w-md w-full p-4 border-2 border-gray-500 rounded-lg shadow-2xl"
        onSubmit={onSubmit}
      >
        <h2 className="text-3xl font-bold mb-5">Create an Account</h2>

        <div className="mb-2">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
          >
            User Name
            <input
              id="username"
              className="border-2 border-gray-500 rounded w-full text-gray-800 py-2 px-3 outline-none"
              {...register("username", { required: "Username is required!" })}
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
            <div className="text-red-500 text-xs">
              {errors.username?.message}
            </div>
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
                {showPassword && <FaEye />}
                {!showPassword && <FaEyeSlash />}{" "}
              </span>
            </div>
            {errors.password && (
              <p className="text-red-600 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </label>
        </div>

        <div className="mb-2">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="confirmPassword"
          >
            Confirm Password
            <div className="relative">
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                className="border-2 border-gray-500 rounded w-full text-gray-800 py-2 px-3 outline-none"
                {...register("confirmPassword", {
                  validate: (val) => {
                    if (!val) {
                      return "This field is required!"
                    } else if (watch("password") !== val) {
                      return "Passwords do not match!"
                    }
                  },
                })}
              />
              <span
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-gray-500"
                onClick={toggleConfirmPasswordVisibility}
              >
                {showPassword && <FaEye />}
                {!showPassword && <FaEyeSlash />}{" "}
              </span>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-600 text-xs mt-1">
                {errors.confirmPassword.message}
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
          <Link className="text-blue-600" to={"/login"}>
            Login here
          </Link>
        </div>
      </form>
    </div>
  )
}

export default Register
