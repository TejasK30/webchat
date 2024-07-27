import { NextFunction, Request, Response } from "express"
import { z } from "zod"
import bcrypt from "bcrypt"
import jwt, { JwtPayload } from "jsonwebtoken"
import UserModel from "../models/User"

declare global {
  namespace Express {
    interface Request {
      userId: string
    }
  }
}

const registerSchema = z.object({
  username: z.string(),
  email: z.string().email({ message: "Inavalid email format !" }),
  password: z.string(),
})
const loginSchema = z.object({
  email: z.string().email({ message: "Inavalid email format !" }),
  password: z.string(),
})

export const checkUsernameController = async (req: Request, res: Response) => {
  const { username } = req.body

  try {
    const usernameExists = await UserModel.findOne({
      username: username,
    })

    if (usernameExists) {
      return res
        .status(400)
        .json({ message: "User already exists", exists: true })
    }

    return res
      .status(400)
      .json({ message: "username available", exists: false })
  } catch (error) {
    res.status(500).json({ message: "Internal server error" })
  }
}

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

export const loginController = async(req: Request, res: Response) => {
  registerSchema.safeParse(req.body)

  const { email, password } = req.body
  try {
    const user = await UserModel.findOne({ email })
    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials" })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Credentials" })
    }

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET_KEY as string,
      {
        expiresIn: "1d",
      }
    )

    res.cookie("auth_token", token, {
      httpOnly: true,
      maxAge: 86400000,
      secure: true
    })
    res.status(200).json({ userId: user._id, username: user.username, email: user.email })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Something went wrong" })
  }
}

export const validateUserController = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies["auth_token"]
  if (!token) {
    return res.status(401).json({ message: "unauthorized" })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string)
    req.userId = (decoded as JwtPayload).userId
    next()
  } catch (error) {
    return res.status(401).json({ message: "unauthorized" })
  }
}