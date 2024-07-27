import { createContext, useMemo } from "react";
import { io, Socket } from "socket.io-client";
import { props } from "../utils/types";

export const SocketContext = createContext<Socket | undefined>(undefined)

const SocketContextProvider = ({ children }: props) => {


  const socket = useMemo(() => io("localhost:5001"), []);

  return (
    <>
      <SocketContext.Provider value={socket} >
        {children}
      </SocketContext.Provider>
    </>
  )
}

export default SocketContextProvider