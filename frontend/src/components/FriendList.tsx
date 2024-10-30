import { motion } from "framer-motion"
import React, { useEffect } from "react"
import { FaUserFriends } from "react-icons/fa"
import { fetchClickedUser, fetchFriends } from "../client/apiClient"
import { useFriendStore } from "../store/friendStore"
import { useMessageStore } from "../store/messageStore"
import { useUserStore } from "../store/userStore"

const FriendsList: React.FC = () => {
  const { userId } = useUserStore()
  const { isLoggedin } = useUserStore()
  const { friends, setFriends } = useFriendStore()
  const { setMessages, setSelectedUser, selectedUser } = useMessageStore()

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
    <div className="bg-gray-100 rounded-lg shadow-lg p-2 max-h-[calc(100vh-120px)] overflow-y-auto">
      <div className="flex items-center mb-4"></div>
      <ul className="space-y-2">
        {friends.map((friend) => (
          <li key={friend._id}>
            {friend.friends.map((f) => (
              <motion.div
                key={f._id}
                className={`${
                  selectedUser?.id === f._id ? "bg-indigo-200" : "bg-white"
                } rounded-lg shadow hover:shadow-md transition-shadow duration-300 cursor-pointer`}
                whileHover={{ scale: 0.98 }}
                // whileTap={{ scale: 0.98 }}
                onClick={() => handleUserClick(f._id, f.username)}
              >
                <div className="flex items-center p-3">
                  <div
                    className={`${
                      isLoggedin ? "bg-indigo-600" : "bg-gray-400"
                    } text-white flex items-center justify-center 
                      h-10 w-10 sm:h-8 sm:w-8 rounded-full mr-3 shrink-0`}
                  >
                    {isLoggedin ? (
                      f.username.charAt(0).toUpperCase()
                    ) : (
                      <FaUserFriends />
                    )}
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <h3 className="font-medium text-gray-800 text-lg sm:text-lg">
                      {f.username}
                    </h3>
                    <p className="text-sm sm:text-xs text-gray-500">
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
