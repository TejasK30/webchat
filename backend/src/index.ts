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

  socket.on("send-message", async (msg) => {
    console.log(msg)

    // await message.save()
  })
})

app.listen(5000, () => {
  console.log("server started")
})
