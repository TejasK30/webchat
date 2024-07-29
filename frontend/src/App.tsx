import { BrowserRouter, Route, Routes } from "react-router-dom"
import Chat from "./components/Chat"
import Login from "./pages/Login"
import Register from "./pages/Register"
import useUserContext from "./hooks/useUserContext"


const App = () => {

  const { isLoggedin } = useUserContext()

  return (
    <>
      <BrowserRouter>
        <Routes>
          {
            isLoggedin && 
            <>
            <Route path="/" element={ <Chat />} />
            
            </>
          }
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
