import { useQuery } from "@tanstack/react-query"
import { createContext } from "react"
import { validateUser } from "../client/apiClient"

export interface UserContextType {
  isLoggedin: boolean
}

interface props {
  children: React.ReactNode
}

export const UserContext = createContext<UserContextType | null>(null)

const UserContextProvider = ( {children}: props ) => {
  const { isError } = useQuery({queryKey: ['validateUser'], queryFn :validateUser})
  return (
    <>
      <UserContext.Provider value={ { isLoggedin: !isError }}>
        {children}
      </UserContext.Provider>
    </>
  )
}

export default UserContextProvider