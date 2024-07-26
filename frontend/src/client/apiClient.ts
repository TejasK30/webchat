import { LoginFormData } from "../pages/Login"
import { RegisterFormData } from "../pages/Register"

const url = import.meta.env.VITE_API_BASE_URL

export const checkUsername = async (username: string) => {
  const response = await fetch(`${url}/api/users/check-username`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({username}),
  })

  const data = await response.json()

  return data.exists
}

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
