import { create } from "zustand"
import { persist } from "zustand/middleware"

export type User = {
  _id: string
  username: string
  email: string
}

export type FriendDoc = {
  _id: string
  userId: string
  friends: User[]
}

type FriendState = {
  friends: FriendDoc[]
  setFriends: (friends: FriendDoc[]) => void
}

export const useFriendStore = create<FriendState>()(
  persist(
    (set) => ({
      friends: [],
      setFriends: (friends) => set({ friends }),
    }),
    {
      name: "friend-storage",
    }
  )
)
