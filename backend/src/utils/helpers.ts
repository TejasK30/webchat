import jwt, { JwtPayload } from "jsonwebtoken"

export const requestUserId = async(token: any) => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string)
  const senderId = (decoded as JwtPayload).userId
  return senderId
}