import React, { useCallback, useEffect, useRef, useState } from "react"
import { IoSend } from "react-icons/io5"
import { fetchClickedUser } from "../client/apiClient"
import useSocket from "../hooks/useSocket"
import { useMessageStore } from "../store/messageStore"
import { useUserStore } from "../store/userStore"
import { MessageType } from "../utils/types"
import FriendsList from "./FriendList"
import Navbar from "./Navbar"
import { formatDate } from "../utils/helpers"
import { motion, AnimatePresence } from "framer-motion"

const Chat = () => {
  const { userId, username } = useUserStore()
  const { selectedUser, messages, addMessage, setMessages, setSelectedUser } =
    useMessageStore()

  const [textMessage, setTextMessage] = useState<string>("")
  const [isInitialLoad, setIsInitialLoad] = useState(true)

  const formRef = useRef<HTMLFormElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const socket = useSocket()

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: isInitialLoad ? "auto" : "smooth",
      })
    }
    setIsInitialLoad(false)
    if (window.closed) {
      setSelectedUser("", "")
    }
  }, [isInitialLoad, messages, selectedUser, setSelectedUser])

  useEffect(() => {
    if (selectedUser) {
      const fetchUserMessages = async (userId: string) => {
        try {
          const messages = await fetchClickedUser(userId)
          setMessages(messages)
        } catch (error) {
          console.error("Error fetching user messages:", error)
        }
      }

      fetchUserMessages(selectedUser.id)
      socket.emit("join-room", selectedUser.id)
      const handleReceiveMessage = (message: MessageType) => {
        if (message.receiverId === userId || message.senderId === userId) {
          addMessage(message)
        }
      }

      socket.on("receive-message", handleReceiveMessage)

      return () => {
        socket.off("receive-message", handleReceiveMessage)
      }
    }
  }, [selectedUser, addMessage, socket, userId, setMessages])

  const sendMessage = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      if (textMessage.trim() === "") return
      const newMessage: MessageType = {
        sender: username,
        senderId: userId,
        receiver: selectedUser?.username || "",
        receiverId: selectedUser?.id || "",
        text: textMessage,
        timestamp: new Date(),
      }
      socket.emit("send-message", newMessage)
      setTextMessage("")
      formRef.current?.reset()
    },
    [
      username,
      userId,
      selectedUser?.username,
      selectedUser?.id,
      textMessage,
      socket,
    ]
  )

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextMessage(e.target.value)
    socket.emit("typing", { roomId: selectedUser?.id, userId })
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <div className="w-1/4 bg-white shadow-md justify-center">
          <h3 className="font-bold h-16 text-2xl  text-center bg-indigo-600 text-white p-2">
            Friends
          </h3>
          <FriendsList />
        </div>
        <div className="flex flex-col w-3/4 bg-gray-50">
          <div className="bg-white shadow-md p-2 flex items-center">
            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-600 text-white mr-3">
              {selectedUser?.username.charAt(0).toUpperCase() || ""}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                {selectedUser?.username || "Select a friend to chat"}
              </h3>
              <p className="text-sm text-green-500">Online</p>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <AnimatePresence>
              {Array.isArray(messages) && messages.length > 0 ? (
                messages.map((msg, index) => {
                  const currentMessageDate = new Date(
                    msg.dateToFormat
                  ).toDateString()
                  const previousMessageDate =
                    index > 0
                      ? new Date(
                          messages[index - 1].dateToFormat
                        ).toDateString()
                      : null

                  return (
                    <motion.div
                      key={msg._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="space-y-2"
                    >
                      {currentMessageDate !== previousMessageDate && (
                        <div className="text-center text-sm text-gray-500 my-2">
                          {formatDate(new Date(msg.dateToFormat))}
                        </div>
                      )}

                      {msg.messages.map((message) => (
                        <motion.div
                          key={message._id}
                          className={`flex flex-col space-y-1 ${
                            message.senderId === userId
                              ? "items-end"
                              : "items-start"
                          }`}
                        >
                          <div
                            className={`p-3 rounded-lg max-w-[70%] ${
                              message.senderId === userId
                                ? "bg-indigo-600 text-white"
                                : "bg-gray-200 text-gray-800"
                            }`}
                          >
                            {message.text}
                          </div>
                          <span className="text-xs text-gray-500">
                            {new Date(message.timestamp).toLocaleTimeString(
                              "en-US",
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )}
                          </span>
                        </motion.div>
                      ))}
                    </motion.div>
                  )
                })
              ) : (
                <p className="text-center text-gray-500">
                  No messages to display
                </p>
              )}
            </AnimatePresence>
            <div ref={messagesEndRef} />
          </div>
          <form
            className="bg-white p-4 shadow-md"
            ref={formRef}
            onSubmit={sendMessage}
          >
            <div className="flex items-center space-x-2">
              <input
                type="text"
                placeholder="Type a message..."
                className="flex-1 outline-none py-2 px-4 bg-gray-100 rounded-full border-2 border-indigo-700"
                onChange={handleInputChange}
                value={textMessage}
                autoFocus
              />
              <button
                type="submit"
                className="bg-indigo-600 text-white rounded-full p-2 hover:bg-indigo-700 transition-colors duration-200"
              >
                <IoSend size={24} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Chat
