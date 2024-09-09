import React, { useEffect } from "react"
import { fetchClickedUser, fetchFriends } from "../client/apiClient"
import { useFriendStore } from "../store/friendStore"
import { useUserStore } from "../store/userStore"
import { useMessageStore } from "../store/messageStore"
import useUserContext from "../hooks/useUserContext"
import { FaRegUserCircle } from "react-icons/fa"

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
    <ul className="flex flex-col w-full">
      {friends.map((friend) => (
        <li key={friend._id}>
          {friend.friends.map((f) => (
            <div
              key={f._id}
              className="flex items-center cursor-pointer p-1 border-b-2 border-blue-700 hover:bg-green-200 w-full"
              onClick={() => handleUserClick(f._id, f.username)}
            >
              <div
                className={`${isLoggedin ? "bg-red-700" : "bg-gray-600"} text-gray-100 flex items-center justify-center h-8 w-8 rounded-full m-2 py-2`}
              >
                {isLoggedin ? (
                  f.username.charAt(0).toUpperCase() || ""
                ) : (
                  <FaRegUserCircle />
                )}
              </div>{" "}
              <h3>{f.username}</h3>
            </div>
          ))}
        </li>
      ))}
    </ul>
  )
}

export default FriendsList
