import { create } from "zustand"
import { persist } from "zustand/middleware"
import { MessageResponse, MessageType } from "../utils/types"

interface MessageState {
  selectedUser: { id: string; username: string } | null
  messages: MessageResponse[]
  setSelectedUser: (userId: string, username: string) => void
  setMessages: (messages: MessageResponse[]) => void
  addMessage: (message: MessageType) => void
}

export const useMessageStore = create<MessageState>()(
  persist(
    (set, get) => ({
      selectedUser: null,
      messages: [],
      setSelectedUser: (userId, username) =>
        set({ selectedUser: { id: userId, username } }),

      setMessages: (messages) => {
        set({ messages })
      },

      addMessage: (message: MessageType) => {
        const { selectedUser, messages } = get()

        if (!selectedUser) return

        const existingMessageResponse = messages.find(
          (msgResp) => msgResp._id === selectedUser.id
        )

        if (existingMessageResponse) {
          const updatedMessages = messages.map((msgResp) =>
            msgResp._id === selectedUser.id
              ? {
                  ...msgResp,
                  messages: [...msgResp.messages, message],
                }
              : msgResp
          )
          set({ messages: updatedMessages })
        } else {
          const newMessageResponse: MessageResponse = {
            _id: selectedUser.id,
            messages: [message],
          }
          set({ messages: [...messages, newMessageResponse] })
        }
      },
    }),
    {
      name: "message-storage",
    }
  )
)
