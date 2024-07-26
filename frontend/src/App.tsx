import { BrowserRouter, Route, Routes } from "react-router-dom"
import Chat from "./components/Chat"
import Login from "./pages/Login"
import Register from "./pages/Register"


const App = () => {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/chat" element={ <Chat />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
