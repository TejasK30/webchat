import { create } from "zustand"
import { persist } from "zustand/middleware"
import { MessageType } from "../utils/types"

interface MessageState {
  selectedUser: { id: string; username: string } | null
  messages: MessageType[]
  setSelectedUser: (userId: string, username: string) => void
  setMessages: (messages: MessageType[]) => void
  addMessage: (message: MessageType) => void
}

export const useMessageStore = create<MessageState>()(
  persist(
    (set) => ({
      selectedUser: null,
      messages: [],
      setSelectedUser: (userId, username) =>
        set({ selectedUser: { id: userId, username } }),
      setMessages: (messages) =>
        set((state) => ({
          messages: Array.isArray(messages) ? messages : state.messages,
        })),
      addMessage: (message: MessageType) =>
        set((state) => ({
          messages: [...state.messages, message],
        })),
    }),
    {
      name: "message-storage",
    }
  )
)
