import { IoSend } from "react-icons/io5"
import useUserContext from "../hooks/useUserContext"
import { useNavigate } from "react-router-dom"
import { useCallback, useEffect, useRef, useState } from "react"
import useSocket from "../hooks/useSocket"
import { useUserStore } from "../store/userStore"
import { MessageType } from "../utils/types"

const Chat = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { isLoggedin } = useUserContext()
  const [message, setMessage] = useState<string>("")
  const [messages, setMessages] = useState<string[]>(["hello", "world"])

  const { userId, username, email } = useUserStore()

  console.log(
    `user id: ${userId} \nuser name: ${username} \n user email: ${email}`
  )

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
        receiverId: message,
        text: message
      }
      socket.emit("send-message", msg)
      setMessages((prevMessages) => [...prevMessages, message])
      setMessage("")
      fromRef?.current?.reset()
    },
    [email, message, socket, userId, username]
  )

  const sendMessageONClick = async () => {
    socket.emit("send-message", message)
    setMessages((prevMessages) => [...prevMessages, message])
    setMessage("")
    fromRef?.current?.reset()
  }

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
          <div className="flex flex-col w-[30%]">
            <div className="flex w-full items-center">
              <h3 className="flex w-full font-bold text-2xl text-center bg-green-500 py-2">
                Friends
              </h3>
            </div>

            <div className="mt-[1px] py-2 flex justify-between items-center p-1 border-b-2 hover:bg-green-200">
              <h3>John Doe</h3>
              <h4 className="text-sm font-bold text-green-800">Online</h4>
            </div>
          </div>

          {/* Chat UI div */}
          <div className="flex flex-col w-[70%] bg-blue-200">
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
                  {msg}
                </div>
              ))}
            </div>
            <form ref={fromRef} onSubmit={sendMessage}>
              <div className="flex items-center justify-center w-full bg-blue-200 mb-1 gap-1">
                <input
                  type="text"
                  placeholder="Enter message"
                  className="flex w-full py-2 px-1 outline-none rounded-md ml-1"
                  onChange={(e) => setMessage(e.target.value)}
                  autoFocus
                />
                <IoSend
                  size={30}
                  color="blue"
                  className="bg-blue-400 h-full rounded-md py-2 px-1"
                  onClick={sendMessageONClick}
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
