import React, { useEffect } from "react"
import { fetchClickedUser, fetchFriends } from "../client/apiClient"
import { useFriendStore } from "../store/friendStore"
import { useUserStore } from "../store/userStore"
import { useMessageStore } from "../store/messageStore"
import useUserContext from "../hooks/useUserContext"
import { motion } from "framer-motion"
import { FaUserFriends } from "react-icons/fa"

const FriendsList: React.FC = () => {
  const { userId } = useUserStore()
  const { isLoggedin } = useUserContext()
  const { friends, setFriends } = useFriendStore()
  const { setMessages, setSelectedUser } = useMessageStore()

  useEffect(() => {
    if (userId) {
      const loadFriends = async () => {
        try {
          const fetchedFriends = await fetchFriends(userId)
          setFriends(fetchedFriends)
        } catch (error) {
          console.error("Error fetching friends:", error)
        }
      }
      loadFriends()
    }
  }, [setFriends, userId])

  const fetchUserMessages = async (userId: string) => {
    try {
      const messages = await fetchClickedUser(userId)
      setMessages(messages)
    } catch (error) {
      console.error("Error fetching user messages:", error)
    }
  }

  const handleUserClick = async (userId: string, username: string) => {
    setSelectedUser(userId, username)
    await fetchUserMessages(userId)
  }

  return (
    <div className="bg-gray-100 rounded-lg shadow-lg p-4 max-h-[calc(100vh-120px)] overflow-y-auto">
      <div className="flex items-center mb-4">
        <FaUserFriends className="text-indigo-600 text-2xl mr-2" />
        <h2 className="text-xl font-semibold text-gray-800">Friends</h2>
      </div>
      <ul className="space-y-2">
        {friends.map((friend) => (
          <li key={friend._id}>
            {friend.friends.map((f) => (
              <motion.div
                key={f._id}
                className="bg-white rounded-lg shadow hover:shadow-md transition-shadow duration-300 cursor-pointer"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleUserClick(f._id, f.username)}
              >
                <div className="flex items-center p-3">
                  <div
                    className={`${isLoggedin ? "bg-indigo-600" : "bg-gray-400"
                      } text-white flex items-center justify-center h-10 w-10 rounded-full mr-3`}
                  >
                    {isLoggedin ? (
                      f.username.charAt(0).toUpperCase()
                    ) : (
                      <FaUserFriends />
                    )}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">{f.username}</h3>
                    <p className="text-sm text-gray-500">
                      {isLoggedin ? "Online" : "Offline"}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default FriendsList

  
    
    
        
      
            
          
                
              
                
            
              
          
                
              
                
              
                
            
                  
            
                
            
            
            
            
