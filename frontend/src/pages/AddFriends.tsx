import Search from "../components/Search"
import FriendList from "../components/FriendList"

const AddFriends = () => {
  return (
    <>
      <div className="mt-3">
        <Search />
      </div>
      <div className="flex w-full mt-2">
        <div className="flex flex-col items-center w-1/4 p-1 m-1">
          <div className="bg-blue-500 p-1 w-full rounded">
            <h3 className="text-center font-bold text-gray-100">
              Added friends
            </h3>
          </div>
          <FriendList />
        </div>
        <div className="flex flex-col w-3/4 items-center">
          <h3 className="font-bold">Search Results</h3>{" "}
        </div>
      </div>
    </>
  )
}

export default AddFriends
