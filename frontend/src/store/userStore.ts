import { create } from "zustand"
import { persist } from "zustand/middleware"

type UserState = {
  userId: string
  username: string
  email: string
  setUser: (user: { userId: string; username: string; email: string }) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
        userId: '',
        username: '',
        email: '',
        setUser: (user) => set(user),
    }),
    {
      name: "user-storage"
    }
  )
)
