import React, { useCallback, useEffect, useRef, useState } from "react"
import { IoSend } from "react-icons/io5"
import { fetchClickedUser } from "../client/apiClient"
import useSocket from "../hooks/useSocket"
import { useMessageStore } from "../store/messageStore"
import { useUserStore } from "../store/userStore"
import { MessageType } from "../utils/types"
import FriendsList from "./FriendList"
import Navbar from "./Navbar"

const Chat = () => {
  const { userId, username } = useUserStore()
  const { selectedUser, messages, addMessage, setMessages } = useMessageStore()

  const [textMessage, setTextMessage] = useState<string>("")

  const formRef = useRef<HTMLFormElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const socket = useSocket()

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

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
        if (
          message.receiverId === selectedUser.id ||
          message.senderId === userId
        ) {
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
      const newMessage: MessageType = {
        _id: "",
        sender: username,
        senderId: userId,
        receiver: selectedUser?.username || "",
        receiverId: selectedUser?.id || "",
        text: textMessage,
        timestamp: new Date(),
      }
      socket.emit("send-message", newMessage)
      addMessage(newMessage)
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
      addMessage,
    ]
  )

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextMessage(e.target.value)
    socket.emit("typing", { roomId: selectedUser?.id, userId })
  }

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex h-full">
        <div className="flex flex-col">
          <h3 className="flex w-full font-bold text-2xl text-center bg-green-500 py-2">
            Friends
          </h3>
          <div className="flex w-full items-center">
            <FriendsList />
          </div>
        </div>
        <div className="flex flex-col w-full bg-blue-200">
          <div className="flex bg-blue-500 items-center">
            <div className="flex items-center justify-center h-8 w-8 rounded-[50%] bg-red-700 text-gray-100 m-2 py-2">
              {selectedUser?.username.charAt(0).toUpperCase() || ""}
            </div>
            <div className="flex flex-col">
              <h3 className="text-md text-gray-100">
                {selectedUser?.username || "Select a friend to chat"}
              </h3>
              <h2 className="text-sm text-green-300">Online</h2>
            </div>
          </div>
          <div className="flex flex-col space-y-2 p-4 flex-grow overflow-y-auto">
            {Array.isArray(messages) && messages.length > 0 ? (
              messages.map((msg) => (
                <>
                  <div className="text-center bg-gray-500 p-1 rounded-md">{msg._id}</div>
                  <div key={msg._id} className="flex flex-col space-y-2">
                    {msg.messages.map((message) => (
                      <div
                        key={message._id}
                        className={`p-2 rounded-lg max-w-[50%] ${
                          message.senderId === userId
                            ? "self-end bg-blue-100"
                            : "self-start bg-gray-100"
                        }`}
                      >
                        {message.text}
                        <h3
                          className={`text-sm ${
                            message.senderId === userId
                              ? "text-right"
                              : "text-left"
                          }`}
                        >
                          {new Date(message.timestamp).toLocaleTimeString(
                            "en-US",
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                            }
                          )}
                        </h3>
                      </div>
                    ))}
                  </div>
                </>
              ))
            ) : (
              <p className="text-center">No messages to display</p>
            )}
            <div ref={messagesEndRef} />
          </div>
          <form
            className="sticky bottom-0 bg-blue-200"
            ref={formRef}
            onSubmit={sendMessage}
          >
            <div className="flex items-center justify-center w-full mb-1 gap-1">
              <input
                type="text"
                placeholder="Enter message"
                className="flex w-full py-2 px-1 outline-none rounded-md ml-1"
                onChange={handleInputChange}
                value={textMessage}
                autoFocus
              />
              <button
                type="submit"
                className="bg-blue-400 h-full rounded-md py-2 px-1"
              >
                <IoSend size={30} color="blue" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Chat
