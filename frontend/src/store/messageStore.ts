import { create } from "zustand"
import { persist } from "zustand/middleware"

interface MessageType  {
  text: string
  sender: string
  senderId: string
  receiver: string
  receiverId: string
  timestamp: Date
}

interface MessageState {
  selectedUser: { id: string; username: string } | null
  messages: MessageType[]
  setSelectedUser: (userId: string, username: string) => void
  setMessages: (messages: MessageType[]) => void
}

export const useMessageStore = create<MessageState>()(
  persist(
    (set) => ({
      selectedUser: null,
      messages: [],
      setSelectedUser: (userId, username) => set({ selectedUser: {id: userId, username}}),
      setMessages: (messages) => set({messages})
    }),
    {
      name: 'message-storage',
    }
  )
)