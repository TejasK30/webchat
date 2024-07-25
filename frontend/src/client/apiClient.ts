import { RegisterFormData } from "../components/Register"

const url = import.meta.env.VITE_API_BASE_URL

export const registeruser = async (data: RegisterFormData) => {
  const response = await fetch(`${url}/api/register`, {
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

  await response.json()
}
