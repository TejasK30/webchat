import { create } from "zustand"
import { persist } from "zustand/middleware"

type UserState = {
  userId: string
  username: string
  email: string
  isLoggedin: boolean
  setIsLoggedin: (isLoggedin: boolean) => void
  setUser: (user: { userId: string; username: string; email: string }) => void
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      userId: "",
      username: "",
      email: "",
      isLoggedin: false,
      setIsLoggedin: (isLoggedin) => set({ isLoggedin }),
      setUser: (user) => set(user),
    }),
    {
      name: "user-storage",
    }
  )
)
