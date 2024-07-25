import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { Link } from "react-router-dom"
import { registeruser } from "../client/apiClient"

export type RegisterFormData = {
  username: string
  email: string
  password: string
  confirmPassword: string
}

const Register = () => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>()

  const mutation = useMutation({
    mutationFn: registeruser,
    onSuccess: () => {
      console.log("success")
    },
    onError: (error: Error) => {
      console.log("error", error)
    }
  })

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data)
  })

  return (
    <>
      <form className="flex flex-col gap-5" onSubmit={onSubmit}>
        <h2 className="text-3xl font-bold">Create an Account</h2>
        <div className="flex flex-col md:flex-row gap-5">
          <label className="text-gray-700 text-sm font-bold flex-1">
            First Name
            <input
              className="border-2 rounded w-full py-1 px-2 font-normal"
              {...register("username", {
                required: "Username is reuqired!",
              })}
            ></input>
            <span className="text-red-500">{errors.username?.message}</span>
          </label>
        </div>
        <label className="text-gray-700 text-sm font-bold flex-1">
          Email
          <input
            type="email"
            className="border-2 rounded w-full py-1 px-2 font-normal"
            {...register("email", {
              required: "Email is reuqired!",
            })}
          ></input>
        </label>
        <label className="text-gray-700 text-sm font-bold flex-1">
          Password
          <input
            type="password"
            className="border-2 rounded w-full py-1 px-2 font-normal"
            {...register("password", {
              required: "This field is required !",
              minLength: {
                value: 6,
                message: "password must be of 6 or more characters !",
              },
            })}
          ></input>
        </label>
        <label className="text-gray-700 text-sm font-bold flex-1">
          Confirm Password
          <input
            type="password"
            className="border-2 rounded w-full py-1 px-2 font-normal"
            {...register("confirmPassword", {
              validate: (val) => {
                if (!val) {
                  return "This field is required !"
                } else if (watch("password") !== val) {
                  return "Passwords do not match !  "
                }
              },
            })}
          ></input>
          {errors.confirmPassword && (
            <span className="text-red-500">
              {errors.confirmPassword.message}
            </span>
          )}
        </label>
        <span className="flex items-center justify-between">
          <span className="text-sm">
            Already have an account ?{" "}
            <Link className="text-blue-600" to={"/sign-in"}>
              Login here
            </Link>
          </span>
        </span>
      </form>
    </>
  )
}

export default Register
