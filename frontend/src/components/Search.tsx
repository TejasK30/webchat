import React from "react"

const Search: React.FC = () => {
  return (
    <div className="px-4 py-6">
      <form className="max-w-lg mx-auto">
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only"
        >
          Search
        </label>
        <div className="flex items-center justify-between">
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="w-full pl-10 pr-32 py-3 text-sm rounded-full shadow-sm bg-gray-50 border border-gray-200 focus:ring-2 outline-none transition-colors duration-300"
              placeholder="Search and add friends..."
              required
            />
            <button
              type="submit"
              className="text-sm absolute right-2 top-1/2 transform -translate-y-1/2 px-5 py-2 rounded-full bg-blue-600 text-white focus:outline-none focus:ring-2 transition-colors duration-300"
            >
              Search
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Search
