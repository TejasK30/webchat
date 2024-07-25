import { Request, Response } from "express"
import { z } from "zod"
import bcrypt from "bcrypt"
import UserModel from "../models/User"

const registerSchema = z.object({
  username: z.string(),
  email: z.string().email({ message: "Inavalid email format !" }),
  password: z.string(),
})

export const registerController = async (req: Request, res: Response) => {
  registerSchema.safeParse(req.body)

  const { username, email, password } = req.body

  try {
    let userexists = await UserModel.findOne({
      email: email,
    })

    if (userexists) {
      return res.status(400).json({ message: "User already exists" })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = new UserModel({
      username: username,
      email: email,
      password: hashedPassword,
    })

    await user.save()

    return res.json({ message: "User registration successful" })
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({
        message: "Validation failed",
        errors: error.errors,
      })
    } else {
      res.status(500).json({
        message: "Internal server error",
      })
      console.log(error)
    }
  }
}
