import { useContext } from "react"
import { SocketContext } from "../context/SocketContext"
import { Socket } from "socket.io-client"

const useSocket = () => {
  const socket = useContext(SocketContext)
  return socket as Socket
}

export default useSocket