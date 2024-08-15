import { useMutation } from "@tanstack/react-query"
import React, { useEffect } from "react"
import { fetchClickedUser, fetchFriends } from "../client/apiClient"
import { useFriendStore } from "../store/friendStore"
import { useUserStore } from "../store/userStore"

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

  const fetchUserMutation = useMutation({
    mutationFn: fetchClickedUser,
    mutationKey: ["fetchClickedUser"],
    onSuccess: (data) => {
      console.log("Fetched user:", data)
    },
    onError: (error) => {
      console.error("Error fetching user:", error)
    },
  })

  const handleUserClick = (userId: string) => {
    fetchUserMutation.mutate(userId)
  }
  return (
    <>
      <ul className="flex">
        {friends.map((friend) => (
          <li key={friend._id}>
            {friend.friends.map((f, i) => (
              <div
                key={i}
                className="cursor-pointer p-1 border-b-2 border-blue-700 hover:bg-green-200 w-[100%]"
                onClick={() => handleUserClick(f._id)}
              >
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
