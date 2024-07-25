import mongoose from "mongoose"
import { Request, Response } from 'express'
import { z } from 'zod'
import UserModel from "../models/User"

const registerSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z.string()
})
export const registerController = async(req: Request, res: Response) => {
  const result = registerSchema.parse(req.body)

  try {
    const user = new UserModel(req.body)   

    await user.save()
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({
        message: 'Validation failed',
        errors: error.errors,
      });
    } else {
      res.status(500).json({
        message: 'Internal server error',
      });
    } 
  }  
}