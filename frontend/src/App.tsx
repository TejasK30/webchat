import { BrowserRouter, Route, Routes } from "react-router-dom"
import Register from "./components/Register"

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
