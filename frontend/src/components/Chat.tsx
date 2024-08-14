import { useCallback, useEffect, useRef, useState } from "react"
import { IoSend } from "react-icons/io5"
import { useNavigate } from "react-router-dom"
import useSocket from "../hooks/useSocket"
import useUserContext from "../hooks/useUserContext"
import { useUserStore } from "../store/userStore"
import { MessageType } from "../utils/types"
import FriendsList from "./FriendList"

const Chat = () => {
  const { isLoggedin } = useUserContext()
  const [message, setMessage] = useState<MessageType>({
    sender: "",
    senderId: "",
    receiver: "",
    receiverId: "",
    text: "",
  })

  const [textmessage, setTextMessage] = useState<string>("")
  const [messages, setMessages] = useState<MessageType[]>([])

  const { userId, username, email } = useUserStore()

  const fromRef = useRef<HTMLFormElement>(null)

  const socket = useSocket()

  const navigate = useNavigate()

  const sendMessage = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      const msg: MessageType = {
        sender: username,
        senderId: userId,
        receiver: email,
        receiverId: "receiver-id",
        text: textmessage,
      }
      socket.emit("send-message", msg)
      setMessages((prevMessages) => [...prevMessages, message])
      setMessage({
        sender: "",
        senderId: "",
        receiver: "",
        receiverId: "",
        text: "",
      })
      fromRef?.current?.reset()
    },
    [email, message, socket, textmessage, userId, username]
  )

  useEffect(() => {
    const checkUserloggedIn = async () => {
      if (!isLoggedin) {
        navigate("/login")
      }
    }

    checkUserloggedIn()
  }, [isLoggedin, navigate])

  return (
    <>
      <div className="flex flex-col h-screen">
        <div className="flex h-full">
          {/* People div */}
          <div className="flex flex-col">
              <h3 className="flex w-full font-bold text-2xl text-center bg-green-500 py-2">
                Friends
              </h3>
            <div className="flex w-full items-center ">
              <FriendsList />
            </div>
          </div>

          {/* Chat UI div */}
          <div className="flex flex-col w-full bg-blue-200">
            <div className="flex bg-blue-500 items-center">
              <div className="flex items-center justify-center h-8 w-8 rounded-[50%] bg-red-700 text-gray-100 m-2 py-2">
                J
              </div>
              <div className="flex flex-col ">
                <h3 className="text-md text-gray-100 ">John Doe</h3>
                <h2 className="text-sm text-green-300">Online</h2>
              </div>
            </div>

            <div className="flex flex-col space-y-4 p-4 flex-grow">
              <div className="self-start bg-blue-100 p-2 rounded-lg max-w-[50%]">
                message1
              </div>

              {messages.map((msg) => (
                <div className="self-end bg-blue-100 p-2 rounded-lg max-w-[50%]">
                  {msg.text}
                </div>
              ))}
            </div>
            <form ref={fromRef} onSubmit={sendMessage}>
              <div className="flex items-center justify-center w-full bg-blue-200 mb-1 gap-1">
                <input
                  type="text"
                  placeholder="Enter message"
                  className="flex w-full py-2 px-1 outline-none rounded-md ml-1"
                  onChange={(e) => setTextMessage(e.target.value)}
                  autoFocus
                />
                <IoSend
                  size={30}
                  color="blue"
                  className="bg-blue-400 h-full rounded-md py-2 px-1"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Chat
