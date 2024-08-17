import { BrowserRouter, Route, Routes } from "react-router-dom"
import Chat from "./components/Chat"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Profile from "./pages/Profile"

const App = () => {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Chat />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
