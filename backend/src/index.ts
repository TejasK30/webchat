import express from "express"
import 'dotenv/config'
import cors from "cors"
import userRoute from "./routes/userRoute"
import { connectDB } from "./config/db"

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
)

connectDB()

app.use("/api/users", userRoute)

app.listen(5000, () => {
  console.log("server started")
})
