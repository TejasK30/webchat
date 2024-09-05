import { ObjectId } from "mongodb"
import { Request, Response } from "express"
import UserModel from "../models/User"
import MessageModel from "../models/Message"
import { requestUserId } from "../utils/helpers"
import { getMessagesGroupedByDate } from "../utils/aggregate"

export const fetchClickUsersDetails = async (req: Request, res: Response) => {
  try {
    const receiverId = new ObjectId(req.params.receiverId)
    const token = req.cookies["auth_token"]

    const senderId = await requestUserId(token)
    const userDetails = await UserModel.findOne({
      _id: receiverId,
    })

    if (!userDetails) {
      return res.status(404).json({ message: "User not found" })
    }

    const groupedMessages = await getMessagesGroupedByDate(
      senderId,
      receiverId.toString()
    )

    return res.status(200).json({ groupedMessages })
  } catch (error) {
    console.log(error)
  }
}
