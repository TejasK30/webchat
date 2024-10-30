import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import Chat from "./components/Chat"
import AddFriends from "./pages/AddFriends"
import Landing from "./pages/Landing"
import Login from "./pages/Login"
import Profile from "./pages/Profile"
import Register from "./pages/Register"
import { useUserStore } from "./store/userStore"

const App = () => {
  const { isLoggedin } = useUserStore()

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route
            path="/chat"
            element={isLoggedin ? <Chat /> : <Navigate to="/login" />}
          />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/landing" element={<Landing />} />
          <Route path="/add-friends" element={<AddFriends />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
