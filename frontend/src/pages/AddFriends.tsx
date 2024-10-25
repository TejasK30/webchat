import Search from "../components/Search"

const AddFriends = () => {
  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <Search />
      <div className="flex flex-1 overflow-hidden">
        <div className="hidden sm:flex sm:flex-1 bg-gray-100">
          <div className="m-auto text-center text-gray-500 font-medium">
            Search a friend to view details or chat
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddFriends
