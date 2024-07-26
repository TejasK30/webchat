import { useContext } from "react"
import { UserContext, UserContextType } from "../context/UserContext"


const useUserContext = () => {
  const context = useContext(UserContext)
  return context as UserContextType
}

export default useUserContext