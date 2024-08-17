import React, { useEffect } from "react"
import { fetchClickedUser, fetchFriends } from "../client/apiClient"
import { useFriendStore } from "../store/friendStore"
import { useUserStore } from "../store/userStore"
import { useMessageStore } from "../store/messageStore"

const FriendsList: React.FC = () => {
  const { userId } = useUserStore()
  const { friends, setFriends } = useFriendStore()
  const { setMessages, setSelectedUser } = useMessageStore()

  useEffect(() => {
    const loadFriends = async () => {
      try {
        const fetchedFriends = await fetchFriends(userId)
        setFriends(fetchedFriends)
      } catch (error) {
        console.error("Error fetching friends:", error)
      }
    }
    loadFriends()
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
    <ul className="flex flex-col">
      {friends.map((friend) => (
        <li key={friend._id}>
          {friend.friends.map((f) => (
            <div
              key={f._id}
              className="cursor-pointer p-1 border-b-2 border-blue-700 hover:bg-green-200 w-full"
              onClick={() => handleUserClick(f._id, f.username)}
            >
              <h3>{f.username}</h3>
              <h3>{f.email}</h3>
            </div>
          ))}
        </li>
      ))}
    </ul>
  )
}

export default FriendsList
