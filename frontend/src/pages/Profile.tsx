import { useMutation } from "@tanstack/react-query"
import Navbar from "../components/Navbar"
import { useUserStore } from "../store/userStore"
import { updateUserDetails } from "../client/apiClient"
import { useForm } from "react-hook-form"
import { updateUserType, userInfo } from "../utils/types"

const Profile = () => {
  const { userId, username, email, setUser } = useUserStore() // Accessing userId, username, and email from store


  const mutation = useMutation({
    mutationKey: ["updateUserDetails"],
    mutationFn: ({ userId, data }: { userId: string; data: updateUserType }) =>
      updateUserDetails(userId, data),
    onSuccess: (userData: userInfo) => {
      console.log("Update user details success")
      setUser({
        userId: userData.userId,
        username: userData.username,
        email: userData.email,
      })
    },
    onError: () => {
      console.log("Update user details failed")
    },
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<updateUserType>()

  const onSubmit = handleSubmit((data: updateUserType) => {
    mutation.mutateAsync({ userId, data })
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
              htmlFor="username"
            >
              Username
              <input
                id="username"
                defaultValue={username} // Set default value
                {...register("username", { required: "Username is required" })} // Add validation
                className="border-2 border-gray-500 rounded w-full text-gray-800 py-2 px-3 outline-none"
              />
            </label>
            {errors.username && (
              <p className="text-red-600 text-xs mt-1">
                {errors.username.message}
              </p>
            )}
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
                defaultValue={email} // Set default value
                {...register("email", { required: "Email is required" })} // Add validation
                className="border-2 border-gray-500 rounded w-full text-gray-800 py-2 px-3 outline-none"
              />
            </label>
            {errors.email && (
              <p className="text-red-600 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white font-semibold rounded py-2 px-4 hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  )
}

export default Profile
