import { useQuery } from "@tanstack/react-query"
import { createContext } from "react"
import { validateUser } from "../client/apiClient"
import { props } from "../utils/types"

export interface UserContextType {
  isLoggedin: boolean
}

export const UserContext = createContext<UserContextType | undefined>(undefined)

const UserContextProvider = ({ children }: props) => {
  const { isError } = useQuery({
    queryKey: ["validateUser"],
    queryFn: validateUser,
    retry: false,
    staleTime: 5 * 60 * 1000, 
    refetchOnWindowFocus: false,
  })

  return (
    <>
      <UserContext.Provider value={{ isLoggedin: !isError }}>
        {children}
      </UserContext.Provider>
    </>
  )
}

export default UserContextProvider
