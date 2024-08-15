import { FriendDoc } from "../store/friendStore"
import { LoginFormData, RegisterFormData } from "../utils/types"

const url = import.meta.env.VITE_API_BASE_URL

// export const checkUsername = async (username: string) => {
//   const response = await fetch(`${url}/api/users/check-username`, {
//     method: "POST",
//     credentials: "include",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({username}),
//   })

//   const data = await response.json()

//   return data.exists
// }

export const registeruser = async (data: RegisterFormData) => {
  const response = await fetch(`${url}/api/users/register`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error("Something went wrong!")
  }
}

export const loginuser = async (data: LoginFormData) => {
  const response = await fetch(`${url}/api/users/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error("Something went wrong!")
  }
  const userData = await response.json()

  return userData
}

export const validateUser = async () => {
  const response = await fetch(`${url}/api/users/verify-user`, {
    credentials: "include",
  })
  if (!response.ok) {
    throw new Error("token invalid")
  }

  return response.json()
}

export const fetchFriends = async (userId: string): Promise<FriendDoc[]> => {
  try {
    const response = await fetch(`${url}/api/users/fetchfriends/${userId}`)
    return response.json()
  } catch (error) {
    console.error("Error fetching friends:", error)
    throw error
  }
}

export const fetchClickedUser = async (userId: string) => {
  try {
    const response = await fetch(`${url}/api/messages/clicked-user/getMessages/${userId}`,{
      credentials: "include"
    })
    const data = await response.json()

    console.log(data)
    return data
  } catch (error) {
    console.log(error)
  }
}
