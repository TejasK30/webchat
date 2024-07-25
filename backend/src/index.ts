import express from "express"
import userRoute from "./routes/userRoute"
import cors from "cors"
import mongoose from "mongoose"
import 'dotenv/config'
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
)

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL)
    console.log("DB is connected")
  } catch (error) {
    console.error("Error connecting to the database:", error.message)
  }
}

connectDB()

app.use("/api/users", userRoute)

app.listen(5000, () => {
  console.log("server started")
})
