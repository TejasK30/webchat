import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import Chat from "./components/Chat"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Profile from "./pages/Profile"
import useUserContext from "./hooks/useUserContext"

const App = () => {

  const { isLoggedin } = useUserContext()
  
  return (
    <>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={isLoggedin ? <Chat /> : <Navigate to="/login" />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
