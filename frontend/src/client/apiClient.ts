import { updateUser } from "../pages/Profile"
import { FriendDoc } from "../store/friendStore"
import { LoginFormData, RegisterFormData, updateUserType } from "../utils/types"

const url = import.meta.env.VITE_API_BASE_URL

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
  console.log(userId)

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
    const response = await fetch(
      `${url}/api/messages/clicked-user/getMessages/${userId}`,
      {
        credentials: "include",
      },
    )

    const data = await response.json()
    return data.groupedMessages
  } catch (error) {
    console.log(error)
  }
}

export const logout = async () => {
  try {
    const response = await fetch(`${url}/api/users/logout`, {
      method: "POST",
      credentials: "include",
    })

    if (!response.ok) {
      throw new Error(`Logout failed with status: ${response.status}`)
    }
  } catch (error) {
    console.error("Error during logout:", error)
    throw error
  }
}

export const updateUserDetails = async (userId: string, updateUserData: updateUserType) => {
  try {
    const response = await fetch(`${url}/api/users/update/${userId}`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateUserData),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || "Failed to update user details")
    }

    const data = await response.json()
    return data 

  } catch (error) {
    console.error("Error during update details:", error)
    throw error
  }
}
