import { useCallback, useEffect, useRef, useState } from "react"
import { IoSend } from "react-icons/io5"
import { useNavigate } from "react-router-dom"
import useSocket from "../hooks/useSocket"
import useUserContext from "../hooks/useUserContext"
import { useMessageStore } from "../store/messageStore"
import { useUserStore } from "../store/userStore"
import { MessageData } from "../utils/types"
import FriendsList from "./FriendList"

const Chat = () => {
  const { isLoggedin } = useUserContext()
  const [textMessage, setTextMessage] = useState<string>("")
  const { userId, username } = useUserStore()
  const { selectedUser, messages } = useMessageStore()
  const fromRef = useRef<HTMLFormElement>(null)
  const socket = useSocket()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLoggedin) {
      navigate("/login")
    }
  }, [isLoggedin, navigate])

  useEffect(() => {
    console.log(Array.isArray(messages))
  }, [messages])

  const sendMessage = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      const newMessage: MessageData = {
        sender: username,
        senderId: userId,
        receiver: selectedUser?.username || "",
        receiverId: selectedUser?.id || "",
        text: textMessage,
      }
      socket.emit("send-message", newMessage)
      setTextMessage("")
      fromRef?.current?.reset()
    },
    [username, userId, selectedUser, textMessage, socket]
  )

  return (
    <div className="flex flex-col h-screen">
      <div className="flex h-full">
        <div className="flex flex-col">
          <h3 className="flex w-full font-bold text-2xl text-center bg-green-500 py-2">
            Friends
          </h3>
          <div className="flex w-full items-center ">
            <FriendsList />
          </div>
        </div>
        <div className="flex flex-col w-full bg-blue-200">
          <div className="flex bg-blue-500 items-center">
            <div className="flex items-center justify-center h-8 w-8 rounded-[50%] bg-red-700 text-gray-100 m-2 py-2">
              {selectedUser?.username.charAt(0).toUpperCase() || ""}
            </div>
            <div className="flex flex-col ">
              <h3 className="text-md text-gray-100 ">
                {selectedUser?.username || "Select a friend to chat"}
              </h3>
              <h2 className="text-sm text-green-300">Online</h2>
            </div>
          </div>
          <div className="flex flex-col space-y-4 p-4 flex-grow overflow-y-auto">
            {Array.isArray(messages) && messages.length > 0 ? (
              messages.map((msg, index) => (
                <div
                  key={index}
                  className={`p-2 rounded-lg max-w-[50%] ${
                    msg.senderId === userId
                      ? "self-end bg-blue-100"
                      : "self-start bg-gray-100"
                  }`}
                >
                  {msg.text}
                </div>
              ))
            ) : (
              <p className="text-center">No messages to display</p>
            )}
          </div>
          <form ref={fromRef} onSubmit={sendMessage}>
            <div className="flex items-center justify-center w-full bg-blue-200 mb-1 gap-1">
              <input
                type="text"
                placeholder="Enter message"
                className="flex w-full py-2 px-1 outline-none rounded-md ml-1"
                onChange={(e) => setTextMessage(e.target.value)}
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
