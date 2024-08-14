import express from "express"
import "dotenv/config"
import cors from "cors"
import cookieParser from "cookie-parser"
import userRoute from "./routes/userRoute"
import { connectDB } from "./config/db"
import { Server, Socket } from "socket.io"
import MessgaeModel from "./models/Message"

const app = express()
const io = new Server({
  cors: {
    origin: "http://localhost:5173",
  },
})

io.listen(5001)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
)

connectDB()

app.use("/api/users", userRoute)

io.on("connection", (socket) => {
  console.log("Socket connected: ", socket.id)

  socket.on("send-message", async (msg) => {
    
    const message = new MessgaeModel(msg)

    await message.save()
  })
})

app.listen(5000, () => {
  console.log("server started")
})
