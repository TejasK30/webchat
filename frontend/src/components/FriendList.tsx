import React, { useEffect } from "react"
import { fetchFriends } from "../client/apiClient"
import { useUserStore } from "../store/userStore"
import { useFriendStore } from "../store/friendStore"

const FriendsList: React.FC = () => {
  const { userId } = useUserStore()
  const { friends, setFriends } = useFriendStore()

  useEffect(() => {
    const loadFriends = async () => {
      try {
        const fetchedFriends = await fetchFriends(userId)
        setFriends(fetchedFriends)
      } catch (error) {
        console.log("error", error)
      }
    }

    loadFriends()
  }, [setFriends, userId])

  console.log(friends)

  return (
    <>
      <ul className="flex">
        {friends.map((friend) => (
          <li key={friend._id}>
            {friend.friends.map((f) => (
              <div className="p-1 border-b-2 border-blue-700 hover:bg-green-200 w-[100%]">
                <h3>{f.username}</h3>
                <h3>{f.email}</h3>
              </div>
            ))}
          </li>
        ))}
      </ul>
    </>
  )
}

export default FriendsList
