import cookieParser from "cookie-parser"
import cors from "cors"
import "dotenv/config"
import express from "express"
import { Server } from "socket.io"
import { connectDB } from "./config/db"
import messageRoute from "./routes/messageRoute"
import userRoute from "./routes/userRoute"
import MessageModel from "./models/Message"

const app = express()
const io = new Server({
  cors: {
    origin: "http://localhost:5173",
  },
})

declare global {
  namespace Express {
    interface Request {
      userId: string
    }
  }
}

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
app.use("/api/messages", messageRoute)

io.on("connection", (socket) => {
  console.log("Socket connected: ", socket.id)

  socket.on("join-room", (roomId) => {
    socket.join(roomId)
    console.log(`Socket ${socket.id} joined room ${roomId}`)
  })

  socket.on("send-message", async (msg) => {
    console.log("Message received: ", msg)

    const message = new MessageModel(msg)
    await message.save()

    io.to(msg.receiverId).emit("receive-message", message)

    io.to(msg.senderId).emit("receive-message", message)
  })

  socket.on("disconnect", () => {
    console.log("Socket disconnected: ", socket.id)
  })
})

app.listen(5000, () => {
  console.log("server started")
})
