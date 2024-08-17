import jwt, { JwtPayload } from "jsonwebtoken"
import User from '../models/User'


export const requestUserId = async(token: any) => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string)
  const senderId = (decoded as JwtPayload).userId
  return senderId
}

export const getFriendId = async(email: string) => {
  const friend = await User.findOne({ email: email })
  return friend._id
}

