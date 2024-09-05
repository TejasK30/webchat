import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import Chat from "./components/Chat"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Profile from "./pages/Profile"
import useUserContext from "./hooks/useUserContext"
import Landing from "./pages/Landing"

const App = () => {

  const { isLoggedin } = useUserContext()
  
  return (
    <>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={ <Landing/>} />
        <Route path="/chat" element={isLoggedin ? <Chat /> : <Navigate to="/login" />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/landing" element={<Landing />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
